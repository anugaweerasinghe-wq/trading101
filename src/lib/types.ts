export type AssetType = 'stock' | 'etf' | 'crypto' | 'commodity' | 'forex';

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

export interface JournalEntry {
  notes: string;
  emotions: string[];
  screenshot?: string;
  reasoning: string;
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
  journal?: JournalEntry;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

export interface Portfolio {
  cash: number;
  totalValue: number;
  positions: Position[];
  trades: Trade[];
}

export interface PortfolioSnapshot {
  timestamp: Date;
  totalValue: number;
  cash: number;
  positionsValue: number;
}

export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
