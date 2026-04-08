

# Plan: Remove Email Newsletter + Add Articles + Fix Indexing

## Part 1: Remove Email Newsletter

Remove the `send-newsletter` invocation from `AdminEditor.tsx` (lines 159-169). Keep the subscriber table and signup form (useful for future use), but stop trying to send emails on publish. Replace the newsletter toast with a simple "Article published successfully" confirmation.

**Files changed:** `src/pages/AdminEditor.tsx`

## Part 2: Add 3 New Trading Articles

Add three new articles to `src/lib/learnArticles.ts`:

1. **"What Is Risk Management in Trading"** — covering position sizing, stop-losses, risk-reward ratios, the 2% rule
2. **"Understanding Market Orders vs Limit Orders"** — practical guide on order types, slippage, when to use each
3. **"How to Use Technical Indicators: RSI, MACD, and Moving Averages"** — deeper dive into the three most popular indicators

Each article follows the existing format: slug, title, summary, metaDescription (120+ chars), readTime, 3 sections with 3 paragraphs each, and 4 relatedLinks pointing to internal pages.

Also add these articles to the Learn page listing and the sitemap.

**Files changed:** `src/lib/learnArticles.ts`, `public/sitemap.xml`

## Part 3: Fix 155 Not-Indexed Pages

Google has discovered these pages but is choosing not to index them. The fixes (no content removal, pure upgrades):

### 3a. Update sitemap.xml
- Update ALL `lastmod` dates from `2026-03-21` to `2026-04-08` (today) — signals fresh content to Googlebot
- Remove the duplicate `trade/hbar` entry (line 76 is a duplicate of line 73)
- Add the 3 new learn article URLs

### 3b. Improve TradeAsset page SEO signals
The `/trade/*` pages are the bulk of the not-indexed URLs. Enhance their Helmet metadata to be more unique per asset:
- Ensure every trade page has a unique, keyword-rich `<title>` and `<meta description>` (already done via `generateAssetMetaTitle`/`generateAssetMetaDescription` in assetContent.ts — verify these produce 50+ char titles and 120+ char descriptions)
- Add `<link rel="canonical">` to each trade page pointing to its own URL to avoid duplicate-content signals
- Add `<meta name="robots" content="index, follow">` explicitly on every trade page

**Files changed:** `src/pages/TradeAsset.tsx`

### 3c. Add canonical tags to sector pages and other not-indexed pages
Add explicit `<link rel="canonical">` and `<meta name="robots" content="index, follow">` to:
- `src/pages/SectorPillar.tsx` (for `/sectors/*`)
- `src/pages/Leaderboard.tsx`
- `src/pages/Terms.tsx`

**Files changed:** `src/pages/SectorPillar.tsx`, `src/pages/Leaderboard.tsx`, `src/pages/Terms.tsx`

### 3d. Boost internal linking to not-indexed pages
Add more internal links from high-authority pages to help Google prioritize crawling:
- In `QuickLinksFooter.tsx`, add links to `/leaderboard` and `/sectors/crypto-defi`
- In `src/pages/Index.tsx`, ensure sector pillar links are present (they likely already are via navigation)

**Files changed:** `src/components/QuickLinksFooter.tsx`

## Summary of All Files Changed

| File | Change |
|------|--------|
| `src/pages/AdminEditor.tsx` | Remove newsletter send logic |
| `src/lib/learnArticles.ts` | Add 3 new articles |
| `public/sitemap.xml` | Update lastmod dates, fix duplicate, add new article URLs |
| `src/pages/TradeAsset.tsx` | Add canonical + robots meta tags |
| `src/pages/SectorPillar.tsx` | Add canonical + robots meta tags |
| `src/pages/Leaderboard.tsx` | Add canonical + robots meta tags |
| `src/pages/Terms.tsx` | Add canonical + robots meta tags |
| `src/components/QuickLinksFooter.tsx` | Add leaderboard + sector links |

## Important Note on Indexing

The "discovered but not indexed" status in Google Search Console is common for large sites with many similar pages. These code changes will help, but full indexing may take 2-4 weeks as Google recrawls. After deployment, you should request indexing for the most important URLs via Google Search Console's URL Inspection tool.

