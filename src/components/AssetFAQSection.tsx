import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface AssetFAQSectionProps {
  assetName: string;
  assetSymbol: string;
  faqs: FAQ[];
}

export function AssetFAQSection({ assetName, assetSymbol, faqs }: AssetFAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-8" aria-label="Frequently Asked Questions">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Frequently Asked Questions
        </h3>
      </div>
      
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="border-b border-white/5 last:border-b-0"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-white/5 transition-colors">
                <span className="text-sm font-medium text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
