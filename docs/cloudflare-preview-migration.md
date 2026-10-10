# TradeHQ — Cloudflare Pages staging migration

Status: PREVIEW ONLY. Vercel remains production; do not switch thetradehq.com or www.thetradehq.com without separate owner approval.

## Why code adaptation is required
TradeHQ generates hundreds of unique, SEO-aware static HTML routes. Vercel also implements two dynamic published-course handlers in api/course.ts and api/course-sitemap.ts. The Cloudflare preview build keeps prerendered pages, ports those two functions to Pages, and creates a 404 fallback which does not copy the indexable homepage.

## Creating a Cloudflare Pages staging project
1. In Cloudflare Workers & Pages, choose Pages with **Git integration** and connect the existing public repository anugaweerasinghe-wq/trading101.
2. For this isolated staging project, choose the branch migration/cloudflare-pages-preview-20261010 as the production branch. Do not use main yet.
3. Choose Vite; repository root as project root; build command **npm run build:cloudflare**; output directory **dist**; Node.js 22 or 24.
4. Select Free only. Do not enable billing, paid Workers plans or paid API fallbacks.
5. Leave both thetradehq.com and www.thetradehq.com connected to Vercel. Do not edit any DNS records.
6. The preview build deliberately writes a site-wide X-Robots-Tag: noindex header in dist/_headers, including for the staging project's main pages.dev address. Cloudflare preview deployments also apply protections. Verify response headers on staging before sharing it. Do NOT set TRADEHQ_CLOUDFLARE_LIVE=1 yet. At an owner-approved live cutover, that build-time flag is required to remove the staging-wide noindex header, followed by a crawler/SEO regression test.

## Required verification BEFORE considering DNS cutover
- Unique raw HTML, canonical, title and H1 for /, /markets, /wiki/macd, /privacy and /terms.
- Static authored courses and a genuinely published database-backed dynamic course/lesson; /course-sitemap.xml returns live approved entries.
- /auth, /reset-password, /admin, /trader/me and /challenge/demo load the React UI, are noindex, and survive refresh.
- /robots.txt, /sitemap.xml, /ads.txt, favicon, manifest and social preview assets remain available.
- Verify signed-in accounts, Google login redirect allowlist, password reset, portfolios/orders, leaderboard, reviews, daily questions, course approvals and all admin tools.
- Verify unknown routes return 404 instead of receiving the indexable homepage; no client-only route is indexed.
- Confirm cost: Pages static requests are free; Functions share the 100,000/day Workers Free requests allowance. Audit actual counts and independent Lovable Cloud/Supabase quotas.
- Confirm Cloudflare Pages build size and files remain under free limits; no required paid integration.
- Test viewport/browser compatibility, deploy readiness and a rollback procedure.

## High-risk cutover: request separate owner approval
- Save existing DNS and email MX/SPF/DKIM/DMARC and Google Search Console TXT verification.
- Preserve https://www.thetradehq.com as canonical and redirect apex to www permanently.
- Verify SSL, redirects, Google Search Console ownership, both XML sitemaps, ads.txt, robots.txt, AdSense page scripts, static SEO content and real user sign-in.
- Keep Vercel available for rollback until production is stable.
- No Google Search Console property reset is needed solely for hosting changes.
- Backend and domain migration are distinct; the Lovable/Supabase backend is NOT being moved in this batch.

Important: A successful GitHub build or draft PR is not proof Cloudflare deploys or signed-in functionality works. Record a real pages.dev preview URL and test results before approval.
