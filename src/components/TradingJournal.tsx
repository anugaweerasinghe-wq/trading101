import { useState } from "react";
import { Trade } from "@/lib/types";
import { getJournalEntries, getEmotionalBreakdown, getAnalysis, JournalAnalysis } from "@/lib/tradingJournal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Sparkles, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TradingJournalProps {
  trades: Trade[];
}

export function TradingJournal({ trades }: TradingJournalProps) {
  const [analysis, setAnalysis] = useState<JournalAnalysis | null>(getAnalysis());
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const journalTrades = getJournalEntries(trades);
  const emotionalBreakdown = getEmotionalBreakdown(trades);

  const analyzeWithAI = async () => {
    setLoading(true);
    // Deterministic rule-based analysis — no AI credits required.
    setTimeout(() => {
      const topEmotion = Object.entries(emotionalBreakdown)
        .sort((a, b) => b[1] - a[1])[0];
      const emotionLabel = topEmotion?.[0] ?? "neutral";
      const totalEntries = journalTrades.length;
      const insights: string[] = [];
      if (emotionLabel === "fear" || emotionLabel === "anxious") {
        insights.push("You journal most often when fearful — this often correlates with exits at local lows. Set rules before entry, not during stress.");
      } else if (emotionLabel === "greed" || emotionLabel === "fomo") {
        insights.push("FOMO/greed is your dominant emotion. Use a 5-minute cool-down rule before any new entry.");
      } else if (emotionLabel === "confident") {
        insights.push("High confidence detected — watch for overconfidence after wins (the recency bias trap).");
      } else {
        insights.push("Balanced emotional spread. Keep journaling — patterns emerge after 30+ entries.");
      }
      if (totalEntries < 10) insights.push(`Only ${totalEntries} journaled trades — log at least 20 for reliable patterns.`);
      const computed: JournalAnalysis = {
        totalTrades: totalEntries,
        emotionalPatterns: Object.entries(emotionalBreakdown).map(([emotion, frequency]) => ({
          emotion,
          winRate: 0,
          avgProfit: 0,
          frequency: frequency as number,
          recommendation: `Logged ${frequency} times`,
        })),
        mostSuccessfulEmotion: emotionLabel,
        leastSuccessfulEmotion: emotionLabel === "fear" ? "fear" : "fomo",
        commonMistakes: insights,
        strengths: ["You're journaling — most traders don't.", "Self-awareness is the first edge."],
        aiInsights: `Across ${totalEntries} journaled trades, your dominant emotion is "${emotionLabel}". ${insights[0]}\n\nRecommendations:\n• Write a 1-line thesis before every entry.\n• Set stop-loss + target *before* placing the trade.\n• Review every Friday — what worked, what didn't.`,
        lastUpdated: new Date(),
      };
      setAnalysis(computed);
      toast({ title: "Analysis Complete", description: "Pattern analysis ready." });
      setLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Trading Journal</h2>
          <p className="text-muted-foreground">
            {journalTrades.length} trades with journal entries
          </p>
        </div>
        <Button onClick={analyzeWithAI} disabled={loading || journalTrades.length === 0} size="lg">
          <Brain className="w-5 h-5 mr-2" />
          {loading ? "Analyzing..." : "AI Analysis"}
        </Button>
      </div>

      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="emotions">Emotions</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-4">
          {journalTrades.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                No journal entries yet. Add notes to your trades to track your psychology!
              </p>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {journalTrades.map((trade) => (
                  <Card key={trade.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{trade.symbol}</h3>
                          <Badge variant={trade.type === 'buy' ? 'default' : 'outline'}>
                            {trade.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(trade.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className={cn(
                        "text-xl font-bold",
                        trade.type === 'buy' ? "text-success" : "text-destructive"
                      )}>
                        ${trade.total.toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Emotions:</p>
                        <div className="flex flex-wrap gap-2">
                          {trade.journal?.emotions.map((emotion, i) => (
                            <Badge key={i} variant="secondary">{emotion}</Badge>
                          ))}
                        </div>
                      </div>

                      {trade.journal?.reasoning && (
                        <div>
                          <p className="text-sm font-medium mb-1">Reasoning:</p>
                          <p className="text-sm text-muted-foreground">{trade.journal.reasoning}</p>
                        </div>
                      )}

                      {trade.journal?.notes && (
                        <div>
                          <p className="text-sm font-medium mb-1">Notes:</p>
                          <p className="text-sm text-muted-foreground">{trade.journal.notes}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="emotions">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Emotional Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(emotionalBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([emotion, count]) => (
                  <div key={emotion} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{emotion}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-64 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(count / journalTrades.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          {!analysis ? (
            <Card className="p-12 text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-4">
                Run AI analysis to get insights on your trading psychology
              </p>
              <Button onClick={analyzeWithAI} disabled={loading || journalTrades.length === 0}>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Now
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                  <h3 className="text-xl font-bold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-success mt-1">✓</span>
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  <h3 className="text-xl font-bold">Common Mistakes</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-destructive mt-1">!</span>
                      <span className="text-muted-foreground">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">AI Insights</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{analysis.aiInsights}</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Emotional Patterns</h3>
                <div className="space-y-4">
                  {analysis.emotionalPatterns.map((pattern, i) => (
                    <div key={i} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{pattern.emotion}</Badge>
                        <span className="text-sm">Win Rate: {pattern.winRate.toFixed(1)}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{pattern.recommendation}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
