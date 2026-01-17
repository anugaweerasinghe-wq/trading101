import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Home, GraduationCap, BookOpen, BarChart3, Bot } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import tradehqLogo from "@/assets/tradehq-logo.png";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            {/* TradeHQ Logo */}
            <img 
              src={tradehqLogo} 
              alt="TradeHQ" 
              className="h-9 w-auto object-contain"
            />
            <span className="text-xl font-semibold">
              Trade<span className="text-primary">HQ</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-muted/50 hover:text-foreground transition-all rounded-xl",
                  location.pathname === "/" && "bg-muted/50 text-primary"
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
                  "hover:bg-muted/50 hover:text-foreground transition-all rounded-xl",
                  location.pathname === "/trade" && "bg-muted/50 text-primary"
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
                  "hover:bg-muted/50 hover:text-foreground transition-all rounded-xl",
                  location.pathname === "/portfolio" && "bg-muted/50 text-primary"
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
                  "hover:bg-muted/50 hover:text-foreground transition-all rounded-xl",
                  location.pathname === "/learn" && "bg-muted/50 text-primary"
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
                  "hover:bg-muted/50 hover:text-foreground transition-all rounded-xl",
                  location.pathname === "/learn-trading-guide" && "bg-muted/50 text-secondary"
                )}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Guide
              </Button>
            </Link>
            <Link to="/ai-mentor">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-muted/50 hover:text-foreground transition-all rounded-xl gap-1.5",
                  location.pathname === "/ai-mentor" && "bg-primary/20 text-primary"
                )}
              >
                <Bot className="w-4 h-4" />
                AI Mentor
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}