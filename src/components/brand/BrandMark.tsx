import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  /** Render the wordmark next to the symbol (defaults off — symbol-only like Apple/Nike) */
  showWordmark?: boolean;
  /** Tailwind size class controlling overall scale */
  size?: "sm" | "md" | "lg";
}

/**
 * TradeHQ Brand Mark — "Apex"
 * A monolithic obsidian plate with a single ascending wedge in
 * platinum→emerald gradient. Symbol-only by default (Apple/Nike pattern).
 * Premium, dark, hardware-grade. Recognizable at 16px.
 */
export function BrandMark({ className, showWordmark = false, size = "md" }: BrandMarkProps) {
  const symbolSize = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const wordSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const gid = `bm-${size}`;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(symbolSize, "shrink-0")}
        aria-label="TradeHQ"
        role="img"
      >
        <defs>
          <linearGradient id={`${gid}-plate`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C1C22" />
            <stop offset="100%" stopColor="#0A0A0F" />
          </linearGradient>
          <linearGradient id={`${gid}-wedge`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8ECF1" />
            <stop offset="100%" stopColor="#00E396" />
          </linearGradient>
          <linearGradient id={`${gid}-rim`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Obsidian plate */}
        <rect x="2" y="2" width="60" height="60" rx="14" fill={`url(#${gid}-plate)`} />
        {/* Top rim highlight — physical depth */}
        <rect x="2" y="2" width="60" height="60" rx="14" fill={`url(#${gid}-rim)`} />
        {/* The Apex — single ascending stroke */}
        <path
          d="M14 46 L28 22 L36 34 L50 18"
          fill="none"
          stroke={`url(#${gid}-wedge)`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Apex node */}
        <circle cx="50" cy="18" r="3.5" fill="#00E396" />
      </svg>
      {showWordmark && (
        <span
          className={cn(wordSize, "font-semibold tracking-tight text-foreground")}
          style={{ letterSpacing: "-0.02em" }}
        >
          tradehq
        </span>
      )}
    </span>
  );
}
