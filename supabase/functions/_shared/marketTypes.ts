export interface DataProvenance { status: 'realtime' | 'delayed' | 'previous_close' | 'proxy' | 'mixed' | 'simulated' | 'provider'; provider: string; fetchedAt: string; observedAt?: string | null; fields?: Record<string,string>; note?: string; }
export interface MarketData { price: number; change24h: number | null; changePercent24h: number | null; high24h: number | null; low24h: number | null; volume24h: number | null; marketCap?: number; lastUpdated: string | null; source: 'live' | 'simulated'; provenance: DataProvenance; }

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

