import { useState, useEffect, useCallback, useRef } from 'react';
import { Asset } from '@/lib/types';

export interface LiveMarketData {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap?: number;
  lastUpdated: string;
  source: 'live' | 'simulated';
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface UseLiveMarketDataOptions {
  refreshInterval?: number; // in milliseconds, default 30000 (30 seconds)
  enabled?: boolean;
}

// Cache for market data to prevent excessive API calls
const marketDataCache = new Map<string, { data: LiveMarketData; timestamp: number }>();
const CACHE_TTL = 15000; // 15 seconds cache

export function useLiveMarketData(
  asset: Asset | null,
  options: UseLiveMarketDataOptions = {}
) {
  const { refreshInterval = 30000, enabled = true } = options;
  
  const [liveData, setLiveData] = useState<LiveMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  
  const isMounted = useRef(true);
  const fetchInProgress = useRef(false);

  const fetchLiveData = useCallback(async () => {
    if (!asset || !enabled || fetchInProgress.current) return;
    
    // Validate asset has a valid price
    if (typeof asset.price !== 'number' || isNaN(asset.price) || asset.price <= 0) {
      console.log(`Skipping live fetch for ${asset.symbol}: invalid base price`);
      return;
    }

    // Check cache first
    const cacheKey = `${asset.id}-quote`;
    const cached = marketDataCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setLiveData(cached.data);
      return;
    }

    fetchInProgress.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // Fetch live market data using URL params
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (isMounted.current && result.success && result.data) {
        const data = result.data;
        // Validate that we got a valid price back
        if (typeof data.price === 'number' && !isNaN(data.price) && data.price > 0) {
          const marketData: LiveMarketData = {
            price: data.price,
            change24h: typeof data.change24h === 'number' ? data.change24h : 0,
            changePercent24h: typeof data.changePercent24h === 'number' ? data.changePercent24h : 0,
            high24h: typeof data.high24h === 'number' ? data.high24h : data.price * 1.02,
            low24h: typeof data.low24h === 'number' ? data.low24h : data.price * 0.98,
            volume24h: typeof data.volume24h === 'number' ? data.volume24h : 0,
            marketCap: typeof data.marketCap === 'number' ? data.marketCap : undefined,
            lastUpdated: data.lastUpdated || new Date().toISOString(),
            source: data.source || 'simulated',
          };
          setLiveData(marketData);
          setLastFetch(new Date());
          
          // Update cache
          marketDataCache.set(cacheKey, { data: marketData, timestamp: Date.now() });
        }
      }
    } catch (err) {
      console.error('Live market data fetch error:', err);
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch live data');
        
        // Fallback to simulated data based on asset
        setLiveData({
          price: asset.price,
          change24h: asset.change,
          changePercent24h: asset.changePercent,
          high24h: asset.price * 1.02,
          low24h: asset.price * 0.98,
          volume24h: asset.type === 'crypto' ? 50000000000 : 10000000,
          lastUpdated: new Date().toISOString(),
          source: 'simulated',
        });
      }
    } finally {
      fetchInProgress.current = false;
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [asset, enabled]);

  // Initial fetch and refresh interval
  useEffect(() => {
    isMounted.current = true;

    if (asset && enabled) {
      fetchLiveData();

      const interval = setInterval(fetchLiveData, refreshInterval);
      return () => {
        clearInterval(interval);
        isMounted.current = false;
      };
    }

    return () => {
      isMounted.current = false;
    };
  }, [asset?.id, enabled, refreshInterval, fetchLiveData]);

  return {
    liveData,
    isLoading,
    error,
    lastFetch,
    refetch: fetchLiveData,
    isLive: liveData?.source === 'live',
  };
}

// Hook for fetching candle data for charts
export function useLiveCandleData(
  asset: Asset | null,
  options: UseLiveMarketDataOptions = {}
) {
  const { refreshInterval = 60000, enabled = true } = options; // 1 minute for candles
  
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isMounted = useRef(true);
  const fetchInProgress = useRef(false);

  const fetchCandles = useCallback(async () => {
    if (!asset || !enabled || fetchInProgress.current) return;
    
    // Validate asset has a valid price
    if (typeof asset.price !== 'number' || isNaN(asset.price) || asset.price <= 0) {
      console.log(`Skipping candle fetch for ${asset.symbol}: invalid base price`);
      return;
    }

    fetchInProgress.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=candles`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (isMounted.current && result.success && Array.isArray(result.data)) {
        setCandles(result.data);
      }
    } catch (err) {
      console.error('Candle data fetch error:', err);
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candles');
        // Generate fallback candles
        setCandles(generateFallbackCandles(asset.price));
      }
    } finally {
      fetchInProgress.current = false;
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [asset, enabled]);

  useEffect(() => {
    isMounted.current = true;

    if (asset && enabled) {
      fetchCandles();

      const interval = setInterval(fetchCandles, refreshInterval);
      return () => {
        clearInterval(interval);
        isMounted.current = false;
      };
    }

    return () => {
      isMounted.current = false;
    };
  }, [asset?.id, enabled, refreshInterval, fetchCandles]);

  return {
    candles,
    isLoading,
    error,
    refetch: fetchCandles,
  };
}

// Generate fallback candle data for when API is unavailable
function generateFallbackCandles(basePrice: number, count: number = 60): CandleData[] {
  const candles: CandleData[] = [];
  let price = basePrice * (0.98 + Math.random() * 0.04);
  const now = Date.now();

  for (let i = count; i >= 0; i--) {
    const open = price;
    const volatility = 0.003;
    const change = (Math.random() - 0.48) * basePrice * volatility;
    const close = price + change;
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    
    candles.push({
      time: new Date(now - i * 60000).toISOString(),
      open: Number(open.toFixed(4)),
      high: Number(high.toFixed(4)),
      low: Number(low.toFixed(4)),
      close: Number(close.toFixed(4)),
      volume: Math.floor(Math.random() * 100000),
    });

    price = close;
  }

  return candles;
}
