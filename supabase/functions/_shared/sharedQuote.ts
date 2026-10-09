import type { MarketData } from "./marketProviders.ts";

/** Preserve observation time and missing fields when serving a shared provider quote. */
export function sharedQuote(row: Record<string, unknown>, now = Date.now()): MarketData | null {
  const fetched = Date.parse(String(row.updated_at));
  if (!Number.isFinite(fetched) || now - fetched > 6 * 60000 || fetched > now + 60000) return null;
  const price = Number(row.price);
  if (!Number.isFinite(price) || price <= 0 || price >= 1e9) return null;
  const observed = row.observed_at ? String(row.observed_at) : null;
  const candidate = row.quote_data as MarketData | null;
  const saved = candidate && Number(candidate.price) === price && candidate.provenance?.observedAt === observed ? candidate : null;
  const observedTime = observed ? Date.parse(observed) : NaN;
  const stale = !Number.isFinite(observedTime) || now - observedTime > 15 * 60000 || observedTime > now + 60000;
  return {
    price, change24h: saved?.change24h ?? null, changePercent24h: saved?.changePercent24h ?? null,
    high24h: saved?.high24h ?? null, low24h: saved?.low24h ?? null, volume24h: saved?.volume24h ?? null,
    marketCap: saved?.marketCap, lastUpdated: observed, source: "live",
    provenance: {
      ...(saved?.provenance ?? {}), status: stale ? "delayed" : "provider",
      provider: String(row.source), fetchedAt: String(row.updated_at), observedAt: observed,
      note: stale ? "Cached provider quote; its observation is older than 15 minutes. It is not a current price."
        : "Shared provider snapshot. Refreshed about every five minutes; unavailable fields remain empty.",
    },
  };
}
