import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Home, GraduationCap, BookOpen, BarChart3, Bot, Menu, X, Star, Info } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { StreakBadge } from "@/components/badges/StreakBadge";

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/trade", label: "Trade", icon: BarChart3 },
    { to: "/portfolio", label: "Portfolio", icon: BookOpen },
    { to: "/learn", label: "Learn", icon: GraduationCap },
    { to: "/leaderboard", label: "Leaderboard", icon: Wallet },
    { to: "/ai-mentor", label: "AI Mentor", icon: Bot },
    { to: "/reviews", label: "Reviews", icon: Star },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-[hsl(0_0%_2%)/90] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_-10px_hsl(0_0%_0%/0.5)]"
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group active:scale-[0.97] transition-transform" aria-label="TradeHQ home">
            <BrandMark size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 px-4 text-sm font-medium rounded-xl transition-all duration-300",
                    location.pathname === item.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                  )}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="ml-2 pl-2 border-l border-white/[0.06]">
              <StreakBadge className="mr-2" />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <StreakBadge />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-white/[0.06] mt-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-11 px-4 text-sm font-medium rounded-xl transition-all",
                      location.pathname === item.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
