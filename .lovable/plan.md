## Goal

Make `https://www.thetradehq.com` the single canonical domain everywhere, and make the site easier for Google to crawl fully.

## Current state (verified)

The old domain `tradinghq.vercel.app` is hardcoded in ~50 files. There are four separate domain constants that can drift apart:

- `scripts/routes.ts` → `DOMAIN` (drives sitemap + prerender canonicals)
- `src/lib/constants.ts` → `SITE_DOMAIN`
- `src/lib/seoData.ts` → `SITE_DOMAIN` (duplicate)
- `src/components/SEOHead.tsx` → local `DOMAIN` const

Plus literal strings in `index.html` (11), ~40 page/component files, `public/robots.txt`, `public/sitemap.xml` (270 URLs), `public/llms.txt`, and `scripts/` (verify-seo, verify-build, submit-indexnow, gsc-submit). One `.lovable.app` link pair lives in the newsletter edge function. The only `http://` hits are schema XML namespaces, which must stay unchanged.

## Plan

**1. One source of truth for the domain**
- Set `SITE_DOMAIN = "https://www.thetradehq.com"` in `src/lib/constants.ts`.
- Re-export it from `src/lib/seoData.ts` instead of redeclaring, and have `SEOHead.tsx` import it rather than keep its own copy.
- Set the same value in `scripts/routes.ts` (`DOMAIN`) — scripts can't import from `src/`, so this stays a second literal, guarded by step 5.

**2. Replace every hardcoded literal**
- `index.html`: `og:url`, `og:image`, `twitter:image`, and all three JSON-LD blocks (SoftwareApplication, EducationalOrganization, BreadcrumbList) → new absolute domain.
- All `src/pages/*` and `src/components/*` occurrences (JSON-LD `url`/`@id`/`item`, share links, breadcrumbs) → new domain; where the file already imports a domain constant, prefer the constant over a literal.
- `supabase/functions/send-newsletter/index.ts`: the two `tradinghq.lovable.app` CTA links → new domain.
- Leave `http://www.sitemaps.org/...` and `http://www.w3.org/...` namespaces untouched.

**3. robots.txt + sitemap**
- `public/robots.txt`: header comment and `Sitemap: https://www.thetradehq.com/sitemap.xml`. Keep existing per-crawler blocks and admin disallows.
- Regenerate `public/sitemap.xml` via `scripts/generate-sitemap.ts` so all ~270 URLs carry the new host.
- Per sitemap policy: the generator currently stamps every entry with a build-time `TODAY` value, which is not a page-specific timestamp. Remove the `<lastmod>` emission rather than shipping 270 identical fake dates — Google ignores/distrusts them anyway.

**4. Relative paths for runtime navigation**
- Confirm no in-app `<Link>`/`fetch` targets use the absolute domain (currently they don't — hits are all metadata/share strings). Any share/copy links that need an absolute URL will use `window.location.origin` so preview environments stay correct; only crawler-facing metadata keeps the hardcoded canonical domain.

**5. Guards + crawl improvements**
- `scripts/verify-seo.mjs` and `scripts/verify-build.js`: update their `DOMAIN`/`BASE_URL` defaults, so the post-build check fails loudly if any canonical still points at the old host.
- Add a check to the verify script that greps `dist/` for `tradinghq.vercel.app` and `lovable.app` and fails the build if found.
- `scripts/submit-indexnow.ts`: default host → `www.thetradehq.com`.
- `public/llms.txt` and `scripts/gsc-submit.md`: update URLs and the Search Console instructions to reference the new property.
- Leave the historical CSV/JSON audit artifacts in `public/` (old reports) as-is unless you want them rewritten too.

**6. Verify**
Run build → prerender → `verify-seo.mjs`, confirming every route's canonical, `og:url`, and sitemap entry is `https://www.thetradehq.com/...` and that the old host appears nowhere in `dist/`.

## Note

DNS/domain connection itself is separate — once the code ships, point `www.thetradehq.com` at the project in Project Settings → Domains, add both apex and `www` (with `www` as primary), and submit the new sitemap in Search Console.
