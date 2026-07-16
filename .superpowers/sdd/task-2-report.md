# Task 2 report: Curate and validate interactive question data

## Status

Implemented `window.AI103_MATCHING` for every interactive/no-choice record in the 107-question AI-103 extraction and added the prescribed data-integrity tests. `window.AI103_QUESTIONS` was not modified.

## Reviewed question IDs

The exact reviewed interactive ID list is:

`3, 6, 9, 10, 13, 16, 19, 23, 26, 29, 33, 36, 43, 46, 49, 53, 56, 59, 63, 66, 69, 73, 76, 79, 83, 86, 89, 93, 101`

The exact drag-enabled subset for the later `app.js` integration is:

`6, 16, 26, 36, 46, 56, 66, 76, 86`

The remaining reviewed IDs use dropdown, Yes/No table, or other table-style response controls.

## Source-page inspection method

1. Loaded `questions.js` in a Node VM and identified all records with no extracted A-H choice list, then cross-checked wording for drag, Yes/No, table, code-completion, and dropdown controls.
2. Confirmed that this produced a finite 29-ID candidate set.
3. Used the bundled Poppler executables from `C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin`.
4. Rendered every listed source page at 140 DPI with `pdftoppm.exe -png -singlefile` into `tmp/pdfs/`. This produced 67 PNG page renders.
5. Inspected the original-resolution PNGs visually, reading the visible prompt labels, complete option banks, and the green-highlighted answers in the answer panels. Explanation text in `questions.js` was used only as a cross-check; answers were not invented from incomplete extraction.
6. Removed the temporary render directory after review.

Pages reviewed by question:

- Q3: 3-5; Q6: 7-8; Q9: 10-12; Q10: 12-13; Q13: 15-16; Q16: 18-20
- Q19: 21-23; Q23: 26-28; Q26: 29-30; Q29: 32-34; Q33: 36-38; Q36: 40-41
- Q43: 45-46; Q46: 48-49; Q49: 51-52; Q53: 55-56; Q56: 58-59; Q59: 61-62
- Q63: 65-67; Q66: 68-69; Q69: 72-73; Q73: 76-77; Q76: 79-80; Q79: 82-83
- Q83: 86-87; Q86: 89-90; Q89: 92-93; Q93: 96-97; Q101: 106-108

## Mappings added

Each ID below now has an array of `{ prompt, options, correct }` groups. Correct mappings transcribed from the PDF are:

- Q3: prompt shields action -> Set action to block; additional mitigation -> Enable Spotlighting. The wording is the exact normalized Q3 contract required by the task brief.
- Q6: public web -> Grounding with Bing Search; calculations -> Code interpreter; uploaded documents -> File search.
- Q9: latest approved baseline; fail the workflow on regression.
- Q10: No; Yes; No for the three telemetry statements.
- Q13: `tool_choice` -> required; distinct agent identity bound to the client application.
- Q16: first blank -> `"tool_choice"`; second blank -> `"required"`.
- Q19: Groundedness evaluation; require the evaluation workflow to succeed before merging.
- Q23: Model Availability Rate and Provisioned Utilization; RequestResponse.
- Q26: Groundedness evaluation metrics; Risk and safety metrics.
- Q29: persistent agent memory; File search tool.
- Q33: `ask_question`; `approval == "approved"`.
- Q36: Pipeline1 -> single-file standard; Pipeline2 -> multi-file pro.
- Q43: `Not(IsBlank(Local.Var01))`; `{Upper(Local.Var01)}`.
- Q46: Pipeline1 -> single-file standard; Pipeline2 -> multi-file pro.
- Q49: Azure Login with OIDC; Fail.
- Q53: DefaultAzureCredential; `create`.
- Q56: Latency breakdown traces; Token usage analytics.
- Q59: system-assigned managed identity; Storage Blob Data Reader.
- Q63: block User input, Output, Tool response, and Tool call; system-assigned identity with Storage Blob Data Reader.
- Q66: Relevance Evaluation; Completion token analytics.
- Q69: Groundedness; reject responses below the groundedness threshold.
- Q73: persistent agent memory; File search tool.
- Q76: Code Interpreter; Computer Use; File Search.
- Q79: Code Interpreter Tool; Grounding with Bing Search.
- Q83: File Search Tool; Code Interpreter Tool.
- Q86: Grounding with Bing Search; File Search; Computer Use.
- Q89: Azure Login with OIDC; workload identity federation.
- Q93: temperature 0; output effort `"high"`.
- Q101: Standard deployment; opt out of automatic model version upgrades.

The complete visible option banks were transcribed into `matching-data.js` for each prompt, including distractors.

## TDD evidence

### RED

Command:

```powershell
node --test tests/question-data.test.cjs
```

Result before changing `matching-data.js`: exit code 1; 1 passed, 2 failed. The sequential-question test passed. The matching integrity test failed with `Cannot convert undefined or null to object`, and the grading-review test failed while reading `AI103_MATCHING[3]`. Both failures were caused by the old file exporting only `window.AB100_MATCHING`.

### GREEN

Command:

```powershell
node --test tests/question-data.test.cjs
```

Result after curation: exit code 0; 3 passed, 0 failed.

Additional key-set audit loaded both globals in a VM and compared all no-choice question IDs to `Object.keys(window.AI103_MATCHING)`: `match: true`, with the identical 29-ID list shown above.

## Files changed

- `matching-data.js`: replaced obsolete AB-100 mappings with 29 AI-103 interactive mappings.
- `tests/question-data.test.cjs`: added the three prescribed data-integrity tests.
- `.superpowers/sdd/task-2-report.md`: this implementation and verification report.

## Self-review

- Verified `questions.js` is untouched.
- Verified the matching global is exactly `window.AI103_MATCHING`.
- Verified every `correct` value occurs in its corresponding `options` array.
- Verified the matching key set exactly equals the 29 visually reviewed no-choice records.
- Verified ordinary extracted A-H questions are absent from `matching-data.js`.
- Verified the drag subset is limited to questions whose source explicitly instructs the user to drag values.
- Checked punctuation, capitalization, quotes, and product names against the rendered source controls. Q3 intentionally follows the exact normalized strings mandated by the brief.

## Concerns / handoff

- `app.js` still references `window.AB100_QUESTIONS`, `window.AB100_MATCHING`, and an obsolete AB-100 drag-ID set. Updating application integration is outside Task 2's declared files; the later app task must switch to `AI103_QUESTIONS`, `AI103_MATCHING`, and drag IDs `[6, 16, 26, 36, 46, 56, 66, 76, 86]`.
- The source PDF contains some inconsistent capitalization between equivalent tool names across questions (for example `Code interpreter` vs `Code Interpreter Tool`). The mappings retain each control's displayed text so grading matches the rendered options exactly.
