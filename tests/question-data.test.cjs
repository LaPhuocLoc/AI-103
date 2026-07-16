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
