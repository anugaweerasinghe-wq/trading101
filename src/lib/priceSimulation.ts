import { Asset, AssetType } from './types';
import { supabase } from '@/integrations/supabase/client';

const LAST_UPDATE_KEY = 'tradehq_last_update';
const UPDATE_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds
const AI_PREDICTIONS_KEY = 'tradehq_ai_predictions';
const PREDICTIONS_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Realistic volatility ranges per asset type (fallback)
const VOLATILITY: Record<AssetType, number> = {
  stock: 0.25,
  etf: 0.15,
  crypto: 0.80,
  commodity: 0.20,
  forex: 0.10,
};

interface MarketPrediction {
  symbol: string;
  dailyVolatility: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  annualReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: number;
}

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

// Get cached AI predictions
function getCachedPredictions(): Record<string, MarketPrediction> | null {
  try {
    const stored = localStorage.getItem(AI_PREDICTIONS_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    const age = Date.now() - data.timestamp;
    
    // Return null if predictions are expired
    if (age > PREDICTIONS_EXPIRY) {
      localStorage.removeItem(AI_PREDICTIONS_KEY);
      return null;
    }
    
    return data.predictions;
  } catch {
    return null;
  }
}

// Cache AI predictions
function cachePredictions(predictions: Record<string, MarketPrediction>) {
  localStorage.setItem(AI_PREDICTIONS_KEY, JSON.stringify({
    predictions,
    timestamp: Date.now()
  }));
}

// Fetch AI-driven market predictions
export async function fetchMarketPredictions(assets: Asset[]): Promise<Record<string, MarketPrediction>> {
  try {
    // Check cache first
    const cached = getCachedPredictions();
    if (cached) {
      console.log('Using cached AI predictions');
      return cached;
    }

    console.log('Fetching new AI market predictions...');
    
    const { data, error } = await supabase.functions.invoke('market-analysis', {
      body: {
        assets: assets.map(a => ({
          symbol: a.symbol,
          name: a.name,
          price: a.price,
          type: a.type,
          changePercent: a.changePercent
        })),
        timeframe: 365 // 1 year ahead
      }
    });

    if (error) {
      console.error('Error fetching AI predictions:', error);
      return {};
    }

    // Convert array to record
    const predictions: Record<string, MarketPrediction> = {};
    if (data?.predictions) {
      for (const pred of data.predictions) {
        predictions[pred.symbol] = {
          ...pred,
          timestamp: Date.now()
        };
      }
      
      // Cache the predictions
      cachePredictions(predictions);
      console.log('AI predictions cached:', Object.keys(predictions));
    }

    return predictions;
  } catch (error) {
    console.error('Error in fetchMarketPredictions:', error);
    return {};
  }
}

/**
 * Simulate realistic price movement using AI predictions or geometric Brownian motion
 * This creates realistic price changes based on market analysis
 */
export function simulatePriceChange(
  currentPrice: number,
  assetType: AssetType,
  hoursElapsed: number = 1,
  prediction?: MarketPrediction
): number {
  let volatility: number;
  let drift: number;

  if (prediction) {
    // Use AI-driven parameters
    volatility = prediction.dailyVolatility / 100; // Convert percentage to decimal
    
    // Calculate drift based on annual return and trend
    const baseAnnualReturn = prediction.annualReturn / 100;
    drift = baseAnnualReturn / (365 * 24); // Convert to hourly
    
    // Adjust drift based on trend
    if (prediction.trend === 'bullish') {
      drift *= 1.2; // Increase drift for bullish trend
    } else if (prediction.trend === 'bearish') {
      drift *= 0.6; // Reduce drift for bearish trend
    }
  } else {
    // Fallback to default parameters
    volatility = VOLATILITY[assetType];
    drift = 0.07 / (365 * 24); // 7% annual return
  }
  
  // Convert daily volatility to hourly
  const hourlyVolatility = volatility / Math.sqrt(24);
  
  // Generate random return using normal distribution (Box-Muller transform)
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  
  // Calculate return with drift
  const randomReturn = drift + hourlyVolatility * z * Math.sqrt(hoursElapsed);
  
  // Apply the return to get new price
  const newPrice = currentPrice * Math.exp(randomReturn);
  
  // Ensure price doesn't go below a reasonable minimum (1% of original)
  return Math.max(newPrice, currentPrice * 0.01);
}

export function simulateAssetPrices(
  assets: Asset[], 
  hoursElapsed: number = 1,
  predictions?: Record<string, MarketPrediction>
): Asset[] {
  return assets.map(asset => {
    const prediction = predictions?.[asset.symbol];
    const newPrice = simulatePriceChange(asset.price, asset.type, hoursElapsed, prediction);
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
