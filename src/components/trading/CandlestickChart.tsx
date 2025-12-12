import { useState, useEffect, useMemo } from "react";
import { Asset, CandlestickData } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { formatPrice } from "@/lib/assets";

interface CandlestickChartProps {
  asset: Asset;
}

const timeframes = ["1H", "4H", "1D", "1W", "1M"] as const;
type Timeframe = typeof timeframes[number];

// Generate realistic candlestick data
function generateCandlestickData(basePrice: number, count: number, volatility: number): CandlestickData[] {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice * 0.95; // Start slightly lower
  const now = Date.now();

  for (let i = count - 1; i >= 0; i--) {
    const change = (Math.random() - 0.48) * volatility * currentPrice; // Slight upward bias
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.5;
    const volume = Math.random() * 1000000 + 500000;

    data.push({
      time: now - i * 3600000, // Hourly candles
      open: Math.max(open, 0.01),
      high: Math.max(high, 0.01),
      low: Math.max(low, 0.01),
      close: Math.max(close, 0.01),
      volume,
    });

    currentPrice = close;
  }

  // Adjust last candle to match current price
  if (data.length > 0) {
    data[data.length - 1].close = basePrice;
    data[data.length - 1].high = Math.max(data[data.length - 1].high, basePrice);
    data[data.length - 1].low = Math.min(data[data.length - 1].low, basePrice);
  }

  return data;
}

export function CandlestickChart({ asset }: CandlestickChartProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>("1H");
  const [data, setData] = useState<CandlestickData[]>([]);

  const volatility = useMemo(() => {
    switch (asset.type) {
      case 'crypto': return 0.03;
      case 'stock': return 0.015;
      case 'forex': return 0.005;
      default: return 0.02;
    }
  }, [asset.type]);

  useEffect(() => {
    // Generate initial data
    setData(generateCandlestickData(asset.price, 50, volatility));

    // Update every 3 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        if (newData.length > 0) {
          const last = newData[newData.length - 1];
          const change = (Math.random() - 0.5) * volatility * last.close;
          const newClose = Math.max(last.close + change, 0.01);
          newData[newData.length - 1] = {
            ...last,
            close: newClose,
            high: Math.max(last.high, newClose),
            low: Math.min(last.low, newClose),
          };
        }
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [asset.id, asset.price, volatility]);

  const chartData = useMemo(() => {
    return data.map((candle, index) => ({
      ...candle,
      index,
      isUp: candle.close >= candle.open,
      body: Math.abs(candle.close - candle.open),
      bodyBottom: Math.min(candle.open, candle.close),
      wick: candle.high - candle.low,
      wickBottom: candle.low,
    }));
  }, [data]);

  const priceRange = useMemo(() => {
    if (data.length === 0) return { min: 0, max: 100 };
    const prices = data.flatMap(d => [d.high, d.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;
    return { min: min - padding, max: max + padding };
  }, [data]);

  const lastCandle = data[data.length - 1];
  const isUp = lastCandle ? lastCandle.close >= lastCandle.open : true;

  return (
    <Card className="h-full flex flex-col bg-card border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{asset.symbol}</h2>
              <Badge variant="outline" className="text-xs capitalize">
                {asset.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{asset.name}</p>
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <div>
              <p className="text-2xl font-bold tabular-nums">
                ${formatPrice(asset.price, asset.type)}
              </p>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                asset.changePercent >= 0 ? "text-profit" : "text-loss"
              )}>
                {asset.changePercent >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {asset.changePercent >= 0 ? '+' : ''}{asset.change.toFixed(2)} 
                ({asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mr-4">
            <Clock className="w-3 h-3" />
            <span>Live</span>
            <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
          </div>
          
          <div className="flex bg-secondary rounded-lg p-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant="ghost"
                size="sm"
                className={cn(
                  "px-3 py-1 h-7 text-xs font-medium",
                  timeframe === tf 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <XAxis 
              dataKey="index" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(index) => {
                const candle = chartData[index];
                if (!candle) return '';
                return new Date(candle.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }}
              interval={Math.floor(chartData.length / 6)}
            />
            <YAxis 
              domain={[priceRange.min, priceRange.max]}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => `$${formatPrice(value, asset.type)}`}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              labelFormatter={(index) => {
                const candle = chartData[index as number];
                if (!candle) return '';
                return new Date(candle.time).toLocaleString();
              }}
              formatter={(value: number, name: string) => {
                if (name === 'body') return null;
                return [`$${formatPrice(value, asset.type)}`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
            />
            
            {/* Reference line at current price */}
            <ReferenceLine 
              y={asset.price} 
              stroke={isUp ? 'hsl(var(--profit))' : 'hsl(var(--loss))'} 
              strokeDasharray="3 3" 
              strokeOpacity={0.5}
            />
            
            {/* Candlestick bodies */}
            <Bar 
              dataKey="body" 
              stackId="candle"
              fill="transparent"
              barSize={6}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={index}
                  fill={entry.isUp ? 'hsl(var(--profit))' : 'hsl(var(--loss))'}
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* OHLC Stats */}
      {lastCandle && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-secondary/30 text-xs">
          <div className="flex gap-6">
            <div>
              <span className="text-muted-foreground">O </span>
              <span className="tabular-nums font-medium">${formatPrice(lastCandle.open, asset.type)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">H </span>
              <span className="tabular-nums font-medium text-profit">${formatPrice(lastCandle.high, asset.type)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">L </span>
              <span className="tabular-nums font-medium text-loss">${formatPrice(lastCandle.low, asset.type)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">C </span>
              <span className="tabular-nums font-medium">${formatPrice(lastCandle.close, asset.type)}</span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Vol </span>
            <span className="tabular-nums font-medium">{(lastCandle.volume / 1000000).toFixed(2)}M</span>
          </div>
        </div>
      )}
    </Card>
  );
}
