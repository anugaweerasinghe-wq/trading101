/**
 * Content-quality audit over the prerendered build output.
 *
 * Reports, for every indexable page: title/description length, H1 count,
 * and the share of sentences repeated across many pages. Word count is
 * displayed only as a descriptive diagnostic; there is intentionally no
 * minimum-word threshold because Google does not recommend one.
 */

import { readFileSync, readdirSync, statSync } from "fs";

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = `${dir}/${f}`;
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f === "index.html") out.push(p);
  }
  return out;
}

const files = walk("dist");
const sentCount = new Map();
const pages = [];

for (const f of files) {
  const html = readFileSync(f, "utf8");
  if (/name="robots" content="noindex/.test(html)) continue;
  const route = "/" + f.replace(/^dist\//, "").replace(/index\.html$/, "").replace(/\/$/, "");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  const body = (html.match(/<body[\s\S]*<\/body>/) || [""])[0]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const sents = body.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.split(" ").length >= 6);
  for (const s of new Set(sents)) sentCount.set(s, (sentCount.get(s) || 0) + 1);
  pages.push({ route, title, desc, words: body.split(" ").length, sents, h1: (html.match(/<h1/g) || []).length });
}

const badTitle = pages.filter((p) => p.title.length > 65);
const badDesc = pages.filter((p) => p.desc.length > 160);
console.log(`indexable pages: ${pages.length}`);
console.log(`titles > 65 chars: ${badTitle.length}`, badTitle.slice(0, 8).map((p) => `${p.route}:${p.title.length}`));
console.log(`descriptions > 160 chars: ${badDesc.length}`, badDesc.slice(0, 8).map((p) => `${p.route}:${p.desc.length}`));
console.log(`pages without exactly one H1: ${pages.filter((p) => p.h1 !== 1).length}`);

const scored = pages
  .map((p) => ({
    route: p.route,
    words: p.words,
    ratio: p.sents.length ? p.sents.filter((s) => (sentCount.get(s) || 0) > 5).length / p.sents.length : 1,
  }))
  .sort((a, b) => b.ratio - a.ratio);

console.log("\nmost template-heavy pages:");
for (const s of scored.slice(0, 15)) console.log(`  ${s.route} — ${(s.ratio * 100).toFixed(0)}% shared sentences, ${s.words} words`);

console.log("\nmost repeated sentences:");
for (const [s, c] of [...sentCount.entries()].filter(([, c]) => c > 20).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${c} × ${s.slice(0, 100)}`);
}

console.log("\nword count is diagnostic only; no minimum threshold is enforced.");
