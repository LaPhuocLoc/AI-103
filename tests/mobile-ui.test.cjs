const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync(require.resolve("../index.html"), "utf8");
const css = fs.readFileSync(require.resolve("../styles.css"), "utf8");
const app = fs.readFileSync(require.resolve("../app.js"), "utf8");

test("mobile sidebar exposes close and backdrop controls", () => {
  assert.match(html, /id="sidebarClose"/);
  assert.match(html, /id="sidebarBackdrop"/);
  assert.match(app, /sidebarClose/);
  assert.match(app, /sidebarBackdrop/);
});

test("mobile breakpoint keeps the exam mode selector visible", () => {
  assert.doesNotMatch(css, /\.topbar \.eyebrow,\s*\.mode-switch\s*\{\s*display:\s*none/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*\.mode-switch\s*\{\s*display:\s*block/);
});
