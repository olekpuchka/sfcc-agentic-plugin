// Pure string helpers for maintaining a managed block in a git ignore-style
// file (we write it to the repo's local .git/info/exclude). No vscode / fs
// imports here, so the cleanup/uninstall code (plain Node) can reuse it.

export const MARKER_BEGIN = "# >>> AI Setup Sync (managed) >>>";
const MARKER_END = "# <<< AI Setup Sync (managed) <<<";

/**
 * Maps synced files to .gitignore patterns: one entry per file, anchored to the
 * repo root with a leading slash. Ignoring the EXACT files we wrote (rather than
 * whole folders) means anything the developer authors in the same folders — a
 * project-specific skill, a custom agent — stays visible to git and committable
 * to their own repo. The leading slash also anchors each entry and guarantees no
 * line starts with `#`/`!`, so no escaping is needed for our paths.
 */
export function computePatterns(syncedPaths: string[]): string[] {
  return [...new Set(syncedPaths.map((p) => `/${p}`))].sort();
}

/**
 * Maps synced files to .worktreeinclude patterns.
 *
 * - Files/dirs that arrived via a target folder (file or directory) use the
 *   target folder itself as the pattern.
 * - Files that arrived via a path mapping use the mapping destination as the
 *   pattern, so a directory mapping produces one folder pattern rather than
 *   per-file entries.
 * - Any remaining files fall back to their exact local path.
 */
export function computeWorktreePatterns(
  managedLocalPaths: string[],
  targetFolders: string[],
  pathMappingValues: string[]
): string[] {
  const patterns = new Set<string>();
  for (const localPath of managedLocalPaths) {
    const folder = targetFolders.find((f) => localPath === f || localPath.startsWith(f + "/"));
    if (folder) {
      patterns.add(`/${folder}`);
      continue;
    }
    const dest = pathMappingValues.find((d) => localPath === d || localPath.startsWith(d + "/"));
    patterns.add(`/${dest ?? localPath}`);
  }
  return [...patterns].sort();
}

function renderBlock(patterns: string[]): string {
  return [
    MARKER_BEGIN,
    "# Setup files synced by the AI Setup Sync extension.",
    ...patterns,
    MARKER_END,
  ].join("\n");
}

/** Removes the managed block (and surrounding blank lines) from .gitignore content. */
export function stripBlock(content: string): string {
  const lines = content.split(/\r?\n/);
  const start = lines.indexOf(MARKER_BEGIN);
  if (start === -1) {
    return content;
  }
  const end = lines.indexOf(MARKER_END, start);
  if (end === -1) {
    return content; // malformed block — no MARKER_END, leave file untouched
  }
  lines.splice(start, end - start + 1);
  // Collapse any leftover blank lines created by the removal.
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "") + "\n";
}

/**
 * Returns the .gitignore content with the managed block inserted or replaced.
 * Returns undefined when no change is needed.
 */
export function upsertBlock(
  existing: string,
  patterns: string[]
): string | undefined {
  const block = renderBlock(patterns);
  const hasBlock = existing.includes(MARKER_BEGIN);

  let next: string;
  if (hasBlock) {
    const strippedRaw = stripBlock(existing);
    if (strippedRaw.includes(MARKER_BEGIN)) {
      // Malformed block (no MARKER_END) — stripBlock couldn't remove it.
      // Preserve any content before the marker; replace from it onwards.
      const base = existing.slice(0, existing.indexOf(MARKER_BEGIN)).replace(/\n+$/g, "");
      next = base ? `${base}\n\n${block}\n` : `${block}\n`;
    } else {
      const stripped = strippedRaw.replace(/\n+$/g, "");
      next = stripped ? `${stripped}\n\n${block}\n` : `${block}\n`;
    }
  } else {
    const base = existing.replace(/\n+$/g, "");
    next = base ? `${base}\n\n${block}\n` : `${block}\n`;
  }

  return next === existing ? undefined : next;
}
