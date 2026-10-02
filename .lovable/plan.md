# Fix remaining Critical + all High audit issues (no new pages, no Medium/Low)

Scope: the 2 still-partial Critical items (C03, C04) and all 36 High items (H01–H36) from the audit ledger. Every rewrite is hand-written, specific to its page, and checked against well-established public sources (exchange/regulator docs, CBSL/SEC Sri Lanka, CME, CBOE, Investopedia-level definitions). No fabricated numbers, no templates. Medium and Low items are left untouched.

## 1. Critical
- C03/C04: Remove internal QA files from the public site (`7_day_turbo_report.md`, `list_of_urls.csv`, `meta_turbo_variants.csv`, `og_image_status.csv`, `rich_results_turbo_log.csv`, `asset_keystatistics_report.json`), then add a build check that fails if report/CSV files reappear in public output.

## 2. Honesty about data and "AI" (H01, H02, H03, H18, H20, H21, H22, H23, H26, H27, H16)
- Data labels: show "Delayed" or "Simulated" badges with source and timestamp wherever quotes are mixed or substituted. Remove "live" wording when data isn't live.
- Rename "Fear & Greed" to "TradeHQ Market Mood (internal estimate)" and explain how it's calculated.
- Rule-based tools (journal analysis, scenario builder, mentor fallback, strength score) drop "AI" labels. They become "rule-based insight" / "illustrative model" with the method shown. "Live Projection" becomes "Projection".
- Trading Strength stops counting how much someone has read. It only scores practice behaviour.
- Smart Mentor fallback: replace instruction-style lines with educational, non-directive wording.
- Niche and sector pages: seeded figures labelled "illustrative example", and FAQ text matched to how the page really refreshes.

## 3. Content integrity rewrites, researched page by page (H04, H08–H15, H17, H29)
- Glossary: tone down claims about technical-analysis reliability and add balanced limitations.
- Asset pages: remove time-sensitive calls ("buy now", "this year"). Replace them with durable explanations of what drives each instrument.
- Country guides: tax and legal statements get "verify with [named regulator]" plus a last-reviewed date. Remove claims that change too often to keep accurate.
- Learn articles and lessons: rewrite advice-style wording ("you should allocate X%") as educational ranges with sources. Remove "industry-standard" rules we can't back up. Correct oversimplified futures/macro mechanics (margin, settlement, rate transmission).
- Strategy pages: label performance as hypothetical, with assumptions shown.
- Compare pages: remove changing stats and verdicts, and use criteria-based comparisons.
- Remove "expert-curated" claims. Use the real editorial process from /about instead.
- Remove hardcoded "2026" freshness claims, or tie them to a real review date.

## 4. Sitewide claims and trust (H05, H06, H07, H24, H25, H28, H32, H34)
- Site schema/meta: list only features that actually exist (no options/futures simulator, no cross-device sync for guests).
- Remove unverified social profiles and "#1 / best" self-ranking claims.
- Bring roadmap statuses and `llms.txt` in line with what's actually shipped. State precisely what is simulated and what is real.
- Older lesson pages go through the same quality checks as the rest of the site, or get noindex.
- Options/futures pages say clearly they are educational. They no longer promise a simulator.

## 5. Functional bugs (H19, H30, H31, H33, H35, H36)
- H30: Limit orders on mobile wait as pending until price is reached (same logic as desktop).
- H31: Fix symbol-to-route mapping (e.g. BTC/USDT, ^GSPC), so links stop 404ing.
- H33: "Share profile" shares `/u/:username` on the canonical domain.
- H19: Portfolio analytics use standard formulas (Sharpe, drawdown from actual equity history). Synthetic history is removed or labelled.
- H35/H36: Add per-IP rate limits, input size caps, and origin checks to the AI chat and market-data backend functions.

## 6. Verification
Run build, SEO verification and content audit scripts. Do a Playwright check of the trade page (mobile limit order), share profile, and symbol links. Grep for banned terms ("live", "AI-powered", "expert", "guaranteed", "#1"). Report per-ID status.

## Technical notes
- Files mainly touched: `src/lib/seoData.ts`, `coursesData.ts`, `scripts/content.ts`, `scripts/assetNotes.ts`, country guide data, `index.html` JSON-LD, `public/llms.txt`, the roadmap page, OrderPanel/mobile trade sheet, the portfolio analytics lib, ShareProfile, and the `ai-chat` / `live-market-data` edge functions.
- Rate limiting uses a small `rate_limits` table (hashed IP + window) accessed by the service role only.
- This is a large batch, so it's done in the order above. Critical and functional fixes come first.
