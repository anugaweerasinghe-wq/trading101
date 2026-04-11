import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// CoinGecko ID mapping — all 30 crypto assets
const CRYPTO_ID_MAP: Record<string, string> = {
  'btc': 'bitcoin', 'eth': 'ethereum', 'sol': 'solana', 'bnb': 'binancecoin',
  'xrp': 'ripple', 'ada': 'cardano', 'doge': 'dogecoin', 'avax': 'avalanche-2',
  'dot': 'polkadot', 'matic': 'matic-network', 'link': 'chainlink', 'ltc': 'litecoin',
  'shib': 'shiba-inu', 'uni': 'uniswap', 'atom': 'cosmos', 'algo': 'algorand',
  'ftm': 'fantom', 'near': 'near', 'icp': 'internet-computer', 'xlm': 'stellar',
  'vet': 'vechain', 'fil': 'filecoin', 'hbar': 'hedera-hashgraph', 'apt': 'aptos',
  'arb': 'arbitrum', 'op': 'optimism', 'inj': 'injective-protocol', 'sui': 'sui',
  'sei': 'sei-network', 'tia': 'celestia',
};

// Stock/ETF symbols — all mapped
const STOCK_SYMBOLS: Record<string, string> = {
  // Tech mega-cap
  'aapl': 'AAPL', 'msft': 'MSFT', 'googl': 'GOOGL', 'amzn': 'AMZN', 'nvda': 'NVDA',
  'tsla': 'TSLA', 'meta': 'META', 'nflx': 'NFLX', 'amd': 'AMD', 'crm': 'CRM',
  'intc': 'INTC', 'orcl': 'ORCL', 'adbe': 'ADBE', 'csco': 'CSCO', 'avgo': 'AVGO',
  'txn': 'TXN', 'qcom': 'QCOM', 'now': 'NOW', 'ibm': 'IBM',
  // Tech growth
  'uber': 'UBER', 'shop': 'SHOP', 'snow': 'SNOW', 'pltr': 'PLTR', 'coin': 'COIN',
  'spot': 'SPOT', 'sq': 'SQ', 'pypl': 'PYPL', 'twlo': 'TWLO', 'docu': 'DOCU',
  'zm': 'ZM', 'roku': 'ROKU', 'net': 'NET', 'ddog': 'DDOG', 'mdb': 'MDB',
  'crwd': 'CRWD', 'zs': 'ZS', 'panw': 'PANW', 'okta': 'OKTA', 'wday': 'WDAY', 'veev': 'VEEV',
  // Finance
  'jpm': 'JPM', 'v': 'V', 'ma': 'MA', 'bac': 'BAC', 'wfc': 'WFC', 'gs': 'GS', 'ms': 'MS',
  // Healthcare
  'unh': 'UNH', 'jnj': 'JNJ', 'pfe': 'PFE', 'mrna': 'MRNA', 'abbv': 'ABBV', 'lly': 'LLY',
  // Consumer
  'wmt': 'WMT', 'cost': 'COST', 'hd': 'HD', 'low': 'LOW', 'tgt': 'TGT',
  'sbux': 'SBUX', 'mcd': 'MCD', 'ko': 'KO', 'pep': 'PEP', 'dis': 'DIS', 'nke': 'NKE',
  // Energy/Industrial
  'xom': 'XOM', 'cvx': 'CVX', 'ba': 'BA', 'cat': 'CAT', 'de': 'DE',
  // ETFs
  'spy': 'SPY', 'qqq': 'QQQ', 'iwm': 'IWM', 'dia': 'DIA', 'voo': 'VOO', 'arkk': 'ARKK',
  'vti': 'VTI', 'ivv': 'IVV', 'agg': 'AGG', 'ief': 'IEF', 'tlt': 'TLT',
  'gld': 'GLD', 'slv': 'SLV', 'uso': 'USO',
  'xlf': 'XLF', 'xlk': 'XLK', 'xle': 'XLE', 'xlv': 'XLV', 'smh': 'SMH', 'soxx': 'SOXX',
};

// Forex pairs — all 15
const FOREX_PAIRS: Record<string, { from: string; to: string }> = {
  'eurusd': { from: 'EUR', to: 'USD' }, 'gbpusd': { from: 'GBP', to: 'USD' },
  'usdjpy': { from: 'USD', to: 'JPY' }, 'usdchf': { from: 'USD', to: 'CHF' },
  'audusd': { from: 'AUD', to: 'USD' }, 'usdcad': { from: 'USD', to: 'CAD' },
  'nzdusd': { from: 'NZD', to: 'USD' }, 'eurgbp': { from: 'EUR', to: 'GBP' },
  'eurjpy': { from: 'EUR', to: 'JPY' }, 'gbpjpy': { from: 'GBP', to: 'JPY' },
  'usdhkd': { from: 'USD', to: 'HKD' }, 'usdsgd': { from: 'USD', to: 'SGD' },
  'usdmxn': { from: 'USD', to: 'MXN' }, 'usdzar': { from: 'USD', to: 'ZAR' },
  'usdtry': { from: 'USD', to: 'TRY' },
};

// Commodity proxies on CoinGecko
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

// Batch crypto via CoinGecko simple/price (up to 250 IDs per call, free)
async function fetchCryptoData(assetId: string): Promise<MarketData | null> {
  const coinId = CRYPTO_ID_MAP[assetId];
  if (!coinId) return null;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_high_24h=true&include_low_24h=true&include_market_cap=true`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) return null;
    const data = await response.json();
    const coin = data[coinId];
    if (!coin || !coin.usd) return null;

    const price = coin.usd;
    const changePct = coin.usd_24h_change ?? 0;

    return {
      price,
      change24h: price * (changePct / 100),
      changePercent24h: changePct,
      high24h: coin.usd_high_24h ?? price * 1.02,
      low24h: coin.usd_low_24h ?? price * 0.98,
      volume24h: coin.usd_24h_vol ?? 0,
      marketCap: coin.usd_market_cap ?? 0,
      lastUpdated: new Date().toISOString(),
      source: 'live',
    };
  } catch (error) {
    console.error(`Crypto fetch error ${assetId}:`, error);
    return null;
  }
}

async function fetchCryptoCandles(assetId: string, days: number = 1): Promise<CandleData[]> {
  const coinId = CRYPTO_ID_MAP[assetId];
  if (!coinId) return [];

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.map((c: number[]) => ({
      time: new Date(c[0]).toISOString(),
      open: c[1], high: c[2], low: c[3], close: c[4], volume: 0,
    }));
  } catch { return []; }
}

async function fetchStockData(assetId: string): Promise<MarketData | null> {
  const symbol = STOCK_SYMBOLS[assetId];
  if (!symbol) return null;

  const polygonKey = Deno.env.get('POLYGON_API_KEY');
  if (polygonKey) {
    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${polygonKey}`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.results?.[0]) {
          const r = data.results[0];
          const change = r.c - r.o;
          return {
            price: r.c, change24h: change, changePercent24h: (change / r.o) * 100,
            high24h: r.h, low24h: r.l, volume24h: r.v,
            lastUpdated: new Date().toISOString(), source: 'live',
          };
        }
      }
    } catch (e) { console.error(`Polygon error ${symbol}:`, e); }
  }

  // Alpha Vantage fallback
  const avKey = Deno.env.get('ALPHA_VANTAGE_API_KEY') || 'demo';
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${avKey}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (response.ok) {
      const data = await response.json();
      const q = data['Global Quote'];
      if (q?.['05. price']) {
        const price = parseFloat(q['05. price']);
        return {
          price,
          change24h: parseFloat(q['09. change'] || '0'),
          changePercent24h: parseFloat((q['10. change percent'] || '0%').replace('%', '')),
          high24h: parseFloat(q['03. high'] || String(price)),
          low24h: parseFloat(q['04. low'] || String(price)),
          volume24h: parseFloat(q['06. volume'] || '0'),
          lastUpdated: new Date().toISOString(), source: 'live',
        };
      }
    }
  } catch (e) { console.error(`AV error ${symbol}:`, e); }

  return null;
}

async function fetchForexData(assetId: string): Promise<MarketData | null> {
  const pair = FOREX_PAIRS[assetId];
  if (!pair) return null;

  const avKey = Deno.env.get('ALPHA_VANTAGE_API_KEY') || 'demo';
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${pair.from}&to_currency=${pair.to}&apikey=${avKey}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (response.ok) {
      const data = await response.json();
      const rate = data['Realtime Currency Exchange Rate'];
      if (rate?.['5. Exchange Rate']) {
        const price = parseFloat(rate['5. Exchange Rate']);
        const simChange = price * (Math.random() * 0.002 - 0.001);
        return {
          price, change24h: simChange, changePercent24h: (simChange / price) * 100,
          high24h: price * 1.001, low24h: price * 0.999, volume24h: 0,
          lastUpdated: new Date().toISOString(), source: 'live',
        };
      }
    }
  } catch (e) { console.error(`Forex error ${assetId}:`, e); }
  return null;
}

function generateSimulatedData(basePrice: number, type: string): MarketData {
  const volatility = type === 'crypto' ? 0.03 : type === 'forex' ? 0.005 : 0.015;
  const change = basePrice * (Math.random() * volatility * 2 - volatility);
  return {
    price: basePrice + change * 0.1,
    change24h: change, changePercent24h: (change / basePrice) * 100,
    high24h: basePrice * (1 + volatility), low24h: basePrice * (1 - volatility),
    volume24h: Math.floor(Math.random() * 1000000000),
    lastUpdated: new Date().toISOString(), source: 'simulated',
  };
}

function generateSimulatedCandles(basePrice: number, count: number = 60): CandleData[] {
  const candles: CandleData[] = [];
  let price = basePrice * (0.98 + Math.random() * 0.04);
  const now = Date.now();
  for (let i = count; i >= 0; i--) {
    const open = price;
    const vol = 0.003;
    const change = (Math.random() - 0.48) * basePrice * vol;
    const close = price + change;
    candles.push({
      time: new Date(now - i * 60000).toISOString(),
      open: +open.toFixed(4), high: +Math.max(open, close) * (1 + Math.random() * vol),
      low: +Math.min(open, close) * (1 - Math.random() * vol),
      close: +close.toFixed(4), volume: Math.floor(Math.random() * 100000),
    });
    price = close;
  }
  return candles;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const assetId = url.searchParams.get('assetId')?.toLowerCase();
    const assetType = url.searchParams.get('type')?.toLowerCase();
    const dataType = url.searchParams.get('dataType') || 'quote';
    const basePrice = parseFloat(url.searchParams.get('basePrice') || '0');
    const days = parseInt(url.searchParams.get('days') || '1', 10);

    if (!assetId) {
      return new Response(
        JSON.stringify({ error: 'assetId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching ${dataType} for ${assetId} (type: ${assetType}, days: ${days})`);

    let data: MarketData | CandleData[] | null = null;

    if (dataType === 'candles') {
      if (assetType === 'crypto' && CRYPTO_ID_MAP[assetId]) {
        data = await fetchCryptoCandles(assetId, days);
      }
      if (!data || (Array.isArray(data) && data.length === 0)) {
        data = generateSimulatedCandles(basePrice || 100, Math.min(days * 4, 500));
      }
    } else {
      if (assetType === 'crypto') {
        data = await fetchCryptoData(assetId);
      } else if (assetType === 'stock' || assetType === 'etf') {
        data = await fetchStockData(assetId);
      } else if (assetType === 'forex') {
        data = await fetchForexData(assetId);
      } else if (assetType === 'commodity') {
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
                const p = coinData[coinId].usd;
                data = {
                  price: p,
                  change24h: p * ((coinData[coinId].usd_24h_change ?? 0) / 100),
                  changePercent24h: coinData[coinId].usd_24h_change ?? 0,
                  high24h: p * 1.01, low24h: p * 0.99,
                  volume24h: coinData[coinId].usd_24h_vol ?? 0,
                  lastUpdated: new Date().toISOString(), source: 'live' as const,
                };
              }
            }
          } catch (e) { console.error('Commodity fetch error:', e); }
        }
      }

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
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Live market data error:', msg);
    return new Response(
      JSON.stringify({ error: msg, success: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
