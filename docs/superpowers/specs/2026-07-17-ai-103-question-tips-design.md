# AI-103 Per-Question Tips - Design Specification

## Goal

Add a Vietnamese `Mẹo` experience to every one of the 107 AI-103 questions. Each tip must help the learner recognize the decisive signals, remember the correct concept, distinguish every distractor, and retain a one-line exam shortcut.

## Content contract

Every question has one manually authored tip record with these fields:

- `id`: the matching question ID from 1 through 107.
- `keywords`: the shortest decisive signals from the scenario. Product names stay in their official English form.
- `answer`: the correct answer or correct mapping stated in learner-friendly form.
- `mnemonic`: a compact Vietnamese memory rule that generalizes beyond the exact wording.
- `traps`: explanations of why each incorrect alternative is wrong and when it would be appropriate. For standard questions this covers every A-H choice. For table, Yes/No, dropdown, and drag questions it covers the important competing tools, settings, or mappings for every response group.
- `ultraShort`: one line combining the decisive signal and answer for rapid review.

Tips are authored from `questions.js`, `matching-data.js`, and the source PDF explanations. They do not introduce answers that are absent from those sources. They may normalize wording for clarity but must preserve official product and API names.

The tips are Vietnamese. Source keywords, API members, tool names, model names, settings, and answer labels remain in English when translation would reduce precision.

## Data architecture

Create a separate generated/manual browser data file, `tips.js`, exporting:

```javascript
window.AI103_TIPS = {
  1: {
    keywords: "streaming audio + transcript trong vài giây + live call",
    answer: "D. Use real-time speech to text to process streaming audio input.",
    mnemonic: "Có luồng âm thanh trực tiếp và cần chữ ngay -> real-time speech to text.",
    traps: [
      { label: "A", text: "Text to speech đi chiều ngược lại: text -> audio." },
      { label: "B", text: "Speech translation dùng khi cần dịch sang ngôn ngữ khác." },
      { label: "C", text: "Batch transcription xử lý file đã ghi xong, không phù hợp live." },
      { label: "D", text: "Real-time speech to text nhận stream và trả transcript độ trễ thấp." }
    ],
    ultraShort: "Live audio + transcript trong vài giây -> real-time speech to text (D)."
  }
};
```

`questions.js` remains reproducible from the PDF extractor and is not manually enriched. `matching-data.js` remains responsible only for interactive grading. `tips.js` is the single source of truth for learning tips.

## User interface

Add a `💡 Mẹo` button in the question metadata row beside the flag control. The button uses `aria-expanded` and points to a dedicated tip panel through `aria-controls`.

The tip panel appears inside the question card after the stem and before the choices. It contains:

1. `Keyword`
2. The correct answer or mapping
3. `Mẹo nhớ`
4. `Phân biệt bẫy`
5. `Bản siêu ngắn`

The panel uses the existing Azure visual system with a distinct warm tip accent that still passes WCAG AA contrast in light and dark themes. It must not reuse correct/wrong colors as its sole semantic signal.

The panel closes whenever the learner moves to another question or changes mode. Reopening is an intentional action. Opening a tip does not modify answers, checked state, score, flags, timer, or retry queues.

## Mode behavior

- Practice mode: the tip is available before or after checking an answer.
- Retry mode: the tip is available before or after checking an answer.
- Exam mode before submission: the button remains visible but disabled. Its accessible label/title explains `Mẹo mở sau khi nộp bài`.
- Exam mode after submission: the tip becomes available for review.
- Loading an already-submitted exam state restores tip availability but does not automatically open a panel.

Tip open/closed state is intentionally not persisted or exported.

## Interaction and accessibility

- The button is keyboard and touch operable.
- `aria-expanded` always matches panel visibility.
- The disabled exam state uses both disabled behavior and explanatory text, not color alone.
- Panel headings preserve a meaningful reading order.
- Traps are a semantic list.
- Long product names and code identifiers wrap without horizontal overflow.
- Focus remains on the button when toggling; switching question does not force focus into the panel.

## Validation

Automated data tests must verify:

- Exactly 107 tip IDs, sequentially covering 1-107 with no extras.
- Every required field is non-empty.
- Standard gradable questions have one trap item for every visible choice label.
- The answer contains every correct standard label, or every curated correct mapping for interactive questions.
- Every trap label for a standard question belongs to its choice set.
- No tip contains placeholder strings or known mojibake patterns.
- `questions.js` and `matching-data.js` remain unchanged by tip authoring.

Automated UI/behavior tests must verify:

- The tip button and panel IDs exist and remain in the DOM contract.
- Practice and retry can toggle the panel.
- Pre-submit exam mode disables the button and never renders tip content.
- Submitted exam mode enables the button.
- Moving questions and changing modes close the panel.
- Toggling tips does not mutate portable state or AB-100 isolation fixtures.
- `aria-expanded`, disabled copy, keyboard behavior, and responsive wrapping contracts are present.

## Error handling

- If a tip record is unexpectedly missing, the button is disabled and exposes `Chưa có mẹo cho câu này`; the application must not throw.
- Malformed optional trap items are skipped during rendering, while required data tests prevent them from shipping.
- Tip rendering uses text nodes or `textContent`; authored tip text is not inserted as raw HTML.

## Acceptance criteria

- All 107 questions expose a source-accurate Vietnamese tip after applying the mode rules.
- Each tip contains Keyword, answer, mnemonic, distractor differentiation, and ultra-short memory line.
- Every standard choice and every interactive response group is addressed by its tip.
- Exam correctness remains concealed before submission.
- Tip interaction is accessible, responsive, and state-neutral.
- Existing 107-question extraction, 29 interactive mappings, 9 drag IDs, grading, persistence, retry behavior, and GitHub Pages deployment remain intact.
