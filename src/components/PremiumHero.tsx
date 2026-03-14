import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, TrendingUp, Shield, Zap, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * PremiumHero - $100M-tier hero section
 * Deep-space blacks, glassmorphism, neon-glow accents
 */
export function PremiumHero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-[hsl(0_0%_2%)]" />

      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 10% 20%, hsl(180 100% 50% / 0.07) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 90% 80%, hsl(280 80% 60% / 0.05) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 50% 50%, hsl(152 60% 42% / 0.03) 0%, transparent 70%)
            `
          }}
        />
      </div>

      {/* Floating grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(180 70% 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(180 70% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.06, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(0_0%_2%)] to-transparent" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl pt-24">
        {/* Live status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-profit" />
            </span>
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Simulator Active • 150+ Markets
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[1.05] tracking-[-0.03em]"
        >
          <span className="text-foreground">Practice Trading. Risk-Free.</span>
          <br />
          <span className="text-transparent bg-clip-text" style={{
            backgroundImage: 'linear-gradient(135deg, hsl(180 70% 50%) 0%, hsl(152 60% 50%) 50%, hsl(280 60% 55%) 100%)'
          }}>
            Start with $10,000 Virtual Cash.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-normal leading-relaxed"
        >
          Trade stocks, crypto, forex & commodities with <span className="text-foreground font-medium">$10,000 virtual capital</span>. 
          Real charts. Zero risk. Build strategies that work — before you invest a single dollar.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link to="/trade">
            <Button
              size="lg"
              className="group relative text-base px-12 py-7 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 rounded-2xl min-h-[60px] font-semibold overflow-hidden"
              style={{ boxShadow: '0 0 40px hsl(180 70% 50% / 0.2), 0 0 80px hsl(180 70% 50% / 0.1)' }}
            >
              <span className="relative z-10 flex items-center">
                Start Trading — It's Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link to="/ai-mentor">
            <Button
              size="lg"
              variant="outline"
              className="text-base px-10 py-7 bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300 rounded-2xl min-h-[60px] backdrop-blur-xl"
            >
              <Brain className="mr-2 w-5 h-5" />
              AI Trading Mentor
            </Button>
          </Link>
        </motion.div>

        {/* Sub-CTA text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground/60 mb-16"
        >
          No signup required · No credit card · Instant access
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          {[
            { label: 'Tradeable Assets', value: '150+', icon: TrendingUp, glow: 'hsl(180 70% 50% / 0.1)' },
            { label: 'Virtual Capital', value: '$10K', icon: Shield, glow: 'hsl(152 60% 42% / 0.1)' },
            { label: 'AI Mentoring', value: 'Free', icon: Sparkles, glow: 'hsl(280 60% 55% / 0.1)' },
            { label: 'Weekly Refill', value: '$10K', icon: Zap, glow: 'hsl(38 75% 50% / 0.1)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl hover:border-primary/20 transition-all duration-500"
              style={{ boxShadow: `0 8px 32px -8px ${stat.glow}` }}
            >
              <stat.icon className="w-5 h-5 text-primary mb-3 mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 tabular-nums">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
