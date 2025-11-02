import { Asset } from './types';

// Generate realistic intraday price history for charts
export function generatePriceHistory(asset: Asset, days: number = 7): { time: Date; price: number; volume: number }[] {
  const history = [];
  const now = new Date();
  const intervalsPerDay = 24; // Hourly data
  const totalIntervals = days * intervalsPerDay;
  
  let currentPrice = asset.price;
  
  // Generate historical prices working backwards
  for (let i = totalIntervals; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000); // Go back in hours
    
    // Random walk with mean reversion
    const drift = (asset.price - currentPrice) * 0.01; // Pull towards current price
    const randomChange = (Math.random() - 0.5) * 0.02; // Random ±2%
    currentPrice = currentPrice * (1 + drift + randomChange);
    
    // Generate realistic volume
    const baseVolume = asset.type === 'crypto' ? 1000000 : 
                      asset.type === 'stock' ? 5000000 : 
                      asset.type === 'etf' ? 10000000 : 500000;
    const volume = Math.floor(baseVolume * (0.5 + Math.random()));
    
    history.push({
      time,
      price: Math.max(currentPrice, asset.price * 0.5), // Don't go below 50% of current
      volume
    });
  }
  
  return history;
}

// Generate candlestick data (OHLC)
export function generateCandlestickData(asset: Asset, days: number = 30) {
  const candles = [];
  const now = new Date();
  let currentPrice = asset.price;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Generate OHLC for the day
    const open = currentPrice;
    const volatility = 0.03; // 3% daily volatility
    const trend = (Math.random() - 0.48) * volatility; // Slight upward bias
    
    const high = open * (1 + Math.abs(trend) + Math.random() * volatility);
    const low = open * (1 - Math.abs(trend) - Math.random() * volatility);
    const close = open * (1 + trend);
    
    const baseVolume = asset.type === 'crypto' ? 50000000 : 
                      asset.type === 'stock' ? 20000000 : 
                      asset.type === 'etf' ? 50000000 : 5000000;
    const volume = Math.floor(baseVolume * (0.7 + Math.random() * 0.6));
    
    candles.push({
      time: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume
    });
    
    currentPrice = close;
  }
  
  return candles;
}

// Calculate 24h stats
export function calculate24hStats(asset: Asset) {
  const history = generatePriceHistory(asset, 1);
  const prices = history.map(h => h.price);
  const volumes = history.map(h => h.volume);
  
  const high24h = Math.max(...prices);
  const low24h = Math.min(...prices);
  const volume24h = volumes.reduce((sum, v) => sum + v, 0);
  const priceChange24h = asset.price - prices[0];
  const priceChangePercent24h = (priceChange24h / prices[0]) * 100;
  
  return {
    high24h,
    low24h,
    volume24h,
    priceChange24h,
    priceChangePercent24h,
  };
}

// Get real-time price updates (simulated)
export function subscribeToPrice(assetId: string, callback: (price: number, change: number) => void) {
  const interval = setInterval(() => {
    // Simulate small price movements (±0.5%)
    const changePercent = (Math.random() - 0.5) * 0.01;
    callback(changePercent, changePercent * 100);
  }, 3000); // Update every 3 seconds
  
  return () => clearInterval(interval);
}

// Market sentiment indicators
export function getMarketSentiment(changePercent: number): 'bullish' | 'bearish' | 'neutral' {
  if (changePercent > 2) return 'bullish';
  if (changePercent < -2) return 'bearish';
  return 'neutral';
}
