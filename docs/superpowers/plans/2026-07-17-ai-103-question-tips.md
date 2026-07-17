# AI-103 Per-Question Tips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a source-accurate Vietnamese `Mẹo` panel to every one of the 107 AI-103 questions.

**Architecture:** Store all authored learning content in a separate `tips.js` browser data file so PDF extraction and grading data remain reproducible. Load the tip data before `app.js`, render it through text-only DOM operations, and gate availability through the existing practice/retry/exam submission state without persisting panel visibility.

**Tech Stack:** Static HTML5, CSS, browser JavaScript, Node.js built-in test runner, Python extraction tests, GitHub Pages.

## Global Constraints

- Exactly 107 tip records cover IDs 1-107 with no extras.
- Every tip contains `keywords`, `answer`, `mnemonic`, `traps`, and `ultraShort`.
- Tips are Vietnamese while official product names, API members, settings, and answer labels remain precise English.
- Tips are authored only from `questions.js`, `matching-data.js`, and `AI-103.pdf`; no answer may be invented.
- Standard questions cover every visible choice in `traps`; interactive questions cover every response group and major competing option.
- Practice and retry expose tips immediately; exam mode disables tips until `examSubmitted === true`.
- Opening tips never changes answers, checked state, score, flags, timer, retry queues, or exported state.
- `questions.js` and `matching-data.js` must remain byte-for-byte unchanged during tip authoring.
- Existing 107-question extraction, 29 mappings, 9 drag IDs, grading, persistence, accessibility, and responsive behavior remain intact.

---

## File map

- Create `tips.js`: all 107 manually authored tip records under `window.AI103_TIPS`.
- Create `tests/tips-data.test.cjs`: structural, answer-alignment, batch-coverage, Unicode, and immutability tests.
- Modify `index.html`: load `tips.js`; add tip button and accessible panel markup.
- Modify `styles.css`: responsive, accessible warm-accent tip controls and panel.
- Modify `app.js`: tip lookup, safe text rendering, mode gating, toggle/close behavior, and state-neutral interaction.
- Modify `tests/mobile-ui.test.cjs`: DOM, responsive, contrast, and accessibility source contracts.
- Modify `tests/retry-mode.test.cjs`: executable practice/retry/exam/state-neutral tip behavior.
- Modify `README.md`: document per-question tips and exam gating.

---

### Task 1: Define the tip contract and author questions 1-27

**Files:**
- Create: `tips.js`
- Create: `tests/tips-data.test.cjs`

**Interfaces:**
- Consumes: `window.AI103_QUESTIONS`, `window.AI103_MATCHING`.
- Produces: `window.AI103_TIPS: Record<number, Tip>` where `Tip` has strings `keywords`, `answer`, `mnemonic`, `ultraShort` and `traps: Array<{label:string,text:string}>`.

- [ ] **Step 1: Write failing batch and schema tests**

```javascript
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadData() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["questions.js", "matching-data.js", "tips.js"]) {
    vm.runInContext(fs.readFileSync(require.resolve(`../${file}`), "utf8"), context);
  }
  return window;
}

function assertTipShape(id, tip) {
  assert.equal(typeof tip, "object", `missing tip Q${id}`);
  for (const field of ["keywords", "answer", "mnemonic", "ultraShort"]) {
    assert.ok(tip[field]?.trim(), `Q${id} missing ${field}`);
  }
  assert.ok(Array.isArray(tip.traps) && tip.traps.length > 0, `Q${id} missing traps`);
  for (const trap of tip.traps) {
    assert.ok(trap.label?.trim(), `Q${id} trap missing label`);
    assert.ok(trap.text?.trim(), `Q${id} trap missing text`);
  }
}

test("tips batch 1 covers questions 1-27", () => {
  const { AI103_TIPS } = loadData();
  for (let id = 1; id <= 27; id++) assertTipShape(id, AI103_TIPS[id]);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/tips-data.test.cjs`

Expected: FAIL because `tips.js` does not exist.

- [ ] **Step 3: Create `tips.js` and author Q1-Q27**

Use this exact record shape and author every field from each question's answer/explanation:

```javascript
window.AI103_TIPS = {
  1: {
    keywords: "streaming audio + transcript trong vài giây + live call",
    answer: "D. Use real-time speech to text to process streaming audio input.",
    mnemonic: "Có luồng âm thanh trực tiếp và cần chữ ngay -> real-time speech to text.",
    traps: [
      { label: "A", text: "Text to speech đi chiều ngược lại: text -> audio." },
      { label: "B", text: "Speech translation chỉ phù hợp khi cần dịch ngôn ngữ." },
      { label: "C", text: "Batch transcription xử lý audio đã ghi xong, không phải luồng live." },
      { label: "D", text: "Real-time speech to text nhận stream và trả transcript độ trễ thấp." }
    ],
    ultraShort: "Live audio + transcript trong vài giây -> real-time speech to text (D)."
  }
};
```

For standard questions, trap labels must equal the visible choice labels. For matching/table questions, use group names as labels and explain the correct mapping plus nearby distractors.

- [ ] **Step 4: Add alignment checks for the authored batch**

```javascript
function assertAligned(question, tip, matching) {
  if (question.choices.length) {
    assert.deepEqual(tip.traps.map(t => t.label), question.choices.map(c => c.label));
    for (const label of question.correct) assert.match(tip.answer, new RegExp(`(^|\\W)${label}(\\W|$)`));
  } else {
    assert.equal(tip.traps.length, matching[question.id].length);
    for (const group of matching[question.id]) assert.ok(tip.answer.includes(group.correct));
  }
}
```

Apply `assertAligned` to Q1-Q27.

- [ ] **Step 5: Run GREEN and full regression**

Run: `node --test tests/tips-data.test.cjs tests/question-data.test.cjs`

Expected: all tip batch and existing data tests PASS.

- [ ] **Step 6: Commit**

```powershell
git add tips.js tests/tips-data.test.cjs
git commit -m "feat: add AI-103 tips for questions 1-27"
```

---

### Task 2: Author questions 28-54

**Files:**
- Modify: `tips.js`
- Modify: `tests/tips-data.test.cjs`

**Interfaces:**
- Consumes and extends `window.AI103_TIPS` from Task 1.
- Produces complete aligned tip records for IDs 28-54.

- [ ] **Step 1: Add the failing Q28-Q54 coverage/alignment test**

```javascript
test("tips batch 2 covers and aligns questions 28-54", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  for (let id = 28; id <= 54; id++) {
    assertTipShape(id, AI103_TIPS[id]);
    assertAligned(AI103_QUESTIONS[id - 1], AI103_TIPS[id], AI103_MATCHING);
  }
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/tips-data.test.cjs`

Expected: FAIL at Q28 missing tip.

- [ ] **Step 3: Author Q28-Q54 in `tips.js`**

For each question, read its complete stem, choices or mapping groups, answer, and explanation. Write decisive keywords, exact correct result, a reusable mnemonic, one trap entry per choice/group, and a one-line `ultraShort`. Preserve existing Q1-Q27 records unchanged.

- [ ] **Step 4: Run GREEN and commit**

Run: `node --test tests/tips-data.test.cjs tests/question-data.test.cjs`

Expected: all tests PASS.

```powershell
git add tips.js tests/tips-data.test.cjs
git commit -m "feat: add AI-103 tips for questions 28-54"
```

---

### Task 3: Author questions 55-81

**Files:**
- Modify: `tips.js`
- Modify: `tests/tips-data.test.cjs`

**Interfaces:**
- Extends `window.AI103_TIPS` with aligned IDs 55-81.

- [ ] **Step 1: Add failing coverage/alignment test for IDs 55-81**

```javascript
test("tips batch 3 covers and aligns questions 55-81", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  for (let id = 55; id <= 81; id++) {
    assertTipShape(id, AI103_TIPS[id]);
    assertAligned(AI103_QUESTIONS[id - 1], AI103_TIPS[id], AI103_MATCHING);
  }
});
```

- [ ] **Step 2: Run RED, author Q55-Q81, and run GREEN**

Run before content: `node --test tests/tips-data.test.cjs`

Expected: FAIL at Q55.

After authoring all 27 records, run: `node --test tests/tips-data.test.cjs tests/question-data.test.cjs`

Expected: PASS.

- [ ] **Step 3: Commit**

```powershell
git add tips.js tests/tips-data.test.cjs
git commit -m "feat: add AI-103 tips for questions 55-81"
```

---

### Task 4: Author questions 82-107 and enforce the complete contract

**Files:**
- Modify: `tips.js`
- Modify: `tests/tips-data.test.cjs`

**Interfaces:**
- Completes `window.AI103_TIPS` and locks its final 107-record contract.

- [ ] **Step 1: Add failing final coverage test**

```javascript
test("tips cover exactly 107 sequential questions and align with every answer", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  assert.deepEqual(Object.keys(AI103_TIPS).map(Number), Array.from({ length: 107 }, (_, i) => i + 1));
  for (const question of AI103_QUESTIONS) {
    assertTipShape(question.id, AI103_TIPS[question.id]);
    assertAligned(question, AI103_TIPS[question.id], AI103_MATCHING);
  }
});
```

- [ ] **Step 2: Add Unicode, unfinished-marker, and source immutability checks**

```javascript
test("tip content is clean Vietnamese text", () => {
  const source = fs.readFileSync(require.resolve("../tips.js"), "utf8");
  assert.doesNotMatch(source, /TBD|TODO|FIXME|Ã.|â€|Â/);
});

test("tip authoring does not modify source question contracts", () => {
  assert.equal(loadData().AI103_QUESTIONS.length, 107);
  assert.equal(Object.keys(loadData().AI103_MATCHING).length, 29);
  assert.equal(Array.from(loadData().AI103_DRAG_IDS).length, 9);
});
```

- [ ] **Step 3: Run RED, author Q82-Q107, and run GREEN**

Run before content: `node --test tests/tips-data.test.cjs`

Expected: FAIL because Q82-Q107 are missing and total keys are not 107.

After authoring all records, run: `node --test tests/tips-data.test.cjs tests/question-data.test.cjs`

Expected: all tests PASS with 107 tips, 29 mappings, and 9 drag IDs.

- [ ] **Step 4: Commit**

```powershell
git add tips.js tests/tips-data.test.cjs
git commit -m "feat: complete all 107 AI-103 question tips"
```

---

### Task 5: Add accessible tip markup and visual design

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `tests/mobile-ui.test.cjs`

**Interfaces:**
- Produces DOM IDs `tipButton`, `tipPanel`, `tipKeywords`, `tipAnswer`, `tipMnemonic`, `tipTraps`, `tipUltraShort` consumed by `app.js`.

- [ ] **Step 1: Add failing DOM/style tests**

```javascript
test("tip controls expose the complete accessible DOM contract", () => {
  for (const id of ["tipButton", "tipPanel", "tipKeywords", "tipAnswer", "tipMnemonic", "tipTraps", "tipUltraShort"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /id="tipButton"[\s\S]*aria-controls="tipPanel"[\s\S]*aria-expanded="false"/);
  assert.match(html, /<script src="tips\.js"><\/script>[\s\S]*<script src="app\.js\?v=/);
});

test("tip panel has responsive wrapping and distinct accessible tokens", () => {
  assert.match(css, /--tip-foreground:/);
  assert.match(css, /--tip-surface:/);
  assert.match(css, /\.tip-panel[\s\S]*overflow-wrap:\s*anywhere/);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/mobile-ui.test.cjs`

Expected: FAIL because tip controls and tokens do not exist.

- [ ] **Step 3: Add markup and script loading**

Add the button beside the flag control and the hidden panel after `questionStem`. Use real headings/list markup and initial fallback text that `app.js` replaces through `textContent`.

- [ ] **Step 4: Add CSS with light/dark contrast tokens**

Create `--tip-surface`, `--tip-border`, `--tip-foreground`, and `--tip-muted` in both themes. Style the button/panel, disabled state, trap list, and mobile wrapping without changing existing breakpoints or touch targets.

- [ ] **Step 5: Run GREEN and commit**

Run: `node --test tests/mobile-ui.test.cjs`

Expected: all UI contract tests PASS.

```powershell
git add index.html styles.css tests/mobile-ui.test.cjs
git commit -m "feat: add accessible AI-103 tip panel"
```

---

### Task 6: Implement mode-aware, state-neutral tip behavior

**Files:**
- Modify: `app.js`
- Modify: `tests/retry-mode.test.cjs`

**Interfaces:**
- Consumes `window.AI103_TIPS` and Task 5 DOM IDs.
- Produces `renderTip()`, `setTipOpen(open)`, and `tipAvailable()` internal behavior.

- [ ] **Step 1: Extend the VM harness and write failing behavior tests**

Extend `bootApp` with a `tips` option exposed as `window.AI103_TIPS`, add the tip DOM IDs to the element map, and return `clickTip()`, `tipHidden()`, `tipDisabled()`, and `tipExpanded()` helpers. Use this shared fixture:

```javascript
const tipFixture = {
  1: {
    keywords: "streaming audio + live transcript",
    answer: "D. real-time speech to text",
    mnemonic: "Live audio -> real-time STT",
    traps: [{ label: "D", text: "Đúng cho luồng trực tiếp." }],
    ultraShort: "Live -> real-time STT."
  }
};

test("practice toggles tips without mutating portable state", () => {
  const app = bootApp({ current: 0, mode: "practice" }, { tips: tipFixture });
  const before = app.state();
  app.clickTip();
  assert.equal(app.tipHidden(), false);
  assert.equal(app.tipExpanded(), "true");
  assert.deepEqual(app.state(), before);
  app.clickTip();
  assert.equal(app.tipHidden(), true);
  assert.equal(app.tipExpanded(), "false");
});

test("unsubmitted exam disables tips and submitted exam enables them", () => {
  const app = bootApp({ current: 0, mode: "exam", examSubmitted: false }, { tips: tipFixture });
  assert.equal(app.tipDisabled(), true);
  app.finish();
  assert.equal(app.tipDisabled(), false);
  app.clickTip();
  assert.equal(app.tipHidden(), false);
});

test("mode changes close the tip panel", () => {
  const app = bootApp({ current: 0, mode: "practice" }, { tips: tipFixture });
  app.clickTip();
  assert.equal(app.tipHidden(), false);
  app.changeMode("exam");
  assert.equal(app.tipHidden(), true);
  assert.equal(app.tipExpanded(), "false");
});

test("missing tip disables the button without throwing", () => {
  const app = bootApp({ current: 0, mode: "practice" }, { tips: {} });
  assert.equal(app.tipDisabled(), true);
  assert.match(app.element("tipButton").title, /Chưa có mẹo/);
});
```

The first test must snapshot `app.state()` before/after opening and assert deep equality.

- [ ] **Step 2: Run RED**

Run: `node --test tests/retry-mode.test.cjs`

Expected: tip tests FAIL because no listeners/renderers exist.

- [ ] **Step 3: Implement safe text rendering**

At startup use `const tips = window.AI103_TIPS || {};`. Render all scalar fields with `textContent`. Build trap `<li>` elements with `document.createElement`, label text, and body text; never use `innerHTML` for authored tip content.

- [ ] **Step 4: Implement gating and close behavior**

`tipAvailable()` returns false only for a missing tip or unsubmitted exam. Toggle `aria-expanded` and `hidden`. Call `setTipOpen(false)` before changing question or mode. Do not add tip visibility to `blankState`, normalization, export, or committed state.

- [ ] **Step 5: Run GREEN, full regression, and commit**

Run: `node --test tests/retry-mode.test.cjs tests/mobile-ui.test.cjs tests/tips-data.test.cjs`

Then: `node --test tests/*.test.cjs`

Expected: all tests PASS and tip toggling leaves state unchanged.

```powershell
git add app.js tests/retry-mode.test.cjs
git commit -m "feat: add mode-aware AI-103 tip behavior"
```

---

### Task 7: Document, validate, push, and verify GitHub Pages

**Files:**
- Modify: `README.md`

**Interfaces:**
- Produces the validated and published AI-103 tips release.

- [ ] **Step 1: Add README hygiene assertion and update documentation**

Document that all 107 questions include Vietnamese tips, practice/retry availability, and exam post-submit gating. Extend the repository hygiene test to require this copy.

- [ ] **Step 2: Run complete local verification**

Run:

```powershell
node --test tests/*.test.cjs
python -m pytest tests/extract-pdf.test.py -q
node --check app.js
node --check questions.js
node --check matching-data.js
node --check tips.js
git diff --check
```

Expected: zero failures; 107 tips, 107 questions, 29 mappings, and 9 drag IDs.

- [ ] **Step 3: Run static HTTP smoke**

Serve the repository and require HTTP 200 for `index.html`, `tips.js`, `app.js`, `questions.js`, `matching-data.js`, `styles.css`, `AI-103.pdf`, and `ai103-progress-state.json`. Verify the HTML loads `tips.js` before `app.js`.

- [ ] **Step 4: Commit documentation**

```powershell
git add README.md tests/question-data.test.cjs
git commit -m "docs: document AI-103 question tips"
```

- [ ] **Step 5: Push and verify GitHub Pages**

Push `main` to the `ai103` remote. Poll the Pages build for the pushed SHA until `built`. Require HTTP 200 for the public root and `tips.js`, verify the public page contains the tip button contract, and confirm remote `main` equals local `HEAD`.
