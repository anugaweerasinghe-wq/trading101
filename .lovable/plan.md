

# Implementation Plan: Trading Glossary Wiki + Dashboard Refactor + SEO

## Step 1: Create `src/lib/tradingGlossary.ts`
Typed array of 25 glossary terms with schema: `slug`, `term`, `definition` (~80 words), `difficulty` (Novice/Intermediate/Pro), `readTime`, `category`, `keyPoints` (3 bullets), `studentPerspective`, `relatedTerms[]`.

Terms: Short Squeeze, Golden Cross, Death Cross, Liquidation Cascade, Fibonacci Retracement, RSI Divergence, MACD Histogram, Bollinger Band Squeeze, Order Block, Fair Value Gap (FVG), Bull Trap, Bear Trap, Whale Manipulation, Support and Resistance, Candlestick Patterns, Head and Shoulders, Double Bottom, MACD, Limit Order vs Market Order, Stop Loss Hunting, Leverage Trading, FOMO, FUD, HODL Strategy, Satoshi Nakamoto.

All content factual and educational.

## Step 2: Create `src/pages/WikiTerm.tsx`
Dynamic route component for `/wiki/:slug`:
- Looks up slug in glossary array
- `<Helmet>` with `<title>What is {term}? | TradingHQ Guide</title>` and meta description using difficulty + readTime
- JSON-LD `DefinedTerm` schema
- Elite Obsidian layout: neon emerald `<h1>`, glassmorphic card
- Difficulty + readTime badge pills
- Definition, 3 key-point bullets, student perspective section
- "Share to WhatsApp" button using `wa.me/?text=I%20just%20mastered%20{term}%20on%20TradingHQ...`
- Related terms section linking to other `/wiki/` pages (internal linking loop)
- Back link to `/learn-trading-guide`
- 404 fallback via NotFound component

## Step 3: Refactor `src/pages/LearnTradingGuide.tsx`
Fill blank space and add engagement features:

- **Ticker Tape** at top of main content: Pure CSS `@keyframes` infinite scroll with mocked BTC/ETH/SOL prices. Uses `will-change: transform` for 60fps.
- **Below existing grid**, add "Command Center" section:
  - **Left: Daily Challenge** — "Identify this Pattern" with static text description (e.g., "Double Bottom forming at support"), 3 answer buttons, CSS confetti animation on correct answer
  - **Right: Sentiment Gauge** — Vertical bar meter using `Math.random()` seeded by `new Date().toDateString()` to show Fear/Greed indicator. Visual only.
  - **Bottom: Wiki Spotlight** — 3 random glossary terms from `tradingGlossary.ts` with links to `/wiki/:slug`
- Remove all remaining blank gaps with tighter spacing

## Step 4: Create `src/lib/sitemapGenerator.ts`
Utility that imports glossary and generates full XML sitemap string for all `/wiki/:slug` URLs with `<lastmod>2026-03-03</lastmod>` (today's date). Logs to console on call. Exports `generateSitemapXML()` function.

## Step 5: Update Routes & Navigation
- **`src/App.tsx`**: Add `<Route path="/wiki/:slug" element={<WikiTerm />} />`
- **`src/components/QuickLinksFooter.tsx`**: Add Wiki/Glossary link
- **`src/components/MegaFooter.tsx`**: Add "Trading Glossary" column with links to all 25 wiki terms

## Step 6: Update `public/sitemap.xml`
Append 25 new wiki URLs with priority 0.7, changefreq weekly, `<lastmod>2026-03-03</lastmod>`.

## Files to Create
| File | Purpose |
|------|---------|
| `src/lib/tradingGlossary.ts` | 25 glossary entries |
| `src/pages/WikiTerm.tsx` | Wiki page component |
| `src/lib/sitemapGenerator.ts` | Console XML sitemap logger |

## Files to Modify
| File | Change |
|------|--------|
| `src/App.tsx` | Add wiki route |
| `src/pages/LearnTradingGuide.tsx` | Ticker tape, command center, wiki spotlight |
| `src/components/MegaFooter.tsx` | Glossary links section |
| `src/components/QuickLinksFooter.tsx` | Wiki link |
| `public/sitemap.xml` | 25 new wiki URLs |

## Performance
- Ticker uses pure CSS keyframes with `will-change: transform` — zero JS intervals
- Sentiment gauge is a simple CSS bar, no deps
- Wiki pages are lightweight text — excellent Core Web Vitals

