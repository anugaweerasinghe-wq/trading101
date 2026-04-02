# Phase 3–6 Plan: Learn Page + Homepage Polish + Consistency

## A. AUDIT — What to Preserve

- **Homepage** `Index.tsx`, `Hero.tsx`, `PremiumHero.tsx`, `WhatIsTradeHQ.tsx`, `PremiumFeatures.tsx`, `TopAssetsGrid.tsx`, `MarketTrends2026.tsx`, `PremiumFAQ.tsx`, `SocialProofTicker.tsx`, `HowItWorks.tsx`, `MegaFooter.tsx`): Strong structure, premium aesthetic, good SEO schemas. Preserve the overall structure and design language.

- **Trade page** `Trade.tsx`, `TradeAsset.tsx`, all `trading/*` components): Phase 1–2 work. Do not touch unless a tiny shared consistency fix is absolutely required.

- **Portfolio page** `Portfolio.tsx`, `portfolio/*` components): Phase 1–2 work. Do not touch unless a tiny shared consistency fix is absolutely required.

- **Leaderboard, AI Mentor, WikiTerm, NicheAsset, SectorPillar pages**: Do not touch in this phase.

- **All routing** in `App.tsx`: Stable. Keep exactly as-is. No route changes.

- **MegaFooter, Navigation, MobileBottomNav**: Working well. Only tiny adjustments if required for homepage/Learn consistency.

- **SEO infrastructure**: Helmet, JSON-LD schemas, canonical tags, sitemap generation, Open Graph setup — preserve and refine only where needed.

- **LearnArticle.tsx + learnArticles.ts**: Existing long-form article content is valuable. Keep content intact.

- **LearnTradingGuide.tsx**: Interactive and useful. Preserve.

- **LessonDetail.tsx + lessonData.ts**: Strong educational depth. Preserve content structure and lesson routing.

## B. AUDIT — Problems Found

### Learn Page `Learn.tsx`)

1. **Flat information hierarchy**: The page does not clearly communicate a guided beginner → intermediate → advanced learning path.

2. **Core Courses cards are oversized**: Visual depth is too large for 6 cards, creating unnecessary scroll fatigue.

3. **Lesson cards lack clarity**: The cards do not immediately communicate that they lead to detailed lesson pages.

4. **Wiki and Sector sections feel under-explained**: They need framing so users understand why they matter.

5. **Learning path is implied, not explicit**: There is no strong “start here / next step / advanced” journey.

6. **Some section copy can be more distinct**: Important sections should feel more unique and less templated.

7. **LearnArticle breadcrumb/schema path needs checking**: Canonical/breadcrumb consistency should match the real route structure exactly.

### Homepage

8. **Homepage is already strong**: Only high-confidence polish should be made.

9. **Bottom internal link hub can be more premium**: It should visually match the rest of the page better.

10. **Any unverifiable social-proof numbers should be removed or softened**: Keep trust high without fabricated counts.

### Site-wide

11. **Internal linking consistency can be improved**: Homepage ↔ Learn ↔ important educational destinations should be more intentional.

12. **Metadata/schema consistency should be checked, not blindly rewritten**: Only fix real inconsistencies.

## C. Files to Touch

### Phase 4 — Learn Page

1. *`src/pages/Learn.tsx`** — Restructure the page hierarchy, strengthen learning path clarity, reduce oversized visual blocks, improve section intros, improve lesson card clarity, improve wiki/sector presentation.

2. *`src/pages/LearnArticle.tsx`** — Verify and fix breadcrumb/schema/canonical path only if it truly mismatches the real route.

### Phase 5 — Homepage Polish

3. *`src/pages/Index.tsx`** — Light polish only: improve bottom internal link hub styling, tighten copy where beneficial, improve consistency with Learn and other premium sections.

4. *`src/components/SocialProofTicker.tsx`** — Replace unverifiable user-count language with accurate, non-fabricated trust language if needed.

### Shared / SEO / Consistency (Only If Necessary)

5. **Any small shared metadata or internal-linking helper files already used by Learn/Homepage** — touch only if genuinely required to fix a real consistency or SEO issue.

## D. Files Explicitly NOT Touching

- `src/pages/Trade.tsx`, `src/pages/TradeAsset.tsx`, all `trading/*` components

- `src/pages/Portfolio.tsx`, all `portfolio/*` components

- `src/pages/Leaderboard.tsx`, `src/pages/AIMentor.tsx`

- `src/pages/WikiTerm.tsx`, `src/pages/NicheAsset.tsx`, `src/pages/SectorPillar.tsx`

- `src/components/PremiumHero.tsx`, `src/components/PremiumFeatures.tsx`, `src/components/PremiumFAQ.tsx`

- `src/components/WhatIsTradeHQ.tsx`, `src/components/TopAssetsGrid.tsx`, `src/components/MarketTrends2026.tsx` unless a very small copy-only or styling-only consistency fix is required

- `src/components/MegaFooter.tsx`, `src/components/Navigation.tsx` unless a tiny consistency adjustment is required

- `src/components/Hero.tsx`, `src/components/HowItWorks.tsx`

- `src/App.tsx` — no route changes needed

- `src/lib/learnArticles.ts`, `src/lib/lessonData.ts` — preserve content unless a route/path reference truly requires correction

- `src/pages/LearnTradingGuide.tsx` — preserve as-is

## E. Implementation Plan

### Phase 3: Audit First

- Inspect the actual current codebase before making changes

- Confirm exact Learn page structure, real route paths, actual schema/canonical implementation, and homepage section composition

- Identify exactly which files need edits and which should remain untouched

- Do not implement speculative changes before verifying the codebase

### Phase 4: Learn Page

**Learn.tsx restructure:**

- Add a clearer **Learning Path** section near the top that makes progression obvious without turning the page into a school-style dashboard

- Group or frame the content as a progression such as:

  - **Foundations**

  - **Strategy & Analysis**

  - **Advanced Practice**

- Reduce oversized course-card visual height so the page feels tighter and more premium

- Add lesson clarity signals such as:

  - lesson label

  - difficulty badge

  - estimated read/study time

- Add stronger, distinct intro copy for the main sections so they do not feel repetitive

- Improve Wiki / Sector section framing with a short explanation of why users should explore them

- Add a stronger “Start Here” CTA linking to the best beginner entry point

- Keep the current dark premium style intact

- Do not add spammy filler cards or duplicate content

**LearnArticle.tsx check/fix:**

- Verify the actual article route

- Fix breadcrumb/schema/canonical path only if it truly mismatches the real route

- Do not rewrite article content

### Phase 5: Homepage Polish

**Index.tsx:**

- Keep the homepage structure intact

- Only make high-confidence, low-risk polish changes

- Upgrade the bottom internal link hub to better match the premium visual language already used elsewhere

- Tighten copy only where it clearly improves clarity, trust, or CTA quality

- Improve alignment between Homepage and Learn page tone/styling where useful

- Do not redesign the hero

- Do not add random new sections

- Do not change core positioning

**SocialProofTicker.tsx:**

- Remove or soften any unverifiable numeric social-proof claims

- Replace them with truthful, non-fabricated trust signals such as:

  - "Free paper trading"

  - "No signup required"

  - "Stocks, ETFs & crypto"

  - "AI trading mentor"

  - "Built for beginners"

### Phase 6: QA

- Verify all imports resolve

- Verify Learn page renders correctly

- Verify homepage renders correctly

- Verify internal links are valid

- Verify no broken routes

- Verify breadcrumb/schema/canonical fixes are accurate

- Verify responsive layout at mobile and desktop widths

- Verify no placeholder text or duplicated copy was introduced

- Verify Trade and Portfolio pages remain untouched

- Run build / lint / typecheck if available

- Fix any errors found before finishing

- Return exact files touched and exact checks performed