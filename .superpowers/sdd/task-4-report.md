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

## Quality-review follow-up: accessible and semantic Azure tokens

### Review fixes

- Kept the exact fill/action colors `--accent: #0078d4` and `--accent-strong: #005a9e`.
- Added `--accent-foreground: #6cb8f2` for dark-theme small text. Its measured contrast is 8.68:1 on `--paper`, 7.85:1 on `--card`, and 7.27:1 on `--surface`.
- Added a light-theme `--accent-foreground: #005a9e`, measuring 6.50:1 on `--paper` and 7.10:1 on white card/surface backgrounds.
- Routed eyebrows, question numbers, source links, answer source links, and sidebar accent text through the accessible foreground token.
- Added independent `--correct-*` and `--wrong-*` token families. Correct choices, matching options, drop zones, navigation states, and the answer panel remain green; wrong states remain red.
- Routed selected/active choices, matching options, progress, navigation, hover borders, drag chips/ghosts/glow, drop targets, and primary buttons through `--accent`, `--accent-strong`, `--accent-soft`, or `--accent-glow`.
- Removed the legacy `--green*`/`--button-green*` aliases and hard-coded green selection artifacts. The earlier concern about compatibility alias names is therefore resolved.

### Follow-up RED evidence

After strengthening `tests/mobile-ui.test.cjs`, before changing CSS, ran:

```powershell
node --test tests/mobile-ui.test.cjs
```

Result: 9 tests run, 6 passed, 3 failed.

- `small accent text has WCAG AA contrast in both themes` failed because `--accent-foreground` did not exist.
- `Azure selection tokens are separate from correctness tokens` failed because `--accent-soft`, `--accent-glow`, and explicit `--correct-*` tokens did not exist.
- `selected progress hover and drag states route through Azure tokens` failed because progress and several hover/selection/drag rules still used legacy hard-coded green values or `--green*` aliases.

The strengthened AI-103 metadata, exact Azure fill tokens, both PDF links, theme key, brand mark/name, default count, exact DOM ID list, UTF-8 copy, drawer controls, and breakpoint tests passed during RED.

### Follow-up GREEN evidence

Targeted command:

```powershell
node --test tests/mobile-ui.test.cjs
```

Result: 9 tests passed, 0 failed.

Full repository command:

```powershell
node --test tests/*.test.cjs
```

Result: 19 tests passed, 0 failed.

Additional checks:

- `git diff --check` passed.
- The exact 39-element DOM ID contract passes in the test suite.
- `rg` found no `var(--green*)`, `#8fd4ad`, `#9bb7a8`, legacy green drag glow, or legacy answered-green selection artifacts in `styles.css`.
- The `900px` and `620px` media queries and all drawer/touch behavior rules are unchanged.

### Follow-up concerns

- No new implementation concerns. `AB-100` remains only in intentional negative/collision test fixtures, as documented above.

## Contrast re-review follow-up

### Fixes

- Added `--sidebar-accent-foreground: #8bcdf8` in both themes and routed `.sidebar .eyebrow`, `.sidebar .text-button`, and `.sidebar .source-link` through it.
- The sidebar foreground measures 9.79:1 against the dark sidebar (`#0b2118`) and 6.98:1 against the light-theme sidebar (`#173d2f`).
- Added distinct `--wrong-nav-fill` and `--wrong-nav-ink` tokens while retaining `--wrong-border` as the semantic red border.
- Dark wrong navigation uses white on `#8f3f39` at 7.15:1; light wrong navigation uses white on `#9f362f` at 6.90:1.

### Re-review RED evidence

After adding the two actual foreground/background contrast contracts, before changing CSS, ran:

```powershell
node --test tests/mobile-ui.test.cjs
```

Result: 11 tests run, 9 passed, 2 failed.

- `sidebar accent text has WCAG AA contrast in both themes` failed because the dedicated sidebar foreground token was absent.
- `wrong navigation state has WCAG AA contrast in both themes` failed because the wrong-navigation fill/ink token pair was absent.

### Re-review GREEN evidence

Targeted command:

```powershell
node --test tests/mobile-ui.test.cjs
```

Result: 11 tests passed, 0 failed.

Full repository command:

```powershell
node --test tests/*.test.cjs
```

Result: 21 tests passed, 0 failed.

`git diff --check` also passed. No IDs, breakpoints, touch targets, drawer rules, or JavaScript behavior changed.

### Re-review concerns

- None. All four newly measured theme-specific contrast pairs exceed 4.5:1.
