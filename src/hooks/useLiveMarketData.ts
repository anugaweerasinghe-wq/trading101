import { useState, useEffect, useCallback, useRef } from 'react';
import type { Asset } from '@/lib/types';
import { marketRequests } from '@/lib/marketDataClient';
export interface MarketDataProvenance {
  status: 'realtime' | 'delayed' | 'previous_close' | 'proxy' | 'mixed' | 'simulated' | 'provider';
  provider: string; fetchedAt: string; observedAt?: string | null; fields?: Record<string, string>; note?: string;
}
export interface LiveMarketData {
  price: number; change24h: number | null; changePercent24h: number | null; high24h: number | null;
  low24h: number | null; volume24h: number | null; marketCap?: number; lastUpdated: string | null;
  source: 'live' | 'simulated'; provenance?: MarketDataProvenance;
}
export interface CandleData { time: string; open: number; high: number; low: number; close: number; volume: number }
interface UseLiveMarketDataOptions { refreshInterval?: number; enabled?: boolean }
export function useLiveMarketData(asset: Asset | null, { refreshInterval = 120000, enabled = true }: UseLiveMarketDataOptions = {}) {
  const [liveData, setLiveData] = useState<LiveMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false), [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const current = useRef(asset); current.current = asset;
  const generation = useRef(0), busy = useRef<number | null>(null);
  const fetchLiveData = useCallback(async () => {
    const a = current.current, version = generation.current;
    if (!a || !enabled || busy.current === version || !Number.isFinite(a.price) || a.price <= 0) return;
    busy.current = version; setIsLoading(true);
    try {
      const result = await marketRequests.request(a);
      if (generation.current !== version || current.current?.id !== a.id || Array.isArray(result.data)) return;
      const data: LiveMarketData = { ...result.data, provenance: result.provenance ?? result.data.provenance };
      setLiveData(data); setLastFetch(new Date(data.provenance?.fetchedAt ?? Date.now())); setError(null);
    } catch (e) {
      if (generation.current === version && current.current?.id === a.id) setError(e instanceof Error ? e.message : 'Price service is temporarily unavailable.');
    } finally { if (busy.current === version) busy.current = null; if (generation.current === version) setIsLoading(false); }
  }, [enabled]);
  useEffect(() => {
    generation.current++; setLiveData(null); setError(null); setLastFetch(null); setIsLoading(false);
    if (!asset || !enabled) return;
    const visible = () => { if (!document.hidden) void fetchLiveData(); };
    void fetchLiveData(); const timer = window.setInterval(visible, Math.max(refreshInterval, 30000));
    document.addEventListener('visibilitychange', visible);
    return () => { generation.current++; window.clearInterval(timer); document.removeEventListener('visibilitychange', visible); };
  }, [asset?.id, asset?.type, enabled, refreshInterval, fetchLiveData]);
  return { liveData, isLoading, error, lastFetch, refetch: fetchLiveData, isLive: liveData?.provenance?.status === 'realtime' };
}
export function useLiveCandleData(asset: Asset | null, { refreshInterval = 300000, enabled = true }: UseLiveMarketDataOptions = {}) {
  const [candles, setCandles] = useState<CandleData[]>([]), [provenance, setProvenance] = useState<MarketDataProvenance | null>(null);
  const [isLoading, setIsLoading] = useState(false), [error, setError] = useState<string | null>(null);
  const current = useRef(asset); current.current = asset;
  const generation = useRef(0), busy = useRef<number | null>(null);
  const fetchCandles = useCallback(async () => {
    const a = current.current, version = generation.current;
    if (!a || !enabled || busy.current === version) return;
    busy.current = version; setIsLoading(true);
    try {
      const result = await marketRequests.request(a, 'candles');
      if (generation.current !== version || current.current?.id !== a.id || !Array.isArray(result.data)) return;
      setCandles(result.data); setProvenance(result.provenance ?? null); setError(null);
    } catch (e) { if (generation.current === version) setError(e instanceof Error ? e.message : 'Chart data is temporarily unavailable.'); }
    finally { if (busy.current === version) busy.current = null; if (generation.current === version) setIsLoading(false); }
  }, [enabled]);
  useEffect(() => {
    generation.current++; setCandles([]); setProvenance(null); setError(null); setIsLoading(false);
    if (!asset || !enabled) return;
    const visible = () => { if (!document.hidden) void fetchCandles(); };
    void fetchCandles(); const timer = window.setInterval(visible, Math.max(refreshInterval, 300000));
    document.addEventListener('visibilitychange', visible);
    return () => { generation.current++; window.clearInterval(timer); document.removeEventListener('visibilitychange', visible); };
  }, [asset?.id, asset?.type, enabled, refreshInterval, fetchCandles]);
  return { candles, isLoading, error, provenance, source: provenance?.status === 'provider' ? 'provider' : 'simulated', refetch: fetchCandles };
}
