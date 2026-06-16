# AI Setup Sync

A VS Code extension that syncs shared AI setup files — Claude Code, GitHub Copilot, Cursor,
Google Antigravity 2.0, OpenAI Codex, and more — from a GitHub repository into your project, and keeps them current automatically.

You maintain one GitHub repository with your team's setup files. The extension pulls from it
on every project open and checks for updates daily.

## Install

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=olekpuchka.ai-setup-sync).
2. Set `aiSetupSync.repository` to your GitHub repository URL in VS Code **user** settings.

See [extension/README.md](extension/README.md) for full documentation — settings, commands, conflict handling, and how to structure your setup repository.

## How updates work

- **Setup files** are fetched from your repo at runtime — push to your configured branch and every
  developer's project picks up the changes on the next sync.
- **The extension itself** is published to the VS Code Marketplace automatically by [CI](.github/workflows/release.yml) on `v*` tag pushes, and updates via VS Code's built-in update mechanism.

## Repository structure

| Path | What it is |
| --- | --- |
| `extension/` | VS Code extension source — TypeScript, package.json, media |
| `.github/workflows/release.yml` | CI that builds and publishes releases on `v*` tag pushes |
| `CHANGELOG.md` | Version history |
| `CONTRIBUTING.md` | Contributor guide — setup, project structure, PR guidelines |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, project structure, and PR guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

Released under the [MIT License](LICENSE). Free to use, modify, and distribute.
