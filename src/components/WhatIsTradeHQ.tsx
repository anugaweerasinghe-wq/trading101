import { Link } from "react-router-dom";
import { Zap, TrendingUp, Cpu, DollarSign, BarChart3 } from "lucide-react";

/**
 * WhatIsTradeHQ - AI Overview answerable section for homepage.
 * Targets "What is TradeHQ?" and "free trading simulator 2026" queries.
 */
export function WhatIsTradeHQ() {
  return (
    <section className="py-20 bg-[hsl(0_0%_3.5%)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          What is <span className="text-primary">TradeHQ</span>?
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          TradeHQ is a free trading simulator that gives you $10,000 in virtual capital to practice 
          trading stocks, cryptocurrencies, ETFs, forex, and commodities — all without risking real money. 
          Built for students and beginners, it features simulated market charts, AI-powered mentoring, 
          and 150+ tradeable assets. No signup, no credit card, no hidden fees. Start practicing 
          market strategies in seconds and build confidence before committing real capital.
        </p>

        {/* Asset Categories - crawlable links grouped by type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ASSET_CATEGORIES.map((cat) => (
            <div key={cat.label} className="p-5 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20">
              <cat.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-2">{cat.label}</h3>
              <ul className="space-y-1">
                {cat.assets.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={`/trade/${a.id}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {a.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ASSET_CATEGORIES = [
  {
    label: "Crypto",
    icon: Zap,
    assets: [
      { id: "btc", text: "Practice Bitcoin (BTC)" },
      { id: "eth", text: "Practice Ethereum (ETH)" },
      { id: "sol", text: "Practice Solana (SOL)" },
      { id: "xrp", text: "Simulate XRP Trading" },
    ],
  },
  {
    label: "Tech Stocks",
    icon: Cpu,
    assets: [
      { id: "nvda", text: "NVDA Stock Simulator" },
      { id: "aapl", text: "AAPL Stock Simulator" },
      { id: "msft", text: "MSFT Stock Simulator" },
      { id: "tsla", text: "TSLA Stock Simulator" },
    ],
  },
  {
    label: "Mega-Cap",
    icon: TrendingUp,
    assets: [
      { id: "googl", text: "Practice GOOGL Trading" },
      { id: "amzn", text: "Practice AMZN Trading" },
      { id: "meta", text: "Practice META Trading" },
    ],
  },
  {
    label: "ETFs & Index",
    icon: BarChart3,
    assets: [
      { id: "spy", text: "Paper Trade S&P 500 ETF" },
      { id: "qqq", text: "Paper Trade Nasdaq-100" },
    ],
  },
  {
    label: "Forex & Commodities",
    icon: DollarSign,
    assets: [
      { id: "eurusd", text: "Practice EUR/USD Forex" },
      { id: "gbpusd", text: "Practice GBP/USD Forex" },
      { id: "gold", text: "Simulate Gold Trading" },
      { id: "oil", text: "Simulate Oil Trading" },
    ],
  },
];
