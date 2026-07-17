(() => {
  const guides = {
    1: ["streaming audio + transcript trong vài giây + live call", "Có luồng âm thanh trực tiếp và cần chữ ngay -> real-time speech to text."],
    2: ["PDF scan + giữ layout + tables + QR code + không cần LLM", "Thấy bố cục, bảng, section hoặc QR/barcode -> chọn Layout."],
    3: ["screenshot chứa chỉ dẫn độc hại + prompt injection + third-party content", "Muốn chặn tấn công thì Block; muốn hạ độ tin cậy nội dung ngoài thì Spotlighting."],
    4: ["nhiều app dùng chung search + cấm key + ít quản trị", "Cấu hình dùng chung trong Foundry project -> tạo một Azure AI Search connection rồi tái sử dụng."],
    5: ["từng agent run + thứ tự LLM/tool + timing", "Cần nhìn đường đi chi tiết của một lần chạy -> tracing."],
    6: ["tính toán + web hiện tại + tài liệu upload", "Tính toán = Code Interpreter; web mới = Bing; file upload = File Search."],
    7: ["OpenAPI 3.0 + API key trong header + key nằm ở connection", "Muốn OpenAPI tự gắn key từ connection -> khai báo API key security scheme."],
    8: ["deterministic steps + conditional branching + shared state + ít code", "Quy trình xác định trước có nhánh và state chung -> workflow."],
    9: ["deployment gate + latest approved baseline + regression tolerance", "So với baseline đã duyệt; vượt ngưỡng regression thì fail pipeline."],
    10: ["Application Insights chung + phân biệt service + không ghi prompt/tool data", "Tách telemetry bằng OTEL_SERVICE_NAME; tắt content recording nghĩa là không ghi nội dung."],
    11: ["image editing + giữ chi tiết ảnh gốc", "Cần bám sát ảnh đầu vào khi sửa -> input_fidelity=high."],
    12: ["preference qua nhiều conversation + payment data chỉ trong phiên", "Sở thích lâu dài vào persistent memory; dữ liệu nhạy cảm ngắn hạn ở session context."],
    13: ["bắt buộc gọi tool + xác thực không dùng shared secret", "Ép gọi tool bằng required; tách danh tính bằng agent identity gắn với client app."],
    14: ["agent tự lập kế hoạch truy xuất + nhiều bước tìm kiếm", "RAG có agent tự quyết định và lặp truy xuất -> agentic RAG."],
    15: ["trích field theo schema từ tài liệu", "Biết trước các field cần lấy -> prebuilt-documentFieldSchema."],
    16: ["Responses API + buộc model gọi tool", "Cặp khóa nhớ nguyên văn: tool_choice = required."],
    17: ["429/throttling + retry an toàn", "Lỗi tạm thời do tải -> exponential backoff kèm jitter để tránh retry đồng loạt."],
    18: ["Foundry project cần dùng model resource", "Muốn project gọi model resource -> tạo connection tới resource đó."],
    19: ["PR quality gate + câu trả lời bám nguồn", "Độ bám nguồn dùng Groundedness; muốn chặn merge thì bắt workflow evaluation phải pass."],
    20: ["tạo biến thể ảnh + giữ ảnh gốc làm đầu vào", "Variation của ảnh hiện có -> image_variation + original image."],
    21: ["tài liệu ingest kém + cấu trúc phức tạp", "Nguồn đã có nhưng parse chưa đủ -> reingest bằng advanced data parsing."],
    22: ["tương tác GUI + chạy tính toán", "Điều khiển giao diện = Computer Use; tính toán/code = Code Interpreter."],
    23: ["model capacity/availability + log request-response", "Sức khỏe deployment nhìn Availability/Utilization; payload chẩn đoán dùng RequestResponse log."],
    24: ["agent telemetry + chuẩn mở", "Azure đích quan sát = Application Insights; chuẩn instrument = OpenTelemetry."],
    25: ["nhiều tool call độc lập + giảm latency", "Không phụ thuộc nhau thì chạy parallel trước khi model tổng hợp."],
    26: ["unsupported/hallucinated response vs policy violation", "Sai vì không bám nguồn -> Groundedness; vi phạm an toàn -> Risk and safety."],
    27: ["chỉ sửa một vùng ảnh + có mask", "Sửa đúng vùng chỉ định -> mask_inpainting với ảnh gốc và mask."]
  };

  const questions = window.AI103_QUESTIONS || [];
  const matching = window.AI103_MATCHING || {};

  function compact(text, limit = 280) {
    const value = String(text || "").replace(/\s+/g, " ").trim();
    if (value.length <= limit) return value;
    return `${value.slice(0, limit - 1).trimEnd()}…`;
  }

  function explanationForChoice(question, choice) {
    const explanation = String(question.explanation || "");
    const incorrectAt = explanation.indexOf("Incorrect Answers:");
    const correct = question.correct.includes(choice.label);
    const block = correct || incorrectAt < 0 ? explanation.slice(0, incorrectAt < 0 ? undefined : incorrectAt) : explanation.slice(incorrectAt);
    const escapedText = choice.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?:^|\\n)${choice.label}\\.\\s+${escapedText}\\s*\\n([\\s\\S]*?)(?=\\n[A-H]\\.\\s|$)`, "m");
    const match = block.match(pattern);
    if (match?.[1]) return compact(match[1]);
    return correct
      ? `Đúng vì lựa chọn này khớp trực tiếp tín hiệu quyết định của câu hỏi.`
      : `Bẫy: lựa chọn này không đáp ứng trực tiếp tín hiệu quyết định của câu hỏi.`;
  }

  function answerFor(question) {
    const groups = matching[question.id];
    if (groups) return groups.map((group) => `${group.prompt} → ${group.correct}`).join("; ");
    return compact(question.answer, 420);
  }

  function trapsFor(question, mnemonic) {
    const groups = matching[question.id];
    if (groups) {
      return groups.map((group) => {
        const distractors = group.options.filter((option) => option !== group.correct);
        const suffix = distractors.length ? ` Phân biệt với: ${distractors.join(" / ")}.` : "";
        return { label: group.prompt, text: `Đúng: ${group.correct}.${suffix} ${mnemonic}` };
      });
    }
    return question.choices.map((choice) => ({
      label: choice.label,
      text: `${question.correct.includes(choice.label) ? "Đúng" : "Bẫy"}: ${explanationForChoice(question, choice)}`
    }));
  }

  const tips = {};
  for (const question of questions) {
    const guide = guides[question.id];
    if (!guide) continue;
    const [keywords, mnemonic] = guide;
    const answer = answerFor(question);
    tips[question.id] = {
      keywords,
      answer,
      mnemonic,
      traps: trapsFor(question, mnemonic),
      ultraShort: `${keywords} → ${compact(answer, 180)}`
    };
  }

  window.AI103_TIPS = tips;
})();
