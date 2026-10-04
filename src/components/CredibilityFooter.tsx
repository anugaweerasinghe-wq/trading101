import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  Twitter, 
  Linkedin, 
  Github,
  Star,
  Users,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

export function CredibilityFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6 py-16">
        {/* Feature Highlights */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">150+</p>
            <p className="text-sm text-muted-foreground">Tradeable Assets</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-profit/20 flex items-center justify-center">
              <Star className="w-8 h-8 text-profit" />
            </div>
            <p className="text-3xl font-bold mb-1">$100K</p>
            <p className="text-sm text-muted-foreground">Virtual Cash</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">25+</p>
            <p className="text-sm text-muted-foreground">Trading Courses</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-profit/20 flex items-center justify-center">
              <Award className="w-8 h-8 text-profit" />
            </div>
            <p className="text-3xl font-bold mb-1">Free</p>
            <p className="text-sm text-muted-foreground">Forever — No Signup</p>
          </div>
        </div>

        {/* Team Section */}
        <Card className="p-8 bg-card/50 border-border mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-primary-foreground">TH</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold">TradeHQ Team</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our content covers stock trading, crypto, forex, and risk management strategies. 
                All simulations use virtual capital — no real money is at risk. This platform is for educational purposes only.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-muted-foreground">Connect with us:</span>
                <a 
                  href="https://twitter.com/tradinghq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                </a>
                <a 
                  href="https://linkedin.com/company/tradinghq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0077B5]/10 flex items-center justify-center hover:bg-[#0077B5]/20 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-[#0077B5]" />
                </a>
                <a 
                  href="https://github.com/tradinghq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                  aria-label="View our GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Links Grid */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">TH</span>
              </div>
              <span className="text-2xl font-bold font-serif">TradingHQ</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              A financial education hub with simulator-based practice and guided learning. Practice trading with our 
              risk-free $100K simulator and master the markets with guided learning.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} TradingHQ. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/trade" className="hover:text-primary transition-colors">Trading Simulator</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio Tracker</Link></li>
              <li><Link to="/markets" className="hover:text-primary transition-colors">Markets</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learn" className="hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link to="/learn-trading-guide" className="hover:text-primary transition-colors">Beginner's Guide</Link></li>
              <li><Link to="/learn-trading-guide" className="hover:text-primary transition-colors">Learning Guide</Link></li>
              <li><Link to="/courses/trading-psychology-mastery" className="hover:text-primary transition-colors">Trading Psychology</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Learning Topics</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/wiki" className="hover:text-primary transition-colors">Trading Glossary</Link></li>
              <li><Link to="/markets" className="hover:text-primary transition-colors">Market Guides</Link></li>
              <li><Link to="/ai-mentor" className="hover:text-primary transition-colors">AI Mentor</Link></li>
              <li><Link to="/learn-trading-guide" className="hover:text-primary transition-colors">Market Learning Guide</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory disclaimer */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> TradeHQ is a simulator for educational purposes only. No real money is at risk. 
            Past performance in a simulation does not guarantee future real-world results. This platform does not provide 
            financial, investment, or trading advice. Trading involves substantial risk of loss and is not suitable for 
            all investors. Always conduct your own research and consult a licensed financial professional before making 
            investment decisions. © {new Date().getFullYear()} TradeHQ.
          </p>
        </div>
      </div>
    </footer>
  );
}
