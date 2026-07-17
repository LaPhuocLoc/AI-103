# AI-103 Tip Quality Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Biên tập và review lại toàn bộ mẹo của 107 câu AI-103 để chính xác, dễ hiểu và dễ nhớ bằng tiếng Việt.

**Architecture:** Tách guide thành ba file batch để agent làm song song mà không xung đột. `tips.js` chỉ kết hợp guide đã biên tập với đáp án chuẩn; một bộ test contract và một reviewer độc lập kiểm soát chất lượng trước khi merge.

**Tech Stack:** JavaScript tĩnh, Node.js test runner, Microsoft Learn, GitHub Pages.

## Global Constraints

- Không sửa `questions.js` hoặc `matching-data.js`.
- Mỗi câu có `keywords`, `mnemonic`, `trapNotes`, `ultraShort` và ít nhất một nguồn `https://learn.microsoft.com/`.
- Mọi lựa chọn hoặc matching group có trap note tiếng Việt riêng, cụ thể.
- Critical/Important findings từ reviewer phải được sửa và review lại.
- Không thay đổi state contract hoặc logic chấm điểm của ứng dụng.

---

### Task 1: Contract dữ liệu guide thủ công

**Files:**
- Modify: `tests/tips-data.test.cjs`
- Modify: `tips.js`
- Modify: `index.html`
- Create: `tips-batches/tips-1-36.js`
- Create: `tips-batches/tips-37-72.js`
- Create: `tips-batches/tips-73-107.js`

**Interfaces:**
- Consumes: `window.AI103_QUESTIONS`, `window.AI103_MATCHING`.
- Produces: `window.AI103_TIP_GUIDES` và `window.AI103_TIPS`.

- [ ] **Step 1: Viết test contract thất bại**

Kiểm tra đủ 107 guide; mỗi guide có năm trường bắt buộc; `trapNotes` khớp toàn bộ choices/groups; nguồn chỉ dùng Microsoft Learn; `ultraShort` không được sinh tự động.

- [ ] **Step 2: Chạy test và xác nhận RED**

Run: `node --test tests/tips-data.test.cjs`
Expected: FAIL vì các batch guide và contract mới chưa tồn tại.

- [ ] **Step 3: Tạo loader tối thiểu và file batch rỗng**

`tips.js` đọc `AI103_TIP_GUIDES`, lấy exact answer từ dữ liệu gốc, và dùng `trapNotes` thay cho parser explanation tiếng Anh. `index.html` tải ba batch trước `tips.js`.

- [ ] **Step 4: Chạy test cấu trúc liên quan**

Run: `node --test tests/mobile-ui.test.cjs tests/tips-data.test.cjs`
Expected: phần loader/DOM pass; coverage guide còn fail cho đến khi Task 2–4 hoàn tất.

### Task 2: Audit và rewrite câu 1–36

**Files:**
- Create: `tips-batches/tips-1-36.js`
- Create: `docs/tip-review-sources/tips-1-36.md`

**Interfaces:**
- Produces guide IDs 1–36 theo contract Task 1.

- [ ] **Step 1: Đọc từng câu và phân tích tín hiệu quyết định**
- [ ] **Step 2: Tra Microsoft Learn và ghi nguồn theo câu**
- [ ] **Step 3: Viết keyword, mnemonic, trap notes và ultra-short thủ công**
- [ ] **Step 4: Chạy test batch 1 và tự review theo rubric 4 tiêu chí**

Run: `node --test tests/tips-data.test.cjs`
Expected: Q1–36 không còn lỗi nội dung/contract.

### Task 3: Audit và rewrite câu 37–72

**Files:**
- Create: `tips-batches/tips-37-72.js`
- Create: `docs/tip-review-sources/tips-37-72.md`

**Interfaces:**
- Produces guide IDs 37–72 theo contract Task 1.

- [ ] **Step 1: Đọc từng câu và phân tích tín hiệu quyết định**
- [ ] **Step 2: Tra Microsoft Learn và ghi nguồn theo câu**
- [ ] **Step 3: Viết keyword, mnemonic, trap notes và ultra-short thủ công**
- [ ] **Step 4: Chạy test batch 2 và tự review theo rubric 4 tiêu chí**

Run: `node --test tests/tips-data.test.cjs`
Expected: Q37–72 không còn lỗi nội dung/contract.

### Task 4: Audit và rewrite câu 73–107

**Files:**
- Create: `tips-batches/tips-73-107.js`
- Create: `docs/tip-review-sources/tips-73-107.md`

**Interfaces:**
- Produces guide IDs 73–107 theo contract Task 1.

- [ ] **Step 1: Đọc từng câu và phân tích tín hiệu quyết định**
- [ ] **Step 2: Tra Microsoft Learn và ghi nguồn theo câu**
- [ ] **Step 3: Viết keyword, mnemonic, trap notes và ultra-short thủ công**
- [ ] **Step 4: Chạy test batch 3 và tự review theo rubric 4 tiêu chí**

Run: `node --test tests/tips-data.test.cjs`
Expected: Q73–107 không còn lỗi nội dung/contract.

### Task 5: Review chéo độc lập 107 câu

**Files:**
- Create: `docs/tip-review-sources/cross-review.md`
- Modify as needed: `tips-batches/*.js`

**Interfaces:**
- Consumes toàn bộ guide và dữ liệu đề gốc.
- Produces bảng điểm 4 tiêu chí cho 107 câu và findings có severity.

- [ ] **Step 1: Reviewer độc lập chấm từng câu**
- [ ] **Step 2: Sửa toàn bộ Critical/Important findings**
- [ ] **Step 3: Reviewer xác nhận lại các câu đã sửa**
- [ ] **Step 4: Main agent spot-check các domain rủi ro cao với Microsoft Learn**

### Task 6: QA, tài liệu và triển khai

**Files:**
- Modify: `README.md`
- Modify: `tests/tips-data.test.cjs`

- [ ] **Step 1: Thêm quality tests chống nội dung chung chung và tiếng Anh dài**
- [ ] **Step 2: Chạy toàn bộ Node/Python tests**

Run: `$tests=(Get-ChildItem tests -Filter *.test.cjs).FullName; node --test $tests`
Expected: 0 failures.

Run: `python -m pytest tests/extract-pdf.test.py -q`
Expected: 7 passed.

- [ ] **Step 3: Xác nhận dữ liệu đề gốc không đổi và review UI desktop/mobile**
- [ ] **Step 4: Commit, merge vào main, push `ai103/main` và xác minh GitHub Pages**

