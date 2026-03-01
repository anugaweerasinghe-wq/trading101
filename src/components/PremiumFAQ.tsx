import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * PremiumFAQ - Breathtaking FAQ with accordion
 */
export function PremiumFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does virtual trading work?",
      answer: "Virtual trading on TradeHQ simulates market conditions using $10,000 in demo cash. You can buy and sell 150+ assets including stocks, crypto, ETFs, and commodities with simulated price data. All trades are executed instantly with no real money at risk."
    },
    {
      question: "What is Bitcoin L2?",
      answer: "Bitcoin Layer 2 (L2) refers to secondary protocols built on top of the Bitcoin blockchain to enable faster, cheaper transactions. Popular L2 solutions include the Lightning Network for instant payments and Stacks (STX) for smart contracts."
    },
    {
      question: "Is TradeHQ completely free?",
      answer: "Yes, TradeHQ is 100% free to use. You get $10,000 in virtual capital to practice trading with no signup required. We also provide weekly $10K refills so you can continue learning indefinitely. No hidden fees or premium tiers."
    },
    {
      question: "Can I practice trading without any experience?",
      answer: "Absolutely. TradeHQ is designed for complete beginners. Our AI mentor guides you through your first trades, explains chart patterns, and teaches risk management — all in plain language. Start practicing in seconds."
    },
    {
      question: "What markets can I trade on TradeHQ?",
      answer: "You can practice trading across 150+ assets including major cryptocurrencies (BTC, ETH, SOL), tech stocks (NVDA, AAPL, TSLA), ETFs (SPY, QQQ), forex pairs (EUR/USD, GBP/USD), and commodities (Gold, Oil)."
    },
  ];

  return (
    <section className="py-28 bg-[hsl(0_0%_2.5%)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Support
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
            Frequently Asked{' '}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about TradeHQ
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`} />
                </div>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground leading-relaxed mt-4 pr-8"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link to="/trade">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-base rounded-2xl min-h-[60px] font-semibold"
              style={{ boxShadow: '0 0 40px hsl(180 70% 50% / 0.15)' }}
            >
              Start Free Trading Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
