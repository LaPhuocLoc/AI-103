# Local State Auto-Sync Design

## Goal

Reduce the AI-103 progress publishing workflow to one action in the web page: the learner clicks **Xuất file state**, and a local background tool validates, commits, and pushes the exported state automatically.

The first-time installation may require one explicit setup action. Normal daily use must not require opening a terminal or running Git commands.

## Constraints and assumptions

- The deployed application is `https://laphuocloc.github.io/AI-103/`.
- Progress lives in browser `localStorage` under `ai103-mock-state-v1`; an ordinary HTTP download of the page cannot read that browser-specific value.
- The existing export button downloads a JSON snapshot. That download is the handoff boundary between the browser and the local tool.
- The repository is `C:\Users\Admin\Documents\AB-100` and the publication remote is `ai103`, branch `main`.
- The tool must never add unrelated files such as `tmp/` to a commit.
- Git authentication continues to use the user's existing Git credential configuration. No GitHub token is stored in the website or script.

## Considered approaches

### 1. Downloads watcher (selected)

A PowerShell process watches the user's Downloads directory for newly completed AI-103 state exports. It validates and publishes only the canonical state file.

Advantages: works with the browser profile already holding progress, avoids browser automation, needs no cloud backend, and leaves credentials with Git Credential Manager.

Trade-off: a small background process must start with Windows. A one-time installer creates that startup entry.

### 2. Browser automation

A local tool opens the site and reads `localStorage` through Chromium DevTools or Playwright.

Rejected because the state belongs to a particular browser profile, profiles can be locked, remote-debugging configuration varies by browser, and a dedicated automation profile would not automatically contain the learner's current progress.

### 3. Direct GitHub API from the page

The page updates the repository with a fine-grained token.

Rejected for this personal workflow because it puts a write credential in browser storage or requires a server-side authentication service.

## Architecture

The feature consists of three small units:

1. `tools/sync-ai103-state.ps1` is the long-running watcher and publisher.
2. `install-sync.bat` performs one-time startup registration and starts the watcher immediately.
3. `uninstall-sync.bat` removes the startup registration and stops only this watcher.

The existing web export remains the source of truth. The watcher does not scrape the page and does not read browser files directly.

## Data flow

1. The learner answers questions; the page saves progress to `localStorage`.
2. The learner clicks **Xuất file state**.
3. The browser finishes downloading `ai103-progress-state.json` or a collision-suffixed variant such as `ai103-progress-state (1).json`.
4. The watcher waits until the file is stable and readable.
5. It parses the JSON and validates the expected AI-103 state shape before touching the repository.
6. It writes the validated content to the repository's canonical `ai103-progress-state.json` using an atomic temporary-file replacement.
7. It stages exactly that canonical path with `git add -- ai103-progress-state.json`.
8. If the staged file is unchanged, it records “no changes” and does not create a commit.
9. Otherwise it commits with a deterministic message containing the local timestamp, then pushes `HEAD:main` to remote `ai103`.
10. It records success or failure in a local UTF-8 log and displays a Windows notification when available.

The downloaded source file is moved into a tool-owned processed directory only after validation, preventing the same export from being processed twice while preserving a recovery copy.

## Safety and concurrency

- Accept only names matching the canonical AI-103 state export pattern; ignore partial downloads such as `.crdownload` and `.tmp`.
- Reject invalid JSON, empty files, oversized files, or payloads missing required state fields.
- Resolve and verify the repository path before running Git.
- Stage and commit only `ai103-progress-state.json`; never use `git add .`.
- Serialize processing so two rapid exports cannot run concurrent Git operations.
- Before pushing, fetch remote `ai103/main`. If the remote moved, rebase the single local state commit. On a conflict, abort the rebase, preserve both state files for recovery, report the error, and do not force-push.
- Never delete or reset unrelated working-tree changes.
- Do not force-push under any condition.

## Installation and lifecycle

`install-sync.bat` launches PowerShell with the current repository path, creates a per-user Startup shortcut or scheduled logon task, and starts the watcher. It does not require administrator privileges.

The watcher enforces a single-instance lock. Re-running the installer updates the startup command and reuses or restarts the existing instance safely.

`uninstall-sync.bat` removes only the registration created by this project and stops only the matching watcher process. It leaves the repository, exported files, commits, and Git credentials untouched.

## User experience

README instructions will describe:

- one-time setup: double-click `install-sync.bat`;
- normal use: click **Xuất file state** on AI-103;
- confirmation: inspect the notification or `tools/logs/ai103-state-sync.log`;
- recovery: run the watcher interactively to see detailed errors;
- removal: double-click `uninstall-sync.bat`.

The export button text may be changed to **Xuất & đồng bộ state** with nearby text explaining that automatic Git publishing occurs only when the local watcher is installed.

## Testing

Automated PowerShell tests will cover filename filtering, stable-file detection, JSON validation, duplicate/no-change handling, exact-path staging, and failure behavior. Git integration tests will use temporary local bare repositories so they cannot affect the real remote.

A final manual verification will export a known state, observe exactly one commit affecting only `ai103-progress-state.json`, confirm the push reaches `ai103/main`, and verify the GitHub Pages URL serves the same JSON after deployment.

## Success criteria

- After one-time setup, one click on the page publishes the current browser state.
- No GitHub token or repository credential is added to tracked files or browser storage.
- Each valid changed export produces at most one commit.
- Invalid, duplicate, or conflicting exports never cause a force-push or an unrelated commit.
- Existing unrelated working-tree files and changes remain untouched.
