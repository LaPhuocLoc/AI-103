# Cross-review độc lập mẹo AI-103 (Q1–Q107)

## Phương pháp

- Đọc thiết kế, `questions.js`, `matching-data.js`, cả ba file `tips-batches/*.js` và ba ledger nguồn.
- Với từng câu, đối chiếu stem, choices/matching options, `correct`, explanation và năm trường guide (`keywords`, `mnemonic`, `trapNotes`, `ultraShort`, `sources`). Với câu ghép cặp, kiểm tra trap note theo từng prompt và xem note có phân biệt đủ các lựa chọn trong nhóm hay không.
- Chấm bốn tiêu chí 1–5: Accuracy (A), Keyword (K), Easy Vietnamese (V), Memorability (M). Verdict chỉ là **Pass** khi cả bốn điểm đều từ 4 trở lên.
- Kiểm tra máy xác nhận 107/107 guide tồn tại; 107/107 có đủ trap key theo choices/matching prompts; mỗi guide có ít nhất một URL `learn.microsoft.com`; không có URL ngoài domain này trong `sources`.
- Tra cứu bổ sung chỉ bằng Microsoft Learn/tài liệu Microsoft chính thức cho các điểm dễ nhầm, đặc biệt Q20, Q33, Q44, Q45, Q57, Q59, Q62, Q63, Q64, Q77, Q93, Q97 và Q105.
- Điểm 4 nghĩa là đạt ngưỡng nhưng vẫn có thể biên tập gọn hơn; điểm dưới 4 tạo verdict Fail. Review này đánh giá guide hiện tại, không sửa câu hỏi/đáp án gốc.

## Bảng điểm 107 câu

| Q | A | K | V | M | Verdict |
|---:|---:|---:|---:|---:|:---|
| Q1 | 5 | 5 | 4 | 4 | Pass |
| Q2 | 5 | 5 | 4 | 4 | Pass |
| Q3 | 5 | 5 | 4 | 4 | Pass |
| Q4 | 5 | 5 | 4 | 4 | Pass |
| Q5 | 5 | 5 | 4 | 4 | Pass |
| Q6 | 5 | 5 | 4 | 4 | Pass |
| Q7 | 5 | 5 | 4 | 4 | Pass |
| Q8 | 5 | 5 | 4 | 4 | Pass |
| Q9 | 5 | 5 | 4 | 4 | Pass |
| Q10 | 5 | 5 | 4 | 4 | Pass |
| Q11 | 5 | 5 | 4 | 4 | Pass |
| Q12 | 5 | 5 | 4 | 4 | Pass |
| Q13 | 5 | 5 | 4 | 4 | Pass |
| Q14 | 5 | 5 | 4 | 4 | Pass |
| Q15 | 5 | 5 | 4 | 4 | Pass |
| Q16 | 5 | 5 | 4 | 4 | Pass |
| Q17 | 5 | 5 | 4 | 4 | Pass |
| Q18 | 5 | 5 | 4 | 4 | Pass |
| Q19 | 5 | 5 | 4 | 4 | Pass |
| Q20 | 3 | 5 | 4 | 5 | **Fail** |
| Q21 | 3 | 5 | 4 | 4 | **Fail** |
| Q22 | 5 | 5 | 4 | 4 | Pass |
| Q23 | 5 | 5 | 4 | 4 | Pass |
| Q24 | 5 | 5 | 4 | 4 | Pass |
| Q25 | 5 | 5 | 4 | 4 | Pass |
| Q26 | 5 | 5 | 4 | 4 | Pass |
| Q27 | 5 | 5 | 4 | 4 | Pass |
| Q28 | 5 | 5 | 4 | 4 | Pass |
| Q29 | 5 | 5 | 4 | 4 | Pass |
| Q30 | 5 | 5 | 4 | 4 | Pass |
| Q31 | 5 | 5 | 4 | 4 | Pass |
| Q32 | 5 | 5 | 4 | 4 | Pass |
| Q33 | 3 | 5 | 4 | 5 | **Fail** |
| Q34 | 5 | 5 | 4 | 4 | Pass |
| Q35 | 5 | 5 | 4 | 4 | Pass |
| Q36 | 5 | 5 | 4 | 4 | Pass |
| Q37 | 5 | 5 | 4 | 4 | Pass |
| Q38 | 5 | 5 | 4 | 4 | Pass |
| Q39 | 5 | 5 | 4 | 4 | Pass |
| Q40 | 5 | 5 | 4 | 4 | Pass |
| Q41 | 5 | 5 | 4 | 4 | Pass |
| Q42 | 5 | 5 | 4 | 4 | Pass |
| Q43 | 5 | 5 | 4 | 4 | Pass |
| Q44 | 5 | 5 | 4 | 4 | Pass |
| Q45 | 5 | 5 | 4 | 4 | Pass |
| Q46 | 5 | 5 | 4 | 4 | Pass |
| Q47 | 5 | 5 | 4 | 4 | Pass |
| Q48 | 5 | 5 | 4 | 4 | Pass |
| Q49 | 5 | 5 | 4 | 4 | Pass |
| Q50 | 5 | 5 | 4 | 4 | Pass |
| Q51 | 5 | 5 | 4 | 4 | Pass |
| Q52 | 5 | 5 | 4 | 4 | Pass |
| Q53 | 5 | 5 | 4 | 4 | Pass |
| Q54 | 5 | 5 | 4 | 4 | Pass |
| Q55 | 5 | 5 | 4 | 4 | Pass |
| Q56 | 5 | 5 | 4 | 4 | Pass |
| Q57 | 5 | 5 | 4 | 4 | Pass |
| Q58 | 5 | 5 | 4 | 4 | Pass |
| Q59 | 2 | 5 | 4 | 4 | **Fail** |
| Q60 | 5 | 5 | 4 | 4 | Pass |
| Q61 | 5 | 5 | 4 | 4 | Pass |
| Q62 | 5 | 5 | 4 | 4 | Pass |
| Q63 | 2 | 5 | 4 | 4 | **Fail** |
| Q64 | 5 | 5 | 4 | 4 | Pass |
| Q65 | 5 | 5 | 4 | 4 | Pass |
| Q66 | 5 | 5 | 4 | 4 | Pass |
| Q67 | 5 | 5 | 4 | 4 | Pass |
| Q68 | 5 | 5 | 4 | 4 | Pass |
| Q69 | 5 | 5 | 4 | 4 | Pass |
| Q70 | 5 | 5 | 4 | 4 | Pass |
| Q71 | 5 | 5 | 4 | 4 | Pass |
| Q72 | 5 | 5 | 4 | 4 | Pass |
| Q73 | 5 | 5 | 4 | 4 | Pass |
| Q74 | 5 | 5 | 4 | 4 | Pass |
| Q75 | 5 | 5 | 4 | 4 | Pass |
| Q76 | 5 | 5 | 4 | 4 | Pass |
| Q77 | 3 | 5 | 4 | 5 | **Fail** |
| Q78 | 5 | 5 | 4 | 4 | Pass |
| Q79 | 5 | 5 | 4 | 4 | Pass |
| Q80 | 5 | 5 | 4 | 4 | Pass |
| Q81 | 5 | 5 | 4 | 4 | Pass |
| Q82 | 5 | 5 | 4 | 4 | Pass |
| Q83 | 5 | 5 | 4 | 4 | Pass |
| Q84 | 5 | 5 | 4 | 4 | Pass |
| Q85 | 5 | 5 | 4 | 4 | Pass |
| Q86 | 5 | 5 | 4 | 4 | Pass |
| Q87 | 5 | 5 | 4 | 4 | Pass |
| Q88 | 5 | 5 | 4 | 4 | Pass |
| Q89 | 5 | 5 | 4 | 4 | Pass |
| Q90 | 5 | 5 | 4 | 4 | Pass |
| Q91 | 5 | 5 | 4 | 4 | Pass |
| Q92 | 5 | 5 | 4 | 4 | Pass |
| Q93 | 4 | 4 | 3 | 4 | **Fail** |
| Q94 | 5 | 5 | 4 | 4 | Pass |
| Q95 | 5 | 5 | 4 | 4 | Pass |
| Q96 | 5 | 5 | 4 | 4 | Pass |
| Q97 | 3 | 2 | 4 | 4 | **Fail** |
| Q98 | 4 | 5 | 4 | 4 | Pass |
| Q99 | 4 | 5 | 4 | 4 | Pass |
| Q100 | 4 | 5 | 4 | 4 | Pass |
| Q101 | 4 | 2 | 4 | 4 | **Fail** |
| Q102 | 5 | 5 | 4 | 4 | Pass |
| Q103 | 5 | 2 | 4 | 4 | **Fail** |
| Q104 | 5 | 5 | 4 | 4 | Pass |
| Q105 | 4 | 2 | 3 | 4 | **Fail** |
| Q106 | 5 | 3 | 4 | 4 | **Fail** |
| Q107 | 5 | 2 | 4 | 4 | **Fail** |

**Tổng:** 94 Pass, 13 Fail.

## Findings — Critical

### C1 — Q59 và Q63 khẳng định role không hoạt động với Content Safety blob URL

- Nội dung hiện tại Q59: `"Chọn Storage Blob Data Reader theo đáp án và nguyên tắc chỉ đọc"` và ultra-short `"... Storage Blob Data Reader."`
- Nội dung hiện tại Q63: `"Chọn system-assigned managed identity + Storage Blob Data Reader theo đáp án"`.
- Lý do: Microsoft Learn hiện ghi rõ khi Azure AI Content Safety đọc `blobUrl`, **chỉ** `Storage Blob Data Contributor` hoặc `Storage Blob Data Owner` là role hợp lệ. `Storage Blob Data Reader` đúng về least privilege theo nghĩa RBAC chung nhưng không phải role được Content Safety quickstart chấp nhận. Đây là xung đột trực tiếp giữa `correct`/explanation gốc và contract sản phẩm hiện hành, không thể chấm Accuracy >=4 bằng cách chỉ viết “theo đáp án đề”.
- Đề xuất sửa cụ thể: (1) đánh dấu hai câu là question-bank conflict và tạm loại khỏi chế độ học/chấm; hoặc (2) sau khi được phép sửa dữ liệu gốc, đổi lựa chọn/correct sang `Storage Blob Data Contributor` và giải thích đây là quyền tối thiểu **mà dịch vụ hiện hỗ trợ**, dù rộng hơn read-only lý tưởng. Nếu buộc giữ đáp án gốc, trap note phải cảnh báo rõ “đáp án đề xung đột Microsoft Learn hiện hành; Reader có thể không chạy”, không được khẳng định Reader là cấu hình thực thi hợp lệ.

## Findings — Important

### I1 — Q20 dùng tên `image_variation mode` mà nguồn hiện hành không chứng minh là mode/parameter

- Nội dung hiện tại: `"image_variation với ảnh gốc tạo nhiều phương án"`; source trỏ tới how-to DALL-E/image generation.
- Lý do: trang Microsoft Learn hiện hành mô tả variations như năng lực của Image Edit API (ảnh + prompt, có thể dùng mask) và không có chuỗi/parameter `image_variation`. Guide đang biến wording của đáp án thành tên surface chính thức. Vì vậy concept “tạo biến thể từ ảnh gốc” hợp lý nhưng tên API/mode chưa được xác minh.
- Đề xuất sửa: viết `"A là đáp án theo wording của đề; trên API hiện hành, variations thuộc Image Edit API và không có parameter tên image_variation trong trang Learn này"`; thêm nguồn image edit chính xác. Nếu ngân hàng câu hỏi cho phép, đổi lựa chọn sang Image Edit API với ảnh gốc và `n` > 1 thay vì mode giả định.

### I2 — Q21 không có nguồn xác nhận nhãn lựa chọn `advanced data parsing`

- Nội dung hiện tại: `"advanced data parsing tái OCR và giữ bảng, heading, cấu trúc cùng metadata trang"`.
- Lý do: source ledger xác nhận các phần tử document/layout, nhưng không xác nhận `advanced data parsing` là tên cấu hình ingestion chính thức với toàn bộ hành vi nêu trên. Guide đúng theo explanation nhưng chưa đạt yêu cầu chính xác tên tính năng.
- Đề xuất sửa: bổ sung URL Microsoft Learn trỏ đúng ingestion option/schema có literal `advanced data parsing`. Nếu không tìm được, nêu rõ đây là nhãn trong đề và không trình bày như API contract; cân nhắc loại câu khỏi ngân hàng cập nhật.

### I3 — Q33 có bằng chứng cho pattern HITL nhưng chưa có bằng chứng cho literal YAML `ask_question`

- Nội dung hiện tại: `"Chọn ask_question để workflow tạm dừng"`.
- Lý do: trang workflow hiện hành xác nhận Human-in-the-loop sẽ hỏi và chờ input, nhưng không chứa literal `ask_question`, `basic_chat` hay `data_transformation`. Do đó concept đúng, còn exact step type của đề chưa được nguồn hiện hành xác minh.
- Đề xuất sửa: thêm nguồn schema/YAML version có literal `ask_question`; pin version/surface. Nếu chỉ có tài liệu workflow mới, đổi note thành “đúng theo schema/version của đề” và ghi rõ trang khái niệm chỉ xác nhận hành vi pause/wait, không xác nhận tên key.

### I4 — Q77 đưa payload MCP thiếu trường bắt buộc `server_label`

- Nội dung hiện tại: ultra-short `"D, tool_choice={\"type\":\"mcp\"}"`; trap D nói API mới “có thể” cần `server_label`.
- Lý do: Microsoft Learn REST/Python SDK hiện định nghĩa `ToolChoiceMCP.server_label` là **required**, không phải tùy trường hợp. `{ "type": "mcp" }` một mình không khóa được server MCP cụ thể và có thể không hợp lệ. Đáp án D là lựa chọn gần nhất nhưng guide gọi payload đó là đủ và “deterministically force” là quá mạnh.
- Đề xuất sửa: nêu payload thực tế `{ "type": "mcp", "server_label": "<label>" }` (thêm `name` nếu cần khóa tool cụ thể), đồng thời ghi “D là lựa chọn gần nhất nhưng bị thiếu `server_label`”. Cập nhật source sang `ToolChoiceMCP`/Agents REST thay vì Realtime chung.

### I5 — Q97 thêm tín hiệu truncation không tồn tại trong stem

- Nội dung hiện tại: keyword `"summary bỏ sót; tăng max_tokens"`, mnemonic `"Nếu bị cắt vì trần đầu ra..."`, trap A `"theo giả định thiếu do output bị truncate"`.
- Lý do: stem chỉ nói clause có trong retrieved content nhưng response bỏ sót; không nói `finish_reason=length`, output bị cắt, hay token budget đã chạm trần. Tăng `max_tokens` chỉ chữa được trường hợp `finish_reason=length`; guide tự thêm điều kiện quyết định để bảo vệ `correct=A`. `questions.js` còn không có explanation cho Q97 và choice B mang text lỗi `"No Correct"`.
- Đề xuất sửa: trước hết xác minh lại đáp án nguồn. Nếu giữ A, phải bổ sung vào stem tín hiệu `finish_reason=length` (cần quyền sửa question bank). Nếu không sửa stem, đáp án an toàn là No hoặc guide phải ghi đây là câu lỗi/thiếu tiền đề, không thể dùng như quy tắc học.

### I6 — Q101/Q103/Q105/Q106/Q107 dùng keyword không có trong stem được lưu

- Trích hiện tại: Q101 `"traffic biến động... dữ liệu xử lý trong EU..."`; Q103 `"response phải relevant, complete, accurate"`; Q105 `"hóa đơn nhiều layout; bảng và logo..."`; Q106 `"PDF dài... semantic và vector search"`; Q107 `"Blob... semantic + vector search"`.
- Lý do: stem trong `questions.js` của các câu này chỉ tham chiếu “technical requirements”, “business requirements”, “issue reported” hoặc “planned changes”; các tín hiệu chi tiết trên chỉ xuất hiện trong explanation/case context đã bị tách khỏi stem. Điều này vi phạm rule keyword “chỉ giữ tín hiệu quyết định có trong stem” và khiến người học không thể dùng mẹo từ câu đang hiển thị.
- Đề xuất sửa: khôi phục case-study context vào dữ liệu hiển thị/stem trước các câu liên quan; sau đó giữ keyword bám đúng các dòng context. Nếu scope cấm sửa `questions.js`, đánh dấu nhóm này là blocked/không đạt thay vì coi guide đã compliant. Riêng Q105, ultra-short cũng nên Việt hóa thành `"Hóa đơn nhiều bố cục + bảng/logo + hình/chữ → C. Azure Content Understanding"`.

## Findings — Minor

### M1 — Q93 trộn tiếng Anh không cần thiết và source chưa gắn rõ model/API

- Nội dung hiện tại: `"Ổn định wording + suy luận tối đa"`, `"dành nhiều effort"`, `"low ưu tiên nhanh/rẻ"`.
- Lý do: `wording`, `effort`, `low/medium/high` chỉ nên giữ khi là literal parameter/value; phần văn xuôi có thể viết tự nhiên hơn. Stem nói “deployed chat model” nhưng source về `effort` là Claude-specific, trong khi guide không nói điều kiện model/API.
- Đề xuất sửa: `"Ổn định câu chữ + suy luận tối đa → temperature=0; effort=\"high\""`; trap note ghi rõ `effort` là parameter/value của model hỗ trợ nó và source phải trỏ đúng model/API của code snippet.

### M2 — Nhiều ultra-short đạt một dòng nhưng còn code-switching và dài

- Ví dụ hiện tại: Q76 `"Bảng tính/biểu đồ → Code Interpreter; web không API → Computer Use; file tải lên → File Search."`; Q84 `"Bản quét + bảng + nhiều cột + Markdown → D, cấu hình Content Understanding analyzer trước."`; Q101 dài 91 ký tự.
- Lý do: tên tool/API cần giữ, nhưng các từ chung như `web`, `file`, `analyzer`, `response`, `output`, `wording`, `stage`, `retrieve` có thể dịch. Một số ultra-short gần thành câu giải thích thứ hai thay vì dấu hiệu → đáp án.
- Đề xuất sửa: giữ nguyên literal đáp án/parameter, Việt hóa phần nối và đặt mục tiêu khoảng 70–80 ký tự khi không làm mất đáp án. Ví dụ Q76: `"Tính bảng → Code Interpreter; bấm web → Computer Use; tìm tệp → File Search."`

### M3 — Q98–Q100 thiếu explanation gốc, choice B chứa artifact `No Correct`

- Nội dung nguồn: Q98–Q100 có `explanation: ""`; choices chứa `B = "No Correct"`.
- Lý do: guide Q98–Q100 có lập luận hợp lý và khớp `correct`, nên vẫn đạt ngưỡng, nhưng không thể hoàn tất đối chiếu explanation theo quy trình spec. Artifact cũng có thể lộ vào UI hoặc làm sai phép so khớp text.
- Đề xuất sửa: khôi phục explanation từ nguồn đề và làm sạch hậu tố `Correct` ở parser/importer trong một thay đổi riêng; sau đó review lại các trap note. Không sửa trong scope guide hiện tại.

## Source URL bổ sung đã dùng

- Content Safety blob URL và role hợp lệ: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/quickstart-image
- Translator mixed-language input: https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/translator/transparency-note
- Image generation/edit, variations, `input_fidelity`, mask: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e
- Foundry workflow/Human-in-the-loop: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow
- MCP tool choice schema: https://learn.microsoft.com/en-us/rest/api/microsoft-foundry/azureopenai/realtime
- Python `ToolChoiceMCP` (`server_label` required): https://learn.microsoft.com/en-us/python/api/azure-ai-projects/azure.ai.projects.models.toolchoicemcp
- Tool choice modes/best practices: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-best-practice
- `finish_reason=length` và `max_tokens`: https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/chatgpt
- Claude `effort` support: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-claude

## Kết luận

### Spec compliance

**Không đạt.** Coverage/contract tự động đạt 107/107, đủ trap keys và Learn URLs; guide không sửa dữ liệu câu hỏi gốc. Tuy nhiên 13 câu có ít nhất một tiêu chí dưới 4. Đặc biệt Q59/Q63 xung đột trực tiếp contract sản phẩm; Q20/Q21/Q33/Q77 chưa chứng minh hoặc thiếu literal API/schema; Q97 tự thêm tín hiệu quyết định; Q101/Q103/Q105/Q106/Q107 vi phạm rule keyword chỉ lấy từ stem do case context bị thiếu.

### Quality verdict

**Chưa sẵn sàng merge/publish.** 94/107 câu đạt ngưỡng. Cần xử lý toàn bộ Critical và Important rồi review lại; Minor nên sửa cùng vòng vì Q93 hiện làm Easy Vietnamese xuống dưới ngưỡng. Sau khi sửa, chạy lại kiểm tra UI để chắc chắn artifact `No Correct` và case-study context không làm người học thấy câu thiếu dữ kiện.

---

## Re-review độc lập vòng cuối

Ngày re-review: 2026-07-17. Phần này thay thế verdict của vòng đầu đối với 13 câu từng Fail. Reviewer chỉ đọc và chấm lại, không sửa guide. Ngoài dữ liệu đề, ba batch guide và ngữ cảnh Case Study đã khôi phục, các chi tiết dễ thay đổi được đối chiếu lại với Microsoft Learn hiện hành.

### Điểm re-review

| Q | A | K | V | M | Verdict | Kết quả kiểm tra lại |
|---:|---:|---:|---:|---:|:---|:---|
| Q20 | 4 | 5 | 4 | 4 | **Pass** | Phân biệt rõ đáp án A theo wording đề với Image Edit API hiện hành; không còn gọi `image_variation` là parameter đã được Learn xác nhận. |
| Q21 | 4 | 5 | 4 | 4 | **Pass** | Keyword bám đủ OCR, bảng nhiều trang, cấu trúc và số trang; caveat nói rõ `advanced data parsing` là nhãn đề, nguồn chỉ xác nhận năng lực parsing/layout. |
| Q33 | 4 | 5 | 4 | 5 | **Pass** | Nêu đúng HITL pause/wait và điều kiện `approval == "approved"`; minh bạch rằng Learn hiện hành không xác nhận literal YAML `ask_question`. |
| Q59 | 5 | 5 | 4 | 5 | **Pass** | Tách rất rõ đáp án ngân hàng đề (MI + Reader) khỏi triển khai hiện hành (Contributor/Owner); không còn khẳng định Reader sẽ chạy với `blobUrl`. |
| Q63 | 5 | 5 | 4 | 5 | **Pass** | Block đủ bốn điểm trong agent run và cảnh báo chính xác xung đột Reader với contract `blobUrl` hiện hành. |
| Q77 | 5 | 5 | 4 | 5 | **Pass** | D được gọi đúng là lựa chọn gần nhất; payload thực tế có `server_label` bắt buộc và `name` khi cần khóa tool. |
| Q93 | 4 | 5 | 4 | 5 | **Pass** | Tiếng Việt đã tự nhiên hơn; giữ `effort="high"` như literal và ghi rõ chỉ dùng với model/API hỗ trợ. |
| Q97 | 5 | 4 | 5 | 5 | **Pass** | Không biến A thành quy tắc chung; cảnh báo stem thiếu `finish_reason=length` và chỉ tăng `max_tokens` khi đã xác nhận bị cắt. |
| Q101 | 4 | 5 | 4 | 5 | **Pass** | Case Study nay hiển thị đủ tải biến động, không dành trước throughput, EU và ổn định version; Standard là lựa chọn đúng trong tập đáp án. |
| Q103 | 4 | 5 | 4 | 5 | **Pass** | Case context khôi phục đủ relevant/complete/accurate; RAG evaluator phân biệt đúng với guardrail, fine-tuning và groundedness đơn lẻ. |
| Q105 | 5 | 5 | 5 | 5 | **Pass** | Context hóa đơn có bảng/logo/bố cục và cả hình lẫn chữ đã được hiển thị; trap notes phân biệt đúng bốn dịch vụ. |
| Q106 | 5 | 5 | 4 | 5 | **Pass** | Context PDF + semantic/vector đã được khôi phục; Text Split và Azure OpenAI Embedding đúng vai trò chunking/vectorization. |
| Q107 | 5 | 5 | 4 | 5 | **Pass** | Context Blob + semantic/vector đã được khôi phục; Azure AI Search được phân biệt đúng với dịch, web grounding và document extraction. |

**Kết quả 13 câu sửa:** 13 Pass, 0 Fail. Kết hợp với 94 câu đã Pass ở vòng đầu: **107/107 guide đạt ngưỡng bốn tiêu chí**.

### Spot-check Q98–Q100

| Q | A | K | V | M | Verdict | Nhận xét |
|---:|---:|---:|---:|---:|:---|:---|
| Q98 | 4 | 5 | 4 | 4 | Pass | Reflection có bước kiểm tra và regenerate nên trực tiếp cải thiện completeness; trap A/B rõ. |
| Q99 | 5 | 5 | 4 | 5 | Pass | Temperature tăng độ biến thiên, không bảo đảm đưa đủ clause; mẹo ngắn và đúng hướng. |
| Q100 | 5 | 5 | 4 | 5 | Pass | Evaluation + block chỉ phát hiện/ngăn đầu ra thiếu, không tự sửa nếu không có retry/regeneration. |

Artifact dữ liệu `B = "No Correct"` và việc phần giải thích được dồn vào trường `answer` thay vì `explanation` vẫn là **Minor về nhập dữ liệu/UI**, không làm sai kiến thức trong ba guide. Cụm “ngân hàng câu hỏi không cung cấp explanation” trong trap notes nên hiểu là thiếu trường `explanation` có cấu trúc; nội dung giải thích nguồn thực tế đang nằm trong `answer`.

### Bằng chứng Microsoft Learn dùng trong re-review

- Content Safety `blobUrl`: quickstart ghi rõ chỉ `Storage Blob Data Contributor` hoặc `Storage Blob Data Owner` là role hợp lệ; do đó caveat Q59/Q63 là chính xác.
- MCP tool choice: `ToolChoiceMCP` định nghĩa `type="mcp"` và `server_label` là required; `name` là tùy chọn.
- Image generation: tài liệu hiện hành mô tả chỉnh/biến đổi ảnh đầu vào qua Image Edit API, không xác nhận parameter literal `image_variation`.
- Workflow: Human-in-the-loop hỏi và chờ input để tiếp tục; trang khái niệm không xác nhận literal `ask_question`.
- Completion length: `finish_reason=length` biểu thị đầu ra chưa hoàn tất do `max_tokens` hoặc token limit.
- Deployment: Standard xử lý trong deployment region, tính phí theo token và phù hợp tải biến động; Global có thể xử lý ở bất kỳ Azure region nào, Provisioned dùng capacity dành trước.
- Model version: `Opt out of automatic model version upgrades` yêu cầu nâng thủ công và giữ version cho tới khi chủ động đổi hoặc version bị retire.
- RAG evaluation: Learn tách groundedness, relevance và response completeness; groundedness riêng không bao quát đầy đủ yêu cầu nhiều mặt.
- Content Understanding: analyzer hỗ trợ OCR, layout, tables và structured fields; phù hợp tài liệu hóa đơn nhiều mẫu.
- Azure AI Search: Text Split tạo chunk và Azure OpenAI Embedding tạo vector cho integrated vectorization.

### Findings sau re-review

- **Critical còn lại: 0.**
- **Important còn lại: 0.**
- **Minor còn lại: 1 nhóm dữ liệu Q97–Q100** (`No Correct`, `explanation` rỗng nhưng nội dung giải thích nằm trong `answer`). Đây không phải lỗi kiến thức của guide và không chặn merge phần mẹo.

### Verdict cuối

**Spec compliance: Đạt.** Tất cả 107 guide đạt tối thiểu 4/5 ở Accuracy, Keyword, Easy Vietnamese và Memorability. Các xung đột hoặc thiếu tiền đề của ngân hàng đề không bị che giấu mà được nêu ngay trong mnemonic/trap note/ultra-short.

**Quality verdict: Sẵn sàng merge/publish phần mẹo.** Điều kiện Critical/Important đã được xử lý và xác nhận lại. Nhóm Case Study Q101–Q107 có context hiển thị riêng nên keyword nay có thể kiểm chứng trực tiếp từ nội dung người học nhìn thấy.
