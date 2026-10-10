/**
 * Offline Cloudflare Pages SEO mode check. Invoked after build:cloudflare.
 * Ensures staging is universally noindex; when enabled, production keeps
 * indexability on custom domains while pages.dev mirrors stay noindex.
 * Restores staging output before completing so CI never publishes live mode.
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
const headerFile = "dist/_headers";
function expectStaging() {
  const h = readFileSync(headerFile, "utf8");
  assert(h.includes("/*\n  X-Robots-Tag: noindex\n"), "Staging lacks global noindex");
  assert(h.includes("https://:project.pages.dev/*\n  X-Robots-Tag: noindex\n"), "Missing pages.dev host protection");
  assert(h.includes("https://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex\n"), "Missing hashed pages.dev host protection");
}
expectStaging();
try {
  execFileSync(process.execPath, ["scripts/prepare-cloudflare.mjs"], {
    stdio: "pipe",
    env: { ...process.env, TRADEHQ_CLOUDFLARE_LIVE: "1" },
  });
  const h = readFileSync(headerFile, "utf8");
  assert(!h.includes("/*\n  X-Robots-Tag: noindex\n"),
    "Live mode still has site-wide noindex; Google could drop indexed URLs");
  assert(h.includes("https://:project.pages.dev/*\n  X-Robots-Tag: noindex\n"),
    "Live mode allows canonical pages.dev duplicate indexing");
  assert(h.includes("https://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex\n"),
    "Live mode allows hashed pages.dev duplicate indexing");
} finally {
  execFileSync(process.execPath, ["scripts/prepare-cloudflare.mjs"], {
    stdio: "pipe",
    env: { ...process.env, TRADEHQ_CLOUDFLARE_LIVE: "0" },
  });
}
expectStaging();
console.log("PASS staging and live-domain static SEO header modes; staging output restored.");
