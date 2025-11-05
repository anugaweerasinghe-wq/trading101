import { useState, useEffect } from "react";
import { Asset } from "@/lib/types";
import { updateOrderBook, simulateMarketMaker, OrderBook as OrderBookType } from "@/lib/orderBook";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DepthChart } from "./DepthChart";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderBookProps {
  asset: Asset;
}

export function OrderBook({ asset }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState<OrderBookType | null>(null);

  useEffect(() => {
    // Initialize order book
    const book = updateOrderBook(asset);
    setOrderBook(book);

    // Update order book every 3 seconds with market maker simulation
    const interval = setInterval(() => {
      setOrderBook(prev => {
        if (!prev) return updateOrderBook(asset);
        const simulated = simulateMarketMaker(prev, 0.05);
        return simulated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [asset.id]);

  if (!orderBook) return null;

  const spread = orderBook.asks[0].price - orderBook.bids[0].price;
  const spreadPercent = (spread / orderBook.bids[0].price) * 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Order Book</h3>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Spread</p>
            <p className="text-sm font-medium">${spread.toFixed(4)} ({spreadPercent.toFixed(3)}%)</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="book" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="book">Order Book</TabsTrigger>
          <TabsTrigger value="depth">Depth Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Asks (Sell Orders) */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-3">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Asks (Sell)</span>
              </div>
              <div className="space-y-1">
                {orderBook.asks.slice(0, 15).reverse().map((ask, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-between px-3 py-1 text-xs hover:bg-muted/50"
                  >
                    <div
                      className="absolute inset-0 bg-destructive/10"
                      style={{
                        width: `${(ask.quantity / Math.max(...orderBook.asks.map(a => a.quantity))) * 100}%`,
                        right: 0,
                        left: 'auto'
                      }}
                    />
                    <span className="relative font-mono text-destructive">${ask.price.toFixed(2)}</span>
                    <span className="relative text-muted-foreground">{ask.quantity.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bids (Buy Orders) */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-3">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Bids (Buy)</span>
              </div>
              <div className="space-y-1">
                {orderBook.bids.slice(0, 15).map((bid, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-between px-3 py-1 text-xs hover:bg-muted/50"
                  >
                    <div
                      className="absolute inset-0 bg-success/10"
                      style={{
                        width: `${(bid.quantity / Math.max(...orderBook.bids.map(b => b.quantity))) * 100}%`
                      }}
                    />
                    <span className="relative font-mono text-success">${bid.price.toFixed(2)}</span>
                    <span className="relative text-muted-foreground">{bid.quantity.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="depth">
          <DepthChart orderBook={orderBook} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
