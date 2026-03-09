/**
 * Build verification crawler
 * Parses public/sitemap.xml and checks all URLs return 200
 * Usage: node scripts/verify-build.js [baseUrl]
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = process.argv[2] || 'https://tradinghq.vercel.app';

async function main() {
  const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
  const xml = readFileSync(sitemapPath, 'utf-8');

  const locMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = locMatches.map(m => m.replace(/<\/?loc>/g, ''));

  console.log(`\n🔍 Verifying ${urls.length} URLs from sitemap...\n`);

  let passed = 0;
  let failed = 0;
  const errors = [];

  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (res.ok) {
        passed++;
      } else {
        failed++;
        errors.push({ url, status: res.status });
        console.log(`  ❌ ${res.status} — ${url}`);
      }
    } catch (err) {
      failed++;
      errors.push({ url, status: 'NETWORK_ERROR' });
      console.log(`  ❌ NETWORK_ERROR — ${url}`);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`${'='.repeat(50)}`);

  if (failed === 0) {
    console.log('\n🟢 BUILD STABLE — All URLs return 200\n');
  } else {
    console.log('\n🔴 BUILD UNSTABLE — Fix the above errors\n');
    process.exit(1);
  }
}

main();
