# AI-103 Mock Exam - Design Specification

## Goal

Convert the existing AB-100 mock exam website into a single-certification AI-103 mock exam based on `C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf`.

The site will preserve the stable interaction model of the current project while replacing all certification-specific content, branding, state keys, and source links. The result will contain all 107 AI-103 questions in PDF order.

## Audience and language

- The primary user is a Vietnamese-speaking learner preparing for AI-103.
- Questions, answer choices, correct answers, and explanations remain in English exactly as represented by the source PDF, subject only to whitespace and extraction cleanup.
- Navigation, controls, status messages, and help text use Vietnamese.

## Product scope

The site remains a single-page mock exam. It replaces AB-100 rather than adding a certification selector.

It provides:

- Practice mode, which reveals the correct answer and explanation after the learner checks a response.
- Exam mode, which presents all 107 questions in PDF order and hides correctness until submission.
- Retry mode, which contains questions answered incorrectly or left incomplete.
- A running timer with pause and resume controls.
- Progress, score, question flags, and a 107-item navigation grid.
- Light and dark themes.
- Device-local progress persistence plus export and import through `progress-state.json`.
- A source-page link from each answer to the relevant page in the bundled AI-103 PDF.

The first version does not add accounts, cloud persistence, question randomization, topic filters, or a certification selector.

## Interface design

The current two-column exam layout is retained because its desktop and mobile behavior is already established.

- The sidebar contains AI-103 branding, the timer, progress, score, state synchronization controls, and the question grid.
- The main area contains the certification title, mode controls, question card, navigation actions, and answer explanation card.
- On mobile, the sidebar becomes a dismissible question drawer.
- Azure blue is the primary accent color, with accessible contrast in both themes.
- Branding reads `AI-103` and `Azure AI Apps and Agents Developer Associate`.
- Pointer, keyboard, and touch interactions remain supported. Matching questions support both drag-and-drop and tap-to-select behavior.

## Question data and extraction

The source PDF contains 113 pages and 107 sequential question markers, from Q1 through Q107. A deterministic extraction script will:

1. Copy the source PDF into the project with an AI-103-specific filename.
2. Remove repeating AI-103 headers and footers.
3. split the document into Q1-Q107 blocks.
4. Extract question text, answer choices, explicit answers, explanations, and source page numbers.
5. Validate that question identifiers are continuous and exactly 107 questions are emitted.
6. Write certification-specific question data for the browser.

Questions whose table, diagram, or response controls are represented as images in the PDF require manually curated structured data. That data will define the prompts, available choices, correct mappings, and interaction type. It will remain separate from the generic exam behavior so that extraction can be rerun without overwriting manual mappings.

If a question cannot be graded confidently from the PDF, it will be rendered as a manual-review question. The learner can reveal the source answer and explanation, but the application will not invent a machine-gradable answer.

## Application architecture

The existing static architecture is retained:

- `index.html` owns the accessible document structure and AI-103 branding.
- `styles.css` owns responsive layout, themes, and interaction states.
- The extracted question data file owns standard question content.
- The curated matching data file owns image/table-based response structures.
- `app.js` owns state normalization, rendering, grading, navigation, timer behavior, theme behavior, export/import, and retry mode.

Certification-specific global names, storage keys, theme keys, filenames, labels, and links will be renamed from AB-100 to AI-103. The AI-103 local-storage key will be new, so an existing AB-100 state cannot corrupt or populate the new exam.

## State and grading

The application records the current question, submitted answers, checked status, flags, elapsed time, pause state, active mode, and retry data.

- Standard single- and multiple-choice questions compare selected labels with the extracted correct labels.
- Yes/No and matching questions compare each response group with curated mapping data.
- In practice mode, checking a gradable question immediately shows correctness and explanation.
- In exam mode, responses are stored without revealing correctness until the learner submits the exam.
- Retry mode is populated from incorrect and incomplete questions and calculates progress within that subset.
- Manual-review questions count as answered after the learner explicitly reveals the answer, but they are excluded from automated percentage scoring.

Import data will be normalized before use. Invalid indexes, unknown modes, malformed answer groups, and missing fields fall back to safe defaults.

## Error handling

- A missing or unreadable committed state file leaves the local state intact and shows a Vietnamese status message.
- A malformed local state resets only unsupported fields through normalization instead of breaking the page.
- Missing source-page metadata falls back to the first relevant PDF page.
- A question without reliable grading data remains usable as manual review.
- Extraction fails visibly if numbering is discontinuous or the total differs from 107.

## Accessibility and responsive behavior

- All interactive controls have Vietnamese accessible labels.
- Focus states remain visible in both themes.
- Question choices are operable with keyboard, mouse, pen, and touch as applicable.
- Mobile navigation traps no focus and can be dismissed through the close control or backdrop.
- Text wraps without horizontal scrolling at narrow widths.
- Color is not the only indicator of answered, correct, incorrect, active, or flagged state.

## Validation

Automated checks will cover:

- Exactly 107 sequential extracted questions.
- Standard answer grading and multi-select grading.
- Matching and Yes/No grading.
- Exam-mode answer concealment and final submission behavior.
- Retry queue construction and retry scoring.
- State normalization and restoration using the AI-103 key.
- Mobile drawer open, close, backdrop, and question-selection behavior.
- No remaining user-visible AB-100 branding or storage identifiers.

The finished site will also receive a production build or equivalent static validation. The browser view will be checked at desktop and mobile widths for clipped text, broken navigation, unreadable contrast, and unusable matching controls.

## Acceptance criteria

The implementation is complete when:

- The site presents all 107 AI-103 questions in source order.
- All confidently extractable and manually curated questions grade correctly.
- English exam content and Vietnamese interface copy are consistently separated.
- Practice, exam, and retry modes work with a fresh state and a restored state.
- The bundled AI-103 PDF opens from the site, and answer links target relevant source pages.
- The desktop and mobile interfaces remain fully usable.
- No AI-103 data is stored under AB-100 state or theme keys.
- Automated tests and final validation pass.
