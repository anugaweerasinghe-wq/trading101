/**
 * Sitemap generator — reads the shared route manifest so sitemap
 * cannot drift from what the prerender step actually produces.
 * Usage: npx tsx scripts/generate-sitemap.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { uniqueRoutes, DOMAIN, TODAY } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = uniqueRoutes();
const urls = routes
  .map(
    (r) =>
      `  <url><loc>${DOMAIN}${r.path === "/" ? "/" : r.path}</loc><lastmod>${TODAY}</lastmod><changefreq>${r.changefreq ?? "weekly"}</changefreq><priority>${r.priority ?? "0.6"}</priority></url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

// Write to both public/ (dev server) and dist/ (production build)
const publicPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(publicPath, xml, "utf-8");

const distPath = path.resolve(__dirname, "../dist/sitemap.xml");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, xml, "utf-8");
}

console.log(`✅ Sitemap: ${routes.length} URLs → public/sitemap.xml`);
