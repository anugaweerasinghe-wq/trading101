# Fix "Discovered – currently not indexed" pages

Google has crawled but skipped 131 URLs. I measured rendered word counts on one page from every affected family on the live app. Most families are fine; four are genuinely thin, and thin + templated is the usual reason Google defers indexing.

## Measured today

| Page family | Words | Verdict |
|---|---|---|
| /markets, /courses, /trade/:symbol, /courses/*/lesson | 740–2,230 | Rich, fine |
| /terms, /compare/*, /portfolio, /wiki/* | 410–650 | Acceptable |
| /privacy | 410 | Acceptable |
| /about | 369 | Borderline |
| /learn/country/:slug | 352 | Thin |
| /roadmap | 351 | Thin |
| /how-to-trade/:symbol | 273 | Thin |
| /courses/:track (hub) | 244 | Thin |
| /contact | 112 | Very thin |

So the compare, wiki, trade and course-lesson URLs in the list are not thin — they are waiting on crawl budget and trust after the domain move. The fix there is linking and signals, not more text.

## What to change

**1. Thicken the four thin families (unique, non-boilerplate copy)**
- `/how-to-trade/:symbol` — add per-asset sections: what actually moves this asset, a realistic first practice trade with position sizing, session/liquidity timing, common beginner mistakes for this specific instrument, and how to review the trade afterwards. Target 600+ words, drawn from existing per-asset data so no two pages read alike.
- `/courses/:track` hub — add a "what you'll be able to do", prerequisites, how the lessons build on each other, who the track is not for, and a per-lesson one-paragraph summary instead of bare titles. Target 600+ words.
- `/learn/country/:slug` — expand each country with local broker/regulator context, currency and tax caveats framed as "check with a local professional", typical starting capital in local currency, and locally relevant assets. Target 600+ words, genuinely different per country.
- `/contact` — add response expectations, what to include in a message, a short support FAQ, and links to the most-requested pages. Target 450+ words.
- `/about` and `/roadmap` — light expansion (~150 extra words each) on methodology, who builds it, how content is reviewed, and what "shipped" means.

**2. Internal linking so orphan URLs get crawled**
- Add contextual cross-links: every `/wiki/*` term links to two related terms plus the relevant strategy or course lesson; every `/trade/:symbol` links to its `/how-to-trade/:symbol` and any comparison containing it, and vice versa.
- Add a browsable index page listing all wiki terms and all how-to-trade guides, linked from the footer, so no page is more than two clicks from the homepage.

**3. Crawl signals after the domain move**
- Add `<lastmod>` to sitemap entries only for pages whose content this change actually rewrites; leave the rest without it rather than stamping today's date on everything.
- Re-run the sitemap generator and the IndexNow submit script after the content ships.

**4. Verify**
- Re-run the rendered word-count check across every affected family and confirm no page in the list is under 450 words, each has one H1, a unique title and description, and the educational disclaimer.

## Technical notes
- Copy lives in the existing data modules (`src/lib/nicheData.ts`, `src/lib/coursesData.ts`, `src/lib/countryGuides.ts`, `src/lib/assetContent.ts`); page components render new sections. No new routes, no redesign.
- Word counts are measured against the rendered `<main>` on the running preview, matching how the earlier audits were done.
- No claims, stats, or credentials are invented; every new section keeps the "Educational simulation only — not financial advice." line.

## Scope note
Adding text does not force indexing. Expect Google to re-crawl over days-to-weeks; the measurable win is that no URL is skippable for quality reasons.
