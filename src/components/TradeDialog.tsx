import { useState } from "react";
import { Asset } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradeDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrade: (asset: Asset, type: 'buy' | 'sell', quantity: number) => void;
  availableCash: number;
}

export function TradeDialog({ asset, open, onOpenChange, onTrade, availableCash }: TradeDialogProps) {
  const [quantity, setQuantity] = useState("1");

  if (!asset) return null;

  const handleTrade = (type: 'buy' | 'sell') => {
    const qty = parseFloat(quantity);
    if (qty > 0) {
      onTrade(asset, type, qty);
      setQuantity("1");
      onOpenChange(false);
    }
  };

  const total = asset.price * parseFloat(quantity || "0");
  const fee = total * 0.001;
  const totalWithFee = total + fee;
  const maxShares = Math.floor(availableCash / asset.price);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Trade {asset.symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{asset.name}</p>
              <p className="text-3xl font-bold">${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              asset.change >= 0 ? "text-success" : "text-destructive"
            )}>
              {asset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {asset.change >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="quantity"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => setQuantity(maxShares.toString())}
                >
                  Max
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Max: {maxShares} shares with ${availableCash.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee (0.1%)</span>
                <span>${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span>${totalWithFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              size="lg"
              onClick={() => handleTrade('buy')}
              disabled={totalWithFee > availableCash || parseFloat(quantity) <= 0}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              Buy
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleTrade('sell')}
              disabled={parseFloat(quantity) <= 0}
              className="border-destructive/30 hover:bg-destructive/10 text-destructive"
            >
              Sell
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
