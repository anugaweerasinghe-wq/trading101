import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";
import { SEOSection } from "@/components/SEOSection";

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: "Information TradeHQ Handles",
      content: `You can use the core simulator without creating an account. TradeHQ nevertheless handles different categories of data depending on the features you choose:

• **Browser-stored simulator data**: portfolio positions, trade history, watchlists, course/streak state and other practice settings are primarily stored in your browser.
• **Optional account data**: if you create an account, the authentication service processes your email or provider identity. TradeHQ can also store your username, country, bio and account identifier.
• **Practice statistics**: signed-in users can sync selected summary statistics used for profile, leaderboard and challenge features. This is not the same as uploading a complete brokerage statement or real-money trading record.
• **Public profile data**: profile information and practice statistics are shown publicly only when the profile is set to public.
• **Reviews and messages**: information you submit in a review or contact form is sent to the service so it can be displayed, moderated or answered. Review abuse controls may store a salted hash derived from network information to limit duplicate submissions.
• **Technical and advertising data**: hosting, security and advertising services can receive technical information such as IP address, browser/device information, request logs, cookies or similar identifiers according to their configuration and your applicable consent choices.

TradeHQ is a virtual-money simulator. It does not require a deposit, payment card or brokerage account to place simulated trades.`
    },
    {
      icon: Lock,
      title: "How Information Is Used",
      content: `TradeHQ uses information to operate the simulator and optional account features, restore or display selected account/profile information, provide community features, prevent abuse, respond to messages, diagnose problems and improve the service.

TradeHQ also loads Google AdSense on the site. Advertising-related processing, cookies and personalization can depend on Google's settings, consent requirements and the user's region. This policy does not claim that all advertising is non-personalized.

TradeHQ uses Amplitude for product analytics and, where enabled, session replay to understand how visitors use the site and improve usability. Session replay may capture interactions such as clicks and navigation, subject to configured masking/privacy controls and applicable consent choices.

TradeHQ does not present the simulator as a bank or brokerage and does not share simulated portfolio data with financial institutions for trade execution.`
    },
    {
      icon: Eye,
      title: "Storage, Visibility & Security",
      content: `**Local browser storage**: core simulator state can remain on the device and can be removed by clearing this site's browser storage.

**Account and community data**: optional authentication/profile information, selected synced statistics, reviews and contact submissions can be stored on TradeHQ's backend or its service providers. Public visibility is controlled separately from whether data is stored.

**Security**: TradeHQ uses hosted infrastructure and access controls intended to protect stored data, but no online service can promise absolute security. Security or privacy claims on this page should be read as descriptions of the current product, not as a certification.`
    },
    {
      icon: Globe,
      title: "Third Parties, Transfers & Your Choices",
      content: `TradeHQ relies on service providers for functions such as hosting, authentication, database services, AI features and advertising. Those providers may process data in countries other than your own under their own legal and contractual frameworks.

Depending on where you live, privacy law may give you rights to access, correct, delete or object to certain processing. The exact rights and legal basis depend on your jurisdiction and the service configuration. TradeHQ does not claim blanket GDPR or CCPA compliance merely because the simulator can be used without an account.

You can use guest mode for core simulator features, avoid publishing a profile, clear browser-stored simulator data, and contact TradeHQ about backend information associated with an account or submission.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | TradeHQ</title>
        <meta name="description" content="TradeHQ privacy policy: browser-stored simulator data, optional account and profile data, reviews, service providers, advertising and user choices." />
        <link rel="canonical" href="https://www.thetradehq.com/privacy" />
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
              Your privacy matters. TradeHQ is committed to protecting your data while providing an educational trading simulation.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: September 30, 2026
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
                <span>Core simulator features can be used without creating an account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>Core portfolio and trade state is primarily stored in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>Optional accounts can store profile information and selected practice statistics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>Reviews, contact messages and advertising services involve server-side or third-party processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>No real-money deposit or brokerage account is required for simulated trading</span>
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
                Use the <a href="/contact" className="text-primary hover:underline">TradeHQ contact form</a> and identify your request as privacy-related.
              </p>
            </div>
          </section>

          <SEOSection
            path="/privacy"
            faqHeading="Privacy"
            breadcrumbs={[{ label: "Privacy Policy" }]}
            faqs={[
              {
                question: "Do I need an account to use TradeHQ?",
                answer:
                  "No. Core simulator features can be used in guest mode. If you choose to sign in, the authentication service processes account information and TradeHQ can store a profile plus selected practice statistics.",
              },
              {
                question: "Where is my simulated portfolio stored?",
                answer:
                  "Core portfolio and trade state is primarily stored in your browser. Optional signed-in community features can sync selected summary statistics, but they are not a complete brokerage or real-money trading record.",
              },
              {
                question: "Does TradeHQ use advertising services?",
                answer:
                  "Yes. TradeHQ loads Google AdSense. Advertising-related cookies, identifiers and personalization depend on Google's configuration, applicable consent choices and region.",
              },
              {
                question: "Is a public profile required?",
                answer:
                  "No. Public profile visibility is optional. A profile must be set to public before its profile information and selected practice statistics are intended to be publicly displayed.",
              },
            ]}
          />
        </main>

        <MegaFooter />
        <MobileBottomNav />
      </div>
    </>
  );
}
