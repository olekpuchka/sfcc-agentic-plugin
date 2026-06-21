# AI Setup Sync

[![Release](https://github.com/olekpuchka/ai-setup-sync/actions/workflows/release.yml/badge.svg)](https://github.com/olekpuchka/ai-setup-sync/actions/workflows/release.yml)
[![Version](https://img.shields.io/github/v/release/olekpuchka/ai-setup-sync?label=version)](https://github.com/olekpuchka/ai-setup-sync/releases)
[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=olekpuchka.ai-setup-sync)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**One repo. Every project. Always in sync.**

A VS Code extension that keeps your AI configuration — for Claude Code, GitHub Copilot, Cursor,
Google Antigravity, Gemini CLI, OpenAI Codex, and more — identical across every project. Maintain
it once in a GitHub repository; the extension pulls it into each project on open and whenever you
return to the window, so no one ever copy-pastes a `CLAUDE.md` between repos again.

> **📖 Looking for usage docs?** This page orients you to the repository. For installation,
> settings, conflict handling, path mappings, and the FAQ, see
> **[extension/README.md](extension/README.md)** — the full documentation that ships with the
> Marketplace listing.

## What it does

- **Syncs automatically** — pulls on project open and when you return focus to the window.
- **Supports every tool** — Claude Code, Copilot, Cursor, Antigravity, Gemini CLI, Codex, or any custom path.
- **Protects local edits** — detects files you've changed and prompts before overwriting, with a built-in diff.
- **Stays out of git** — synced files are added to `.git/info/exclude`, never cluttering your changes.

## Install

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=olekpuchka.ai-setup-sync)
   (or search **AI Setup Sync** in the Extensions view).
2. Set `aiSetupSync.repository` to your GitHub repository URL in VS Code **user** settings.
3. Open a project — sync runs automatically.

For private or SSO-protected repos, add a token — see the
[full setup guide](extension/README.md#setting-up-your-repository).

## How updates work

There are two independent update paths, and it's worth keeping them straight:

- **Your setup files** are fetched from your repo at runtime. Push to your configured branch and
  every developer's project picks up the change on the next sync — no extension release needed.
- **The extension itself** is published to the VS Code Marketplace automatically by
  [CI](.github/workflows/release.yml) on `v*` tag pushes, and updates through VS Code's built-in
  extension updater.

## Repository structure

| Path | What it is |
| --- | --- |
| [`extension/`](extension/) | VS Code extension source — TypeScript, `package.json`, media, and the [full docs](extension/README.md) |
| [`.github/workflows/release.yml`](.github/workflows/release.yml) | CI that builds and publishes releases on `v*` tag pushes |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contributor guide — setup, architecture, and PR guidelines |

## Contributing

Pull requests are welcome for features, bug fixes, and documentation. See
[CONTRIBUTING.md](CONTRIBUTING.md) for local setup, project architecture, and PR guidelines.

## License

Released under the [MIT License](LICENSE) — free to use, modify, and distribute.
