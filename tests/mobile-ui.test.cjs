const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync(require.resolve("../index.html"), "utf8");
const css = fs.readFileSync(require.resolve("../styles.css"), "utf8");
const app = fs.readFileSync(require.resolve("../app.js"), "utf8");

const REQUIRED_IDS = [
  "sidebar", "sidebarClose", "timer", "timerToggle", "progressText", "progressBar",
  "scoreText", "syncStatus", "exportProgress", "loadProgress", "clearProgress",
  "questionGrid", "sidebarBackdrop", "menuButton", "themeToggle", "modeSelect",
  "finishButton", "questionCard", "questionNumber", "typePill", "tipButton", "flagButton",
  "caseContext", "questionStem", "tipPanel", "tipKeywords", "tipAnswer", "tipMnemonic", "tipTraps",
  "tipUltraShort", "choices", "manualNote", "prevButton", "checkButton", "nextButton",
  "answerCard", "answerStatus", "pageLink", "correctAnswer", "explanationText",
  "resultDialog", "dialogClose", "resultTitle", "resultScore", "resultCopy",
  "reviewWrong", "continueButton",
];

function tokensFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
  assert.ok(block, `missing ${selector} token block`);
  return Object.fromEntries(
    [...block[1].matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [match[1], match[2]])
  );
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

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

test("question navigation includes visible state-marker styling", () => {
  assert.match(css, /\.nav-state-marker/);
  assert.match(css, /\.nav-item\.active[^}]*outline/);
  assert.match(css, /\.nav-item\.incomplete[^}]*border-style:\s*dashed/);
});

test("document is branded and linked for AI-103 only", () => {
  assert.match(html, /<title>AI-103 Mock Exam<\/title>/);
  assert.match(html, /Azure AI Apps and Agents Developer Associate/);
  assert.match(html, /class="brand-mark">AI<\/div>\s*<div><strong>AI-103<\/strong>/);
  assert.match(html, /id="progressText">0 \/ 107<\/strong>/);
  assert.match(html, /localStorage\.getItem\('ai103-theme'\)/);
  assert.match(html, /href="AI-103\.pdf"/);
  assert.match(html, /id="pageLink" href="AI-103\.pdf#page=2"/);
  assert.doesNotMatch(html, /AB-100/);
});

test("AI-103 Azure accent fill tokens are exact", () => {
  assert.match(css, /--accent:\s*#0078d4/);
  assert.match(css, /--accent-strong:\s*#005a9e/);
});

test("document preserves the exact application DOM ID contract", () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, REQUIRED_IDS);
});

test("question card exposes an accessible tip control and structured tip panel", () => {
  assert.match(html, /id="tipButton"[^>]*aria-expanded="false"[^>]*aria-controls="tipPanel"/);
  assert.match(html, /id="tipPanel"[^>]*hidden/);
  for (const id of ["tipKeywords", "tipAnswer", "tipMnemonic", "tipTraps", "tipUltraShort"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /<script src="tips-batches\/tips-1-36\.js\?v=2"><\/script>/);
  assert.match(html, /<script src="tips-batches\/tips-37-72\.js\?v=2"><\/script>/);
  assert.match(html, /<script src="tips-batches\/tips-73-107\.js\?v=2"><\/script>/);
  assert.match(html, /<script src="tips\.js\?v=2"><\/script>\s*<script src="app\.js\?v=5"><\/script>/);
});

test("question card can display restored case-study context before the stem", () => {
  assert.match(html, /id="caseContext"[^>]*hidden/);
  assert.match(html, /<script src="case-study-data\.js\?v=1"><\/script>/);
  assert.match(app, /AI103_CASE_CONTEXT/);
});

test("tip colors meet WCAG AA contrast in both themes", () => {
  for (const tokens of [tokensFor(":root"), tokensFor(':root[data-theme="light"]')]) {
    assert.ok(contrastRatio(tokens["--tip-foreground"], tokens["--tip-surface"]) >= 4.5);
    assert.ok(contrastRatio(tokens["--tip-muted"], tokens["--tip-surface"]) >= 4.5);
  }
  assert.match(css, /\.tip-panel\s*\{[^}]*background:\s*var\(--tip-surface\)[^}]*border:\s*1px solid var\(--tip-border\)/);
});

test("tip components use the exact cool Azure blue palette", () => {
  const tipKeys = ["--tip-surface", "--tip-border", "--tip-foreground", "--tip-muted"];
  assert.deepEqual(
    Object.fromEntries(tipKeys.map((key) => [key, tokensFor(":root")[key]])),
    {
      "--tip-surface": "#0b2538",
      "--tip-border": "#3aaee8",
      "--tip-foreground": "#d9f3ff",
      "--tip-muted": "#a9d3e8"
    }
  );
  assert.deepEqual(
    Object.fromEntries(tipKeys.map((key) => [key, tokensFor(':root[data-theme="light"]')[key]])),
    {
      "--tip-surface": "#eaf7ff",
      "--tip-border": "#2583b8",
      "--tip-foreground": "#103b55",
      "--tip-muted": "#315f78"
    }
  );
  assert.match(html, /styles\.css\?v=6/);
});

test("small accent text has WCAG AA contrast in both themes", () => {
  const dark = tokensFor(":root");
  const light = tokensFor(':root[data-theme="light"]');
  assert.match(dark["--accent-foreground"] || "", /^#[\da-f]{6}$/i);
  assert.match(light["--accent-foreground"] || "", /^#[\da-f]{6}$/i);

  for (const surface of ["--paper", "--card", "--surface"]) {
    assert.ok(
      contrastRatio(dark["--accent-foreground"], dark[surface]) >= 4.5,
      `dark accent foreground must be >= 4.5:1 against ${surface}`
    );
    assert.ok(
      contrastRatio(light["--accent-foreground"], light[surface]) >= 4.5,
      `light accent foreground must be >= 4.5:1 against ${surface}`
    );
  }

  for (const selector of [".eyebrow", ".question-number", ".answer-heading a"]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(css, new RegExp(`${escaped}\\s*\\{[^}]*color:\\s*var\\(--accent-foreground\\)`));
  }
});

test("sidebar accent text has WCAG AA contrast in both themes", () => {
  const dark = tokensFor(":root");
  const light = tokensFor(':root[data-theme="light"]');

  for (const tokens of [dark, light]) {
    assert.match(tokens["--sidebar-accent-foreground"] || "", /^#[\da-f]{6}$/i);
    assert.ok(
      contrastRatio(tokens["--sidebar-accent-foreground"], tokens["--sidebar"]) >= 4.5,
      "sidebar accent foreground must be >= 4.5:1 against the sidebar background"
    );
  }

  for (const selector of [".sidebar .eyebrow", ".sidebar .text-button", ".sidebar .source-link"]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(css, new RegExp(`${escaped}\\s*\\{[^}]*color:\\s*var\\(--sidebar-accent-foreground\\)`));
  }
});

test("wrong navigation state has WCAG AA contrast in both themes", () => {
  const dark = tokensFor(":root");
  const light = tokensFor(':root[data-theme="light"]');

  for (const tokens of [dark, light]) {
    assert.match(tokens["--wrong-nav-fill"] || "", /^#[\da-f]{6}$/i);
    assert.match(tokens["--wrong-nav-ink"] || "", /^#[\da-f]{6}$/i);
    assert.ok(
      contrastRatio(tokens["--wrong-nav-ink"], tokens["--wrong-nav-fill"]) >= 4.5,
      "wrong navigation ink must be >= 4.5:1 against its fill"
    );
  }

  assert.match(css, /\.nav-item\.wrong\s*\{[^}]*background:\s*var\(--wrong-nav-fill\)[^}]*border-color:\s*var\(--wrong-border\)[^}]*color:\s*var\(--wrong-nav-ink\)/);
});

test("Azure selection tokens are separate from correctness tokens", () => {
  const dark = tokensFor(":root");
  assert.ok(dark["--accent-soft"]);
  assert.match(css, /--accent-glow:\s*rgba\(/);
  assert.ok(dark["--correct-ink"]);
  assert.ok(dark["--correct-border"]);
  assert.ok(dark["--correct-soft"]);
  assert.notEqual(dark["--accent-foreground"], dark["--correct-ink"]);

  assert.match(css, /\.choice\.correct\s*\{[^}]*border-color:\s*var\(--correct-border\)[^}]*background:\s*var\(--correct-soft\)/);
  assert.match(css, /\.match-option\.correct\s*\{[^}]*color:\s*var\(--correct-ink\)/);
  assert.match(css, /\.drop-zone\.correct\s*\{[^}]*color:\s*var\(--correct-ink\)/);
  assert.match(css, /\.nav-item\.correct\s*\{[^}]*var\(--correct-border\)/);
  assert.match(css, /\.nav-item\.wrong\s*\{[^}]*var\(--wrong-border\)/);
  assert.match(css, /\.correct-answer\s*\{[^}]*background:\s*var\(--correct-soft\)[^}]*color:\s*var\(--correct-ink\)/);
});

test("selected progress hover and drag states route through Azure tokens", () => {
  assert.match(css, /\.progress-track span\s*\{[^}]*background:\s*var\(--accent\)/);
  assert.match(css, /\.nav-item:hover, \.nav-item\.active\s*\{[^}]*background:\s*var\(--accent\)/);
  assert.match(css, /\.choice\.selected\s*\{[^}]*border-color:\s*var\(--accent\)[^}]*background:\s*var\(--accent-soft\)/);
  assert.match(css, /\.match-option\.selected\s*\{[^}]*border-color:\s*var\(--accent\)[^}]*background:\s*var\(--accent-soft\)/);
  assert.match(css, /\.drag-chip\.active, \.drag-chip\.dragging\s*\{[^}]*box-shadow:\s*0 0 0 2px var\(--accent-glow\)/);
  assert.match(css, /\.drop-zone:hover, \.drop-zone\.drag-over\s*\{[^}]*border-color:\s*var\(--accent\)[^}]*background:\s*var\(--accent-soft\)/);
  assert.doesNotMatch(css, /var\(--green(?:-dark|-soft)?\)|#8fd4ad|#9bb7a8|rgba\(120,\s*189,\s*152/);
});

test("user-facing Vietnamese HTML copy is valid UTF-8", () => {
  assert.match(html, /107 câu hỏi luyện thi/);
  assert.match(html, /Đóng danh sách câu hỏi/);
  assert.doesNotMatch(html, /Ã|Ä|Æ|á»|â†|â˜/);
});
