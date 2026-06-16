# Changelog

All notable changes to the **AI Setup Sync** extension are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-06-16

Initial release.

### Features

- **Automatic sync** — pulls on project open and re-checks daily in the background.
- **Multi-tool support** — Claude Code, GitHub Copilot, Cursor, Google Antigravity 2.0, OpenAI Codex, and any custom paths via `aiSetupSync.targetFolders`.
- **Conflict resolution** — detects local edits and prompts per file with a built-in diff viewer before overwriting. Configurable via `aiSetupSync.conflictPolicy` (`prompt` / `overwrite` / `skip`).
- **Path mappings** — translate repo folder names to the local paths AI tools expect (e.g. `Claude/` → `.claude/`).
- **Configurable branch** — sync from `main`, `master`, or any branch via `aiSetupSync.branch`.
- **Private & SSO repos** — GitHub personal access token stored securely in the OS keychain via VS Code SecretStorage. SAML SSO org repos supported.
- **Git exclude** — synced files are added to `.git/info/exclude` automatically so they never appear as pending changes.
- **Non-destructive** — files removed from the repo are never deleted from disk; local edits are always preserved on removal.
- **ETag/304 caching** — background checks don't consume GitHub API rate-limit quota when nothing has changed.
