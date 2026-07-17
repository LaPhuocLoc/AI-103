const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "question-supplements.js");

function loadSupplements() {
  assert.ok(fs.existsSync(DATA_FILE), "missing curated question supplement data");
  const window = {};
  vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), vm.createContext({ window }));
  return window.AI103_QUESTION_SUPPLEMENTS;
}

test("curated supplements cover every meaning-bearing visual omitted by PDF text extraction", () => {
  const supplements = loadSupplements();
  assert.deepEqual(Object.keys(supplements).map(Number), [8, 16, 33, 53, 93]);
});

test("question 8 restores the exact three-agent table from PDF page 9", () => {
  const table = loadSupplements()[8];
  assert.equal(table.type, "table");
  assert.deepEqual(Array.from(table.headers), ["Name", "Description"]);
  assert.deepEqual(Array.from(table.rows, (row) => Array.from(row)), [
    ["TriageAgent", "Classifies incoming customer requests"],
    ["PolicyAgent", "Answers policy questions by searching internal content"],
    ["ActionAgent", "Creates or updates tickets by calling an HTTP API"]
  ]);
});

test("code supplements preserve the source scaffold and identify every matching blank", () => {
  const supplements = loadSupplements();
  for (const id of [16, 33, 53, 93]) {
    assert.equal(supplements[id].type, "code", `question ${id} must use a code supplement`);
    assert.ok(supplements[id].content.trim(), `question ${id} code must not be empty`);
    assert.match(supplements[id].content, /\[1\]/, `question ${id} must label matching blank 1`);
    assert.match(supplements[id].content, /\[2\]/, `question ${id} must label matching blank 2`);
  }
  assert.match(supplements[16].content, /run_payload\s*=\s*\{/);
  assert.match(supplements[33].content, /propose_refund/);
  assert.match(supplements[53].content, /DefaultAzureCredential/);
  assert.match(supplements[93].content, /output_config/);
});

test("the question card loads and exposes a responsive supplement renderer", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const css = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");

  assert.match(html, /id="questionSupplement"[^>]*hidden/);
  assert.match(html, /<script src="question-supplements\.js\?v=1"><\/script>/);
  assert.match(app, /AI103_QUESTION_SUPPLEMENTS/);
  assert.match(app, /function renderQuestionSupplement/);
  assert.match(css, /\.question-supplement/);
  assert.match(css, /\.source-table-wrap/);
  assert.match(css, /\.source-code/);
});
