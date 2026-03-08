import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { createChart, IChartApi, ISeriesApi, LineStyle, ColorType } from "lightweight-charts";
import { Asset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NeuralPulseChartProps {
  asset: Asset;
  height?: number;
}

type TimeRange = '1D' | '1W' | '1M' | '1Y' | '5Y';

const RANGE_CONFIG: Record<TimeRange, { label: string; days: number; count: number; intervalMinutes: number }> = {
  '1D': { label: '1D', days: 1, count: 96, intervalMinutes: 15 },
  '1W': { label: '1W', days: 7, count: 168, intervalMinutes: 60 },
  '1M': { label: '1M', days: 30, count: 120, intervalMinutes: 360 },
  '1Y': { label: '1Y', days: 365, count: 365, intervalMinutes: 1440 },
  '5Y': { label: '5Y', days: 1825, count: 260, intervalMinutes: 10080 },
};

interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

function generateFallbackOHLC(basePrice: number, count: number, intervalMinutes: number, range: TimeRange): OHLCData[] {
  const data: OHLCData[] = [];
  let price = basePrice * (range === '5Y' ? 0.25 : range === '1Y' ? 0.6 : range === '1M' ? 0.85 : 0.95);
  const now = new Date();
  const seen = new Set<string>();
  const vol = range === '5Y' ? 0.035 : range === '1Y' ? 0.022 : range === '1M' ? 0.018 : basePrice > 1000 ? 0.012 : 0.025;
  const drift = range === '5Y' ? 0.001 : range === '1Y' ? 0.0005 : 0.0001;

  for (let i = count; i >= 0; i--) {
    const date = new Date(now);
    date.setMinutes(date.getMinutes() - i * intervalMinutes);
    const timeStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (seen.has(timeStr)) continue;
    seen.add(timeStr);

    const change = (Math.random() - 0.48 + drift) * vol * price;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) * (1 + Math.random() * vol * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * vol * 0.5);

    data.push({
      time: timeStr,
      open: Math.max(open, 0.0001),
      high: Math.max(high, 0.0001),
      low: Math.max(low, 0.0001),
      close: Math.max(close, 0.0001),
    });
    price = Math.max(close, 0.0001);
  }
  return data;
}

export function NeuralPulseChart({ asset, height = 420 }: NeuralPulseChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [range, setRange] = useState<TimeRange>('1M');
  const [liveData, setLiveData] = useState<OHLCData[] | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'fallback'>('fallback');
  const [isLoadingData, setIsLoadingData] = useState(false);

  const config = RANGE_CONFIG[range];

  // Fetch real-time candle data from edge function
  const fetchLiveCandles = useCallback(async () => {
    if (!asset) return;
    setIsLoadingData(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=candles&days=${config.days}`,
        {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 5) {
          // Convert API candle data to chart format with unique daily keys
          const seen = new Set<string>();
          const formatted: OHLCData[] = [];
          
          for (const candle of result.data) {
            const d = new Date(candle.time);
            const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            
            if (seen.has(timeStr)) {
              // Merge into existing candle
              const existing = formatted.find(f => f.time === timeStr);
              if (existing) {
                existing.high = Math.max(existing.high, candle.high);
                existing.low = Math.min(existing.low, candle.low);
                existing.close = candle.close;
              }
              continue;
            }
            seen.add(timeStr);
            formatted.push({
              time: timeStr,
              open: candle.open,
              high: candle.high,
              low: candle.low,
              close: candle.close,
            });
          }

          if (formatted.length > 2) {
            setLiveData(formatted);
            setDataSource('live');
            setIsLoadingData(false);
            return;
          }
        }
      }
    } catch (err) {
      console.warn('Neural Pulse: Primary data source failed, using fallback', err);
    }

    // Backup: Try CoinGecko OHLC directly for crypto
    if (asset.type === 'crypto') {
      try {
        const coinMap: Record<string, string> = {
          btc: 'bitcoin', eth: 'ethereum', sol: 'solana', bnb: 'binancecoin',
          xrp: 'ripple', ada: 'cardano', doge: 'dogecoin', avax: 'avalanche-2',
          dot: 'polkadot', link: 'chainlink', ltc: 'litecoin',
        };
        const coinId = coinMap[asset.id.toLowerCase()];
        if (coinId) {
          const days = config.days > 365 ? 'max' : config.days;
          const resp = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
            { headers: { Accept: 'application/json' } }
          );
          if (resp.ok) {
            const raw = await resp.json();
            if (Array.isArray(raw) && raw.length > 5) {
              const seen = new Set<string>();
              const formatted: OHLCData[] = [];
              for (const c of raw) {
                const d = new Date(c[0]);
                const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                if (seen.has(timeStr)) continue;
                seen.add(timeStr);
                formatted.push({ time: timeStr, open: c[1], high: c[2], low: c[3], close: c[4] });
              }
              if (formatted.length > 2) {
                setLiveData(formatted);
                setDataSource('live');
                setIsLoadingData(false);
                return;
              }
            }
          }
        }
      } catch (err2) {
        console.warn('Neural Pulse: Backup CoinGecko source also failed', err2);
      }
    }

    // Final fallback: simulated data
    setLiveData(null);
    setDataSource('fallback');
    setIsLoadingData(false);
  }, [asset?.id, asset?.type, asset?.price, config.days]);

  useEffect(() => {
    fetchLiveCandles();
  }, [fetchLiveCandles, range]);

  const chartData = useMemo(() => {
    if (liveData && liveData.length > 2) return liveData;
    return generateFallbackOHLC(asset.price, config.count, config.intervalMinutes, range);
  }, [liveData, asset.price, asset.id, range, config.count, config.intervalMinutes]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#0A0A0A' },
        textColor: '#737A87',
        fontFamily: 'Inter, SF Pro Display, sans-serif',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: '#1E2028' },
        horzLines: { color: '#1E2028' },
      },
      crosshair: {
        vertLine: { color: '#00FFCC', width: 1, style: LineStyle.Dashed },
        horzLine: { color: '#00FFCC', width: 1, style: LineStyle.Dashed },
      },
      rightPriceScale: { borderColor: '#1E2028' },
      timeScale: { borderColor: '#1E2028' },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderUpColor: '#22C55E',
      borderDownColor: '#EF4444',
      wickUpColor: '#2DD46B',
      wickDownColor: '#F06060',
    });

    series.setData(chartData as any);

    // Dynamic support/resistance zones
    const lastClose = chartData[chartData.length - 1]?.close || asset.price;
    const supportZone = lastClose * 0.97;
    const resistanceZone = lastClose * 1.035;

    series.createPriceLine({
      price: supportZone,
      color: '#22C55E',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: 'Support Zone',
    });

    series.createPriceLine({
      price: resistanceZone,
      color: '#FF6B4A',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: 'Resistance Zone',
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [asset.id, chartData, height, range]);

  return (
    <div className="glass-tactile rounded-2xl p-1 overflow-hidden border-chrome">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground tracking-tight-cyber">
            {asset.symbol}/USD
          </span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            dataSource === 'live' 
              ? "bg-emerald-500/10 text-emerald-400" 
              : "bg-amber-500/10 text-amber-400"
          )}>
            {dataSource === 'live' ? '● Live Data' : '● Simulated'}
          </span>
          {isLoadingData && (
            <span className="text-[10px] text-muted-foreground animate-pulse">Loading...</span>
          )}
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1">
          {(Object.keys(RANGE_CONFIG) as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all",
                range === r
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {RANGE_CONFIG[r].label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-profit" />
            Support
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-coral" />
            Resistance
          </span>
        </div>
      </div>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
