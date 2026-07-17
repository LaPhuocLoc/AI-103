const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadData() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of [
    "questions.js", "matching-data.js", "tips-batches/tips-1-36.js",
    "tips-batches/tips-37-72.js", "tips-batches/tips-73-107.js", "tips.js"
  ]) {
    vm.runInContext(fs.readFileSync(require.resolve(`../${file}`), "utf8"), context);
  }
  return window;
}

function assertGuideShape(question, guide, matching) {
  assert.equal(typeof guide, "object", `Q${question.id} missing authored guide`);
  for (const field of ["keywords", "mnemonic", "ultraShort"]) {
    assert.ok(guide[field]?.trim(), `Q${question.id} missing authored ${field}`);
  }
  assert.equal(typeof guide.trapNotes, "object", `Q${question.id} missing authored trapNotes`);
  assert.ok(Array.isArray(guide.sources) && guide.sources.length > 0, `Q${question.id} missing sources`);
  for (const source of guide.sources) {
    assert.match(source, /^https:\/\/learn\.microsoft\.com\//, `Q${question.id} source must be Microsoft Learn`);
  }
  const expectedKeys = question.choices.length
    ? Array.from(question.choices, (choice) => choice.label)
    : Array.from(matching[question.id], (group) => group.prompt);
  assert.deepEqual(Object.keys(guide.trapNotes), expectedKeys, `Q${question.id} trapNotes keys`);
  for (const key of expectedKeys) {
    assert.ok(guide.trapNotes[key]?.trim().length >= 25, `Q${question.id} trap note ${key} is too shallow`);
  }
  assert.ok(guide.ultraShort.length <= 180, `Q${question.id} ultraShort is not short`);
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

test("tips batch 2 covers and aligns questions 28-54", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  for (let id = 28; id <= 54; id++) {
    assertTipShape(id, AI103_TIPS[id]);
    assertAligned(AI103_QUESTIONS[id - 1], AI103_TIPS[id], AI103_MATCHING);
  }
});

test("tips batch 3 covers and aligns questions 55-81", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  for (let id = 55; id <= 81; id++) {
    assertTipShape(id, AI103_TIPS[id]);
    assertAligned(AI103_QUESTIONS[id - 1], AI103_TIPS[id], AI103_MATCHING);
  }
});

test("tips batch 4 covers and aligns questions 82-107", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIPS } = loadData();
  for (let id = 82; id <= 107; id++) {
    assertTipShape(id, AI103_TIPS[id]);
    assertAligned(AI103_QUESTIONS[id - 1], AI103_TIPS[id], AI103_MATCHING);
  }
});

test("tip catalog exactly covers all 107 questions with clean text", () => {
  const { AI103_QUESTIONS, AI103_TIPS } = loadData();
  assert.equal(AI103_QUESTIONS.length, 107);
  assert.deepEqual(Object.keys(AI103_TIPS).map(Number), Array.from({ length: 107 }, (_, index) => index + 1));
  assert.doesNotMatch(JSON.stringify(AI103_TIPS), /Ã[\u0080-\u00bf]|â(?:€|™|†|œ|€¦)|Â /);
});

test("all 107 tips use fully authored Vietnamese learning guides", () => {
  const { AI103_QUESTIONS, AI103_MATCHING, AI103_TIP_GUIDES } = loadData();
  assert.equal(typeof AI103_TIP_GUIDES, "object", "authored guide catalog is missing");
  assert.deepEqual(Object.keys(AI103_TIP_GUIDES).map(Number), Array.from({ length: 107 }, (_, index) => index + 1));
  for (const question of AI103_QUESTIONS) assertGuideShape(question, AI103_TIP_GUIDES[question.id], AI103_MATCHING);
});

test("authored guides are concise, Vietnamese, distinct, and used verbatim", () => {
  const { AI103_QUESTIONS, AI103_TIP_GUIDES, AI103_TIPS } = loadData();
  const vietnamese = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
  const keywords = new Set();
  const mnemonics = new Set();
  for (const question of AI103_QUESTIONS) {
    const guide = AI103_TIP_GUIDES[question.id];
    assert.ok(vietnamese.test(guide.keywords), `Q${question.id} keywords need natural Vietnamese`);
    assert.ok(vietnamese.test(guide.mnemonic), `Q${question.id} mnemonic needs natural Vietnamese`);
    assert.ok(guide.keywords.length <= 160, `Q${question.id} keywords are too long`);
    assert.ok(guide.mnemonic.length <= 240, `Q${question.id} mnemonic is too long`);
    assert.equal(keywords.has(guide.keywords), false, `Q${question.id} duplicates another keyword set`);
    assert.equal(mnemonics.has(guide.mnemonic), false, `Q${question.id} duplicates another mnemonic`);
    keywords.add(guide.keywords);
    mnemonics.add(guide.mnemonic);
    for (const note of Object.values(guide.trapNotes)) {
      assert.ok(vietnamese.test(note), `Q${question.id} trap note needs Vietnamese explanation`);
      assert.doesNotMatch(note, /không đáp ứng trực tiếp tín hiệu quyết định/i, `Q${question.id} uses a generic trap`);
    }
    assert.deepEqual(
      Array.from(AI103_TIPS[question.id].traps, (trap) => [trap.label, trap.text]),
      Object.entries(guide.trapNotes),
      `Q${question.id} must render authored traps verbatim`
    );
    assert.equal(AI103_TIPS[question.id].ultraShort, guide.ultraShort, `Q${question.id} must render authored ultraShort`);
  }
});
