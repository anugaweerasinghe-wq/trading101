import { Trade, JournalEntry } from "./types";

const JOURNAL_STORAGE_KEY = 'trading_journal_analysis';

export interface TradingPattern {
  emotion: string;
  winRate: number;
  avgProfit: number;
  frequency: number;
  recommendation: string;
}

export interface JournalAnalysis {
  totalTrades: number;
  emotionalPatterns: TradingPattern[];
  mostSuccessfulEmotion: string;
  leastSuccessfulEmotion: string;
  commonMistakes: string[];
  strengths: string[];
  aiInsights: string;
  lastUpdated: Date;
}

export const saveJournalToTrade = (trade: Trade, journal: JournalEntry): Trade => {
  return {
    ...trade,
    journal
  };
};

export const getJournalEntries = (trades: Trade[]): Trade[] => {
  return trades.filter(t => t.journal);
};

export const getEmotionalBreakdown = (trades: Trade[]): Record<string, number> => {
  const breakdown: Record<string, number> = {};
  trades.forEach(trade => {
    if (trade.journal?.emotions) {
      trade.journal.emotions.forEach(emotion => {
        breakdown[emotion] = (breakdown[emotion] || 0) + 1;
      });
    }
  });
  return breakdown;
};

export const saveAnalysis = (analysis: JournalAnalysis) => {
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(analysis));
};

export const getAnalysis = (): JournalAnalysis | null => {
  const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
  if (!stored) return null;
  
  const parsed = JSON.parse(stored);
  return {
    ...parsed,
    lastUpdated: new Date(parsed.lastUpdated)
  };
};

export const AVAILABLE_EMOTIONS = [
  'Confident',
  'Anxious',
  'FOMO',
  'Greedy',
  'Fearful',
  'Excited',
  'Calm',
  'Stressed',
  'Impulsive',
  'Rational'
];
