/**
 * Post-build SEO verifier — asserts that raw (pre-JS) HTML of key
 * routes contains a unique title, description, self-referencing
 * canonical, non-empty <h1>, and no leaked legacy currency literals.
 *
 * Prints a per-route Markdown checklist and exits non-zero on failure.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const DIST = resolve(process.cwd(), "dist");
const DOMAIN = "https://tradinghq.vercel.app";

const routes = [
  "/",
  "/markets",
  "/wiki/macd",
  "/wiki/bollinger-band-squeeze",
  "/learn-trading-guide",
  "/privacy",
  "/terms",
  "/about",
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

const seenTitles = new Set();
const seenDescs = new Set();
const rows = [];
let fail = false;

for (const route of routes) {
  const filePath = route === "/" ? `${DIST}/index.html` : `${DIST}${route}/index.html`;
  if (!existsSync(filePath)) {
    rows.push({ route, title: "❌ MISSING FILE", desc: "-", canonical: "-", h1: "-", noBadCurrency: "-", ok: false });
    fail = true;
    continue;
  }

  const html = readFileSync(filePath, "utf-8");
  const title = pick(html, /<title>([\s\S]*?)<\/title>/i);
  const desc = pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical = pick(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);

  const expectedCanonical = `${DOMAIN}${route === "/" ? "/" : route}`;
  const canonicalOk = canonical === expectedCanonical;
  const titleUnique = title && !seenTitles.has(title);
  const descUnique = desc && !seenDescs.has(desc);
  const h1Ok = !!(h1 && h1.replace(/<[^>]+>/g, "").trim().length > 0);
  const noBad = !html.includes("$10,000") && !html.includes("$10K");

  if (title) seenTitles.add(title);
  if (desc) seenDescs.add(desc);

  const ok = titleUnique && descUnique && canonicalOk && h1Ok && noBad;
  if (!ok) fail = true;

  rows.push({
    route,
    title: titleUnique ? "✅ unique" : "❌ duplicate/missing",
    desc: descUnique ? "✅ unique" : "❌ duplicate/missing",
    canonical: canonicalOk ? "✅ self" : `❌ ${canonical ?? "missing"}`,
    h1: h1Ok ? "✅" : "❌",
    noBadCurrency: noBad ? "✅" : "❌ found $10K",
    ok,
  });
}

console.log("\n| Route | Title | Description | Canonical | H1 | No $10K |");
console.log("|-------|-------|-------------|-----------|----|---------|");
for (const r of rows) {
  console.log(`| \`${r.route}\` | ${r.title} | ${r.desc} | ${r.canonical} | ${r.h1} | ${r.noBadCurrency} |`);
}

// Sitemap presence check
const sitemap = existsSync(`${DIST}/sitemap.xml`) ? readFileSync(`${DIST}/sitemap.xml`, "utf-8") : "";
console.log("\n**Sitemap presence:**");
for (const r of routes) {
  const url = `${DOMAIN}${r === "/" ? "/" : r}`;
  const present = sitemap.includes(`<loc>${url}</loc>`);
  console.log(`- \`${r}\` → ${present ? "✅ in sitemap" : "❌ MISSING"}`);
  if (!present) fail = true;
}

if (fail) {
  console.error("\n🔴 SEO verification failed");
  process.exit(1);
}
console.log("\n🟢 SEO verification passed");