import { Asset, AssetType } from './types';

export const INITIAL_CASH = 100000; // $100,000 starting balance

export const ASSETS: Asset[] = [
  // Major Cryptocurrencies
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    price: 43250.00,
    change: 1250.00,
    changePercent: 2.98,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    price: 2580.50,
    change: 85.20,
    changePercent: 3.41,
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    type: 'crypto',
    price: 98.45,
    change: 5.80,
    changePercent: 6.26,
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    type: 'crypto',
    price: 312.80,
    change: -8.50,
    changePercent: -2.65,
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'XRP',
    type: 'crypto',
    price: 0.6245,
    change: 0.0285,
    changePercent: 4.78,
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    type: 'crypto',
    price: 0.5820,
    change: -0.0180,
    changePercent: -3.00,
  },
  {
    id: 'doge',
    symbol: 'DOGE',
    name: 'Dogecoin',
    type: 'crypto',
    price: 0.0825,
    change: 0.0045,
    changePercent: 5.77,
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    type: 'crypto',
    price: 38.90,
    change: 2.15,
    changePercent: 5.85,
  },
  {
    id: 'dot',
    symbol: 'DOT',
    name: 'Polkadot',
    type: 'crypto',
    price: 7.85,
    change: -0.22,
    changePercent: -2.73,
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    type: 'crypto',
    price: 0.8950,
    change: 0.0420,
    changePercent: 4.92,
  },
  {
    id: 'link',
    symbol: 'LINK',
    name: 'Chainlink',
    type: 'crypto',
    price: 14.85,
    change: 0.65,
    changePercent: 4.58,
  },
  {
    id: 'ltc',
    symbol: 'LTC',
    name: 'Litecoin',
    type: 'crypto',
    price: 72.40,
    change: -1.80,
    changePercent: -2.43,
  },
  // Tech Stocks
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    price: 185.92,
    change: 2.45,
    changePercent: 1.34,
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    price: 378.91,
    change: 4.82,
    changePercent: 1.29,
  },
  {
    id: 'googl',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    price: 141.80,
    change: 1.95,
    changePercent: 1.39,
  },
  {
    id: 'amzn',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'stock',
    price: 178.25,
    change: -2.15,
    changePercent: -1.19,
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    price: 495.22,
    change: 12.80,
    changePercent: 2.65,
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    price: 248.50,
    change: -5.30,
    changePercent: -2.09,
  },
  {
    id: 'meta',
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    type: 'stock',
    price: 505.95,
    change: 8.45,
    changePercent: 1.70,
  },
  {
    id: 'nflx',
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    type: 'stock',
    price: 485.60,
    change: -3.20,
    changePercent: -0.65,
  },
  {
    id: 'amd',
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    type: 'stock',
    price: 142.30,
    change: 3.85,
    changePercent: 2.78,
  },
  {
    id: 'crm',
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    type: 'stock',
    price: 264.90,
    change: 4.50,
    changePercent: 1.73,
  },
  {
    id: 'intc',
    symbol: 'INTC',
    name: 'Intel Corporation',
    type: 'stock',
    price: 43.25,
    change: -0.75,
    changePercent: -1.70,
  },
  // Financial Stocks
  {
    id: 'jpm',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    type: 'stock',
    price: 172.45,
    change: 1.85,
    changePercent: 1.08,
  },
  {
    id: 'v',
    symbol: 'V',
    name: 'Visa Inc.',
    type: 'stock',
    price: 275.80,
    change: 2.15,
    changePercent: 0.79,
  },
  {
    id: 'ma',
    symbol: 'MA',
    name: 'Mastercard Incorporated',
    type: 'stock',
    price: 452.30,
    change: 3.80,
    changePercent: 0.85,
  },
  // ETFs
  {
    id: 'spy',
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF',
    type: 'etf',
    price: 478.25,
    change: 2.85,
    changePercent: 0.60,
  },
  {
    id: 'qqq',
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    type: 'etf',
    price: 405.90,
    change: 4.20,
    changePercent: 1.05,
  },
  {
    id: 'iwm',
    symbol: 'IWM',
    name: 'iShares Russell 2000 ETF',
    type: 'etf',
    price: 198.45,
    change: -1.20,
    changePercent: -0.60,
  },
  {
    id: 'dia',
    symbol: 'DIA',
    name: 'SPDR Dow Jones ETF',
    type: 'etf',
    price: 378.60,
    change: 1.45,
    changePercent: 0.38,
  },
  {
    id: 'voo',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    type: 'etf',
    price: 439.80,
    change: 2.60,
    changePercent: 0.59,
  },
  {
    id: 'arkk',
    symbol: 'ARKK',
    name: 'ARK Innovation ETF',
    type: 'etf',
    price: 48.25,
    change: 1.85,
    changePercent: 3.99,
  },
  // Forex
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    type: 'forex',
    price: 1.0892,
    change: 0.0024,
    changePercent: 0.22,
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    type: 'forex',
    price: 1.2685,
    change: -0.0018,
    changePercent: -0.14,
  },
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    type: 'forex',
    price: 148.52,
    change: 0.45,
    changePercent: 0.30,
  },
  {
    id: 'usdchf',
    symbol: 'USD/CHF',
    name: 'US Dollar / Swiss Franc',
    type: 'forex',
    price: 0.8745,
    change: -0.0012,
    changePercent: -0.14,
  },
  {
    id: 'audusd',
    symbol: 'AUD/USD',
    name: 'Australian Dollar / US Dollar',
    type: 'forex',
    price: 0.6582,
    change: 0.0035,
    changePercent: 0.53,
  },
  // Commodities
  {
    id: 'gold',
    symbol: 'XAU',
    name: 'Gold',
    type: 'commodity',
    price: 2024.50,
    change: 12.80,
    changePercent: 0.64,
  },
  {
    id: 'silver',
    symbol: 'XAG',
    name: 'Silver',
    type: 'commodity',
    price: 23.45,
    change: 0.28,
    changePercent: 1.21,
  },
  {
    id: 'oil',
    symbol: 'WTI',
    name: 'Crude Oil WTI',
    type: 'commodity',
    price: 78.25,
    change: -1.45,
    changePercent: -1.82,
  },
  {
    id: 'natgas',
    symbol: 'NG',
    name: 'Natural Gas',
    type: 'commodity',
    price: 2.85,
    change: 0.08,
    changePercent: 2.89,
  },
  {
    id: 'copper',
    symbol: 'HG',
    name: 'Copper',
    type: 'commodity',
    price: 3.82,
    change: 0.04,
    changePercent: 1.06,
  },
];

// Get asset icon based on type
export function getAssetIcon(type: Asset['type']): string {
  switch (type) {
    case 'crypto':
      return '₿';
    case 'stock':
      return '📈';
    case 'etf':
      return '📊';
    case 'forex':
      return '💱';
    case 'commodity':
      return '🏆';
    default:
      return '💰';
  }
}

// Format price based on asset type
export function formatPrice(price: number, type: Asset['type']): string {
  if (type === 'forex') {
    return price.toFixed(4);
  }
  if (price < 1) {
    return price.toFixed(4);
  }
  if (price < 100) {
    return price.toFixed(2);
  }
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
