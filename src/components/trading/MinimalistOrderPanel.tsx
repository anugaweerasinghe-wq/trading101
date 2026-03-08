import { useState, useCallback, useRef } from "react";
import { Asset, Portfolio } from "@/lib/types";
import { formatPrice } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { GhostJournalToggle } from "./GhostJournalToggle";
import { RevengeTradingBlocker, isRevengeTrade } from "./RevengeTradingBlocker";

interface MinimalistOrderPanelProps {
  asset: Asset | null;
  availableCash: number;
  portfolio?: Portfolio;
  onTrade: (
    asset: Asset,
    type: 'buy' | 'sell',
    quantity: number,
    orderType?: 'market' | 'limit',
    limitPrice?: number,
    rationale?: string
  ) => void;
}

export function MinimalistOrderPanel({ asset, availableCash, portfolio, onTrade }: MinimalistOrderPanelProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [journalEnabled, setJournalEnabled] = useState(false);
  const [rationale, setRationale] = useState("");
  const [showRevengeBlocker, setShowRevengeBlocker] = useState(false);

  const lastSubmitTime = useRef<number>(0);
  const DEBOUNCE_MS = 1000;

  const price = asset?.price || 0;
  const quantity = amount ? parseFloat(amount) : 0;
  const total = quantity * price;
  const fee = total * 0.001;
  const totalWithFee = side === 'buy' ? total + fee : total - fee;
  const maxBuyQuantity = price > 0 ? availableCash / (price * 1.001) : 0;

  const handleQuickAmount = useCallback((percentage: number) => {
    const maxAmount = side === 'buy' ? maxBuyQuantity : 0;
    setAmount((maxAmount * percentage).toFixed(4));
  }, [side, maxBuyQuantity]);

  const executeTrade = useCallback(async () => {
    if (!asset || !quantity || quantity <= 0) return;
    setIsSubmitting(true);
    try {
      await onTrade(asset, side, quantity, 'market', undefined, journalEnabled ? rationale : undefined);
      setAmount("");
      setRationale("");
    } finally {
      setTimeout(() => setIsSubmitting(false), 300);
    }
  }, [asset, side, quantity, onTrade, journalEnabled, rationale]);

  const handleSubmit = useCallback(async () => {
    if (!asset || !quantity || quantity <= 0) return;

    const now = Date.now();
    if (now - lastSubmitTime.current < DEBOUNCE_MS) return;
    lastSubmitTime.current = now;

    if (journalEnabled && !rationale.trim()) return;

    // Revenge trading detection
    const balance = portfolio?.totalValue || availableCash;
    if (isRevengeTrade(total, balance)) {
      setShowRevengeBlocker(true);
      return;
    }

    await executeTrade();
  }, [asset, quantity, journalEnabled, rationale, portfolio, availableCash, total, executeTrade]);

  const isValid = asset && quantity > 0 && (side === 'buy' ? totalWithFee <= availableCash : true) && !isSubmitting && (!journalEnabled || rationale.trim().length > 0);

  if (!asset) {
    return (
      <div className="glass-liquid rounded-2xl p-6 text-center">
        <p className="text-muted-foreground">Select an asset to trade</p>
      </div>
    );
  }

  return (
    <>
      <div className="glass-tactile rounded-2xl p-5 space-y-5 border-chrome">
        {/* Buy/Sell Toggle */}
        <div className="flex p-1 bg-white/5 rounded-xl">
          <button
            onClick={() => setSide('buy')}
            className={cn(
              "flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all",
              side === 'buy'
                ? "bg-profit text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Buy
          </button>
          <button
            onClick={() => setSide('sell')}
            className={cn(
              "flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all",
              side === 'sell'
                ? "bg-loss text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Sell
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span className="text-muted-foreground">
              Max: <span className="text-foreground font-medium">{maxBuyQuantity.toFixed(4)}</span>
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="0.0000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-lg font-medium tabular-nums placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              {asset.symbol}
            </span>
          </div>
        </div>

        {/* Quick Amount Pills */}
        <div className="flex gap-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => handleQuickAmount(pct / 100)}
              className="flex-1 py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Ghost Journal Toggle */}
        <GhostJournalToggle
          journalEnabled={journalEnabled}
          onToggle={setJournalEnabled}
          rationale={rationale}
          onRationaleChange={setRationale}
        />

        {/* Order Summary */}
        <div className="space-y-2 py-3 border-t border-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium tabular-nums">${formatPrice(price, asset.type)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee (0.1%)</span>
            <span className="tabular-nums">${fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-white/5">
            <span>Total</span>
            <span className="tabular-nums">${totalWithFee.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={cn(
            "w-full py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-squeeze",
            side === 'buy'
              ? "bg-profit hover:bg-profit/90 shadow-lg shadow-glow-profit"
              : "bg-loss hover:bg-loss/90 shadow-lg shadow-glow-loss"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </span>
          ) : (
            <span>{side === 'buy' ? 'Buy' : 'Sell'} {asset.symbol}</span>
          )}
        </button>
      </div>

      <RevengeTradingBlocker
        isOpen={showRevengeBlocker}
        onComplete={() => {
          setShowRevengeBlocker(false);
          executeTrade();
        }}
        onCancel={() => setShowRevengeBlocker(false)}
      />
    </>
  );
}
