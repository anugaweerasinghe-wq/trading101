import { useState, useCallback, useRef } from "react";
import { Asset } from "@/lib/types";
import { formatPrice } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, DollarSign, Loader2 } from "lucide-react";

interface OrderPanelProps {
  asset: Asset | null;
  availableCash: number;
  onTrade: (
    asset: Asset,
    type: 'buy' | 'sell',
    quantity: number,
    orderType?: 'market' | 'limit',
    limitPrice?: number
  ) => void;
}

export function OrderPanel({ asset, availableCash, onTrade }: OrderPanelProps) {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [sliderValue, setSliderValue] = useState([0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Debounce ref to prevent double-clicking
  const lastSubmitTime = useRef<number>(0);
  const DEBOUNCE_MS = 1000;

  const price = asset ? (orderType === 'limit' && limitPrice ? parseFloat(limitPrice) : asset.price) : 0;
  const quantity = amount ? parseFloat(amount) : 0;
  const total = quantity * price;
  const fee = total * 0.001; // 0.1% fee
  const totalWithFee = side === 'buy' ? total + fee : total - fee;

  const maxBuyQuantity = price > 0 ? availableCash / (price * 1.001) : 0;
  const maxBuyAmount = Math.floor(maxBuyQuantity * 10000) / 10000;

  const handleSliderChange = useCallback((value: number[]) => {
    setSliderValue(value);
    const percentage = value[0] / 100;
    const maxAmount = side === 'buy' ? maxBuyAmount : 0;
    setAmount((maxAmount * percentage).toFixed(4));
  }, [side, maxBuyAmount]);

  const handleQuickAmount = useCallback((percentage: number) => {
    const maxAmount = side === 'buy' ? maxBuyAmount : 0;
    setAmount((maxAmount * percentage).toFixed(4));
    setSliderValue([percentage * 100]);
  }, [side, maxBuyAmount]);

  const handleSubmit = useCallback(async () => {
    if (!asset || !quantity || quantity <= 0) return;
    
    // Debounce check to prevent race conditions
    const now = Date.now();
    if (now - lastSubmitTime.current < DEBOUNCE_MS) return;
    lastSubmitTime.current = now;
    
    // Set loading state immediately
    setIsSubmitting(true);
    
    try {
      await onTrade(
        asset,
        side,
        quantity,
        orderType,
        orderType === 'limit' ? parseFloat(limitPrice) : undefined
      );

      // Reset form
      setAmount("");
      setLimitPrice("");
      setSliderValue([0]);
    } finally {
      // Small delay before re-enabling to prevent rapid clicks
      setTimeout(() => setIsSubmitting(false), 300);
    }
  }, [asset, side, quantity, orderType, limitPrice, onTrade]);

  const isValid = asset && quantity > 0 && (side === 'buy' ? totalWithFee <= availableCash : true) && !isSubmitting;

  // Early return AFTER all hooks are called
  if (!asset) {
    return (
      <Card className="h-full flex items-center justify-center bento-card p-6">
        <div className="text-center text-muted-foreground">
          <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select an asset to trade</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col bento-card overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{asset.symbol}</h3>
            <p className="text-xs text-muted-foreground">{asset.name}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold tabular-nums">${formatPrice(asset.price, asset.type)}</p>
            <p className={cn(
              "text-xs tabular-nums",
              asset.changePercent >= 0 ? "text-profit" : "text-loss"
            )}>
              {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Buy/Sell Toggle */}
      <div className="grid grid-cols-2 p-2 gap-1 bg-muted/30">
        <Button
          variant="ghost"
          className={cn(
            "h-9 font-semibold transition-all rounded-xl",
            side === 'buy' 
              ? "bg-profit text-profit-foreground hover:bg-profit/90 text-glow-cyan" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setSide('buy')}
        >
          Buy
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-9 font-semibold transition-all rounded-xl",
            side === 'sell' 
              ? "bg-loss text-white hover:bg-loss/90" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setSide('sell')}
        >
          Sell
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Order Type */}
        <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'market' | 'limit')}>
          <TabsList className="grid w-full grid-cols-2 h-8 rounded-xl">
            <TabsTrigger value="market" className="text-xs rounded-lg">Market</TabsTrigger>
            <TabsTrigger value="limit" className="text-xs rounded-lg">Limit</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Limit Price */}
        {orderType === 'limit' && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Limit Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder={asset.price.toString()}
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="pl-9 h-10 bg-muted/50 border-0 tabular-nums rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Amount ({asset.symbol})</Label>
            <span className="text-xs text-muted-foreground">
              Available: ${availableCash.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-10 bg-muted/50 border-0 tabular-nums rounded-xl"
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((pct) => (
            <Button
              key={pct}
              variant="outline"
              size="sm"
              className="h-7 text-xs rounded-lg border-border/50"
              onClick={() => handleQuickAmount(pct / 100)}
            >
              {pct}%
            </Button>
          ))}
        </div>

        {/* Slider */}
        <div className="py-2">
          <Slider
            value={sliderValue}
            onValueChange={handleSliderChange}
            max={100}
            step={1}
            className={cn(
              "[&_[role=slider]]:h-4 [&_[role=slider]]:w-4",
              side === 'buy' 
                ? "[&_.bg-primary]:bg-profit" 
                : "[&_.bg-primary]:bg-loss"
            )}
          />
        </div>

        {/* Order Summary */}
        <div className="space-y-2 py-3 border-t border-border/30">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="tabular-nums">${formatPrice(price, asset.type)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span className="tabular-nums">{quantity.toFixed(4)} {asset.symbol}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee (0.1%)</span>
            <span className="tabular-nums">${fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border/30">
            <span>Total</span>
            <span className="tabular-nums">${totalWithFee.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Submit Button with loading state */}
      <div className="p-4 border-t border-border/30">
        <Button
          className={cn(
            "w-full h-11 font-semibold text-white rounded-xl transition-all",
            side === 'buy'
              ? "bg-profit hover:bg-profit/90 text-glow-cyan"
              : "bg-loss hover:bg-loss/90"
          )}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>{side === 'buy' ? 'Buy' : 'Sell'} {asset.symbol}</>
          )}
        </Button>
      </div>
    </Card>
  );
}
