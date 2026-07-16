const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadData() {
  const window = {};
  const context = vm.createContext({ window });
  vm.runInContext(fs.readFileSync(require.resolve("../questions.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(require.resolve("../matching-data.js"), "utf8"), context);
  return window;
}

test("AI-103 data contains exactly 107 sequential questions", () => {
  const { AI103_QUESTIONS } = loadData();
  assert.deepEqual(Array.from(AI103_QUESTIONS, q => q.id), Array.from({ length: 107 }, (_, i) => i + 1));
});

test("matching data covers the exact reviewed interactive question set", () => {
  const { AI103_MATCHING } = loadData();
  assert.deepEqual(
    Object.keys(AI103_MATCHING).map(Number),
    [3, 6, 9, 10, 13, 16, 19, 23, 26, 29, 33, 36, 43, 46, 49, 53, 56, 59, 63, 66, 69, 73, 76, 79, 83, 86, 89, 93, 101]
  );
});

test("drag data exposes the exact reviewed drag question set", () => {
  const { AI103_DRAG_IDS } = loadData();
  assert.deepEqual(Array.from(AI103_DRAG_IDS), [6, 16, 26, 36, 46, 56, 66, 76, 86]);
});

test("every curated matching answer belongs to its option list", () => {
  const { AI103_MATCHING } = loadData();
  for (const groups of Object.values(AI103_MATCHING)) {
    for (const group of groups) {
      assert.ok(group.prompt.trim());
      assert.ok(group.options.length >= 2);
      assert.ok(group.options.includes(group.correct));
    }
  }
});

test("every question can be graded or explicitly reviewed manually", () => {
  const { AI103_QUESTIONS, AI103_MATCHING } = loadData();
  for (const question of AI103_QUESTIONS) {
    assert.ok(question.gradable || AI103_MATCHING[question.id] || question.answer || question.explanation);
  }
});

test("application consumes only AI-103 browser globals and keys", () => {
  const app = fs.readFileSync(require.resolve("../app.js"), "utf8");
  for (const contract of [
    "AI103_QUESTIONS",
    "AI103_MATCHING",
    "AI103_DRAG_IDS",
    "ai103-mock-state-v1",
    "ai103-theme",
    "AI-103.pdf",
    "ai103-progress-state.json"
  ]) {
    assert.ok(app.includes(contract), `missing AI-103 application contract: ${contract}`);
  }
  for (const staleContract of [
    /AB100_/,
    /ab100-mock-state/,
    /ab100-theme/,
    /AB-100\.pdf/,
    /["'`]progress-state\.json["'`]/
  ]) {
    assert.doesNotMatch(app, staleContract);
  }
});

test("repository documentation and portable state are AI-103-specific", () => {
  const root = require.resolve("../README.md").replace(/[\\/]README\.md$/, "");
  const readmeBytes = fs.readFileSync(require.resolve("../README.md"));
  const readme = new TextDecoder("utf-8", { fatal: true }).decode(readmeBytes);
  const state = JSON.parse(fs.readFileSync(require.resolve("../ai103-progress-state.json"), "utf8"));
  assert.match(readme, /AI-103 Mock Exam/);
  assert.match(readme, /107/);
  assert.match(readme, /tiếng Việt/);
  assert.doesNotMatch(readme, /AB-100/);
  assert.deepEqual(state.state, {
    current: 0,
    answers: {},
    checked: {},
    flags: {},
    elapsed: 0,
    paused: false,
    mode: "practice",
    retryQueue: [],
    retryAnswers: {},
    retryChecked: {}
  });
  assert.equal(state.schemaVersion, 1);
  assert.equal(fs.existsSync(`${root}/progress-state.json`), false);
  assert.equal(fs.existsSync(`${root}/AB-100.pdf`), false);
  assert.deepEqual(fs.readdirSync(root).filter((name) => name.endsWith(".pdf")), ["AI-103.pdf"]);
});
