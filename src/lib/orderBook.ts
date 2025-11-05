import { Asset, OrderBookEntry } from "./types";

export interface OrderBook {
  assetId: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastUpdate: Date;
}

const ORDER_BOOK_KEY = 'order_books';
const SPREAD_PERCENT = 0.002; // 0.2% spread

export const generateOrderBook = (asset: Asset): OrderBook => {
  const midPrice = asset.price;
  const spread = midPrice * SPREAD_PERCENT;
  
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  
  // Generate 20 levels of depth
  for (let i = 0; i < 20; i++) {
    const bidPrice = midPrice - spread/2 - (i * midPrice * 0.001);
    const askPrice = midPrice + spread/2 + (i * midPrice * 0.001);
    
    // Randomize quantities with decreasing volume at worse prices
    const bidQuantity = Math.random() * (1000 - i * 40) + 100;
    const askQuantity = Math.random() * (1000 - i * 40) + 100;
    
    bids.push({
      price: bidPrice,
      quantity: bidQuantity,
      total: bidPrice * bidQuantity
    });
    
    asks.push({
      price: askPrice,
      quantity: askQuantity,
      total: askPrice * askQuantity
    });
  }
  
  // Sort bids descending (highest first)
  bids.sort((a, b) => b.price - a.price);
  // Sort asks ascending (lowest first)
  asks.sort((a, b) => a.price - b.price);
  
  return {
    assetId: asset.id,
    bids,
    asks,
    lastUpdate: new Date()
  };
};

export const saveOrderBook = (orderBook: OrderBook) => {
  const stored = getOrderBooks();
  stored[orderBook.assetId] = orderBook;
  localStorage.setItem(ORDER_BOOK_KEY, JSON.stringify(stored));
};

export const getOrderBook = (assetId: string): OrderBook | null => {
  const stored = getOrderBooks();
  const book = stored[assetId];
  if (!book) return null;
  
  return {
    ...book,
    lastUpdate: new Date(book.lastUpdate)
  };
};

export const getOrderBooks = (): Record<string, OrderBook> => {
  const stored = localStorage.getItem(ORDER_BOOK_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const updateOrderBook = (asset: Asset): OrderBook => {
  const existing = getOrderBook(asset.id);
  
  if (existing) {
    // Update prices based on new asset price
    const priceChange = asset.price / existing.bids[0].price;
    
    existing.bids = existing.bids.map(bid => ({
      ...bid,
      price: bid.price * priceChange
    }));
    
    existing.asks = existing.asks.map(ask => ({
      ...ask,
      price: ask.price * priceChange
    }));
    
    existing.lastUpdate = new Date();
    saveOrderBook(existing);
    return existing;
  }
  
  const newBook = generateOrderBook(asset);
  saveOrderBook(newBook);
  return newBook;
};

export const simulateMarketMaker = (orderBook: OrderBook, volatility: number = 0.01): OrderBook => {
  // Market maker adds/removes liquidity randomly
  const updatedBids = orderBook.bids.map(bid => ({
    ...bid,
    quantity: Math.max(50, bid.quantity + (Math.random() - 0.5) * bid.quantity * volatility)
  }));
  
  const updatedAsks = orderBook.asks.map(ask => ({
    ...ask,
    quantity: Math.max(50, ask.quantity + (Math.random() - 0.5) * ask.quantity * volatility)
  }));
  
  return {
    ...orderBook,
    bids: updatedBids,
    asks: updatedAsks,
    lastUpdate: new Date()
  };
};
