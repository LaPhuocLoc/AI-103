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
