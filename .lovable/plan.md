## Plan: AI Scenario Builder + Auto-Evolving Leaderboard

Two independent features. Both use existing infrastructure (Lovable AI Gateway, localStorage persistence, ASSETS price data).

---

### Feature 1 — AI Scenario Builder ("What if BTC drops 30%?")

A new card on `/portfolio` where the user types a free-form what-if question. We extract the asset(s) and shock magnitude using Lovable AI (structured tool-call output), then run a deterministic Monte Carlo on their current positions to produce expected portfolio outcome with risk bands.

**New edge function:** `supabase/functions/scenario-parser/index.ts`

- Input: `{ prompt, holdings: [{symbol, name, type, quantity, currentPrice}] }`
- Calls Lovable AI (`google/gemini-3-flash-preview`) with a tool schema:
  ```
  parse_scenario({ shocks: [{symbol, shockPercent, confidence}], horizonDays, narrative })
  ```
- Returns structured shocks + a 2–3 sentence narrative (educational simulation framing).
- Handles 429/402 errors with friendly toasts.
- CORS + `verify_jwt = false` (default).

**New file:** `src/lib/scenarioEngine.ts`

- `runScenario(portfolio, shocks, horizonDays)` → runs 1,000 Monte Carlo paths:
  - For each held asset: applies the directional shock as the **mean** drift.
  - Volatility per asset class: crypto 4%/day, stock 1.5%/day, etf 1%/day, commodity 1.2%/day, forex 0.6%/day.
  - Correlation: assets sharing the same shock category move together (simplified single-factor model).
  - Cash unchanged.
- Returns `{ p5, p25, median, p75, p95, expected, worstCase, bestCase, deltaPercent, perAsset: [...] }`.

**New component:** `src/components/portfolio/ScenarioBuilder.tsx`

- Input field with example chips ("What if BTC drops 30%?", "ETH +50% in 30 days", "Tech stocks crash 20%").
- "Run Scenario" button → calls edge function → runs engine → renders:
  - **Risk band chart**: shaded p5–p95 area, p25–p75 inner band, median line (uses recharts AreaChart already in deps).
  - **Outcome cards**: Expected $, Worst case (p5), Best case (p95), Probability of loss.
  - **Per-asset breakdown**: each held asset's expected price after shock.
  - **AI narrative** with mandatory disclaimer: "(Educational simulation only — not financial advice.)"
- Empty-state when no positions: prompts user to buy assets first.
- Glassmorphism 2.0 styling, `active:scale-97` on button.

**Integration:** Add `<ScenarioBuilder portfolio={portfolio} />` in `src/pages/Portfolio.tsx` between `PortfolioAnalytics`/`RiskManagement` row and the stat cards row.

---

### Feature 2 — Auto-Evolving Leaderboard

Currently `src/pages/Leaderboard.tsx` uses a hardcoded array. Convert it to evolve realistically every few days based on simulated market drift, persisted in localStorage so all visitors on the same device see consistent rankings that progress over time.

**New file:** `src/lib/leaderboardEngine.ts`

- Seed roster of 10 traders (current usernames preserved for continuity).
- `getLeaderboard()`:
  - Reads `tradehq_leaderboard` from localStorage (state: `{ traders: [...], lastUpdate: timestamp }`).
  - If missing → seed with current values, save, return.
  - If `Date.now() - lastUpdate >= 3 days` → run `evolveLeaderboard(daysElapsed)`:
    - Each trader's portfolioValue drifts by `dailyReturn ~ N(0.001, traderVolatility)` per elapsed day.
    - Each trader has a fixed personality: aggressive (high σ), steady (low σ), etc. — keeps "SteadyEddie" steady, "CryptoPhantom" volatile.
    - Recomputes `gain%` from $10,000 baseline.
    - Re-sorts by gain% and reassigns ranks.
    - Updates `bestTrade` occasionally (every ~2 evolutions) by picking a random asset from `ASSETS` with a plausible % move.
    - Saves new state with fresh timestamp.
- Cap values to a realistic range ($6k–$25k) so no runaway growth.

**Update `src/pages/Leaderboard.tsx`:**

- Replace hardcoded array with `useState(getLeaderboard())`.
- Add `useEffect` that calls `getLeaderboard()` on mount (handles deferred evolution).
- Show "Last updated X days ago • Next refresh in Y days" subtle timestamp under the title.
- Add a small live-pulse indicator next to "Live Rankings" badge using `LiveStatusIndicator` if available, else a simple animated dot.
- Keep all existing FAQ, breadcrumbs, schema, CTA intact.

**Update FAQ copy** in `Leaderboard.tsx` "How often is the leaderboard updated?" answer:

> "Rankings evolve every 3 days based on simulated market performance. Each trader's portfolio drifts realistically based on their risk profile."

---

### Technical Details

**Stack used:** React 18, recharts, react-helmet-async, Lovable AI Gateway (no API key needed for user), localStorage persistence. No new dependencies.

**Files created:**

- `supabase/functions/scenario-parser/index.ts`
- `src/lib/scenarioEngine.ts`
- `src/lib/leaderboardEngine.ts`
- `src/components/portfolio/ScenarioBuilder.tsx`

**Files edited:**

- `src/pages/Portfolio.tsx` (mount ScenarioBuilder)
- `src/pages/Leaderboard.tsx` (dynamic data + timestamp + updated FAQ)

**Compliance:** All scenario outputs include the mandatory disclaimer "(Educational simulation only — not financial advice.)". Leaderboard remains framed as "Simulated/Practice".

**No DB changes, no new secrets** — `LOVABLE_API_KEY` already configured.  
  
DO NOT CHANGE ANY CURRENT FEATURES OR SEO/GEO!