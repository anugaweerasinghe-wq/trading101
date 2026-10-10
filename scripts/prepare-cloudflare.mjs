/**
 * Prepares Cloudflare Pages preview AFTER Vite's normal prerender build.
 * The real static route HTML remains intact; only selected dynamic URLs
 * invoke Pages Functions. Never rewrite unknown URLs to the SEO homepage.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(process.cwd(), "dist");
const shellFile = resolve(dir, "app-shell.html");
if (!existsSync(shellFile)) throw new Error("Missing dist/app-shell.html; run npm run build first.");
const shell = readFileSync(shellFile, "utf8");
if (!/name=["']robots["'][^>]*content=["']noindex, follow["']/.test(shell)
  || /<link[^>]+rel=["']canonical["']/.test(shell)) {
  throw new Error("Fallback must be noindex with no canonical.");
}
writeFileSync(resolve(dir, "404.html"), shell, "utf8");

// A staging pages.dev *production* deployment is not necessarily a preview URL.
// Make every staging static page explicitly noindex by default. Removing this
// protection requires a deliberate environment flag at owner-approved cutover.
const productionApproved = process.env.TRADEHQ_CLOUDFLARE_LIVE === "1";
// Even after custom-domain cutover, the permanent *.pages.dev mirrors must
// remain noindex, preventing duplicate indexed copies of the production site.
// Cloudflare Pages supports hostname placeholders in _headers rules.
const pagesDevNoindex =
  "https://:project.pages.dev/*\n  X-Robots-Tag: noindex\n" +
  "https://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex\n";
writeFileSync(resolve(dir, "_headers"), productionApproved
  ? pagesDevNoindex
  : "/*\n  X-Robots-Tag: noindex\n" + pagesDevNoindex, "utf8");

const include = [
  "/auth", "/reset-password", "/admin", "/admin/*",
  "/trader/*", "/trade/*", "/challenge", "/challenge/*",
  "/courses/*", "/course-sitemap.xml", "/learn/article/*"
];
if (include.length > 100 || include.some((x) => x.length > 100)) {
  throw new Error("Cloudflare Pages Functions routing limit exceeded.");
}
writeFileSync(resolve(dir, "_routes.json"),
  JSON.stringify({ version: 1, include, exclude: [] }, null, 2) + "\n");

for (const required of ["index.html", "sitemap.xml", "robots.txt", "ads.txt", "404.html", "app-shell.html"]) {
  if (!existsSync(resolve(dir, required))) throw new Error("Missing Cloudflare output: " + required);
}
console.log("Cloudflare preview prepared: prerendered static routes retained; narrow Functions routing.");
