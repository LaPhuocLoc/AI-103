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

test("document is branded and linked for AI-103 only", () => {
  assert.match(html, /<title>AI-103 Mock Exam<\/title>/);
  assert.match(html, /Azure AI Apps and Agents Developer Associate/);
  assert.match(html, /href="AI-103\.pdf"/);
  assert.doesNotMatch(html, /AB-100/);
});

test("AI-103 Azure accent token is defined", () => {
  assert.match(css, /--accent:\s*#0078d4/);
});

test("user-facing Vietnamese HTML copy is valid UTF-8", () => {
  assert.match(html, /107 câu hỏi luyện thi/);
  assert.match(html, /Đóng danh sách câu hỏi/);
  assert.doesNotMatch(html, /Ã|Ä|Æ|á»|â†|â˜/);
});
