import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, Portfolio, Asset } from "@/lib/types";
import { getPortfolioAIReply } from "@/lib/smartMentor";

interface AIAssistantProps {
  portfolio: Portfolio;
  assets: Asset[];
}

export function AIAssistant({ portfolio, assets }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your educational trading mentor. I can use your simulated portfolio context to explain positions, P&L and risk concepts.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages(prev => [...prev, userMessage]);
    const text = input;
    setInput("");
    setIsLoading(true);

    const sellTrades = portfolio.trades.filter((t) => t.type === "sell");
    const wins = sellTrades.filter((t) => {
      const buys = portfolio.trades.filter(
        (bt) => bt.assetId === t.assetId && bt.type === "buy" && bt.timestamp < t.timestamp,
      );
      return buys.length > 0 && t.price > buys[buys.length - 1].price;
    });
    const winRate = sellTrades.length ? (wins.length / sellTrades.length) * 100 : null;
    const topPosition = portfolio.positions
      .map((p) => ({
        symbol: p.asset.symbol,
        weightPct: (p.currentValue / Math.max(portfolio.totalValue, 1)) * 100,
        pnlPct: p.profitLossPercent ?? 0,
      }))
      .sort((a, b) => b.weightPct - a.weightPct)[0] ?? null;
    const heldIds = new Set(portfolio.positions.map((p) => p.asset.id));
    const heldMarketMove = assets
      .filter((a) => heldIds.has(a.id))
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))[0] ?? null;

    const reply = await getPortfolioAIReply(text, {
      cash: portfolio.cash,
      totalValue: portfolio.totalValue,
      positionsCount: portfolio.positions.length,
      tradesCount: portfolio.trades.length,
      winRate,
      topPosition,
      selectedSymbol: heldMarketMove?.symbol ?? null,
      selectedChangePct: heldMarketMove?.changePercent ?? null,
    }, history);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-gold bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <Bot className="w-7 h-7" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-luxury bg-card z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Smart Trading Advisor</h3>
                <p className="text-xs text-muted-foreground">Curated knowledge engine</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-4 py-2 rounded-lg max-w-[80%]",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about trading strategies..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}
