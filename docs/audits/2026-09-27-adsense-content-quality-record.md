# TradeHQ AdSense / content-quality audit record
**Audit date:** 2026-09-27  
**Scope:** record-only audit. No product/content fixes are made by this document.  
**Primary branch audited:** `adsense-quality-final-audit-2026-09-26` at `04eb3dcf4ec0223bec284e692de8048af6673ef5`  
**Cross-checked branches:** `main`, `audit/critical-quality-2026-09-26`, `content-quality-critical-fixes-2026-09-26`

## 1. Standard used

The audit is intentionally stricter than "the site builds."

Google's current AdSense guidance says pages should contain unique, original, relevant and valuable content, provide a good user experience, and give visitors a reason to visit the site. Google's current Search spam guidance also warns against scaled pages made mainly to manipulate rankings when they add little original value.

Primary references:
- https://support.google.com/adsense/answer/7299563
- https://support.google.com/adsense/answer/81904
- https://support.google.com/adsense/answer/12176698
- https://support.google.com/adsense/answer/9724
- https://developers.google.com/search/docs/essentials/spam-policies

This audit therefore checks more than title length and word count: truthfulness, original contribution, repeated/template content, crawler/user parity, financial-claim quality, stale freshness claims, schema truthfulness, public internal files, dynamic-data labelling, user-generated statistics, indexation strategy, and technical integrity.

## 2. Coverage and method

### Repository/branch coverage
- Recursive tree inventory of the active audit branch: **270 relevant source/script files** across pages, libraries/data, components, hooks, scripts and supporting configuration.
- Manual review of every file changed by the active audit work that could alter content, indexing, runtime data labels, legal/trust pages or deployment behaviour.
- Manual review of previously changed files on the critical/content-quality branches before treating any old fix as safe to merge.
- High-risk manual review of page families and their shared data sources: home, markets, learn, articles, lessons, courses, course lessons, glossary, strategies, comparisons, how-to pages, country guides, sectors, assets, AI mentor, leaderboard, reviews, roadmap, privacy, terms, about, prerender/static-copy system, route manifest, sitemap, robots, Vercel config, Supabase functions and relevant migrations.

### Automated diagnostics
A clean CI audit run performed:
- `npm ci`
- production `npm run build`
- post-build prerender and SEO verification
- `node scripts/audit-content.mjs`
- indexable-page word-count distribution
- ESLint diagnostics

Build result:
- **278 prerendered routes**
- **118 indexable**
- **160 noindex**
- **118 sitemap URLs**
- post-build SEO verifier: PASS
- exactly-one-H1 check: PASS on all 118 indexable pages

Content distribution:
- minimum indexable static-body word count: **398**
- median: **533**
- maximum: **852**
- pages below 300 words: **0**
- pages below 400 words: **1** (`/wiki/swing-trading`, 398)
- one title over 65 characters
- one meta description over 160 characters

The most template-heavy indexable pages in the current static audit are glossary pages. Shared-sentence ratios reach **29%**:
- `/wiki/golden-cross` — 29%
- `/wiki/volume-profile` — 29%
- `/wiki/margin-call` — 28%
- `/wiki/swing-trading` — 28%
- `/wiki/vwap` — 27%
- several more sit around 25–26%.

The repeated sentences are overwhelmingly global disclaimer/footer boilerplate, but the glossary page family still needs a semantic originality pass.

### Internal originality scan
A source-level scan of the large content stores (`tradingGlossary.ts`, `lessonData.ts`, `coursesData.ts`, `seoData.ts`, `assetContent.ts`, `learnArticles.ts`, `countryGuides.ts`, static copy and route/content builders) found:
- no large cross-file exact duplicate corpus in the long-form data examined;
- no high-similarity pairs above the audit threshold among the 9 learn articles, 8 comparisons, 6 how-to guides or 6 strategy data entries;
- the 42 authored asset-content blocks have several moderate-similarity pairs (roughly 0.32–0.39 Jaccard in the audit), consistent with shared asset-class/template structure rather than exact duplication.

A web spot-check of several distinctive TradeHQ prose sentences did not surface exact-copy matches. **This is not an internet-wide plagiarism certification.** A repository scan and ordinary web search cannot prove that every sentence is globally unique.

## 3. Executive assessment

### What is already good
1. Deployment/runtime stability is substantially better than before.
2. Generic programmatic asset pages are currently noindexed rather than mass-indexed.
3. The route manifest/sitemap generation has a deliberate noindex mechanism.
4. The build catches exact duplicate prerender bodies, canonical duplication and missing static content.
5. About/Privacy/Terms are materially more transparent than the earlier versions.
6. Community reviews disclose that identities are not independently verified and avoid self-serving Review/AggregateRating schema.
7. The core long-form data does **not** look like a simple exact-copy/spun duplicate farm based on internal duplication scans.
8. Raw word count is not the main problem: current indexable pages are generally several hundred words long.

### Why this audit does **not** consider the site ready for an AdSense reapplication yet
The remaining risk is **quality/trust/original-value consistency**, not simply "not enough words." There are multiple claims and page families that contradict the site's own disclaimers, stale or internal artifacts exposed publicly, crawler-visible content that is not the same content ordinary users see after React boots, unsupported "best/live/expert" language, unreliable public statistics, and financial/regulatory claims without enough sourcing.

The next pass should fix the findings below before any reapplication.

---

# 4. Findings ledger

## Q01 — CRITICAL — Homepage/meta/schema still contains unsupported promotional claims
**Files:** `index.html`, `src/pages/Index.tsx`, `src/components/PremiumFAQ.tsx`, related homepage components.

Current active audit code still contains combinations of:
- "best free trading simulator in 2026";
- "widely considered one of the best";
- "live charts";
- "150+ real-time assets";
- AI-powered/AI mentor claims;
- unverified social `sameAs` / Twitter handles;
- an `EducationalOrganization` schema and feature list that assert capabilities more strongly than the runtime data guarantees;
- a homepage BreadcrumbList that represents sibling navigation items as a breadcrumb hierarchy.

This is not a thin-content issue; it is a **trust and schema-truthfulness** issue. Self-authored "widely considered best" language should not survive the next pass unless there is independent evidence strong enough to support it.

**Next-pass action:** remove unsupported superlatives and stale real-time claims; align JSON-LD exactly with demonstrated functionality; remove unverified identity/social properties; rebuild homepage metadata around verifiable simulator features.

## Q02 — CRITICAL — Crawler-visible prerender copy is a separate content layer from the normal runtime UI
**Files:** `scripts/prerender.ts`, `scripts/content.ts`, `scripts/staticCopy.ts`, `scripts/staticCopyExtra.ts`, `src/main.tsx`.

The code explicitly describes prose as "crawler-visible" and injects it into `#prerender-seo`. The React application uses `createRoot`, replacing the prerender shell when JavaScript runs.

That means an indexer/no-JS visitor can receive long prose that is not necessarily the same information a normal browser user sees after React renders. The previous audit assumed that passing the prerender content checker was enough. It is not.

Even when the text is useful and accurate, a large search-only prose layer creates an avoidable crawler/user-parity risk and makes the site's originality look more programmatic than it needs to.

**Next-pass action:** make meaningful indexed prose part of the actual user-visible React pages (or use genuine SSR/SSG hydration) rather than maintaining a parallel crawler copy. Audit parity route by route.

## Q03 — CRITICAL — Publicly exposed internal SEO/QA files are stale, low-value and sometimes contradict current code
**Directory:** `public/`

Publicly deployable files include:
- `14_day_report.md`
- `7_day_turbo_report.md`
- `final_qa_report.txt`
- `change_log.csv`
- `list_of_updated_urls.csv`
- `list_of_urls.csv`
- `meta_ab_test_plan.txt`
- `meta_turbo_variants.csv`
- `meta_variants.csv`
- `monitoring_plan.csv`
- `owner_approval_request.txt`
- `notify_team.txt`
- `rich_results_*_log.csv`
- `seo_audit.json`
- `search_console_submission_instructions.md`
- other internal reports.

Examples:
- monitoring reports contain `_fill_` placeholders;
- URL reports still reference the old `tradinghq.vercel.app` hostname;
- a public QA file asserts PASS conditions that current code contradicts (for example current "live"/promotional language);
- internal files discuss owner approvals, fabricated EEAT cleanup and SEO sprint tactics.

These files are not valuable public content and weaken the site's presentation as a finished publication/product.

**Next-pass action:** remove internal audit/ops artifacts from `public/`; keep them under non-public `docs/` or outside the deploy artifact.

## Q04 — CRITICAL — Leaderboard statistics are not trustworthy enough for the current "real rankings" claims
**Files:** `src/lib/traderSync.ts`, `src/pages/Leaderboard.tsx`, migration `20260802024211...`.

Two separate integrity problems exist:

1. `computeLocalStats()` counts a "win" with:
   `sells.filter((t) => t.total > 0)`.
   Normal sell totals are positive, so this is not a valid profitability test and can inflate win rate dramatically.

2. `trader_stats` allows each authenticated user to insert/update their own `portfolio_value`, `pnl_pct`, `trades`, `win_rate`, etc. RLS checks ownership, not whether the values were server-computed. A user who can call the backend directly can submit arbitrary ranking statistics.

The page currently markets the leaderboard as rankings of real members with no demo/bot data and suggests rank reflects actual simulated percentage return. That is too strong while the score source is client-controlled and one calculation is demonstrably wrong.

**Next-pass action:** server-verify leaderboard statistics from immutable/server-owned trade data or soften the feature to explicitly "self-synced practice stats"; fix win/loss accounting before publishing win rate.

## Q05 — HIGH — The active branch still returns soft-404-style SPA responses for unknown URLs
**File:** `vercel.json`.

The active AdSense audit branch ends with:
`{ "source": "/(.*)", "destination": "/index.html" }`.

React can render a NotFound component, but the HTTP response for an unknown URL can still be a successful SPA response rather than a real 404.

A proper finite-route/404 implementation exists on `audit/critical-quality-2026-09-26`, but it has not been integrated into the active audit branch.

**Next-pass action:** port the already-tested finite route/real-404 design carefully into the active branch and retest all generated/indexable routes.

## Q06 — HIGH — Asset indexation logic currently noindexes all 149 asset pages
**Files:** `scripts/routes.ts`, `src/lib/assetContent.ts`, `src/lib/assets.ts`.

Current counts:
- asset catalogue: **149**
- hand-authored asset content blocks: **42**
- static `ASSET_FAQS`: empty
- route code considers an asset "authored" only when a static FAQ key intersects an editorial content key.

Because `ASSET_FAQS` is empty, the intersection is empty and all 149 `/trade/:id` pages are noindex.

The generated FAQ function makes useful runtime Q&A but the route extractor only reads static keys.

This has two sides:
- positive: generic fallback asset pages are not mass-indexed;
- negative: even the stronger 42 editorial asset pages are excluded, probably unintentionally.

The committed `public/sitemap.xml` is also stale relative to the current build: the checked source artifact contained 147 URLs and 18 `/trade/` URLs, while the clean build regenerates **118** indexable URLs.

**Next-pass action:** keep generic fallback assets noindex; explicitly define which authored assets deserve indexation after quality review, and make sitemap/source artifacts consistent.

## Q07 — HIGH — Generic asset fallback content is too templated to index at scale
**File:** `src/lib/assetContent.ts`.

For assets without an authored block, generic functions create repeatable overview/fundamentals/practice/limitations/review sections and generated FAQs. Shared asset-class logic is useful in the app, but it is not enough unique value for 100+ indexed landing pages by itself.

The present noindex state is therefore safer than mass-enabling these pages.

**Next-pass action:** do not enable all assets. Promote only pages with genuinely asset-specific research, sources, examples and user value.

## Q08 — HIGH — Strategy pages publish unsourced "win-rate expectations" and best-market framing
**Files:** `src/pages/Strategy.tsx`, strategy data in `src/lib/seoData.ts`.

The route copy explicitly advertises:
- win-rate expectations;
- success-rate fields;
- "Best for";
- "best market";
- worked examples framed as strategy performance.

For financial education, numeric strategy success rates need a clearly defined methodology and evidence. A canned success-rate field without a source/methodology can be more misleading than having no number at all.

**Next-pass action:** remove generic win-rate promises unless each statistic has a defensible methodology/source; focus pages on mechanics, assumptions, failure modes and simulator exercises.

## Q09 — HIGH — Financial glossary contains certainty, advisory and reliability claims that need rewriting/sourcing
**File:** `src/lib/tradingGlossary.ts`.

The glossary is large and internally varied (49 terms, 38 currently indexable), which is good for coverage, but several entries use trading folklore/certainty language such as:
- markets "will" hunt a level;
- liquidation clusters described as magnets;
- pattern types called especially reliable;
- prescriptive backtest/deployment thresholds;
- aggressive "pro tip" language around flash crashes and entries.

Eleven weaker technical-analysis terms are already noindexed, but problematic framing remains within the indexable set.

**Next-pass action:** convert folklore/certainty into neutral descriptions ("some traders use...", "evidence is mixed...", "this is not predictive on its own"), add authoritative references where claims are empirical, and noindex any term that cannot provide more than generic pattern lore.

## Q10 — HIGH — Lessons/articles contain stale numeric examples, generic prescriptions and hardcoded publication metadata
**Files:** `src/lib/lessonData.ts`, `src/lib/learnArticles.ts`, `src/pages/LearnArticle.tsx`, `src/pages/LessonDetail.tsx`.

Examples found during review:
- fixed company valuation/price examples described in present-tense ways that can become stale;
- "best times/best strategy/most reliable" framing;
- generic advisor/rebalancing claims without citations;
- prescriptive trading thresholds presented as rules;
- all learn articles receive the same hardcoded `datePublished` / `dateModified` values in page schema rather than article-specific editorial dates;
- an article callout claims real-time data and an AI mentor more broadly than the product consistently guarantees.

**Next-pass action:** separate timeless examples from current data, add "example only" dates where needed, assign real per-article editorial dates, replace unsupported superlatives, and add primary sources for empirical claims.

## Q11 — HIGH — Live/simulated data labelling remains inconsistent
**Files:** `supabase/functions/live-market-data/index.ts`, `src/hooks/useHybridMarketData.ts`, `src/hooks/useLiveMarketData.ts`, `src/pages/Markets.tsx`, `src/pages/SectorPillar.tsx`, `src/pages/Daily.tsx`.

Specific contradiction:
- forex fetch obtains a live exchange rate, then invents a random 24h change and still returns `source: 'live'`.
- simulated candles are correctly generated as fallback in other places, but public copy often collapses "price is live" and "all displayed statistics are live."
- Markets metadata correctly says quotes may be simulated/cached/delayed, while an FAQ says the dashboard tracks live prices/change/volume for 130+ assets.
- Sector FAQ promises specific 60-second live behaviour and simulated micro-fluctuation behaviour that needs exact implementation verification.
- Daily labels a generated educational challenge as "Live Scenario."

**Next-pass action:** source-label every field, not just the headline price. Never mark a synthetic percentage/volume/range as live. Rewrite page copy to match the weakest data guarantee users can actually receive.

## Q12 — HIGH — AI/analysis backend contains prediction/advisory framing that conflicts with the public educational positioning
**Files:** `supabase/functions/market-analysis/index.ts`, `trading-advisor/index.ts`, `src/lib/smartMentor.ts`, `src/pages/AIMentor.tsx`.

Findings:
- `market-analysis` asks a model for annual expected returns and "realistic market predictions" based on historical trends.
- `trading-advisor` describes itself as having "FULL, LIVE" portfolio access and calculates trading performance.
- the canned mentor includes prescriptive statements and fixed risk/entry heuristics even while disclaimers say no advice.
- AIMentor social metadata says responses are "Curated by expert traders"; no evidence of an actual expert-review process was found.

The newer `ai-chat` system prompt correctly prohibits specific buy/sell signals, which is an improvement, but the overall AI surface is not yet consistent.

**Next-pass action:** remove prediction/expected-return generation or keep it strictly hypothetical/simulation-labelled; remove unsupported expert curation; make every mentor surface follow the same neutral educational policy.

## Q13 — HIGH — Country guides contain time-sensitive regulatory, tax, remittance and broker claims without citation infrastructure
**File:** `src/lib/countryGuides.ts`.

There are five localized guides (Sri Lanka, India, Philippines, Pakistan, Nigeria). They include:
- regulator/exchange/broker references;
- tax treatment statements;
- remittance/exchange-control statements;
- account/KYC/minimum-capital claims;
- practical recommendations for three-month practice plans.

Some copy appropriately tells users to confirm current rules, but the pages still publish many jurisdiction-specific assertions without visible citations/review dates.

One especially serious trust issue: the Sri Lanka intro says TradeHQ is used by "thousands" of Sri Lankan students. No supporting analytics evidence was found.

**Next-pass action:** remove audience-size claims; cite official regulator/tax/bank sources; add a visible "reviewed on" date; avoid pretending broker minimums/tax/remittance rules are static. If a guide cannot be sourced, noindex it until it can.

## Q14 — HIGH — Repeated "2026" SEO framing is excessive and will become stale
**Files:** homepage, Learn, Courses, Compare, HowToTrade, SectorPillar, LessonDetail, MarketTrends2026, footers, route metadata and more.

The year appears in many titles, headings, badges, descriptions and social metadata even when the content is evergreen. This creates:
- maintenance debt;
- stale metadata risk after the year changes;
- an SEO-targeted/template feel;
- needless similarity between page families.

**Next-pass action:** keep a year only where the underlying information genuinely changes by year and is actually reviewed. Make evergreen material evergreen.

## Q15 — HIGH — "Best", "most popular", "Most Traded", "institutional", "expert" and similar claims are not consistently evidence-backed
**Files/components include:** `PremiumFAQ.tsx`, `TopAssetsGrid.tsx`, `LearnTradingGuide.tsx`, `AIMentor.tsx`, `ContextualLinks.tsx`, `CredibilityFooter.tsx`, `MegaFooter.tsx`.

Examples:
- "widely considered one of the best";
- "Most Traded";
- "most popular simulations";
- "Institutional Grade Education";
- "Curated by expert traders";
- "Most-practiced today."

These are stronger than the evidence present in the repository.

**Next-pass action:** replace with verifiable descriptions or calculate metrics from trustworthy data and disclose the basis.

## Q16 — HIGH — Previous "content-quality critical fixes" branch is not safe to merge wholesale
**Branch:** `content-quality-critical-fixes-2026-09-26`.

That branch is technically green after runtime hotfixes, but its content predates several sanitizations and still contains older search-oriented/advisory copy:
- "best free ... in 2026" style FAQs;
- direct "best way"/beginner suitability claims;
- AI strategy/recommendation language;
- verdict-style comparison copy;
- stale price/outlook language.

**Next-pass action:** never merge this branch wholesale. Diff/cherry-pick only specific changes after semantic review.

## Q17 — HIGH — Earlier critical branch contains important fixes that the active audit branch still lacks
**Branch:** `audit/critical-quality-2026-09-26`.

Useful work there includes the finite-route/real-404 hosting design and a centralized noindex mechanism, but that branch also contains content/config differences that should not be blindly merged.

This branch fragmentation is itself a quality risk: a later merge can restore already-removed claims or remove newer runtime hotfixes.

**Next-pass action:** create one clean successor branch from the current active audit branch and port fixes individually with tests.

## Q18 — HIGH — Public stats/duel data is client-writable
**File:** migration `20260802024211...`.

RLS protects ownership, but authenticated users can directly update their own `trader_stats` numeric values. Duel participants can update duel rows. This is not enough to support strong public claims that leaderboard/duel results are verified outcomes.

**Next-pass action:** move authoritative score calculations/updates behind server-controlled functions; restrict client-writable fields.

## Q19 — MEDIUM/HIGH — Trade execution utility lacks defensive validation and mutates nested state through shallow copies
**File:** `src/lib/portfolio.ts`.

`executeTrade()` does not itself reject non-finite/zero/negative quantities. It also shallow-copies `portfolio` and then mutates nested position objects originating from the old portfolio.

UI validation may prevent most normal bad inputs, but a core financial-simulation function should enforce its own invariants.

**Next-pass action:** validate all numeric inputs inside the core function and deep-copy/update positions immutably.

## Q20 — HIGH (security/trust) — Newsletter function uses service-role access without an explicit caller-role check
**File:** `supabase/functions/send-newsletter/index.ts`.

The function instantiates Supabase with `SUPABASE_SERVICE_ROLE_KEY` and fetches all subscriber emails. The code reviewed does not perform an admin-role authorization check before sending.

Even if platform JWT verification is enabled by default, an ordinary authenticated caller should not be able to invoke a bulk-mail service-role operation.

**Next-pass action:** require an explicit server-side admin authorization check and rate limiting before any service-role bulk action.

## Q21 — MEDIUM/HIGH — Anonymous AI/data functions expose expensive or high-trust operations
**File:** `supabase/config.toml`.

`market-analysis`, `trading-advisor`, `analyze-trading-psychology` and `live-market-data` have `verify_jwt = false`.

For live-market-data this may be intentional, but the AI endpoints can create abuse/cost and trust risks.

**Next-pass action:** decide which endpoints are intentionally public, enforce rate limits/input limits, and require auth for personalized/high-cost AI work.

## Q22 — MEDIUM — About/Privacy/Terms are improved, but some statements still need reality checks
**Files:** `About.tsx`, `Privacy.tsx`, `Terms.tsx`.

Positive:
- AI assistance is disclosed.
- optional-account data and review identity limits are explained.
- financial/legal/tax advice disclaimers are clear.
- the review page discloses identity limitations.

Checks still required:
- About says prices are "simulated or delayed" even though some are genuinely live/cached; wording should be precise rather than absolute.
- Privacy says no standalone behavioural analytics SDK is currently used; re-check this against whatever analytics branch/config is actually deployed before reapplication.
- privacy retention language should match actual deletion/moderation functionality.
- "Last Updated" dates must track real changes.

## Q23 — MEDIUM — Community-review page is substantially better, but moderation/storage implementation should match the promise
**Files:** `Reviews.tsx`, review edge functions/tables.

The page correctly says identities are not independently verified and does not emit self-serving Review/AggregateRating schema. This should be preserved.

The next pass should verify that:
- only approved/moderated reviews are selected publicly;
- IP-hash/one-review behaviour matches the privacy disclosure;
- moderation states cannot be bypassed by direct database access.

## Q24 — MEDIUM — Word count is adequate, but glossary pages remain semantically template-heavy
The clean static build has no indexable page under 398 words, so a simple "add more words" strategy would be the wrong fix.

However, 15 glossary pages have roughly 25–29% sentences shared with many other pages. Global disclaimer/footer repetition explains part of this, but several pages still use the same structural sequence and simulator CTA.

**Next-pass action:** increase term-specific evidence/examples and cut repeated generic padding rather than increasing length.

## Q25 — MEDIUM — Metadata length issues exist on two pages
- `/courses/futures-and-derivatives/margin-and-leverage-in-futures`: title 70 chars.
- `/courses/trading-psychology-mastery`: description 162 chars.

Not an approval blocker, but should be cleaned.

## Q26 — MEDIUM — Lint is far from "excellent-grade" even though production builds
Current CI diagnostic:
- **97 problems**
- **72 errors**
- **25 warnings**
- only 3 auto-fixable.

Most are type/cleanup issues, but some are functional-quality signals:
- `CourseLesson.tsx` has **four Rules of Hooks errors** because hooks execute after a conditional early return.
- several data hooks/pages have missing effect/callback dependencies.
- many `any` types and empty catches reduce auditability.
- portfolio/trade hooks show stale-dependency warnings.

This does not directly mean AdSense rejection, but it contradicts the goal of an excellent-quality codebase and can hide runtime bugs.

**Next-pass action:** prioritize actual correctness lint errors (Rules of Hooks, stale dependencies, state mutation) before cosmetic typing cleanup.

## Q27 — MEDIUM — Dependency and bundle diagnostics still need engineering cleanup
Clean install reported:
- **21 npm audit findings**: 1 low, 4 moderate, 16 high.
- Vite reports chunks over 500 kB after minification.

These are not evidence of an AdSense content violation by themselves, but they matter for security/performance quality.

**Next-pass action:** inspect the actual vulnerable dependency tree before applying upgrades; do not use blind `npm audit fix --force`. Split obvious large lazy-load bundles where beneficial.

## Q28 — MEDIUM — Existing automated SEO/content tests create false confidence
**Files:** `scripts/audit-content.mjs`, `scripts/prerender.ts`, `scripts/verify-seo.mjs`.

The current checks are useful but limited:
- exact body uniqueness does not detect semantically duplicated/template content;
- word count does not measure original value;
- the audit does not verify facts/citations;
- it does not compare crawler content to post-JS user content;
- it does not inspect schema claims for truthfulness;
- it does not scan public internal artifacts;
- it does not certify internet-wide originality;
- the SEO verifier samples only a small route set for certain assertions.

The prior conclusion "SEO verification passed" was technically true but too broad as a quality conclusion.

**Next-pass action:** extend CI later with claim bans, public-artifact allowlist, route/indexability manifest tests, static/runtime parity checks and structured-data validation.

## Q29 — MEDIUM — "Risk-free" wording is semantically ambiguous
Many pages correctly mean "no real money is at risk in this simulator." Other placements shorten this to "risk-free trading/practice" in titles, FAQs and marketing copy.

For a finance-themed site, the shorter wording can sound like a statement about trading itself.

**Next-pass action:** standardize on precise language such as "no real money is used" / "simulated practice" rather than generic "risk-free trading."

## Q30 — RECORD / LIMITATION — External originality is not fully certifiable from the repository
The internal scan gives useful evidence that the site is not simply full of exact duplicate blocks. A small exact-phrase web spot-check also did not reveal obvious copies for the sampled distinctive prose.

That still cannot prove every article is original relative to the entire public web, books, paywalled sources or training data.

The next pass should therefore optimize for **demonstrable original contribution** rather than chasing a fake "100% plagiarism-free" number: TradeHQ-specific examples, simulator screenshots/data, original exercises, transparent methodology, cited primary sources and fewer generic encyclopedia-style paragraphs.

---

# 5. Indexation decision record

Current build: **118 indexable / 160 noindex**.

This is safer than the earlier broad indexation state. Do **not** react to AdSense rejection by blindly reindexing all 278 routes.

Keep noindex by default for:
- generic asset fallback pages;
- private/auth/admin routes;
- low-evidence pattern/technical-analysis pages;
- highly programmatic pages without enough unique value.

Only re-enable pages after they pass:
1. user-visible content parity;
2. route-specific original value;
3. factual/source review;
4. no unsupported current/live/performance claims;
5. truthful schema/meta;
6. internal-link purpose;
7. clean canonical/indexing state.

# 6. Proposed order for the NEXT pass (not performed now)

1. Consolidate branches and port the real-404/hosting fix.
2. Remove public internal audit/SEO artifacts.
3. Repair homepage/index.html metadata and structured data.
4. Eliminate crawler-only prose divergence.
5. Fix leaderboard/stat integrity before keeping strong "real rankings" claims.
6. Standardize live/cached/simulated labels.
7. Rewrite/remove unsupported superlatives, current-year stuffing and expert/institutional claims.
8. Source/review country/regulatory/tax pages.
9. Rewrite strategy/glossary/article claims with neutral evidence-based framing.
10. Decide exactly which asset pages deserve indexation; leave generic fallbacks noindex.
11. Fix correctness-level lint/data-integrity issues.
12. Run a final build + browser + HTTP status + sitemap/robots/canonical + semantic-duplication + structured-data audit.
13. Only then allow recrawl/reindex time before requesting another AdSense review.

# 7. Stop point

**Audit and recording complete. No content-quality fixes from the ledger above were implemented in this pass.**

The audit intentionally challenged earlier assumptions:
- "build passed" does not mean content is approval-ready;
- "unique prerender body" does not mean original/high-value content;
- "several hundred words" does not mean non-thin content;
- "live source" does not mean every displayed statistic is live;
- "real user" does not make client-supplied performance statistics trustworthy;
- an earlier public QA file saying PASS is not evidence when current source contradicts it.

The next pass should start from this ledger, not from the older PASS reports.
