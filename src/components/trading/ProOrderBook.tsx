import { useState, useEffect, useMemo } from "react";
import { Asset, OrderBookEntry } from "@/lib/types";
import { formatPrice } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, Layers } from "lucide-react";

interface ProOrderBookProps {
  asset: Asset;
}

function generateOrderBookData(
  basePrice: number,
  levels: number = 15
): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  
  const spreadPercent = 0.001; // 0.1% spread
  const bidStart = basePrice * (1 - spreadPercent);
  const askStart = basePrice * (1 + spreadPercent);

  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < levels; i++) {
    const bidPrice = bidStart * (1 - i * 0.0005);
    const bidQty = Math.random() * 10 + 0.5;
    bidTotal += bidQty;
    bids.push({ price: bidPrice, quantity: bidQty, total: bidTotal });

    const askPrice = askStart * (1 + i * 0.0005);
    const askQty = Math.random() * 10 + 0.5;
    askTotal += askQty;
    asks.push({ price: askPrice, quantity: askQty, total: askTotal });
  }

  return { bids, asks };
}

export function ProOrderBook({ asset }: ProOrderBookProps) {
  const [data, setData] = useState(() => generateOrderBookData(asset.price));
  const [view, setView] = useState<'both' | 'bids' | 'asks'>('both');

  useEffect(() => {
    // Update order book periodically
    const interval = setInterval(() => {
      setData(prev => {
        const newData = generateOrderBookData(asset.price);
        // Blend with previous data for smoother transitions
        return {
          bids: newData.bids.map((bid, i) => ({
            ...bid,
            quantity: prev.bids[i] 
              ? (prev.bids[i].quantity * 0.7 + bid.quantity * 0.3) 
              : bid.quantity,
          })).map((bid, i, arr) => ({
            ...bid,
            total: arr.slice(0, i + 1).reduce((sum, b) => sum + b.quantity, 0),
          })),
          asks: newData.asks.map((ask, i) => ({
            ...ask,
            quantity: prev.asks[i] 
              ? (prev.asks[i].quantity * 0.7 + ask.quantity * 0.3) 
              : ask.quantity,
          })).map((ask, i, arr) => ({
            ...ask,
            total: arr.slice(0, i + 1).reduce((sum, a) => sum + a.quantity, 0),
          })),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [asset.price]);

  const maxQuantity = useMemo(() => {
    const allQuantities = [...data.bids, ...data.asks].map(o => o.quantity);
    return Math.max(...allQuantities);
  }, [data]);

  const spread = data.asks[0]?.price && data.bids[0]?.price 
    ? data.asks[0].price - data.bids[0].price 
    : 0;
  const spreadPercent = spread / asset.price * 100;

  const renderOrderRow = (
    order: OrderBookEntry, 
    type: 'bid' | 'ask', 
    index: number
  ) => {
    const widthPercent = (order.quantity / maxQuantity) * 100;
    
    return (
      <div 
        key={`${type}-${index}`}
        className="relative flex items-center h-6 text-xs tabular-nums hover:bg-accent/30 cursor-pointer transition-colors"
      >
        {/* Background bar */}
        <div 
          className={cn(
            "absolute h-full transition-all duration-300",
            type === 'bid' 
              ? "right-0 bg-profit/10" 
              : "left-0 bg-loss/10"
          )}
          style={{ width: `${widthPercent}%` }}
        />
        
        {/* Content */}
        <div className="relative flex items-center w-full px-2 gap-2">
          <span className={cn(
            "w-24 text-right font-medium",
            type === 'bid' ? "text-profit" : "text-loss"
          )}>
            ${formatPrice(order.price, asset.type)}
          </span>
          <span className="w-20 text-right text-muted-foreground">
            {order.quantity.toFixed(4)}
          </span>
          <span className="flex-1 text-right text-muted-foreground">
            {order.total.toFixed(4)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col bg-card border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Order Book
        </h3>
        <div className="flex gap-1">
          <Button
            variant={view === 'both' ? 'secondary' : 'ghost'}
            size="icon"
            className="w-7 h-7"
            onClick={() => setView('both')}
          >
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-1 bg-loss rounded-sm" />
              <div className="w-3 h-1 bg-profit rounded-sm" />
            </div>
          </Button>
          <Button
            variant={view === 'bids' ? 'secondary' : 'ghost'}
            size="icon"
            className="w-7 h-7"
            onClick={() => setView('bids')}
          >
            <ArrowUp className="w-3 h-3 text-profit" />
          </Button>
          <Button
            variant={view === 'asks' ? 'secondary' : 'ghost'}
            size="icon"
            className="w-7 h-7"
            onClick={() => setView('asks')}
          >
            <ArrowDown className="w-3 h-3 text-loss" />
          </Button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center h-7 px-2 text-2xs text-muted-foreground border-b border-border bg-secondary/30">
        <span className="w-24 text-right">Price (USD)</span>
        <span className="w-20 text-right">Amount</span>
        <span className="flex-1 text-right">Total</span>
      </div>

      {/* Order Book Data */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Asks (Sell orders) - reversed so lowest is at bottom */}
        {(view === 'both' || view === 'asks') && (
          <div className={cn(
            "overflow-auto scrollbar-thin flex flex-col-reverse",
            view === 'both' ? "flex-1" : "flex-[2]"
          )}>
            {data.asks.map((ask, i) => renderOrderRow(ask, 'ask', i))}
          </div>
        )}

        {/* Spread Indicator */}
        {view === 'both' && (
          <div className="flex items-center justify-between px-3 py-2 border-y border-border bg-secondary/50">
            <span className="text-sm font-bold tabular-nums">
              ${formatPrice(asset.price, asset.type)}
            </span>
            <span className="text-xs text-muted-foreground">
              Spread: {spreadPercent.toFixed(3)}%
            </span>
          </div>
        )}

        {/* Bids (Buy orders) */}
        {(view === 'both' || view === 'bids') && (
          <div className={cn(
            "overflow-auto scrollbar-thin",
            view === 'both' ? "flex-1" : "flex-[2]"
          )}>
            {data.bids.map((bid, i) => renderOrderRow(bid, 'bid', i))}
          </div>
        )}
      </div>
    </Card>
  );
}
