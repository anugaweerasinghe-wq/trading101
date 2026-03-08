import { useEffect, useRef, useMemo, useState } from "react";
import { createChart, IChartApi, ISeriesApi, LineStyle, ColorType } from "lightweight-charts";
import { Asset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NeuralPulseChartProps {
  asset: Asset;
  height?: number;
}

type TimeRange = '1D' | '1W' | '1M' | '1Y' | '5Y';

const RANGE_CONFIG: Record<TimeRange, { label: string; count: number; intervalMinutes: number }> = {
  '1D': { label: '1D', count: 96, intervalMinutes: 15 },
  '1W': { label: '1W', count: 168, intervalMinutes: 60 },
  '1M': { label: '1M', count: 120, intervalMinutes: 360 },
  '1Y': { label: '1Y', count: 365, intervalMinutes: 1440 },
  '5Y': { label: '5Y', count: 260, intervalMinutes: 10080 },
};

function generateOHLC(basePrice: number, count: number, intervalMinutes: number, range: TimeRange) {
  const data: { time: string; open: number; high: number; low: number; close: number }[] = [];
  let price = basePrice * (range === '5Y' ? 0.25 : range === '1Y' ? 0.6 : range === '1M' ? 0.85 : 0.95);
  const now = new Date();
  const seen = new Set<string>();

  // Determine volatility based on range
  const vol = range === '5Y' ? 0.035 : range === '1Y' ? 0.022 : range === '1M' ? 0.018 : basePrice > 1000 ? 0.012 : 0.025;
  // Slight upward drift for longer ranges
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

  const config = RANGE_CONFIG[range];
  const data = useMemo(
    () => generateOHLC(asset.price, config.count, config.intervalMinutes, range),
    [asset.id, range]
  );

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

    series.setData(data as any);

    // Dynamic support/resistance zones
    const lastClose = data[data.length - 1]?.close || asset.price;
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
  }, [asset.id, data, height, range]);

  return (
    <div className="glass-tactile rounded-2xl p-1 overflow-hidden border-chrome">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground tracking-tight-cyber">
            {asset.symbol}/USD
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neon/10 text-neon font-medium">
            Neural Pulse
          </span>
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
