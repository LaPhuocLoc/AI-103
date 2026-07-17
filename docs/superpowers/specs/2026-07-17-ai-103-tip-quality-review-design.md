# AI-103 Tip Quality Review Design

## Mục tiêu

Nâng bộ mẹo 107 câu từ dữ liệu gợi ý ngắn sang tài liệu học được biên tập thủ công, chính xác theo đề và dễ nhớ bằng tiếng Việt. Không thay đổi câu hỏi, lựa chọn, đáp án hoặc logic chấm điểm gốc.

## Vấn đề hiện tại

- Keyword và mẹo nhớ đã có đủ 107 câu nhưng chất lượng không đồng đều.
- Phần phân biệt bẫy của câu trắc nghiệm đang được trích tự động từ giải thích tiếng Anh, nên chưa đạt yêu cầu tiếng Việt dễ hiểu.
- `ultraShort` đang ghép tự động từ keyword và đáp án đầy đủ, khiến một số câu ghép cặp quá dài và không còn là “bản siêu ngắn”.
- Chưa có bằng chứng review chéo hoặc nguồn Microsoft chính thức cho các khái niệm dễ nhầm.

## Phương án được chọn

Chia nội dung thành ba batch độc lập và biên tập thủ công toàn bộ trường học tập. Ba agent chuyên môn xử lý song song các khoảng 1–36, 37–72 và 73–107. Sau đó một agent không tham gia viết thực hiện review chéo toàn bộ 107 câu. Các phát hiện quan trọng phải được sửa và review lại trước khi merge.

Không dùng phương án chỉ sửa các câu bị nghi ngờ vì khó chứng minh 107 câu đều đạt chuẩn. Không dùng LLM để sinh lại một lần toàn bộ vì dễ lặp lại lỗi chất lượng không đồng đều.

## Contract dữ liệu

Mỗi câu có một guide viết thủ công:

```js
{
  keywords: "tín hiệu quyết định bằng tiếng Việt; giữ nguyên tên sản phẩm/API cần nhớ",
  mnemonic: "một quy tắc nhớ ngắn, có quan hệ nguyên nhân → đáp án",
  trapNotes: {
    A: "giải thích tiếng Việt riêng cho lựa chọn A",
    B: "giải thích tiếng Việt riêng cho lựa chọn B"
  },
  ultraShort: "tối đa một dòng, gồm tín hiệu chính → đáp án",
  sources: ["https://learn.microsoft.com/..."]
}
```

Với câu ghép cặp, khóa của `trapNotes` là prompt của từng nhóm. Nội dung phải nêu lựa chọn đúng và dấu hiệu phân biệt với các lựa chọn còn lại. `sources` phục vụ audit nội bộ và không bắt buộc hiển thị trong UI.

Ba file batch độc lập được tải trước `tips.js`; `tips.js` chỉ ghép guide với đáp án chuẩn từ `questions.js`/`matching-data.js`, không tự viết hoặc dịch nội dung học tập.

## Rubric chất lượng bắt buộc

Mỗi câu được chấm bốn tiêu chí, mỗi tiêu chí phải đạt ít nhất 4/5:

1. **Độ chính xác:** không mâu thuẫn đáp án/giải thích của đề; tên sản phẩm, API, role và tham số đúng.
2. **Keyword chuẩn:** chỉ giữ các tín hiệu quyết định có trong stem và đủ để phân biệt đáp án.
3. **Dễ hiểu:** tiếng Việt tự nhiên, câu ngắn, hạn chế trộn tiếng Anh ngoài tên riêng cần thi.
4. **Dễ nhớ:** mnemonic có quy luật hoặc đối chiếu rõ; ultra-short thực sự ngắn và gọi đúng đáp án.

Điều kiện bổ sung:

- Mọi lựa chọn phải có trap note riêng; không dùng câu chung kiểu “không đáp ứng yêu cầu”.
- Trap note phải nói rõ lựa chọn đó dùng khi nào hoặc sai ở hướng nào.
- Câu đúng phải giải thích dấu hiệu quyết định, không chỉ ghi “đúng”.
- Mỗi câu có ít nhất một URL `learn.microsoft.com` phù hợp; câu có nhiều dịch vụ độc lập có thể cần nhiều nguồn.
- Không sửa dữ liệu gốc `questions.js` và `matching-data.js`.

## Quy trình review

1. Agent batch đọc từng stem, choices, correct answer và explanation trước khi viết.
2. Agent batch tra Microsoft Learn cho các tính năng/role/API dễ nhầm và ghi URL nguồn.
3. Test tự động kiểm tra coverage 107/107, đủ trap notes, nguồn Microsoft, độ dài và các dấu hiệu copy chung chung.
4. Reviewer độc lập chấm rubric từng câu và xuất findings theo mức Critical/Important/Minor.
5. Critical/Important phải được sửa; reviewer xác nhận lại.
6. Main agent spot-check các nhóm rủi ro cao: security, identity/RBAC, Content Understanding/Document Intelligence, agent tools/memory, evaluation/observability và image APIs.

## Kiểm thử và hoàn tất

- Red/green tests cho contract mới trước khi thay dữ liệu production.
- Toàn bộ Node và Python tests phải pass.
- So sánh Git xác nhận câu hỏi/đáp án gốc không đổi.
- Kiểm tra UI desktop/mobile, chế độ practice/retry/exam và console.
- Merge vào `main`, push `ai103/main`, chờ GitHub Pages và xác minh trực tiếp nội dung công khai.

## Tự phê duyệt

Người dùng đã yêu cầu agent tự chốt và triển khai không cần hỏi lại. Thiết kế này được chọn vì tối đa hóa chất lượng nội dung và có hai lớp kiểm soát độc lập: nguồn chính thức và review chéo.
