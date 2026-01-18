# Google Search Console Submission Instructions

## Prerequisites
- Verified ownership of https://tradinghq.vercel.app/ in Google Search Console
- Site verification code already added: `I9Z6Vo-t00zuqHRrR_RFgAZ14hsA5YzA0gHeK2POL-I`

## New in v2.0
- ✅ Breadcrumb navigation on all /trade/{symbol} pages
- ✅ FAQPage schema for "How to practice trade [Asset]?" queries
- ✅ Twitter Card (summary_large_image) metadata
- ✅ Related Assets internal linking section
- ✅ Asset-specific theme colors for OG previews

## Step 1: Submit Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select your property: `https://tradinghq.vercel.app/`
3. Navigate to **Sitemaps** in the left sidebar
4. Enter sitemap URL: `sitemap.xml`
5. Click **Submit**

## Step 2: Request Indexing for Priority Pages

For faster indexing, manually request indexing for key pages:

1. Go to **URL Inspection** in Search Console
2. Enter each priority URL and click **Request Indexing**:

### High Priority (Submit First)
- `https://tradinghq.vercel.app/`
- `https://tradinghq.vercel.app/trade`
- `https://tradinghq.vercel.app/learn-trading-guide`

### Medium Priority (Submit Next)
- `https://tradinghq.vercel.app/trade/btc`
- `https://tradinghq.vercel.app/trade/eth`
- `https://tradinghq.vercel.app/trade/aapl`
- `https://tradinghq.vercel.app/trade/nvda`
- `https://tradinghq.vercel.app/trade/spy`

## Step 3: Monitor Indexation

### Daily Checks (First 7 Days)
1. Go to **Coverage** report
2. Monitor **Valid** vs **Excluded** pages
3. Check for any **Errors** or **Warnings**

### Key Metrics to Track
- **Indexation Ratio**: Valid indexed pages / Total submitted pages
  - Target: > 40% within 7 days
  - If below 40%, pause new page generation

- **Time on Page**: Monitor in Google Analytics
  - If asset pages are 50% below site average, investigate content quality

## Step 4: Rich Results Testing

Test structured data for each page type:

1. Use [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter URLs to validate:
   - Homepage: Check SoftwareApplication, EducationalOrganization
   - Learn Trading Guide: Check FAQPage schema
   - Asset pages: Check WebPage, FinancialProduct schema

### Expected Rich Result Types
| Page | Schema Types |
|------|--------------|
| Homepage | SoftwareApplication, EducationalOrganization, BreadcrumbList |
| /learn-trading-guide | FAQPage, HowTo, Article |
| /trade/{symbol} | WebPage, FinancialProduct |

## Step 5: Post-Launch Guardrails

If any of these conditions occur after 7 days, generate `diagnostic_report.txt`:

1. **Indexation Ratio < 40%**: Too many pages excluded
2. **Avg Time on Page 50% below site average**: Content quality issue
3. **High bounce rate on asset pages**: User experience problem

### Diagnostic Report Template
```
Date: [DATE]
Issue: [DESCRIPTION]
Affected URLs: [LIST]
Recommended Action: [STEPS]
```

## URL List Reference
See `list_of_urls.csv` for complete URL inventory with priorities.

## Notes
- Total URLs in sitemap: 32 (7 core + 25 seed assets)
- Sitemap size: Well under 50k limit (no index needed)
- All pages include canonical URLs
- OG images configured for social sharing
