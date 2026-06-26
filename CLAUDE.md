# AI Setup Sync — Claude Code Instructions

## Releasing

Release is tag-triggered via GitHub Actions (`.github/workflows/release.yml`). Never run `vsce publish` manually.

```
git push
git tag v1.x.x
git push origin v1.x.x
```

The workflow fires on `v*` tags and builds the extension, publishes to the VS Code Marketplace, and creates a GitHub Release with notes extracted from `CHANGELOG.md`.
