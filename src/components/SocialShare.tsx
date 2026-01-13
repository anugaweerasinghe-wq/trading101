import { Button } from "@/components/ui/button";
import { Twitter, Share2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  variant?: "default" | "compact";
}

export function SocialShare({ 
  title = "I'm learning to trade on TradingHQ!",
  description = "Master trading with a risk-free $10K simulator",
  url = "https://tradinghq.vercel.app/learn-trading-guide",
  variant = "default"
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareText = `${title} 📈\n\n${description}\n\n🔗 ${url}\n\n#TradingEducation #LearnToTrade #Investing2026`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share it with your friends",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleTwitterShare}
          className="gap-2"
        >
          <Twitter className="w-4 h-4" />
          Tweet
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopyLink}
          className="gap-2"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-profit" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <Button
        onClick={handleTwitterShare}
        className="gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
      >
        <Twitter className="w-5 h-5" />
        Share on Twitter
      </Button>
      <Button
        variant="outline"
        onClick={handleNativeShare}
        className="gap-2"
      >
        <Share2 className="w-5 h-5" />
        Share
      </Button>
      <Button
        variant="ghost"
        onClick={handleCopyLink}
        className="gap-2"
      >
        {copied ? <CheckCircle2 className="w-5 h-5 text-profit" /> : <Copy className="w-5 h-5" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
