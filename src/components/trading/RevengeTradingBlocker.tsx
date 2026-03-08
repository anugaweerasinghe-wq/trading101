import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ShieldAlert, Wind } from "lucide-react";

interface RevengeTradingBlockerProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

const COOLDOWN_SECONDS = 5;

export function RevengeTradingBlocker({ isOpen, onComplete, onCancel }: RevengeTradingBlockerProps) {
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN_SECONDS);
  const [breathPhase, setBreathPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(COOLDOWN_SECONDS);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const breathTimer = setInterval(() => {
      setBreathPhase(prev => prev === "in" ? "out" : "in");
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(breathTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

      <div className="relative z-10 max-w-md w-full mx-4 glass-tactile border-chrome rounded-3xl p-8 text-center space-y-6 animate-scale-in">
        {/* Warning Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-warning/20 flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-warning" />
        </div>

        <h2 className="text-xl font-bold text-foreground tracking-tight-cyber">
          Psychology Warning
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed">
          You're attempting a large trade shortly after a loss. This pattern is associated with
          <span className="text-warning font-semibold"> revenge trading</span> — an emotional response that often leads to larger losses.
        </p>

        {/* Breath & Reset */}
        <div className="py-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Wind className="w-4 h-4" />
            <span>Breath & Reset</span>
          </div>

          <div
            className={cn(
              "w-24 h-24 mx-auto rounded-full border-2 border-primary/40 transition-all duration-[2500ms] ease-in-out flex items-center justify-center",
              breathPhase === "in"
                ? "scale-125 bg-primary/10 shadow-glow-cyan"
                : "scale-90 bg-primary/5"
            )}
          >
            <span className="text-xs font-medium text-primary">
              {breathPhase === "in" ? "Breathe In" : "Breathe Out"}
            </span>
          </div>
        </div>

        {/* Timer */}
        <div className="text-3xl font-bold tabular-nums text-foreground">
          {secondsLeft > 0 ? `0:0${secondsLeft}` : "Ready"}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-all"
          >
            Cancel Trade
          </button>
          <button
            onClick={onComplete}
            disabled={secondsLeft > 0}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
              secondsLeft > 0
                ? "bg-white/5 text-muted-foreground/50 cursor-not-allowed"
                : "bg-warning text-white hover:bg-warning/90 shadow-lg"
            )}
          >
            {secondsLeft > 0 ? "Wait..." : "Proceed Anyway"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility: detect revenge trading pattern
const LOSS_TRACKING_KEY = "tradehq_last_loss_time";

export function recordLoss() {
  localStorage.setItem(LOSS_TRACKING_KEY, Date.now().toString());
}

export function isRevengeTrade(tradeTotal: number, accountBalance: number): boolean {
  const lastLossTime = localStorage.getItem(LOSS_TRACKING_KEY);
  if (!lastLossTime) return false;

  const timeSinceLoss = Date.now() - parseInt(lastLossTime);
  const fiveMinutes = 5 * 60 * 1000;
  const isWithinWindow = timeSinceLoss < fiveMinutes;
  const isLargePosition = tradeTotal > accountBalance * 0.10;

  return isWithinWindow && isLargePosition;
}
