## 1. Clarify Learn vs Courses (split by role)

- `/learn` becomes the **free reference hub**: articles, glossary, country guides, calculators. The Foundations / Intermediate / Advanced "lesson tier" blocks stay but are relabelled **"Quick reads"** and visually separated from courses.
- `/courses` becomes the **only** place with structured multi-lesson tracks, quizzes and badges.
- Add a single clear explainer banner at the top of `/learn` ("Two ways to learn: quick reads vs. structured courses") with one primary CTA to `/courses`.
- Same explainer, mirrored, on `/courses` pointing back to `/learn`.
- Nav + MegaFooter: group "Learn (guides)" and "Courses (structured)" as distinct labelled items.
- No routes removed, so no redirects or sitemap churn.

## 2. Futures course cover image

Regenerate `src/assets/courses/futures-hero.jpg` as a **no-text** abstract dark-green futures/derivatives visual (candles + order-ladder feel) matching the other three covers. Title text already renders in HTML over the image, so nothing else changes. Other three covers untouched.

## 3. Real trader accounts + real leaderboard

Accounts (optional — the whole app keeps working signed-out):

- Email + password sign-up/sign-in via Lovable Cloud auth, plus Google sign-in. New `/auth` page and a `/reset-password` page.
- `profiles` table: `id`, `username` (unique), `country`, `bio`, `is_public`, `created_at`. Auto-created on signup by trigger.
- `trader_stats` table: portfolio value, total P&L %, trades, win rate, max drawdown, badges count, `updated_at` — written only by the owner, read publicly **only when `is_public = true**`.
- Signed-in users get a "Sync my stats" action; local browser portfolio stays the source of truth and is pushed to the server on trade + on load (debounced). Signed-out users lose nothing.
- `/trader/me` gains a real public counterpart `/trader/:username` (indexable, with Person/ProfilePage JSON-LD, noindex if private).

Leaderboard:

- **All simulated traders removed.** `src/lib/leaderboardEngine.ts` deleted; `/leaderboard` reads real opted-in public profiles ranked by P&L %.
- Honest empty state: "No public traders yet — be the first" + sign-up CTA, plus a clear note that all figures are simulated practice results, not real money.
- Anti-nonsense guards: minimum 5 trades and account age ≥ 24h to appear; server-side clamping of impossible values.

## 4. Challenge-a-friend duels

- `duels` table: `id`, `code` (short slug), `creator_id`, `opponent_id`, `starts_at`, `ends_at` (30 days), `status`.
- `/challenge` page: create a duel → shareable link `/challenge/:code`. Opponent opens it, signs in, joins. Both start from the standard $100,000 practice balance (a duel snapshot of starting equity is recorded, so no wallet reset is forced).
- Duel view shows both traders' P&L side by side, days remaining, and who's ahead; a "Duels" tab on `/leaderboard` lists active/finished head-to-heads.
- Web-share + copy-link, with the educational-simulation disclaimer attached to every share string.

## 5. Full site audit (all ~217 routes)

A sweep script + manual review across every route in `scripts/routes.ts`, checking and fixing:

- **Fabricated data**: any invented user counts, testimonials, win rates, "traders trust us" numbers, fake activity tickers (`SocialProofTicker`, `MarketStats`, `RecentAnalysis`, homepage social proof), unverifiable performance claims.
- **YMYL / AdSense hardening**: every financial page carries the educational-simulation disclaimer, author attribution + last-reviewed date, cited sources (FRED, CME, SEC/Investor.gov, BLS), and no advice-shaped phrasing ("you should buy", "guaranteed").
- **Replace, don't just delete**: where fake stats are removed, substitute genuinely useful content — worked examples, formulas, risk tables, source-linked definitions — so no page becomes thin.
- **Thin-page check**: flag every route under ~400 words and either enrich it or drop it from the sitemap.
- Re-run the existing SEO verification + prerender guards at the end.

### Technical notes

- Auth: Cloud email/password + Google; `onAuthStateChange` listener, `getUser()` for trusted checks, email-confirm flow respected.
- Every new public table gets explicit GRANTs, RLS enabled, and owner-scoped policies (`anon` SELECT only on public profiles / duels).
- No changes to existing local-storage portfolio logic beyond an optional sync layer.
- Order of work: (2) image → (1) Learn/Courses → (3) auth + leaderboard → (4) duels → (5) audit.  
  
ensure that the sign in is optional and not compulsory, if the user wants to sign in, make sure that all their details are safely stored (should be free on my side as well), and even without the sign in, the user must be able to access everything, but the /leaderboard doesn't show their rankings and all. any questions before you begin? btw claude by anthropic did a thorough scan and found that there are incosistencies with the numbers, in one place it is 10k other places it is 100k, fix all these incosistencies, remove fake data, final output: premium, aesthethic apple-like layout multi-million dollar feeling site (dont change anything else other than the things in this plan)