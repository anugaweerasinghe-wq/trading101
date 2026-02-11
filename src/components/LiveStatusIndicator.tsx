import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Zap, TrendingUp } from "lucide-react";

export function LiveStatusIndicator() {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [tradesPerMinute, setTradesPerMinute] = useState(89);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live activity with realistic fluctuations
      setActiveUsers(prev => prev + Math.floor(Math.random() * 20) - 10);
      setTradesPerMinute(prev => Math.max(50, prev + Math.floor(Math.random() * 30) - 15));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-muted/30 border-b border-border/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-4">
            {/* Live Status */}
            <Badge 
              variant="outline" 
              className="bg-green-500/10 border-green-500/30 text-green-500 gap-2 animate-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              LIVE
            </Badge>

            {/* Active Users */}
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{activeUsers.toLocaleString()}</span> traders online
              </span>
            </div>

            {/* Trades Per Minute */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{tradesPerMinute}</span> trades/min
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Market Status */}
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Simulated Market Data</span>
            </div>

            {/* Session Indicator */}
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 gap-1.5">
              <TrendingUp className="w-3 h-3" />
              24/7 Markets
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
