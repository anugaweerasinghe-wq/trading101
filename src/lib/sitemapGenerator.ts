import { tradingGlossary } from "./tradingGlossary";

const DOMAIN = "https://tradinghq.vercel.app";
const TODAY = "2026-03-03";

export function generateSitemapXML(): string {
  const wikiEntries = tradingGlossary
    .map(
      (t) =>
        `  <url><loc>${DOMAIN}/wiki/${t.slug}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Wiki Glossary Pages -->
${wikiEntries}
</urlset>`;

  console.log("=== WIKI SITEMAP XML (copy to Google Search Console) ===");
  console.log(xml);
  console.log("=== END SITEMAP ===");

  return xml;
}
