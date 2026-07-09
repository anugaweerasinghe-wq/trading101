/**
 * Post-build SSG prerender.
 *
 * Reads dist/index.html (Vite's compiled shell) and writes one static
 * HTML file per route under dist/<route>/index.html, with per-route:
 *   - <title>
 *   - <meta name="description">
 *   - <link rel="canonical">
 *   - og:url / og:title / og:description
 *   - a visible SEO block inside #root (H1 + summary + primary CTA)
 *     so raw HTML crawlers see real content before JS hydrates.
 *
 * Vercel serves the file on the filesystem first, so /wiki/macd resolves
 * to dist/wiki/macd/index.html — no server, no runtime SSR.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { uniqueRoutes, DOMAIN, type RouteMeta } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function seoBodyBlock(r: RouteMeta): string {
  // Rendered inside <div id="root"> as the initial payload.
  // React (createRoot().render) replaces #root's children on mount, so
  // users only see this for a few hundred ms while the bundle loads.
  const backHref = "/";
  return `<div id="prerender-seo" style="min-height:100vh;background:#0A0A0F;color:#e6e7ea;font-family:Inter,system-ui,sans-serif;padding:80px 24px;">
  <div style="max-width:720px;margin:0 auto;">
    <h1 style="font-size:2rem;line-height:1.2;margin:0 0 16px;">${esc(r.h1)}</h1>
    <p style="font-size:1.05rem;line-height:1.6;color:#a8adb6;margin:0 0 24px;">${esc(r.summary)}</p>
    <p style="font-size:0.85rem;color:#6b7280;margin:0 0 24px;">Loading the interactive experience…</p>
    <p style="font-size:0.75rem;color:#6b7280;">Educational simulation only — not financial advice. <a href="${backHref}" style="color:#00E396;">TradeHQ home</a>.</p>
  </div>
</div>`;
}

function renderHead(r: RouteMeta, template: string): string {
  const url = `${DOMAIN}${r.path === "/" ? "/" : r.path}`;
  const title = esc(r.title);
  const desc = esc(r.description);

  let html = template;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${desc}" />`
  );

  // <link rel="canonical"> — remove any existing, then add self-referencing
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");
  html = html.replace(
    /<\/head>/i,
    `  <link rel="canonical" href="${url}" />\n  </head>`
  );

  // og:url
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${url}" />`
  );

  // og:title
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${title}" />`
  );

  // og:description
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${desc}" />`
  );

  // twitter:title / description
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${desc}" />`
  );

  // Inject SEO body block INSIDE #root so crawlers see real content.
  html = html.replace(
    /<div\s+id=["']root["']><\/div>/i,
    `<div id="root">${seoBodyBlock(r)}</div>`
  );

  return html;
}

function main() {
  const shellPath = path.join(DIST, "index.html");
  if (!fs.existsSync(shellPath)) {
    console.error(`✖ dist/index.html not found — did \`vite build\` run?`);
    process.exit(1);
  }
  const shell = fs.readFileSync(shellPath, "utf-8");

  const routes = uniqueRoutes();
  const canonicals = new Map<string, string>();
  let written = 0;

  for (const r of routes) {
    const html = renderHead(r, shell);

    // Write to dist/<route>/index.html; "/" writes to dist/index.html itself.
    const outDir = r.path === "/" ? DIST : path.join(DIST, r.path);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    written++;

    // Track canonicals for duplicate check.
    const canonical = `${DOMAIN}${r.path === "/" ? "/" : r.path}`;
    if (canonicals.has(canonical)) {
      console.error(`✖ Duplicate canonical: ${canonical} produced by both ${canonicals.get(canonical)} and ${r.path}`);
      process.exit(1);
    }
    canonicals.set(canonical, r.path);
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

  console.log(`✅ Prerendered ${written} routes → dist/**/index.html`);
  console.log(`✅ Canonical uniqueness confirmed (${canonicals.size} unique URLs)`);
}

main();