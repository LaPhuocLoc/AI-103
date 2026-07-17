# Cool Tip Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the amber tip colors with an accessible Azure blue/cyan palette in both themes.

**Architecture:** Keep the current component styling and replace only the four shared `--tip-*` design tokens. Extend the existing static CSS contract test to require the exact cool palette and bump the stylesheet cache key.

**Tech Stack:** Static HTML/CSS, Node.js built-in test runner.

## Global Constraints

- Preserve all tip content, DOM structure, spacing, and behavior.
- Primary and muted tip text must each have at least 4.5:1 contrast against the tip surface in dark and light themes.
- The four old amber token values must not remain.

---

### Task 1: Cool accessible tip palette

**Files:**
- Modify: `tests/mobile-ui.test.cjs`
- Modify: `styles.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: existing `--tip-surface`, `--tip-border`, `--tip-foreground`, and `--tip-muted` CSS tokens.
- Produces: the same token interface with cool-color values; no consumer changes.

- [ ] **Step 1: Write the failing exact-palette test**

Add assertions that dark mode uses `#0b2538`, `#3aaee8`, `#d9f3ff`, `#a9d3e8`; light mode uses `#eaf7ff`, `#2583b8`, `#103b55`, `#315f78`; and `index.html` loads `styles.css?v=5`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/mobile-ui.test.cjs`

Expected: FAIL because the current amber tokens and `styles.css?v=4` do not match.

- [ ] **Step 3: Implement the minimal palette change**

Replace the four tokens in both theme blocks with the exact values above and change the stylesheet URL to `styles.css?v=5`.

- [ ] **Step 4: Run focused and full verification**

Run: `node --test tests/mobile-ui.test.cjs`

Expected: all focused tests pass, including the existing calculated WCAG contrast checks.

Run: `node --test tests/case-study-context.test.cjs tests/mobile-ui.test.cjs tests/question-data.test.cjs tests/retry-mode.test.cjs tests/tips-data.test.cjs`

Expected: 50 tests pass, 0 fail.

- [ ] **Step 5: Commit and deploy**

```bash
git add styles.css index.html tests/mobile-ui.test.cjs docs/superpowers/plans/2026-07-17-cool-tip-palette.md
git commit -m "style: use cool palette for learning tips"
git push ai103 main
```
