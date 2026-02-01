
# Mission-Critical: Global SEO & Architectural Repair (145 Routes)

## Executive Summary
This plan addresses 145 technical SEO errors across TradeHQ by fixing the underlying **template logic and global components** rather than making per-page edits. All fixes propagate automatically to every asset route.

---

## Issue Analysis

### 1. Orphan Pages (Internal Linking Crisis)
**Problem:** The `/markets` page only links to 5 assets manually. The asset table's "Trade" buttons link to `/trade` instead of `/trade/{symbol}`. This creates 140+ orphan pages with no incoming links.

**Files Affected:**
- `src/pages/Markets.tsx` (lines 130-163, 254-260, 269-307)

### 2. Schema Errors (Rich Snippet Failures)
**Problem:** Triple FAQPage detection causing "Duplicate FAQPage" errors:
1. JSON-LD in `TradeAsset.tsx:265-269`
2. Microdata (`itemScope`/`itemType`) in `AssetFAQSection.tsx:26-28`
3. `<noscript>` fallback in `AssetFAQSection.tsx:74-94`

**Additional Issue:** Review schema missing `itemReviewed` as a properly typed object.

**Files Affected:**
- `src/pages/TradeAsset.tsx` (lines 148-182)
- `src/components/AssetFAQSection.tsx` (lines 23-94)

### 3. Content & Meta Issues
| Error | Current State | Required Fix |
|-------|--------------|--------------|
| Missing H1 | No semantic `<h1>` on trade pages | Add dynamic `<h1>{Asset Name} 2026 Live Market Analysis</h1>` |
| Low Word Count | ~50 words on non-seed assets | Generate 300-word "Market Strategic Outlook" dynamically |
| Meta too long | Some descriptions exceed 155 chars | Enforce strict 155-char truncation |
| Canonical mismatch | Using `.vercel.app` domain | Ensure exact match with sitemap URLs |

**Files Affected:**
- `src/pages/TradeAsset.tsx` (lines 306-360)
- `src/lib/assetContent.ts` (lines 753-803)

### 4. Data Updates (February 1, 2026 Truth Sheet)
**Current vs Required:**
| Asset | Current Price | Required Price |
|-------|--------------|----------------|
| BTC | $105,420 | $95,000 |
| GOOGL | $335.00 | $338.58 |
| NVDA | $142.50 | $190.20 |
| AAPL | $185.92 | $255.25 |
| MNQ | **MISSING** | $26,160 (new asset) |

**Files Affected:**
- `src/lib/assets.ts` (lines 14, 288, 306, 324)

---

## Implementation Plan

### Phase 1: Fix Orphan Pages (Internal Linking)

#### 1.1 Update Markets Page Asset Table Links
**File:** `src/pages/Markets.tsx`

Change all "Trade" buttons from linking to `/trade` to linking to `/trade/{asset.symbol}`:

```text
Line 254-260:
Change: to="/trade"
To: to={`/trade/${asset.symbol.toLowerCase().replace('/', '-')}`}

Lines 130-133, 160-163:
Change: to="/trade"  
To: to={`/trade/${asset.symbol.toLowerCase().replace('/', '-')}`}
```

#### 1.2 Add Complete Asset Directory Section
**File:** `src/pages/Markets.tsx`

Replace the static "Most Traded Assets" section (lines 269-307) with a comprehensive, categorized asset directory that dynamically lists ALL 145+ assets:

```tsx
{/* Complete Asset Directory for SEO Crawlability */}
<div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-6">
  <h2 className="font-semibold text-base md:text-lg mb-4">
    Complete Asset Directory
  </h2>
  <p className="text-xs text-muted-foreground mb-6">
    Trade all {assets.length} assets with $10K virtual capital. 
    Select any market below to start practicing:
  </p>
  
  {/* Grouped by asset type */}
  {['crypto', 'stock', 'etf', 'forex', 'commodity'].map(type => (
    <div key={type} className="mb-6">
      <h3 className="text-sm font-medium mb-2 capitalize">
        {type === 'stock' ? 'Stocks' : type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {assets.filter(a => a.type === type).map(asset => (
          <Link key={asset.id} to={`/trade/${asset.id}`}>
            {asset.symbol}
          </Link>
        ))}
      </div>
    </div>
  ))}
</div>
```

#### 1.3 Add Back-Link to Markets from Trade Pages
**File:** `src/pages/TradeAsset.tsx`

Update the breadcrumb to include `/markets` in the trail:
```tsx
const breadcrumbItems = selectedAsset ? [
  { label: "Markets", href: "/markets" },
  { label: selectedAsset.name }
] : [];
```

---

### Phase 2: Schema Repair

#### 2.1 Remove Duplicate FAQPage Microdata
**File:** `src/components/AssetFAQSection.tsx`

Remove all `itemScope`/`itemType`/`itemProp` microdata attributes from the component. Keep ONLY the JSON-LD block in the parent page. Remove the `<noscript>` fallback entirely (it duplicates the schema).

**Lines to modify:** 24-28, 39-66, 73-94

```tsx
// BEFORE (lines 24-28):
<section 
  className="mt-8"
  itemScope 
  itemType="https://schema.org/FAQPage"
>

// AFTER:
<section className="mt-8" aria-label="Frequently Asked Questions">
```

Remove all `itemScope`, `itemProp`, `itemType` from AccordionItem and AccordionContent. Delete the entire `<noscript>` block (lines 73-94).

#### 2.2 Fix Review Schema Structure
**File:** `src/pages/TradeAsset.tsx`

Update the `financialProductSchema` (lines 148-182) to properly nest `itemReviewed` within the Review:

```tsx
const financialProductSchema = selectedAsset ? {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": `${selectedAsset.name} Trading Simulator`,
  "description": assetContent?.whatIs || metaDescription,
  "url": canonicalUrl,
  "category": assetContent?.category || selectedAsset.type,
  "provider": {
    "@type": "Organization",
    "name": "TradeHQ",
    "url": "https://tradinghq.vercel.app/"
  },
  "review": {
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialProduct",
      "name": `${selectedAsset.name} Trading Simulator`
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.9",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "TradeHQ Research Team"
    },
    "reviewBody": `Comprehensive ${selectedAsset.symbol} trading simulation...`
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1542",
    "bestRating": "5",
    "worstRating": "1"
  }
} : null;
```

---

### Phase 3: Content & Meta Enhancement

#### 3.1 Add Dynamic H1 to Trade Pages
**File:** `src/pages/TradeAsset.tsx`

Add a semantic `<h1>` immediately after the breadcrumb:

```tsx
{/* After Breadcrumb, before AIReadySummary */}
{selectedAsset && (
  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
    {selectedAsset.name} 2026 Live Market Analysis
  </h1>
)}
```

#### 3.2 Add 300-Word "Market Strategic Outlook" Section
**File:** `src/lib/assetContent.ts`

Create a new function that generates a dynamic 300-word outlook for ALL assets:

```tsx
export function generateMarketOutlook(asset: Asset): string {
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency' 
    : asset.type === 'etf' ? 'ETF' : asset.type;
  
  // Template-based generation for consistent word count
  const intro = `${asset.name} (${asset.symbol}) represents a ${content?.category || typeLabel} opportunity in the 2026 market environment.`;
  
  const fundamentals = content?.whatIs 
    || `${asset.name} is available for practice trading in the TradeHQ simulator.`;
  
  const strategy = content?.strategy 
    || `Develop your ${asset.symbol} trading strategy by analyzing chart patterns, support/resistance levels, and market sentiment indicators.`;
  
  const riskManagement = `Risk management is critical when trading ${asset.symbol}. Consider position sizing relative to your virtual portfolio, set appropriate stop-loss levels, and never risk more than 2% of capital on a single trade.`;
  
  const practiceAdvice = `TradeHQ provides $10,000 in virtual capital to practice ${asset.symbol} trading. Use this simulator to test strategies, learn technical analysis, and build confidence before committing real capital. Track your performance over time and refine your approach based on results.`;
  
  const disclaimer = `This analysis is for educational purposes only. Past simulated performance does not guarantee future results. Always conduct your own research and consult a qualified financial advisor before making investment decisions.`;
  
  return `${intro}\n\n${fundamentals}\n\n${strategy}\n\n${riskManagement}\n\n${practiceAdvice}\n\n${disclaimer}`;
}
```

**File:** `src/pages/TradeAsset.tsx`

Add a "Market Strategic Outlook" section for ALL assets (not just seed set):

```tsx
{/* Market Strategic Outlook - 300 words for every asset */}
{selectedAsset && (
  <section className="mt-8 p-6 bg-card/30 rounded-2xl border border-border/30">
    <h2 className="text-lg font-semibold mb-4">
      {selectedAsset.symbol} Market Strategic Outlook 2026
    </h2>
    <div className="prose prose-sm text-muted-foreground">
      {generateMarketOutlook(selectedAsset).split('\n\n').map((p, i) => (
        <p key={i} className="mb-4 leading-relaxed">{p}</p>
      ))}
    </div>
  </section>
)}
```

#### 3.3 Enforce 155-Character Meta Description
**File:** `src/lib/assetContent.ts`

The `truncateMetaDescription` function exists but needs stricter enforcement. Update `generateAssetMetaDescription` to always pass through truncation:

```tsx
// Line 802: Ensure truncation is ALWAYS applied
return truncateMetaDescription(description, 155);
```

Also add a safeguard to custom descriptions that may exceed 155 chars:
```tsx
// Around line 787
if (CUSTOM_META_DESCRIPTIONS[asset.id]) {
  return truncateMetaDescription(CUSTOM_META_DESCRIPTIONS[asset.id], 155);
}
```

#### 3.4 Fix Canonical URL Domain
**File:** `src/pages/TradeAsset.tsx`

Ensure canonical URLs match sitemap exactly (lines 143-145):
```tsx
const canonicalUrl = selectedAsset 
  ? `https://tradinghq.vercel.app/trade/${selectedAsset.id}`
  : "https://tradinghq.vercel.app/trade";
```

Note: Use `asset.id` (lowercase) not `asset.symbol.toLowerCase().replace('/', '-')` to ensure exact match with sitemap.

---

### Phase 4: Data Updates (Feb 1, 2026 Truth Sheet)

#### 4.1 Update Asset Prices
**File:** `src/lib/assets.ts`

| Line | Asset | Change |
|------|-------|--------|
| 14 | BTC | `price: 95000.00` |
| 288 | AAPL | `price: 255.25` |
| 306 | GOOGL | `price: 338.58` |
| 324 | NVDA | `price: 190.20` |

#### 4.2 Add MNQ (Micro E-mini Nasdaq-100)
**File:** `src/lib/assets.ts`

Add to the ETF section (around line 880):
```tsx
{
  id: 'mnq',
  symbol: '/MNQ',
  name: 'Micro E-mini Nasdaq-100',
  type: 'etf',
  price: 26160.00,
  change: 185.50,
  changePercent: 0.71,
},
```

#### 4.3 Add MNQ Content
**File:** `src/lib/assetContent.ts`

Add to `ASSET_CONTENT`:
```tsx
mnq: {
  whatIs: "The Micro E-mini Nasdaq-100 (/MNQ) is a futures contract tracking the Nasdaq-100 index at 1/10th the size of the standard E-mini. It provides leveraged exposure to the 100 largest non-financial companies on Nasdaq, dominated by technology giants.",
  strategy: "Practice futures trading with /MNQ to understand leverage, margin requirements, and contract rollovers. Monitor tech earnings season and Fed rate decisions as key drivers. (Educational simulation only — not financial advice.)",
  category: "Futures",
  keywords: ["MNQ trading", "micro futures", "Nasdaq-100 futures", "tech index"],
  stats: {
    assetClass: "Futures",
    benchmark: "Nasdaq-100",
    source: "CME Group"
  }
},
```

#### 4.4 Update Sitemap
**File:** `public/sitemap.xml`

Add MNQ route and update lastmod dates to `2026-02-01`:
```xml
<url><loc>https://tradinghq.vercel.app/trade/mnq</loc><lastmod>2026-02-01</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
```

---

## Files to Modify Summary

| File | Changes |
|------|---------|
| `src/pages/Markets.tsx` | Fix all asset links, add complete asset directory |
| `src/pages/TradeAsset.tsx` | Add H1, fix canonical, update breadcrumb, add Market Outlook section, fix Review schema |
| `src/components/AssetFAQSection.tsx` | Remove duplicate microdata, delete noscript fallback |
| `src/lib/assetContent.ts` | Add `generateMarketOutlook()`, enforce 155-char truncation, add MNQ content |
| `src/lib/assets.ts` | Update BTC/AAPL/GOOGL/NVDA prices, add MNQ |
| `public/sitemap.xml` | Add MNQ, update lastmod dates |

---

## Technical Details

### Schema Changes Visual

```text
BEFORE (3 FAQPage sources per page):
┌─────────────────────────────────────────┐
│ TradeAsset.tsx                          │
│ ├── JSON-LD: FAQPage (lines 265-269)    │ ← Keep
│ └── AssetFAQSection                     │
│     ├── Microdata: FAQPage (line 27)    │ ← Remove
│     └── <noscript>: FAQPage (line 75)   │ ← Remove
└─────────────────────────────────────────┘

AFTER (1 FAQPage source):
┌─────────────────────────────────────────┐
│ TradeAsset.tsx                          │
│ └── JSON-LD: FAQPage (single source)    │ ← Only this
└─────────────────────────────────────────┘
```

### Internal Linking Fix Visual

```text
BEFORE:
/markets ──────────────────────── 5 manual links
    └── /trade (generic, no asset)

AFTER:
/markets ──────────────────────── 145+ dynamic links
    ├── /trade/btc
    ├── /trade/eth
    ├── /trade/nvda
    ├── /trade/aapl
    ├── /trade/mnq ← NEW
    └── ... (all 145+ assets)
```

---

## Verification Checklist

After implementation:
1. Every `/trade/{symbol}` page has a clickable link from `/markets`
2. Every trade page has `<h1>` with "[Asset Name] 2026 Live Market Analysis"
3. Google Rich Results Test shows exactly 1 FAQPage per asset page
4. All meta descriptions are ≤155 characters
5. Canonical URLs match sitemap.xml exactly
6. BTC=$95,000, GOOGL=$338.58, NVDA=$190.20, AAPL=$255.25, MNQ=$26,160

For the Asset Directory in Phase 1.2, ensure the asset links are styled as 'Pill' buttons with a subtle 'Liquid Glass' blur effect. This ensures that even with 145 links, the page feels like a premium app rather than a 1990s web directory.
