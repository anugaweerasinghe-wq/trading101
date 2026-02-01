import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  GraduationCap, 
  BookOpen, 
  Bot,
  Cpu,
  Coins,
  LineChart,
  Building2,
  Globe,
  Gem,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Shield,
  Award,
  CheckCircle2
} from "lucide-react";
import tradehqLogo from "@/assets/tradehq-logo.png";

/**
 * MegaFooter - Premium Multi-Column SEO Footer
 * Provides comprehensive internal linking for all asset categories
 * and key pages to maximize crawl budget and link equity.
 */
export function MegaFooter() {
  // Categorized asset links for maximum SEO value
  const assetCategories = {
    crypto: {
      title: "Top Crypto",
      icon: Coins,
      assets: [
        { symbol: "BTC", name: "Bitcoin", path: "/trade/btc" },
        { symbol: "ETH", name: "Ethereum", path: "/trade/eth" },
        { symbol: "SOL", name: "Solana", path: "/trade/sol" },
        { symbol: "XRP", name: "XRP", path: "/trade/xrp" },
        { symbol: "BNB", name: "BNB", path: "/trade/bnb" },
        { symbol: "ADA", name: "Cardano", path: "/trade/ada" },
      ]
    },
    stocks: {
      title: "AI & Tech Stocks",
      icon: Cpu,
      assets: [
        { symbol: "NVDA", name: "NVIDIA", path: "/trade/nvda" },
        { symbol: "MSFT", name: "Microsoft", path: "/trade/msft" },
        { symbol: "GOOGL", name: "Alphabet", path: "/trade/googl" },
        { symbol: "AAPL", name: "Apple", path: "/trade/aapl" },
        { symbol: "META", name: "Meta", path: "/trade/meta" },
        { symbol: "AMZN", name: "Amazon", path: "/trade/amzn" },
      ]
    },
    etfs: {
      title: "Popular ETFs",
      icon: LineChart,
      assets: [
        { symbol: "SPY", name: "S&P 500 ETF", path: "/trade/spy" },
        { symbol: "QQQ", name: "Nasdaq ETF", path: "/trade/qqq" },
        { symbol: "DIA", name: "Dow Jones ETF", path: "/trade/dia" },
        { symbol: "ARKK", name: "ARK Innovation", path: "/trade/arkk" },
      ]
    },
    forex: {
      title: "Forex Pairs",
      icon: Globe,
      assets: [
        { symbol: "EUR/USD", name: "Euro/Dollar", path: "/trade/eurusd" },
        { symbol: "GBP/USD", name: "Pound/Dollar", path: "/trade/gbpusd" },
        { symbol: "USD/JPY", name: "Dollar/Yen", path: "/trade/usdjpy" },
      ]
    },
    commodities: {
      title: "Commodities",
      icon: Gem,
      assets: [
        { symbol: "XAU", name: "Gold", path: "/trade/gold" },
        { symbol: "XAG", name: "Silver", path: "/trade/silver" },
        { symbol: "WTI", name: "Crude Oil", path: "/trade/oil" },
      ]
    }
  };

  const platformLinks = [
    { to: "/trade", label: "Trading Simulator", icon: TrendingUp },
    { to: "/markets", label: "Markets Hub", icon: BarChart3 },
    { to: "/portfolio", label: "Portfolio Tracker", icon: Wallet },
  ];

  const learnLinks = [
    { to: "/learn", label: "All Courses", icon: GraduationCap },
    { to: "/learn-trading-guide", label: "Trading Guide", icon: BookOpen },
    { to: "/ai-mentor", label: "AI Mentor", icon: Bot },
  ];

  return (
    <footer className="border-t border-border/30 bg-[hsl(0_0%_3%)]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Asset Categories Grid */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold text-foreground mb-8 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Trade All Markets
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(assetCategories).map(([key, category]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <category.icon className="w-4 h-4 text-primary" />
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.assets.map((asset) => (
                    <li key={asset.symbol}>
                      <Link
                        to={asset.path}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="font-mono text-xs text-primary/70 group-hover:text-primary">
                          {asset.symbol}
                        </span>
                        <span className="hidden lg:inline text-muted-foreground group-hover:text-foreground">
                          {asset.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 mb-12" />

        {/* Bottom Section - Brand, Platform, Learn, Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img 
                src={tradehqLogo} 
                alt="TradeHQ" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-semibold">
                Trade<span className="text-primary">HQ</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The #1 AI-powered trading simulator for 2026. Practice with $10K virtual capital 
              and master stocks, crypto, forex, and commodities risk-free.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://twitter.com/tradinghq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card/80 border border-border/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-muted-foreground" />
              </a>
              <a 
                href="https://linkedin.com/company/tradinghq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card/80 border border-border/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              </a>
              <a 
                href="https://github.com/tradinghq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card/80 border border-border/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Learn
            </h3>
            <ul className="space-y-3">
              {learnLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Signals */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Trust & Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">100% Risk-Free</p>
                  <p className="text-xs text-muted-foreground">No real money required</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-profit/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-profit" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Expert Reviewed</p>
                  <p className="text-xs text-muted-foreground">Content verified by pros</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">#1 Simulator 2026</p>
                  <p className="text-xs text-muted-foreground">Trusted by 50K+ traders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright, Legal Links & Institutional Disclaimer */}
      <div className="border-t border-border/30 bg-[hsl(0_0%_2%)]">
        <div className="container mx-auto px-6 py-6">
          {/* Legal Links */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
          
          {/* Institutional Disclaimer */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/20 max-w-4xl mx-auto mb-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Strict Institutional Disclaimer:</strong> TradeHQ is a market simulation platform. 
              No real capital is at risk. Not financial advice. Data provided for educational purposes only. 
              Past simulated performance does not guarantee future real-world results. 
              Always consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} TradeHQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
