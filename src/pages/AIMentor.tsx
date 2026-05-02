import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, TrendingUp, BookOpen, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { SEOSection } from "@/components/SEOSection";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  { icon: TrendingUp, text: "What is a bull market?" },
  { icon: BookOpen, text: "Explain stop-loss orders" },
  { icon: Shield, text: "How do I manage risk?" },
  { icon: Sparkles, text: "What is dollar-cost averaging?" },
];

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm your AI trading mentor. Ask me anything about stocks, crypto, trading strategies, or market concepts. I'm here to help you learn!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trading-mentor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            // Incomplete JSON, will be handled in next chunk
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
      if (!assistantContent) {
        setMessages(prev => prev.slice(0, -1));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <Helmet>
        <title>AI Trading Mentor — Personalized Trading Coach & Behavioral Analyst | TradeHQ</title>
        <meta name="description" content="Chat with your personal AI trading mentor. Get real-time strategy advice, risk warnings, portfolio analysis, and psychological support to improve your trading." />
        <link rel="canonical" href="https://tradinghq.vercel.app/ai-mentor" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Trading Mentor — Your Personal Trading Coach | TradeHQ" />
        <meta property="og:description" content="Ask anything about trading, risk, psychology, or markets. Powered by advanced AI. Free on TradeHQ." />
        <meta property="og:url" content="https://tradinghq.vercel.app/ai-mentor" />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Trading Mentor — Your Personal Trading Coach | TradeHQ" />
        <meta name="twitter:description" content="Ask anything about trading, risk, psychology, or markets. Powered by advanced AI." />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        <main className="flex-1 pt-24 pb-8 container mx-auto px-4 max-w-4xl flex flex-col">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI Trading Mentor</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Learn Trading with <span className="text-primary">AI</span>
            </h1>
            <p className="text-muted-foreground">
              Ask any trading question — stocks, crypto, strategies, risk management
            </p>
          </div>

          {/* Chat Area */}
          <Card className="flex-1 flex flex-col glass-panel border-white/10 overflow-hidden animate-scale-in">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 animate-fade-in ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted/50 text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                        {isLoading && index === messages.length - 1 && message.role === "assistant" && !message.content && (
                          <span className="inline-flex gap-1 ml-1">
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </span>
                        )}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-secondary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-white/5">
                <p className="text-xs text-muted-foreground mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5 rounded-full hover:bg-primary/10 hover:border-primary/30 transition-all animate-fade-in"
                      style={{ animationDelay: `${i * 100}ms` }}
                      onClick={() => sendMessage(q.text)}
                    >
                      <q.icon className="w-3 h-3" />
                      {q.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about trading, stocks, crypto..."
                  className="flex-1 bg-muted/30 border-white/10 rounded-xl focus:border-primary/50"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="rounded-xl bg-primary hover:bg-primary/90"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>

          {/* Quick Links Footer for SEO */}
          <nav aria-label="Quick navigation" className="mt-8 border-t border-border/50 pt-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Quick Links</h2>
            <div className="flex flex-wrap gap-2">
              <Link to="/" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">Home</Link>
              <Link to="/markets" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">Markets Hub</Link>
              <Link to="/portfolio" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">Portfolio</Link>
              <Link to="/learn" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">Learning Center</Link>
              <Link to="/trade" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">Trade Now</Link>
            </div>
          </nav>

          <SEOSection
            path="/ai-mentor"
            faqHeading="AI Mentor"
            breadcrumbs={[{ label: "AI Mentor" }]}
            faqs={[
              {
                question: "What is the TradeHQ AI Mentor?",
                answer:
                  "An always-on AI trading coach that answers questions about strategies, indicators, market mechanics and trading psychology — tailored to your simulated portfolio. (Educational simulation only — not financial advice.)",
              },
              {
                question: "Can the AI Mentor predict prices?",
                answer:
                  "No. The mentor is built for education — it explains concepts, reviews your trade history and helps you build discipline. It will never give specific buy/sell recommendations or guarantees.",
              },
              {
                question: "Is the AI Mentor free?",
                answer:
                  "Yes — it is included free with every TradeHQ account, no signup or payment required.",
              },
              {
                question: "What questions should I ask?",
                answer:
                  "Try things like: 'Explain stop-loss orders', 'What is dollar-cost averaging?', 'How do I manage risk on a $100K portfolio?', or 'Walk me through a candlestick pattern'.",
              },
            ]}
          />
        </main>
      </div>
    </>
  );
}
