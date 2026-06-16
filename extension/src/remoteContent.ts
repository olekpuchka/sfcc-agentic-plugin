import * as vscode from "vscode";

export const REMOTE_SCHEME = "ai-setup-sync-remote";

const cache = new Map<string, string>();
const MAX_CACHE_ENTRIES = 20;

export function cacheRemoteContent(path: string, bytes: Buffer): void {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const first = cache.keys().next().value;
    if (first !== undefined) {
      cache.delete(first);
    }
  }
  cache.set(path, bytes.toString("utf8"));
}

export function clearRemoteContent(path: string): void {
  cache.delete(path);
}

export function remoteDocUri(path: string): vscode.Uri {
  return vscode.Uri.parse(`${REMOTE_SCHEME}:/${encodeURIComponent(path)}`);
}

export const remoteContentProvider: vscode.TextDocumentContentProvider = {
  provideTextDocumentContent(uri: vscode.Uri): string {
    const path = decodeURIComponent(uri.path.replace(/^\//, ""));
    return cache.get(path) ?? "";
  },
};
