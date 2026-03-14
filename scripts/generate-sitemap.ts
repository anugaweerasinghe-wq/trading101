/**
 * Sitemap generator — run during prebuild to sync public/sitemap.xml
 * Usage: npx tsx scripts/generate-sitemap.ts
 */

// Inline asset IDs and glossary slugs to avoid importing from src (which uses path aliases)
import * as fs from 'fs';
import * as path from 'path';

const DOMAIN = "https://tradinghq.vercel.app";
const TODAY = new Date().toISOString().split('T')[0];

// Read assets from src/lib/assets.ts to extract IDs
function extractAssetIds(): string[] {
  const filePath = path.resolve(__dirname, '../src/lib/assets.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const idMatches = content.match(/id:\s*['"]([^'"]+)['"]/g) || [];
  return idMatches.map(m => m.replace(/id:\s*['"]/, '').replace(/['"]/, ''));
}

// Read glossary slugs from src/lib/tradingGlossary.ts
function extractGlossarySlugs(): string[] {
  const filePath = path.resolve(__dirname, '../src/lib/tradingGlossary.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  return slugMatches.map(m => m.replace(/slug:\s*['"]/, '').replace(/['"]/, ''));
}

// Read niche symbols
function extractNicheSymbols(): string[] {
  const filePath = path.resolve(__dirname, '../src/lib/nicheData.ts');
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.match(/['"]([A-Z0-9-]+)['"]\s*:/g) || [];
  return matches.map(m => m.replace(/['":\s]/g, ''));
}

function generateSitemap(): string {
  const assetIds = extractAssetIds();
  const glossarySlugs = extractGlossarySlugs();
  const nicheSymbols = extractNicheSymbols();

  const articleSlugs = [
    'what-is-paper-trading',
    'how-to-read-stock-charts',
    'crypto-vs-stocks',
    'trading-strategies-for-beginners',
    'stock-market-index-etfs',
    'how-to-build-a-portfolio',
  ];

  const corePages = [
    { loc: '/', priority: '1.0', freq: 'daily' },
    { loc: '/trade', priority: '0.9', freq: 'daily' },
    { loc: '/markets', priority: '0.9', freq: 'daily' },
    { loc: '/portfolio', priority: '0.8', freq: 'daily' },
    { loc: '/learn', priority: '0.8', freq: 'weekly' },
    { loc: '/learn-trading-guide', priority: '0.9', freq: 'weekly' },
    { loc: '/leaderboard', priority: '0.8', freq: 'daily' },
    { loc: '/ai-mentor', priority: '0.7', freq: 'weekly' },
    { loc: '/privacy', priority: '0.3', freq: 'monthly' },
    { loc: '/terms', priority: '0.3', freq: 'monthly' },
  ];

  const urls: string[] = [];

  for (const page of corePages) {
    urls.push(`  <url><loc>${DOMAIN}${page.loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${page.freq}</changefreq><priority>${page.priority}</priority></url>`);
  }

  for (const id of assetIds) {
    urls.push(`  <url><loc>${DOMAIN}/trade/${id}</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`);
  }

  for (const slug of articleSlugs) {
    urls.push(`  <url><loc>${DOMAIN}/learn/article/${slug}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  }

  for (const slug of glossarySlugs) {
    urls.push(`  <url><loc>${DOMAIN}/wiki/${slug}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }

  for (const sym of nicheSymbols) {
    urls.push(`  <url><loc>${DOMAIN}/niche/${sym}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return xml;
}

// Main
const sitemap = generateSitemap();
const outPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, sitemap, 'utf-8');

const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log(`✅ Sitemap generated: ${urlCount} URLs → public/sitemap.xml`);
