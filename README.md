# AI-103 Mock Exam

Trang luyện thi tĩnh gồm 107 câu hỏi AI-103. Nội dung câu hỏi, lựa chọn, đáp án và phần giải thích được giữ bằng tiếng Anh theo tài liệu nguồn; các nút điều khiển và thông báo của giao diện dùng tiếng Việt.

## Chạy ứng dụng

Mở trực tiếp `index.html` bằng trình duyệt để học trên máy cá nhân. Khi triển khai lên web, hãy phục vụ toàn bộ thư mục bằng một máy chủ tĩnh để ứng dụng có thể tải PDF và state đã commit.

Ứng dụng có ba chế độ:

- **Luyện tập**: kiểm tra từng câu và xem đáp án, giải thích ngay.
- **Thi thử**: làm bài liên tục, không hiện đáp án trước khi kết thúc.
- **Làm lại câu sai**: tạo danh sách từ các câu trả lời sai, chưa hoàn thành hoặc đã đánh dấu.

## Mẹo cho từng câu

Mỗi câu trong bộ 107 câu có nút **💡 Mẹo** với keyword nhận diện, đáp án cần nhớ, mẹo nhớ, phân tích từng lựa chọn/bẫy và bản siêu ngắn. Toàn bộ nội dung học tập được biên tập thủ công theo từng câu và đối chiếu với nguồn Microsoft Learn; phần phân biệt bẫy không còn được sinh tự động từ lời giải tiếng Anh.

Ở chế độ **Luyện tập** và **Làm lại câu sai**, mẹo có thể mở bất kỳ lúc nào. Ở chế độ **Thi thử**, nút mẹo chỉ được mở sau khi nộp bài để không làm lộ đáp án trong lúc thi.

Việc mở hoặc đóng mẹo không thay đổi câu trả lời, điểm, thời gian, cờ đánh dấu hay file state.

## Lưu và chuyển tiến độ

Tiến độ được tự động lưu cục bộ trong `localStorage` của từng trình duyệt. Dữ liệu cục bộ không tự đồng bộ sang thiết bị khác và website tĩnh không thể tự ghi vào Git.

Để chuyển hoặc lưu một bản tiến độ dùng chung:

1. Bấm **Xuất file state**. Trình duyệt tải xuống `ai103-progress-state.json`.
2. Có thể lưu file này làm bản sao cá nhân. Nếu muốn website triển khai nạp bản đó, thay file `ai103-progress-state.json` đã commit trong repository rồi commit và triển khai lại.
3. Trên trình duyệt khác, bấm **Nạp từ Git** để tải bản state đã triển khai. Thao tác này ghi đè tiến độ cục bộ khi file chứa dữ liệu làm bài.

File `ai103-progress-state.json` đi kèm repository là state sạch ở chế độ luyện tập. Chỉ file có tên này được ứng dụng xuất và tải; không đổi sang tên khác.

## Tạo lại dữ liệu từ PDF

Script trích xuất đọc PDF nguồn tại `C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf`, tạo lại `questions.js`, đồng thời sao chép PDF thành `AI-103.pdf` trong repository. Cài `pdfplumber`, đặt file nguồn đúng đường dẫn trên, rồi chạy từ thư mục gốc dự án:

```powershell
python tools/extract_pdf.py
```

Sau khi tạo lại, chạy kiểm thử dữ liệu:

```powershell
node --test tests/question-data.test.cjs
```
