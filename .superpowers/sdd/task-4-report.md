# Task 4 report: AI-103 branding and Azure visual tokens

## Status

Converted the static document metadata, visible certification identity, progress default, theme bootstrap key, and both PDF links from AB-100 to AI-103. Added Azure primary accent tokens and routed the existing primary accent/button aliases through them without changing DOM IDs, layout selectors, responsive breakpoints, or interaction behavior.

## RED evidence

After adding the branding, token, and UTF-8 regression tests, ran:

```powershell
node --test tests/mobile-ui.test.cjs
```

Result before changing `index.html` or `styles.css`: 5 tests run, 2 passed, 3 failed.

- `document is branded and linked for AI-103 only` failed because the title, heading, links, and visible brand still used AB-100.
- `AI-103 Azure accent token is defined` failed because `--accent: #0078d4` was absent.
- `user-facing Vietnamese HTML copy is valid UTF-8` failed because the metadata still described 106 questions instead of the required valid UTF-8 `107 câu hỏi luyện thi` copy.

The two pre-existing mobile sidebar/breakpoint tests passed during RED.

## GREEN evidence

Targeted command:

```powershell
node --test tests/mobile-ui.test.cjs
```

Result: 5 tests passed, 0 failed.

Full repository command:

```powershell
node --test tests/*.test.cjs
```

Result: 15 tests passed, 0 failed.

Additional audits:

- `git diff --check` passed.
- Current and `HEAD` DOM ID sets compare equal.
- Responsive breakpoints remain `900px` and `620px`.
- A mojibake scan of `index.html`, `app.js`, and tests found no suspicious sequences outside the regression test's own negative pattern.

## Files changed

- `index.html`
- `styles.css`
- `tests/mobile-ui.test.cjs`
- `.superpowers/sdd/task-4-report.md`

## Changed copy and contracts

- Description: `AI-103 mock exam - 107 câu hỏi luyện thi Azure AI Apps and Agents Developer Associate.`
- Title: `AI-103 Mock Exam`
- Theme bootstrap key: `ai103-theme`
- Brand mark/name: `AI` / `AI-103`
- Heading: `Azure AI Apps and Agents Developer Associate`
- Default progress: `0 / 107`
- Static PDF links: `AI-103.pdf` and `AI-103.pdf#page=2`
- Existing Vietnamese controls and accessibility labels remain valid UTF-8.

## Changed visual tokens

- `--accent: #0078d4`
- `--accent-strong: #005a9e`
- Existing primary `--green` and button aliases now resolve through the Azure tokens.
- The light-theme accent-soft surface was changed to `#e5f1fb` so selected content retains an Azure tint and dark text contrast.
- Correct/wrong/warning semantic colors remain distinct; layout, focus/touch rules, drawer behavior, and breakpoints were not rewritten.

## Self-review

- No element ID was added, removed, or renamed.
- No JavaScript behavior was changed.
- Both source links now use the AI-103 PDF.
- The HTML contains no `AB-100` branding or legacy `ab100-theme` literal.
- The CSS diff is limited to token declarations/aliases; media queries and component rules are unchanged.
- Tests cover AI-103-only branding, Azure accent presence, mobile contracts, and valid UTF-8 Vietnamese HTML copy.

## Concerns

- `AB-100` remains in test-only negative/collision fixtures (`question-data.test.cjs`, `retry-mode.test.cjs`, and the new branding rejection assertion). These references intentionally protect AI-103 state and branding isolation and are not user-visible or runtime literals.
- The pre-existing semantic variable names such as `--green` were retained as compatibility aliases to minimize CSS churn; their primary accent value now resolves to Azure blue.
