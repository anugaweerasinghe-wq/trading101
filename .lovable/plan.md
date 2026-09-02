# Fix indexing + AdSense rejection at the root cause

## What I found (measured on the live site today)

Every one of the 278 URLs serves the **same 60-word skeleton** in its raw HTML. Example, `/wiki/backtesting`:

```text
<h1>Backtesting — Trading Wiki</h1>
<p>Testing a strategy against historical data ... $100,000 in free virtual cash.</p>
<p>Loading the interactive experience…</p>
<p>Educational simulation only — not financial advice. TradeHQ home.</p>
```

Measured rendered-in-HTML word count inside `#root`: **0 real content words** on `/wiki/backtesting`, `/trade/zs`, `/courses/futures-and-derivatives`, `/contact`, `/compare/nvidia-vs-amd`, `/learn/country/india`. Titles, descriptions and canonicals are correct and self-referencing — that part is fine.

So the rich content we wrote exists only after JavaScript runs. That single fact explains both problems:

- **79 "Discovered / Crawled – not indexed"**: Google's renderer is a second, deferred pass. On a young domain it triages by what the first pass sees — and the first pass sees 278 near-identical boilerplate pages. "Duplicate, Google chose different canonical" on `/trade/btc`, `/ai-mentor`, several `/wiki/*` is the same cause: in raw HTML those pages genuinely are duplicates of each other.
- **AdSense rejection**: the reviewer crawl sees the skeleton. "Loading the interactive experience…" on 278 pages reads as low-value, mass-generated content under the programme policies.

Adding more words to the React components will not fix this. The content has to be in the HTML that arrives from the server.

## The fix

**1. Make the prerender output the real page content (core change)**

`scripts/prerender.ts` currently writes a fixed 4-line block. It will instead render each route's full content as static HTML, built from the same data modules the React pages read (`tradingGlossary.ts`, `coursesData.ts`, `seoData.ts`, `countryGuides.ts`, `assetContent.ts`, `nicheData.ts`, `lessonData.ts`). Per family:

- `/wiki/:slug` — definition, why it matters, worked example, common mistakes, related terms as real `<a>` links.
- `/courses/:track` and `/courses/:track/:lesson` — outcomes, prerequisites, full lesson body, next-lesson link.
- `/compare/:slug`, `/strategy/:slug`, `/how-to-trade/:symbol`, `/learn/country/:slug` — the long-form sections already authored.
- `/trade/:symbol` — asset description, what moves it, how to practise it, related assets.
- Static pages (`/about`, `/contact`, `/privacy`, `/terms`, `/roadmap`, hubs) — their actual copy.

Each block gets a real nav (header links + breadcrumb + footer links) so crawlers can walk the site without JS, the educational disclaimer, and no "Loading…" placeholder. React still hydrates over it on mount, so the user experience is unchanged.

Build-time gate: fail the build if any route's static body is under 450 words or if two routes share a body hash.

**2. Cut the low-value programmatic surface**

60 `/trade/:symbol` pages exist for assets with little unique writing. Under AdSense's low-value-content rule, breadth without substance hurts more than it helps. Plan: keep the assets that have authored content in `assetContent.ts`, and for the rest remove them from the sitemap and mark them `noindex` until real per-asset copy exists. Same test applied to `/niche/*` and `/sectors/*`.

**3. AdSense policy sweep across every page**

Against the programme policies page: unique substantive content, clear navigation, working About / Contact / Privacy / Terms with real detail, visible YMYL and "educational simulation only" disclaimers, no misleading financial claims or implied returns, no pages that are pure tool-with-no-content, no broken or empty routes, ad code not on admin/utility/empty pages. Admin routes stay out of the sitemap and get `noindex`.

**4. Resubmit**

Regenerate sitemap, run the IndexNow submit script, request re-review in Search Console for a sample of the affected URLs, then resubmit to AdSense once the static HTML checks pass.

## Verification before I hand it back

Fetch the built HTML for one URL from every family with JavaScript disabled and report a table of: word count in raw HTML, single H1, unique title/description, self-canonical, disclaimer present, internal links present. No family ships under 450 raw-HTML words.

## Technical notes

- No redesign, no new routes, no framework migration. The change is concentrated in `scripts/prerender.ts` plus small content-extraction helpers in `scripts/routes.ts`.
- Alternative considered: true SSR (render the React tree at build, or migrate to TanStack Start). It is the cleaner long-term answer, but the app reads `window`, Supabase and chart libraries during render, so it is a much larger, riskier change. The static-content prerender gets crawlers the same HTML with far less blast radius. Happy to do the SSR migration instead if you prefer.
- Expect indexing to recover over days-to-weeks after re-crawl; AdSense should be resubmitted only after the new HTML is live.
