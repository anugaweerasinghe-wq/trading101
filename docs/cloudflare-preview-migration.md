# TradeHQ — Cloudflare Pages staging migration

Status: PREVIEW ONLY. Vercel remains production; do not switch thetradehq.com or www.thetradehq.com without separate owner approval.

## Why code adaptation is required
TradeHQ generates hundreds of unique, SEO-aware static HTML routes. Vercel also implements two dynamic published-course handlers in api/course.ts and api/course-sitemap.ts. The Cloudflare preview build keeps prerendered pages, ports those two functions to Pages, and creates a 404 fallback which does not copy the indexable homepage.

## Creating a Cloudflare Pages staging project
1. In Cloudflare Workers & Pages, choose Pages with **Git integration** and connect the existing public repository anugaweerasinghe1-del/trading101.
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

## Verified cutover gates (2026-10-10)
- Reconnected GitHub account and repository: anugaweerasinghe1-del/trading101.
- Cloudflare Pages tradehq-preview deployment and Vercel preview succeeded from the new owner's migration-branch commit; a separate Workers Builds: thetradehq check failed. Do not confuse that Worker with the working Pages project.
- The owner tested auth, persistent sign-in, sign-out and portfolios on staging and verified five routes return 200 + noindex. Re-test after switching deployment branch or live environment flag.
- The Cloudflare SEO build now scopes noindex to pages.dev hostnames in live mode and keeps staging-wide noindex in non-live mode. Pages Functions must set their own response headers.
- Prerequisite: both PR validation workflows pass at the same reviewed branch head; only then merge into main.
- In Pages project Settings, change production branch from migration/cloudflare-pages-preview-20261010 to main; select npm run build:cloudflare with dist output.
- Set TRADEHQ_CLOUDFLARE_LIVE=1 in the PRODUCTION build environment only, never Preview. Redeploy and verify the resulting commit SHA and static SEO config before moving DNS.
- SAVE all current DNS values: apex/www A/CNAME, email MX/SPF/DKIM/DMARC, TXT Google verification and any CAA records; also preserve the last ready Vercel production deployment.
- Add www.thetradehq.com under Pages Custom domains only after the correct production build and SEO checks. Cloudflare may change its DNS record automatically; this is the actual traffic cutover.
- Verify the real www URL: TLS, redirects, homepage HTML, canonical, meta robots, ads.txt, robots.txt, sitemaps, lessons, login, portfolio, leaderboard, reviews, admin and unknown paths. If any critical problem, restore original DNS and Vercel quickly.
- After www is stable, use the Cloudflare FREE single redirect rule for apex: https://thetradehq.com/* to https://www.thetradehq.com/${1}, status 301, preserve query string; requires proxied apex DNS. Never redirect www back to apex.
- Keep Vercel active for rollback. Cloudflare Pages static delivery is free; Functions share Workers Free 100,000 requests/day. Free plan: 500 builds/month and up to 20,000 files/project. Backend, AI, DNS registration and integrations have separate quotas/costs; years-long zero cost is not guaranteed.

## Post-cutover release evidence — 10 October 2026

PRs #86, #87 and #88 passed both required exact-head validation workflows and external Pages previews before merging. Their merge SHAs also received successful production Pages deployments. Latest verified functional release: #88, `7f0e73f9e14118bf8f107f30b4c198e3306fb8cb`; deployment `73b2a9ca-1448-44b5-ae54-6c1ce4ca248f`. All eight live comparison routes passed HTTP/canonical/content checks and Chrome verified the Forex/Equities page. The fresh monitor on #87 passed 352 URLs and 12 browser routes. Full evidence and limits are in `autonomous-progress-20261010.md`.

Today's apex requests still redirect 308 through Vercel to www, which serves the site through Cloudflare. This is observed current behavior, not evidence that the suggested Cloudflare apex redirect was configured. Neither DNS nor the failed separate Worker was changed. Cloudflare dashboard access is currently blocked by sign-in, so Worker bindings/routes and actual quota consumption remain unverified.
