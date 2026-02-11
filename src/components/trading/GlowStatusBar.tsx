import { useState, useEffect } from "react";
import { Activity, Users, Zap } from "lucide-react";

export function GlowStatusBar() {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [tradesPerMinute, setTradesPerMinute] = useState(89);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => Math.max(1000, prev + Math.floor(Math.random() * 20) - 10));
      setTradesPerMinute(prev => Math.max(50, prev + Math.floor(Math.random() * 30) - 15));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-profit/20 via-primary/20 to-profit/20 blur-xl opacity-50" />
      
      {/* Status Bar */}
      <div className="relative flex items-center justify-center gap-6 py-2 px-4 bg-gradient-to-r from-profit/10 via-transparent to-profit/10 border-b border-profit/20">
        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-profit" />
          </span>
          <span className="text-xs font-medium text-profit uppercase tracking-wider">Live</span>
        </div>

        <div className="h-3 w-px bg-white/10" />

        {/* Active Users */}
        <div className="flex items-center gap-1.5 text-xs">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{activeUsers.toLocaleString()}</span> online
          </span>
        </div>

        <div className="h-3 w-px bg-white/10" />

        {/* Trades Per Minute */}
        <div className="flex items-center gap-1.5 text-xs">
          <Activity className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{tradesPerMinute}</span> trades/min
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs">
          <div className="h-3 w-px bg-white/10 mr-4" />
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-muted-foreground">Simulated Market Data</span>
        </div>
      </div>
    </div>
  );
}
