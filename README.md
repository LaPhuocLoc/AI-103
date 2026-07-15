# AB-100 Mock Exam

Trang luyện đề tĩnh được tạo từ `AB-100.pdf`, gồm đầy đủ 106 câu hỏi, đáp án và phần giải thích. Cả 33 câu ghép cặp/tình huống trong ảnh PDF đã được đối ứng và chấm tự động; 11 câu dạng kéo thả trong đề gốc hỗ trợ kéo bằng chuột, bút, cảm ứng và thao tác chạm chọn trên điện thoại.

Mở trực tiếp `index.html` bằng trình duyệt. Trang tự lưu tiến độ tức thời trong `localStorage`, hỗ trợ chế độ luyện tập/thi thử, đồng hồ, đánh dấu câu và điều hướng nhanh.

## Đồng bộ state qua Git

1. Trên thiết bị đang làm bài, bấm **Xuất file state**.
2. Thay file `progress-state.json` trong repo bằng file vừa tải xuống, sau đó commit/push và deploy web.
3. Trên điện thoại mới, website tự nạp file state đã commit. Nếu điện thoại đã có state riêng, bấm **Nạp từ Git** để ghi đè bằng bản trong repo.

Website tĩnh không thể tự ghi ngược vào Git. Mỗi khi muốn đẩy tiến độ mới lên repo, cần xuất lại `progress-state.json` và commit file đó.

Nếu PDF nguồn thay đổi, chạy lại:

```powershell
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' tools\extract_pdf.py
```
