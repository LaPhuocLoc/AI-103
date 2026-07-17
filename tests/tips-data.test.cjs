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

function assertAligned(question, tip, matching) {
  if (question.choices.length) {
    assert.deepEqual(Array.from(tip.traps, (trap) => trap.label), Array.from(question.choices, (choice) => choice.label));
    for (const label of question.correct) {
      assert.match(tip.answer, new RegExp(`(^|\\W)${label}(\\W|$)`), `Q${question.id} answer missing ${label}`);
    }
  } else {
    assert.equal(tip.traps.length, matching[question.id].length, `Q${question.id} group count`);
    for (const group of matching[question.id]) {
      assert.ok(tip.answer.includes(group.correct), `Q${question.id} answer missing ${group.correct}`);
    }
  }
}

test("tips batch 1 covers and aligns questions 1-27", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  for (let id = 1; id <= 27; id++) {
    assertTipShape(id, AI103_TIPS[id]);
    assertAligned(AI103_QUESTIONS[id - 1], AI103_TIPS[id], AI103_MATCHING);
  }
});
