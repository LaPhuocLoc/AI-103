(() => {
  const legacyGuides = {
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
    54: ["xóa riêng logo + giữ phần còn lại", "Chỉnh đúng một vật thể -> mask vùng logo và inpaint, không sinh lại toàn ảnh."],
    55: ["plain scanned text/OCR + không cần layout/table", "Chỉ cần đọc chữ -> prebuilt-read; cần cấu trúc mới dùng layout."],
    56: ["response time tăng vs inference cost tăng", "Chậm ở đâu xem latency traces; tốn bao nhiêu xem token usage analytics."],
    57: ["mixed-language segments", "Mỗi đoạn nên có một ngôn ngữ -> tách đoạn rồi dịch riêng."],
    58: ["đo thời gian phản hồi", "Hiệu năng theo thời gian -> Latency, không phải quality hay token."],
    59: ["agent đọc Blob + không key + least privilege", "Xác thực bằng system-assigned managed identity; chỉ đọc blob bằng Storage Blob Data Reader."],
    60: ["giữ hình gốc khi generate", "Muốn ảnh mới bám ảnh cũ -> đưa original image làm reference image."],
    61: ["custom speech model không còn khả dụng", "Custom model lỗi/hết hạn -> Speech fallback về base model mới nhất cùng locale."],
    62: ["continue support case + giữ history/tool state", "Lưu và tái sử dụng thread ID để nối đúng thread cũ."],
    63: ["guardrail mọi bề mặt tool + Blob least privilege", "Block input/output/tool call/tool response; storage dùng managed identity + Blob Data Reader."],
    64: ["đánh giá rồi sửa trước khi trả lời", "Muốn tự khắc phục câu trả lời chưa đạt -> thêm retry evaluation trước khi trả kết quả."],
    65: ["direct prompt injection từ user", "Tấn công nằm trong lời người dùng -> Prompt Shields for user prompts."],
    66: ["không trả lời đúng trọng tâm vs câu trả lời quá dài", "Sai trọng tâm xem Relevance Evaluation; quá dài xem completion token analytics."],
    67: ["tool cần connection đã lưu", "Tool muốn dùng tài nguyên xác thực sẵn -> nối tool với Connection1."],
    68: ["inference cost tăng", "Chi phí inference đi theo lượng token -> Token usage analytics."],
    69: ["groundedness threshold + quality gate", "Đo Groundedness rồi reject câu trả lời dưới ngưỡng."],
    70: ["SIEM + lưu/truy vấn log", "Microsoft Sentinel phân tích sự kiện bảo mật; Log Analytics workspace giữ và truy vấn log."],
    71: ["Microsoft Entra + gọi Azure OpenAI + least privilege", "Chỉ cần gọi model -> Cognitive Services OpenAI User."],
    72: ["hidden instructions trong tài liệu", "Injection đến từ document -> Prompt Shields for documents."],
    73: ["nhớ sở thích lâu dài + tra tài liệu upload", "Sở thích qua nhiều phiên -> persistent memory; tài liệu đính kèm -> File Search."],
    74: ["Document Intelligence output Markdown", "Muốn Markdown có cấu trúc -> output_content_format=ContentFormat.MARKDOWN."],
    75: ["Azure AI Search query-only + least privilege", "Chỉ đọc/query index -> Search Index Data Reader."],
    76: ["spreadsheet/chart + legacy website + uploaded docs", "Tính bảng dùng Code Interpreter; thao tác web dùng Computer Use; tài liệu upload dùng File Search."],
    77: ["bắt buộc gọi MCP tool", "Ép đúng loại tool -> tool_choice={type: mcp}."],
    78: ["xem chi tiết tool được gọi và kết quả", "Muốn debug vòng đời tool -> Tool execution traces."],
    79: ["phân tích spreadsheet + thời tiết hiện tại", "Bảng tính dùng Code Interpreter; dữ liệu web hiện tại dùng Grounding with Bing."],
    80: ["so sánh chất lượng câu trả lời/agent", "Chất lượng đầu ra phải đo bằng Evaluation metrics."],
    81: ["request độ khó khác nhau + tối ưu cost/quality", "Model cascade định tuyến từng request sang model phù hợp."],
    82: ["JSON đúng schema + machine-readable", "Cần cấu trúc chắc chắn cho máy đọc -> Structured Outputs với JSON schema."],
    83: ["tra hợp đồng upload + tính toán/vẽ chart", "Tài liệu dùng File Search; phân tích số và biểu đồ dùng Code Interpreter."],
    84: ["tài liệu phi cấu trúc + trích field theo schema", "Hiểu và trích dữ liệu tài liệu tùy chỉnh -> Content Understanding analyzer."],
    85: ["hiểu ngữ nghĩa và sinh câu trả lời", "Tác vụ reasoning/generation cốt lõi -> Large Language Model."],
    86: ["web hiện tại + file upload + thao tác trình duyệt", "Bing lấy dữ liệu web; File Search đọc file; Computer Use thao tác giao diện."],
    87: ["ước lượng nguồn field + confidence", "Cần source và độ tin cậy của field -> estimateFieldSourceAndConfidence."],
    88: ["RAG latency/cost cao do quá nhiều chunks", "Ít chunk hơn -> ít token và ít lượt xử lý hơn."],
    89: ["GitHub Actions vào Azure không lưu secret", "CI đăng nhập Azure bằng OIDC + workload identity federation."],
    90: ["multimodal document understanding + custom fields", "Hiểu nội dung nhiều định dạng theo schema -> Azure Content Understanding."],
    91: ["audio hai chiều thời gian thực", "Giọng nói vào dùng real-time speech-to-text; câu trả lời ra dùng text-to-speech."],
    92: ["custom analyzer + extracted fields", "Field nghiệp vụ tùy chỉnh nằm trong Content Understanding analyzer schema."],
    93: ["kết quả ổn định + reasoning sâu", "Giảm ngẫu nhiên bằng temperature 0; tăng suy luận bằng reasoning effort high."],
    94: ["Azure AI Search indexer + ảnh nhúng trong document", "Ảnh được indexer chuẩn hóa đưa vào normalized_images."],
    95: ["thay riêng vehicle + giữ background", "Mask vùng xe rồi inpaint để chỉ đổi đúng đối tượng."],
    96: ["tìm bước gây chậm trong request", "Phân rã thời gian từng bước -> latency traces."],
    97: ["response bị cắt vì giới hạn output", "Truncation do thiếu ngân sách sinh -> tăng max_tokens."],
    98: ["câu trả lời thiếu bước + tự kiểm tra", "Cho model reflection pass để rà và bổ sung trước khi trả."],
    99: ["tăng temperature để chữa thiếu ý", "Temperature tăng độ ngẫu nhiên, không bảo đảm câu trả lời đầy đủ."],
    100: ["evaluation-only vs tự sửa output", "Evaluation chỉ đo/chặn; không tự tái sinh câu trả lời tốt hơn."],
    101: ["ổn định phiên bản model + tránh tự nâng cấp", "Dùng standard deployment và opt out automatic model upgrades."],
    102: ["prompt injection protection", "Phát hiện và chặn chỉ dẫn độc hại -> Prompt Shields."],
    103: ["đánh giá câu trả lời có bám nguồn RAG", "Chất lượng grounded theo tài liệu truy xuất -> RAG evaluator."],
    104: ["đổi hành vi chung của assistant", "Quy tắc vai trò và cách trả lời thuộc system message."],
    105: ["trích xuất/hiểu tài liệu đa phương thức", "Document understanding theo schema -> Content Understanding."],
    106: ["chunk văn bản + tạo vector", "Text Split chia đoạn; Azure OpenAI Embedding biến đoạn thành vector."],
    107: ["enterprise vector/hybrid retrieval", "Kho tìm kiếm tập trung cho RAG -> Azure AI Search."]
  };

  const guides = window.AI103_TIP_GUIDES || {};
  window.AI103_TIP_GUIDES = guides;

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
    const match = block.match(new RegExp(pattern.source)); // Drop multiline so $ means end of the full explanation.
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
    const legacyGuide = legacyGuides[question.id];
    if (!guide && !legacyGuide) continue;
    const keywords = guide?.keywords || legacyGuide[0];
    const mnemonic = guide?.mnemonic || legacyGuide[1];
    const answer = answerFor(question);
    tips[question.id] = {
      keywords,
      answer,
      mnemonic,
      traps: guide?.trapNotes
        ? Object.entries(guide.trapNotes).map(([label, text]) => ({ label, text }))
        : trapsFor(question, mnemonic),
      ultraShort: guide?.ultraShort || `${keywords} → ${compact(answer, 180)}`,
      sources: guide?.sources || []
    };
  }

  window.AI103_TIPS = tips;
})();
