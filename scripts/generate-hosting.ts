/** Finite route allowlist: unknown URLs retain a real HTTP 404. */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { uniqueRoutes } from './routes';

const legacy = ['how-to-read-stock-charts', 'trading-strategies-for-beginners', 'what-is-paper-trading', 'how-to-build-a-portfolio', 'crypto-vs-stocks', 'stock-market-index-etfs', 'risk-management-in-trading'];
const pages = uniqueRoutes();
const noindexPaths = pages.filter(p => p.noindex).map(p => p.path);
mkdirSync('src/generated', { recursive: true });
writeFileSync('src/generated/noindex-paths.json', JSON.stringify(noindexPaths, null, 2) + '\n');
const quote = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const routes: object[] = legacy.map(slug => ({ src: `^/learn/${slug}/?$`, status: 308, headers: { Location: `/learn/article/${slug}` } }));
for (const p of pages) {
  const route: Record<string, unknown> = {
    src: p.path === '/' ? '^/
// Interactive pages have no useful anonymous server-rendered content.
const lessonIds = [...readFileSync('src/lib/lessonData.ts', 'utf8').matchAll(/^\s+id:\s*(\d+),/gm)].map(m => m[1]);
const sectorIds = [...readFileSync('src/pages/SectorPillar.tsx', 'utf8').matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map(m => m[1]);
for (const src of ['^/(auth|reset-password)/?$', '^/admin/(seo-audit|validator|editor|reviews)/?$', '^/trader/[^/]+/?$', '^/challenge/[^/]+/?$', `^/learn/(${lessonIds.join('|')})/?$`, `^/sectors/(${sectorIds.join('|')})/?$`]) {
  routes.push({ src, dest: '/app.html', headers: { 'X-Robots-Tag': 'noindex, follow' } });
}
routes.push({ handle: 'filesystem' });
routes.push({ src: '/(.*)', dest: '/404.html', status: 404 });
writeFileSync('vercel.json', JSON.stringify({ version: 2, buildCommand: 'npm run build', outputDirectory: 'dist', routes }, null, 2) + '\n');
console.log(`Hosting: ${pages.length} static pages, seven permanent redirects, explicit interactive routes, HTTP 404 fallback`);
 : `^${quote(p.path)}/?/** Finite route allowlist: unknown URLs retain a real HTTP 404. */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { uniqueRoutes } from './routes';

const legacy = ['how-to-read-stock-charts', 'trading-strategies-for-beginners', 'what-is-paper-trading', 'how-to-build-a-portfolio', 'crypto-vs-stocks', 'stock-market-index-etfs', 'risk-management-in-trading'];
const pages = uniqueRoutes();
const noindexPaths = pages.filter(p => p.noindex).map(p => p.path);
mkdirSync('src/generated', { recursive: true });
writeFileSync('src/generated/noindex-paths.json', JSON.stringify(noindexPaths, null, 2) + '\n');
const quote = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const routes: object[] = legacy.map(slug => ({ src: `^/learn/${slug}/?$`, status: 308, headers: { Location: `/learn/article/${slug}` } }));
,
    dest: p.path === '/' ? '/index.html' : `${p.path}/index.html`,
  };
  if (p.noindex) route.headers = { 'X-Robots-Tag': 'noindex, follow' };
  routes.push(route);
}
// Interactive pages have no useful anonymous server-rendered content.
const lessonIds = [...readFileSync('src/lib/lessonData.ts', 'utf8').matchAll(/^\s+id:\s*(\d+),/gm)].map(m => m[1]);
const sectorIds = [...readFileSync('src/pages/SectorPillar.tsx', 'utf8').matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map(m => m[1]);
for (const src of ['^/(auth|reset-password)/?$', '^/admin/(seo-audit|validator|editor|reviews)/?$', '^/trader/[^/]+/?$', '^/challenge/[^/]+/?$', `^/learn/(${lessonIds.join('|')})/?$`, `^/sectors/(${sectorIds.join('|')})/?$`]) {
  routes.push({ src, dest: '/app.html', headers: { 'X-Robots-Tag': 'noindex, follow' } });
}
routes.push({ handle: 'filesystem' });
routes.push({ src: '/(.*)', dest: '/404.html', status: 404 });
writeFileSync('vercel.json', JSON.stringify({ version: 2, buildCommand: 'npm run build', outputDirectory: 'dist', routes }, null, 2) + '\n');
console.log(`Hosting: ${pages.length} static pages, seven permanent redirects, explicit interactive routes, HTTP 404 fallback`);
