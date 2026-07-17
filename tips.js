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
    27: ["chỉ sửa một vùng ảnh + có mask", "Sửa đúng vùng chỉ định -> mask_inpainting với ảnh gốc và mask."],
    28: ["Search service truy cập được + auth thành công + index not found", "Kết nối đã ổn mà không thấy index -> kiểm tra đúng index name, không phải endpoint/service name."],
    29: ["giữ preference qua nhiều cuộc trò chuyện + upload file ngay trong chat", "Nhớ lâu dài = persistent agent memory; file người dùng đưa vào = File Search."],
    30: ["thay riêng bầu trời + giữ foreground + mask", "Vùng nào được phép đổi thì tô mask vùng đó và dùng mask_inpainting."],
    31: ["nhiều agent cùng Azure AI Search + quản lý credential tập trung", "Tài nguyên dùng chung trong project -> một project connection cho tất cả agent."],
    32: ["ảnh upload + harmful content + block theo severity", "An toàn hình ảnh theo mức độ nghiêm trọng -> image moderation."],
    33: ["refund tool + human approval + chỉ chạy khi approved", "Tạm dừng hỏi người dùng bằng ask_question; nhánh thực thi phải kiểm tra approval == approved."],
    34: ["retrieved content làm câu trả lời kém chính xác", "Muốn biết output có bám nội dung truy xuất không -> groundedness metric."],
    35: ["legal answer thiếu clause + không đổi index/model", "Thiếu ngữ cảnh từ tài liệu dài -> lấy thêm document chunks trước khi dựng prompt."],
    36: ["PDF đơn lẻ số lượng lớn giá rẻ + nhiều file cần hiểu chéo", "Một file, throughput cao -> standard; nhiều file/cross-document -> pro."],
    37: ["hidden instruction trong image + chỉ shield user prompt", "Injection nằm trong ảnh/tài liệu là document attack; shield user prompt không đủ."],
    38: ["unsafe image và hidden prompt injection + image moderation", "Image moderation chặn nội dung hình ảnh độc hại, nhưng không thay Prompt Shields for documents để chặn instruction ẩn."],
    39: ["hidden instruction trong image/document", "Nội dung nhúng trong ảnh được xem là document attack -> Prompt Shields for documents."],
    40: ["hidden prompt injection + protected material detection", "Protected material lo bản quyền; prompt injection cần Prompt Shields for documents."],
    41: ["invoice scanned + field tùy chỉnh + confidence để route", "Cần field cụ thể và confidence -> custom Content Understanding analyzer với schema field."],
    42: ["indirect injection + muốn review trước khi block", "Cần quan sát trước -> Annotate; đánh dấu nguồn ngoài ít tin cậy -> Spotlighting."],
    43: ["Power Fx + biến không rỗng + uppercase", "Kiểm tra giá trị bằng Not(IsBlank(...)); đổi hoa bằng Upper trong biểu thức nội suy."],
    44: ["tiếp tục case sau nhiều ngày + full history", "Muốn nối lại toàn bộ lịch sử -> lưu conversation ID và tái sử dụng conversation."],
    45: ["resume đúng chỗ + tool calls + uploaded docs", "Thread giữ toàn bộ diễn biến agent; lưu thread ID rồi tiếp tục thread cũ."],
    46: ["individual audit report giá rẻ + nhiều tài liệu cần hiểu chéo", "Single-file standard cho từng file; multi-file pro cho cross-document."],
    47: ["traffic không đổi + cost tăng + input/output size", "Chi phí model đi theo token -> xem token usage."],
    48: ["managed identity + chỉ đọc blob + least privilege", "Chỉ đọc dữ liệu blob -> Storage Blob Data Reader."],
    49: ["GitHub Actions + PR evaluation + chặn merge", "CI/CD Azure dùng OIDC; quality gate không đạt thì Fail workflow."],
    50: ["custom speech model + REST báo project ID invalid", "Property project của Custom Speech cần custom speech project ID, không phải URL/endpoint."],
    51: ["Document Intelligence + Markdown + giữ section/table", "Muốn output Markdown có cấu trúc -> output_content_format=ContentFormat.MARKDOWN."],
    52: ["contract upload trong chat + hàng triệu court decisions ở enterprise index", "File tạm trong hội thoại -> File Search; kho lớn tập trung -> Azure AI Search."],
    53: ["Python + managed identity + Responses API", "Entra/managed identity -> DefaultAzureCredential; Responses API gọi responses.create."],
    54: ["xóa riêng logo + giữ phần còn lại", "Chỉnh đúng một vật thể -> mask vùng logo và inpaint, không sinh lại toàn ảnh."]
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
