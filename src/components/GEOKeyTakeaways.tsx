import { Asset } from "@/lib/types";
import { getAssetContent } from "@/lib/assetContent";
import { Lightbulb } from "lucide-react";

interface GEOKeyTakeawaysProps {
  asset: Asset;
}

/**
 * GEO (Generative Engine Optimization) Key Takeaways block.
 * Provides concise, factual, 3-bullet summaries for AI Overviews / LLM crawlers.
 * Neutral language, no advice, clearly labeled as educational.
 */
export function GEOKeyTakeaways({ asset }: GEOKeyTakeawaysProps) {
  const content = getAssetContent(asset.id);

  const definition = getDefinitionBullet(asset, content);
  const influencers = getInfluencersBullet(asset, content);
  const simulatorValue = getSimulatorBullet(asset);
  const studentPerspective = getStudentPerspective(asset);

  return (
    <section
      className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-xl p-4 mb-4"
      aria-label={`Key takeaways about ${asset.name}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-foreground">
          Key Takeaways — {asset.symbol}
        </h2>
      </div>

      <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-none">
        <li className="flex items-start gap-2">
          <span className="text-primary font-bold mt-0.5" aria-hidden="true">•</span>
          <span>{definition}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary font-bold mt-0.5" aria-hidden="true">•</span>
          <span>{influencers}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary font-bold mt-0.5" aria-hidden="true">•</span>
          <span>{simulatorValue}</span>
        </li>
      </ul>

      <p className="text-xs text-muted-foreground/70 mt-3 italic">
        {studentPerspective}
      </p>

      <p className="text-[10px] text-muted-foreground/50 mt-2 italic">
        (Educational simulation only — not financial advice.)
      </p>
    </section>
  );
}

function getDefinitionBullet(asset: Asset, content: ReturnType<typeof getAssetContent>): string {
  const firstSentence = content.whatIs.split('. ')[0];
  return `${asset.name} (${asset.symbol}) — ${firstSentence}.`;
}

function getInfluencersBullet(asset: Asset, content: ReturnType<typeof getAssetContent>): string {
  const driver = content.stats?.primaryDriver;
  const sector = content.stats?.sector;
  const benchmark = content.stats?.benchmark;

  if (driver) {
    return `Primary market driver: ${driver}. ${sector ? `Sector: ${sector}.` : ''} Price influenced by macroeconomic conditions and sector-specific catalysts.`;
  }
  if (benchmark) {
    return `Benchmark: ${benchmark}. Price driven by supply-demand dynamics and macroeconomic conditions.`;
  }
  if (asset.type === 'crypto') {
    return `Cryptocurrency influenced by network adoption, regulatory developments, and broader digital asset sentiment.`;
  }
  if (asset.type === 'forex') {
    return `Currency pair driven by central bank policy divergence, interest rate differentials, and macroeconomic data.`;
  }
  return `Price influenced by sector-specific catalysts and broader market conditions.`;
}

function getSimulatorBullet(asset: Asset): string {
  return `TradeHQ lets you practice ${asset.symbol} trading with $10,000 virtual capital, simulated charts, and AI mentoring — no signup or real money required.`;
}

function getStudentPerspective(asset: Asset): string {
  const assetLabel = asset.type === 'crypto' ? 'crypto' : asset.type === 'forex' ? 'forex' : 'stock';
  return `Student perspective: Practice ${asset.symbol} ${assetLabel} trading as a beginner in Colombo or anywhere — build skills risk-free before committing real capital.`;
}
