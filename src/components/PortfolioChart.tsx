import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { getPortfolioHistory } from "@/lib/portfolioHistory";
import { INITIAL_CASH } from "@/lib/assets";

export function PortfolioChart() {
  const history = getPortfolioHistory();

  // Add initial point if no history
  const data = history.length > 0 
    ? history.map(snapshot => ({
        time: new Date(snapshot.timestamp).toLocaleDateString(),
        value: snapshot.totalValue,
      }))
    : [
        { time: 'Start', value: INITIAL_CASH }
      ];

  const initialValue = data[0]?.value || INITIAL_CASH;
  const currentValue = data[data.length - 1]?.value || INITIAL_CASH;
  const change = currentValue - initialValue;
  const changePercent = ((change / initialValue) * 100).toFixed(2);
  const isPositive = change >= 0;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Portfolio Performance</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">${currentValue.toFixed(2)}</span>
          <span className={isPositive ? "text-success" : "text-destructive"}>
            {isPositive ? '+' : ''}${change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent}%)
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
