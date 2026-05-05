import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  /** Render the wordmark next to the symbol */
  showWordmark?: boolean;
  /** Tailwind text-size class controlling overall scale */
  size?: "sm" | "md" | "lg";
}

/**
 * TradeHQ Brand Mark
 * A minimalist upward wedge — one continuous geometric gesture suggesting
 * ascent, momentum, and clarity. Nike-like confidence, Apple-like restraint.
 * The mark is a single SVG path; it scales perfectly and inherits currentColor.
 */
export function BrandMark({ className, showWordmark = true, size = "md" }: BrandMarkProps) {
  const symbolSize = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const wordSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(symbolSize, "shrink-0")}
        aria-label="TradeHQ"
        role="img"
      >
        {/* Solid rounded square plate, primary-tinted */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill="hsl(var(--primary))"
        />
        {/* The mark: a single bold upward chevron — clean negative-space gesture */}
        <path
          d="M8 21.5 L16 11 L24 21.5"
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span
          className={cn(
            wordSize,
            "font-semibold tracking-tight text-foreground",
          )}
          style={{ letterSpacing: "-0.02em" }}
        >
          tradehq
        </span>
      )}
    </span>
  );
}
