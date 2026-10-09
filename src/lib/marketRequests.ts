import { sharedQuote } from '../../supabase/functions/_shared/sharedQuote';
import type { MarketData, CandleData, DataProvenance } from '../../supabase/functions/_shared/marketTypes';
import type { Asset } from './types';

export interface MarketResult { success: boolean; data: MarketData | CandleData[]; provenance?: DataProvenance; assetId: string }
export class MarketRequestError extends Error {
  constructor(message: string, public retryAt: number) { super(message); }
}
/** One shared REST read for the asset list; concurrent chart/status/quote requests share a promise. */
export function createMarketRequests(url: string, key: string, fetcher = fetch, now = Date.now) {
  let rows: Record<string, unknown>[] = [], rowsAt = -Infinity;
  let rowsPending: Promise<Record<string, unknown>[]> | null = null;
  const cache = new Map<string, { value: MarketResult; expires: number }>();
  const pending = new Map<string, Promise<MarketResult>>();
  const failures = new Map<string, MarketRequestError>();
  let providerRetryAt = 0;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const snapshots = async () => {
    if (now() - rowsAt < 120000) return rows;
    if (rowsPending) return rowsPending;
    rowsPending = (async () => {
      const response = await fetcher(`${url}/rest/v1/market_prices?select=asset_id,price,source,updated_at,observed_at,quote_status,quote_data`, { headers, signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Price snapshots are temporarily unavailable.');
      const result: unknown = await response.json();
      if (!Array.isArray(result)) throw new Error('Price snapshots are temporarily unavailable.');
      rows = result.filter(r => r && typeof r === 'object'); rowsAt = now();
      return rows;
    })().catch(error => { rowsAt = now() - 90000; if (rows.length) return rows; throw error; })
      .finally(() => { rowsPending = null; });
    return rowsPending;
  };
  const request = (asset: Pick<Asset, 'id' | 'type' | 'price'>, kind: 'quote' | 'candles' = 'quote', days = 1): Promise<MarketResult> => {
    const id = `${asset.id}:${asset.type}:${kind}:${days}`;
    const saved = cache.get(id);
    if (saved && saved.expires > now()) return Promise.resolve(saved.value);
    const running = pending.get(id); if (running) return running;
    const failure = failures.get(id); if (failure && failure.retryAt > now()) return Promise.reject(failure);
    const task = (async () => {
      if (kind === 'quote') {
        try {
          const row = (await snapshots()).find(r => r.asset_id === asset.id);
          const quote = row ? sharedQuote(row, now()) : null;
          if (quote) return { success: true, assetId: asset.id, data: quote, provenance: quote.provenance };
        } catch { /* A selected asset may still use the protected provider endpoint. */ }
      }
      if (providerRetryAt > now()) throw new MarketRequestError('Price service is busy. Refresh will resume automatically.', providerRetryAt);
      const params = new URLSearchParams({ assetId: asset.id, type: asset.type, basePrice: String(asset.price), dataType: kind, days: String(Math.min(days, 365)) });
      const response = await fetcher(`${url}/functions/v1/live-market-data?${params}`, { headers, signal: AbortSignal.timeout(20000) });
      if (!response.ok) {
        const retry = Number(response.headers.get('Retry-After'));
        const retryAt = now() + Math.max(30000, Math.min(Number.isFinite(retry) && retry > 0 ? retry * 1000 : 60000, 300000));
        if (response.status === 429 || response.status === 503) providerRetryAt = retryAt;
        throw new MarketRequestError(response.status === 429 ? 'Price service is busy. Refresh will resume automatically.' : 'Price service is temporarily unavailable. Refresh will resume automatically.', retryAt);
      }
      const result = await response.json() as MarketResult;
      if (!result.success || (kind === 'quote' ? !result.data || Array.isArray(result.data) || !Number.isFinite(result.data.price) || result.data.price <= 0 : !Array.isArray(result.data) || result.data.length === 0)) throw new Error('No usable market data was returned.');
      return result;
    })().then(value => { cache.set(id, { value, expires: now() + (kind === 'quote' ? 120000 : 300000) }); failures.delete(id); return value; })
      .catch(error => { const failure = error instanceof MarketRequestError ? error : new MarketRequestError('Price service is temporarily unavailable. Refresh will resume automatically.', now() + 30000); failures.set(id, failure); throw failure; })
      .finally(() => { pending.delete(id); });
    pending.set(id, task); return task;
  };
  return { snapshots, request };
}
