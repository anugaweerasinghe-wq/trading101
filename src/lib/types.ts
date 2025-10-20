export type AssetType = 'stock' | 'etf' | 'crypto' | 'commodity';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  change: number;
  changePercent: number;
  logo?: string;
}

export interface Position {
  asset: Asset;
  quantity: number;
  avgPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Trade {
  id: string;
  assetId: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: Date;
}

export interface Portfolio {
  cash: number;
  totalValue: number;
  positions: Position[];
  trades: Trade[];
}
