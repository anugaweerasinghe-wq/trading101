# Plan — Premium Logo Refresh + Full Indexing Hardening

Two parallel tracks. Each is scoped so nothing major in the app changes — only the brand mark and the build/SEO layer.

---

## Track 1 — New Logo (Premium, Symbol-Only)

### Direction
A single iconic mark — no wordmark anywhere. Apple/Nike/Adidas use the symbol alone in nav, OG images, favicons, app icons. We'll do the same.

**Mark concept — "Apex"**
A monolithic dark obsidian rounded-square plate (deep graphite gradient `#0A0A0F → #1C1C22`) with a single ascending wedge cut into it using a soft platinum-to-emerald gradient (`#E8ECF1 → #00E396`). The wedge is asymmetric (left edge taller than right) — suggests a breakout candle, but reads as pure geometry first. Subtle inner highlight on the plate gives it physical depth (like brushed aluminum / Vision Pro hardware), not flat material.

Why this satisfies "dark, premium, aesthetic, memorable":
- Dark plate = premium / hardware aesthetic (Apple, Tesla, Vision Pro)
- Single gesture inside = Nike-level memorability (recognizable at 16px)
- Emerald accent ties to existing Bloomberg palette (`#00E396`) so brand stays cohesive
- Works on light + dark backgrounds without inversion

### Files
- **Replace** `src/components/brand/BrandMark.tsx` — single SVG, gradients defined in `<defs>`, `showWordmark` prop kept for backward compat but defaults to `false`. All consumers already use the component.
- **Replace** `public/logo.svg` — same artwork, standalone (used by favicon/manifest/OG).
- **Add** `public/og-image.png` regen note: existing OG references stay, but mark in OG should be updated in a follow-up (out of scope for this pass to avoid scope creep).
- **Update** `src/components/Navigation.tsx`, `src/components/MegaFooter.tsx`, `src/components/trading/TradingSidebar.tsx` — remove `showWordmark` so symbol-only renders everywhere.
- **Update** `index.html` `theme-color` from cyan `#00FFFF` → `#0A0A0F` (matches new mark, also fixes the duplicate `theme-color` meta tag).

No other components touched. No layout reflow risk (mark is same bounding box).

---

## Track 2 — Maximize Indexing for ~150 Pages (Free Tier)

The site is a Vite SPA. Googlebot can render JS but does it slowly and unreliably — this is the #1 reason SPA pages don't get indexed. Fix = ship real HTML for every route. Everything below is free.

### A. Prerendering (the single biggest unlock)
Add `vite-plugin-prerender` (or `react-snap` post-build). At build time, a headless Chromium visits every route in `sitemap.xml` and writes the fully-rendered HTML to `dist/<route>/index.html`.

- Routes pulled directly from the existing sitemap generator (already enumerates 150+ URLs).
- Each route gets: real `<title>`, real `<meta description>`, real JSON-LD, real visible content — before any JS runs.
- Hydration takes over after load; users see no difference.

**Trade-off:** build time goes from ~30s → ~2–3 min. Acceptable, user approved.

### B. Per-Route Meta + JSON-LD via React Helmet Async
Currently most meta lives in `index.html` only — every route serves the same title/description to crawlers without prerender. After prerendering, we still need each route to *set* unique meta on mount.

- Install `react-helmet-async`, wrap `App.tsx` in `<HelmetProvider>`.
- Add `<SEOHead>` component used on every page (Index, Trade, TradeAsset, Markets, Portfolio, Learn, LearnArticle, LessonDetail, Leaderboard, AIMentor, WikiTerm, NicheAsset, SectorPillar, etc.) with: title, description, canonical, OG tags, Twitter tags, route-appropriate JSON-LD.
- Asset/wiki/niche/article pages already have rich content — we just surface it as proper meta.

### C. Sitemap + robots Hardening
- Split `sitemap.xml` into a sitemap index + chunked sitemaps if count grows past 200 (currently safe, but add the index now for headroom).
- Add `<lastmod>` from real file mtime (not today's date) so Google trusts crawl-priority signals.
- `robots.txt`: keep `Allow: /`, remove the `Disallow: /api/` ambiguity (it's followed by `Allow: /api/og/` which is fine), add explicit `Sitemap:` line (already there).

### D. IndexNow + GSC Submission Script
- Add `scripts/submit-indexnow.ts` — pings Bing/Yandex via the free IndexNow protocol with all sitemap URLs after deploy. (Google ignores IndexNow but Bing indexing helps surface signals.)
- Add `scripts/gsc-submit.md` — step-by-step doc for the user to: verify domain in GSC, submit `sitemap.xml`, use the URL Inspection API for ad-hoc requests. (Programmatic GSC submission needs OAuth — we'll document, not automate, to stay free + secret-free.)

### E. Internal Linking Audit
- Verify every page is reachable from `MegaFooter` + at least one contextual link. Programmatic pages (niche, wiki, sector) need to appear in topic hubs — Google won't index orphans.
- Add a `RelatedLinks` block to `WikiTerm`, `NicheAsset`, `SectorPillar` if not present (light addition).

### F. Core Web Vitals Quick Wins (helps indexing priority)
- Add `<link rel="preconnect">` for Supabase (already done for fonts).
- Defer non-critical scripts; lazy-load heavy components below-the-fold (`Hero` stays eager, everything else `React.lazy`).
- Add `loading="lazy"` + `decoding="async"` to all non-hero images.

### G. Canonical + hreflang
- Every page sets `<link rel="canonical">` to the absolute URL (prevents duplicate content from query strings, trailing slashes, preview domains).
- Add `<link rel="alternate" hreflang="en" />` and `hreflang="x-default"` (single-locale site, but this signals language clearly).

### H. Structured Data Coverage
- Homepage: `Organization` + `WebSite` + `SearchAction` (sitelinks search box eligibility).
- Asset pages: `FinancialProduct` + `BreadcrumbList` + `FAQPage` (already partly there — make consistent).
- Article pages: `Article` + `BreadcrumbList`.
- Wiki pages: `DefinedTerm` + `BreadcrumbList`.
- Validate via the existing `rich_results_validation_log.csv` workflow.

---

## Trade-offs (honest)

| Decision | Cost | Benefit |
|---|---|---|
| Prerender all 150 routes | +2 min build | ~10× indexing reliability |
| react-helmet-async on every page | ~10kb gzip + small refactor | Per-route meta — required for indexing |
| IndexNow only (no GSC API) | Manual GSC sitemap submit | Stays 100% free, no OAuth secrets |
| Symbol-only logo | Loses literal "tradehq" letters in nav | Matches Nike/Apple — the brief |
| Keep Bloomberg emerald in mark | Less "pure dark" than full mono | Brand cohesion across 150 pages |

---

## Execution Order (single message, no scope creep)

1. New `BrandMark.tsx` + `public/logo.svg` + theme-color fix.
2. Symbol-only update in Nav / Footer / Sidebar.
3. Install `react-helmet-async` + add `<SEOHead>` reusable component.
4. Wire `<SEOHead>` into all primary + programmatic pages.
5. Install + configure prerender plugin in `vite.config.ts`, sourcing routes from the sitemap generator.
6. Sitemap generator: lastmod from mtime, sitemap-index scaffolding.
7. Add `scripts/submit-indexnow.ts` + `scripts/gsc-submit.md`.
8. Lazy-load non-hero routes/components in `App.tsx`.
9. Add image `loading="lazy"` sweep.
10. Verify build, run `verify-build.js` locally against `dist/`.

Approve and I'll ship it.