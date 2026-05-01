# Plan: Real Portfolio Stats + Real Logo + Realism Upgrades

## Part 1 — Real-time portfolio statistics

Today the Portfolio page only refreshes via `simulateAssetPrices` (random drift) every 5s, then recomputes positions from `ASSETS` — which means P&L, Sharpe, win rate, allocation are all based on **simulated** numbers, not the same live-data engine the Trade pages use.

Fixes in `src/pages/Portfolio.tsx`:
- Replace the `simulateAssetPrices` interval with the **same hybrid engine** as Trade.tsx:
  - On mount: hydrate prices from `getPersistedPrices()` (localStorage, 24h TTL) so refresh feels continuous.
  - Fetch real prices for **only the user's held assets** via `supabase.functions.invoke('live-market-data', ...)` — staggered batches of 5, 1s apart, then every 60s.
  - Between fetches: apply ±0.05% micro-fluctuation every 3s (anchored to last real price), matching the Trade page.
  - After each refresh: call `updatePositionPrices(portfolio)` and `recordSnapshot()` so the chart reflects real movement.
- Add a small **data-status badge** ("Live" / "Cached" / "Simulated") + "Updated Xs ago" timestamp at the top of the Portfolio header, identical visual language to TradeAsset.

Stats recomputed live (already wired, will now use real prices):
- Total Value, Available Cash, Invested, Unrealized P&L
- Sharpe Ratio, Win Rate, Winners/Losers
- Asset Allocation pie + Diversification Score
- Cash Reserve / Volatility bars

Add **two new real metrics** in `PortfolioAnalytics.tsx` that a real broker shows:
- **Max Drawdown** — computed from `getPortfolioHistory()` snapshots (peak-to-trough %).
- **Day Change** — diff between current totalValue and the snapshot ≥ 24h ago, in $ and %.

## Part 2 — Real logo across the site

The logo asset already exists at `src/assets/tradehq-logo.png` and is used in Navigation, MegaFooter, TradingSidebar. The **favicon, apple-touch-icon, manifest icons, and OG fallback** still point at `/favicon.ico` and `/og-image.png` (placeholders).

Fixes:
- Copy `src/assets/tradehq-logo.png` to `public/logo.png` (and generate a 512px square version if needed via the script).
- Update `index.html`:
  - `<link rel="icon" href="/logo.png" type="image/png" />`
  - `<link rel="apple-touch-icon" href="/logo.png" />`
  - JSON-LD `"logo"` field → `https://tradinghq.vercel.app/logo.png`
- Update `public/manifest.json` icons array with proper 192/512 PNG entries pointing at `/logo.png`.
- Audit and replace any other `placeholder.svg` / `og-image.png` logo references across pages with the real logo (Helmet `og:image` stays as the OG banner, but `og:logo` and structured data use `/logo.png`).

## Part 3 — Realism upgrades (suggestions, implemented)

Small additions that make the simulator feel like a real broker without breaking anything:

1. **Day Change badge** in the header card (+/- $ and % vs. yesterday's snapshot).
2. **Realistic order fees already exist** (0.1%) — surface them in the trade confirmation toast ("Filled at $X — fee $Y").
3. **Market open/closed indicator** in the Portfolio header for stock positions (simple US-market clock: 9:30–16:00 ET Mon–Fri → "Markets Open" green dot, else "After Hours" amber). Crypto stays 24/7.
4. **Cost basis & total return columns** in `PositionsTable` (Entry × Qty = Cost Basis) — already computable, just expose it.
5. **Realized P&L lifetime stat** — sum of (sell.price − avgPriceAtSale) × qty across all sell trades, shown alongside Unrealized P&L.
6. **Last trade timestamp** on each position row ("Held 3d 4h").

No new dependencies, no SEO/route/layout removals.

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Portfolio.tsx` | Replace sim interval with hybrid live-data engine + status badge |
| `src/components/PortfolioAnalytics.tsx` | Add Max Drawdown + Day Change metrics |
| `src/components/portfolio/PositionsTable.tsx` | Add Cost Basis column + held-duration |
| `src/lib/portfolio.ts` | Add `calculateRealizedPnL()` + `calculateMaxDrawdown()` helpers |
| `index.html` | Real favicon + apple-touch-icon + JSON-LD logo URL |
| `public/manifest.json` | Real PWA icons |
| `public/logo.png` (new) | Copy of real TradeHQ logo |

## Limitations (honest)

- "Real-time" stock prices remain bottlenecked by the Alpha Vantage free tier (~5 req/min). Held positions get priority; the rest fall back to cached/simulated with a clear badge.
- Day Change requires ≥1 day of snapshot history; first-time users will see "—" until 24h elapses.
- Max Drawdown is computed from local snapshots only (not server-side), so clearing browser data resets it.
