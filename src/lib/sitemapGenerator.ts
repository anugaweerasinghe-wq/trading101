import { tradingGlossary } from "./tradingGlossary";

const DOMAIN = "https://tradinghq.vercel.app";
const TODAY = "2026-03-07";

export function generateSitemapXML(): string {
  const wikiEntries = tradingGlossary
    .map(
      (t) =>
        `  <url><loc>${DOMAIN}/wiki/${t.slug}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->
  <url><loc>${DOMAIN}/</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${DOMAIN}/trade</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${DOMAIN}/markets</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${DOMAIN}/portfolio</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>${DOMAIN}/learn</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${DOMAIN}/learn-trading-guide</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${DOMAIN}/ai-mentor</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <!-- Wiki Glossary Pages -->
${wikiEntries}
</urlset>`;

  console.log("=== FULL SITEMAP XML (copy to Google Search Console) ===");
  console.log(xml);
  console.log("=== END SITEMAP ===");

  return xml;
}
