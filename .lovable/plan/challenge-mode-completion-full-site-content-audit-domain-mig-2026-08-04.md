# Challenge mode completion, full-site content audit, domain migration check

## 1. Finish the challenge-a-friend experience

Current state: `/challenge` and `/challenge/:code` exist, the `duels` table exists, and the route is in the sitemap manifest. What is missing is the surrounding experience.

- **Invite screen**: opening `/challenge/:code` while signed out shows a proper invite card — who challenged you, the $100,000 practice starting capital, the 30-day window, and a single "Sign in to accept" action that returns to the invite after auth (intended path stored, not used as the OAuth redirect target).
- **Referral link**: copy-link plus native Web Share, with the educational-simulation line attached to the share text.
- **Countdown**: live days/hours remaining, plus "starts at / ends at" dates and a finished state that names the winner and freezes the numbers.
- **Both start at $100K**: the duel records each side's starting equity at join time and scores purely on percentage change from that snapshot, so no wallet is reset and the comparison is fair.
- **Separate duels leaderboard**: a "Duels" tab on `/leaderboard` listing active and finished head-to-heads (both usernames, both P&L %, who leads, days left), reading only public profiles. Signed-out users can browse it; they just don't appear in it.
- **Discovery**: link Challenge from the leaderboard, the trader profile, and the mega-footer.
- Guards: cannot join your own duel, cannot join a full or expired duel, invalid code shows a clean not-found state.

## 2. Roadmap update

Rewrite `/roadmap` so shipped items (public trader profiles, country guides, courses, daily streak, duels) move to "Shipped" with real dates, and remaining items get honest July/August 2026 targets. No hype language, no unverifiable claims.

## 3. Full site audit — all 277 URLs, page by page

Worked in batches from the route manifest, not sampled. For every page:

- **Disclaimer coverage**: every finance-adjacent page carries the educational-simulation disclaimer. Currently only 12 files reference the shared component — this is the biggest gap.
- **Thin content**: flag anything under roughly 400 words of unique body copy and either enrich it with worked examples, formulas, risk tables and source-linked definitions, or drop it from the sitemap. Programmatic routes (`/compare`, `/how-to-trade`, `/strategy`, `/wiki`, `/niche`, `/sectors`, `/learn/country`) get the closest scrutiny since they share templates.
- **Overlap / duplication**: detect near-duplicate titles, descriptions, H1s and body blocks across the programmatic families; rewrite so each page has a genuinely distinct angle.
- **AI-sounding filler**: remove hedging boilerplate ("in today's fast-paced world", "it's important to note") and replace with concrete numbers, examples and cited sources (FRED, CME, SEC/Investor.gov, BLS).
- **Fake data**: final sweep for invented user counts, win rates, testimonials and activity tickers.
- **YMYL phrasing**: no advice-shaped language ("you should buy", "guaranteed returns"); author attribution and last-reviewed date on educational pages.
- **Per-page meta**: unique title/description/canonical/OG, single H1, alt text on images.

Output: a written audit table of every route with its verdict and the action taken, so nothing is silently skipped.

## 4. Domain migration: tradinghq.vercel.app → thetradehq.com

In-code checks I will do:

- Confirm no `vercel.app` or `lovable.app` URL remains in canonical tags, OG tags, sitemap, robots.txt, JSON-LD, llms.txt or auth redirects (the codebase currently looks clean — I will verify each surface).
- Confirm `robots.txt` and the sitemap both advertise only `https://www.thetradehq.com`, and that every sitemap entry returns 200 on the new domain.
- Confirm internal links are relative or absolute to the new domain only.

What code cannot do, and where I need you:

- A **301 redirect** from every old `tradinghq.vercel.app` URL to the matching `thetradehq.com` URL must be configured on the old Vercel deployment or its DNS. Without it, Google keeps both hosts and the old one bleeds authority. If you still control that Vercel project, I will give you the exact redirect config to paste.
- In Search Console, the **Change of Address** tool should be run from the old property to the new one, and the new property's sitemap submitted.

## Technical notes

- No schema changes expected beyond what `duels` already provides; if the duels leaderboard needs a public read path for opponent usernames, that goes through a migration with explicit GRANTs and RLS scoped to public profiles only.
- Sign-in stays optional everywhere. Signed-out users keep full access to trading, learning and browsing; they simply do not appear on the leaderboard or in duels.
- Sitemap is regenerated from `scripts/routes.ts` at the end, followed by the existing SEO verification and prerender guards.
- Order of work: challenge experience → roadmap → audit batches → domain verification → regenerate and verify.

## Scope note

The audit is large. I will work it in full batches and report progress rather than half-finishing every section; if I run out of room, I stop at a completed batch boundary and tell you exactly which routes remain.  
must follow rule : report honestly without sycophancy even if it means you didn't do anything say it plainly to my face.