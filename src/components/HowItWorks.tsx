import { motion } from "framer-motion";
import { Wallet, ShoppingCart, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Get $10K Virtual Cash Instantly",
    description: "No signup, no credit card. Open TradeHQ and you're ready to trade with $10,000 in virtual money.",
  },
  {
    icon: ShoppingCart,
    title: "Buy Stocks & Crypto at Real Prices",
    description: "Trade 150+ real assets — from Bitcoin and Ethereum to Apple and NVIDIA — with simulated market data.",
  },
  {
    icon: BarChart3,
    title: "Track Your Portfolio & Beat the Leaderboard",
    description: "Monitor your performance, learn from AI mentoring, and compete with other virtual traders.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-[hsl(0_0%_2.5%)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Start Trading in <span className="text-primary">3 Simple Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">Step {i + 1}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
