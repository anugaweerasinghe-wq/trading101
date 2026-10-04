import { Sparkles } from "lucide-react";

interface Props {
  question: string;
  answer: string;
  className?: string;
}

/**
 * Answer-first block for a concise, visible summary of the page's primary query.
 * Structured data is intentionally left to the page-level schema so generic
 * authored summaries are not misrepresented as Q&A or speakable content.
 */
export function AIAnswerBlock({ question, answer, className = "" }: Props) {
  return (
    <div
        className={`ai-answer-block relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-background to-fuchsia-500/5 p-5 md:p-6 ${className}`}
      >
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-400 mb-2">
          <Sparkles className="w-3 h-3" /> Quick answer
        </div>
        <h2 className="text-sm md:text-base font-semibold text-foreground mb-2">{question}</h2>
        <p className="text-sm md:text-[15px] leading-relaxed text-muted-foreground">{answer}</p>
      </div>
  );
}