import { motion } from "framer-motion";

const items = [
  "Join 5,000+ learners",
  "154 assets available",
  "100% free",
  "No signup required",
  "Real market data",
  "$10K virtual cash",
  "AI mentoring included",
];

export function SocialProofTicker() {
  return (
    <div className="w-full overflow-hidden bg-white/[0.02] border-y border-white/[0.04] py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
