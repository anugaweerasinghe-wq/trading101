import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * PremiumFAQ - Institutional-grade FAQ section
 * Clean, professional layout optimized for SEO
 */
export function PremiumFAQ() {
  const faqs = [
    {
      question: "How does virtual trading work?",
      answer: "Virtual trading on TradeHQ simulates real market conditions using $10,000 in demo cash. You can buy and sell 150+ assets including stocks, crypto, ETFs, and commodities with real-time price simulation. All trades are executed instantly with no real money at risk."
    },
    {
      question: "What is Bitcoin L2?",
      answer: "Bitcoin Layer 2 (L2) refers to secondary protocols built on top of the Bitcoin blockchain to enable faster, cheaper transactions. Popular L2 solutions include the Lightning Network for instant payments and Stacks (STX) for smart contracts."
    },
    {
      question: "Is TradeHQ completely free?",
      answer: "Yes, TradeHQ is 100% free to use. You get $10,000 in virtual capital to practice trading with no signup required. We also provide weekly $10K refills so you can continue learning indefinitely. No hidden fees or premium tiers."
    },
  ];

  return (
    <section className="py-24 bg-[hsl(0_0%_4%)]">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-card/40 border border-border/30">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about TradeHQ
          </p>
        </div>

        {/* FAQ cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={faq.question}
              className="p-6 bg-card/30 border-border/30 rounded-2xl backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {faq.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/trade">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-base rounded-2xl min-h-[56px] font-semibold shadow-glow-cyan"
            >
              Start Free Trading Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
