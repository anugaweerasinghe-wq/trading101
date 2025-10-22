import { Asset, AssetType } from './types';

const LAST_UPDATE_KEY = 'tradesandbox_last_update';
const UPDATE_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

// Realistic volatility ranges per asset type (annualized)
const VOLATILITY: Record<AssetType, number> = {
  stock: 0.25,      // 25% annual volatility
  etf: 0.15,        // 15% annual volatility (more diversified)
  crypto: 0.80,     // 80% annual volatility (highly volatile)
  commodity: 0.20,  // 20% annual volatility
};

export function getLastUpdateTime(): Date | null {
  const stored = localStorage.getItem(LAST_UPDATE_KEY);
  return stored ? new Date(stored) : null;
}

export function setLastUpdateTime(time: Date): void {
  localStorage.setItem(LAST_UPDATE_KEY, time.toISOString());
}

export function getHoursSinceLastUpdate(): number {
  const lastUpdate = getLastUpdateTime();
  if (!lastUpdate) {
    // First time - set to now and return 0
    setLastUpdateTime(new Date());
    return 0;
  }
  
  const now = new Date();
  const diffMs = now.getTime() - lastUpdate.getTime();
  return diffMs / UPDATE_INTERVAL;
}

export function shouldUpdatePrices(): boolean {
  return getHoursSinceLastUpdate() >= 1;
}

/**
 * Simulate realistic price movement using geometric Brownian motion
 * This creates realistic price changes based on asset volatility
 */
export function simulatePriceChange(
  currentPrice: number,
  assetType: AssetType,
  hoursElapsed: number = 1
): number {
  const volatility = VOLATILITY[assetType];
  
  // Convert annual volatility to hourly
  const hourlyVolatility = volatility / Math.sqrt(365 * 24);
  
  // Generate random return using normal distribution approximation
  // Using Box-Muller transform for normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  
  // Calculate return with drift (slight upward bias for long-term growth)
  const drift = 0.07 / (365 * 24); // 7% annual return converted to hourly
  const randomReturn = drift + hourlyVolatility * z * Math.sqrt(hoursElapsed);
  
  // Apply the return to get new price
  const newPrice = currentPrice * Math.exp(randomReturn);
  
  // Ensure price doesn't go below a reasonable minimum (1% of original)
  return Math.max(newPrice, currentPrice * 0.01);
}

export function simulateAssetPrices(assets: Asset[], hoursElapsed: number = 1): Asset[] {
  return assets.map(asset => {
    const newPrice = simulatePriceChange(asset.price, asset.type, hoursElapsed);
    const priceChange = newPrice - asset.price;
    const percentChange = (priceChange / asset.price) * 100;
    
    return {
      ...asset,
      price: newPrice,
      change: priceChange,
      changePercent: percentChange,
    };
  });
}
