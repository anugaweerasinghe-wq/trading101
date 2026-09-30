// Percentage change is relative to the previous price, not the current price.
export function absoluteQuoteChange(price: number, percent: number): number | null {
  if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(percent) || percent <= -100) return null;
  return price - price / (1 + percent / 100);
}
