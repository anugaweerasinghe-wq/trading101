import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Home, GraduationCap, BookOpen, Zap, BarChart3 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            {/* TradeHQ Logo - Lightning bolt integrated into H */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-lg transition-all" />
              <div className="relative flex items-center justify-center text-primary font-black text-xl glow-cyan">
                <span className="text-primary">H</span>
                <Zap className="w-4 h-4 text-primary absolute -right-1 -top-1" />
              </div>
            </div>
            <span className="text-xl font-bold text-glow-cyan">
              Trade<span className="text-primary">HQ</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-primary/10 hover:text-primary transition-all",
                  location.pathname === "/" && "bg-primary/10 text-primary glow-cyan"
                )}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/trade">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-primary/10 hover:text-primary transition-all",
                  location.pathname === "/trade" && "bg-primary/10 text-primary glow-cyan"
                )}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Trade
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-primary/10 hover:text-primary transition-all",
                  location.pathname === "/portfolio" && "bg-primary/10 text-primary glow-cyan"
                )}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Portfolio
              </Button>
            </Link>
            <Link to="/learn">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-primary/10 hover:text-primary transition-all",
                  location.pathname === "/learn" && "bg-primary/10 text-primary glow-cyan"
                )}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Learn
              </Button>
            </Link>
            <Link to="/learn-trading-guide">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-secondary/10 hover:text-secondary transition-all",
                  location.pathname === "/learn-trading-guide" && "bg-secondary/10 text-secondary glow-purple"
                )}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Guide
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}