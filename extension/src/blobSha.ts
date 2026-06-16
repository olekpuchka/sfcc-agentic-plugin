import * as crypto from "crypto";

/**
 * Computes the Git blob SHA-1 for a byte buffer.
 *
 * Git hashes blobs as: sha1("blob " + <byteLength> + "\0" + <content>).
 * The GitHub trees API returns exactly this value as each file entry's `sha`,
 * so recomputing it on disk lets us compare a local file to its remote version
 * without downloading the remote content.
 */
export function gitBlobSha(content: Buffer): string {
  const header = Buffer.from(`blob ${content.length}\0`, "utf8");
  return crypto
    .createHash("sha1")
    .update(Buffer.concat([header, content]))
    .digest("hex");
}
