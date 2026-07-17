const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

test("case-study questions 101-107 restore the decision context from the source PDF", () => {
  const window = {};
  const context = vm.createContext({ window });
  vm.runInContext(fs.readFileSync(require.resolve("../case-study-data.js"), "utf8"), context);
  assert.deepEqual(Object.keys(window.AI103_CASE_CONTEXT).map(Number), [101, 102, 103, 104, 105, 106, 107]);
  const expectedSignals = {
    101: ["EU", "không đặt trước throughput", "phiên bản model"],
    102: ["ảnh", "chỉ dẫn độc hại"],
    103: ["relevant", "complete", "accurate"],
    104: ["chỉ", "Contoso"],
    105: ["bảng", "logo", "hình ảnh", "văn bản"],
    106: ["PDF", "semantic search", "vector search"],
    107: ["Blob Storage", "semantic search", "vector search"]
  };
  for (const [id, signals] of Object.entries(expectedSignals)) {
    for (const signal of signals) assert.match(window.AI103_CASE_CONTEXT[id], new RegExp(signal, "i"), `Q${id} missing ${signal}`);
  }
});
