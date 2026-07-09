## TradeHQ Bug-Fix Pass — Crawlability, Canonicals, Data Truth, Trust Pages

This is a **bug-fix only** pass. No visual redesign, no new AI features, no new sections. Every change below maps 1:1 to an item in the request.

---

### 1. Rendering / crawlability (root cause fix)

**Diagnosis (confirmed):** the project is a Vite + React SPA (`vite.config.ts` has no SSR/prerender plugin). `index.html` is served verbatim for every route, and `react-helmet-async` only mutates the head *after* JS hydrates. That is why `curl /`, `/markets`, `/wiki/macd`, `/learn-trading-guide` all return the same `<head>` and an empty `<div id="root">`.

**Fix — add build-time prerendering (SSG) to the existing Vite pipeline.** No framework migration, no SSR server, no runtime change. The published `dist/` will contain a real HTML file per route with that route's `<title>`, `<meta description>`, `<link rel="canonical">`, JSON-LD, and the primary rendered body copy (h1, hero text, main sections). SPA hydration continues to work as-is for interactive features.

Implementation:

1. Add `vite-plugin-prerender` (Puppeteer-based; renders each route in a headless browser after `vite build`, snapshots `document.documentElement.outerHTML`, and writes it to `dist/<route>/index.html`).
2. Enumerate routes from the same sources `scripts/generate-sitemap.ts` already uses (core pages + `assets.ts` IDs + `tradingGlossary.ts` slugs + `nicheData.ts` symbols + article slugs + how-to/compare/strategy slugs from `seoData.ts`). One shared route-list module so sitemap and prerender never drift.
3. Wire `vercel.json` so Vercel serves the prerendered `index.html` for each path and falls back to SPA routing for anything unknown.
4. Add a small `postbuild` step that fails the build if any prerendered HTML is missing `<title>`, `<meta name="description">`, `<link rel="canonical">`, or an `<h1>`.

**Verification (part of the same build):** `scripts/verify-build.js` gets extended to read the actual prerendered files in `dist/**/index.html` (not just HEAD the live URL) and assert per-route `title`, `description`, `canonical`, and non-empty h1 text. Build fails on any duplication of the homepage head across routes.

---

### 2. Canonical tags

Every page already renders `SEOHead` with a per-route canonical via `react-helmet-async` — but because there is no SSR/SSG, the raw HTML still shows the sitewide fallback `<link rel="canonical">` from `index.html`. Two changes:

1. **Remove the hardcoded `<link rel="canonical">` from `index.html`.** Each route owns its own canonical via `SEOHead` (already correct), which will now be baked into the prerendered HTML from step 1.
2. **Audit every page component and ensure it renders `SEOHead` (or `<Helmet>` with a self-referencing canonical)** — spot-fix any that use ad-hoc `<Helmet>` blocks with only a title. Pages to verify: `HowToTrade`, `HowToTradeIndex`, `Compare`, `CompareIndex`, `Strategy`, `StrategyIndex`, `Roadmap`, `About`, `Contact`, `Reviews`, `Daily`, `LearnArticle`, `LearnTradingGuide`, `LessonDetail`, `SectorPillar`, `WikiTerm`, `NicheAsset`, `TradeAsset`, `Trade`, `Markets`, `Portfolio`, `Learn`, `Leaderboard`, `AIMentor`, `Privacy`, `Terms`.
3. **Build-time duplicate-canonical check** added to the postbuild script: parse every `dist/**/index.html`, collect `<link rel="canonical">` values, fail if any URL appears twice.

---

### 3. Sitewide data inconsistency ($10K vs $100K)

Establish a single source of truth and reconcile everywhere.

1. Create `src/lib/constants.ts` exporting `STARTING_BALANCE = 100_000`, `STARTING_BALANCE_LABEL = "$100,000"`, `STARTING_BALANCE_SHORT = "$100K"`.
2. Grep the codebase for the literals `"$10,000"`, `"$10K"`, `"10000"` (in copy contexts), `"$100,000"`, `"$100K"` across `src/**`, `index.html`, `public/*.json`, `public/*.md`, `scripts/**`, and reconcile each hit to $100K — including meta descriptions, JSON-LD, hero copy, onboarding, `seoData.ts`, wiki articles, learn articles, `PremiumFeatures`, `PremiumHero`, `WhatIsTradeHQ`, `Hero`, `HowItWorks`, and any structured-data blocks.
3. Where the actual portfolio engine seeds the starting cash, import `STARTING_BALANCE` from the new constants module so future changes are one-line.
4. Add a build-time grep guard: fail the build if the strings `"$10,000"` or `"$10K"` appear anywhere under `src/`, `index.html`, or prerendered `dist/**/*.html`.

---

### 4. Sitemap and robots.txt

1. Migrate `scripts/generate-sitemap.ts` to consume the shared route-list module from step 1 so sitemap = prerender set = verify set. No route can be prerendered without appearing in the sitemap, and vice versa.
2. Update `BASE_URL` in the sitemap generator to `https://tradinghq.lovable.app` (matches the current published domain and the canonical/og:url convention from head-meta knowledge) — currently pointing at the old `vercel.app` domain. Confirm with user before flipping if they still want `vercel.app`.
3. Deprecate and delete `src/lib/sitemapGenerator.ts` (unused runtime duplicate that outputs a stale, partial list).
4. `public/robots.txt`: confirm no unintended `Disallow:` on indexable routes; keep the admin/private disallows; add/keep a single correct `Sitemap:` line pointing at the chosen domain.

---

### 5. Missing trust/policy pages

Status check:

- `/privacy`, `/terms`, `/about`, `/contact` already exist as routes (`src/pages/Privacy.tsx`, `Terms.tsx`, `About.tsx`, `Contact.tsx`) and are footer-linked via `MegaFooter.tsx`.

Bug-fix work:

1. Read each of the four pages and confirm the copy actually covers: (a) that TradeHQ is a free educational simulator with no brokerage relationship and no real money, (b) what is stored (localStorage only — trades, journal, watchlist, streaks) vs. what is sent to the server (only newsletter opt-in / contact form / review submissions), (c) no third-party ad tracking, (d) contact route, (e) author attribution for Anuga Weerasinghe on About. Patch any page whose copy is thin or generic.
2. Ensure all four routes have unique `SEOHead` (title, description, self-canonical, JSON-LD `WebPage`/`AboutPage`/`ContactPage` where relevant).
3. Confirm all four are included in the shared route list → sitemap → prerender.

---

### 6. Verification pass

After the above, run a single verify script that outputs a route-by-route checklist for:
`/`, `/markets`, `/wiki/macd`, `/wiki/bollinger-band-squeeze`, `/learn-trading-guide`, `/privacy`, `/terms`, `/about`

For each route, the script asserts (against the prerendered `dist/**/index.html`, i.e. no JS executed):

- Unique `<title>`
- Unique `<meta name="description">`
- Self-referencing `<link rel="canonical">`
- Non-empty `<h1>` and ≥ 200 chars of visible body text
- Contains `$100,000` (or is a policy page where the figure is not applicable — the script whitelists `/privacy` and `/terms` for this check)
- Appears in `dist/sitemap.xml`
- No `console.error` when the same URL is loaded in a headless browser

Output: a Markdown table pasted into the final reply.

---

### Explicitly NOT in this pass

- No visual redesign, no new components, no color/typography changes.
- No new AI features, no new retention widgets, no new schemas beyond fixing existing ones.
- No auth, no gating, no framework migration (staying on Vite + React Router, adding SSG only).
- Roadmap items and Phase 3+ features are deferred.

---

### Question before I build

1. **Canonical domain** — the current sitemap and every JSON-LD block still says `https://tradinghq.vercel.app`, but your live published URL is `https://tradinghq.lovable.app`. Do you want me to switch everything to `tradinghq.lovable.app` (recommended — matches what Google actually resolves), keep `tradinghq.vercel.app`, or point at a custom domain you're about to attach? This is a one-line change but it must be right before prerendering bakes it into every HTML file.  
  
Answer: NO KEEP EVERYTHING & CHANGE EVERYTHING TO "tradinghq.vercel.app" because that is the link in google and everything.  
IF it is inot much of a huge task continue phase 2b!