/**
 * Price Persistence Layer
 * Stores last-known prices in localStorage so reloads feel continuous.
 * Entries expire after 24 hours.
 */

const CACHE_KEY = 'tradehq_price_cache';
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24h

export interface PersistedPrice {
  price: number;
  change: number;
  changePercent: number;
  source: 'live' | 'cached' | 'simulated' | 'delayed';
  timestamp: number;
}

function readAll(): Record<string, PersistedPrice> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, PersistedPrice>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // storage full — silently ignore
  }
}

export function persistPrice(
  assetId: string,
  price: number,
  change: number,
  changePercent: number,
  source: PersistedPrice['source'] = 'live'
) {
  const all = readAll();
  all[assetId] = { price, change, changePercent, source, timestamp: Date.now() };
  writeAll(all);
}

export function getPersistedPrice(assetId: string): PersistedPrice | null {
  const all = readAll();
  const entry = all[assetId];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > EXPIRY_MS) return null;
  return entry;
}

export function getPersistedPrices(): Record<string, PersistedPrice> {
  const all = readAll();
  const now = Date.now();
  const valid: Record<string, PersistedPrice> = {};
  for (const [id, entry] of Object.entries(all)) {
    if (now - entry.timestamp <= EXPIRY_MS) {
      valid[id] = entry;
    }
  }
  return valid;
}
