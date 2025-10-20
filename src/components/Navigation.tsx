import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-serif">TradeSandbox</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button
                variant="ghost"
                className={cn(
                  location.pathname === "/" && "bg-primary/10 text-primary"
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
                  location.pathname === "/trade" && "bg-primary/10 text-primary"
                )}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trade
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="ghost"
                className={cn(
                  location.pathname === "/portfolio" && "bg-primary/10 text-primary"
                )}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
