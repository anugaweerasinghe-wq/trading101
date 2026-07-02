## Phase 2 — SEO Rescue + GEO + Retention Engine

Traffic dropped from 10-15/day to 2-3/day. This plan attacks all three causes: **crawl/index quality**, **generative-engine visibility (GEO)**, and **return-visitor retention**. Scope is additive — no redesign, no removal of existing features.

---

### 1. SEO Rescue (fix what's bleeding)

**Diagnosis first** (via Google Search Console API — already connected):

- Pull last 28d queries, pages, CTR, position, and impressions per URL.
- Identify pages that lost impressions vs 28d prior, and pages stuck at position 11-20 (page 2 — highest-leverage wins).
- Run URL Inspection on top 10 pages to detect indexing/coverage regressions.

**Fixes**:

- **Canonical audit** — every route uses `SEOHead` with a self-referencing canonical. Currently `Index.tsx` and several pages set canonicals manually with `Helmet` and some point at wrong URLs. Migrate all pages to shared `SEOHead` component.
- **Sitemap regeneration** — `sitemapGenerator.ts` is missing 100+ routes (compares, how-to, strategy, sectors, niche assets, about, contact, roadmap, reviews, daily). Rewrite to auto-include every static + programmatic route with correct `lastmod` (today) and priorities. Ping Google + Bing + IndexNow after deploy.
- **Robots.txt hardening** — allow all crawlers, unblock `/api/og/`, block admin routes (`/admin/*`, `/seo-audit`, `/adminvalidator`, `/admineditor`, `/adminreviews`).
- **Internal linking gaps** — audit orphan pages (Compare, HowToTrade, Strategy pages currently only linked from homepage). Add "Related" blocks at bottom of every content page (Wiki→3 related terms + 2 assets; Compare→related pairs; HowTo→related how-tos + strategy).
- **Title/description rewrites** for underperforming pages using proven SERP patterns: "X vs Y (2026): Which Is Better for Beginners?", "How to Trade X: 5-Step Beginner Guide", etc.
- **Duplicate/thin content sweep** — Compare/HowTo/Strategy templates need distinct intros per slug (currently share phrasing patterns).
- **404/soft-404 elimination** — `NotFound.tsx` must return proper meta + noindex.

### 2. GEO (Generative Engine Optimization for ChatGPT / Gemini / Perplexity / Google AI Overviews)

The next 12 months of search growth comes from LLM answer engines. TradeHQ needs to be *quoted*, not just ranked.

- **Answer-first content blocks** — every page gets a `<AIAnswerBlock>` at the top: single-paragraph, plain-English, 50-70 word direct answer to the page's primary query. LLMs pull these verbatim.
- **Comparison tables + stats blocks** — LLMs favor scannable, structured data. Add tables to Compare, HowTo, Strategy pages.
- **JSON-LD expansion**:
  - `Article` + `author` (Anuga Weerasinghe with sameAs GitHub/LinkedIn placeholders — ask user to confirm real URLs before publish)
  - `FAQPage` on every Compare/HowTo/Strategy/Wiki/Sector page
  - `HowTo` on all how-to guides
  - `BreadcrumbList` sitewide via new `<Breadcrumbs>` slot
  - `DefinedTerm` + `DefinedTermSet` on Wiki entries (GEO gold — LLMs use these)
  - `SoftwareApplication` with real `aggregateRating` sourced from the `reviews` table
  - `SpeakableSpecification` on TL;DR blocks (voice assistants)
- **llms.txt** — new `public/llms.txt` file (emerging standard, LLM crawlers read this) listing key pages with descriptions.
- **AI-friendly URL patterns** — verify all slugs are lowercase-hyphen (already a core rule).
- **Citations panel** — each Wiki/Learn page gets a "Sources" section citing Investopedia/SEC/CFTC where relevant (E-E-A-T + LLM trust signal).

### 3. Retention Engine (fix 97% single-session)

Users land, look once, leave. Add hooks that require coming back.

- **Daily Streak system** (localStorage, no login): visit-day counter, streak badge in nav, milestone toasts (3/7/14/30 days). Streak-loss "come back" indicator.
- **Weekly Recap card** on homepage: "Your week — 4 trades, +2.3%, best pick: NVDA". Reads from local portfolio history.
- **Watchlist alerts** — user pins assets; on next visit, homepage shows "AAPL moved +3.2% since your last visit". Pure client-side, powered by `pricePersistence.ts`.
- **Daily Challenge upgrade** — currently exists but static. Rotate 30 unique challenges, mark completion, show streak.
- **"Continue where you left off"** banner — last route visited + last asset viewed, top of homepage on return visits.
- **Web Push notifications (opt-in)** — service worker for daily challenge reminder + big market moves. Optional, dismissible, no dark patterns.
- **PWA install prompt** — `manifest.json` exists; add proper icons + install banner. Installed users return 3-5× more.
- **Email capture with a real hook** — "Get the weekly TradeHQ recap" (existing `NewsletterSignup` refresh with clearer value prop + double-opt-in).

### 4. Virality loop (compounding growth)

- **Shareable trade cards** — after any trade, generate a 1200×630 PNG (`/api/og/trade/:id` via edge function using `@vercel/og`-equivalent) with P&L, asset, TradeHQ branding. One-click share to X/Reddit.
- **Public portfolio pages** — `/u/:handle` route (optional handle set locally) so users can share their leaderboard rank. Adds social proof + backlinks.
- **Referral counter** — "Invite a friend, both get a badge" (badge only — no fake rewards).

### 5. Technical / performance / Core Web Vitals

Google position depends heavily on CWV.

- **Image audit** — convert PNGs to AVIF/WebP with `<picture>` fallback, add `loading="lazy"` + `decoding="async"` on all below-fold images.
- **Code-split heavy routes** — `React.lazy` for `AdminEditor`, `AdminReviews`, `SEOAudit`, `TradeAsset` chart libraries.
- **Preload critical fonts** with `rel="preload"`, subset to Latin.
- **Prefetch on hover** for internal Links (react-router already supports).
- **Meta viewport + `theme-color**` verified per route.

### 6. Google Search Console actions (I run these)

- Submit fresh sitemap.
- URL-inspect + request-index the top 20 revenue pages.
- Pull query-level report to feed the title/description rewrites in step 1.

---

### Technical implementation summary

**New files**:

- `public/llms.txt`
- `src/components/seo/AIAnswerBlock.tsx`
- `src/components/seo/Breadcrumbs.tsx` (with JSON-LD)
- `src/components/seo/RelatedContent.tsx`
- `src/components/retention/StreakBadge.tsx` (upgrade existing)
- `src/components/retention/WeeklyRecap.tsx`
- `src/components/retention/ContinueBanner.tsx`
- `src/components/retention/WatchlistAlerts.tsx`
- `src/lib/streaks.ts`, `src/lib/watchlistDiff.ts`, `src/lib/weeklyRecap.ts`
- `src/lib/pwa.ts` + updated `public/sw.js`
- `supabase/functions/og-trade/index.ts` (shareable trade cards)
- `scripts/regenerate-sitemap.ts` (auto-crawl all routes)
- `scripts/gsc-diagnose.ts` (pulls GSC data, prints top opportunities)

**Modified**:

- Every page component → migrate to `SEOHead` + `Breadcrumbs` + `AIAnswerBlock` + `RelatedContent`
- `src/lib/sitemapGenerator.ts` → full route enumeration
- `public/robots.txt` → hardened
- `public/manifest.json` → PWA polish
- `index.html` → theme-color, preloads, sitewide `Organization` + `WebSite` JSON-LD only (move per-route to Helmet)
- `src/App.tsx` → lazy routes, PWA registration
- `src/components/Navigation.tsx` → streak badge slot
- `src/pages/Index.tsx` → Continue banner + Watchlist alerts + Weekly Recap on return visits
- `src/components/NewsletterSignup.tsx` → new value prop

**Explicitly NOT in this phase**: no visual redesign, no color/typography change, no auth requirement (streaks stay local-only), no fake stats, no reward tokens.

---

### One question before I build

Two decisions from you:

1. **Author E-E-A-T for GEO** — LLMs weight `author.sameAs` heavily. Do you want me to include real profile URLs (GitHub, LinkedIn, X) for Anuga Weerasinghe in the Article schema? If yes, paste them; if not, I'll omit `sameAs` rather than fabricate.
2. **Web Push notifications** — OK to add opt-in browser push (daily challenge + big market moves)? It's the single biggest retention lever but some users find it aggressive. Default = **opt-in, one-time subtle prompt on day-2 return**.

Reply "go" (I'll omit sameAs + include opt-in push) or answer the two, and I'll ship Phase 2.  
  
1) no do not include  
2) yes do it.  
  
NOTE: ensure that you continue all the previous plans before starting with ANYTHING ELSE. EXTREMELY IMPORTANT NOTE. otherwise it will be a big fail.