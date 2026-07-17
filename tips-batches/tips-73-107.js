(() => {
  window.AI103_TIP_GUIDES = {
    ...(window.AI103_TIP_GUIDES || {}),
    73: {
      keywords: "giữ sở thích luật sư qua nhiều cuộc hội thoại; tra tài liệu tải lên trong cuộc hội thoại",
      mnemonic: "Nhớ lâu dùng memory; hỏi file vừa nộp dùng File Search.",
      trapNotes: {
        "To retain attorney preferences across conversations, use": "Agent memory dùng persistent storage là đúng vì lưu sở thích qua nhiều cuộc hội thoại; history và session context chỉ giữ ngữ cảnh ngắn hạn, prompt cache chỉ tối ưu chi phí.",
        "To retrieve uploaded documents, use": "File search tool là đúng vì lập chỉ mục và truy xuất file người dùng tải lên; Code Interpreter phân tích bằng Python, Computer Use thao tác giao diện, Translator chỉ dịch."
      },
      ultraShort: "Nhớ sở thích lâu → persistent agent memory; tra file tải lên → File search tool.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/memory-usage", "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/vector-stores"]
    },
    74: {
      keywords: "giữ bảng, tiêu đề, đoạn, thứ tự đọc; đưa thẳng cho LLM; ít hậu xử lý",
      mnemonic: "Cần cấu trúc đọc được ngay thì xuất Markdown.",
      trapNotes: {
        A: "`output=figures` chỉ lấy hình và vùng hình, phù hợp khi cần ảnh riêng; không bảo toàn toàn bộ cấu trúc văn bản để tóm tắt.",
        B: "`output_content_format=ContentFormat.MARKDOWN` là đúng vì giữ tiêu đề, bảng, đoạn và thứ tự đọc trong dạng LLM dùng trực tiếp.",
        C: "`string_index_type=UnicodeCodePoint` chỉ quyết định cách tính offset ký tự; dùng khi cần căn vị trí chuỗi, không định dạng cấu trúc đầu ra.",
        D: "Tăng độ phân giải OCR có thể giúp nhận dạng bản quét mờ, nhưng không tạo đầu ra có cấu trúc hay giảm hậu xử lý."
      },
      ultraShort: "Giữ cấu trúc để đưa thẳng vào LLM → B, xuất `ContentFormat.MARKDOWN`.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout"]
    },
    75: {
      keywords: "Microsoft Entra ID; HTTP 403; chỉ truy vấn chỉ mục; quyền tối thiểu",
      mnemonic: "Đọc dữ liệu Search, không quản trị → Search Index Data Reader.",
      trapNotes: {
        A: "Search Service Contributor quản lý đối tượng Search như index và indexer; quyền rộng hơn và không phải vai trò chỉ đọc dữ liệu truy vấn.",
        B: "Search Index Data Reader là đúng: cho phép query và lookup dữ liệu chỉ mục nhưng không nạp hay sửa tài liệu, đúng nguyên tắc tối thiểu.",
        C: "Contributor là quyền quản lý tài nguyên Azure rất rộng; không cấp đúng phạm vi data-plane tối thiểu chỉ để chạy truy vấn Search.",
        D: "Reader chỉ xem metadata ở control plane; dùng để xem tài nguyên nhưng không có quyền query tài liệu bên trong chỉ mục."
      },
      ultraShort: "Entra + chỉ query index + tối thiểu → B, Search Index Data Reader.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/search-security-rbac"]
    },
    76: {
      keywords: "phân tích bảng tính và vẽ biểu đồ; website cũ không API; hỏi tài liệu tải lên",
      mnemonic: "Tính bằng Code, bấm bằng Computer, tìm file bằng File Search.",
      trapNotes: {
        "Analyze uploaded spreadsheets and generate charts": "Code Interpreter là đúng vì chạy Python trên bảng tính và tạo biểu đồ; File Search chỉ truy xuất văn bản, Computer Use thao tác UI, Bing lấy web công khai.",
        "Interact with the legacy claims management website": "Computer Use là đúng khi website cũ không có API vì có thể điều khiển giao diện; Code Interpreter không bấm trang web và File Search không tự thao tác ứng dụng.",
        "Retrieve information from uploaded policy documents": "File Search là đúng vì lập chỉ mục tài liệu tải vào cuộc hội thoại; Bing tìm web công khai, Fabric phục vụ dữ liệu doanh nghiệp, không thay file hội thoại."
      },
      ultraShort: "Bảng tính/biểu đồ → Code Interpreter; web không API → Computer Use; file tải lên → File Search.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog"]
    },
    77: {
      keywords: "buộc MCP; D là lựa chọn gần nhất; payload thực tế cần `server_label`",
      mnemonic: "Chọn D theo đề; khi gọi thật phải thêm `server_label`.",
      trapNotes: {
        A: "`tool_choice=\"required\"` buộc gọi ít nhất một tool nhưng có thể chọn tool khác nếu agent có nhiều tool; không khóa riêng MCP.",
        B: "`tool_choice=\"auto\"` để model tự quyết định gọi tool hay trả lời trực tiếp; đây chính là hành vi gây thiếu grounding trong đề.",
        C: "`type: \"knowledge_base\"` không phải loại `tool_choice` được hỗ trợ; kho tri thức của tình huống được phơi qua MCP.",
        D: "D là lựa chọn gần nhất, nhưng payload trong đáp án chưa đầy đủ: `ToolChoiceMCP` bắt buộc có `server_label`; thêm `name` nếu cần khóa một tool cụ thể."
      },
      ultraShort: "D gần nhất; dùng thật: `{\"type\":\"mcp\",\"server_label\":\"<label>\"}` (+ `name` nếu khóa tool).",
      sources: ["https://learn.microsoft.com/en-us/python/api/azure-ai-projects/azure.ai.projects.models.toolchoicemcp", "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-best-practice"]
    },
    78: {
      keywords: "ba custom tools; tìm tool chiếm nhiều thời gian nhất; độ trễ từng lần gọi",
      mnemonic: "Chậm ở tool nào thì xem dấu thời gian của tool đó.",
      trapNotes: {
        A: "Token usage analytics đo token và chi phí model; dùng khi cần tối ưu tiêu thụ, không tách thời gian chạy của từng custom tool.",
        B: "Tool execution traces là đúng vì ghi thứ tự, thời điểm bắt đầu, thời lượng và kết quả từng lần gọi tool để nhận ra tool chậm nhất.",
        C: "Groundedness evaluation chấm câu trả lời có bám nguồn hay không; dùng cho chất lượng, không cho hiệu năng từng tool.",
        D: "Conversation history lưu lượt hội thoại; dùng xem nội dung trao đổi nhưng không có span và thời lượng thực thi chi tiết của tool."
      },
      ultraShort: "Tìm custom tool gây trễ → B, xem Tool execution traces.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/observability/concepts/trace-data"]
    },
    79: {
      keywords: "chạy Python trên bảng tính tải lên; thời tiết hiện tại từ web công khai",
      mnemonic: "Tính file bằng Interpreter; tin mới ngoài web bằng Bing.",
      trapNotes: {
        "To analyze uploaded spreadsheets, use": "Code Interpreter Tool là đúng vì chạy Python để tính toán và trực quan hóa bảng tính; File Search chỉ truy xuất, Computer Use thao tác UI, Azure AI Search truy vấn index.",
        "To retrieve current weather information, use": "Grounding with Bing Search là đúng vì lấy dữ liệu web công khai cập nhật; File Search cần file tải lên, Fabric không phải công cụ thời tiết trực tiếp."
      },
      ultraShort: "Phân tích spreadsheet → Code Interpreter Tool; thời tiết hiện tại → Grounding with Bing Search.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog", "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/bing-tools"]
    },
    80: {
      keywords: "sau đổi prompt; câu trả lời thiếu và không có căn cứ; request vẫn thành công; latency không đổi",
      mnemonic: "Chạy được và không chậm mà trả lời dở → đo chất lượng.",
      trapNotes: {
        A: "Token usage cho biết lượng token và chi phí; dùng khi mức tiêu thụ thay đổi, không kết luận câu trả lời đầy đủ hay có căn cứ.",
        B: "Latency đo thời gian phản hồi; đề đã nói thời gian không đổi nên đây không phải tín hiệu để xác định suy giảm chất lượng.",
        C: "Evaluation metrics là đúng vì chấm groundedness, relevance, completeness và các mặt chất lượng trước và sau thay đổi prompt.",
        D: "Run success rate đo tỷ lệ thực thi hoàn tất; các request vẫn thành công nên chỉ số này có thể tốt dù nội dung trả lời kém."
      },
      ultraShort: "Thành công và latency ổn nhưng nội dung xuống chất lượng → C, Evaluation metrics.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/how-to/evaluate-results"]
    },
    81: {
      keywords: "FAQ đơn giản chiếm đa số; một số câu cần suy luận sâu; giảm chi phí và latency nhưng giữ chất lượng câu khó",
      mnemonic: "Câu dễ đi model nhỏ, câu khó đi model mạnh → cascade.",
      trapNotes: {
        A: "Dồn mọi request vào model nhỏ giảm giá và trễ nhưng làm giảm chất lượng các câu cần suy luận phức tạp, trái yêu cầu.",
        B: "Model cascade là đúng vì định tuyến câu đơn giản sang model rẻ, nhanh và câu phức tạp sang model mạnh hơn.",
        C: "Tăng `max_tokens` chỉ cho phép đầu ra dài hơn, thường tăng chi phí; không phân loại độ khó hay chọn model phù hợp.",
        D: "Dồn mọi request vào model mạnh giữ chất lượng nhưng lãng phí chi phí và latency cho FAQ đơn giản, không đạt mục tiêu tối ưu."
      },
      ultraShort: "FAQ dễ + câu suy luận khó → B, model cascade định tuyến theo độ phức tạp.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/model-router"]
    },
    82: {
      keywords: "JSON cho tự động hóa; xuất hiện field ngoài dự kiến; cần cấu trúc ổn định",
      mnemonic: "Muốn JSON đúng khuôn thì khóa bằng schema.",
      trapNotes: {
        A: "Giảm temperature làm đầu ra bớt ngẫu nhiên nhưng không cấm field ngoài schema; dùng cho tính ổn định ngôn từ, không bảo đảm cấu trúc.",
        B: "Structured outputs với JSON schema là đúng vì ép tên, kiểu và tập field; đặt `additionalProperties: false` để loại field ngoài dự kiến.",
        C: "Tăng maximum completion tokens chỉ nới độ dài đầu ra và có thể sinh thêm nội dung; không ép JSON tuân thủ cấu trúc.",
        D: "Fine-tuning có thể hướng hành vi nhưng tốn công và không cho bảo đảm schema chặt như structured outputs trong mỗi request."
      },
      ultraShort: "Automation lỗi vì JSON thừa field → B, Structured outputs + JSON schema.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs"]
    },
    83: {
      keywords: "hỏi hợp đồng tải lên; tạo biểu đồ từ Excel tải lên",
      mnemonic: "Đọc hợp đồng bằng Search; tính Excel bằng Interpreter.",
      trapNotes: {
        "To answer questions from uploaded contracts, use": "File Search Tool là đúng vì lập chỉ mục và tìm trong hợp đồng tải vào hội thoại; Bing tìm web công khai, Azure AI Search dành cho index doanh nghiệp có sẵn.",
        "To generate charts from Excel workbooks, use": "Code Interpreter Tool là đúng vì chạy Python phân tích workbook và vẽ biểu đồ; File Search không thực hiện phép tính hay tạo trực quan hóa."
      },
      ultraShort: "Hỏi hợp đồng tải lên → File Search Tool; vẽ biểu đồ Excel → Code Interpreter Tool.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog"]
    },
    84: {
      keywords: "tài liệu hỗn hợp; bản quét, bảng, nhiều cột; giữ cấu trúc; Markdown; cấu hình đầu tiên",
      mnemonic: "Hiểu bố cục trước, suy luận sau → Content Understanding analyzer.",
      trapNotes: {
        A: "Azure Language xử lý văn bản đã có như sentiment hoặc entity; không OCR và dựng lại bố cục tài liệu nhiều cột.",
        B: "Chat completion sinh câu trả lời từ nội dung đầu vào; không phải bước đầu để trích cấu trúc, bảng và thứ tự đọc từ bản quét.",
        C: "Multimodal Responses API có thể nhìn ảnh nhưng không phải pipeline chuyên trích tài liệu có cấu trúc và Markdown theo yêu cầu.",
        D: "Azure Content Understanding analyzer là đúng vì kết hợp OCR, phần tử bố cục và đầu ra Markdown trước khi reasoning."
      },
      ultraShort: "Bản quét + bảng + nhiều cột + Markdown → D, cấu hình Content Understanding analyzer trước.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/document/elements"]
    },
    85: {
      keywords: "RAG với Azure AI Search; ngữ cảnh dài; suy luận nhiều bước sâu; câu trả lời chi tiết",
      mnemonic: "Ngữ cảnh dài, suy luận sâu, viết dài → LLM.",
      trapNotes: {
        A: "Multimodal model phù hợp khi có ảnh, âm thanh hoặc video; đề chỉ dùng tài liệu văn bản nên khả năng đa phương thức không phải tín hiệu chính.",
        B: "SLM tối ưu chi phí và độ trễ cho tác vụ gọn; không phải lựa chọn tốt nhất khi đề nhấn mạnh ngữ cảnh dài và suy luận sâu nhiều bước.",
        C: "Key phrase extraction chỉ rút cụm từ quan trọng; không truy xuất RAG, suy luận nhiều bước hay sinh câu trả lời tự nhiên chi tiết.",
        D: "LLM là đúng vì có năng lực sinh ngôn ngữ, xử lý ngữ cảnh dài và suy luận phức tạp trên nội dung được Azure AI Search truy xuất."
      },
      ultraShort: "RAG + ngữ cảnh dài + suy luận sâu + trả lời chi tiết → D, LLM.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/foundry-models-overview", "https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation"]
    },
    86: {
      keywords: "quyết định tòa mới trên web; hợp đồng tải lên; đăng nhập portal và tải file",
      mnemonic: "Tin web dùng Bing, file chat dùng Search, thao tác portal dùng Computer.",
      trapNotes: {
        "Research recent court decisions": "Grounding with Bing Search là đúng vì lấy quyết định mới từ web công khai; File Search chỉ xem file tải lên và Code Interpreter không phải công cụ web grounding.",
        "Search uploaded contracts": "File Search là đúng vì lập chỉ mục hợp đồng trong cuộc hội thoại; Bing không tìm file riêng, còn Computer Use dành cho thao tác giao diện.",
        "Download evidence from the compliance portal": "Computer Use là đúng vì có thể đăng nhập, điều hướng và tải file qua giao diện portal; File Search không thao tác website, Code Interpreter không tự bấm UI."
      },
      ultraShort: "Tin tòa mới → Bing; hợp đồng tải lên → File Search; portal cần đăng nhập/tải → Computer Use.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog", "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/bing-tools"]
    },
    87: {
      keywords: "confidence từng field; truy ngược vị trí trong PDF; chuyển kết quả kém tin cậy sang người duyệt",
      mnemonic: "Cần biết tin bao nhiêu và lấy ở đâu → estimate source + confidence.",
      trapNotes: {
        A: "`enableSegment=true` chia nội dung thành segment để xử lý; không tự bổ sung confidence và vị trí nguồn cho từng field.",
        B: "Labeled samples giúp tùy biến hoặc cải thiện analyzer; tự thân chúng không yêu cầu response trả confidence và source location.",
        C: "`estimateFieldSourceAndConfidence` là đúng vì trả confidence cùng page/bounding box cho từng field, phục vụ truy vết và human review.",
        D: "Generative extraction linh hoạt với field suy diễn nhưng không bảo đảm metadata nguồn và confidence; còn có thể khó truy vết hơn extract literal."
      },
      ultraShort: "Confidence từng field + vị trí PDF → C, bật `estimateFieldSourceAndConfidence`.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-reference"]
    },
    88: {
      keywords: "prompt tăng gấp đôi; chi phí tăng; chất lượng không đổi; Azure AI Search grounding",
      mnemonic: "Thêm context mà không thêm chất lượng → bớt chunk.",
      trapNotes: {
        A: "Đổi sang GPT-4.1 không xử lý nguyên nhân prompt phình do retrieval và có thể tăng giá; chỉ đổi model khi benchmark chứng minh cần.",
        B: "Giảm số document chunks truy xuất là đúng vì cắt input tokens dư thừa, hạ chi phí trong khi chất lượng hiện không hưởng lợi từ phần thêm.",
        C: "Tăng chunk overlap tạo nhiều nội dung trùng lặp hơn, dễ làm prompt và token tiếp tục tăng; dùng overlap để giữ ngữ cảnh qua ranh giới chunk.",
        D: "Tăng context window chỉ cho phép nhận prompt dài hơn, không giảm token đã gửi hay chi phí; phù hợp khi thật sự cần ngữ cảnh lớn."
      },
      ultraShort: "Prompt và giá tăng, chất lượng đứng yên → B, retrieve ít document chunks hơn.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"]
    },
    89: {
      keywords: "GitHub Actions; passwordless; bỏ credential dài hạn; xác thực Azure",
      mnemonic: "GitHub phát OIDC ngắn hạn, federation đổi lấy token Azure.",
      trapNotes: {
        "Authentication method": "Azure Login action dùng OIDC là đúng vì nhận token ngắn hạn; PAT, storage key và publish profile đều là credential dài hạn phải lưu và xoay.",
        "Credential management": "Workload identity federation là đúng vì tạo quan hệ tin cậy GitHub–Microsoft Entra để đổi OIDC token; repository secret vẫn chỉ là nơi cất bí mật dài hạn."
      },
      ultraShort: "GitHub Actions không secret dài hạn → Azure Login bằng OIDC + workload identity federation.",
      sources: ["https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation"]
    },
    90: {
      keywords: "PDF hóa đơn bản quét; bố cục khác nhau; bảng nhiều trang; OCR + layout + field extraction; không train custom",
      mnemonic: "Vừa đọc chữ, hiểu bố cục, rút field đa mẫu → Content Understanding.",
      trapNotes: {
        A: "Azure Language phân tích văn bản như entity và sentiment sau khi đã có text; không cung cấp OCR hay hiểu bảng nhiều trang trong bản quét.",
        B: "Azure Content Understanding là đúng vì kết hợp OCR, layout và field schema có thể tổng quát nhiều mẫu mà không phải huấn luyện model riêng.",
        C: "Azure Machine Learning model đòi xây dựng, huấn luyện và vận hành; trái yêu cầu không train custom model và giảm công quản trị."
      },
      ultraShort: "OCR + layout + field đa mẫu, không train → B, Azure Content Understanding.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-reference"]
    },
    91: {
      keywords: "audio liên tục; speech thành text để reasoning; trả lời bằng giọng nói; low latency; turn-taking",
      mnemonic: "Nghe trực tiếp bằng STT, nói lại bằng TTS.",
      trapNotes: {
        A: "Batch transcription dành cho file ghi âm hoàn tất và chỉ trả text; độ trễ cao, không tạo spoken response hay turn-taking trực tiếp.",
        B: "Real-time speech to text cho audio vào và text to speech cho câu trả lời là đúng vì hỗ trợ streaming và hội thoại độ trễ thấp.",
        C: "Embedding model tạo vector cho tìm kiếm tương đồng; không giải mã audio thành văn bản rồi tổng hợp tiếng nói.",
        D: "Speech translation dịch lời nói sang ngôn ngữ khác; đề cần nhận dạng và tổng hợp tiếng nói cùng luồng, không yêu cầu dịch."
      },
      ultraShort: "Voice agent thời gian thực → B, streaming STT vào + TTS ra.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text", "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech"]
    },
    92: {
      keywords: "một analyzer cho nhiều layout PO; field nghiệp vụ cụ thể; JSON có cấu trúc; confidence từng field",
      mnemonic: "Muốn đúng field riêng của nghiệp vụ → custom analyzer + field schema.",
      trapNotes: {
        A: "Custom Content Understanding analyzer khai báo các extracted fields là đúng vì trả JSON theo schema, tổng quát nhiều layout và có confidence từng field.",
        B: "`prebuilt-read` chỉ OCR và trả text thô; dùng khi chỉ cần đọc chữ, không nhận biết các field PO cụ thể thành JSON.",
        C: "`prebuilt-layout` nhận diện bảng, đoạn và thứ tự đọc; dùng cho cấu trúc tài liệu nhưng không ánh xạ field nghiệp vụ PO theo schema yêu cầu.",
        D: "Azure AI Search vector search lập chỉ mục và truy xuất tương đồng; không trích field nghiệp vụ hay tạo confidence từ purchase order."
      },
      ultraShort: "Field PO riêng + JSON + confidence + nhiều layout → A, custom Content Understanding analyzer.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-reference"]
    },
    93: {
      keywords: "validation so khớp mẫu; lệch câu chữ nhỏ; cần ổn định; tối đa chất lượng suy luận",
      mnemonic: "Ít biến thiên chọn `temperature=0`; suy luận tối đa chọn `effort=\"high\"`.",
      trapNotes: {
        Temperature: "`temperature=0` là đúng vì giảm ngẫu nhiên và giữ câu chữ ổn định; 1 và 2 tăng độ đa dạng, không phù hợp khi cần so khớp đầu ra tự động.",
        "Output effort": "`effort=\"high\"` ưu tiên chất lượng suy luận; `low` ưu tiên tốc độ/chi phí và `medium` cân bằng. Chỉ dùng tham số này với model/API có hỗ trợ."
      },
      ultraShort: "Câu chữ ổn định + suy luận tối đa → `temperature=0`; `effort=\"high\"` nếu model hỗ trợ.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-claude", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings"]
    },
    94: {
      keywords: "PDF có ảnh nhúng; OCR skill; khi indexing; tạo cấu trúc ảnh đầu vào",
      mnemonic: "OCR cần ảnh chuẩn hóa; indexer phải crack PDF ra `normalized_images` trước.",
      trapNotes: {
        A: "Indexer trích ảnh thành `normalized_images` là đúng vì đây là input mà OCR skill duyệt tại `/document/normalized_images/*`.",
        B: "Shaper skill đổi hình dạng dữ liệu đã enrichment; không crack PDF hay tự tạo ảnh nhúng chuẩn hóa cho OCR.",
        C: "OCR skill cần dữ liệu ảnh, không chạy trực tiếp trên trường text `content`; ảnh phải được indexer trích trước.",
        D: "`outputFieldMappings` chỉ ánh xạ output enrichment vào field chỉ mục; không trích ảnh nhúng hay chuẩn bị input cho OCR."
      },
      ultraShort: "OCR ảnh nhúng trong PDF → A, indexer tạo collection `normalized_images` trước.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/chat-completion-skill-example-usage", "https://learn.microsoft.com/en-us/azure/search/tutorial-skillset"]
    },
    95: {
      keywords: "xóa riêng chiếc xe; giữ nhà, cảnh quan, ánh sáng, bóng đổ; chỉnh ảnh hiện có",
      mnemonic: "Chỉ sửa một vùng thì tô mask vùng đó rồi inpaint.",
      trapNotes: {
        A: "Mask-based inpainting là đúng vì giới hạn vùng tái tạo vào chiếc xe, giữ phần ảnh không mask ổn định nhất có thể.",
        B: "Giảm temperature chỉ tác động độ ngẫu nhiên khi sinh; không chỉ định vùng chiếc xe cần xóa trên ảnh đã có.",
        C: "Sinh lại bằng prompt “đường xe trống” có thể đổi nhà, góc máy, ánh sáng và cảnh quan; dùng khi chấp nhận một bố cục mới.",
        D: "Image variation tạo ảnh tương tự toàn cục, không cho kiểm soát chính xác vùng cần xóa; phù hợp khi muốn nhiều biến thể sáng tạo."
      },
      ultraShort: "Xóa đúng một vật, giữ phần còn lại → A, mask vùng xe rồi inpainting.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/dall-e"]
    },
    96: {
      keywords: "sau deployment response chậm; nhiều bước tool và inference; tìm stage gây trễ nhất",
      mnemonic: "Muốn biết chậm ở chặng nào → xem latency breakdown trace.",
      trapNotes: {
        A: "Groundedness metrics đo câu trả lời có được nguồn hỗ trợ; không cho thời lượng từng stage của agent.",
        B: "Latency breakdown traces là đúng vì chia thời gian theo retrieval, tool call, model inference và sinh response để khoanh vùng bottleneck.",
        C: "Content Safety metrics đo nội dung có hại hoặc vi phạm; dùng cho an toàn chứ không cho phân tích thời gian thực thi.",
        D: "Relevance metrics đo nội dung truy xuất hoặc câu trả lời có liên quan; không xác định stage nào chiếm nhiều thời gian."
      },
      ultraShort: "Tìm stage làm agent chậm sau deploy → B, Latency breakdown traces.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/observability/concepts/trace-data"]
    },
    97: {
      keywords: "ngân hàng câu hỏi thiếu `finish_reason=length`; A chỉ đúng theo key nếu đầu ra bị cắt",
      mnemonic: "Chỉ tăng `max_tokens` khi đã xác nhận đầu ra chạm giới hạn.",
      trapNotes: {
        A: "A là đáp án theo key chỉ khi đầu ra bị cắt do giới hạn token; cần thấy `finish_reason=length` rồi mới kết luận tăng `max_tokens` sẽ giúp.",
        B: "Stem không cho tín hiệu `finish_reason=length`, nên không đủ dữ kiện biến A thành quy tắc chung; nếu thiếu do prompt hoặc sinh nội dung, tăng giới hạn không bảo đảm sửa lỗi."
      },
      ultraShort: "Theo key: A chỉ khi `finish_reason=length`; stem hiện thiếu tín hiệu này.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/chatgpt", "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/latency"]
    },
    98: {
      keywords: "retrieval đã có clause; response vẫn thiếu; reflection kiểm tra rồi regenerate",
      mnemonic: "Thiếu thì soi lại và viết lại → reflection sửa được đầu ra.",
      trapNotes: {
        A: "Theo key và logic của lựa chọn, Yes phù hợp vì reflection phát hiện phần thiếu rồi kích hoạt sinh lại có chỉ dẫn sửa; ngân hàng câu hỏi không cung cấp explanation.",
        B: "Theo key, No không phù hợp vì lựa chọn mô tả cả bước kiểm tra lẫn sinh lại, không chỉ đo lường; ngân hàng câu hỏi không có explanation để đối chiếu."
      },
      ultraShort: "Kiểm tra thiếu rồi regenerate → A, Yes: reflection pass cải thiện completeness.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators"]
    },
    99: {
      keywords: "thiếu clause bắt buộc; context đã đủ; tăng temperature",
      mnemonic: "Cần đủ và ổn định thì không tăng độ ngẫu nhiên.",
      trapNotes: {
        A: "Theo key và logic tham số, Yes không phù hợp: temperature cao tăng đa dạng, không bảo đảm liệt kê đủ clause; ngân hàng câu hỏi không cung cấp explanation.",
        B: "Theo key, No phù hợp vì temperature điều chỉnh độ ngẫu nhiên chứ không trực tiếp sửa độ đầy đủ; ngân hàng câu hỏi không có explanation để đối chiếu."
      },
      ultraShort: "Tăng randomness không chữa thiếu clause → B, No.",
      sources: ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings", "https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators"]
    },
    100: {
      keywords: "evaluation chấm completeness; block dưới threshold; không retry hay regenerate",
      mnemonic: "Chấm và chặn chỉ phát hiện lỗi; muốn tốt hơn phải sửa hoặc sinh lại.",
      trapNotes: {
        A: "Theo key và logic của lựa chọn, Yes không phù hợp: chấm điểm rồi chặn không tự sửa câu trả lời nếu thiếu bước sinh lại; ngân hàng câu hỏi không có explanation.",
        B: "Theo key, No phù hợp vì evaluation chỉ phát hiện/kiểm soát chất lượng; cần thêm retry hoặc regeneration mới sửa nội dung. Không có explanation gốc để đối chiếu."
      },
      ultraShort: "Chỉ score + block, không sửa/sinh lại → B, No.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators"]
    },
    101: {
      keywords: "Ngữ cảnh Case Study: tải biến động, không dành trước thông lượng; dữ liệu ở EU; giữ phiên bản ổn định",
      mnemonic: "Ở EU, tự co giãn → Standard; giữ phiên bản → opt out nâng tự động.",
      trapNotes: {
        "Deployment type": "Standard là đúng vì pay-per-token, tự phục vụ traffic biến động và xử lý trong deployment region; Global có thể xử lý ngoài EU, Provisioned cần capacity dành trước.",
        "Version update policy": "Opt out of automatic model version upgrades là đúng để giữ hành vi ổn định; các chính sách nâng khi hết hạn hoặc khi có default mới đều cho phép đổi version tự động."
      },
      ultraShort: "Tải biến động, dữ liệu ở EU → Standard; giữ phiên bản → opt out nâng tự động.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types", "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/model-versions"]
    },
    102: {
      keywords: "chỉ dẫn độc hại ẩn trong ảnh của product sheet; indirect prompt injection",
      mnemonic: "Lệnh độc giấu trong tài liệu → Prompt Shields.",
      trapNotes: {
        A: "Self-harm filtering chỉ phát hiện nội dung tự gây hại; không nhận diện chỉ dẫn nhúng nhằm chiếm quyền điều khiển model.",
        B: "Prompt Shields là đúng vì phát hiện user prompt và document attacks, gồm chỉ dẫn độc từ nội dung bên thứ ba sau OCR.",
        C: "PII Detection tìm hoặc che dữ liệu nhận dạng cá nhân; cần khi bảo vệ PII nhưng không ngăn prompt injection ẩn trong ảnh.",
        D: "Violence filtering lọc nội dung bạo lực; đây là bộ lọc an toàn nội dung, không phải lớp phòng thủ document prompt attack."
      },
      ultraShort: "Chỉ dẫn độc ẩn trong ảnh/tài liệu → B, Prompt Shields.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection"]
    },
    103: {
      keywords: "Ngữ cảnh Case Study: dùng product sheets; câu trả lời phải liên quan, đầy đủ và chính xác",
      mnemonic: "Đánh giá cả truy xuất lẫn câu trả lời → RAG evaluator.",
      trapNotes: {
        A: "RAG evaluator là đúng vì đánh giá pipeline truy xuất và sinh trên nhiều mặt như relevance, groundedness và completeness.",
        B: "Custom guardrail thực thi chính sách hoặc chặn hành vi; dùng cho an toàn/phạm vi, không phải bộ đo chất lượng RAG tổng thể.",
        C: "Fine-tuning thay đổi model để thích nghi tác vụ; không phải cơ chế đo response hiện tại có relevant, complete và accurate hay không.",
        D: "Groundedness evaluator chỉ kiểm tra response bám context, là một mặt của accuracy; không bao quát relevance và completeness như yêu cầu."
      },
      ultraShort: "Đánh giá RAG nhiều mặt → A, RAG evaluator.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators"]
    },
    104: {
      keywords: "chỉ trả lời về sản phẩm Contoso; ràng buộc phạm vi hành vi agent",
      mnemonic: "Luật nền cho agent đặt trong system message.",
      trapNotes: {
        A: "Sửa system message là đúng vì đặt phạm vi, nguồn được dùng và cách từ chối câu ngoài sản phẩm Contoso ở mức chỉ dẫn ưu tiên cao.",
        B: "Few-shot examples minh họa cách trả lời và hữu ích cho định dạng, nhưng không diễn đạt ranh giới phạm vi trực tiếp, đầy đủ như system instruction.",
        C: "Top-p chỉ điều chỉnh tập token được lấy mẫu và độ đa dạng; không giới hạn chủ đề agent được phép trả lời.",
        D: "Tăng temperature làm output đa dạng và khó đoán hơn; không ép agent chỉ nói về sản phẩm Contoso."
      },
      ultraShort: "Giới hạn agent chỉ nói về Contoso → A, sửa system message instructions.",
      sources: ["https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation"]
    },
    105: {
      keywords: "Ngữ cảnh Case Study: hóa đơn có bảng, logo, nhiều bố cục; cần hiểu hình ảnh lẫn văn bản",
      mnemonic: "Hóa đơn phức tạp cần hiểu nội dung và bố cục → Content Understanding.",
      trapNotes: {
        A: "Chat completions sinh ngôn ngữ từ prompt; không tự xây pipeline OCR, layout và structured field extraction cho hóa đơn.",
        B: "Azure Document Intelligence mạnh về OCR và cấu trúc tài liệu; nhưng đề yêu cầu Foundry capability hợp nhất hiểu nội dung đa dạng, nên Content Understanding phù hợp hơn.",
        C: "Azure Content Understanding là đúng vì kết hợp OCR, layout, bảng và field extraction trên tài liệu có mẫu khác nhau để phục vụ đối chiếu.",
        D: "Image Analysis nhận diện đối tượng, đặc trưng và text trong ảnh; không chuyên trích field nghiệp vụ và quan hệ bảng của hóa đơn phức tạp."
      },
      ultraShort: "Hóa đơn nhiều bố cục + bảng/logo + hình/chữ → C, Azure Content Understanding.",
      sources: ["https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-reference"]
    },
    106: {
      keywords: "Ngữ cảnh Case Study: product sheets là PDF; pipeline phải hỗ trợ semantic và vector search",
      mnemonic: "Chia nhỏ trước, biến thành vector sau → Text Split + Embedding.",
      trapNotes: {
        A: "Azure OpenAI Embedding là đúng vì biến từng chunk thành vector để tìm kiếm tương đồng; đây là thành phần bắt buộc cho vector search.",
        B: "Entity Recognition rút người, tổ chức hoặc địa điểm; hữu ích cho metadata nhưng không tạo vector hay chia PDF cho RAG.",
        C: "Text Split là đúng vì chia PDF dài thành chunk vừa embedding và truy xuất; chunk nhỏ giúp tìm đoạn liên quan chính xác hơn.",
        D: "Merge ghép text gốc với phần như OCR; chỉ cần khi phải hợp nhất nguồn text, không phải cặp cốt lõi để bật semantic và vector search.",
        E: "Language Detection nhận diện ngôn ngữ để định tuyến xử lý; không trực tiếp tạo chunk hay embedding cho vector search.",
        F: "Key phrase extraction tạo cụm từ nổi bật; có thể bổ sung metadata nhưng không thay thế vector embedding và chunking."
      },
      ultraShort: "PDF cần chia đoạn và tạo vector → A + C, Azure OpenAI Embedding + Text Split.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/search-how-to-semantic-chunking", "https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-azure-openai-embedding"]
    },
    107: {
      keywords: "Ngữ cảnh Case Study: product sheets ở Blob storage1; cần lập chỉ mục semantic và vector",
      mnemonic: "Tài liệu nội bộ cần lập chỉ mục và truy xuất → Azure AI Search.",
      trapNotes: {
        A: "Azure Translator dịch ngôn ngữ; dùng khi cần bản dịch, không cung cấp indexing, semantic search hay vector search cho product sheets.",
        B: "Grounding with Bing Search lấy web công khai; dữ liệu đề nằm riêng trong Blob Storage nên không phải nguồn grounding phù hợp.",
        C: "Azure AI Search là đúng vì lập chỉ mục Blob, hỗ trợ semantic/vector retrieval và cung cấp đoạn liên quan để agent tạo câu trả lời có căn cứ.",
        D: "Azure Document Intelligence trích text và layout từ PDF; có thể hỗ trợ ingestion nhưng không phải retrieval engine semantic/vector cho RAG."
      },
      ultraShort: "Blob nội bộ + chỉ mục semantic/vector → C, Azure AI Search.",
      sources: ["https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"]
    }
  };
})();
