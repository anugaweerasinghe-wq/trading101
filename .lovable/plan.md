## Goal

Eliminate the indexing blockers preventing the top 50 pages from showing as **Valid** in Google Search Console, give every `/trade/:symbol` page a unique FAQ + FAQPage JSON-LD, and weave contextual internal links across Trade ↔ Markets ↔ Portfolio ↔ Learn so crawlers can reach every priority URL within 2 clicks.

---

## Phase 1 — Indexing blocker audit & fixes

**Issues found during audit:**

1. **`/trade/:symbol` URL casing leaks duplicates.** `TradeAsset.tsx` accepts uppercase symbols (e.g. `/trade/BTC`) but the canonical points to lowercase `/trade/btc`. Mixed-case URLs in the wild → "Duplicate, Google chose different canonical" warnings.
2. **`Trade.tsx` BreadcrumbList JSON-LD assigns the page URL to intermediate breadcrumb levels** when `href` is absent (`SEOSection` falls back to `fullUrl`). This causes Search Console to flag breadcrumb items with the wrong target URL.
3. **`LearnArticle.tsx` is missing the visible `SEOSection` FAQ block** despite importing it; it only emits Article + Breadcrumb JSON-LD. Article schema requires `image` to render rich results — currently absent.
4. **Several pages (`LessonDetail`, `NicheAsset`, `SEOAudit`) have canonical tags but no `<meta name="robots" content="index, follow" />`** — Google sometimes treats absence as soft-no-index when combined with thin content.
5. **`Index.tsx`** does not declare a single Organization JSON-LD WebSite + SearchAction object, which is needed for sitelinks.

**Fixes:**

- In `TradeAsset.tsx`: if `symbol` param case differs from the normalized lowercase id, render `<Navigate replace to="/trade/{lowercaseId}" />` so only one URL ever serves content.
- In `SEOSection.tsx`: when a breadcrumb item omits `href`, point its JSON-LD `item` to the **parent path the user is on** (the page's own `path`) only for the **last** crumb; intermediate crumbs without `href` should be omitted from `item` per schema.org spec (item is optional for the final element only). Update accordingly.
- In `LearnArticle.tsx`: add visible `<SEOSection>` with 4–5 article-specific FAQs and add `image: "${DOMAIN}/og-image.png"` to Article schema.
- Add `<meta name="robots" content="index, follow" />` to `LessonDetail.tsx`, `NicheAsset.tsx`, and `SEOAudit.tsx`.
- Add WebSite + SearchAction JSON-LD to `Index.tsx`.
- Verify `sitemap.xml` includes lowercase `/trade/{id}` URLs only and matches `lastmod` of today.

---

## Phase 2 — Per-asset FAQ + FAQPage JSON-LD for every `/trade/:symbol`

Today only ~18 of ~149 assets have hand-written FAQs in `ASSET_FAQS`; the rest emit no FAQPage schema.

**Approach:**

- Add a `generateAssetFAQs(asset)` fallback in `src/lib/assetContent.ts` that produces 5 high-quality, unique FAQs per asset by interpolating asset name, symbol, type, sector pillar, and category intro (e.g. "How do I practice {symbol} trading on TradeHQ?", "What drives {name} price action?", "Is {symbol} good for beginner traders?", "How does {symbol} compare to other {category} assets?", "Is real money at risk?"). Each answer is unique because it pulls asset-specific drivers/category text — not boilerplate copy.
- Update `getAssetFAQs(assetId)` to fall back to `generateAssetFAQs` when no hand-written entry exists.
- TradeAsset already renders FAQPage JSON-LD when `assetFAQs.length > 0` — this fix automatically activates schema for all 149 assets.
- Keep hand-written FAQs (BTC, ETH, NVDA, etc.) as the priority — fallback only fires when none exist.

---

## Phase 3 — Contextual internal links (crawl-depth boost)

Add **inline contextual links** (not just footer/nav) between the four hubs:

1. **TradeAsset → Learn**: under the "Market Strategic Outlook" block, add a "Learn the fundamentals" strip with 3 contextual links chosen by asset type (e.g. crypto → `/wiki/hodl-strategy`, `/wiki/whale-manipulation`, `/learn/article/crypto-basics`).
2. **TradeAsset → Portfolio**: in the disclaimer area, add an inline anchor "Track your simulated {symbol} positions in your [portfolio dashboard](/portfolio)".
3. **Markets → Trade**: Markets table rows already link to `/trade/{id}`; add a contextual paragraph above the table linking to the 6 most-traded assets by name.
4. **Portfolio → Trade & Learn**: add a "What to study next" card on Portfolio page that links to 3 Learn articles based on whether the user is up/down for the day.
5. **Learn / LearnArticle → Trade & Markets**: at the bottom of every learn article body, inject a "Practice this in the simulator" CTA card linking to `/trade` and `/markets`, plus 3 contextual `/trade/{symbol}` deep links chosen from the article's tags.
6. **WikiTerm → TradeAsset**: at end of each wiki term page, link to 4 assets where this concept is most observable (already partially present — verify and complete).

Implementation lives in a new shared component `src/components/ContextualLinks.tsx` so it can be reused across pages with a `variant` prop (`learn`, `trade`, `portfolio`, `wiki`).

---

## Phase 4 — Verification & GSC submission

- Regenerate `public/sitemap.xml` via `scripts/generate-sitemap.ts` so all 149 `/trade/{id}` URLs are listed lowercase with priority 0.7 and `<lastmod>` today.
- Re-export the top-50 GSC submission CSV to `/mnt/documents/tradehq_top50_gsc_submission_v2.csv` with the URLs the user should manually request indexing for.
- Provide a short post-deploy checklist: (a) Submit sitemap in GSC, (b) request indexing for the 50 URLs, (c) run Rich Results Test on 5 sample asset pages to confirm Breadcrumb + FAQ rich snippets.

**Note on "show as Valid":** I cannot directly mark pages Valid in GSC — only Google's crawler can. What I can guarantee is that every fix here removes the technical reasons GSC currently flags pages as Excluded / Duplicate / Crawled-not-indexed. Confirmation must come from GSC after Google re-crawls (typically 3–14 days post-submission).

---

## Files to change

- `src/pages/TradeAsset.tsx` — case-redirect, add contextual links
- `src/components/SEOSection.tsx` — fix breadcrumb item URLs
- `src/lib/assetContent.ts` — add `generateAssetFAQs` fallback
- `src/pages/LearnArticle.tsx` — visible SEOSection + Article image
- `src/pages/LessonDetail.tsx`, `src/pages/NicheAsset.tsx`, `src/pages/SEOAudit.tsx` — robots meta
- `src/pages/Index.tsx` — WebSite/SearchAction schema
- `src/pages/Markets.tsx`, `src/pages/Portfolio.tsx` — contextual link blocks
- `src/components/ContextualLinks.tsx` — **new** shared component
- `public/sitemap.xml` — regenerate
- `/mnt/documents/tradehq_top50_gsc_submission_v2.csv` — **new** export

No routing, layout, or trading flow changes. Strictly additive SEO + linking.
