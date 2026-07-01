## Phase 1 — Trust, Consistency, E-E-A-T (audit + implementation)

Scope-locked: no visual redesign, no color/typography/spacing changes, no schema/auth/portfolio/simulator logic changes, no routing removal. Reuse existing components (glass-liquid-card, Navigation, MegaFooter, shadcn primitives) throughout.

---

### A. Audit findings (from codebase sweep)

**False / unverifiable claims to remove or rewrite** (search across all files):
- Any "50,000+ traders", "best simulator", "most trusted", "#1", "trusted by thousands", "join thousands", "world-class" marketing superlatives in `Hero.tsx`, `PremiumHero.tsx`, `Index.tsx`, `CredibilityFooter.tsx`, `MegaFooter.tsx`, `WhatIsTradeHQ.tsx`, `HowItWorks.tsx`, `PremiumFeatures.tsx`, meta descriptions in `index.html` + per-page Helmet.
- Fabricated user counts, star ratings not backed by the real `reviews` table, "used by X universities" style claims.
- Replacement voice: "Built for beginners.", "Designed for learning.", "Practice trading without risking real money.", "Free forever — no signup."

**$10K → $100K residue sweep**: `rg -i "10[,]?000|10k|\$10K"` across `src/**` + `public/**` metadata + edge functions + sitemap-linked copy. Known residual spots: some FAQ answers, older LessonDetail copy, meta descriptions in `index.html`, learn articles in `src/lib/learnArticles.ts`, wiki entries, seoData programmatic templates.

**Duplicated components / metadata**:
- `CredibilityFooter.tsx` AND `MegaFooter.tsx` both exist — MegaFooter is the canonical one used in most pages, CredibilityFooter appears unused or legacy. Will consolidate imports to MegaFooter only (no deletion of file unless zero refs).
- `Hero.tsx` vs `PremiumHero.tsx` — both used; keep as-is (used on different routes).
- Duplicate FAQ copy across `SEOSection`, `PremiumFAQ`, per-page inline FAQs — flag only, no dedup this phase.

**Placeholder / thin content**: search for "Lorem", "Coming Soon", "TODO", "placeholder", empty CTA buttons. Fix inline.

**Missing pages**: `/about` and `/contact` don't exist as routes. Footer links to `#` or missing anchors. Nav has no About.

**Trust signals missing**: no single global disclaimer component — disclaimer text is duplicated inconsistently in `CredibilityFooter`, `Terms`, and scattered pages.

**Accessibility gaps** (spot audit): icon-only buttons in `Navigation`, `TradingSidebar`, `BackgroundMusic`, `MobileBottomNav` missing `aria-label`; some `<div onClick>` in market/asset cards; heading hierarchy skips on `Index.tsx`; `h-screen` in a few places should be `h-dvh`; form inputs on Contact/Reviews need explicit labels.

---

### B. Implementation steps (Phase 1 only)

**1. Global disclaimer component**
- New `src/components/EducationalDisclaimer.tsx` — subtle bordered card / inline variant prop (`variant: "footer" | "inline" | "compact"`). Uses existing tokens (`text-muted-foreground`, `border-border/40`, `bg-muted/20`). No new colors.
- Mount in: `MegaFooter` (footer variant, once), `Trade.tsx`, `TradeAsset.tsx`, `Portfolio.tsx`, `Markets.tsx`, `Learn.tsx`, `LearnArticle.tsx`, `LessonDetail.tsx`, `WikiTerm.tsx`, `SectorPillar.tsx` (inline/compact variant near bottom).
- Text exactly as specified.

**2. Remove false claims + $10K residue**
- Sweep with rg, edit each occurrence to truthful copy. Files touched will include `index.html` meta, `Hero.tsx`, `PremiumHero.tsx`, `WhatIsTradeHQ.tsx`, `PremiumFeatures.tsx`, `CredibilityFooter.tsx`, `MegaFooter.tsx`, `HowItWorks.tsx`, `SEOSection.tsx` defaults, `learnArticles.ts`, `seoData.ts`, `lessonData.ts`, `tradingGlossary.ts`, per-page Helmet meta descriptions.
- Replace unverifiable numeric stat cards on `CredibilityFooter` with verifiable ones ("150+ assets", "$100K virtual cash", "Free forever"). Remove any "50,000+ traders" style tile.

**3. About page — `/about`**
- New `src/pages/About.tsx`, registered in `App.tsx` under existing lazy pattern.
- Sections: Mission, Vision, Educational Philosophy, Transparency, Technology, Creator (Anuga Weerasinghe — exact wording from brief, no age, no fabricated credentials).
- Reuse existing layout primitives (`glass-liquid-card`, container widths, Navigation, MegaFooter). Full Helmet (title/desc/canonical/robots/OG). Breadcrumb via existing `SEOSection`. Add to sitemap generator.
- Link added to Navigation (desktop + mobile) and MegaFooter.

**4. Contact page**
- Reuse the contact info card already in MegaFooter (email `anugaweerasinghe1@gmail.com`, phone `+94 714897346`).
- New `src/pages/Contact.tsx` — professional form (name, email, subject, message) with zod validation, honeypot + timing spam protection (no backend write; opens `mailto:` prefill on submit so we don't need a new edge function). Shows response-time expectation ("within 48 hours"). Full Helmet + canonical + breadcrumb.
- Register route, add to Nav + MegaFooter, sitemap.

**5. Footer improvement (MegaFooter)**
- Ensure link groups include: About, Contact, Privacy, Terms, Disclaimer (anchor to About#disclaimer or /disclaimer? — will link to disclaimer section within About), Learn, Wiki (link to `/learn` glossary anchor), Markets.
- Add "Built by Anuga Weerasinghe · Educational Use Only" beneath copyright, subtle muted styling.
- Keep existing responsive grid and design tokens untouched.

**6. Privacy expansion**
- Extend existing `Privacy.tsx` sections with subsections: cookies, analytics status (state whichever is actually in use — none if none), user rights (GDPR/CCPA already there — verify accuracy), security specifics (HTTPS, local-only storage, no PII transmission), contact block. Keep existing card layout.

**7. Terms improvement**
- Extend existing `Terms.tsx`: explicit clauses on Educational Use, No Financial Advice, No Brokerage Relationship, No Guarantees, User Responsibilities, Limitation of Liability, Governing Law placeholder (generic).

**8. Placeholder content sweep**
- rg for "Coming Soon", "Lorem", "TODO", "placeholder" — fix or remove each.

**9. Trust polish**
- Grammar/spelling/capitalization pass across visible copy on Index, Hero, Learn, Trade, Portfolio, Markets.
- Consistent button labels ("Start Trading" vs "Start Practicing" — pick one, standardize).
- Heading hierarchy: ensure one `<h1>` per page.

**10. Accessibility (no UI change)**
- Add `aria-label` to every icon-only button in Navigation, MobileBottomNav, TradingSidebar, BackgroundMusic, SocialShare, ThemeToggle.
- Convert `<div onClick>` interactive tiles to `<button>` where trivial; otherwise add `role="button"`, `tabIndex={0}`, keyboard handlers.
- Replace `h-screen` with `h-dvh` where found.
- Ensure form inputs on Contact + Reviews + admin pages have associated `<Label htmlFor>` or `aria-label`.
- Add `alt` text audit on all `<img>`.
- Wrap each route main content in exactly one `<main>`.

**11. Quality check**
- Build passes, no TS errors.
- Manual link crawl of Nav + Footer + new pages via Playwright (headless) — screenshot About, Contact, Privacy, Terms, Home for regression, capture console errors.
- Verify no visual diff on existing pages beyond added disclaimer strip.

---

### C. Files created
- `src/components/EducationalDisclaimer.tsx`
- `src/pages/About.tsx`
- `src/pages/Contact.tsx`

### D. Files modified (est.)
`App.tsx`, `Navigation.tsx`, `MobileBottomNav.tsx`, `MegaFooter.tsx`, `CredibilityFooter.tsx` (or remove refs), `Hero.tsx`, `PremiumHero.tsx`, `WhatIsTradeHQ.tsx`, `PremiumFeatures.tsx`, `HowItWorks.tsx`, `SEOSection.tsx`, `Trade.tsx`, `TradeAsset.tsx`, `Portfolio.tsx`, `Markets.tsx`, `Learn.tsx`, `LearnArticle.tsx`, `LessonDetail.tsx`, `WikiTerm.tsx`, `SectorPillar.tsx`, `Privacy.tsx`, `Terms.tsx`, `index.html`, `learnArticles.ts`, `seoData.ts`, `lessonData.ts`, `tradingGlossary.ts`, `scripts/generate-sitemap.ts`, `public/sitemap.xml`, plus icon-only button accessibility touch-ups.

### E. Explicitly NOT in this phase
No new JSON-LD, no metadata rewrites for SEO, no new articles, no wiki expansion, no schema changes, no auth changes, no simulator/portfolio logic edits, no color/font/spacing changes.

Reply "approve" to proceed, or tell me what to adjust.
