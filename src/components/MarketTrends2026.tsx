import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Coins, Brain, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const trends = [
  {
    id: "bitcoin-l2",
    title: "Bitcoin Layer 2s",
    subtitle: "Stacks, Lightning Network",
    description: "Bitcoin L2 solutions enable fast, low-cost transactions while inheriting Bitcoin's security. Practice trading STX, Lightning-enabled assets, and explore the future of Bitcoin scalability.",
    icon: Zap,
    badge: "Hot 2026",
    color: "primary",
    stats: [
      { label: "Lightning Capacity", value: "5,500+ BTC" },
      { label: "Stacks TVL", value: "$150M+" },
    ]
  },
  {
    id: "rwa",
    title: "Tokenized Real World Assets",
    subtitle: "RWA Revolution",
    description: "Real World Asset tokenization brings traditional assets on-chain. Trade tokenized treasuries, real estate, and commodities with 24/7 liquidity and fractional ownership.",
    icon: Coins,
    badge: "Trending",
    color: "secondary",
    stats: [
      { label: "RWA Market Cap", value: "$12B+" },
      { label: "Tokenized Treasuries", value: "$2.5B+" },
    ]
  },
  {
    id: "ai-liquidity",
    title: "AI-Driven Liquidity",
    subtitle: "Smart Market Making",
    description: "AI algorithms now power market making and liquidity provision. Learn how machine learning optimizes order flow, reduces slippage, and creates more efficient markets.",
    icon: Brain,
    badge: "Innovation",
    color: "primary",
    stats: [
      { label: "AI Trading Volume", value: "60%+" },
      { label: "Efficiency Gain", value: "3x" },
    ]
  },
];

export function MarketTrends2026() {
  return (
    <section className="py-28 bg-[hsl(0_0%_3%)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/20 text-primary bg-primary/5">
            <TrendingUp className="w-3 h-3 mr-2" />
            Market Intelligence
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
            2026{' '}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, hsl(180 70% 50%), hsl(280 60% 55%))'
            }}>
              Market Trends
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with the investment themes shaping the future of finance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {trends.map((trend, index) => {
            const Icon = trend.icon;
            return (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="group h-full p-8 bg-white/[0.02] backdrop-blur-sm border-white/[0.06] hover:border-primary/20 transition-all duration-500 rounded-2xl"
                  style={{ boxShadow: '0 8px 32px -12px hsl(0 0% 0% / 0.4)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${trend.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${trend.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                      {trend.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {trend.title}
                  </h3>
                  <p className="text-sm text-primary/80 mb-4">{trend.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {trend.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {trend.stats.map((stat) => (
                      <div key={stat.label} className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.04]">
                        <div className="text-base font-bold text-primary tabular-nums">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link to="/learn-trading-guide" className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/trade">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-base rounded-2xl min-h-[60px] font-semibold"
              style={{ boxShadow: '0 0 40px hsl(180 70% 50% / 0.15)' }}
            >
              Start Instant Trading
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
