import { Helmet } from "react-helmet-async";
import { Sparkles } from "lucide-react";

interface Props {
  question: string;
  answer: string;
  className?: string;
}

/**
 * Answer-first block optimized for LLM answer engines
 * (ChatGPT, Gemini, Perplexity, Google AI Overviews).
 *
 * Renders a plain-English 40-70 word direct answer to the page's
 * primary query, and emits SpeakableSpecification + Question JSON-LD
 * so voice assistants and LLM crawlers can lift it verbatim.
 */
export function AIAnswerBlock({ question, answer, className = "" }: Props) {
  const speakable = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".ai-answer-block"],
    },
  };
  const qa = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(speakable)}</script>
        <script type="application/ld+json">{JSON.stringify(qa)}</script>
      </Helmet>
      <div
        className={`ai-answer-block relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-background to-fuchsia-500/5 p-5 md:p-6 ${className}`}
      >
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-400 mb-2">
          <Sparkles className="w-3 h-3" /> Quick answer
        </div>
        <h2 className="text-sm md:text-base font-semibold text-foreground mb-2">{question}</h2>
        <p className="text-sm md:text-[15px] leading-relaxed text-muted-foreground">{answer}</p>
      </div>
    </>
  );
}