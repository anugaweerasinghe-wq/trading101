# TradeHQ — Fix Remaining Critical + High Audit Issues

## No New Pages · No Medium/Low Work · Re-verify Every Finding Before Editing

### Scope

Complete only:

- the remaining partial Critical findings: **C03 and C04**
- the currently unresolved High findings from **H01–H36**
- do **not** implement Medium or Low findings in this batch
- do **not** create new pages
- do **not** redesign unrelated UI
- do **not** add new monetization or product features

This plan must use the **current live GitHub** `main` **as the source of truth**, not only the older audit ledger.

The Phase 2 evidence ledger is the factual/research reference, but the repository may have changed since that audit.

---

# 0. Mandatory pre-fix rule

Before changing **every individual defect ID**:

1. Fetch the latest `main`.
2. Record the exact current HEAD.
3. Open the exact files/components involved.
4. Confirm that the defect still exists **right now**.
5. Compare current behavior against the Phase 2 evidence.
6. If it has already been fixed, mark the ID **ALREADY RESOLVED — NO CHANGE**.
7. If implementation has changed, reassess the proposed fix before editing.
8. Never reintroduce an old bug while trying to fix a stale audit item.
9. After each logical batch, rebuild and test affected behavior.

Do not blindly implement old audit wording.

This rule is especially important for **H30 and H33**.

---

# 1. Remaining Critical — C03 / C04

## C03 — Internal QA/SEO artifacts publicly deployable

## C04 — Public QA reports can become stale or contradict production

Remove these operational/internal artifacts from `public/` if they still exist:

- `7_day_turbo_report.md`
- `list_of_urls.csv`
- `meta_turbo_variants.csv`
- `og_image_status.csv`
- `rich_results_turbo_log.csv`
- `asset_keystatistics_report.json`

Also check `public/` for any other clearly internal:

- QA reports
- audit reports
- owner approval files
- SEO test logs
- internal status reports
- generated diagnostic CSVs
- private operational reports

Do **not** delete legitimate public assets merely because they use `.json`, `.csv`, `.txt`, or another data format.

For example, legitimate assets such as `manifest.json`, sitemap files, robots files, or deliberately public machine-readable files must not be caught by a broad extension ban.

### Prevention

Add a targeted build/CI check that fails when known internal QA/report artifact names or approved internal-report patterns appear in the public build.

Do **not** implement a generic rule like:

> fail if any `.csv`, `.json`, `.txt`, or `.md` exists

because legitimate public resources may use those formats.

---

# 2. Market-data honesty and provenance

Applies primarily to:

**H01, H02, H03, H25, H26, H27**

## H01 — Mixed, delayed, substituted and synthesized quote fields

Audit every quote field separately.

Do not assume that because a price is provider-sourced, every other field in the same object is also live/provider-sourced.

Where applicable track:

- provider
- provider timestamp
- fetch timestamp
- field provenance
- `live`
- `delayed`
- `end-of-day`
- `previous-day`
- `cached`
- `synthetic`
- `simulated`
- `derived`

Examples such as:

- synthesized 24h high/low
- locally generated percentage changes
- previous-day bars
- delayed/EOD provider values
- proxy instruments

must not appear as fully live real-time fields.

UI labels should reflect actual provenance.

Do not use a successful API request as proof that returned data is live.

---

## H02 — Internal "Fear & Greed" metric

Rename the proprietary metric to something such as:

**TradeHQ Market Mood**

or:

**TradeHQ Market Mood — Internal Estimate**

Explain clearly that:

- it is TradeHQ's own internal calculation
- it is derived from simulator/asset momentum inputs
- it is not an external Fear & Greed Index
- it is not a prediction
- it does not represent a standardized market index

Show the calculation methodology in concise language.

The internal variable/function name may also be renamed for maintainability.

---

## H03 — Pseudo-current country-guide sentiment/tickers

Any hardcoded or seeded market figures presented inside country guides must not look current.

Either:

- remove pseudo-current figures entirely, or
- label them clearly as an **illustrative example**

Static deterministic sentiment must not be presented as real current market sentiment.

---

## H25 — `llms.txt`

Bring `public/llms.txt` in line with the real product.

Do not claim:

> all TradeHQ market data is strictly simulated

if some parts use live, cached, delayed, EOD or provider-backed data.

State the hybrid architecture accurately.

This is a factual/transparency fix, not an attempt to gain Google ranking benefits.

---

## H26 — Niche asset seeded prices

Seeded/hardcoded figures must not use labels such as:

- Current Price
- Live Price
- Today's Price

unless they genuinely qualify.

Use language such as:

- Illustrative price
- Example value
- Simulator reference value

where appropriate.

---

## H27 — Sector-page refresh claims

Match FAQs and supporting copy to actual behavior.

Do not say:

- continuously updated
- real-time refresh
- live automated prices

unless the exact component actually does that.

---

# 3. Honest use of "AI"

Applies primarily to:

**H16, H18, H20, H21, H22, H23**

The goal is **not** to remove every reference to AI across TradeHQ.

Actual AI-backed functionality may still legitimately be called AI.

The rule is:

> deterministic/rule-based/statistical tools must not be marketed as AI merely for presentation.

---

## H16 — Smart Mentor fallback

Inspect the actual AI path and fallback path separately.

If a real model/API produces an answer, it may still be identified appropriately as AI.

If fallback responses are rule-based/static:

- label them as rule-based or curated educational guidance
- remove personalized instruction-style commands
- avoid fixed prescriptions such as universal cash percentages, DCA rules or asset weights
- present them as educational examples, questions, considerations or illustrative frameworks

Do not imply that a disclaimer makes prescriptive personalized rules neutral.

---

## H18 — Deterministic tools labelled AI

Audit each occurrence individually.

Remove AI terminology from tools that are actually based on:

- deterministic calculations
- rules
- keyword matching
- fixed heuristics
- static scoring
- standard Monte Carlo simulation without AI model generation

Suitable replacements include:

- Rule-based insight
- Automated analysis
- Model estimate
- Statistical simulation
- Illustrative projection
- Practice insight

Do not remove AI labels from genuinely AI-backed functionality.

---

## H20 — Trading Strength Meter

Do not treat content consumption as evidence of trading ability.

Remove score contributions based primarily on:

- number of articles read
- lesson count
- page views
- arbitrary engagement volume

If the feature remains named **Trading Strength**, base it on relevant simulator practice behavior that can actually be measured.

Examples may include:

- risk consistency
- diversification
- repeated oversized trades
- practice history
- journal use
- decision consistency

If the available data cannot justify a trading-skill score, rename it to something more accurate.

Show the methodology.

Do not imply the score measures real-world investment competence.

---

## H21 — Scenario Builder

Monte Carlo simulation itself is legitimate.

Fix presentation rather than pretending the model is AI.

Clearly show:

- assumptions
- annual-return assumption
- volatility assumption
- number of simulations
- time horizon
- limitations
- whether asset correlations are ignored

Do not label P5/P95 as literal:

- worst case
- best case

Use wording such as:

- 5th percentile outcome
- 95th percentile outcome
- lower modeled range
- upper modeled range

Do not imply predictive certainty.

---

## H22 — Trading Journal analysis

If journal pattern detection is deterministic/statistical/keyword-based:

rename "AI Insights" appropriately.

Examples:

- Journal Insights
- Automated Pattern Summary
- Rule-Based Journal Analysis

Explain what signals are actually used.

---

## H23 — Compound calculator

Rename:

**Live Projection**

to:

**Projection**

or another accurate label.

Also review the financial assumptions.

In particular, do not present a percentage of monthly growth as a generic representation of normal broker fees unless it is explicitly described as a simplified modeling assumption.

Clarify whether an annual-return input is:

- nominal annual rate divided monthly, or
- effective annual rate converted to monthly

Do not silently mix the two.

---

# 4. Content integrity and financial education

Applies primarily to:

**H04, H08, H09, H10, H11, H12, H13, H14, H15, H17, H29**

Every rewrite must be specific to the actual page.

Do not produce repetitive filler merely to increase content length.

Use reliable sources where factual verification is needed.

Prefer primary sources for:

- regulators
- exchanges
- market mechanics
- legal/tax matters
- product specifications

Secondary educational sources may be used for basic explanations where appropriate.

Never fabricate:

- statistics
- performance
- historical win rates
- citations
- regulations
- market claims

---

## H04 — Trading glossary

Keep useful definitions.

Remove or rewrite deterministic technical-analysis claims such as:

- guaranteed signals
- predictable reversals
- reliable entry points
- fixed probabilities
- "the market tends to..." without evidence
- exact bar counts for reversals without defensible evidence

Add limitations where useful.

Technical indicators should be described as tools traders may interpret, not reliable predictors of future prices.

---

## H08 — Asset content

Remove stale or pseudo-current calls such as:

- buy now
- best asset this year
- what will happen this year
- current geopolitical setup

unless the claim has a real source and review date.

Prefer durable educational explanations:

- what drives the asset
- major risks
- market structure
- macro sensitivity
- company/industry fundamentals
- volatility considerations

Do not simply replace one year with another.

---

## H09 — Country guides

Do not delete useful country-specific information unnecessarily.

Preserve factual, useful material that remains supported.

For changing legal, regulatory, tax or foreign-exchange claims:

- name the relevant authority
- include a last-reviewed date
- encourage verification with the relevant regulator/tax authority where appropriate
- avoid universal conclusions where rules vary by user/platform/account type

Use primary sources wherever possible, including relevant authorities such as:

- SEC Sri Lanka
- CBSL
- IRD Sri Lanka
- SEBI
- RBI
- relevant tax authorities
- PSE/SEC Philippines
- SECP/SBP
- Nigerian SEC
- equivalent primary regulators

Do not use vague statements like:

> verify with your regulator

when the actual regulator can be named.

---

## H10 — Learn articles

Only rewrite passages that are genuinely advice-shaped or overly prescriptive.

Do not rewrite good neutral education unnecessarily.

Replace universal instructions such as:

> You should allocate X%

with educational framing such as:

> One hypothetical example could allocate...

or:

> Some investors use ranges, but appropriate allocation depends on risk tolerance, objectives and circumstances.

Avoid turning arbitrary numbers into universal truths.

---

## H11 — Quantitative allocation prescriptions

Remove unsupported universal allocation rules.

If percentages are useful pedagogically:

- label them as hypothetical examples
- ensure totals are mathematically coherent
- do not present them as objectively correct
- do not quiz users as though arbitrary allocations are mathematical facts

---

## H12 — "Industry-standard" loss limits

Remove unsupported claims that a specific 2–3% daily-loss rule is an industry standard.

If a numerical example is kept:

- clearly identify it as an example
- explain its purpose
- do not present it as a universal professional standard

---

## H13 — Futures/macro mechanics

Preserve concepts that are correct.

Examples that may remain if accurately stated:

- initial margin
- maintenance margin
- futures margin as a performance bond
- mark-to-market
- clearing
- contract specifications
- physical vs cash settlement

Correct only unsupported or overly universal claims such as:

- one fixed maintenance-margin percentage
- universal leverage bands
- permanent margin values
- universal liquidation behavior
- unsourced market-share percentages

Use primary CME/CFTC/exchange documentation where appropriate.

---

## H14 — Strategy performance and maths

Any performance example must clearly state that it is:

- hypothetical
- illustrative
- based on stated assumptions

Correct all current arithmetic inconsistencies.

Do not present calculated expectancy as observed historical performance.

Show assumptions such as:

- win probability
- average win
- average loss
- risk amount
- number of hypothetical trades
- fees

Recalculate results programmatically/testably rather than manually changing isolated numbers.

---

## H15 — Comparison pages

Remove volatile broker/platform stats that cannot be maintained reliably.

Avoid:

- stale fee tables
- outdated spreads
- unsupported rankings
- winner verdicts based on changing data

Use durable comparison criteria instead.

If changing provider facts remain, include:

- source
- as-of/review date

Do not imply a permanent winner.

---

## H17 — "Expert-curated"

Remove unsupported "expert-curated" claims unless TradeHQ can identify a real, verifiable expert editorial process.

Use the real editorial methodology described on `/about`.

Do not fabricate reviewers, credentials or editorial staff.

---

## H29 — Hardcoded "2026"

Do not simply run a search-and-replace from 2026 → 2027.

For each occurrence decide whether the year:

- is genuinely part of a dated historical statement
- reflects a reviewed guide
- is unnecessary marketing freshness
- will become stale

Remove unnecessary freshness years.

Where a year matters, tie it to a genuine:

- reviewed date
- data period
- report
- regulatory version

---

# 5. Sitewide claims, schema and trust

Applies primarily to:

**H05, H06, H07, H24, H28, H32, H34**

---

## H05 — Schema and metadata accuracy

Audit `index.html` and page-level structured data.

Structured data must describe:

- real visible content
- actual functionality
- accurate organization information
- genuine hierarchy
- genuine reviews/ratings only

Do not add:

- fake `aggregateRating`
- fake reviews
- fabricated awards
- fabricated ratings
- unsupported features

Do not assume that declaring `SoftwareApplication` automatically makes a page eligible for Google rich results.

Remove unsupported feature claims such as:

- simulator functionality that does not exist
- unsupported asset types
- cross-device capabilities that do not exist

Do not optimize schema by maximizing the number of schema types.

Use the correct semantic type only where defensible.

---

## H06 — Social identity signals

Do **not** automatically delete social links.

For every `sameAs`, Twitter/X handle, or ownership-implying account:

1. determine whether ownership can actually be verified
2. if verified as an official TradeHQ account, it may remain
3. if ownership cannot be verified, remove ownership-implying structured-data references

Do not invent replacement social profiles.

---

## H07 — Ranking/promotional claims

Remove or soften unsupported statements such as:

- #1
- best
- top-rated
- world's best
- leading platform

unless a real independent source supports the exact claim.

Normal marketing language may remain when it is clearly subjective and not falsely presented as an objective ranking.

---

## H24 — Roadmap

Make roadmap statuses reflect actual shipped behavior.

A feature is not "shipped" merely because:

- a helper function exists
- UI exists without backend behavior
- a notification prompt exists without recurring delivery

Use accurate statuses such as:

- shipped
- partial
- planned
- experimental

Remove stale planned dates where they are no longer reliable.

---

## H28 — Legacy lesson routes

Being outside an internal manifest is not itself a Google violation.

The issue is quality governance.

Legacy `/lesson/:id` content must either:

- pass the same quality/content checks as current lessons, or
- be `noindex` until corrected

Do not label the route family spam merely because it uses templates.

Do not delete valuable lessons unnecessarily.

---

## H32 — Options/futures educational content

TradeHQ currently does not have a true options/futures trading engine unless current source proves otherwise.

Educational options/futures content may remain.

Make it explicit that:

- those pages are educational
- users cannot execute a realistic options/futures contract inside TradeHQ
- TradeHQ does not currently model options strike/expiry/premium mechanics
- TradeHQ does not currently implement a full futures margin/settlement engine

Remove CTAs or copy promising an options/futures simulator if the product does not provide one.

---

## H34 — Cross-device persistence

Audit every sync/persistence claim.

Guest browser state must not be described as universal cloud sync.

Clearly distinguish between:

- browser/localStorage data
- signed-in backend profile data
- synced summary statistics
- data that actually restores across devices

Do not imply full portfolio/trade/course restoration unless it really exists.

---

# 6. Portfolio analytics — H19

Do not invent substitute metrics merely to keep existing UI filled.

Use genuine recorded portfolio history where available.

Review:

- Sharpe ratio
- maximum drawdown
- return series
- win rate
- diversification/risk scores
- synthetic history

### Drawdown

Calculate max drawdown from the actual recorded equity/portfolio-value history.

Do not create a fake historical equity path solely to calculate drawdown.

### Sharpe

Use a proper time-series return calculation.

Document:

- return interval
- annualization assumption
- risk-free-rate treatment
- minimum sample requirement

If there is not enough actual portfolio history to calculate a meaningful Sharpe ratio:

display:

**Not enough history**

or:

**N/A**

Do not generate synthetic returns just to show a number.

### Custom scores

Any custom TradeHQ risk/diversification score must be explicitly labelled as a:

**TradeHQ internal metric**

with a visible explanation of how it works.

Do not present it as an industry-standard finance statistic.

---

# 7. Trading functionality

Applies primarily to:

**H30 and H31**

---

## H30 — Limit orders

First re-check current live implementation.

Do **not** assume desktop and mobile currently use the same order logic.

Audit:

- `MobileOrderDrawer`
- `MinimalistOrderPanel`
- `OrderPanel`
- `Trade.tsx`
- `TradeAsset.tsx`
- `orderTypes.ts`
- any pending-order storage/execution logic

Current behavior may differ between desktop/mobile and may have changed since the audit.

A valid limit-order implementation requires more than storing:

`status = pending`

A pending order must only affect the portfolio when its execution condition is actually met.

For a buy limit:

- trigger only when the simulator price reaches or falls below the limit

For a sell limit:

- trigger only when the simulator price reaches or rises above the limit

When triggered:

- execute the actual portfolio transaction
- apply the intended fill price/defined simulator execution rule
- apply fees consistently
- update cash
- update position
- update trade history
- update order state
- prevent duplicate fills

Users must be able to identify/cancel pending orders if the feature remains.

If implementing a complete reliable limit-order lifecycle is not appropriate in this batch:

**remove the unsupported Limit control instead**

and remove every site claim saying TradeHQ supports limit orders.

Do not leave a fake limit-order UI that simply executes a market order.

Do not use "same logic as desktop" unless desktop genuinely has valid limit-order handling.

---

## H31 — Asset routing

Stop constructing canonical trade routes from raw display symbols.

Do not rely on:

`asset.symbol.toLowerCase()`

because symbols can contain:

- `/`
- `^`
- spaces/special characters
- collisions
- aliases

Use the stable canonical asset ID/slug used by the real route system.

Examples that must not break:

- BTC/USDT-style symbols
- forex pairs
- index symbols such as `^GSPC`
- duplicate/collision ticker symbols such as `ZS`
- comparison-page synthetic labels

Add route tests for affected edge cases.

Existing valid canonical URLs must continue to work or cleanly redirect.

---

# 8. H33 — Share Profile

### Important: do not implement the old audit fix blindly.

Before touching H33, inspect current:

- `src/pages/TraderProfile.tsx`
- `src/App.tsx`
- public trader route

If current code already shares:

`/trader/:username`

and the app route is already:

`/trader/:username`

then:

**H33 is already resolved.**

Mark it:

**ALREADY RESOLVED — NO CHANGE**

Do not introduce `/u/:username` unless the entire routing architecture has intentionally changed and that route genuinely exists.

Use the canonical TradeHQ production domain when creating a public share URL if appropriate, while keeping development behavior safe.

Do not break the currently valid username route.

---

# 9. Backend abuse protection

Applies primarily to:

**H35 and H36**

Do not weaken existing authentication.

---

## H35 — AI chat

First verify current Supabase function configuration.

If `ai-chat` is JWT-protected, keep that protection.

Primary rate limiting should preferably use the authenticated user's stable user ID.

Use IP only as an additional abuse signal where appropriate.

Add:

- reasonable request-rate limit
- message length cap
- history length cap
- total payload-size cap
- server-side prompt/history validation
- safe maximum output/token budget
- allowed-origin/CORS validation appropriate to production
- cost protection

Do not trust caller-controlled system prompts blindly.

Do not turn a JWT-protected endpoint into a public endpoint for convenience.

---

## H36 — `live-market-data`

This function is intentionally/publicly accessible according to current architecture unless current source proves otherwise.

Add abuse protection appropriate to a public market-data proxy:

- per-IP rate limiting
- burst limit
- request-size cap
- allowed endpoint/action validation
- input/schema validation
- production origin handling where appropriate
- upstream provider protection

Do not allow arbitrary upstream URLs/provider queries from clients.

---

## Rate-limit storage

A small Supabase table may be used.

If storing IP-derived identifiers:

- do not store plaintext IP addresses unless genuinely necessary
- prefer keyed/HMAC-based pseudonymous hashing rather than a simple unsalted hash
- keep the table service-role-only
- use short retention/automatic cleanup
- store only fields required for throttling
- do not expose it through normal client APIs

Possible fields:

- subject hash / user ID
- window start
- request count
- expiry

For authenticated AI chat, user ID should be the main identifier where possible.

For public market data, IP-derived throttling is reasonable.

Ensure privacy documentation remains consistent with the implemented behavior.

---

# 10. Verification

Verification is mandatory.

Do not declare a defect fixed because the code "looks right."

---

## Build checks

Run:

- production build
- type checking if configured
- linting if configured
- existing content validation
- existing SEO validation
- route-generation checks
- existing audit scripts relevant to changed files

Do not silence build errors or weaken tests just to pass.

---

## Functional browser testing

Use Playwright/browser verification for at least:

### Trading

- market buy
- market sell
- mobile order panel
- desktop order panel
- limit-order behavior if limit orders remain
- pending order does not immediately change portfolio
- correct eventual execution rule
- cancel pending order if supported

### Routing

Test problematic symbol families and confirm canonical routes do not 404.

### Share profile

Confirm current valid username sharing route works.

If H33 was already fixed, test it and leave implementation unchanged.

### Portfolio analytics

Test:

- insufficient-history state
- genuine history state
- drawdown
- Sharpe calculation
- no generated fake historical path

### Backend

Test:

- AI chat authenticated access
- oversized inputs rejected
- rate limit response
- live-market-data rate limit
- normal legitimate calls still work

---

# 11. Context-aware terminology audit

Search for terms including:

- `live`
- `real-time`
- `AI-powered`
- `AI analysis`
- `expert-curated`
- `guaranteed`
- `#1`
- `best`
- `industry standard`
- `Current Price`
- `2026`

But **do not treat this as a blind banned-word list**.

Each occurrence must be reviewed in context.

Examples:

Valid:

> "This is not a live feed."

Valid:

> a genuinely AI-backed mentor described as AI

Invalid:

> simulated data labelled "Live"

Invalid:

> deterministic calculator described as "AI-powered"

Invalid:

> unsupported "#1" ranking

Report reviewed occurrences rather than blindly deleting every match.

---

# 12. Source and editorial rules

For every content rewrite:

- use page-specific writing
- preserve useful existing explanations
- prefer primary sources for regulations and market mechanics
- use clear plain English
- do not add filler
- do not use generic AI-written templates across multiple pages
- do not fabricate citations
- do not fabricate numbers
- do not fabricate historical performance
- do not fabricate editorial credentials
- do not fabricate reviews or ratings
- do not guarantee AdSense approval
- do not claim SEO penalties without evidence

Financial content should remain educational and non-directive.

---

# 13. Technical areas likely to be touched

Potential files include, but are not limited to:

- `src/lib/seoData.ts`
- `src/lib/coursesData.ts`
- `src/lib/lessonData.ts`
- `src/lib/learnArticles.ts`
- `src/lib/tradingGlossary.ts`
- `src/lib/countryGuides.ts`
- `src/lib/smartMentor.ts`
- `src/lib/tradingJournal.ts`
- `scripts/content.ts`
- `scripts/assetNotes.ts`
- `index.html`
- `public/llms.txt`
- `src/pages/Roadmap.tsx`
- `src/pages/TraderProfile.tsx`
- `src/App.tsx`
- `src/components/PortfolioAnalytics.tsx`
- portfolio/history libraries
- `src/components/trading/MobileOrderDrawer.tsx`
- `src/components/trading/MinimalistOrderPanel.tsx`
- `src/components/trading/OrderPanel.tsx`
- `src/lib/orderTypes.ts`
- `src/pages/Trade.tsx`
- `src/pages/TradeAsset.tsx`
- asset table/routing components
- `supabase/functions/ai-chat/index.ts`
- `supabase/functions/live-market-data/index.ts`
- Supabase migrations if rate-limit persistence is required

Do not edit a file merely because it appears on this list.

Only edit it if current source confirms it is part of an unresolved finding.

---

# 14. Implementation order

Use this order:

### Batch A — Critical

- C03
- C04

Verify and commit/checkpoint.

### Batch B — Functional/security High

- H30
- H31
- H33 verification only unless genuinely unresolved
- H35
- H36
- H19

Verify and checkpoint.

### Batch C — Market-data honesty

- H01
- H02
- H03
- H25
- H26
- H27

Verify and checkpoint.

### Batch D — AI/rule-based representation

- H16
- H18
- H20
- H21
- H22
- H23

Verify and checkpoint.

### Batch E — Editorial/content integrity

- H04
- H08
- H09
- H10
- H11
- H12
- H13
- H14
- H15
- H17
- H29

Verify and checkpoint.

### Batch F — Sitewide trust/schema

- H05
- H06
- H07
- H24
- H28
- H32
- H34

Verify and checkpoint.

Do not publish one enormous unreviewed rewrite if the work can be safely separated.

---

# 15. Final per-ID report

At completion provide a table for:

**C03, C04, H01–H36**

For each ID report:

- status before work
- current source files checked
- whether the issue still existed
- changes made
- tests performed
- final status

Use only:

- `FIXED`
- `ALREADY RESOLVED — NO CHANGE`
- `PARTIALLY FIXED`
- `NOT REPRODUCIBLE`
- `BLOCKED` with exact reason

For any audit item that proved stale, explicitly say so.

Do not claim all High issues are fixed unless each one has been independently re-verified.

---

# Final constraints

Do not:

- create new pages
- work on Medium/Low findings
- fabricate statistics
- fabricate citations
- fabricate reviews/ratings
- add fake schema signals
- add unsupported AI claims
- replace current facts with generic AI knowledge
- weaken authentication/RLS
- make profiles public by default
- break existing canonical routes
- implement `/u/:username` unless it genuinely exists
- treat all uses of "AI" or "live" as automatically wrong
- turn arbitrary financial percentages into universal rules
- add filler content for AdSense
- guarantee AdSense acceptance

The goal of this batch is:

**make TradeHQ's remaining Critical/High implementation, financial education, market-data representation, security, product claims and public-facing trust signals accurately match what the product genuinely does today.**