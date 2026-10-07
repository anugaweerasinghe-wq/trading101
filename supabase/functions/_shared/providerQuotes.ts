// Pure provider transformations: absent fields stay absent, never synthetic.
type DataStatus = 'realtime' | 'delayed' | 'previous_close' | 'proxy' | 'mixed' | 'simulated' | 'provider';
export function finite(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(typeof value === 'string' ? value.replace('%', '') : value);
  return Number.isFinite(n) ? n : null;
}
function timestamp(value: unknown): string | null {
  if (!value) return null;
  const d = new Date(typeof value === 'number' ? value : String(value));
  return Number.isFinite(d.getTime()) ? d.toISOString() : null;
}
function quote(price: number | null, provider: string, status: DataStatus,
  observedAt: string | null, fields: Record<string, string>, note: string,
  change24h: number | null, changePercent24h: number | null,
  high24h: number | null, low24h: number | null, volume24h: number | null,
  marketCap?: number | null) {
  if (price === null || price <= 0 || price >= 1e9) return null;
  return { price, change24h, changePercent24h, high24h, low24h, volume24h,
    marketCap: marketCap ?? undefined, lastUpdated: observedAt, source: 'live' as 'live' | 'simulated',
    provenance: { status, provider, observedAt, fetchedAt: new Date().toISOString(), fields, note } };
}
export function coinQuote(c: Record<string, unknown>, proxy = false) {
  const price = finite(c.usd), pct = finite(c.usd_24h_change);
  // Percentage change is (current / previous - 1), not change/current.
  const change = price !== null && pct !== null && pct > -100 ? price - price / (1 + pct / 100) : null;
  const seconds = finite(c.last_updated_at);
  return quote(price, 'CoinGecko', proxy ? 'proxy' : 'provider',
    seconds === null ? null : timestamp(seconds * 1000),
    { price: 'provider', changePercent24h: pct === null ? 'unavailable' : 'provider',
      change24h: change === null ? 'unavailable' : 'derived from provider percentage',
      high24h: 'unavailable', low24h: 'unavailable', volume24h: c.usd_24h_vol == null ? 'unavailable' : 'provider' },
    proxy ? 'Token proxy; not the traditional spot commodity instrument. High/low unavailable.' :
      'Provider snapshot; freshness depends on provider updates. High/low unavailable from simple/price.',
    change, pct, null, null, finite(c.usd_24h_vol), finite(c.usd_market_cap));
}
export function stockQuote(q: Record<string, unknown>, provider: 'Polygon' | 'Alpha Vantage') {
  const polygon = provider === 'Polygon';
  return quote(finite(polygon ? q.c : q['05. price']), provider, 'previous_close',
    polygon ? timestamp(finite(q.t)) : timestamp(q['07. latest trading day']),
    { price: 'provider session close', change24h: polygon ? 'unavailable' : 'provider session change',
      changePercent24h: polygon ? 'unavailable' : 'provider session change',
      high24h: 'provider session high', low24h: 'provider session low', volume24h: 'provider session volume' },
    'End-of-day trading-session data, not a realtime or rolling 24-hour quote. Observation may identify a session date rather than a precise quote time.',
    polygon ? null : finite(q['09. change']), polygon ? null : finite(q['10. change percent']),
    finite(polygon ? q.h : q['03. high']), finite(polygon ? q.l : q['04. low']), finite(polygon ? q.v : q['06. volume']));
}
export function forexQuote(q: Record<string, unknown>) {
  // Only UTC is unambiguous; never silently interpret another zone as UTC.
  const observedAt = q['7. Time Zone'] === 'UTC' ? timestamp(String(q['6. Last Refreshed'] ?? '').replace(' ', 'T') + 'Z') : null;
  return quote(finite(q['5. Exchange Rate']), 'Alpha Vantage', 'provider', observedAt,
    { price: 'provider exchange rate', change24h: 'unavailable', changePercent24h: 'unavailable',
      high24h: 'unavailable', low24h: 'unavailable', volume24h: 'unavailable' },
    'Provider exchange-rate snapshot. Change, high, low and volume are unavailable from this endpoint.',
    null, null, null, null, null);
}
