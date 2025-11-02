import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Asset } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Star, Activity, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculate24hStats, generateCandlestickData } from "@/lib/marketData";
import { useState, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AssetDetailDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrade: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function AssetDetailDialog({ 
  asset, 
  open, 
  onOpenChange, 
  onTrade,
  isFavorite,
  onToggleFavorite 
}: AssetDetailDialogProps) {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [candleData, setCandleData] = useState<any[]>([]);

  useEffect(() => {
    if (asset) {
      const newStats = calculate24hStats(asset);
      setStats(newStats);
      
      const candles = generateCandlestickData(asset, 30);
      setCandleData(candles);
      
      // Transform for simple chart
      const simpleChart = candles.map(c => ({
        date: c.time,
        price: c.close,
        volume: c.volume
      }));
      setChartData(simpleChart);
    }
  }, [asset]);

  if (!asset || !stats) return null;

  const isPositive = asset.changePercent >= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-3xl">{asset.symbol}</DialogTitle>
                <Badge variant="outline" className="capitalize">{asset.type}</Badge>
              </div>
              <p className="text-muted-foreground">{asset.name}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFavorite}
                className={cn(isFavorite && "text-yellow-500")}
              >
                <Star className={cn("w-5 h-5", isFavorite && "fill-current")} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Price Section */}
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-bold mb-2">
                ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </div>
              <div className={cn(
                "flex items-center gap-2 text-lg font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {isPositive ? '+' : ''}{asset.change.toFixed(2)} ({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)
              </div>
            </div>
            <Button onClick={onTrade} size="lg" className="px-8">
              Trade Now
            </Button>
          </div>

          {/* 24h Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">24h High</p>
              <p className="text-xl font-bold">${stats.high24h.toFixed(2)}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">24h Low</p>
              <p className="text-xl font-bold">${stats.low24h.toFixed(2)}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-bold">${(stats.volume24h / 1000000).toFixed(2)}M</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-bold">${(asset.price * 1000000000 / 1000000000).toFixed(2)}B</p>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="price">
                <Activity className="w-4 h-4 mr-2" />
                Price Chart
              </TabsTrigger>
              <TabsTrigger value="candles">
                <BarChart3 className="w-4 h-4 mr-2" />
                Candlesticks
              </TabsTrigger>
              <TabsTrigger value="volume">
                <BarChart3 className="w-4 h-4 mr-2" />
                Volume
              </TabsTrigger>
            </TabsList>

            <TabsContent value="price" className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="candles" className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={candleData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: any, name: string) => [`$${value.toFixed(2)}`, name.toUpperCase()]}
                  />
                  <Bar dataKey="close" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="volume" className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: any) => [`${(value / 1000000).toFixed(2)}M`, 'Volume']}
                  />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" opacity={0.6} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>

          {/* About Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">About {asset.symbol}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {asset.type === 'stock' && `${asset.name} is a publicly traded company. Stock prices reflect market sentiment, company performance, and broader economic conditions.`}
              {asset.type === 'crypto' && `${asset.name} is a cryptocurrency that operates on blockchain technology. Crypto markets are highly volatile and trade 24/7.`}
              {asset.type === 'etf' && `${asset.name} is an exchange-traded fund that provides diversified exposure to a basket of securities. ETFs offer instant diversification.`}
              {asset.type === 'commodity' && `${asset.name} is a physical commodity traded in global markets. Commodity prices are influenced by supply, demand, and geopolitical factors.`}
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
