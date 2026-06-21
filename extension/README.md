# AI Setup Sync

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue.png)](https://marketplace.visualstudio.com/items?itemName=olekpuchka.ai-setup-sync)
[![Version](https://img.shields.io/github/v/release/olekpuchka/ai-setup-sync.png?label=version)](https://github.com/olekpuchka/ai-setup-sync/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.png)](https://github.com/olekpuchka/ai-setup-sync/blob/main/LICENSE)

**One repo. Every project. Always in sync.**

AI Setup Sync keeps your AI configuration — for Claude Code, GitHub Copilot, Cursor,
Google Antigravity, Gemini CLI, OpenAI Codex, and more — identical across every project,
automatically. Maintain it once in a GitHub repository; every developer's projects stay current
on their own.

No more copy-pasting `CLAUDE.md` between repos, or wondering whose Cursor rules are out of date.
Treat your AI setup like shared code: change it in one place, and it propagates everywhere.

---

## Contents

- [How it works](#how-it-works)
- [Features](#features)
- [Quick start](#quick-start)
- [Setting up your repository](#setting-up-your-repository)
- [Default synced paths](#default-synced-paths)
- [Settings](#settings)
- [Path mappings & multi-project repos](#path-mappings--multi-project-repos)
- [Conflict handling](#conflict-handling)
- [Status bar](#status-bar)
- [Commands](#commands)
- [How files stay out of git](#how-files-stay-out-of-git)
- [Removing synced files](#removing-synced-files)
- [FAQ](#faq)

---

## How it works

1. **Maintain one repository.** Put your shared AI config files in a GitHub repo — `.claude/`,
   `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, and so on.
2. **Point every project at it.** Each developer installs the extension and sets one setting:
   the repository URL.
3. **Files sync automatically.** On project open and whenever you return focus to the window, the
   extension pulls the latest files into each project.

Sync flows one way: **repo → projects**. Developers can still edit files locally — the extension
detects those edits and lets them choose what to keep, so no work is ever silently overwritten.

> **Before you start** — you'll need a GitHub repository containing your shared AI setup files.
> See [Setting up your repository](#setting-up-your-repository).

## Features

- **Automatic sync** — pulls on project open and when you return focus to the window. No manual steps.
- **Multi-tool support** — Claude Code, GitHub Copilot, Cursor, Google Antigravity, Gemini CLI, OpenAI Codex, and any custom path.
- **Conflict resolution** — detects local edits and prompts per file, with a built-in diff viewer before anything is overwritten.
- **Path mappings** — translate any repo path to the local path a tool expects (e.g. `Claude/` → `.claude/`, or `PlatformA/.claude/` → `.claude/`).
- **Safe deletions** — files removed from the repo are removed locally too; your local edits are protected, and emptied directories are cleaned up.
- **Stays out of git** — synced files are added to `.git/info/exclude`, so they never clutter your pending changes.
- **Private & SSO repos** — GitHub token stored securely in the OS keychain (VS Code SecretStorage).
- **Configurable** — choose the branch, which folders to sync, and how conflicts resolve.

## Quick start

1. Install **AI Setup Sync** from the VS Code Marketplace (or the Install button on this page).
2. Set `aiSetupSync.repository` to your GitHub repository URL in VS Code **user** settings.
3. Open a project — sync runs automatically.

That's it for public repos. For private or SSO-protected repos, add a token (see below).

## Setting up your repository

The extension syncs from any GitHub repository you own.

**1. Create a repository** and add your setup files on your default branch (`main` or `master`).
Any combination of tools works — just place files where each tool expects them.

```
your-setup-repo/
├── CLAUDE.md                          # Claude Code root instructions
├── AGENTS.md                          # Cross-tool instructions (Antigravity, Cursor, Claude Code)
├── .claude/
│   ├── instructions/
│   │   └── coding-style.md
│   └── skills/
│       └── code-review/
│           └── SKILL.md
├── .github/
│   └── copilot-instructions.md        # GitHub Copilot instructions
├── .cursor/
│   └── rules/
│       └── coding-style.mdc           # Cursor rules
├── .agents/
│   └── skills/
│       └── code-review.md             # Google Antigravity skills
├── .gemini/
│   └── settings.json                  # Gemini CLI config
├── GEMINI.md                          # Gemini CLI workspace context
└── .codex/
    └── config.toml                    # OpenAI Codex config
```

**2. Point the extension at it** — set `aiSetupSync.repository` to your repository URL in VS Code
**user** settings.

**3. Map paths if needed.** If your repo organises files under different names (e.g. `Claude/`
instead of `.claude/`), configure `aiSetupSync.pathMappings` — keys are repo paths, values are
local destinations:

```json
"aiSetupSync.pathMappings": {
  "Claude":  ".claude",
  "Copilot": ".github",
  "Cursor":  ".cursor",
  "Codex":   ".codex"
}
```

`Claude/instructions/style.md` then syncs to `.claude/instructions/style.md`, and so on.

**4. Add a token for private or SSO repos.** Run **AI Setup Sync: Set GitHub Token** from the
command palette. [Create a **classic** personal access token](https://github.com/settings/tokens/new)
with the **`repo`** scope (fine-grained tokens don't support this scope). For SAML SSO orgs, also
authorize it for your org (*Settings → Personal access tokens → Configure SSO → Authorize*).

**5. Set the branch if it isn't `main`** — set `aiSetupSync.branch` to match (e.g. `master`).

**6. Push and you're done.** Every project picks up the change the next time it's opened or refocused.

> **Shared vs project-specific files:** Add shared instructions to the central repo and open a PR —
> on merge they sync to every project. Keep project-specific files in your project repo; the
> extension only touches files it synced and leaves everything else alone.

## Default synced paths

By default, the extension syncs these paths from the `main` branch (configurable via
`aiSetupSync.branch`). `.cursorrules` is not included — use `.cursor/rules/` instead.

| Path | Tool |
| --- | --- |
| `.claude` | Claude Code |
| `CLAUDE.md` | Claude Code |
| `.github` | GitHub Copilot |
| `.cursor` | Cursor |
| `.agents` | Google Antigravity |
| `AGENTS.md` | Google Antigravity (also read by Cursor and Claude Code) |
| `.gemini` | Gemini CLI |
| `GEMINI.md` | Gemini CLI |
| `.codex` | OpenAI Codex |

Configure via `aiSetupSync.targetFolders` — toggle defaults on or off, or add custom paths.

## Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `aiSetupSync.repository` | *(required)* | GitHub repository URL to sync from, e.g. `https://github.com/your-org/your-repo`. Private and SAML SSO org repos require a **classic** PAT with the **`repo`** scope — run **Set GitHub Token** from the command palette. |
| `aiSetupSync.branch` | `main` | Branch to sync from. Set to `master` or any other branch if your repo uses a different default. |
| `aiSetupSync.targetFolders` | *(see above)* | Files and folders to sync from the repo root. Each entry can be toggled on or off — set to `false` to disable a default without removing it. Add entries for any tool that reads config from your project. |
| `aiSetupSync.pathMappings` | `{}` | Rename paths as files sync from the repo to your project. `"Claude": ".claude"` rewrites `Claude/instructions/style.md` → `.claude/instructions/style.md`. More specific (longer) keys win. |
| `aiSetupSync.conflictPolicy` | `prompt` | What to do when a local file differs from the repo version. `prompt` — ask per file, with a *Show diff* button. `overwrite` — always replace. `skip` — never touch local edits. |

## Path mappings & multi-project repos

If your repo organises setup files under per-project subfolders (e.g. `Project1/`, `Project2/`) or
per-platform subfolders (e.g. `PlatformA/`, `PlatformB/`), use `pathMappings` to pull only from the
subfolder that matches the current project.

**Example repo layout:**

```
your-setup-repo/
├── PlatformA/
│   ├── .claude/
│   ├── CLAUDE.md
│   └── .github/
└── PlatformB/
    ├── .claude/
    ├── CLAUDE.md
    └── .github/
```

**Fetching `.claude` and `CLAUDE.md` from PlatformA:**

```json
"aiSetupSync.pathMappings": {
  "PlatformA/.claude": ".claude",
  "PlatformA/CLAUDE.md": "CLAUDE.md"
}
```

Mapping keys can be any repo path, not just top-level folders. In this example:

- `PlatformA/.claude/` and everything inside → `.claude/` locally
- `PlatformA/CLAUDE.md` → `CLAUDE.md` locally
- `PlatformA/.github/`, `PlatformB/`, and everything else → ignored (no mapping defined)

**If your repo also has shared files at the root** (e.g. a common `.claude/` alongside the
per-platform folders), they'll be synced too, because `targetFolders` includes `.claude` by
default. To prevent that, disable the root-level entries:

```json
"aiSetupSync.targetFolders": {
  ".claude": false,
  "CLAUDE.md": false
},
"aiSetupSync.pathMappings": {
  "PlatformA/.claude": ".claude",
  "PlatformA/CLAUDE.md": "CLAUDE.md"
}
```

To switch platforms, update the mapping keys (e.g. replace `PlatformA` with `PlatformB`). Everything
else stays the same.

## Conflict handling

On each sync the extension compares file content against what it last wrote:

- **Unmodified** → updated silently.
- **Deleted locally** → re-added automatically.
- **Edited locally** → handled per `aiSetupSync.conflictPolicy`. With `prompt` (default):

  | Choice | Effect |
  | --- | --- |
  | *Overwrite all* | Replace with the repo version. (Shown when multiple files conflict; a single file goes straight to the per-file dialog.) |
  | *Keep all mine* | Leave your edits; won't re-prompt while your local version stays unchanged. |
  | *Review each* | Decide file by file — each dialog has a *Show diff* button to compare local vs. repository. |
  | Escape / close | Re-prompts on the next sync. |

**Files removed from the repo** are deleted from your project on the next sync. Unmodified files are
removed silently; files you've edited locally follow `aiSetupSync.conflictPolicy` — with `prompt`
you're asked before deletion (Escape re-prompts next sync), with `skip` they're kept on disk.
Directories that become empty after deletions are removed automatically.

## Status bar

Look for **AI Setup Sync** in the status bar (bottom-right of the VS Code window). It shows sync
state at a glance; click it to sync immediately.

| Indicator | Meaning |
| --- | --- |
| `✓ AI Setup Sync` | Up to date — last sync completed successfully. |
| `⟳ AI Setup Sync` | Sync in progress. |
| `⚠ AI Setup Sync` | Sync failed — hover to see the error, click to retry. |
| `⚙ AI Setup Sync` | No repository configured — click to open settings. |

## Commands

All commands are under the **AI Setup Sync** category in the command palette
(`Ctrl+Shift+P` / `Cmd+Shift+P`).

| Command | Description |
| --- | --- |
| **Sync Now** | Sync immediately. |
| **Remove Synced Files** | Delete synced files from the project (local edits are preserved). |
| **Set GitHub Token** | Securely store a GitHub PAT in the OS keychain (required for private and SAML SSO org repos). Use a **classic** token with the **`repo`** scope; for SAML SSO orgs, also authorize it via *Settings → Personal access tokens → Configure SSO*. Submit empty to clear. |

Activity is logged to the **AI Setup Sync** output channel (Output panel → dropdown).

## How files stay out of git

Synced files are automatically added to `.git/info/exclude` (per-clone, never committed) so they
don't show up as pending changes. Only the exact synced files are excluded — anything you create
yourself in the same folders (e.g. a project-specific skill) stays visible to git and committable
normally.

## Removing synced files

Run **Remove Synced Files** before uninstalling for an immediate cleanup. The extension also runs a
cleanup hook on uninstall, but it fires only after a full VS Code restart.

Only files whose content matches what the extension last wrote are removed — files you edited
locally are kept so no work is lost. If any files are kept, they're listed in the **AI Setup Sync**
output channel, and a **Force remove all** button is offered to delete them regardless of local
edits.

## FAQ

**When does it sync?**
Automatically: when you open a project, when you return focus to the VS Code window (throttled so
rapid window-switching doesn't re-sync), and shortly after you change a relevant setting or set a
GitHub token. You can also sync on demand any time with **Sync Now** or by clicking the status bar.
There's no schedule to configure — it just stays current at the moments you're working.

**Does it ever modify files I created myself?**
No. The extension only touches files it synced from the repo. Anything else in your project is left
untouched and stays visible to git.

**Is syncing two-way?**
No — it's one-way, repo → projects. Local edits aren't pushed back; instead they're detected and you
choose whether to keep them or take the repo version.

**Why does it need a *classic* token and not a fine-grained one?**
Fine-grained personal access tokens don't support the `repo` scope this extension relies on. Use a
[classic token](https://github.com/settings/tokens/new) with the `repo` scope.

**Where is my token stored?**
In the OS keychain via VS Code's SecretStorage — never in settings, files, or the repo.

**Can I sync from a private or SSO-protected repo?**
Yes. Add a classic PAT via **Set GitHub Token**; for SAML SSO orgs, authorize the token for your
organization on GitHub.

**Will it work across a whole team?**
That's the point. Everyone installs the extension and points at the same repo; merge a change and it
reaches every project on the next sync.

## License

[MIT](https://github.com/olekpuchka/ai-setup-sync/blob/main/LICENSE)
