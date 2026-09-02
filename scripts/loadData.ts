/**
 * Bundles scripts/dataEntry.ts with esbuild (resolving "@/" aliases and
 * stubbing image imports) and imports the result, so build scripts can
 * read the real TypeScript content modules instead of regex-scraping them.
 */

import * as esbuild from "esbuild";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

export type SiteData = typeof import("./dataEntry");

let cached: SiteData | null = null;

export async function loadSiteData(): Promise<SiteData> {
  if (cached) return cached;

  const outdir = fs.mkdtempSync(path.join(os.tmpdir(), "tradehq-data-"));
  const outfile = path.join(outdir, "data.mjs");

  await esbuild.build({
    entryPoints: [path.join(__dirname, "dataEntry.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    outfile,
    logLevel: "silent",
    alias: { "@": path.join(ROOT, "src") },
    loader: {
      ".jpg": "empty",
      ".jpeg": "empty",
      ".png": "empty",
      ".svg": "empty",
      ".webp": "empty",
      ".css": "empty",
      ".json": "json",
    },
  });

  cached = (await import(pathToFileURL(outfile).href)) as SiteData;
  return cached;
}
