## Scope

Big feature pass. Broken into 5 blocks. All work stays inside the existing Bloomberg-palette design system, prerender pipeline, and `STARTING_BALANCE` = $100K rule. Every new route flows through `scripts/routes.ts` so SSG, sitemap, and canonical checks stay in sync.

---

### Block 1 — Four new learning tracks (YMYL-grade content)

New content module `src/lib/coursesData.ts` with 4 tracks. Each track has 5–7 lessons, each lesson has body copy (600–900 words, original), key takeaways, an image, a 4–6-question quiz, and a completion badge.

Tracks:
1. `options-trading-fundamentals` — calls, puts, Greeks, spreads, risk.
2. `futures-and-derivatives` — contracts, margin, contango/backwardation, hedging.
3. `macro-reading-for-traders` — CPI, Fed, yield curve, DXY, commodities linkage.
4. `trading-psychology-mastery` — biases, tilt, journaling, revenge trading, discipline.

**YMYL compliance baked into every lesson:**
- Author byline (Anuga Weerasinghe), "Last reviewed" date, "Educational simulation only — not financial advice" disclaimer above and below the fold.
- Explicit `about`/`mentions` in JSON-LD (`Course`, `LearningResource`, `Article`), plus `EducationalOccupationalCredential` for the badge.
- Sources section per lesson (SEC, CFTC, Investopedia, FRED) as visible outbound links with `rel="noopener nofollow"`.
- Sri Lankan student perspective callout where relevant (LKR examples).

**Images that actually load:** stop using missing `/lesson-*.png` paths. Generate one 1200×675 JPG per lesson via `imagegen`, save to `src/assets/courses/<track>/<lesson>.jpg`, import as ES module — this fixes the current broken images across the whole `/learn` system too (audit `lessonData.ts` and swap any broken URLs).

Routes (added to `scripts/routes.ts` for prerender + sitemap + unique title/desc/H1):
- `/courses` — index of all 4 tracks.
- `/courses/:trackSlug` — track overview + lesson list + progress bar.
- `/courses/:trackSlug/:lessonSlug` — lesson reader with quiz.

### Block 2 — "Continue where you left off" (world-class impl)

Persistence layer `src/lib/courseProgress.ts` (typed, versioned schema):

```
{ v: 1, tracks: { [slug]: { lessons: { [slug]: { status, score, completedAt } }, badgeEarnedAt? } }, lastLesson: { track, lesson, scrolledPct }, updatedAt }
```

- Storage: `localStorage` primary + `IndexedDB` mirror (via `idb-keyval`) for durability across profiles.
- Debounced writes on scroll (throttled 2s) capture `scrolledPct`.
- Cross-tab sync via `storage` event.
- Reuses existing `ContinueBanner` on `/` and `/learn` — new "Resume: {lesson}" state driven by `courseProgress.lastLesson`.
- Completion triggers `BadgeAwarded` toast + adds badge to a new `/profile/badges` mini-section on Portfolio.
- Optional AI recap: after a lesson, a "Ask the AI guide" button opens the existing `AIMentor` prefilled with the lesson context, so the AI can quiz/reinforce.

### Block 3 — SEO + GEO for every new page

For each of `/courses`, `/courses/:track`, `/courses/:track/:lesson`:
- Unique `<title>`, meta description, self-canonical (via prerender pipeline).
- JSON-LD: `Course` (track), `LearningResource` + `Article` (lesson), `BreadcrumbList`, `FAQPage` (from lesson quiz Qs), `Person` (author).
- `AIAnswerBlock` (speakable) at top of every lesson.
- `RelatedContent` linking sibling lessons + relevant `/wiki/*` terms + relevant `/how-to-trade/*` and `/strategy/*`.
- Add all lesson slugs to `public/llms.txt` and `sitemap.xml` (auto via `routes.ts`).
- H1 + 120-char summary rendered in prerender body block so crawlers see real content pre-hydration.

### Block 4 — Roadmap refresh (real dates, current status)

Rewrite `src/pages/Roadmap.tsx` timeline (today = 13 Jul 2026):

| Item | Status | Target |
|---|---|---|
| Guided learning pathways (this feature) | In Progress → Shipped this week | Jul 2026 |
| Daily streak & reminders | In Progress | Jul 2026 |
| Public trader profiles | Planned | Jul 2026 |
| Google Sign-In | Planned | Aug 2026 |
| Realistic portfolio projections | Planned | Aug 2026 |
| Remaining items currently marked Q3/Q4 2026 | Rescheduled | Aug–Oct 2026 with real month labels |

No `Q3`/`Q4` strings anywhere — real month + year only.

### Block 5 — Finish leftover items from prior turns

Sweep and complete anything left hanging:
- Verify `AIAnswerBlock` + `DefinedTerm` JSON-LD present on every content route (audit).
- Confirm `MegaFooter` links to `/courses` and its 4 tracks.
- Regenerate `sitemap.xml`, `llms.txt`, run `verify-seo.mjs` — must pass with new routes.
- Confirm no `$10,000` / `$10K` legacy strings introduced by new copy (prerender guard already enforces).
- Add `Breadcrumbs` to every new page.

---

## Technical notes

- New dep: `idb-keyval` (~600 B) for IndexedDB mirror.
- Image generation batch: 4 tracks × ~6 lessons = ~24 images at `standard` quality (JPG, 1200×675) — imported as ES modules, not `.asset.json`, so Vite fingerprints them.
- All new files typed, no `any`. TSGo typecheck must pass.
- No visual redesign — reuse existing `Card`, `Badge`, `Button`, glassmorphism tokens.
- No new backend. Progress is client-only until Google Sign-In lands in August.
- Prerender pipeline picks up new routes automatically once added to `scripts/routes.ts`.

## Explicitly NOT in this pass

- No auth (Google Sign-In is Aug).
- No server-side progress sync.
- No paid tier / gating.
- No visual redesign of existing pages.

## Verification checklist

- [ ] `/courses`, 4 track pages, ~24 lesson pages all prerender with unique title/desc/canonical/H1.
- [ ] Every lesson image loads (no 404s) — confirmed by build + Playwright screenshot spot-check.
- [ ] Quiz completes → badge saved → visible next visit → resume banner shows correct lesson.
- [ ] JSON-LD validates (Course, LearningResource, FAQPage, BreadcrumbList).
- [ ] Sitemap contains every new URL; `verify-seo.mjs` green.
- [ ] Roadmap shows real months, no Q3/Q4 placeholders.
- [ ] Typecheck + build pass.
