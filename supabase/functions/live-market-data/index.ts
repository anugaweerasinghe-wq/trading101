import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { allow, clientIp } from "../_shared/rateLimit.ts";
import { coinQuote, stockQuote, forexQuote } from "../_shared/providerQuotes.ts";
import { cachePrice } from "../_shared/priceCache.ts";

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

type MarketData = NonNullable<ReturnType<typeof coinQuote>>;
type DataProvenance = MarketData['provenance'];

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
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true&include_market_cap=true`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) return null;
    const data = await response.json();
    const coin = data[coinId];
    if (!coin || !coin.usd) return null;

    return coinQuote(coin);
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
          return stockQuote(r, 'Polygon');
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
        return stockQuote(q, 'Alpha Vantage');
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
        return forexQuote(rate);
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
    provenance: {
      status: 'simulated',
      provider: 'TradeHQ simulation',
      fetchedAt: new Date().toISOString(),
    },
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

const ALLOWED_DATA_TYPES = new Set(['quote', 'candles']);
const ALLOWED_TYPES = new Set(['crypto', 'stock', 'etf', 'forex', 'commodity', 'index']);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  const bad = (msg: string, status = 400) =>
    new Response(JSON.stringify({ error: msg }), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  try {
    const url = new URL(req.url);
    if (url.search.length > 300) return bad('Request too large', 413);

    // Public proxy abuse protection: per-IP burst + per-minute limits (pseudonymised).
    const ip = clientIp(req);
    const okBurst = await allow(`ip:${ip}`, 'lmd-burst', 10, 25);
    const okMin = okBurst && await allow(`ip:${ip}`, 'lmd-min', 60, 90);
    if (!okBurst || !okMin) return bad('Too many requests — please slow down.', 429);

    const assetId = url.searchParams.get('assetId')?.toLowerCase();
    const assetType = url.searchParams.get('type')?.toLowerCase();
    const dataType = url.searchParams.get('dataType') || 'quote';
    const basePriceRaw = parseFloat(url.searchParams.get('basePrice') || '0');
    const basePrice = Number.isFinite(basePriceRaw) && basePriceRaw >= 0 && basePriceRaw < 1e9 ? basePriceRaw : 0;
    const daysRaw = parseInt(url.searchParams.get('days') || '1', 10);
    const days = Number.isFinite(daysRaw) ? Math.min(Math.max(daysRaw, 1), 365) : 1;

    if (!assetId || !/^[a-z0-9-]{1,20}$/.test(assetId)) return bad('Valid assetId is required');
    if (!ALLOWED_DATA_TYPES.has(dataType)) return bad('Unsupported dataType');
    if (assetType && !ALLOWED_TYPES.has(assetType)) return bad('Unsupported type');

    console.log(`Fetching ${dataType} for ${assetId} (type: ${assetType}, days: ${days})`);

    let data: MarketData | CandleData[] | null = null;
    let candleProvenance: DataProvenance | null = null;

    if (dataType === 'candles') {
      if (assetType === 'crypto' && CRYPTO_ID_MAP[assetId]) {
        data = await fetchCryptoCandles(assetId, days);
        if (Array.isArray(data) && data.length > 0) {
          candleProvenance = {
            status: 'provider',
            provider: 'CoinGecko OHLC',
            fetchedAt: new Date().toISOString(),
            note: 'Historical provider candles; interval depends on provider range rules.',
          };
        }
      }
      if (!data || (Array.isArray(data) && data.length === 0)) {
        data = generateSimulatedCandles(basePrice || 100, Math.min(days * 4, 500));
        candleProvenance = {
          status: 'simulated',
          provider: 'TradeHQ simulation',
          fetchedAt: new Date().toISOString(),
        };
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
              `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true&include_last_updated_at=true`,
              { headers: { 'Accept': 'application/json' } }
            );
            if (response.ok) {
              const coinData = await response.json();
              if (coinData[coinId]) {
                data = coinQuote(coinData[coinId], true);
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

    if (dataType !== 'candles' && data && !Array.isArray(data) && data.source === 'live' && data.provenance.status !== 'proxy') {
      await cachePrice(assetId, data.price, data.provenance?.provider ?? 'provider', data.provenance.observedAt ?? null);
    }



    return new Response(
      JSON.stringify({
        success: true,
        data,
        assetId,
        provenance: dataType === 'candles'
          ? candleProvenance
          : (!Array.isArray(data) ? data?.provenance ?? null : null),
      }),
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
