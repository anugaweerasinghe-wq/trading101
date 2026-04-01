import { Link } from "react-router-dom";
import { Position } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PositionsTableProps {
  positions: Position[];
}

function fmtPrice(n: number): string {
  return n < 1 ? `$${n.toFixed(4)}` : `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function PnlBar({ percent }: { percent: number }) {
  const capped = Math.min(Math.abs(percent), 50); // cap visual width
  const width = Math.max(capped * 2, 4); // minimum 4px visible
  return (
    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all", percent >= 0 ? "bg-profit" : "bg-loss")}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

/* Desktop table row */
function DesktopRow({ position }: { position: Position }) {
  const isUp = position.profitLoss >= 0;
  return (
    <tr className={cn(
      "border-b border-border/30 transition-colors hover:bg-muted/30",
      isUp ? "hover:bg-profit/[0.03]" : "hover:bg-loss/[0.03]"
    )}>
      <td className="py-3.5 pr-3">
        <Link to={`/trade/${position.asset.symbol.toLowerCase()}`} className="flex items-center gap-2.5 group">
          <div>
            <span className="font-semibold text-sm group-hover:text-primary transition-colors">{position.asset.symbol}</span>
            <span className="block text-2xs text-muted-foreground truncate max-w-[120px]">{position.asset.name}</span>
          </div>
          <Badge variant="outline" className="text-2xs uppercase tracking-wider border-border/40 hidden sm:inline-flex">
            {position.asset.type}
          </Badge>
        </Link>
      </td>
      <td className="py-3.5 text-right tabular-nums text-sm text-muted-foreground">{fmtPrice(position.avgPrice)}</td>
      <td className="py-3.5 text-right tabular-nums text-sm font-medium">{fmtPrice(position.asset.price)}</td>
      <td className="py-3.5 text-right tabular-nums text-sm text-muted-foreground">{position.quantity.toFixed(4)}</td>
      <td className="py-3.5 text-right tabular-nums text-sm font-medium">{fmtPrice(position.currentValue)}</td>
      <td className={cn("py-3.5 text-right tabular-nums text-sm font-semibold", isUp ? "text-profit" : "text-loss")}>
        {isUp ? "+" : ""}${position.profitLoss.toFixed(2)}
      </td>
      <td className="py-3.5 text-right">
        <div className="flex items-center justify-end gap-2">
          <span className={cn("text-sm tabular-nums font-medium", isUp ? "text-profit" : "text-loss")}>
            {isUp ? "+" : ""}{position.profitLossPercent.toFixed(2)}%
          </span>
          <PnlBar percent={position.profitLossPercent} />
        </div>
      </td>
    </tr>
  );
}

/* Mobile card */
function MobileCard({ position }: { position: Position }) {
  const isUp = position.profitLoss >= 0;
  return (
    <Link
      to={`/trade/${position.asset.symbol.toLowerCase()}`}
      className={cn(
        "block glass-tactile border-chrome rounded-xl p-4 transition-all hover:border-primary/30",
        isUp ? "hover:bg-profit/[0.03]" : "hover:bg-loss/[0.03]"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">{position.asset.symbol}</span>
          <Badge variant="outline" className="text-2xs uppercase border-border/40">{position.asset.type}</Badge>
        </div>
        <div className="flex items-center gap-1">
          {isUp ? <TrendingUp className="w-3.5 h-3.5 text-profit" /> : <TrendingDown className="w-3.5 h-3.5 text-loss" />}
          <span className={cn("text-sm font-semibold tabular-nums", isUp ? "text-profit" : "text-loss")}>
            {isUp ? "+" : ""}{position.profitLossPercent.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div>
          <span className="text-2xs text-muted-foreground uppercase">Entry</span>
          <p className="tabular-nums text-muted-foreground">{fmtPrice(position.avgPrice)}</p>
        </div>
        <div className="text-right">
          <span className="text-2xs text-muted-foreground uppercase">Current</span>
          <p className="tabular-nums font-medium">{fmtPrice(position.asset.price)}</p>
        </div>
        <div>
          <span className="text-2xs text-muted-foreground uppercase">Qty</span>
          <p className="tabular-nums text-muted-foreground">{position.quantity.toFixed(4)}</p>
        </div>
        <div className="text-right">
          <span className="text-2xs text-muted-foreground uppercase">P&L</span>
          <p className={cn("tabular-nums font-semibold", isUp ? "text-profit" : "text-loss")}>
            {isUp ? "+" : ""}${position.profitLoss.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="mt-2.5">
        <PnlBar percent={position.profitLossPercent} />
      </div>
    </Link>
  );
}

export function PositionsTable({ positions }: PositionsTableProps) {
  if (positions.length === 0) {
    return (
      <div className="glass-tactile border-chrome rounded-2xl p-12 text-center space-y-3">
        <p className="text-lg text-muted-foreground">No positions yet</p>
        <p className="text-sm text-muted-foreground">Start trading to build your portfolio and track performance.</p>
        <Link
          to="/trade"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors btn-squeeze"
        >
          Start Trading →
        </Link>
      </div>
    );
  }

  // Sort: biggest P&L% first
  const sorted = [...positions].sort((a, b) => b.profitLossPercent - a.profitLossPercent);

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block glass-tactile border-chrome rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">Asset</th>
              <th className="text-right py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">Entry</th>
              <th className="text-right py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">Current</th>
              <th className="text-right py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">Qty</th>
              <th className="text-right py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">Value</th>
              <th className="text-right py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">P&L</th>
              <th className="text-right py-3 px-4 text-2xs uppercase tracking-wider text-muted-foreground font-medium">Return</th>
            </tr>
          </thead>
          <tbody className="px-4">
            {sorted.map((p) => (
              <DesktopRow key={p.asset.id} position={p} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid gap-3">
        {sorted.map((p) => (
          <MobileCard key={p.asset.id} position={p} />
        ))}
      </div>
    </>
  );
}
