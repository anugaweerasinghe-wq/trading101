/**
 * Hybrid Data Engine - Staggered viewport-aware market data fetching
 * with localStorage cache (60s TTL) and LiveSim (±0.01% every 3s)
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Asset } from '@/lib/types';

export interface HybridMarketPrice {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  source: 'live' | 'cached' | 'delayed' | 'simulated';
  lastUpdated: string;
  isDelayed: boolean;
}

const CACHE_KEY = 'tradehq_hybrid_cache';
const CACHE_TTL = 60000; // 60s

interface CacheEntry {
  data: HybridMarketPrice;
  timestamp: number;
}

function readCache(): Record<string, CacheEntry> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function writeCache(cache: Record<string, CacheEntry>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

function getCachedPrice(assetId: string): HybridMarketPrice | null {
  const cache = readCache();
  const entry = cache[assetId];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) return null;
  return { ...entry.data, source: 'cached' };
}

function setCachedPrice(assetId: string, data: HybridMarketPrice) {
  const cache = readCache();
  cache[assetId] = { data, timestamp: Date.now() };
  writeCache(cache);
}

// Staggered batch fetch — groups of 5 with 1s delay
const fetchQueue: { asset: Asset; resolve: (d: HybridMarketPrice | null) => void }[] = [];
let isFlushing = false;

async function flushQueue() {
  if (isFlushing || fetchQueue.length === 0) return;
  isFlushing = true;

  while (fetchQueue.length > 0) {
    const batch = fetchQueue.splice(0, 5);
    await Promise.allSettled(
      batch.map(async ({ asset, resolve }) => {
        try {
          const resp = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
            {
              headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (!resp.ok) throw new Error(`${resp.status}`);
          const result = await resp.json();
          if (result.success && result.data && typeof result.data.price === 'number') {
            const d: HybridMarketPrice = {
              price: result.data.price,
              change24h: result.data.change24h ?? 0,
              changePercent24h: result.data.changePercent24h ?? 0,
              high24h: result.data.high24h ?? result.data.price * 1.02,
              low24h: result.data.low24h ?? result.data.price * 0.98,
              volume24h: result.data.volume24h ?? 0,
              source: result.data.source ?? 'live',
              lastUpdated: new Date().toISOString(),
              isDelayed: false,
            };
            setCachedPrice(asset.id, d);
            resolve(d);
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      })
    );
    // 1s delay between batches
    if (fetchQueue.length > 0) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  isFlushing = false;
}

function enqueueFetch(asset: Asset): Promise<HybridMarketPrice | null> {
  return new Promise(resolve => {
    fetchQueue.push({ asset, resolve });
    flushQueue();
  });
}

/**
 * useHybridMarketData - staggered fetch with cache + LiveSim
 */
export function useHybridMarketData(asset: Asset | null) {
  const [data, setData] = useState<HybridMarketPrice | null>(null);
  const liveSimRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const basePriceRef = useRef<number>(0);

  // Fetch real data
  const fetchData = useCallback(async () => {
    if (!asset) return;

    // Check cache first
    const cached = getCachedPrice(asset.id);
    if (cached) {
      setData(cached);
      basePriceRef.current = cached.price;
      return;
    }

    const result = await enqueueFetch(asset);
    if (result) {
      setData(result);
      basePriceRef.current = result.price;
    } else {
      // Rate limit / error — show delayed badge with last cache
      const staleCache = readCache()[asset.id];
      if (staleCache) {
        setData({ ...staleCache.data, source: 'delayed', isDelayed: true });
        basePriceRef.current = staleCache.data.price;
      } else {
        // Pure fallback
        setData({
          price: asset.price,
          change24h: asset.change,
          changePercent24h: asset.changePercent,
          high24h: asset.price * 1.02,
          low24h: asset.price * 0.98,
          volume24h: 0,
          source: 'simulated',
          lastUpdated: new Date().toISOString(),
          isDelayed: true,
        });
        basePriceRef.current = asset.price;
      }
    }
  }, [asset?.id]);

  // LiveSim: ±0.01% every 3s
  useEffect(() => {
    if (!asset) return;
    fetchData();

    // Refresh real data every 60s
    const refreshInterval = setInterval(fetchData, 60000);

    // LiveSim fluctuation
    liveSimRef.current = setInterval(() => {
      setData(prev => {
        if (!prev) return prev;
        const base = basePriceRef.current || prev.price;
        const fluctuation = (Math.random() * 2 - 1) * 0.0001; // ±0.01%
        const newPrice = base * (1 + fluctuation);
        return {
          ...prev,
          price: Number(newPrice.toFixed(base < 1 ? 6 : 2)),
        };
      });
    }, 3000);

    return () => {
      clearInterval(refreshInterval);
      if (liveSimRef.current) clearInterval(liveSimRef.current);
    };
  }, [asset?.id, fetchData]);

  return {
    data,
    isDelayed: data?.isDelayed ?? false,
    source: data?.source ?? 'simulated',
  };
}
