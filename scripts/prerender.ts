/**
 * Post-build SSG prerender.
 *
 * Reads dist/index.html (Vite's compiled shell) and writes one static
 * HTML file per route under dist/<route>/index.html, with per-route:
 *   - <title>, <meta name="description">, canonical, og:*, twitter:*
 *   - <meta name="robots"> (noindex for low-value programmatic routes)
 *   - a full, route-specific article inside #root — real headings,
 *     paragraphs, lists and internal links — so crawlers (and AdSense)
 *     see substantive content before any JavaScript executes.
 *
 * Hosting serves the file on the filesystem first, so /wiki/macd resolves
 * to dist/wiki/macd/index.html — no server, no runtime SSR.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { uniqueRoutes, DOMAIN, type RouteMeta } from "./routes";
import { buildContentMap, type PageContent } from "./content";
import { DISCLAIMER } from "./staticCopy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

/** Minimum rendered words in the static body of an indexable page. */
const MIN_WORDS = 450;

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const NAV = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/trade", label: "Practice desk" },
  { href: "/courses", label: "Courses" },
  { href: "/learn", label: "Learn" },
  { href: "/wiki", label: "Glossary" },
  { href: "/how-to-trade", label: "Asset guides" },
  { href: "/strategy", label: "Strategies" },
  { href: "/compare", label: "Comparisons" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const FOOTER = [
  { href: "/about", label: "About TradeHQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/learn/country", label: "Country guides" },
];

function linkList(links: { href: string; label: string }[]): string {
  return links
    .map((l) => `<li><a href="${esc(l.href)}" style="color:#00E396;">${esc(l.label)}</a></li>`)
    .join("");
}

function renderBody(r: RouteMeta, content: PageContent | undefined): string {
  const sections = (content?.sections || [])
    .map((s) => {
      const paras = (s.p || [])
        .filter(Boolean)
        .map((p) => `<p style="line-height:1.7;margin:0 0 14px;color:#c8ccd4;">${esc(p)}</p>`)
        .join("");
      const list = s.list && s.list.length
        ? `<ul style="line-height:1.7;color:#c8ccd4;margin:0 0 16px;padding-left:20px;">${s.list
            .filter(Boolean)
            .map((li) => `<li style="margin-bottom:6px;">${esc(li)}</li>`)
            .join("")}</ul>`
        : "";
      if (!paras && !list) return "";
      return `<section><h2 style="font-size:1.3rem;margin:28px 0 12px;color:#f2f4f8;">${esc(s.h)}</h2>${paras}${list}</section>`;
    })
    .join("");

  const related = content?.links?.length
    ? `<nav aria-label="Related pages"><h2 style="font-size:1.3rem;margin:28px 0 12px;color:#f2f4f8;">Related pages</h2><ul style="line-height:1.8;padding-left:20px;">${linkList(content.links)}</ul></nav>`
    : "";

  return `<div id="prerender-seo" style="min-height:100vh;background:#0A0A0F;color:#e6e7ea;font-family:Inter,system-ui,sans-serif;padding:40px 24px;">
  <div style="max-width:820px;margin:0 auto;">
    <nav aria-label="Main"><ul style="list-style:none;display:flex;flex-wrap:wrap;gap:14px;padding:0;margin:0 0 32px;">${linkList(NAV)}</ul></nav>
    <main>
      <h1 style="font-size:2rem;line-height:1.2;margin:0 0 16px;">${esc(r.h1)}</h1>
      <p style="font-size:1.05rem;line-height:1.7;color:#a8adb6;margin:0 0 8px;">${esc(r.summary)}</p>
      ${sections}
      ${related}
      <p style="font-size:0.8rem;color:#8b9099;margin-top:32px;">${esc(DISCLAIMER)} TradeHQ is a free educational paper-trading simulator. No real money is traded and no content here is a recommendation.</p>
    </main>
    <footer><ul style="list-style:none;display:flex;flex-wrap:wrap;gap:14px;padding:0;margin:32px 0 0;">${linkList(FOOTER)}</ul></footer>
  </div>
</div>`;
}

function wordCount(html: string): number {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function renderHead(r: RouteMeta, template: string, body: string): string {
  const url = `${DOMAIN}${r.path === "/" ? "/" : r.path}`;
  const title = esc(r.title);
  const desc = esc(r.description);
  const robots = r.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1";

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  html = html.replace(
    /<meta\s[^>]*name=["']description["'][^>]*>/i,
    `<meta data-static-head name="description" content="${desc}" />`
  );

  // robots — replace existing, else inject
  if (/<meta\s[^>]*name=["']robots["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s[^>]*name=["']robots["'][^>]*>/i,
      `<meta data-static-head name="robots" content="${robots}" />`
    );
  } else {
    html = html.replace(/<\/head>/i, `  <meta data-static-head name="robots" content="${robots}" />\n  </head>`);
  }

  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");
  html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${url}" />\n  </head>`);

  html = html.replace(
    /<meta\s[^>]*property=["']og:url["'][^>]*>/i,
    `<meta data-static-head property="og:url" content="${url}" />`
  );
  html = html.replace(
    /<meta\s[^>]*property=["']og:title["'][^>]*>/i,
    `<meta data-static-head property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s[^>]*property=["']og:description["'][^>]*>/i,
    `<meta data-static-head property="og:description" content="${desc}" />`
  );
  html = html.replace(
    /<meta\s[^>]*name=["']twitter:title["'][^>]*>/i,
    `<meta data-static-head name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s[^>]*name=["']twitter:description["'][^>]*>/i,
    `<meta data-static-head name="twitter:description" content="${desc}" />`
  );

  html = html.replace(/<div\s+id=["']root["']><\/div>/i, `<div id="root">${body}</div>`);

  return html;
}

async function main() {
  const shellPath = path.join(DIST, "index.html");
  if (!fs.existsSync(shellPath)) {
    console.error(`✖ dist/index.html not found — did \`vite build\` run?`);
    process.exit(1);
  }
  const shell = fs.readFileSync(shellPath, "utf-8");
  const contentMap = await buildContentMap();

  const routes = uniqueRoutes();
  const canonicals = new Map<string, string>();
  const bodyHashes = new Map<string, string>();
  const thin: { path: string; words: number }[] = [];
  const missing: string[] = [];
  let written = 0;

  for (const r of routes) {
    const content = contentMap.get(r.path);
    if (!content && !r.noindex) missing.push(r.path);

    const body = renderBody(r, content);
    const words = wordCount(body);
    if (!r.noindex && words < MIN_WORDS) thin.push({ path: r.path, words });

    const html = renderHead(r, shell, body);

    const outDir = r.path === "/" ? DIST : path.join(DIST, r.path);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    written++;

    const canonical = `${DOMAIN}${r.path === "/" ? "/" : r.path}`;
    if (canonicals.has(canonical)) {
      console.error(`✖ Duplicate canonical: ${canonical} from ${canonicals.get(canonical)} and ${r.path}`);
      process.exit(1);
    }
    canonicals.set(canonical, r.path);

    if (!r.noindex) {
      const key = body.replace(/\s+/g, " ").trim();
      if (bodyHashes.has(key)) {
        console.error(`✖ Duplicate static body: ${r.path} is identical to ${bodyHashes.get(key)}`);
        process.exit(1);
      }
      bodyHashes.set(key, r.path);
    }
  }

  // Guard: forbidden legacy currency literals in prerendered output.
  const forbidden = ["$10,000", "$10K"];
  for (const r of routes) {
    const filePath = r.path === "/" ? path.join(DIST, "index.html") : path.join(DIST, r.path, "index.html");
    const body = fs.readFileSync(filePath, "utf-8");
    for (const bad of forbidden) {
      if (body.includes(bad)) {
        console.error(`✖ Forbidden legacy currency literal "${bad}" found in prerendered ${r.path}`);
        process.exit(1);
      }
    }
  }

  const indexable = routes.filter((r) => !r.noindex).length;
  console.log(`✅ Prerendered ${written} routes (${indexable} indexable, ${written - indexable} noindex)`);
  console.log(`✅ Canonical uniqueness confirmed (${canonicals.size} unique URLs)`);

  if (missing.length) {
    console.error(`✖ ${missing.length} indexable routes have no static content: ${missing.slice(0, 12).join(", ")}`);
    process.exit(1);
  }
  if (thin.length) {
    console.error(`✖ ${thin.length} indexable routes below ${MIN_WORDS} words:`);
    for (const t of thin.slice(0, 20)) console.error(`   ${t.path} — ${t.words} words`);
    process.exit(1);
  }
  console.log(`✅ Every indexable route renders ≥ ${MIN_WORDS} words of unique static content`);
}

main();
