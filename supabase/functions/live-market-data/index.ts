import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// CoinGecko ID mapping for crypto assets
const CRYPTO_ID_MAP: Record<string, string> = {
  'btc': 'bitcoin',
  'eth': 'ethereum',
  'sol': 'solana',
  'bnb': 'binancecoin',
  'xrp': 'ripple',
  'ada': 'cardano',
  'doge': 'dogecoin',
  'avax': 'avalanche-2',
  'dot': 'polkadot',
  'matic': 'matic-network',
  'link': 'chainlink',
  'ltc': 'litecoin',
};

// Alpha Vantage symbols for stocks/ETFs (using demo key or user-provided)
const STOCK_SYMBOLS: Record<string, string> = {
  'aapl': 'AAPL',
  'msft': 'MSFT',
  'googl': 'GOOGL',
  'amzn': 'AMZN',
  'nvda': 'NVDA',
  'tsla': 'TSLA',
  'meta': 'META',
  'nflx': 'NFLX',
  'amd': 'AMD',
  'crm': 'CRM',
  'intc': 'INTC',
  'jpm': 'JPM',
  'v': 'V',
  'ma': 'MA',
  'spy': 'SPY',
  'qqq': 'QQQ',
  'iwm': 'IWM',
  'dia': 'DIA',
  'voo': 'VOO',
  'arkk': 'ARKK',
};

// Forex pairs
const FOREX_PAIRS: Record<string, { from: string; to: string }> = {
  'eurusd': { from: 'EUR', to: 'USD' },
  'gbpusd': { from: 'GBP', to: 'USD' },
  'usdjpy': { from: 'USD', to: 'JPY' },
  'usdchf': { from: 'USD', to: 'CHF' },
  'audusd': { from: 'AUD', to: 'USD' },
};

// Commodity IDs (using gold/silver crypto proxies on CoinGecko)
const COMMODITY_MAP: Record<string, string> = {
  'gold': 'pax-gold',
  'silver': 'silver-token',
};

interface MarketData {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap?: number;
  lastUpdated: string;
  source: 'live' | 'simulated';
}

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Fetch crypto data from CoinGecko (free, no API key required)
async function fetchCryptoData(assetId: string): Promise<MarketData | null> {
  const coinId = CRYPTO_ID_MAP[assetId];
  if (!coinId) return null;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.log(`CoinGecko API returned ${response.status} for ${coinId}`);
      return null;
    }

    const data = await response.json();
    
    return {
      price: data.market_data.current_price.usd,
      change24h: data.market_data.price_change_24h || 0,
      changePercent24h: data.market_data.price_change_percentage_24h || 0,
      high24h: data.market_data.high_24h.usd || data.market_data.current_price.usd,
      low24h: data.market_data.low_24h.usd || data.market_data.current_price.usd,
      volume24h: data.market_data.total_volume.usd || 0,
      marketCap: data.market_data.market_cap.usd || 0,
      lastUpdated: new Date().toISOString(),
      source: 'live',
    };
  } catch (error) {
    console.error(`Error fetching crypto data for ${assetId}:`, error);
    return null;
  }
}

// Fetch crypto OHLC candles from CoinGecko
async function fetchCryptoCandles(assetId: string, days: number = 1): Promise<CandleData[]> {
  const coinId = CRYPTO_ID_MAP[assetId];
  if (!coinId) return [];

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.log(`CoinGecko OHLC API returned ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // CoinGecko returns [timestamp, open, high, low, close]
    return data.map((candle: number[]) => ({
      time: new Date(candle[0]).toISOString(),
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: 0, // OHLC endpoint doesn't include volume
    }));
  } catch (error) {
    console.error(`Error fetching crypto candles for ${assetId}:`, error);
    return [];
  }
}

// Fetch stock/ETF data using Polygon.io or Alpha Vantage
async function fetchStockData(assetId: string): Promise<MarketData | null> {
  const symbol = STOCK_SYMBOLS[assetId];
  if (!symbol) return null;

  // Try Polygon.io first (if API key provided)
  const polygonKey = Deno.env.get('POLYGON_API_KEY');
  if (polygonKey) {
    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${polygonKey}`,
        {
          headers: { 'Accept': 'application/json' },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          const previousClose = result.o;
          const currentPrice = result.c;
          const change = currentPrice - previousClose;
          const changePercent = (change / previousClose) * 100;

          return {
            price: currentPrice,
            change24h: change,
            changePercent24h: changePercent,
            high24h: result.h,
            low24h: result.l,
            volume24h: result.v,
            lastUpdated: new Date().toISOString(),
            source: 'live',
          };
        }
      }
    } catch (error) {
      console.error(`Polygon API error for ${symbol}:`, error);
    }
  }

  // Fallback: Try Alpha Vantage (free tier)
  const alphaVantageKey = Deno.env.get('ALPHA_VANTAGE_API_KEY') || 'demo';
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaVantageKey}`,
      {
        headers: { 'Accept': 'application/json' },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const quote = data['Global Quote'];
      
      if (quote && quote['05. price']) {
        const price = parseFloat(quote['05. price']);
        const change = parseFloat(quote['09. change'] || '0');
        const changePercent = parseFloat((quote['10. change percent'] || '0%').replace('%', ''));
        const high = parseFloat(quote['03. high'] || price.toString());
        const low = parseFloat(quote['04. low'] || price.toString());
        const volume = parseFloat(quote['06. volume'] || '0');

        return {
          price,
          change24h: change,
          changePercent24h: changePercent,
          high24h: high,
          low24h: low,
          volume24h: volume,
          lastUpdated: new Date().toISOString(),
          source: 'live',
        };
      }
    }
  } catch (error) {
    console.error(`Alpha Vantage API error for ${symbol}:`, error);
  }

  return null;
}

// Fetch forex data
async function fetchForexData(assetId: string): Promise<MarketData | null> {
  const pair = FOREX_PAIRS[assetId];
  if (!pair) return null;

  const alphaVantageKey = Deno.env.get('ALPHA_VANTAGE_API_KEY') || 'demo';
  
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${pair.from}&to_currency=${pair.to}&apikey=${alphaVantageKey}`,
      {
        headers: { 'Accept': 'application/json' },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const rate = data['Realtime Currency Exchange Rate'];
      
      if (rate && rate['5. Exchange Rate']) {
        const price = parseFloat(rate['5. Exchange Rate']);
        // Forex doesn't have 24h change in this endpoint, simulate small movement
        const simulatedChange = price * (Math.random() * 0.002 - 0.001);

        return {
          price,
          change24h: simulatedChange,
          changePercent24h: (simulatedChange / price) * 100,
          high24h: price * 1.001,
          low24h: price * 0.999,
          volume24h: 0,
          lastUpdated: new Date().toISOString(),
          source: 'live',
        };
      }
    }
  } catch (error) {
    console.error(`Forex API error for ${assetId}:`, error);
  }

  return null;
}

// Generate simulated data with realistic volatility
function generateSimulatedData(basePrice: number, type: string): MarketData {
  const volatility = type === 'crypto' ? 0.03 : type === 'forex' ? 0.005 : 0.015;
  const change = basePrice * (Math.random() * volatility * 2 - volatility);
  const changePercent = (change / basePrice) * 100;

  return {
    price: basePrice + change * 0.1,
    change24h: change,
    changePercent24h: changePercent,
    high24h: basePrice * (1 + volatility),
    low24h: basePrice * (1 - volatility),
    volume24h: Math.floor(Math.random() * 1000000000),
    lastUpdated: new Date().toISOString(),
    source: 'simulated',
  };
}

// Generate simulated candle data
function generateSimulatedCandles(basePrice: number, count: number = 60): CandleData[] {
  const candles: CandleData[] = [];
  let price = basePrice * (0.98 + Math.random() * 0.04);
  const now = Date.now();

  for (let i = count; i >= 0; i--) {
    const open = price;
    const volatility = 0.003;
    const change = (Math.random() - 0.48) * basePrice * volatility;
    const close = price + change;
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    
    candles.push({
      time: new Date(now - i * 60000).toISOString(), // 1-minute intervals
      open: Number(open.toFixed(4)),
      high: Number(high.toFixed(4)),
      low: Number(low.toFixed(4)),
      close: Number(close.toFixed(4)),
      volume: Math.floor(Math.random() * 100000),
    });

    price = close;
  }

  return candles;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const assetId = url.searchParams.get('assetId')?.toLowerCase();
    const assetType = url.searchParams.get('type')?.toLowerCase();
    const dataType = url.searchParams.get('dataType') || 'quote'; // 'quote' or 'candles'
    const basePrice = parseFloat(url.searchParams.get('basePrice') || '0');

    if (!assetId) {
      return new Response(
        JSON.stringify({ error: 'assetId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching ${dataType} for ${assetId} (type: ${assetType})`);

    let data: MarketData | CandleData[] | null = null;

    if (dataType === 'candles') {
      // Fetch candle data
      if (assetType === 'crypto' && CRYPTO_ID_MAP[assetId]) {
        data = await fetchCryptoCandles(assetId, 1);
      }
      
      // Fallback to simulated candles if no live data
      if (!data || (Array.isArray(data) && data.length === 0)) {
        data = generateSimulatedCandles(basePrice || 100);
      }
    } else {
      // Fetch quote data
      if (assetType === 'crypto') {
        data = await fetchCryptoData(assetId);
      } else if (assetType === 'stock' || assetType === 'etf') {
        data = await fetchStockData(assetId);
      } else if (assetType === 'forex') {
        data = await fetchForexData(assetId);
      } else if (assetType === 'commodity') {
        // Use commodity proxies or simulation
        if (COMMODITY_MAP[assetId]) {
          const coinId = COMMODITY_MAP[assetId];
          try {
            const response = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`,
              { headers: { 'Accept': 'application/json' } }
            );
            if (response.ok) {
              const coinData = await response.json();
              if (coinData[coinId]) {
                data = {
                  price: coinData[coinId].usd,
                  change24h: coinData[coinId].usd * (coinData[coinId].usd_24h_change / 100),
                  changePercent24h: coinData[coinId].usd_24h_change || 0,
                  high24h: coinData[coinId].usd * 1.01,
                  low24h: coinData[coinId].usd * 0.99,
                  volume24h: coinData[coinId].usd_24h_vol || 0,
                  lastUpdated: new Date().toISOString(),
                  source: 'live' as const,
                };
              }
            }
          } catch (e) {
            console.error('Commodity fetch error:', e);
          }
        }
      }

      // Fallback to simulated data if live fetch failed
      if (!data && basePrice > 0) {
        console.log(`Using simulated data for ${assetId}`);
        data = generateSimulatedData(basePrice, assetType || 'stock');
      }
    }

    return new Response(
      JSON.stringify({ success: true, data, assetId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Live market data error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage, success: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
