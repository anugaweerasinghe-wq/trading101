import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Shield, PieChart, LineChart, Target } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Getting Started with Trading",
    category: "Basics",
    icon: BookOpen,
    description: "Learn the fundamentals of trading, key terminology, and how markets work.",
    content: [
      "Understanding stocks, ETFs, and other securities",
      "How to read stock quotes and charts",
      "Market orders vs. limit orders",
      "Trading hours and market sessions",
    ]
  },
  {
    id: 2,
    title: "Risk Management",
    category: "Strategy",
    icon: Shield,
    description: "Essential strategies to protect your capital and manage trading risk.",
    content: [
      "Position sizing and the 2% rule",
      "Stop-loss orders and take-profit targets",
      "Understanding risk-reward ratios",
      "Diversification strategies",
    ]
  },
  {
    id: 3,
    title: "Technical Analysis Basics",
    category: "Analysis",
    icon: LineChart,
    description: "Learn to read charts and identify trading opportunities using technical indicators.",
    content: [
      "Candlestick patterns and what they mean",
      "Support and resistance levels",
      "Moving averages (SMA and EMA)",
      "RSI and MACD indicators",
    ]
  },
  {
    id: 4,
    title: "Portfolio Diversification",
    category: "Strategy",
    icon: PieChart,
    description: "Build a balanced portfolio across different asset classes and sectors.",
    content: [
      "Asset allocation strategies",
      "Balancing stocks, ETFs, and crypto",
      "Sector diversification",
      "Rebalancing your portfolio",
    ]
  },
  {
    id: 5,
    title: "Setting Trading Goals",
    category: "Basics",
    icon: Target,
    description: "Define clear objectives and develop a trading plan that works for you.",
    content: [
      "Short-term vs. long-term strategies",
      "Setting realistic profit targets",
      "Creating a trading journal",
      "Evaluating your performance",
    ]
  },
  {
    id: 6,
    title: "Market Trends & Patterns",
    category: "Analysis",
    icon: TrendingUp,
    description: "Identify market trends and learn how to trade with momentum.",
    content: [
      "Bull markets vs. bear markets",
      "Identifying trend reversals",
      "Volume analysis",
      "Market sentiment indicators",
    ]
  },
];

export default function Learn() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Trading Education</h1>
            <p className="text-xl text-muted-foreground">
              Master the fundamentals and strategies to become a confident trader
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <Card 
                  key={lesson.id}
                  className="p-6 hover-lift cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        {lesson.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {lesson.description}
                  </p>

                  <ul className="space-y-2">
                    {lesson.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          {/* Additional Resources */}
          <Card className="mt-12 p-8 bg-gradient-hero">
            <h2 className="text-3xl font-bold mb-4">Keep Learning</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Practice these strategies in the simulator with your $10,000 demo cash. 
              Remember, the best way to learn is by doing!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">📊 Practice Trading</h3>
                <p className="text-sm text-muted-foreground">
                  Test strategies risk-free with real market data
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">🤖 AI Advisor</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized advice from our AI trading assistant
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">📈 Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your performance and improve over time
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
