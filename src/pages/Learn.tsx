import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Shield, PieChart, LineChart, Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tradingBasics from "@/assets/course-trading-basics.jpg";
import riskManagement from "@/assets/course-risk-management.jpg";
import technicalAnalysis from "@/assets/course-technical-analysis.jpg";
import diversification from "@/assets/course-diversification.jpg";
import goals from "@/assets/course-goals.jpg";
import marketTrends from "@/assets/course-market-trends.jpg";

const lessons = [
  {
    id: 1,
    title: "Getting Started with Trading",
    category: "Basics",
    icon: BookOpen,
    image: tradingBasics,
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
    image: riskManagement,
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
    image: technicalAnalysis,
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
    image: diversification,
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
    image: goals,
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
    image: marketTrends,
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Hero Section */}
          <div className="mb-20 text-center animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Trading Education
            </h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Master the fundamentals and strategies to become a confident trader
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {lessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <Card 
                  key={lesson.id}
                  onClick={() => navigate(`/learn/${lesson.id}`)}
                  className="group cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={lesson.image} 
                      alt={lesson.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    {/* Floating Badge */}
                    <Badge 
                      variant="secondary" 
                      className="absolute top-6 left-6 bg-background/80 backdrop-blur-sm border-0 text-sm px-4 py-1.5"
                    >
                      {lesson.category}
                    </Badge>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                    </div>

                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {lesson.description}
                    </p>

                    {/* Content Preview */}
                    <ul className="space-y-3 mb-6">
                      {lesson.content.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {lesson.content.length > 3 && (
                        <li className="text-sm text-muted-foreground/60 ml-4">
                          +{lesson.content.length - 3} more topics
                        </li>
                      )}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      <span>Start Learning</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <Card className="p-12 bg-gradient-to-br from-primary/5 via-background to-background border-primary/10 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Practice these strategies in the simulator with your $10,000 demo cash. 
                The best way to learn is by doing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="font-bold text-xl">Practice Trading</h3>
                  <p className="text-muted-foreground">
                    Test strategies risk-free with real market data
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl mb-2">🤖</div>
                  <h3 className="font-bold text-xl">AI Advisor</h3>
                  <p className="text-muted-foreground">
                    Get personalized advice from our AI assistant
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl mb-2">📈</div>
                  <h3 className="font-bold text-xl">Track Progress</h3>
                  <p className="text-muted-foreground">
                    Monitor performance and improve over time
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
