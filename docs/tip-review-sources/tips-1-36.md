# Nguồn kiểm chứng mẹo AI-103 — Q1–Q36

| Câu | Chủ đề | Nguồn Microsoft Learn | Ghi chú kiểm chứng |
|---|---|---|---|
| Q1 | Speech to text trực tiếp | https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text | Real-time transcription trả kết quả tức thời cho audio trực tiếp; batch dành cho audio thu sẵn. |
| Q2 | Content Understanding layout | https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-templates | `prebuilt-layout` lấy bảng, section và layout; nhóm content extraction không cần LLM. |
| Q3 | Prompt Shields và Spotlighting | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields | Document attack có action block/annotate; Spotlighting đánh dấu nội dung ngoài là ít tin cậy. |
| Q4 | Project connection cho Azure AI Search | https://learn.microsoft.com/en-us/azure/ai-studio/how-to/connections-add | Connection tập trung endpoint và kiểu xác thực để project tái sử dụng. |
| Q5 | Tracing agent | https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup | Trace ghi latency, exception, prompt/retrieval và chuỗi hoạt động của run. |
| Q6 | Tool catalog | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog | Bing/web search cho web mới; Code Interpreter chạy Python; File Search dùng file tải lên. |
| Q7 | OpenAPI tool authentication | https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/openapi | API key security scheme khai báo key ở header và gắn với xác thực của tool/connection. |
| Q8 | Workflow nhiều agent | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow | Workflow dành cho bước xác định, điều kiện và state; phù hợp quy trình nghiệp vụ. |
| Q9 | Evaluation trong GitHub Actions | https://learn.microsoft.com/en-us/training/modules/automated-evaluation-genaiops/ | Evaluation được tích hợp CI để làm quality gate trước triển khai. |
| Q10 | LangChain và OpenTelemetry | https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-framework | LangChain cần instrumentation/tracer; OpenTelemetry resource định danh service; có tùy chọn không ghi content. |
| Q11 | Image edit input fidelity | https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e | `input_fidelity` điều khiển mức giữ phong cách/đặc trưng của ảnh đầu vào khi edit. |
| Q12 | Persistent agent memory | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory | User profile memory lưu sở thích bền vững; dữ liệu chỉ dùng trong phiên không nên đưa vào memory lâu dài. |
| Q13 | Tool bắt buộc và agent identity | https://learn.microsoft.com/en-us/azure/foundry/concepts/administrator-guide | Agent publish có danh tính Entra riêng; role được cấp đúng identity để cô lập và audit. |
| Q14 | Agentic retrieval | https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview | Dùng chat history để lập kế hoạch, tách subquery và chạy truy vấn song song. |
| Q15 | Document field schema | https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-templates | `prebuilt-documentFieldSchema` dành cho trích field theo schema, khác OCR/layout thuần. |
| Q16 | `tool_choice=required` | https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/function-calling | `tool_choice` điều khiển hành vi gọi tool; `required` buộc ít nhất một tool call. |
| Q17 | Retry HTTP 429 | https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/quota | Microsoft khuyến nghị tôn trọng retry header hoặc exponential backoff có jitter và giới hạn số lần. |
| Q18 | Connection tới model resource | https://learn.microsoft.com/en-us/azure/ai-studio/how-to/connections-add | Project connection là đối tượng dùng chung cấu hình và xác thực tài nguyên ngoài. |
| Q19 | Groundedness quality gate | https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/agent-evaluators | Groundedness đo đáp án theo context/tool output; workflow bắt buộc pass mới là merge gate. |
| Q20 | Biến thể ảnh | https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e | Đối chiếu nhóm image generation/edit từ ảnh đầu vào; variation khác mask edit và text-to-image. |
| Q21 | Cấu trúc tài liệu và metadata trang | https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/document/elements | Output giữ page, section, table, Markdown và quan hệ bảng nhiều trang, phù hợp structure-aware RAG. |
| Q22 | Computer Use và Code Interpreter | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog | Computer Use thao tác UI; Code Interpreter thực thi Python để phân tích tệp. |
| Q23 | Model metrics và RequestResponse log | https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/monitor-models | Model Availability Rate, Provisioned Utilization và RequestResponse được định nghĩa đúng mục tiêu chẩn đoán. |
| Q24 | Client-side tracing | https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-client-side | Dịch vụ ngoài portal instrument bằng OpenTelemetry và xuất span sang Application Insights. |
| Q25 | Tool call song song | https://learn.microsoft.com/en-us/semantic-kernel/concepts/ai-services/chat-completion/function-calling/function-invocation | Các function độc lập có thể được invoke đồng thời để giảm số lượt chờ. |
| Q26 | Groundedness và risk/safety | https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/risk-safety-evaluators | Groundedness thuộc chất lượng theo nguồn; risk/safety evaluator đo nhóm vi phạm nội dung. |
| Q27 | Mask image edit | https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e | Mask xác định vùng model được sửa; vùng ngoài mask được giữ làm ngữ cảnh. |
| Q28 | Azure AI Search `index_name` | https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/ai-search | Tool yêu cầu `index_name`; troubleshooting ghi index mismatch gây “index not found”. |
| Q29 | Memory và File Search | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory | Memory giữ sở thích qua session. |
| Q29 | File tải trong chat | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog | File Search truy xuất file tải lên/proprietary documents. |
| Q30 | Mask vùng trời | https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e | Image edit có mask giới hạn vùng cần thay, tránh tái sinh foreground. |
| Q31 | Connection Search dùng chung | https://learn.microsoft.com/en-us/azure/ai-studio/how-to/connections-add | Connection trong project quản lý tài nguyên kết nối tập trung cho các agent. |
| Q32 | Image moderation theo severity | https://learn.microsoft.com/en-us/azure/ai-services/content-safety/quickstart-image | Analyze image trả harm category, severity 0/2/4/6 và kết quả Accepted/Rejected theo filter. |
| Q33 | Human approval workflow | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow | Workflow có bước tương tác/điều kiện; approval gate phải kiểm giá trị approved trước action. |
| Q34 | Groundedness evaluation | https://learn.microsoft.com/en-us/azure/foundry/how-to/evaluate-generative-ai-app | Groundedness đo response có được context cung cấp hỗ trợ. |
| Q35 | Độ phủ retrieval cho RAG | https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview | Retrieval trả chunks làm grounding context; tăng độ phủ context là thay đổi application-side, khác safety/temperature. |
| Q36 | Content Understanding standard/pro | https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/standard-pro-modes | Standard tối ưu chi phí/latency; pro hỗ trợ nhiều input, reference data và multi-step reasoning. |

## Điểm cần lưu ý khi review chéo

- Q20 dùng tên `image_variation` theo dữ liệu đề; tài liệu hiện hành tập trung API image generation/edit và có thể đổi tên surface theo phiên bản.
- Q21 dùng cụm “advanced data parsing” theo đáp án đề; nguồn Learn xác nhận năng lực OCR, table/section/page metadata, nhưng tên tùy chọn có thể phụ thuộc giao diện ingestion.
- Q33 nguồn workflow đang thay đổi theo portal/SDK; cần giữ nguyên `ask_question` và biểu thức YAML theo dữ liệu đề khi review.

## Fix wave

- Q20: Giữ đáp án A theo wording đề; làm rõ Microsoft Learn hiện hành mô tả variations qua Image Edit API và không xác nhận mode/parameter `image_variation`. Nguồn: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e
- Q21: Ghi rõ `advanced data parsing` là nhãn trong đề/surface ingestion; nguồn hiện tại chỉ xác nhận năng lực OCR, parsing và layout (page/section/table), không xác nhận literal này. Nguồn: https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/document/elements
- Q33: Ghi rõ `ask_question` là literal theo schema/version của đề; nguồn workflow hiện hành chỉ xác nhận hành vi HITL tạm dừng/chờ input, không xác nhận tên key. Nguồn: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow
