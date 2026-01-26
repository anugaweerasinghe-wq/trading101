import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: `TradeHQ collects minimal information to provide our trading simulation services:

• **Usage Data**: We collect anonymous usage statistics to improve our platform, including pages visited, features used, and session duration.
• **Local Storage**: Your portfolio, trade history, and preferences are stored locally in your browser. We do not transmit this data to our servers.
• **Device Information**: Basic device information (browser type, operating system) for compatibility and optimization purposes.

We do NOT collect:
• Personal identification information (name, email, phone) unless voluntarily provided
• Payment or financial information (our simulator uses virtual funds only)
• Location data beyond country-level for analytics`
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: `We use the limited information we collect solely to:

• Provide and maintain our trading simulation service
• Improve user experience and platform performance
• Analyze usage patterns to enhance features
• Ensure platform security and prevent abuse

We do NOT:
• Sell your data to third parties
• Use your data for targeted advertising
• Share your information with financial institutions`
    },
    {
      icon: Eye,
      title: "Data Retention & Security",
      content: `**Local Storage**: Your trading data is stored in your browser's local storage. You can clear this data at any time through your browser settings.

**Analytics Data**: Anonymous analytics data is retained for up to 24 months for trend analysis.

**Security Measures**: We implement industry-standard security practices including HTTPS encryption, secure hosting, and regular security audits.`
    },
    {
      icon: Globe,
      title: "International Data Transfers",
      content: `TradeHQ is hosted on global infrastructure. By using our service, you acknowledge that your anonymous usage data may be processed in countries outside your residence.

For users in the European Economic Area (EEA), we comply with GDPR requirements. For California residents, we comply with CCPA requirements.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | TradeHQ — Trading Simulator</title>
        <meta name="description" content="TradeHQ Privacy Policy. Learn how we protect your data and privacy while using our free trading simulator." />
        <link rel="canonical" href="https://tradinghq.vercel.app/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl pb-24 md:pb-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy matters. TradeHQ is committed to protecting your data while providing a world-class trading simulation experience.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: January 26, 2026
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="glass-liquid-card p-6 mb-12">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Privacy at a Glance
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>No personal data collection required — use TradeHQ without signup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>All trading data stored locally in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>No real financial information ever collected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>GDPR and CCPA compliant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>We never sell your data to third parties</span>
              </li>
            </ul>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={index} className="glass-liquid-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  {section.title}
                </h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="mt-12 glass-liquid-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              Contact Us
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
            </p>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-sm">
                <strong>Email:</strong> privacy@tradinghq.com
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                We aim to respond to all privacy inquiries within 48 hours.
              </p>
            </div>
          </section>
        </main>

        <MegaFooter />
        <MobileBottomNav />
      </div>
    </>
  );
}
