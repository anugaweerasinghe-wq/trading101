# Plan: Newsletter Fix, Performance, and Hero CTA Update

## Changes (3 files)

### 1. `src/App.tsx` — Lazy-load all route pages

All 18 page imports are eagerly loaded, meaning the entire app's JS is downloaded on initial load. Convert all non-homepage page imports to `React.lazy()` with `Suspense` fallback. This is the single biggest performance win available.

### 2. `src/components/PremiumHero.tsx` — Change secondary CTA

- Change "View Leaderboard" button text to "Learn Trading"
- Change `Link to="/leaderboard"` to `Link to="/learn"`
- No other changes to the hero

### 3. `src/components/NewsletterSignup.tsx` — Already functional, minor UX polish

The newsletter form already correctly inserts into the `subscribers` database table with proper RLS. The form works.  If possible fully automate the process of making a newsletter and sending to the subscribers of the newsletter for free. Small improvements:

- Add `autocomplete="email"` to the input for faster mobile entry
- Disable the submit button when email is empty (prevents unnecessary validation toasts)

### What stays untouched

- All other pages, components, routing structure, styling, and functionality remain exactly as-is
- The `subscribers` table and RLS policy are already correctly configured — no database changes needed

### Technical detail

- Lazy loading uses `React.lazy(() => import(...))` with a minimal `Suspense` fallback (a simple centered spinner or empty div)
- Only the Index page stays eagerly imported since it's the landing page
- This reduces initial bundle size significantly since Trade, Portfolio, Learn, and all other pages won't load until navigated to