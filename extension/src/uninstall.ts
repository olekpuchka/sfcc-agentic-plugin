// Runs on extension uninstall (declared as "vscode:uninstall" in package.json).
// This is a plain Node process: NO vscode API, NO workspace context. It reads
// the registry written during syncs and removes the files we created.
//
// NOTE on timing: VS Code runs this via child_process.fork(), i.e. its own
// bundled Node runtime (no system `node`/PATH needed), but only after VS Code is
// fully RESTARTED following the uninstall — not when you click Uninstall. There
// is also a ~5s budget, so keep this fast. For immediate cleanup, use the
// "AI Setup Sync: Remove Synced Files" command before uninstalling.

import * as fs from "fs";
import { removeManagedFiles } from "./cleanup";
import { readRegistry, registryDir, registryFilePath } from "./registry";

function main(): void {
  try {
    const reg = readRegistry();
    for (const [workspaceFsPath, record] of Object.entries(reg.workspaces)) {
      removeManagedFiles(workspaceFsPath, record.files);
    }
    try {
      fs.unlinkSync(registryFilePath());
      fs.rmdirSync(registryDir());
    } catch {
      /* best effort */
    }
  } catch {
    // Uninstall hooks must never throw loudly; cleanup is best-effort.
  }
}

main();
