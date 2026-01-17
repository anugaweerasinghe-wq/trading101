import { useState, useEffect, useMemo } from "react";
import { Asset } from "@/lib/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MinimalistAreaChartProps {
  asset: Asset;
}

interface ChartDataPoint {
  time: string;
  price: number;
  timestamp: number;
}

function generateChartData(basePrice: number, count: number = 50): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let price = basePrice * (0.95 + Math.random() * 0.1);
  const now = Date.now();

  for (let i = count; i >= 0; i--) {
    const change = (Math.random() - 0.48) * (basePrice * 0.008);
    price = Math.max(price + change, basePrice * 0.8);
    
    const timestamp = now - i * 60000;
    const date = new Date(timestamp);
    
    data.push({
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Number(price.toFixed(2)),
      timestamp,
    });
  }
  return data;
}

export function MinimalistAreaChart({ asset }: MinimalistAreaChartProps) {
  const [data, setData] = useState<ChartDataPoint[]>(() => 
    generateChartData(asset.price)
  );
  const [timeframe, setTimeframe] = useState<'1H' | '4H' | '1D' | '1W'>('1H');

  // Update chart with new price data
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastPrice = newData[newData.length - 1]?.price || asset.price;
        const change = (Math.random() - 0.48) * (asset.price * 0.005);
        const newPrice = Math.max(lastPrice + change, asset.price * 0.8);
        const now = Date.now();
        
        newData.push({
          time: new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: Number(newPrice.toFixed(2)),
          timestamp: now,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [asset.price]);

  // Reset data when asset changes
  useEffect(() => {
    setData(generateChartData(asset.price));
  }, [asset.id]);

  const { minPrice, maxPrice, priceChange, priceChangePercent, isPositive } = useMemo(() => {
    const prices = data.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const first = data[0]?.price || 0;
    const last = data[data.length - 1]?.price || 0;
    const change = last - first;
    const changePercent = first > 0 ? (change / first) * 100 : 0;
    
    return {
      minPrice: min,
      maxPrice: max,
      priceChange: change,
      priceChangePercent: changePercent,
      isPositive: change >= 0,
    };
  }, [data]);

  const padding = (maxPrice - minPrice) * 0.1 || 1;

  return (
    <div className="h-full flex flex-col">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{asset.symbol.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{asset.symbol}</h2>
            <p className="text-sm text-muted-foreground">{asset.name}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold tabular-nums">
            ${data[data.length - 1]?.price.toLocaleString() || asset.price.toLocaleString()}
          </p>
          <p className={`text-sm font-medium tabular-nums ${isPositive ? 'text-profit' : 'text-loss'}`}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-1 px-4 pb-2">
        {(['1H', '4H', '1D', '1W'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              timeframe === tf
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 px-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(210, 15%, 55%)', fontSize: 10 }}
              interval="preserveStartEnd"
              minTickGap={50}
            />
            <YAxis 
              domain={[minPrice - padding, maxPrice + padding]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(210, 15%, 55%)', fontSize: 10 }}
              width={60}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 7%)',
                border: '1px solid hsl(220, 10%, 15%)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px -6px hsl(0 0% 0% / 0.6)',
              }}
              labelStyle={{ color: 'hsl(210, 15%, 55%)' }}
              itemStyle={{ color: 'hsl(152, 60%, 42%)' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(152, 60%, 50%)"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: 'hsl(152, 60%, 50%)',
                stroke: 'hsl(0, 0%, 7%)',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
