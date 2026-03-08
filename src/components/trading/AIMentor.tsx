import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  TrendingUp,
  Shield,
  Lightbulb,
  Wallet,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, Portfolio, Asset } from "@/lib/types";

interface AIMentorProps {
  portfolio: Portfolio;
  assets: Asset[];
  selectedAsset?: Asset | null;
}

const quickPrompts = [
  { icon: Wallet, text: "My portfolio", prompt: "Show me a full analysis of my portfolio — positions, P&L, and suggestions for improvement." },
  { icon: TrendingUp, text: "Analyze this asset", prompt: "Analyze the current market conditions for the asset I'm viewing right now." },
  { icon: Shield, text: "Risk assessment", prompt: "What's the risk level of my current portfolio? Am I overexposed anywhere?" },
  { icon: BarChart3, text: "Trade history", prompt: "Review my recent trade history and tell me what patterns you see." },
  { icon: Lightbulb, text: "What should I do?", prompt: "Based on my portfolio and current market conditions, what action should I consider next?" },
];

export function AIMentor({ portfolio, assets, selectedAsset }: AIMentorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey! I'm your Neural Trading Mentor. I have full access to your portfolio — ask me about your positions, P&L, win rate, or any trading question. What do you need?",
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

  // Compute portfolio stats for display
  const totalTrades = portfolio.trades.length;
  const sellTrades = portfolio.trades.filter(t => t.type === 'sell');
  const wins = sellTrades.filter((t, _i) => {
    const buys = portfolio.trades.filter(bt => bt.assetId === t.assetId && bt.type === 'buy' && bt.timestamp < t.timestamp);
    if (buys.length === 0) return false;
    return t.price > buys[buys.length - 1].price;
  });
  const winRate = sellTrades.length > 0 ? ((wins.length / sellTrades.length) * 100).toFixed(0) : '—';

  const sendMessage = async (customMessage?: string) => {
    const messageText = customMessage || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trading-advisor`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
      body: JSON.stringify({
            message: messageText,
            portfolio: {
              cash: portfolio.cash,
              totalValue: portfolio.totalValue,
              positions: portfolio.positions.map(p => ({
                asset: { id: p.asset.id, symbol: p.asset.symbol, name: p.asset.name, price: p.asset.price },
                quantity: p.quantity,
                averagePrice: p.avgPrice,
                profitLoss: p.profitLoss,
                profitLossPercent: p.profitLossPercent,
              })),
              trades: portfolio.trades.slice(0, 20).map(t => ({
                type: t.type,
                assetId: t.assetId,
                symbol: t.symbol,
                quantity: t.quantity,
                price: t.price,
                total: t.total,
                timestamp: t.timestamp,
                journal: t.journal,
              })),
            },
            assets: assets.slice(0, 10).map(a => ({ id: a.id, symbol: a.symbol, price: a.price, changePercent: a.changePercent })),
            selectedAsset: selectedAsset ? { id: selectedAsset.id, symbol: selectedAsset.symbol, name: selectedAsset.name, price: selectedAsset.price, changePercent: selectedAsset.changePercent } : null,
            conversationHistory: messages.filter(m => m.id !== '1').map(m => ({ role: m.role, content: m.content })),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        let buffer = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantContent += content;
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === assistantMessage.id 
                        ? { ...msg, content: assistantContent }
                        : msg
                    )
                  );
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an issue. Please try again in a moment.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <Bot className="w-6 h-6" />
        </Button>
      )}

      {/* AI Mentor Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-card bg-card z-50 flex flex-col overflow-hidden border-border animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-sidebar">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Neural Mentor
                  <Badge variant="outline" className="text-2xs">PRO</Badge>
                </h3>
                <p className="text-xs text-muted-foreground">Full portfolio access</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Portfolio Intelligence Bar */}
          <div className="px-4 py-2.5 border-b border-border bg-secondary/20 grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-[9px] text-muted-foreground uppercase">Balance</p>
              <p className="text-[11px] font-bold tabular-nums text-foreground">${(portfolio.totalValue / 1000).toFixed(1)}k</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground uppercase">Cash</p>
              <p className="text-[11px] font-bold tabular-nums text-foreground">${(portfolio.cash / 1000).toFixed(1)}k</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground uppercase">Trades</p>
              <p className="text-[11px] font-bold tabular-nums text-foreground">{totalTrades}</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground uppercase">Win Rate</p>
              <p className="text-[11px] font-bold tabular-nums text-foreground">{winRate}{winRate !== '—' ? '%' : ''}</p>
            </div>
          </div>

          {/* Context Bar */}
          {selectedAsset && (
            <div className="px-4 py-2 border-b border-border bg-secondary/30 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Viewing:</span>
              <Badge variant="secondary" className="text-xs">
                {selectedAsset.symbol}
              </Badge>
              <span className={cn("text-xs font-medium", selectedAsset.changePercent >= 0 ? "text-profit" : "text-loss")}>
                {selectedAsset.changePercent >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%
              </span>
            </div>
          )}

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
                      "px-4 py-3 rounded-xl max-w-[85%]",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-secondary">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Prompts */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Ask me:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="h-auto py-1.5 px-3 text-left"
                    onClick={() => sendMessage(prompt.prompt)}
                  >
                    <prompt.icon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span className="text-xs">{prompt.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
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
                placeholder="Ask about your portfolio..."
                disabled={isLoading}
                className="flex-1 bg-secondary border-0"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-2xs text-muted-foreground mt-2 text-center">
              For educational purposes only. Not financial advice.
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
