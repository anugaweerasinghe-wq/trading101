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
const DOMAIN = "https://www.thetradehq.com";

const routes = [
  { path: "/", indexable: true },
  { path: "/markets", indexable: true },
  { path: "/wiki/macd", indexable: true },
  // Deliberately noindexed in scripts/routes.ts because this charting concept
  // is presented as a descriptive framework rather than a strongly evidenced signal.
  { path: "/wiki/bollinger-band-squeeze", indexable: false },
  { path: "/learn-trading-guide", indexable: true },
  { path: "/privacy", indexable: true },
  { path: "/terms", indexable: true },
  { path: "/about", indexable: true },
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

const seenTitles = new Set();
const seenDescs = new Set();
const rows = [];
let fail = false;

for (const { path: route, indexable } of routes) {
  const filePath = route === "/" ? `${DIST}/index.html` : `${DIST}${route}/index.html`;
  if (!existsSync(filePath)) {
    rows.push({ route, title: "❌ MISSING FILE", desc: "-", canonical: "-", h1: "-", noBadCurrency: "-", ok: false });
    fail = true;
    continue;
  }

  const html = readFileSync(filePath, "utf-8");
  const title = pick(html, /<title>([\s\S]*?)<\/title>/i);
  const desc = pick(html, /<meta\s[^>]*name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical = pick(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const robots = pick(html, /<meta\s[^>]*name=["']robots["']\s+content=["']([^"']+)["']/i);

  const expectedCanonical = `${DOMAIN}${route === "/" ? "/" : route}`;
  const canonicalOk = canonical === expectedCanonical;
  const titleUnique = title && !seenTitles.has(title);
  const descUnique = desc && !seenDescs.has(desc);
  const h1Ok = !!(h1 && h1.replace(/<[^>]+>/g, "").trim().length > 0);
  const noBad = !html.includes("$10K") && !html.includes("$10,000 virtual") && !html.includes("$10,000 in virtual");
  const robotsOk = indexable
    ? !!(robots && /(^|,\s*)index(,|$)/i.test(robots) && !/(^|,\s*)noindex(,|$)/i.test(robots))
    : !!(robots && /(^|,\s*)noindex(,|$)/i.test(robots));

  if (title) seenTitles.add(title);
  if (desc) seenDescs.add(desc);

  const ok = titleUnique && descUnique && canonicalOk && h1Ok && noBad && robotsOk;
  if (!ok) fail = true;

  rows.push({
    route,
    title: titleUnique ? "✅ unique" : "❌ duplicate/missing",
    desc: descUnique ? "✅ unique" : "❌ duplicate/missing",
    canonical: canonicalOk ? "✅ self" : `❌ ${canonical ?? "missing"}`,
    h1: h1Ok ? "✅" : "❌",
    noBadCurrency: noBad ? "✅" : "❌ found $10K",
    robots: robotsOk ? (indexable ? "✅ index" : "✅ noindex") : `❌ ${robots ?? "missing"}`,
    ok,
  });
}

console.log("\n| Route | Title | Description | Canonical | H1 | Robots | No $10K |");
console.log("|-------|-------|-------------|-----------|----|--------|---------|");
for (const r of rows) {
  console.log(`| \`${r.route}\` | ${r.title} | ${r.desc} | ${r.canonical} | ${r.h1} | ${r.robots ?? "-"} | ${r.noBadCurrency} |`);
}

// Sitemap presence check
const sitemap = existsSync(`${DIST}/sitemap.xml`) ? readFileSync(`${DIST}/sitemap.xml`, "utf-8") : "";
console.log("\n**Sitemap presence:**");
for (const { path: route, indexable } of routes) {
  const url = `${DOMAIN}${route === "/" ? "/" : route}`;
  const present = sitemap.includes(`<loc>${url}</loc>`);
  const sitemapOk = indexable ? present : !present;
  const label = indexable
    ? (present ? "✅ in sitemap" : "❌ MISSING")
    : (!present ? "✅ excluded (noindex)" : "❌ should be excluded (noindex)");
  console.log(`- \`${route}\` → ${label}`);
  if (!sitemapOk) fail = true;
}

// Stale-domain guard: no legacy host may survive anywhere in the build output.
const STALE_HOSTS = ["tradinghq.vercel.app", "lovable.app"];
const staleHits = [];
for (const { path: route } of routes) {
  const filePath = route === "/" ? `${DIST}/index.html` : `${DIST}${route}/index.html`;
  if (!existsSync(filePath)) continue;
  const html = readFileSync(filePath, "utf-8");
  for (const host of STALE_HOSTS) {
    if (html.includes(host)) staleHits.push(`${route} → ${host}`);
  }
}
for (const host of STALE_HOSTS) {
  if (sitemap.includes(host)) staleHits.push(`sitemap.xml → ${host}`);
}
console.log("\n**Stale domain guard:**");
if (staleHits.length) {
  for (const hit of staleHits) console.log(`- ❌ ${hit}`);
  fail = true;
} else {
  console.log(`- ✅ no legacy hosts (${STALE_HOSTS.join(", ")}) in build output`);
}

if (fail) {
  console.error("\n🔴 SEO verification failed");
  process.exit(1);
}
console.log("\n🟢 SEO verification passed");