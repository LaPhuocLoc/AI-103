(() => {
  const guides = {
    37: {
      keywords: "văn bản ẩn trong ảnh tải lên; tấn công gián tiếp; giải pháp chỉ quét lời nhắc người dùng",
      mnemonic: "Người gõ trực tiếp mới dùng user prompts; chữ đi qua ảnh là documents.",
      trapNotes: {
        A: "Sai: Prompt Shields for user prompts chỉ nhắm lệnh độc hại do người dùng nhập trực tiếp, không phải chữ được OCR từ ảnh.",
        B: "Đúng: chữ ẩn được trích từ ảnh là document attack; cần Prompt Shields for documents thay cho lớp quét user prompts."
      },
      ultraShort: "Chữ ẩn từ ảnh = document attack, không phải user prompt → B. No.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields"]
    },
    38: {
      keywords: "ảnh có lệnh ẩn; OCR đưa chữ vào prompt; image moderation chỉ xét nội dung hình ảnh có hại",
      mnemonic: "Hình xấu dùng moderation; chữ ra lệnh trong hình dùng document shield.",
      trapNotes: {
        A: "Sai: image moderation phát hiện các nhóm nội dung hình ảnh có hại, nhưng không chặn lệnh tiêm gián tiếp nằm trong văn bản OCR.",
        B: "Đúng: nguy cơ là document attack qua chữ nhúng trong ảnh; phải dùng Prompt Shields for documents để xử lý đúng kênh tấn công."
      },
      ultraShort: "Image moderation không bắt lệnh ẩn qua OCR → B. No.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields", "https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview"]
    },
    39: {
      keywords: "ảnh tải lên; văn bản nhúng được trích xuất; tấn công tiêm lời nhắc gián tiếp",
      mnemonic: "Nội dung ngoài đi vào model là document; document attack gặp document shield.",
      trapNotes: {
        A: "Đúng: Prompt Shields for documents phân tích nội dung ngoài như tài liệu, web hoặc chữ trích từ ảnh để phát hiện lệnh độc hại gián tiếp.",
        B: "Sai: chọn No sẽ bỏ qua đúng lớp bảo vệ dành cho document attack; chỉ cần lớp khác nếu mối đe dọa thuộc loại khác."
      },
      ultraShort: "Chữ nhúng trong ảnh = document attack → A. Yes.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields"]
    },
    40: {
      keywords: "lệnh ẩn trong ảnh; thao túng model; giải pháp protected material detection",
      mnemonic: "Bản quyền là protected material; chiếm quyền prompt là Prompt Shields.",
      trapNotes: {
        A: "Sai: protected material detection nhận diện nội dung được bảo hộ như văn bản hoặc mã, không phát hiện chỉ dẫn tiêm vào ảnh.",
        B: "Đúng: giải pháp nêu sai loại rủi ro; lệnh ẩn từ ảnh cần Prompt Shields for documents, không phải bộ lọc tài liệu có bản quyền."
      },
      ultraShort: "Protected material ≠ prompt injection qua ảnh → B. No.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields", "https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    41: {
      keywords: "trường hóa đơn xác định trước; nhiều mẫu; JSON có confidence score; ngưỡng 0,80",
      mnemonic: "Muốn trường riêng kèm độ tin cậy thì tự định schema bằng custom analyzer.",
      trapNotes: {
        A: "Sai: groundedness guardrail đánh giá câu trả lời có dựa nguồn hay không; nó không bóc các trường hóa đơn và confidence score.",
        B: "Đúng: custom Content Understanding analyzer cho phép khai báo đúng schema trường cần lấy và trả confidence để định tuyến duyệt tay.",
        C: "Sai: prebuilt-layout giữ chữ, bảng và cấu trúc trang; dùng khi cần bố cục, không tự đáp ứng schema hóa đơn tùy biến nêu trong đề.",
        D: "Sai: prebuilt-documentSearch phục vụ tìm kiếm; search.score đo độ liên quan của kết quả tìm kiếm, không phải độ tin cậy của trường trích xuất."
      },
      ultraShort: "Schema trường riêng + confidence <0,80 → B. custom Content Understanding analyzer.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview", "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-reference"]
    },
    42: {
      keywords: "web bên ngoài; indirect prompt injection; chỉ phát hiện để quản trị viên xem trước khi chặn",
      mnemonic: "Xem trước thì Annotate; nội dung ngoài thì Spotlighting.",
      trapNotes: {
        A: "Sai: tắt Prompt Shields làm mất khả năng phát hiện document attack, trái yêu cầu theo dõi các lệnh độc hại từ web ngoài.",
        B: "Sai: Block tự động ngăn yêu cầu ngay khi phát hiện; chỉ dùng khi chính sách muốn chặn tức thì, không cần duyệt trước.",
        C: "Đúng: Annotate ghi nhận phát hiện mà chưa chặn, còn Spotlighting đánh dấu nội dung web bên thứ ba là ít đáng tin hơn.",
        D: "Sai: bộ lọc Hate xử lý một nhóm nội dung gây hại, không nhận diện indirect prompt injection nằm trong kết quả Bing Search."
      },
      ultraShort: "Phát hiện để duyệt + web ngoài → C. Annotate Prompt Shields và bật Spotlighting.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields"]
    },
    43: {
      keywords: "Var01 phải có giá trị; biến local cần tiền tố Local.; trả chữ hoa",
      mnemonic: "Có giá trị = phủ định IsBlank; chữ hoa = Upper; biến cục bộ nhớ Local.",
      trapNotes: {
        "If/else condition expression": "Chọn Not(IsBlank(Local.Var01)): IsBlank kiểm tra giá trị rỗng nên phải phủ định; IsEmpty dành cho bảng, không phải chuỗi.",
        "Send message expression": "Chọn {Upper(Local.Var01)}: Upper đổi sang chữ hoa và Local. tham chiếu đúng phạm vi; bỏ Upper hoặc Local. đều thiếu yêu cầu."
      },
      ultraShort: "Có giá trị: Not(IsBlank(Local.Var01)); chữ hoa: {Upper(Local.Var01)}.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow", "https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-isblank-isempty"]
    },
    44: {
      keywords: "quay lại sau nhiều ngày; đầy đủ message, tool call và tool output; tự nạp lịch sử",
      mnemonic: "Muốn nguyên lịch sử thì giữ conversation ID; summary chỉ giữ phần tóm tắt.",
      trapNotes: {
        A: "Đúng: tạo rồi tái sử dụng conversation ID giúp Foundry duy trì lịch sử nhiều lượt gồm message, tool call và kết quả công cụ.",
        B: "Sai: chỉ ghép phản hồi cuối làm mất câu hỏi cũ, tool call và tool output; cách này chỉ phù hợp khi tự quản ngữ cảnh tối giản.",
        C: "Sai: memory summarization giữ thông tin cô đọng, phù hợp nhớ dài hạn nhưng không bảo đảm tải lại toàn bộ tương tác nguyên bản."
      },
      ultraShort: "Cần toàn bộ lịch sử qua nhiều phiên → A. lưu và tái dùng conversation ID.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/runtime-components"]
    },
    45: {
      keywords: "tiếp tục đúng điểm dừng; giữ tool invocation và tệp tải lên; không dựng lại lịch sử",
      mnemonic: "Cùng cuộc hội thoại thì cùng thread ID.",
      trapNotes: {
        A: "Sai: tạo thread mới cho từng yêu cầu tách rời lịch sử, tệp và lần gọi công cụ; sao chép response vẫn không phục hồi đủ trạng thái.",
        B: "Đúng: lưu thread ID và tiếp tục trên thread hiện có để dịch vụ giữ message, tệp và tool invocation xuyên các lần quay lại.",
        C: "Sai: summary trong memory chỉ giữ bản cô đọng; dùng cho sự kiện hoặc sở thích lâu dài, không thay thế toàn bộ thread cũ.",
        D: "Sai: response cuối không chứa đầy đủ câu hỏi, tài liệu và tool output trước đó; chỉ nên dùng khi chủ động chấp nhận mất chi tiết."
      },
      ultraShort: "Giữ nguyên hội thoại, tool và tệp → B. lưu rồi tái dùng thread ID.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/agents/concepts/threads-runs-messages"]
    },
    46: {
      keywords: "Pipeline1 từng tệp và tiết kiệm; Pipeline2 nhiều tệp và suy luận tìm bất nhất",
      mnemonic: "Một tệp, ít phí = standard; nhiều tệp, suy luận sâu = pro.",
      trapNotes: {
        Pipeline1: "Chọn Single-file task in standard mode: báo cáo được xử lý riêng, chỉ trích thông tin và ưu tiên giảm chi phí, không cần suy luận chéo.",
        Pipeline2: "Chọn Multi-file task in pro mode: phải đối chiếu nhiều kỳ và suy luận nhiều bước; standard thiếu suy luận nâng cao, single-file không so sánh chéo."
      },
      ultraShort: "Pipeline1: single-file standard; Pipeline2: multi-file pro.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/standard-pro-modes"]
    },
    47: {
      keywords: "traffic không đổi; chi phí tăng; cần tách input, output và tool usage",
      mnemonic: "Tiền model đi theo token; muốn biết đầu vào, đầu ra, công cụ thì xem token usage.",
      trapNotes: {
        A: "Sai: latency đo thời gian xử lý, dùng tìm nút thắt chậm; nó không phân rã lượng token làm tăng chi phí.",
        B: "Sai: evaluation metrics đo chất lượng như relevance hoặc groundedness, không đo kích thước request, response hay tool usage.",
        C: "Sai: run success rate cho biết lượt chạy thành công hay thất bại, không cho biết nguyên nhân tiêu thụ chi phí nhiều hơn.",
        D: "Đúng: token usage cho thấy token đầu vào, đầu ra và mức dùng liên quan công cụ, đúng ba nguồn chi phí cần phân biệt."
      },
      ultraShort: "Traffic giữ nguyên, cần tách input/output/tool cost → D. token usage.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    48: {
      keywords: "managed identity; chỉ đọc blob cho RAG; cấm tải lên, sửa và xóa; least privilege",
      mnemonic: "Chỉ đọc dữ liệu blob thì đúng tên vai trò: Storage Blob Data Reader.",
      trapNotes: {
        A: "Sai: Storage Blob Data Owner có toàn quyền dữ liệu và quản lý quyền; chỉ dùng khi thật sự cần quyền sở hữu, vượt xa đọc RAG.",
        B: "Sai: Storage Blob Data Contributor cho phép đọc, ghi và xóa blob; dùng khi tác nhân phải cập nhật dữ liệu, không phải chỉ đọc.",
        C: "Đúng: Storage Blob Data Reader cho phép đọc và tải blob mà không ghi, sửa hoặc xóa, đúng nguyên tắc least privilege.",
        D: "Sai: Contributor quản lý tài nguyên Azure nhưng không phải vai trò dữ liệu blob chỉ đọc; phạm vi quản lý cũng rộng hơn yêu cầu."
      },
      ultraShort: "RAG chỉ đọc blob bằng managed identity → C. Storage Blob Data Reader.",
      sources: ["https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access"]
    },
    49: {
      keywords: "GitHub Actions khi mở PR; không lưu bí mật dài hạn; ngăn merge nếu dưới ngưỡng",
      mnemonic: "Đăng nhập không secret bằng OIDC; dưới ngưỡng phải Fail để branch rule chặn merge.",
      trapNotes: {
        "Authentication method": "Chọn Azure Login action dùng OpenID Connect (OIDC): xác thực liên kết không cần PAT dài hạn; managed identity không chạy trực tiếp trên runner GitHub-hosted.",
        "If the evaluation results are NOT met, configure the workflow to": "Chọn Fail: check thất bại mới kết hợp branch protection để chặn merge; gửi cảnh báo không chặn, còn khóa branch chặn mọi cập nhật."
      },
      ultraShort: "Đăng nhập bằng Azure Login + OIDC; không đạt ngưỡng thì Fail workflow.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/how-to/evaluation-github-action", "https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect"]
    },
    50: {
      keywords: "fine-tune Speech-to-Text; published custom model; REST API báo project ID không hợp lệ",
      mnemonic: "Thuộc tính project của Custom Speech phải nhận chính Custom Speech project ID.",
      trapNotes: {
        A: "Sai: project URL là địa chỉ điều hướng, không phải định danh mà thuộc tính project của Speech-to-Text REST API yêu cầu.",
        B: "Đúng: custom speech project ID liên kết yêu cầu với dự án đã huấn luyện và xuất bản model Speech-to-Text tùy chỉnh.",
        C: "Sai: project ID chung của Microsoft Foundry không thay thế định danh dự án Custom Speech thuộc dịch vụ Speech.",
        D: "Sai: custom speech endpoint URL xác định nơi gửi yêu cầu; không phải giá trị của thuộc tính project trong payload."
      },
      ultraShort: "Thuộc tính project cho custom Speech-to-Text → B. custom speech project ID.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/speech-service/custom-speech-overview"]
    },
    51: {
      keywords: "PDF; Markdown; giữ section và table; tính năng tích hợp sẵn",
      mnemonic: "Muốn đầu ra Markdown thì đặt đúng tham số output_content_format thành MARKDOWN.",
      trapNotes: {
        A: "Sai: output=figures chỉ yêu cầu hình hoặc figure, không biến toàn bộ nội dung và cấu trúc PDF thành Markdown.",
        B: "Sai: content=markdown không phải tham số hợp lệ để chọn định dạng đầu ra của Azure Document Intelligence.",
        C: "Sai: confidence threshold lọc theo độ tin cậy, không đổi kiểu đầu ra hay bảo toàn section và table dưới dạng Markdown.",
        D: "Đúng: output_content_format=ContentFormat.MARKDOWN dùng khả năng có sẵn để giữ heading, section và table, ít công phát triển nhất."
      },
      ultraShort: "Giữ cấu trúc PDF ở Markdown → D. output_content_format=ContentFormat.MARKDOWN.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/concept/markdown-elements"]
    },
    52: {
      keywords: "tệp người dùng tải trong hội thoại; kho doanh nghiệp hàng triệu tài liệu",
      mnemonic: "Tệp phiên chat dùng File Search; kho lớn lâu dài dùng Azure AI Search.",
      trapNotes: {
        A: "Sai: File Search thuận tiện cho tệp người dùng cung cấp, nhưng không phải lựa chọn phù hợp để tự quản chỉ mục doanh nghiệp hàng triệu hồ sơ.",
        B: "Sai: Azure AI Search phù hợp kho tập trung quy mô lớn, nhưng File Search đơn giản hơn cho hợp đồng vừa tải trong cuộc hội thoại.",
        C: "Đúng: File Search xử lý hợp đồng tải lên trong phiên; Azure AI Search mở rộng chỉ mục tập trung cho hàng triệu án lệ.",
        D: "Sai: Microsoft Fabric là nền tảng dữ liệu và phân tích, không phải công cụ tìm tệp hội thoại; File Search cũng không thay chỉ mục lớn."
      },
      ultraShort: "Tệp trong chat → File Search; hàng triệu hồ sơ → C. Azure AI Search.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/file-search", "https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search"]
    },
    53: {
      keywords: "Python; Microsoft Entra managed identity; Azure OpenAI Responses API; gửi prompt mới",
      mnemonic: "Danh tính mặc định dùng DefaultAzureCredential; tạo phản hồi mới dùng responses.create.",
      trapNotes: {
        "Credential class": "Chọn DefaultAzureCredential: trên Azure nó lấy managed identity; AzureKeyCredential dùng key, còn ClientSecretCredential cần lưu client secret.",
        "Responses API method": "Chọn create: responses.create gửi đầu vào và tạo phản hồi mới; retrieve chỉ lấy phản hồi đã có, compact không phải thao tác gửi prompt."
      },
      ultraShort: "Managed identity: DefaultAzureCredential; gửi prompt: responses.create.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses"]
    },
    54: {
      keywords: "ảnh đã có; chỉ xóa logo ở một vùng; giữ nguyên phần còn lại",
      mnemonic: "Sửa đúng một vùng thì che vùng đó bằng mask rồi inpainting.",
      trapNotes: {
        A: "Đúng: mask-based inpainting giới hạn vùng chỉnh sửa quanh logo, giúp thay vùng đó mà bảo toàn bố cục và các phần ảnh còn lại.",
        B: "Sai: tăng prompt guidance chỉ ảnh hưởng mức bám prompt khi sinh ảnh, không chọn chính xác vùng logo trên ảnh hiện hữu để xóa.",
        C: "Sai: sửa prompt có thể giảm logo ở lần sinh sau nhưng không chỉnh riêng ảnh đã công bố và không bảo đảm giữ phần còn lại.",
        D: "Sai: đổi random seed tạo một biến thể ảnh mới trên toàn khung, không đáp ứng yêu cầu chỉ loại bỏ logo hiện có."
      },
      ultraShort: "Chỉ xóa logo, giữ toàn ảnh → A. mask-based inpainting.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e"]
    },
    55: {
      keywords: "chỉ OCR toàn bộ chữ; bỏ layout, table và key-value; không dùng LLM; giảm phí",
      mnemonic: "Chỉ đọc chữ thì prebuilt-read; cần bố cục mới dùng layout.",
      trapNotes: {
        A: "Sai: prebuilt-documentFieldSchema phục vụ trường nghiệp vụ có cấu trúc, trái yêu cầu không nhận diện key-value hoặc business fields.",
        B: "Sai: prebuilt-layout giữ paragraph, table và vị trí bố cục; dùng khi cấu trúc trang có giá trị, trong khi đề yêu cầu bỏ qua.",
        C: "Đúng: prebuilt-read cung cấp OCR và trích chữ nền tảng, không phân tích layout và không cần language model deployment.",
        D: "Sai: prebuilt-documentSearch chuẩn bị nội dung cho tìm kiếm ngữ nghĩa, nhiều hơn nhu cầu OCR thuần và không tối ưu nhất về chi phí."
      },
      ultraShort: "OCR thuần, bỏ layout, không LLM → C. prebuilt-read.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/prebuilt-analyzers", "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/pricing-explainer"]
    },
    56: {
      keywords: "hai vấn đề riêng: thời gian phản hồi tăng và chi phí inference tăng; traffic không đổi",
      mnemonic: "Chậm xem latency trace; tốn tiền xem token usage.",
      trapNotes: {
        "Increased response time": "Chọn Latency breakdown traces để tách thời gian retrieval, tool và model; các quality/safety metric không chỉ ra công đoạn gây chậm.",
        "Increased inference costs": "Chọn Token usage analytics để thấy input/output token và context tăng; latency chỉ đo thời gian, không giải thích trực tiếp phí inference."
      },
      ultraShort: "Chậm → Latency breakdown traces; đắt → Token usage analytics.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    57: {
      keywords: "một segment trộn English và Spanish; bản dịch thiếu hoặc sai; phải dịch đủ transcript",
      mnemonic: "Một yêu cầu, một ngôn ngữ nguồn: tách theo ngôn ngữ rồi dịch riêng.",
      trapNotes: {
        A: "Sai theo ngữ cảnh live calls: Document Translation dành cho tài liệu hoàn chỉnh; gom cả transcript không xử lý đúng luồng segment thời gian thực.",
        B: "Đúng theo đáp án đề: tách đoạn trộn thành các segment một ngôn ngữ giúp mỗi request có nguồn nhất quán và dịch đủ từng phần.",
        C: "Sai theo đáp án đề: tự nhận diện thường chọn ngôn ngữ chi phối của request, nên một segment trộn có thể bỏ hoặc dịch sai phần còn lại.",
        D: "Sai: ép English làm nguồn khiến phần Spanish bị diễn giải sai; chỉ dùng khi chắc chắn toàn bộ đầu vào thực sự là English."
      },
      ultraShort: "Segment trộn ngôn ngữ → B. tách thành segment một ngôn ngữ rồi dịch riêng.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/translator/text-translation/reference/rest-api-guide"]
    },
    58: {
      keywords: "response chậm; traffic không đổi; cần tách retrieval, tool execution và model inference",
      mnemonic: "Muốn biết chậm ở công đoạn nào thì xem latency.",
      trapNotes: {
        A: "Sai: evaluation metrics đo chất lượng câu trả lời như groundedness hoặc relevance, không phân rã thời gian thực thi.",
        B: "Đúng: Latency cung cấp thời gian theo từng giai đoạn retrieval, tool và inference, từ đó định vị nút thắt gây chậm.",
        C: "Sai: run success rate chỉ cho biết lượt chạy thành công hay lỗi; một lượt thành công vẫn có thể rất chậm.",
        D: "Sai: token usage hữu ích phân tích mức dùng và chi phí; nó không trực tiếp chỉ ra retrieval hay tool nào chiếm thời gian."
      },
      ultraShort: "Tách thời gian retrieval/tool/inference → B. Latency.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    59: {
      keywords: "Content Safety đọc ảnh qua blob URL; không key/SAS; least privilege; chỉ đọc blob",
      mnemonic: "Thi theo đề: system-assigned identity + Reader; triển khai blobUrl: Contributor/Owner, Reader có thể không chạy.",
      trapNotes: {
        Authentication: "Đáp án ngân hàng đề chọn System-assigned managed identity để tránh key và SAS; phần danh tính này phù hợp cách quickstart cấu hình Content Safety.",
        "Azure RBAC role": "Để thi đúng đề, chọn Storage Blob Data Reader. Nhưng Microsoft Learn hiện chỉ chấp nhận Storage Blob Data Contributor hoặc Owner cho Content Safety đọc blobUrl; Reader có thể không chạy và không phải cấu hình triển khai hợp lệ hiện hành."
      },
      ultraShort: "Thi Q59: system-assigned MI + Reader. Thực tế Content Safety blobUrl: chỉ Contributor/Owner; Reader có thể không chạy.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-safety/quickstart-image", "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage"]
    },
    60: {
      keywords: "ảnh gốc của jacket; đổi nền, ánh sáng, bối cảnh; phải giữ đúng sản phẩm",
      mnemonic: "Muốn giữ vật thể thì đưa ảnh vật thể làm reference image.",
      trapNotes: {
        A: "Đúng: reference image cung cấp đặc trưng màu, họa tiết và kiểu dáng jacket để model thay môi trường nhưng giữ nhận dạng sản phẩm.",
        B: "Sai: max_tokens là giới hạn đầu ra văn bản, không điều khiển tính nhất quán hình ảnh hay diện mạo jacket.",
        C: "Sai: groundedness đánh giá văn bản có dựa nguồn hay không, không khóa đặc điểm thị giác của vật thể khi sinh ảnh.",
        D: "Sai: Content Safety annotate chỉ gắn nhãn nội dung có hại; không hướng dẫn model giữ nguyên jacket qua các bối cảnh."
      },
      ultraShort: "Giữ nguyên jacket, đổi cảnh → A. dùng ảnh gốc làm reference image.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e"]
    },
    61: {
      keywords: "custom Speech-to-Text model hết hạn; real-time qua custom endpoint",
      mnemonic: "Custom endpoint không ngừng: model custom hết hạn thì rơi về base model mới nhất cùng locale.",
      trapNotes: {
        A: "Sai: 4xx khi model hết hạn áp dụng cho batch transcription chỉ định model; custom endpoint thời gian thực có cơ chế fallback.",
        B: "Sai: model đã hết hạn không tiếp tục được dùng cho inference; cần cập nhật model để giữ độ chính xác theo miền.",
        C: "Đúng: custom endpoint tiếp tục nhận dạng bằng base model mới nhất cùng locale, nhưng có thể mất cải thiện từ tùy chỉnh.",
        D: "Sai: hết hạn làm model không còn dùng cho transcription, không đồng nghĩa model được tự động xóa khỏi tài nguyên."
      },
      ultraShort: "Custom endpoint + model hết hạn → C. fallback base model mới nhất cùng locale.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-custom-speech-model-and-endpoint-lifecycle"]
    },
    62: {
      keywords: "vụ hỗ trợ nhiều tuần; đầy đủ lịch sử, tệp, tool call/output; ít code",
      mnemonic: "Ca cũ dùng lại thread ID cũ; dịch vụ tự giữ trạng thái.",
      trapNotes: {
        A: "Đúng: lưu và gửi lại thread ID cho cùng support case để Agent Service tự duy trì message, tệp và lịch sử công cụ qua nhiều phiên.",
        B: "Sai: Azure AI Search chỉ lưu response không khôi phục tool call, tool output hay tệp; còn buộc ứng dụng tự ghép prompt.",
        C: "Sai: persistent memory phù hợp dữ kiện dài hạn, không phải bản ghi đầy đủ của một cuộc hội thoại và trạng thái thực thi.",
        D: "Sai: summary làm mất chi tiết và cần thêm code lưu/ghép; chỉ hợp khi chấp nhận ngữ cảnh cô đọng thay vì lịch sử đầy đủ."
      },
      ultraShort: "Giữ trọn support case nhiều tuần, ít code → A. lưu và tái dùng thread ID.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/agents/concepts/threads-runs-messages"]
    },
    63: {
      keywords: "ngăn nội dung có hại xuyên suốt agent run; ảnh qua blob URL; least privilege",
      mnemonic: "Thi: Block đủ 4 điểm, storage chọn MI + Reader; triển khai blobUrl cần Contributor/Owner.",
      trapNotes: {
        Guardrails: "Chọn User input, Output, Tool response và Tool call với Action=Block: bao phủ toàn luồng và thật sự ngăn; Annotate chỉ ghi nhận.",
        "Storage access": "Để thi đúng ngân hàng đề, chọn system-assigned managed identity + Storage Blob Data Reader. Khi triển khai Content Safety với blobUrl, Microsoft Learn hiện chỉ chấp nhận Storage Blob Data Contributor hoặc Owner; Reader có thể không chạy."
      },
      ultraShort: "Thi Q63: Block 4 điểm + MI/Reader. Thực tế blobUrl: Contributor/Owner; Reader có thể không chạy.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/guardrails/how-to-create-guardrails", "https://learn.microsoft.com/en-us/azure/ai-services/content-safety/quickstart-image", "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage"]
    },
    64: {
      keywords: "cải thiện completeness; xử lý trong application code; trước khi trả response",
      mnemonic: "Chưa đủ thì đánh giá rồi retry trước khi gửi người dùng.",
      trapNotes: {
        A: "Đúng: retry evaluation cho ứng dụng kiểm tra độ đầy đủ, rồi tái sinh hoặc sửa response chưa đạt trước khi trả ra ngoài.",
        B: "Sai: giảm max_tokens làm trần đầu ra thấp hơn và dễ cắt thiếu nội dung; chỉ dùng khi mục tiêu là rút ngắn response.",
        C: "Sai: đề đã mô tả tài liệu được retrieved nên luồng đã có nền tảng RAG; đổi kiến trúc không trực tiếp tạo cổng kiểm tra trước trả lời.",
        D: "Sai: model nhỏ hơn có thể giảm chi phí nhưng không phải logic ứng dụng để đánh giá và sửa response thiếu trước khi gửi."
      },
      ultraShort: "Kiểm tra completeness trong app trước khi trả → A. retry evaluation.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    65: {
      keywords: "free-form text người dùng nhập trực tiếp; bỏ qua system instruction; lộ prompt; thao túng tool",
      mnemonic: "Người dùng tự gõ đòn tấn công thì dùng Prompt Shields for user prompts.",
      trapNotes: {
        A: "Sai: image moderation kiểm tra nội dung hình ảnh có hại, không phân tích chuỗi text người dùng nhập để chiếm quyền prompt.",
        B: "Sai: Prompt Shields for documents dành cho lệnh nằm trong tài liệu, web hoặc dữ liệu ngoài; không phải đòn nhập trực tiếp.",
        C: "Sai: protected material text nhận diện nội dung được bảo hộ, không phát hiện yêu cầu bỏ qua system instruction hay thao túng tool.",
        D: "Đúng: Prompt Shields for user prompts nhắm direct prompt injection do người dùng nhập nhằm thay đổi quy tắc hoặc hành vi model."
      },
      ultraShort: "Direct prompt injection từ text người dùng → D. Prompt Shields for user prompts.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields"]
    },
    66: {
      keywords: "tài liệu đã liên quan nhưng answer lệch câu hỏi; response quá dài làm tăng phí",
      mnemonic: "Lệch câu hỏi xem Relevance; dài quá xem completion tokens.",
      trapNotes: {
        "Answers do not address the user's question": "Chọn Relevance Evaluation vì vấn đề nằm ở mức answer đáp đúng query; Groundedness chỉ hỏi answer có được nguồn hỗ trợ hay không.",
        "Responses are longer than expected": "Chọn Completion token analytics vì độ dài đầu ra và chi phí gắn với completion tokens; trace và latency không trực tiếp đo lượng đầu ra."
      },
      ultraShort: "Answer lệch → Relevance Evaluation; quá dài → Completion token analytics.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    67: {
      keywords: "OpenAPI tool; API key nằm trong Connection1; trace thiếu header; lỗi 401",
      mnemonic: "Secret ở connection nào thì nối tool đúng connection đó.",
      trapNotes: {
        A: "Sai: identity passthrough gửi Microsoft Entra token của người gọi, chỉ dùng khi API đích hỗ trợ xác thực Entra theo từng người dùng.",
        B: "Sai: OpenAPI spec phải khai báo security scheme và tên header, nhưng không nên nhúng giá trị API key thay cho connection bảo mật.",
        C: "Sai: default connection không bảo đảm là Connection1 chứa đúng key; chỉ dùng mặc định khi nó chính là kết nối đã cấu hình phù hợp.",
        D: "Đúng: liên kết OpenAPI tool với Connection1 để Agent Service lấy credential đã lưu và chèn theo API-key security scheme."
      },
      ultraShort: "Key ở Connection1 nhưng header thiếu → D. nối tool với Connection1.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/openapi"]
    },
    68: {
      keywords: "prompt template mới; request count không đổi; chi phí tăng; cần phân biệt prompt và completion",
      mnemonic: "Chi phí tăng mà lượt gọi giữ nguyên: đếm input và output token.",
      trapNotes: {
        A: "Sai: Groundedness đo response có được nguồn hỗ trợ, không cho biết prompt hay completion đã dùng bao nhiêu token.",
        B: "Sai: Retrieval evaluation đánh giá chất lượng tài liệu tìm được; nó không đo token đầu vào và đầu ra gây tăng phí model.",
        C: "Đúng: Token usage analytics tách input tokens của prompt và completion tokens của response, đúng hai khả năng cần kiểm tra.",
        D: "Sai: agent execution timeline phân rã thời gian các giai đoạn; dùng tìm chậm, không phải xác định mức tiêu thụ token."
      },
      ultraShort: "Cost tăng, request không đổi, cần input/output → C. Token usage analytics.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability"]
    },
    69: {
      keywords: "answer không được retrieved documents hỗ trợ; thiếu bằng chứng thì trả fallback",
      mnemonic: "Có dựa nguồn không = Groundedness; dưới ngưỡng thì reject để fallback.",
      trapNotes: {
        "Evaluation metric": "Chọn Groundedness vì nó đo claim trong response có được context truy xuất hỗ trợ; Coherence/Fluency đo cách viết, Similarity đo độ giống.",
        "Recommended configuration": "Chọn Reject responses that do not meet the groundedness threshold để ứng dụng thay bằng fallback; tăng temperature/token hoặc fine-tune không bảo đảm bám nguồn."
      },
      ultraShort: "Đo Groundedness; dưới ngưỡng thì reject response và trả fallback.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/observability", "https://learn.microsoft.com/en-us/azure/foundry/guardrails/how-to-create-guardrails"]
    },
    70: {
      keywords: "suspicious sign-in; điều tra incident; tương quan alert đa nguồn; nền tảng SOC tập trung",
      mnemonic: "Sentinel làm SIEM/SOAR; Log Analytics giữ và truy vấn log cho Sentinel.",
      trapNotes: {
        A: "Đúng: Microsoft Sentinel là SIEM/SOAR tập trung để phát hiện, tương quan cảnh báo, điều tra và tự động hóa phản ứng incident.",
        B: "Đúng: Log Analytics workspace là kho và nền truy vấn log mà Sentinel dùng để phân tích sự kiện từ các nguồn đã kết nối.",
        C: "Sai: Azure Monitor Agent thu thập telemetry từ máy và server; nó không phải bộ máy SIEM để tương quan incident đa dịch vụ.",
        D: "Sai: Application Insights theo dõi hiệu năng, request, dependency và exception của ứng dụng, không phải nền tảng SOC tập trung.",
        E: "Sai: OpenTelemetry chuẩn hóa việc thu traces, metrics và logs; nó không cung cấp SIEM, điều tra hay tương quan security alert."
      },
      ultraShort: "SOC tập trung + tương quan alert → A. Microsoft Sentinel và B. Log Analytics workspace.",
      sources: ["https://learn.microsoft.com/en-us/azure/sentinel/overview", "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-workspace-overview"]
    },
    71: {
      keywords: "DefaultAzureCredential đã az login; inference bị 403; Azure OpenAI v1; least privilege",
      mnemonic: "Đã đăng nhập mà 403 là thiếu quyền dữ liệu; chỉ gọi model dùng OpenAI User.",
      trapNotes: {
        A: "Sai theo đáp án đề: Cognitive Services User là vai trò AI services chung, không phải lựa chọn tối thiểu chuyên biệt cho Azure OpenAI inference.",
        B: "Đúng: Cognitive Services OpenAI User cho phép inference bằng Microsoft Entra ID mà không cấp quyền quản lý deployment hoặc tài nguyên.",
        C: "Sai: Contributor cấp quyền quản lý rộng như tạo và sửa tài nguyên, vượt xa nhu cầu chỉ gửi inference request.",
        D: "Sai: Cognitive Services Data Reader chỉ đọc dữ liệu hoặc cấu hình; không có DataAction cần thiết để gọi model inference."
      },
      ultraShort: "Entra đã xác thực, cần inference tối thiểu → B. Cognitive Services OpenAI User.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry-classic/openai/how-to/role-based-access-control"]
    },
    72: {
      keywords: "OCR ảnh tải lên; nối output vào prompt; lệnh độc hại nằm trong embedded text",
      mnemonic: "Chữ từ ảnh là nội dung ngoài: document shield, không phải user shield.",
      trapNotes: {
        A: "Sai: image moderation phát hiện hình ảnh có hại theo các nhóm an toàn, không nhận diện chỉ dẫn độc hại trong text sau OCR.",
        B: "Đúng: Prompt Shields for documents nhắm indirect prompt injection từ tài liệu, web và nội dung ảnh được OCR rồi đưa vào context.",
        C: "Sai: protected material text kiểm tra nội dung được bảo hộ, không ngăn embedded instruction thao túng hành vi model.",
        D: "Sai: Prompt Shields for user prompts dành cho direct attack do người dùng gõ; chỉ dùng nó sẽ bỏ sót document attack qua OCR."
      },
      ultraShort: "OCR biến chữ trong ảnh thành document attack → B. Prompt Shields for documents.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields"]
    }
  };

  window.AI103_TIP_GUIDES = {
    ...(window.AI103_TIP_GUIDES || {}),
    ...guides
  };
})();
