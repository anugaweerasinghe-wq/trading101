# Get All ~150 Pages Indexed in Google Search Console — Free Playbook

## One-time setup (15 min)
1. Go to https://search.google.com/search-console
2. Add property → **Domain** (preferred) or **URL prefix** for `https://tradinghq.vercel.app`
3. Verify via DNS TXT (domain) or HTML tag (URL prefix). For Vercel: paste the verification meta tag into `index.html` `<head>` and redeploy.
4. **Sitemaps** tab → submit `https://tradinghq.vercel.app/sitemap.xml`
5. Wait 24–72h for the first crawl.

## Weekly indexing routine
1. **Coverage report** → look at "Discovered – currently not indexed" and "Crawled – currently not indexed".
2. For each missing URL, paste it into the URL Inspection bar at the top → **Request Indexing**. (Limit: ~10–20/day.)
3. Submit any new URLs via IndexNow: `npx tsx scripts/submit-indexnow.ts` (Bing/Yandex; Google ignores but it's free traffic).
4. Re-submit `sitemap.xml` from Search Console → Sitemaps → click your sitemap → "..." → resubmit.

## Why pages don't get indexed (in order of likelihood)
1. **Thin content** — page has < 300 words of unique text. Fix: enrich content.
2. **Duplicate / near-duplicate** — same description across many pages. Fix: per-route unique descriptions (already wired via `SEOHead`).
3. **Orphan page** — no internal link points to it. Fix: ensure MegaFooter or a hub page links to every URL in sitemap.
4. **Slow Core Web Vitals** — LCP > 2.5s. Fix: lazy-load below-the-fold, preload hero font.
5. **JS-only rendering** — Googlebot can render JS but indexes it slower. Fix: every page must render meaningful HTML on first paint (Helmet handles `<title>`/meta; main content should not require API call to display).

## IndexNow setup (one-time)
1. Generate a key: `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`
2. Create `public/<KEY>.txt` with the key as the only content.
3. Set `INDEXNOW_KEY` env var locally and on Vercel.
4. Run `npx tsx scripts/submit-indexnow.ts` after each deploy.

## Bonus — Bing Webmaster Tools (free, often faster than Google)
1. https://www.bing.com/webmasters → import directly from Google Search Console (one click).
2. Submit sitemap. Bing typically indexes within 24h.
