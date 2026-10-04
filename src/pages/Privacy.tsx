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
      content: `TradeHQ can be used without creating an account. The data handled depends on the features you choose.

• Browser-stored simulator data: practice portfolio positions, trade history, watchlists, course progress, streaks and related settings are primarily stored in your browser.
• Optional account data: if you create an account, Supabase processes authentication data such as your email or provider identity and can store profile fields including username, country and bio.
• Community data: signed-in features can store selected practice statistics, public-profile settings, reviews and duel/challenge records. These are simulated results, not brokerage statements or verified real-money performance.
• Contact messages: the contact page opens your own email client with a pre-filled message. TradeHQ does not send that form directly from the browser.
• Technical data: hosting, authentication, security and abuse-prevention services can receive normal request information such as IP address, browser/device information and server logs.
• Optional analytics and advertising data: after the applicable consent choice, Amplitude may receive analytics/session-replay data and Google AdSense may use cookies or similar identifiers for ad delivery, measurement and, where permitted by the user's choices and region, personalization.

TradeHQ does not require a payment card, bank account or brokerage account to place simulated trades.`
    },
    {
      icon: Lock,
      title: "How Information Is Used",
      content: `TradeHQ uses data only for the feature that needs it: operating the simulator, authenticating optional accounts, showing profile/community features, preventing abuse, responding to messages, diagnosing problems and improving the service.

Amplitude is used for product analytics and may include session replay when analytics consent is granted. This can record interactions such as navigation and clicks subject to the provider's masking and privacy controls.

Google AdSense is the advertising service planned/used on TradeHQ. When advertising is enabled after the required consent flow, Google and its advertising partners may use cookies or similar technologies to deliver and measure ads. Advertising may be personalized or non-personalized depending on consent, location and Google settings.

TradeHQ does not sell simulated portfolio data to brokers or financial institutions and does not execute real-money trades.`
    },
    {
      icon: Eye,
      title: "Storage, Visibility & Retention",
      content: `Browser data remains on the device until the browser, the user or TradeHQ's own reset controls remove it.

Optional account and community data can be stored by Supabase for as long as the related account or feature requires it. Public profile information is shown only when the profile is configured as public.

Analytics and advertising data are retained according to the settings and policies of the relevant provider. TradeHQ does not state a fixed retention period where it cannot verify one.

TradeHQ uses hosted infrastructure and access controls intended to protect stored data, but no online service can guarantee absolute security.`
    },
    {
      icon: Globe,
      title: "Service Providers, Cookies & Your Choices",
      content: `TradeHQ relies on third parties including Vercel for hosting, Supabase for optional authentication/database features, Amplitude for consented analytics/session replay, and Google AdSense for consented advertising. These providers can process data in countries other than your own under their own legal and contractual arrangements.

Non-essential analytics and advertising scripts are blocked until the user has made the applicable consent choice. You can reject optional analytics/advertising, change your choice later from this privacy page, clear browser storage/cookies, and use browser privacy controls. Google also provides ad-personalization controls through Google Ads Settings.

For users in the EEA, United Kingdom and Switzerland, Google requires a Google-certified consent-management platform for AdSense consent collection. AdSense remains disabled in this build until that certified CMP and the confirmed publisher ID are configured.

Depending on where you live, privacy law may give you rights to access, correct, delete, restrict or object to certain processing. Use the TradeHQ contact page for a privacy request. The exact rights available depend on your jurisdiction.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | TradeHQ</title>
        <meta name="description" content="TradeHQ privacy policy covering browser-stored simulator data, optional accounts, analytics, advertising cookies, service providers and user choices." />
        <link rel="canonical" href="https://www.thetradehq.com/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-12 max-w-4xl pb-24 md:pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This policy describes the data flows used by the current TradeHQ website, including optional analytics and advertising.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: October 4, 2026
            </p>
          </div>

          <div className="glass-liquid-card p-6 mb-12">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Privacy at a Glance
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>Core simulator features can be used without creating an account.</span></li>
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>Core portfolio and trade state is primarily stored in your browser.</span></li>
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>Optional accounts and community features can store data with Supabase.</span></li>
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>Amplitude analytics/session replay and Google advertising are optional, consent-dependent services.</span></li>
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>No real-money deposit or brokerage account is required for simulated trading.</span></li>
            </ul>
          </div>

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

          <section className="mt-12 glass-liquid-card p-6">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("tradehq:open-consent"))}
              className="mb-5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
            >
              Change analytics and advertising choices
            </button>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              Contact Us
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              For privacy questions or rights requests, use the contact page and identify the message as privacy-related.
            </p>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-sm">
                <a href="/contact" className="text-primary hover:underline">Contact TradeHQ</a>
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
                answer: "No. Core simulator features work in guest mode. Optional account and community features can store profile information and selected practice statistics.",
              },
              {
                question: "Where is my simulated portfolio stored?",
                answer: "Core portfolio and trade state is primarily stored in your browser. Optional signed-in profile, community and selected practice-stat features can use TradeHQ's backend.",
              },
              {
                question: "Does TradeHQ use analytics or advertising cookies?",
                answer: "Yes, when the applicable consent choice allows them. TradeHQ uses Amplitude for product analytics/session replay and Google AdSense for advertising. These services can use cookies or similar identifiers according to their settings and your consent choices.",
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
