/**
 * Price movement utility for simulated (non-crypto) assets
 * Generates ±0.05% visual liveness fluctuations
 */

export function generatePriceMovement(basePrice: number): {
  price: number;
  change: number;
  changePercent: number;
} {
  const maxFluctuation = 0.0005; // ±0.05%
  const fluctuation = (Math.random() * 2 - 1) * maxFluctuation;
  const newPrice = basePrice * (1 + fluctuation);
  const change = newPrice - basePrice;
  const changePercent = fluctuation * 100;

  return {
    price: Number(newPrice.toFixed(basePrice < 1 ? 6 : 2)),
    change: Number(change.toFixed(basePrice < 1 ? 6 : 4)),
    changePercent: Number(changePercent.toFixed(4)),
  };
}
