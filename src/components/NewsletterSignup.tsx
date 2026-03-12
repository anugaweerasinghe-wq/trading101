import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!EMAIL_REGEX.test(email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({ email: email.trim().toLowerCase(), source: 'footer_form' });

      if (error) {
        if (error.code === '23505') {
          toast({ title: "Already Subscribed", description: "This email is already on our list." });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "✅ Welcome to Institutional Insights",
          description: "You'll receive market analysis directly to your inbox.",
        });
      }
    } catch {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--profit)/0.1)] border border-[hsl(var(--profit)/0.2)]">
        <CheckCircle2 className="w-5 h-5 text-profit flex-shrink-0" />
        <p className="text-sm font-medium text-foreground">You're in. Institutional Insights incoming.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-4 h-4 text-[hsl(var(--neon))]" />
        <span className="text-sm font-semibold text-foreground">Institutional Insights</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Weekly market analysis, macro trends, and actionable trade setups — zero spam.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 h-9 px-3 rounded-lg text-sm bg-[hsl(var(--input))] border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-9 px-4 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1"
        >
          {isSubmitting ? '...' : <><ArrowRight className="w-3.5 h-3.5" /> Join</>}
        </button>
      </div>
    </form>
  );
}
