import { OrderBook } from "@/lib/orderBook";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

interface DepthChartProps {
  orderBook: OrderBook;
}

export function DepthChart({ orderBook }: DepthChartProps) {
  // Calculate cumulative depths
  const bidsData = orderBook.bids.map((bid, i) => {
    const cumulativeVolume = orderBook.bids
      .slice(0, i + 1)
      .reduce((sum, b) => sum + b.quantity, 0);
    
    return {
      price: bid.price,
      volume: cumulativeVolume,
      type: 'bid'
    };
  }).reverse();

  const asksData = orderBook.asks.map((ask, i) => {
    const cumulativeVolume = orderBook.asks
      .slice(0, i + 1)
      .reduce((sum, a) => sum + a.quantity, 0);
    
    return {
      price: ask.price,
      volume: cumulativeVolume,
      type: 'ask'
    };
  });

  const chartData = [...bidsData, ...asksData];
  const midPrice = (orderBook.bids[0].price + orderBook.asks[0].price) / 2;

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="bidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="askGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="price"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            className="text-xs"
          />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            className="text-xs"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <Card className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">
                      {data.type === 'bid' ? 'Buy Orders' : 'Sell Orders'}
                    </p>
                    <p className="text-sm font-semibold mb-1">
                      Price: ${data.price.toFixed(2)}
                    </p>
                    <p className="text-sm">
                      Cumulative: {data.volume.toFixed(2)}
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            x={midPrice}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            strokeDasharray="5 5"
            label={{ value: 'Mid Price', position: 'top' }}
          />
          <Area
            type="stepAfter"
            dataKey="volume"
            stroke="hsl(var(--success))"
            fill="url(#bidGradient)"
            strokeWidth={2}
            data={bidsData}
          />
          <Area
            type="stepBefore"
            dataKey="volume"
            stroke="hsl(var(--destructive))"
            fill="url(#askGradient)"
            strokeWidth={2}
            data={asksData}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
