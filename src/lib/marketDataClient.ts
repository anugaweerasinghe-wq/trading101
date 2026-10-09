import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../integrations/supabase/config';
import { createMarketRequests } from './marketRequests';
import { sharedQuote } from '../../supabase/functions/_shared/sharedQuote';
import { persistPrice } from './pricePersistence';
import type { Asset } from './types';
export const marketRequests = createMarketRequests(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
export async function refreshAssetSnapshots(assets: Asset[]) {
  const rows = await marketRequests.snapshots();
  const quotes = new Map(rows.map(row => [String(row.asset_id), sharedQuote(row)]));
  const providerIds = new Set<string>();
  const updated = assets.map(asset => {
    const quote = quotes.get(asset.id);
    if (!quote) return asset;
    providerIds.add(asset.id);
    const next = { ...asset, price: quote.price, change: quote.change24h ?? 0, changePercent: quote.changePercent24h ?? 0 };
    persistPrice(next.id, next.price, next.change, next.changePercent, 'delayed');
    return next;
  });
  return { assets: updated, providerIds };
}
