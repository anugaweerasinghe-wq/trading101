# Google Search Console — Post-Deploy Actions

## Prerequisites
- Verified ownership of https://www.thetradehq.com/ in Google Search Console
- Site verification code: `I9Z6Vo-t00zuqHRrR_RFgAZ14hsA5YzA0gHeK2POL-I`

## Step 1: Submit Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select property: `https://www.thetradehq.com/`
3. Navigate to **Index → Sitemaps**
4. Enter: `sitemap.xml`
5. Click **Submit**
6. Confirm status shows "Success" within 24 hours

## Step 2: Request Indexing for Seed Pages

Use **URL Inspection** for each URL below — paste, press Enter, click **Request Indexing**:

### Priority 1 (Submit First)
```
https://www.thetradehq.com/
https://www.thetradehq.com/trade
https://www.thetradehq.com/learn-trading-guide
```

### Priority 2 (Seed Assets)
```
https://www.thetradehq.com/trade/btc
https://www.thetradehq.com/trade/eth
https://www.thetradehq.com/trade/nvda
https://www.thetradehq.com/trade/aapl
https://www.thetradehq.com/trade/msft
https://www.thetradehq.com/trade/googl
https://www.thetradehq.com/trade/amzn
https://www.thetradehq.com/trade/tsla
https://www.thetradehq.com/trade/spy
https://www.thetradehq.com/trade/qqq
https://www.thetradehq.com/trade/gold
https://www.thetradehq.com/trade/oil
https://www.thetradehq.com/trade/gbpusd
https://www.thetradehq.com/trade/xrp
https://www.thetradehq.com/trade/bnb
https://www.thetradehq.com/trade/sol
```

## Step 3: A/B Meta Test (After 7-Day Baseline)

- **Days 1-7**: Variant A active (Learn & Practice titles with "risk-free" hooks)
- **Day 8**: Review CTR + impressions in GSC Performance report
- **Day 8-14**: Optionally swap to Variant B on a subset (see `meta_ab_test_plan.txt`)
- **Day 15**: Compare aggregate CTR between windows
- **Rollback** if CTR drops >50% or indexation drops below 40% for 7 consecutive days

## Step 4: Rich Results Testing

1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Test each seed URL
3. Expected schemas per page type:

| Page | Expected Schemas |
|------|-----------------|
| Homepage | SoftwareApplication, EducationalOrganization, BreadcrumbList |
| /learn-trading-guide | FAQPage, HowTo, Article, EducationalOrganization |
| /trade/{symbol} | DefinedTerm (GEOKeySummary), FinancialProduct, Organization, BreadcrumbList, FAQPage (if Q&A exist) |

4. Record results in `public/rich_results_validation_log.csv`

## Step 5: Monitor (14 Days)

Check daily in GSC → Performance:
- **Impressions** trend (should increase)
- **Click** trend
- **CTR** (maintain or increase from ~4% baseline)
- **Average position**

### Rollback Triggers (act immediately)
- CTR drops >50% vs baseline on any seed asset for 7+ consecutive days
- Indexation ratio drops below 40% for seed assets for 7+ consecutive days
- Average position degrades by >10 positions on any seed asset

## Reference Files
- `public/meta_variants.csv` — Variant A (active) and B (stored)
- `public/meta_ab_test_plan.txt` — Full test protocol
- `public/change_log.csv` — All changes with before/after
- `public/link_slug_validation_report.csv` — Sitemap vs code slug check
