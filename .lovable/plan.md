# TradeHQ — Growth, Trust & CTR Plan

Three workstreams shipped in one round: (1) full **$10K → $100K** rebrand, (2) **CTR 3.1% → 6%** machinery (rich-result schema sitewide + a written marketing strategy doc you approve), and (3) **homepage→deeper-page funnel + retention** layer (interactive hero, exit-intent, web push, optional account sign-in).

---

## Part 1 — $100K Virtual Cash Rebrand (full sweep)

Replace every `$10,000` / `$10K` / `10000` reference — visible copy, engine logic, AI prompts, SEO meta, sitemap'd snippets.

**Files touched (audit pass):**

- Engine: `src/lib/portfolio.ts`, `src/lib/portfolioHistory.ts`, `src/lib/leaderboardEngine.ts`, `src/lib/priceSimulation.ts` — starting balance, weekly refill amount.
- Copy: `src/components/PremiumHero.tsx`, `WhatIsTradeHQ.tsx`, `HowItWorks.tsx`, `PremiumFeatures.tsx`, `PremiumFAQ.tsx`, `MegaFooter.tsx`, `home/MarketPulse.tsx`, `home/DailyChallengeCard.tsx`, `CompoundCalculator.tsx`, `NewsletterSignup.tsx`.
- Pages: `Index.tsx`, `Trade.tsx`, `TradeAsset.tsx`, `Portfolio.tsx`, `Learn.tsx`, `LearnArticle.tsx`, `LearnTradingGuide.tsx`, `Markets.tsx`, `AIMentor.tsx`, `Leaderboard.tsx`, `NicheAsset.tsx`, `SectorPillar.tsx`, `WikiTerm.tsx`.
- SEO: `index.html`, `src/components/SEOHead.tsx` defaults, `public/sitemap.xml` (regenerated), `scripts/generate-sitemap.ts`, `public/meta_variants.csv` + `meta_turbo_variants.csv`.
- AI: `supabase/functions/trading-mentor`, `trading-advisor`, `market-analysis`, `analyze-trading-psychology`, `scenario-parser` system prompts.
- Migration: bump existing localStorage balance from $10K baseline to $100K **on first load after deploy** via a one-shot version key (`tradehq:balance-migration:v2`) so existing users aren't disadvantaged — fresh users start at $100K.

**Why $100K works psychologically:** higher number = perceived bigger sandbox, removes "feels like pocket change" friction for forex/oil/index traders, and aligns with industry norms (Investopedia, ThinkOrSwim paperMoney both start ≥$100K).

---

## Part 2 — CTR 3.1% → 6% Marketing Strategy

### 2A. Strategy document (deliverable: `/public/ctr-doubling-plan.md`)

Written, not auto-applied. You review then approve specific tactics. Sections:

1. **Psychology levers** (Cialdini + Nielsen Norman + Backlinko CTR studies):
  - **Curiosity gap** — titles end with unfinished thought ("…here's why").
  - **Numbers + brackets** — `[2026]`, `(Free)`, `(No Signup)`. Backlinko: brackets +33% CTR.
  - **Power words** — Free, Instant, Proven, Secret, Risk-Free, $100K.
  - **Loss aversion** — "Stop losing on real money — practice first".
  - **Specificity** — "150+ Assets", "$100K", "3-min setup" beat round/vague numbers.
  - **Year freshness** — 2026 in every title that ranks for evergreen queries.
2. **Title formula** — `{Primary KW} — {Benefit/Number} | TradeHQ {Year}` capped at 58 chars.
3. **Description formula** — Hook (curiosity/loss) + Proof (number) + CTA verb + "(Free, no signup)". 150–158 chars.
4. **Competitor SERP teardown** — Investopedia, TradingView, Webull paper, ThinkOrSwim, Wall Street Survivor. What words they use, what FAQ snippets they own, where the gaps are.
5. **Page-by-page rewrite table** for the 15 seed URLs (current title → new title → reason).
6. **Tracking** — extend `public/monitoring_plan.csv` with CTR-per-URL targets and rollback rules (already partially there).

### 2B. Rich-result schema expansion (shipped this round)

Maximize SERP real estate so Google gives us more pixels = higher CTR even at same position.


| Page type                        | Schema added                                                                                         | SERP win                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `/` (home)                       | `WebSite` + `SearchAction` + `Organization` w/ `sameAs` + `AggregateRating` (educational disclaimer) | Sitelinks search box, brand panel            |
| `/learn`, `/learn-trading-guide` | `Course` + `LearningResource` + `EducationalOrganization`                                            | "Course" rich card                           |
| `/learn/:slug` (articles)        | `Article` + `BreadcrumbList` + `Author` (TradeHQ Editorial) + `Speakable`                            | Top stories / voice search                   |
| `/trade/:asset`                  | `FAQPage` + `BreadcrumbList` + `HowTo` ("How to practice trading X")                                 | FAQ accordion + HowTo carousel               |
| `/wiki/:term`                    | `DefinedTerm` + `DefinedTermSet` + `BreadcrumbList`                                                  | Definition snippet                           |
| `/leaderboard`                   | `ItemList` (top 10 traders)                                                                          | List rich result                             |
| All pages                        | `BreadcrumbList` site-wide                                                                           | Sitelinks-style breadcrumbs replace ugly URL |


Validate via `https://search.google.com/test/rich-results` and log to `public/rich_results_turbo_log.csv`.

### 2C. CTR-helper micro-changes shipped now (no copy rewrite yet)

- Add `<meta name="news_keywords">` + `<meta name="robots" content="max-snippet:-1, max-image-preview:large">` (already partly there — extend).
- Add `<link rel="preconnect">` for fonts → faster LCP → better ranking → better CTR.
- Favicon dark-mode variant (already have light) — branded SERP icon = +CTR on mobile.

**Realistic forecast:** schema rollout typically lifts CTR 15–35% on affected queries within 2–4 weeks (Google Search Central case studies). Combined with title rewrites once you approve them, doubling from 3.1% → 6% in 60–90 days is plausible but not guaranteed.

---

## Part 3 — Fix the "97% only see homepage" problem

### 3A. Interactive hero (live mini-chart + 1-click "Try a demo trade")

Replace the current static stats grid in `PremiumHero.tsx` with an **embedded micro-terminal**:

```text
┌──────────────────────────────────────────────────────┐
│  BTC/USD  $68,241  ▲ +2.3%       [ live sparkline ] │
│  ──────────────────────────────────────────────      │
│  [ Buy $100 demo ]   [ See full chart → ]            │
└──────────────────────────────────────────────────────┘
```

- Uses existing `useHybridMarketData` + a 60-tick sparkline.
- "Buy $100 demo" → instantly opens a success toast ("You bought 0.0014 BTC — view in your portfolio") and routes to `/trade/btc` with that position pre-seeded.
- Psychology: **zero-friction first action** (Hooked model "trigger→action→reward→investment"). The smallest possible commitment from the user creates ownership.

### 3B. Exit-intent + scroll-depth modal

New component `src/components/EngagementModal.tsx`:

- **Trigger A:** mouse leaves viewport top (desktop) — "Wait — try today's Daily Challenge before you go. 60-second scenario, free."
- **Trigger B:** 70% scroll on mobile — same offer.
- **Trigger C:** 25s idle on home — soft nudge to AI Mentor.
- Suppressed for 7 days after dismissal (localStorage), suppressed entirely on /trade and /portfolio (don't interrupt active users).

### 3C. Move Daily Challenge card above-the-fold

Already lifted higher last round — verify it's between hero and "What is TradeHQ?" not below it.

### 3D. Sticky bottom CTA bar on home (mobile only)

After 30% scroll, a thin bar slides up: **"Start with $100K virtual cash →"**. Closes on tap-X (session-only).

---

## Part 4 — Retention layer (revisits, loyalty, trust)

### 4A. Web Push notifications

New: `public/sw.js` (push-only worker, NOT app-shell PWA — per skill rules), `src/lib/push.ts`, edge function `supabase/functions/send-push`.

- **Opt-in moment:** *not* on page load. Triggered after user completes their first Daily Challenge ("Want a reminder tomorrow to keep your streak?") — context-relevant ask = 4x higher accept rate vs cold prompt.
- **Push triggers:**
  - Streak warning (22 hours since last challenge, before reset).
  - Big market move on a watchlisted asset (>3% in 1h).
  - New weekly leaderboard reset.
- VAPID keys via `add_secret` (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`) — you'll generate them once via `npx web-push generate-vapid-keys`; I'll guide you.
- Subscriptions stored in new table `push_subscriptions(user_id nullable, endpoint, p256dh, auth, created_at)` with RLS allowing anon insert (endpoint is the auth) and service-role read.

### 4B. Optional account system (sign-in, not gated)

Lovable Cloud auth: **email/password + Google** (defaults). Everything stays free without signing in — signing in just unlocks:

- Cross-device sync of portfolio, streak, watchlist.
- Real leaderboard entry (vs current local-only).
- Custom username + badge in leaderboard.

Schema:

```sql
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz default now()
);
-- + grants + RLS (public read username, owner write)
```

Sync trigger: on auth event, push local `tradehq:*` localStorage to a `user_state` JSONB table; pull on next login.

### 4C. Trust / EEAT boost (cheap, high impact for both CTR and retention)

- New `/about` page — team blurb (even if 1 person), mission, "Why we built this", contact.
- Add visible **disclaimer badge** in footer linking to `/disclaimer`.
- Add `Organization` JSON-LD `sameAs` array (GitHub, Twitter, LinkedIn — even if placeholders the user fills in).
- Author bylines on `/learn/:slug` ("TradeHQ Editorial" + reviewed date) — Google E-E-A-T requirement.

---

## Part 5 — Audit pass (duplicates / errors / dead code)

Run during build mode:

- `rg "10,000|10K|\\$10000"` to confirm zero stragglers after rebrand.
- `rg "text-white"` to confirm contrast cleanup is complete (last round may have missed places).
- Check `App.tsx` for duplicate route registrations.
- Verify `BackgroundMusic.tsx` actually plays (audit replay shows no music events — fix autoplay-policy: require first user gesture, persist `tradehq:bg-music-on` correctly).
- Run `seo--list_findings` + scanner; fix any open items.
- Run `security--run_security_scan`; fix new findings introduced by `profiles` + `push_subscriptions` tables.

---

## Implementation order

1. **$100K rebrand** + balance migration (highest user-visible impact).
2. **Schema expansion** + breadcrumb component (CTR foundation).
3. **Interactive hero** + sticky mobile CTA + exit-intent modal.
4. **Push notifications** infra (needs you to generate VAPID keys mid-flow).
5. **Auth + profiles + cross-device sync**.
6. **Trust pages** (/about, author bylines) + final audit + CTR strategy doc dropped in `/public/ctr-doubling-plan.md`.

## What I need from you mid-build

- One command run on your machine: `npx web-push generate-vapid-keys` → paste the two keys when I prompt `add_secret`.
- Confirmation to enable **Email/password + Google** auth (Lovable Cloud defaults). Google needs no extra config from you.

## Out of scope (call out so you know)

- Dynamic per-route OG images (you skipped — fine, current static OG works).
- Title rewrites are **planned in the doc, not auto-applied** — you approve titles individually after reading the strategy.
- No native mobile / app store work.
- No paid ads, no backlink purchases — all tactics are free/organic.  
  
Ask any questions if necessary, I need you to also remove the AI mentor throughout the entire site or perhaps intergate something else into it. because the lovable ai credits for ai is finished. Let me know this also.