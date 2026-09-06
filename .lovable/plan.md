# TradeHQ: quality pass, mobile menu fix, and a deep rewrite of 30 key pages

Goal: fix the visible mobile flaw, remove anything that still looks templated, rewrite the pages that matter most for search, and get the site into the shape AdSense approves.

## 1. Mobile navigation (the flaw in your screenshot)

Today the menu opens inside the top bar, which is see-through until you scroll, so the page shows straight through the links.

- Replace the inline dropdown with a proper full-height slide-in panel: solid backdrop, dimmed page behind it, rounded edges, no bleed-through.
- Page scrolling locks while it's open; it closes on tap-outside, on Escape, and automatically when you open a page.
- Bottom bar and the panel stop fighting each other (safe spacing on notched phones).
- Same treatment for the floating sound button and the "Daily" chip so nothing sits on top of text.

## 2. Sweep for anything that reads as templated

- Compare every page's crawler text against every other page and flag any repeated sentence patterns, boilerplate intros, or copy that only swaps a name.
- Rewrite the flagged sections in a human, specific voice with real teaching detail.
- Re-check every claim: no invented numbers, ratings, results, user counts, or price predictions. Everything stays labelled as practice/simulated with the educational disclaimer.
- Confirm thin instrument pages stay out of search and out of the sitemap.

## 3. Rewrite the 20 best-performing and 10 worst pages

No new pages. Depth only.

- Selection: ideally you export the last 3 months of pages from Search Console (or connect it) and I use the real list. If you'd rather not, I'll pick the 20 from the strongest topics we already rank for and the 10 weakest from the audit.
- For each of the 30: sharper title and description written for clicks (a benefit and a number, not a keyword list), a stronger opening answer, richer body with examples and worked walk-throughs, a real FAQ, a comparison or table where it helps, clearer next steps, and better links to related pages.
- Add the answer-style summary block on the ones that lack it, so AI answer engines and voice results can quote the page.
- Keep every rewrite grounded in the platform's own material — no filler.

## 4. Search and AI-answer improvements sitewide

- Titles and descriptions checked for uniqueness, length and click appeal across all indexable pages.
- Structured data reviewed per page type (courses, definitions, guides, comparisons, breadcrumbs, organisation) and fixed where it's missing or wrong.
- Internal linking pass so every important page is reachable in two clicks and the strongest pages pass value onward.
- Sitemap regenerated, robots and canonicals re-verified on the custom domain, and the old domain confirmed to redirect cleanly.
- Page speed pass: images sized and lazy-loaded, heavy widgets deferred, fonts trimmed.

## 5. AdSense readiness

- Every page: substantial original content, visible disclaimer, working navigation, no dead ends.
- About, Contact, Privacy, Terms reviewed for completeness and a working contact route.
- Admin, validator and utility pages kept out of search.
- No misleading financial promises anywhere.

## 6. Other fixes I'll hunt for

Small things that quietly cost you visitors: tap targets under 44px, text that still sits low-contrast on bright buttons, layout shifting as prices load, forms without error states, missing loading and empty states, keyboard focus rings, and any page that breaks at 320px width.

## When to resubmit AdSense

After this ships and you publish: wait until the rewritten pages are actually re-crawled — check in Search Console that a good share of them show as indexed. Realistically **10–14 days after publishing**, and only once indexed pages are climbing. Resubmitting before the crawl catches up gets you re-reviewed on the old content.

## Technical notes

Work lands in the prerender pipeline (`scripts/content.ts`, `staticCopy*.ts`, `routes.ts`, `generate-sitemap.ts`, `verify-seo.mjs`) plus the page components for the rewrites, and `src/components/Navigation.tsx` for the menu. The SEO verifier gets extra checks: duplicate-phrase detection, title/description length, one H1, disclaimer presence, and minimum internal links.
