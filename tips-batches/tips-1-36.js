(() => {
  const guides = {
    1: {
      keywords: "cuộc gọi trực tiếp; âm thanh dạng luồng; bản chép lời trong vài giây",
      mnemonic: "Âm thanh đang chảy, chữ phải hiện ngay → real-time speech to text.",
      trapNotes: {
        A: "Sai: text to speech biến chữ thành tiếng; chỉ dùng khi cần tổng hợp giọng nói.",
        B: "Sai: speech translation dùng khi phải dịch lời nói; đề cần bản chép lời trực tiếp, không cần bản dịch.",
        C: "Sai: batch transcription dành cho tệp thu sẵn và trả kết quả bất đồng bộ, không theo kịp cuộc gọi.",
        D: "Đúng: real-time speech to text nhận luồng âm thanh và trả chữ tức thời, phù hợp cuộc gọi đang diễn ra."
      },
      ultraShort: "Luồng cuộc gọi + chữ trong vài giây → D. real-time speech to text.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text"]
    },
    2: {
      keywords: "PDF quét; giữ bố cục và bảng; nhận QR; không cần triển khai LLM",
      mnemonic: "Cần vị trí, bảng và mã → prebuilt-layout.",
      trapNotes: {
        A: "Sai: prebuilt-documentFieldSchema dùng khi cần các trường theo schema, không ưu tiên toàn bộ bố cục.",
        B: "Sai: prebuilt-read phù hợp OCR chữ cơ bản; không giữ cấu trúc bảng và section phong phú.",
        C: "Sai: prebuilt-documentSearch tối ưu nội dung cho tìm kiếm, không phải trích xuất bố cục chi tiết.",
        D: "Đúng: prebuilt-layout trả phần tử bố cục, bảng và barcode/QR mà không cần triển khai LLM."
      },
      ultraShort: "Giữ layout/bảng + QR, không LLM → D. prebuilt-layout.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-templates"]
    },
    3: {
      keywords: "ảnh tải lên có lệnh độc; ngăn prompt injection; nội dung bên thứ ba ít tin cậy",
      mnemonic: "Muốn chặn thì Block; muốn hạ độ tin cậy nguồn ngoài thì Spotlighting.",
      trapNotes: {
        "Prompt shields action": "Chọn Set action to block để dừng document attack; annotate chỉ gắn cờ, disable thì bỏ bảo vệ.",
        "Additional mitigation": "Chọn Enable Spotlighting để đánh dấu nội dung ngoài là ít tin cậy; blocklist/OCR không tạo ranh giới tin cậy."
      },
      ultraShort: "Document attack → Block; nội dung bên thứ ba → Enable Spotlighting.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields"]
    },
    4: {
      keywords: "nhiều ứng dụng dùng chung Search; cấm key; giảm quản trị",
      mnemonic: "Cấu hình dùng chung đặt ở project connection, không lặp trong từng app.",
      trapNotes: {
        A: "Sai: custom HTTP và cấu hình từng ứng dụng làm tăng công quản trị; chỉ dùng cho tích hợp không có connection chuyên biệt.",
        B: "Đúng: Azure AI Search connection tại Project1 tập trung endpoint và Microsoft Entra authentication để nhiều app tái dùng.",
        C: "Sai: gọi trực tiếp bằng Microsoft Entra tránh key nhưng vẫn lặp cấu hình Search trong từng ứng dụng.",
        D: "Sai: managed identity bảo mật danh tính, nhưng mỗi ứng dụng vẫn phải tự cấu hình và gọi Search."
      },
      ultraShort: "Dùng chung Search + không key + ít quản trị → B. project Azure AI Search connection.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-studio/how-to/connections-add"]
    },
    5: {
      keywords: "một agent run; thứ tự LLM/tool; thời gian từng bước",
      mnemonic: "Muốn xem đường đi chi tiết của một lần chạy → tracing.",
      trapNotes: {
        A: "Sai: token usage đo lượng token và chi phí, không hiện thứ tự gọi tool hay thời gian từng span.",
        B: "Sai: monitoring phù hợp xu hướng tổng hợp và cảnh báo, không mổ xẻ chuỗi bước của một run.",
        C: "Sai: safety metrics đo nội dung rủi ro, không xác định tool hay LLM nào gây chậm hoặc sai.",
        D: "Đúng: tracing ghi các span theo thứ tự, gồm LLM call, tool invocation, lỗi và latency."
      },
      ultraShort: "Xem từng run, thứ tự tool/LLM và timing → D. tracing.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup"]
    },
    6: {
      keywords: "web công khai mới nhất; tính toán; tài liệu tải trực tiếp lên agent",
      mnemonic: "Web mới = Bing; tính = Code Interpreter; file tải lên = File Search.",
      trapNotes: {
        "Access up-to-date information from public websites": "Chọn Grounding with Bing Search cho web công khai hiện thời; các tool còn lại không cung cấp tìm kiếm web mới.",
        "Perform calculations during conversations": "Chọn Code interpreter để chạy Python và tính chính xác; File search/Bing chỉ truy xuất, Computer use thao tác giao diện.",
        "Retrieve information from documents uploaded directly to the agent": "Chọn File search để lập chỉ mục và truy xuất file người dùng tải lên; Azure AI Search dùng chỉ mục có sẵn bên ngoài."
      },
      ultraShort: "Web mới → Bing; tính toán → Code interpreter; file tải lên → File search.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog"]
    },
    7: {
      keywords: "OpenAPI 3.0; khóa trong HTTP header; giá trị khóa ở project connection",
      mnemonic: "Khóa API trong header phải được khai báo bằng security scheme.",
      trapNotes: {
        A: "Sai: header parameter chỉ mô tả trường đầu vào, không ràng buộc chuẩn xác thực với connection.",
        B: "Sai: Key Vault có thể giữ bí mật nhưng không thay khai báo xác thực trong OpenAPI specification.",
        C: "Đúng: API key security scheme khai báo vị trí header để tool tự lấy khóa từ connection khi gọi API.",
        D: "Sai: Bearer token security scheme dành cho bearer/OAuth token, không phải API key trong header."
      },
      ultraShort: "API key ở header, lấy từ connection → C. API key security scheme.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/openapi"]
    },
    8: {
      keywords: "quy trình xác định; rẽ nhánh; trạng thái chung; hành động tùy chọn; ít code",
      mnemonic: "Có bước, nhánh và state chung → workflow.",
      trapNotes: {
        A: "Đúng: workflow cung cấp sẵn các bước xác định, điều kiện và shared state nên giảm code điều phối.",
        B: "Sai: threads/runs giữ hội thoại nhưng không tự tạo quy trình nhiều agent có nhánh xác định.",
        C: "Sai: group chat hợp với cộng tác linh hoạt giữa agent, không bảo đảm luồng nghiệp vụ xác định.",
        D: "Sai: điều phối trong application code làm được nhưng phải tự quản lý nhánh và state, trái yêu cầu giảm công."
      },
      ultraShort: "Deterministic steps + nhánh + shared state → A. workflow.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow"]
    },
    9: {
      keywords: "triển khai production; baseline đã duyệt mới nhất; regression vượt dung sai phải dừng",
      mnemonic: "So đúng chuẩn đã duyệt; tụt quá ngưỡng thì fail.",
      trapNotes: {
        "Evaluation comparison": "Chọn latest approved baseline vì đó là chuẩn chất lượng được phê duyệt; run trước, log production hay default branch không phải baseline.",
        "If evaluation regression exceeds the configured tolerance": "Chọn Fail the workflow để chặn deployment; cảnh báo, retry hoặc khóa branch không trực tiếp bảo đảm dừng bản suy giảm."
      },
      ultraShort: "So với latest approved baseline; vượt tolerance → Fail the workflow.",
      sources: ["https://learn.microsoft.com/en-us/training/modules/automated-evaluation-genaiops/"]
    },
    10: {
      keywords: "LangChain; OpenTelemetry; cùng Application Insights; tách service; không ghi nội dung",
      mnemonic: "Không tracer thì không trace; khác service name thì tách; recording=false thì không ghi nội dung.",
      trapNotes: {
        "The LangChain service will appear in Traces without configuring a tracer.": "Chọn No: LangChain phải được instrument và truyền tracer/callback thì span mới được xuất sang Application Insights.",
        "Setting different OTEL_SERVICE_NAME values separates the services in Application Insights.": "Chọn Yes: OTEL_SERVICE_NAME gắn định danh dịch vụ lên resource của span, giúp lọc hai service trong cùng nơi lưu.",
        "When using enable_content_recording=False, prompts and tool data will be captured in the telemetry.": "Chọn No: false tắt ghi prompt, response và dữ liệu tool; vẫn giữ telemetry vận hành không chứa nội dung."
      },
      ultraShort: "Không tracer=No; khác OTEL_SERVICE_NAME=Yes; recording=false vẫn ghi nội dung=No.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-framework"]
    },
    11: {
      keywords: "chỉnh ảnh từ ảnh sản phẩm; giữ nhận dạng và đặc trưng hình ảnh",
      mnemonic: "Muốn bám sát ảnh đầu vào → input_fidelity=high.",
      trapNotes: {
        A: "Đúng: input_fidelity=high tăng mức giữ phong cách và đặc trưng chủ thể của ảnh đầu vào khi edit.",
        B: "Sai: groundedness filter đánh giá nội dung có căn cứ, không điều khiển độ trung thành của ảnh.",
        C: "Sai: prompt và input image là đầu vào cần thiết nhưng chưa đặt mức ưu tiên giữ nhận dạng cao.",
        D: "Sai: temperature điều khiển độ ngẫu nhiên của sinh văn bản/mô hình, không thay input fidelity của image edit."
      },
      ultraShort: "Giữ identity của ảnh sản phẩm khi edit → A. input_fidelity=high.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e"]
    },
    12: {
      keywords: "sở thích qua nhiều cuộc trò chuyện; thẻ thanh toán chỉ trong phiên; ít phát triển",
      mnemonic: "Thông tin cần nhớ lâu vào memory; bí mật dùng tạm ở session.",
      trapNotes: {
        A: "Sai: persistent memory hợp với sở thích lâu dài nhưng không được giữ dữ liệu thẻ sau phiên.",
        B: "Đúng: persistent memory giữ sở thích; session context giữ thẻ tạm thời rồi loại bỏ khi hội thoại kết thúc.",
        C: "Sai: conversation history không phải kho sở thích bền vững và có thể giữ dữ liệu nhạy cảm quá lâu.",
        D: "Sai: Azure AI Search không phải nơi lưu thẻ thanh toán; session context cũng không giữ sở thích qua phiên."
      },
      ultraShort: "Sở thích → persistent memory; thẻ trong phiên → session context: B.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory"]
    },
    13: {
      keywords: "mọi run phải retrieval; agent đã publish dùng danh tính riêng; cô lập và audit",
      mnemonic: "Bắt buộc tool = required; publish riêng = distinct agent identity.",
      trapNotes: {
        "Set tool_choice to": "Chọn required để mỗi run phải gọi ít nhất một tool; auto có thể bỏ qua, none cấm hoàn toàn tool.",
        "Configure the tool to authenticate by": "Chọn distinct agent identity bound to client application để cô lập quyền và audit; shared identity không cô lập, key trong prompt không an toàn."
      },
      ultraShort: "Luôn gọi tool → required; cô lập quyền agent publish → distinct agent identity.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/administrator-guide"]
    },
    14: {
      keywords: "câu hỏi phức hợp; nhiều chunk; lịch sử hội thoại; truy vấn song song",
      mnemonic: "Agent lập kế hoạch, tách câu hỏi, tìm song song → agentic RAG.",
      trapNotes: {
        A: "Sai: iterative retrieval thường tinh chỉnh tuần tự; không mặc định lập kế hoạch theo chat và chạy subquery song song.",
        B: "Đúng: agentic RAG dùng chat history, tách câu hỏi thành subquery và thực thi song song để tăng độ phủ.",
        C: "Sai: chain of thought là kỹ thuật suy luận, không phải cơ chế retrieval của Azure AI Search.",
        D: "Sai: classic RAG thường là một truy vấn rồi sinh đáp án; phù hợp luồng đơn giản, không có query planning đa lượt."
      },
      ultraShort: "Chat-aware + tách câu phức hợp + retrieval song song → B. agentic RAG.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"]
    },
    15: {
      keywords: "thẻ nhân viên quét; field xác định; schema có cấu trúc; ít hậu xử lý",
      mnemonic: "Biết trước trường cần lấy → documentFieldSchema.",
      trapNotes: {
        A: "Sai: prebuilt-layout giữ cấu trúc trang nhưng không tập trung trả các field nghiệp vụ theo schema.",
        B: "Sai: prebuilt-documentSearch phục vụ tìm kiếm/RAG, không phải trích field định danh có cấu trúc.",
        C: "Đúng: prebuilt-documentFieldSchema trích các field định trước và trả kết quả theo schema để giảm parsing.",
        D: "Sai: prebuilt-read chỉ OCR nội dung cơ bản; muốn ID, tên, ngày hết hạn phải tự hậu xử lý."
      },
      ultraShort: "Field định trước + structured schema → C. prebuilt-documentFieldSchema.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-templates"]
    },
    16: {
      keywords: "agent đôi khi bỏ gọi tool; phải gọi ít nhất một tool; Python payload",
      mnemonic: "Cặp khóa ép tool: tool_choice = required.",
      trapNotes: {
        "First blank": "Chọn \"tool_choice\" vì tham số này điều khiển model có bắt buộc gọi tool; tools chỉ liệt kê công cụ khả dụng.",
        "Second blank": "Chọn \"required\" để bắt buộc ít nhất một tool call; \"auto\" vẫn cho model trả lời trực tiếp."
      },
      ultraShort: "Ép agent gọi tool → \"tool_choice\": \"required\".",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/function-calling"]
    },
    17: {
      keywords: "HTTP 429; throttling khi tải cao; retry trong giới hạn",
      mnemonic: "429 thì lùi dần và lệch nhịp: exponential backoff + jitter.",
      trapNotes: {
        A: "Sai: thread mới không đổi quota; retry ngay còn làm nghẽn nặng hơn và tiếp tục bị tính vào giới hạn.",
        B: "Sai: số tool đã đăng ký không giải quyết rate limit của model deployment.",
        C: "Đúng: exponential backoff tăng thời gian chờ, jitter tránh nhiều client retry đồng loạt; nên tôn trọng Retry-After.",
        D: "Sai: chia nhỏ file có thể đổi kích thước request nhưng không phải chiến lược xử lý 429 tổng quát."
      },
      ultraShort: "HTTP 429 dưới tải → C. exponential backoff + jitter.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/quota"]
    },
    18: {
      keywords: "nhiều prompt flow/agent; cùng model resource bên ngoài; tái dùng cấu hình",
      mnemonic: "Tái dùng endpoint và auth trong project → connection.",
      trapNotes: {
        A: "Đúng: connection tập trung endpoint và xác thực của model resource để mọi ứng dụng trong Project1 tái dùng.",
        B: "Sai: managed private endpoint giải quyết đường mạng riêng, không phải chia sẻ cấu hình model.",
        C: "Sai: RBAC cấp quyền truy cập nhưng không đóng gói endpoint/auth thành cấu hình dùng chung cho ứng dụng.",
        D: "Sai: diagnostic settings thu log và metric, không tạo tham chiếu model dùng lại."
      },
      ultraShort: "Nhiều app dùng chung model resource → A. create a connection.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-studio/how-to/connections-add"]
    },
    19: {
      keywords: "RAG; kiểm tra đáp án bám tài liệu; chặn merge nếu dưới ngưỡng",
      mnemonic: "Đo độ bám nguồn bằng Groundedness; gate PR bằng workflow bắt buộc pass.",
      trapNotes: {
        "Evaluation to execute": "Chọn Groundedness evaluation vì đo câu trả lời có được tài liệu retrieved hỗ trợ; fluency, similarity và safety đo mục tiêu khác.",
        "Pull request policy": "Chọn require evaluation workflow to succeed before merging để tạo quality gate; retry, notify hay chạy sau deploy không chặn merge lỗi."
      },
      ultraShort: "RAG bám nguồn → Groundedness; PR chỉ merge khi evaluation workflow pass.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/agent-evaluators"]
    },
    20: {
      keywords: "nhiều biến thể từ ảnh gốc; giữ bố cục, ánh sáng, chủ thể",
      mnemonic: "Theo đề, A là image_variation; Learn hiện hành đặt variations dưới Image Edit API.",
      trapNotes: {
        A: "Đúng theo wording của đề. Microsoft Learn hiện hành mô tả variations qua Image Edit API, nhưng không xác nhận mode/parameter tên image_variation.",
        B: "Sai: mask_inpainting dùng sửa vùng chọn; mask toàn ảnh làm mất mục tiêu giữ nguyên bố cục.",
        C: "Sai: text_to_image sinh mới từ mô tả, không bảo đảm đúng bố cục và ánh sáng của ảnh gốc.",
        D: "Sai: image_to_image với strength=1.0 ưu tiên tái sinh mạnh, dễ rời xa ảnh đầu vào."
      },
      ultraShort: "Theo wording đề: A. image_variation; Learn hiện hành: variations qua Image Edit API, không xác nhận mode/parameter này.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e"]
    },
    21: {
      keywords: "PDF quét; OCR; bảng nhiều trang; chunk theo cấu trúc; metadata số trang",
      mnemonic: "Theo nhãn trong đề, chọn advanced data parsing; nguồn chỉ xác nhận năng lực parsing/layout.",
      trapNotes: {
        A: "Đúng theo nhãn trong đề/surface ingestion. Nguồn Learn xác nhận parsing/layout có OCR và phần tử trang, bảng, section; không xác nhận literal advanced data parsing.",
        B: "Sai: OCR cộng page-level chunking vẫn gom theo ranh giới trang, không bảo toàn chunk theo bảng/heading.",
        C: "Sai: mỗi trang một chunk làm chunk lớn và cắt quan hệ bảng nhiều trang, giảm độ chính xác retrieval.",
        D: "Sai: basic parsing và fixed-size chunking tiếp tục làm mất cấu trúc ngữ nghĩa và metadata trang."
      },
      ultraShort: "Theo nhãn đề: A. advanced data parsing; Learn chỉ xác nhận OCR/cấu trúc/layout, không xác nhận literal này.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/document/elements"]
    },
    22: {
      keywords: "web nội bộ không API; tải log qua GUI; phân tích bottleneck",
      mnemonic: "Thao tác màn hình bằng Computer use; phân tích file bằng Code interpreter.",
      trapNotes: {
        A: "Đúng: Computer use điều khiển GUI để tải log; Code interpreter chạy Python để phân tích hiệu năng.",
        B: "Sai: File search/Fabric không tự thao tác ứng dụng web nội bộ không có API để tải tệp.",
        C: "Sai: Bing Search chỉ truy cập web công khai, không đăng nhập và thao tác ứng dụng nội bộ.",
        D: "Sai: Computer use tải được file nhưng File search thiên về truy xuất văn bản, không tính toán bottleneck như code."
      },
      ultraShort: "GUI không API → Computer use; phân tích log → Code interpreter: A.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog"]
    },
    23: {
      keywords: "model unavailable; 429 do capacity; inference failure; metrics và diagnostic log",
      mnemonic: "Sức khỏe/công suất xem Availability + Utilization; lỗi từng request xem RequestResponse.",
      trapNotes: {
        "Metrics to enable": "Chọn Model Availability Rate và Provisioned Utilization để tách lỗi availability khỏi quá tải 429; token/latency không đủ chỉ nguyên nhân.",
        "Diagnostic log to collect": "Chọn RequestResponse vì có status code, latency và chi tiết từng inference; AllMetrics là tổng hợp, audit là quản trị, trace khác mục tiêu."
      },
      ultraShort: "Availability/capacity → hai metrics; lỗi inference → RequestResponse log.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/monitor-models"]
    },
    24: {
      keywords: "Python ngoài portal; end-to-end trace; latency và exception",
      mnemonic: "Instrument bằng OpenTelemetry, lưu và xem bằng Application Insights.",
      trapNotes: {
        A: "Sai: Log Analytics có thể lưu/truy vấn log nhưng tự nó không instrument distributed trace trong Python.",
        B: "Đúng: Application Insights thu, liên kết và hiển thị dependency, exception cùng end-to-end trace.",
        C: "Đúng: OpenTelemetry instrument dịch vụ Python ngoài portal và xuất span sang Application Insights.",
        D: "Sai: Azure Monitor Agent chủ yếu thu telemetry máy chủ/VM, không thay instrumentation trong ứng dụng Python.",
        E: "Sai: Microsoft Sentinel phục vụ SIEM và phân tích bảo mật, không phải APM trace của agent."
      },
      ultraShort: "Trace Python ngoài portal → B. Application Insights + C. OpenTelemetry.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-client-side"]
    },
    25: {
      keywords: "nhiều tool call độc lập; đang chờ tuần tự; giảm tổng latency bằng application logic",
      mnemonic: "Không phụ thuộc nhau thì chạy đồng thời.",
      trapNotes: {
        A: "Đúng: gọi các tool độc lập song song làm tổng thời gian gần với lời gọi chậm nhất thay vì cộng dồn.",
        B: "Sai: tăng max completion tokens chỉ cho phép đáp án dài hơn và có thể tăng latency inference.",
        C: "Sai: model lớn hơn không sửa việc application đang chờ tool tuần tự, còn có thể chậm và tốn hơn.",
        D: "Sai: persistent memory giữ thông tin qua hội thoại, không rút ngắn các tool call độc lập hiện tại."
      },
      ultraShort: "Tool call độc lập gây chờ → A. thực thi song song.",
      sources: ["https://learn.microsoft.com/en-us/semantic-kernel/concepts/ai-services/chat-completion/function-calling/function-invocation"]
    },
    26: {
      keywords: "đáp án không được tài liệu hỗ trợ; phản hồi vi phạm chính sách",
      mnemonic: "Không bám nguồn xem Groundedness; không an toàn xem Risk and safety.",
      trapNotes: {
        "Unsupported responses": "Chọn Groundedness evaluation metrics để đo đáp án có dựa trên retrieved documents; latency và token không đo tính có căn cứ.",
        "Policy violations": "Chọn Risk and safety metrics để đo nhóm nội dung gây hại/không tuân thủ; groundedness chỉ đo quan hệ với nguồn."
      },
      ultraShort: "Unsupported → Groundedness; policy violation → Risk and safety.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/risk-safety-evaluators"]
    },
    27: {
      keywords: "xóa vật thể nền; chỉ sửa trong vùng mask; giữ ánh sáng và phong cách",
      mnemonic: "Sửa đúng vùng tô → mask_inpainting.",
      trapNotes: {
        A: "Sai: image_variation tạo biến thể toàn ảnh, không giới hạn thay đổi trong vùng được chọn.",
        B: "Sai: text_to_image sinh ảnh mới từ chữ nên không bảo toàn chắc chắn phần ngoài vùng cần xóa.",
        C: "Sai: image_to_image strength cao tái sinh rộng, dễ thay đổi cả phần không được chọn.",
        D: "Đúng: mask_inpainting nhận ảnh và mask, chỉnh vùng chỉ định trong khi giữ phần còn lại."
      },
      ultraShort: "Chỉ sửa vùng mask, giữ phần còn lại → D. mask_inpainting.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e"]
    },
    28: {
      keywords: "Search reachable; auth thành công; index not found; thuộc tính index",
      mnemonic: "Connection tìm service; index property tìm đúng index name.",
      trapNotes: {
        A: "Sai: service name nhận diện dịch vụ Azure AI Search, không nhận diện chỉ mục nằm trong dịch vụ.",
        B: "Sai: endpoint URL định vị dịch vụ và thuộc connection, không phải giá trị của index property.",
        C: "Đúng: index property phải là Azure AI Search index name chính xác, có phân biệt tên theo cấu hình.",
        D: "Sai: Foundry project name nhận diện project chứa agent, không ánh xạ tới search index."
      },
      ultraShort: "Kết nối/auth ổn nhưng index not found → C. đặt index bằng index name.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/ai-search"]
    },
    29: {
      keywords: "sở thích qua nhiều conversation; người dùng tải tài liệu trong chat để grounding",
      mnemonic: "Nhớ lâu dùng memory; file trong chat dùng File search.",
      trapNotes: {
        "To retain user preferences across conversations, use": "Chọn Agent memory with persistent storage để giữ sở thích qua session; history và session context không phải hồ sơ bền vững.",
        "To enable users to provide contextual grounding during chats, use the": "Chọn File search để lập chỉ mục file tải lên trong chat; Azure AI Search dùng index có sẵn, Code interpreter dùng phân tích/tính toán."
      },
      ultraShort: "Sở thích lâu dài → persistent memory; file chat → File search.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory", "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog"]
    },
    30: {
      keywords: "thay riêng bầu trời; mask vùng trời; giữ nguyên foreground",
      mnemonic: "Muốn đổi vùng nào, mask đúng vùng đó rồi inpaint.",
      trapNotes: {
        A: "Sai: image_variation biến đổi toàn ảnh, không bảo đảm giữ nguyên mọi đối tượng foreground.",
        B: "Đúng: mask_inpainting chỉ thay vùng trời được mask bằng sunset và bảo toàn vùng không mask.",
        C: "Sai: text_to_image dựng một phong cảnh mới, không giữ chính xác foreground gốc.",
        D: "Sai: image_to_image strength cao có thể tái sinh cả foreground ngoài vùng trời."
      },
      ultraShort: "Đổi riêng vùng trời, giữ foreground → B. mask_inpainting + mask bầu trời.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e"]
    },
    31: {
      keywords: "nhiều agent cùng Azure AI Search; quản lý credential tập trung trong project",
      mnemonic: "Một resource dùng chung trong project → một connection dùng chung.",
      trapNotes: {
        A: "Sai: RBAC xác định quyền trên Search nhưng không tạo đối tượng cấu hình/credential dùng chung trong Project1.",
        B: "Sai: tắt key buộc dùng Microsoft Entra nhưng chưa cung cấp cấu hình tập trung cho các agent.",
        C: "Đúng: project connection tập trung endpoint và authentication để mọi agent tham chiếu cùng một nơi.",
        D: "Sai: managed private endpoint giải quyết kết nối mạng riêng, không quản lý credential dùng chung."
      },
      ultraShort: "Nhiều agent dùng chung Search credential → C. project connection.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-studio/how-to/connections-add"]
    },
    32: {
      keywords: "ảnh tải lên; phân loại nội dung gây hại; chặn theo severity",
      mnemonic: "Rủi ro nằm trong hình và có mức độ → image moderation.",
      trapNotes: {
        A: "Sai: OCR và keyword chỉ xét chữ trong ảnh, bỏ sót bạo lực, tình dục và nội dung gây hại thuần hình ảnh.",
        B: "Sai: Prompt Shields phát hiện prompt injection, không phân loại harm category/severity của ảnh.",
        C: "Sai: blocklist khớp từ/cụm từ đã biết, không đánh giá nội dung thị giác theo severity.",
        D: "Đúng: image moderation phân loại ảnh theo nhóm harm và severity để ứng dụng áp ngưỡng chặn."
      },
      ultraShort: "Ảnh gây hại + chặn theo severity → D. image moderation.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-safety/quickstart-image"]
    },
    33: {
      keywords: "refund; workflow YAML; dừng chờ người duyệt; chỉ hoàn tiền khi approved",
      mnemonic: "Theo schema/version của đề: ask_question để chờ; kiểm approved để chạy.",
      trapNotes: {
        "Approval step type": "Theo literal schema/version của đề, chọn ask_question. Nguồn Learn hiện hành chỉ xác nhận HITL có thể tạm dừng/chờ input, không xác nhận tên key này.",
        "Execute refund condition": "Chọn approval == \"approved\" để chỉ gọi refund sau chấp thuận; output khác null hay true vẫn cho chạy khi chưa duyệt."
      },
      ultraShort: "Theo schema/version đề: ask_question; Learn chỉ xác nhận HITL pause/wait. Refund khi approval == \"approved\".",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow"]
    },
    34: {
      keywords: "RAG; sau cập nhật content đáp án kém; kiểm retrieved content ảnh hưởng output",
      mnemonic: "Muốn biết đáp án có bám context truy xuất → Groundedness.",
      trapNotes: {
        A: "Sai: indexer status cho biết ingest thành công/thất bại, không chấm quan hệ giữa retrieved context và đáp án.",
        B: "Sai: latency traces chỉ ra bước nào chậm, không đánh giá retrieved content làm câu trả lời sai.",
        C: "Sai: prediction drift dùng theo dõi phân phối dự đoán ML, không phải chất lượng grounding của RAG.",
        D: "Đúng: groundedness metrics đo mức câu trả lời được context truy xuất hỗ trợ, đúng vấn đề cần xác định."
      },
      ultraShort: "Retrieved content có làm đáp án lệch? → D. groundedness evaluation metrics.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/how-to/evaluate-generative-ai-app"]
    },
    35: {
      keywords: "RAG tài liệu pháp lý dài; bỏ sót clause; chỉ đổi application logic",
      mnemonic: "Thiếu ngữ cảnh thì lấy thêm chunk trước khi dựng prompt.",
      trapNotes: {
        A: "Đúng: tăng số relevant chunks đưa vào prompt mở rộng context để model thấy các điều khoản bị bỏ sót.",
        B: "Sai: Prompt Shields chống instruction độc hại trong tài liệu, không tăng độ phủ retrieval.",
        C: "Sai: Content Safety annotate nội dung rủi ro, không bổ sung clause còn thiếu vào context.",
        D: "Sai: temperature thấp làm output ổn định hơn nhưng không cung cấp điều khoản mà retrieval chưa đưa vào."
      },
      ultraShort: "Thiếu clause, không đổi index/model → A. tăng số retrieved chunks.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"]
    },
    36: {
      keywords: "invoice đơn lẻ số lượng lớn giá rẻ; cross-document; multi-step reasoning; reference data",
      mnemonic: "Một file, dễ, nhiều → standard; nhiều file, suy luận chéo → pro.",
      trapNotes: {
        Pipeline1: "Chọn Single-file task in standard mode: mỗi invoice độc lập, ưu tiên throughput, chi phí và latency; pro là thừa.",
        Pipeline2: "Chọn Multi-file task in pro mode: cần so sánh nhiều tài liệu, reference data và multi-step reasoning; standard không infer."
      },
      ultraShort: "Pipeline1: single-file standard; Pipeline2: multi-file pro.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/standard-pro-modes"]
    }
  };

  window.AI103_TIP_GUIDES = { ...(window.AI103_TIP_GUIDES || {}), ...guides };
})();
