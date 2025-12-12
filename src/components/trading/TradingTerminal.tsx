import { useState } from "react";
import { Portfolio, Trade } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  History, 
  ClipboardList, 
  TrendingUp, 
  TrendingDown,
  Clock,
  X
} from "lucide-react";
import { Order, getOrders, cancelOrder } from "@/lib/orderTypes";

interface TradingTerminalProps {
  portfolio: Portfolio;
}

export function TradingTerminal({ portfolio }: TradingTerminalProps) {
  const [orders] = useState<Order[]>(() => getOrders());
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const recentTrades = portfolio.trades.slice(0, 10);

  // Calculate P&L stats
  const totalTrades = portfolio.trades.length;
  const buyTrades = portfolio.trades.filter(t => t.type === 'buy');
  const sellTrades = portfolio.trades.filter(t => t.type === 'sell');
  const totalBuyVolume = buyTrades.reduce((sum, t) => sum + t.total, 0);
  const totalSellVolume = sellTrades.reduce((sum, t) => sum + t.total, 0);

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="h-full flex flex-col bg-card border-border overflow-hidden">
      <Tabs defaultValue="trades" className="flex-1 flex flex-col">
        <div className="border-b border-border">
          <TabsList className="h-10 w-full justify-start bg-transparent rounded-none px-2">
            <TabsTrigger 
              value="trades" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs gap-2"
            >
              <History className="w-3 h-3" />
              Trade History
              <Badge variant="secondary" className="h-4 px-1 text-2xs">
                {totalTrades}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs gap-2"
            >
              <ClipboardList className="w-3 h-3" />
              Open Orders
              {pendingOrders.length > 0 && (
                <Badge variant="destructive" className="h-4 px-1 text-2xs">
                  {pendingOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="positions" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs gap-2"
            >
              <TrendingUp className="w-3 h-3" />
              Positions
              <Badge variant="secondary" className="h-4 px-1 text-2xs">
                {portfolio.positions.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="trades" className="flex-1 overflow-auto m-0">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-xs w-20">Time</TableHead>
                <TableHead className="text-xs">Pair</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs text-right">Price</TableHead>
                <TableHead className="text-xs text-right">Amount</TableHead>
                <TableHead className="text-xs text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrades.map((trade) => (
                <TableRow key={trade.id} className="border-border hover:bg-accent/30">
                  <TableCell className="text-xs py-2">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">{formatDate(trade.timestamp)}</span>
                      <span className="tabular-nums">{formatTime(trade.timestamp)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs py-2 font-medium">
                    {trade.symbol}
                  </TableCell>
                  <TableCell className="text-xs py-2">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-2xs",
                        trade.type === 'buy' 
                          ? "border-profit text-profit" 
                          : "border-loss text-loss"
                      )}
                    >
                      {trade.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums">
                    ${trade.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums text-muted-foreground">
                    {trade.quantity.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums font-medium">
                    ${trade.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {recentTrades.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <History className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No trades yet</p>
              <p className="text-xs">Execute your first trade to see history</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders" className="flex-1 overflow-auto m-0">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-xs w-20">Time</TableHead>
                <TableHead className="text-xs">Pair</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Side</TableHead>
                <TableHead className="text-xs text-right">Price</TableHead>
                <TableHead className="text-xs text-right">Amount</TableHead>
                <TableHead className="text-xs w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.map((order) => (
                <TableRow key={order.id} className="border-border hover:bg-accent/30">
                  <TableCell className="text-xs py-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-warning" />
                      <span className="tabular-nums">{formatTime(order.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs py-2 font-medium">
                    {order.symbol}
                  </TableCell>
                  <TableCell className="text-xs py-2">
                    <Badge variant="outline" className="text-2xs">
                      {order.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-2xs",
                        order.side === 'buy' 
                          ? "border-profit text-profit" 
                          : "border-loss text-loss"
                      )}
                    >
                      {order.side.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums">
                    ${order.price?.toFixed(2) || '-'}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums">
                    {order.quantity.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-xs py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-muted-foreground hover:text-loss"
                      onClick={() => cancelOrder(order.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pendingOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <ClipboardList className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No open orders</p>
              <p className="text-xs">Limit orders will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="positions" className="flex-1 overflow-auto m-0">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-xs">Symbol</TableHead>
                <TableHead className="text-xs text-right">Size</TableHead>
                <TableHead className="text-xs text-right">Entry Price</TableHead>
                <TableHead className="text-xs text-right">Mark Price</TableHead>
                <TableHead className="text-xs text-right">PnL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.positions.map((position) => (
                <TableRow key={position.asset.id} className="border-border hover:bg-accent/30">
                  <TableCell className="text-xs py-2 font-medium">
                    {position.asset.symbol}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums">
                    {position.quantity.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums text-muted-foreground">
                    ${position.avgPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums">
                    ${position.asset.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs py-2 text-right">
                    <div className={cn(
                      "flex items-center justify-end gap-1 tabular-nums font-medium",
                      position.profitLoss >= 0 ? "text-profit" : "text-loss"
                    )}>
                      {position.profitLoss >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {position.profitLoss >= 0 ? '+' : ''}${position.profitLoss.toFixed(2)}
                      <span className="text-muted-foreground">
                        ({position.profitLoss >= 0 ? '+' : ''}{position.profitLossPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {portfolio.positions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No open positions</p>
              <p className="text-xs">Buy assets to see your positions here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Summary Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-secondary/30 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-muted-foreground">Total Trades: </span>
            <span className="font-medium">{totalTrades}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Buy Volume: </span>
            <span className="font-medium text-profit">${totalBuyVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Sell Volume: </span>
            <span className="font-medium text-loss">${totalSellVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
