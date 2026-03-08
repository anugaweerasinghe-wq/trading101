import { useEffect, useRef, useMemo } from "react";
import { createChart, IChartApi, ISeriesApi, LineStyle, ColorType } from "lightweight-charts";
import { Asset } from "@/lib/types";

interface NeuralPulseChartProps {
  asset: Asset;
  height?: number;
}

function generateOHLC(basePrice: number, count: number) {
  const data: { time: string; open: number; high: number; low: number; close: number }[] = [];
  let price = basePrice * 0.95;
  const now = new Date();

  for (let i = count; i >= 0; i--) {
    const date = new Date(now);
    date.setMinutes(date.getMinutes() - i * 15);
    const timeStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (data.find(d => d.time === timeStr)) continue;

    const vol = basePrice > 1000 ? 0.012 : 0.025;
    const change = (Math.random() - 0.48) * vol * price;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) * (1 + Math.random() * vol * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * vol * 0.5);

    data.push({
      time: timeStr,
      open: Math.max(open, 0.01),
      high: Math.max(high, 0.01),
      low: Math.max(low, 0.01),
      close: Math.max(close, 0.01),
    });
    price = close;
  }
  return data;
}

export function NeuralPulseChart({ asset, height = 420 }: NeuralPulseChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const data = useMemo(() => generateOHLC(asset.price, 90), [asset.id]);

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
      rightPriceScale: {
        borderColor: '#1E2028',
      },
      timeScale: {
        borderColor: '#1E2028',
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: 'hsl(152, 72%, 46%)',
      downColor: 'hsl(0, 80%, 55%)',
      borderUpColor: 'hsl(152, 72%, 46%)',
      borderDownColor: 'hsl(0, 80%, 55%)',
      wickUpColor: 'hsl(152, 72%, 50%)',
      wickDownColor: 'hsl(0, 80%, 60%)',
    });

    series.setData(data as any);

    // Neural Pulse: High Probability Zones as price lines
    const lastClose = data[data.length - 1]?.close || asset.price;
    const supportZone = lastClose * 0.97;
    const resistanceZone = lastClose * 1.035;

    series.createPriceLine({
      price: supportZone,
      color: 'hsl(152, 72%, 46%)',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: 'Support Zone',
    });

    series.createPriceLine({
      price: resistanceZone,
      color: 'hsl(12, 90%, 62%)',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: 'Resistance Zone',
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [asset.id, data, height]);

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
