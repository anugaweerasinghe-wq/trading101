import { PortfolioSnapshot, Portfolio, Position } from './types';
import { ASSETS } from './assets';
import { 
  getHoursSinceLastUpdate, 
  setLastUpdateTime, 
  simulateAssetPrices 
} from './priceSimulation';

const HISTORY_KEY = 'tradesandbox_history';

export function getPortfolioHistory(): PortfolioSnapshot[] {
  const stored = localStorage.getItem(HISTORY_KEY);
  if (stored) {
    const history = JSON.parse(stored);
    return history.map((snapshot: PortfolioSnapshot) => ({
      ...snapshot,
      timestamp: new Date(snapshot.timestamp),
    }));
  }
  return [];
}

export function addPortfolioSnapshot(snapshot: PortfolioSnapshot): void {
  const history = getPortfolioHistory();
  history.push(snapshot);
  
  // Keep only last 500 snapshots (more history for time-based tracking)
  if (history.length > 500) {
    history.shift();
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function recordSnapshot(cash: number, positionsValue: number): void {
  const totalValue = cash + positionsValue;
  const snapshot: PortfolioSnapshot = {
    timestamp: new Date(),
    totalValue,
    cash,
    positionsValue,
  };
  addPortfolioSnapshot(snapshot);
}

/**
 * Update portfolio with simulated price changes over time
 * This creates realistic portfolio value changes based on market movements
 */
export function updatePortfolioOverTime(portfolio: Portfolio): Portfolio {
  const hoursElapsed = getHoursSinceLastUpdate();
  
  // If less than 1 hour has passed, no update needed
  if (hoursElapsed < 1) {
    return portfolio;
  }
  
  // Calculate how many hourly snapshots to create (max 168 = 1 week)
  const hoursToSimulate = Math.min(Math.floor(hoursElapsed), 168);
  
  if (hoursToSimulate === 0) {
    return portfolio;
  }
  
  // Get current asset prices
  let currentAssets = [...ASSETS];
  
  // Simulate price changes for each hour that passed
  for (let i = 0; i < hoursToSimulate; i++) {
    // Simulate 1 hour of price movement
    currentAssets = simulateAssetPrices(currentAssets, 1);
    
    // Calculate portfolio value with new prices
    let positionsValue = 0;
    const updatedPositions = portfolio.positions.map(position => {
      const updatedAsset = currentAssets.find(a => a.id === position.asset.id);
      if (updatedAsset) {
        const currentValue = updatedAsset.price * position.quantity;
        positionsValue += currentValue;
        return {
          ...position,
          asset: updatedAsset,
          currentValue,
        };
      }
      return position;
    });
    
    // Record a snapshot for this hour
    const snapshotTime = new Date(Date.now() - (hoursToSimulate - i - 1) * 60 * 60 * 1000);
    const snapshot: PortfolioSnapshot = {
      timestamp: snapshotTime,
      totalValue: portfolio.cash + positionsValue,
      cash: portfolio.cash,
      positionsValue,
    };
    addPortfolioSnapshot(snapshot);
  }
  
  // Update the last update time
  setLastUpdateTime(new Date());
  
  // Return updated portfolio with new prices
  const finalAssets = currentAssets;
  const updatedPositions: Position[] = portfolio.positions.map(position => {
    const updatedAsset = finalAssets.find(a => a.id === position.asset.id);
    if (updatedAsset) {
      const currentValue = updatedAsset.price * position.quantity;
      const totalCost = position.avgPrice * position.quantity;
      return {
        ...position,
        asset: updatedAsset,
        currentValue,
        profitLoss: currentValue - totalCost,
        profitLossPercent: ((currentValue - totalCost) / totalCost) * 100,
      };
    }
    return position;
  });
  
  const positionsValue = updatedPositions.reduce((sum, p) => sum + p.currentValue, 0);
  
  return {
    ...portfolio,
    positions: updatedPositions,
    totalValue: portfolio.cash + positionsValue,
  };
}
