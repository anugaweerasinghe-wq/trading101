export type OrderType = 'market' | 'limit' | 'stop-loss';
export type OrderStatus = 'pending' | 'filled' | 'cancelled' | 'expired';

export interface Order {
  id: string;
  assetId: string;
  symbol: string;
  type: OrderType;
  side: 'buy' | 'sell';
  quantity: number;
  price?: number; // Limit price or stop price
  status: OrderStatus;
  createdAt: Date;
  filledAt?: Date;
  currentPrice?: number;
}

const ORDERS_KEY = 'tradesandbox_orders';

export function getOrders(): Order[] {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored).map((o: any) => ({
    ...o,
    createdAt: new Date(o.createdAt),
    filledAt: o.filledAt ? new Date(o.filledAt) : undefined,
  })) : [];
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createOrder(
  assetId: string,
  symbol: string,
  type: OrderType,
  side: 'buy' | 'sell',
  quantity: number,
  price?: number
): Order {
  return {
    id: crypto.randomUUID(),
    assetId,
    symbol,
    type,
    side,
    quantity,
    price,
    status: type === 'market' ? 'filled' : 'pending',
    createdAt: new Date(),
    filledAt: type === 'market' ? new Date() : undefined,
  };
}

export function addOrder(order: Order): Order[] {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
  return orders;
}

export function updateOrderStatus(orderId: string, status: OrderStatus, filledAt?: Date): Order[] {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    if (filledAt) order.filledAt = filledAt;
    saveOrders(orders);
  }
  return orders;
}

export function cancelOrder(orderId: string): Order[] {
  return updateOrderStatus(orderId, 'cancelled');
}

export function checkAndFillOrders(currentPrice: number, assetId: string): Order[] {
  const orders = getOrders();
  const pendingOrders = orders.filter(o => o.assetId === assetId && o.status === 'pending');
  
  let updated = false;
  pendingOrders.forEach(order => {
    if (order.type === 'limit' && order.price) {
      // Buy limit: fill when price drops to or below limit
      // Sell limit: fill when price rises to or above limit
      if ((order.side === 'buy' && currentPrice <= order.price) ||
          (order.side === 'sell' && currentPrice >= order.price)) {
        order.status = 'filled';
        order.filledAt = new Date();
        updated = true;
      }
    } else if (order.type === 'stop-loss' && order.price) {
      // Stop-loss: trigger when price drops to or below stop price
      if (currentPrice <= order.price) {
        order.status = 'filled';
        order.filledAt = new Date();
        updated = true;
      }
    }
  });
  
  if (updated) {
    saveOrders(orders);
  }
  
  return orders;
}
