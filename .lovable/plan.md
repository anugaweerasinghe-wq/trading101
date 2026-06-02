
# World-Class Plan — Indexing Blitz + Retention Engine

Built around the 30-credit budget. Every item is implementable by me, free, and ordered by impact-per-credit.

---

## Part 1 — Quick Wins (Credits: ~2)

**A. Sitemap recrawl push**
- Update `scripts/generate-sitemap.ts`: bump every `lastmod` to `2026-06-02` and switch `changefreq` on deep pages (`/trade/*`, `/wiki/*`, `/niche/*`) from `weekly` → `daily` for a 2-week recrawl window, then we can revert.
- Re-run generator so `public/sitemap.xml` regenerates on next build.

**B. Button readability fix**
- "Start Trading Free" (Hero) and "Claim Bonus" (Portfolio): currently white-on-light-glass. Switch to filled solid using `--primary` (Electric Neon) with `--primary-foreground` (black) text → WCAG AAA contrast, matches design system, no custom colors.
- Add subtle `shadow-glow-cyan` for premium feel.

---

## Part 2 — Maximum-Aggression Indexing (Credits: ~4)

Goal: get all ~150 pages indexed in 7–14 days instead of months.

1. **IndexNow auto-submit on deploy** — Extend `scripts/submit-indexnow.ts` to read every URL from `sitemap.xml` and POST to Bing/Yandex in one batch. Add a `postbuild` npm script. Bing crawls within hours; Bing-indexed pages often surface in Google faster via discovery.
2. **Google Search Console API auto-submit** — Use the connected `google_search_console` connector. Create `scripts/gsc-submit.ts` that calls the URL Inspection API to request indexing for every sitemap URL on every deploy. Honors the daily 200-URL quota with batching state in `/tmp/gsc-submitted.json`.
3. **Internal link injection (the real unlock)** — 37/45 clicks stayed on homepage. Crawlers do the same. Add to homepage:
   - New "Explore 150+ Trading Topics" section: 3-column hub linking to top wiki terms, top assets, top articles (randomized per pageload so all 150 rotate through homepage crawls).
   - "Trending Now" strip in `MegaFooter` showing 12 random deep links.
4. **Sitemap split** — Create `sitemap-index.xml` referencing `sitemap-core.xml`, `sitemap-assets.xml`, `sitemap-wiki.xml`, `sitemap-niche.xml`. Google prioritizes split sitemaps and reports coverage per group → easier diagnosis.
5. **`<lastmod>` on real edit** — Already wired via `mtimeOf()`. Confirm and extend to all URL types.

---

## Part 3 — Retention Engine: "Come Back Daily" (Credits: ~18)

This is the differentiator. TradingView/Webull do not have any of this together. Built as one cohesive system with localStorage persistence (no auth required = zero friction).

### 3A. Daily Trading Challenge + Streak System

New page `/daily` + homepage hero card.

- **Challenge generator**: deterministic per UTC date — picks one asset + one scenario type from a curated bank (e.g. "NVDA pre-earnings: long or short?", "Bitcoin breaks $100k support: your move?", "Tesla insider selling — react"). 365 unique challenges seeded.
- **Streak tracking** (localStorage): consecutive days completed, longest streak, total challenges. Visible badge in nav (🔥 7).
- **Daily leaderboard** (Supabase): users opt-in with a display name → row in new `daily_results` table. Resets at UTC midnight.
- **Unlock badges**: Day 3, 7, 14, 30, 100 → "Bronze Trader", "Iron Hand", "Diamond Mind". Stored localStorage, displayed on profile.
- **Why it works**: Duolingo-style streak fear-of-loss + daily variety + social proof leaderboard.

### 3B. Live Market Pulse Dashboard (Homepage centerpiece)

New `<MarketPulse />` component above-the-fold (replaces no existing content — joins the split hero).

- **Fear & Greed Index** (computed from `useLiveMarketData` momentum across top 20 assets) — animated dial 0–100.
- **Sector Heatmap** — 11 sector tiles colored by today's perf. Click → filter trade page.
- **"What's Moving Now"** — top 3 gainers + top 3 losers, auto-refreshing every 30s.
- **Market Clock** — NYSE/NASDAQ/LSE/TSE open/closed badges with countdown to next bell.

Habit-forming: same purpose as people checking stocks app 8x/day.

### 3C. AI Trade Coach (personalized report card)

New page `/coach` + a "Get Your Report Card" CTA on Portfolio.

- After each closed trade, capture entry/exit/size/asset/timing into `tradingJournal`.
- "Generate Daily Report Card" button → calls existing `trading-mentor` edge function with full journal context → returns:
  - Strengths (e.g. "You exit winners well")
  - Weaknesses (e.g. "Revenge trading after 2 losses — 73% of your losses follow a loss within 1h")
  - One actionable lesson for tomorrow
  - Personalized risk score
- Cached per-day (localStorage `coach:report:${date}`) → free, no extra AI cost on revisit.
- Shareable image export ("My TradeHQ Report Card — Day 14 streak, +12% practice gain") → viral loop.

### 3D. Split Hero (per your answer)

Keep existing intro/copy. Add right-column card showing:
- Today's challenge preview ("Today: NVDA earnings reaction — 3,421 traders played")
- Current streak (if any) OR "Start your streak"
- Live Fear & Greed mini-dial
- Bottom CTA: "Start Trading Free →" (now readable, primary fill)

---

## Part 4 — World-Class Polish (Credits: ~4)

- **Activity ticker** (bottom strip site-wide): "Tomás in 🇫🇷 just closed +8.2% on EURUSD" — pulled from anonymized leaderboard rows. Social proof in real-time.
- **OG image generator**: per-page dynamic OG images for wiki/asset pages → higher CTR on shared links.
- **JSON-LD `Quiz` schema** on daily challenge → eligible for Google rich results.
- **`Speakable` schema** on glossary → eligible for voice search.
- **`prefetch` on hover** for nav links → instant page transitions (Lighthouse + UX).
- **WebSite SearchAction JSON-LD** → enables Google sitelinks search box.

---

## Technical Details

**New files**
- `scripts/gsc-submit.ts` — programmatic Search Console submission via connector gateway
- `scripts/generate-sitemap-index.ts` — split sitemap generator
- `src/pages/Daily.tsx`, `src/pages/Coach.tsx`
- `src/lib/dailyChallenge.ts` — 365 seeded challenges + streak engine
- `src/lib/marketPulse.ts` — fear/greed computation, sector aggregation
- `src/components/home/MarketPulse.tsx`, `src/components/home/SplitHero.tsx`, `src/components/home/DiscoverHub.tsx`
- `src/components/ActivityTicker.tsx`
- `src/components/badges/StreakBadge.tsx`

**Supabase migration**
- `daily_results` (id, display_name, challenge_date, score, asset, decision, created_at) — RLS: public insert + public select today only.
- GRANT block included per project rules.

**Files modified**
- `scripts/generate-sitemap.ts` — bump lastmod to 2026-06-02, daily changefreq on deep pages
- `scripts/submit-indexnow.ts` — read from sitemap, batch
- `package.json` — add `postbuild: indexnow + gsc-submit`
- `src/pages/Index.tsx` — integrate SplitHero + MarketPulse + DiscoverHub
- `src/pages/Portfolio.tsx` — fix Claim Bonus button + add Coach CTA
- `src/components/Hero.tsx` — fix Start Trading Free button
- `src/components/Navigation.tsx` — streak badge
- `src/components/MegaFooter.tsx` — Trending Now strip
- `src/App.tsx` — `/daily`, `/coach` routes + SEOHead on every page

**Trade-offs noted**
- localStorage-first means streaks reset if user clears browser → mitigated by optional Supabase save with display name only (no email/auth = zero friction).
- 365 seeded challenges is finite → year 2 reuses with shuffle; in practice users won't notice.
- GSC API quota = 200 URLs/day → 150 pages submits in 1 day, then daily delta only.

---

## Recommended Build Order

1. Part 1 (sitemap date + button fix) — ship in first commit
2. Part 2 (indexing) — ships immediately after to start the crawl clock
3. Part 3A + 3D (Daily Challenge + Split Hero) — biggest retention lever
4. Part 3B (Market Pulse) — homepage habit hook
5. Part 3C (AI Coach) — depth + virality
6. Part 4 (polish) — only if credits remain

---

## Out of Scope (intentionally)

- Geo-personalization (you opted out)
- Pre-rendering / SSG (kept off per earlier decision — build stability)
- Auth/signup (kept frictionless; everything works anonymously)
- Paid ads, social media automation (not implementable by me alone)

Approve and I'll execute top-to-bottom.
