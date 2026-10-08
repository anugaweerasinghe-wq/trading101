import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";
import { SEOSection } from "@/components/SEOSection";
import { AdvertisingPrivacyChoices } from "@/components/AdvertisingPrivacyChoices";

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: "Information TradeHQ Handles",
      content: `TradeHQ can be used without creating an account. The data handled depends on the features you choose.

• Guest simulator data: practice cash, positions and trade history are stored in your browser. Watchlists, journal entries, course progress, streaks and related settings also remain browser-stored.
• Signed-in portfolio data: Supabase stores account cash, positions and server-recorded practice orders, including asset, quantity, execution price, fees, time and simulated result. These account records restore across devices when the service is available. A first-time browser import stores cash and positions as an unranked portfolio; earlier guest trade history stays in its original browser. Starting a fresh ranked practice cycle archives the previous account snapshot privately. Journals and course progress remain browser-held.
• Optional account data: if you create an account, Supabase processes authentication data such as your email or provider identity and can store profile fields including username, country and bio.
• Community data: signed-in features can store selected practice statistics, public-profile settings, reviews and duel/challenge records. These are simulated results, not brokerage statements or verified real-money performance.
• Review interactions: likes are stored with your account ID and the review ID to enforce one like per account. Public pages show totals, not individual liker identities. Owner replies are public. Reviews removed from public view remain in the private admin panel for restoration.
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

Google AdSense provides advertising and regional advertising privacy choices. Ad delivery depends on Google's site approval and settings. Google and its advertising partners may use cookies or similar technologies to deliver and measure ads, subject to the applicable privacy choices. Advertising may be personalized, non-personalized or limited depending on consent, location and Google settings.

TradeHQ does not sell simulated portfolio data to brokers or financial institutions and does not execute real-money trades.`
    },
    {
      icon: Eye,
      title: "Storage, Visibility & Retention",
      content: `Browser data remains on the device until the browser, the user or TradeHQ's own reset controls remove it. Clearing browser data removes local records; it does not delete a signed-in portfolio already stored in Supabase.

Optional account and community data can be stored by Supabase for as long as the related account or feature requires it. New accounts start with a public profile: the chosen username, profile fields and selected simulated statistics can be visible on public pages. You can make your profile private at any time from your profile page.

Analytics and advertising data are retained according to the settings and policies of the relevant provider. TradeHQ does not state a fixed retention period where it cannot verify one.

TradeHQ uses hosted infrastructure and access controls intended to protect stored data, but no online service can guarantee absolute security.`
    },
    {
      icon: Shield,
      title: "Age and Optional Features",
      content: `The core simulator works without an account. The optional account flow does not ask for age, so TradeHQ does not determine a visitor's age from that form.

Public profiles and community features can publish the information and simulated statistics you choose to share. Avoid including private or sensitive information in public fields. A parent or guardian can use the contact page to raise a privacy concern involving a young user.

An advertising consent choice alone does not determine age or replace age-specific advertising protections where they apply.`
    },
    {
      icon: Globe,
      title: "Service Providers, Cookies & Your Choices",
      content: `TradeHQ relies on third parties including Vercel for hosting, Supabase for optional authentication/database features, Amplitude for consented analytics/session replay, and Google AdSense for consented advertising. These providers can process data in countries other than your own under their own legal and contractual arrangements.

Optional Amplitude analytics scripts are blocked until you accept analytics. You can reject analytics and change that choice later from this privacy page. Analytics acceptance does not grant advertising consent.

TradeHQ uses Google's consent-management platform for advertising choices in the EEA, United Kingdom and Switzerland. The Google message lets you consent, decline or manage individual options. When it applies, use Advertising privacy choices on this page or in the footer to change or withdraw your decision.

In supported US states, Google's Do Not Sell or Share My Personal Information link lets you opt out of the sale or sharing of personal information for advertising. Google applies restricted data processing to applicable opt-out requests. These regional messages manage Google's advertising partners; optional Amplitude analytics are controlled separately.

You can also clear browser storage/cookies, use browser privacy controls and manage ad personalization through Google Ads Settings. Google's partner list in the message describes the vendors and purposes covered by your advertising choices.

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
              Last Updated: October 8, 2026
            </p>
          </div>

          <div className="glass-liquid-card p-6 mb-12">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Privacy at a Glance
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>Core simulator features can be used without creating an account.</span></li>
              <li className="flex items-start gap-2"><span className="text-profit">✓</span><span>Guest portfolios stay in your browser; account cash, positions and server-recorded trades restore from Supabase.</span></li>
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
            <AdvertisingPrivacyChoices className="mb-5 mr-3 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted" />
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("tradehq:open-consent"))}
              className="mb-5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
            >
              Change analytics choices
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
                answer: "Guest portfolios are stored in your browser. Account cash, positions and server-recorded trades are stored with Supabase and restore across devices when available. Earlier guest history, journals and course progress remain browser-held.",
              },
              {
                question: "Does TradeHQ use analytics or advertising cookies?",
                answer: "Amplitude analytics/session replay can use cookies or similar identifiers after analytics consent. Google provides separate regional advertising privacy messages and controls. You can change analytics choices here and use Advertising privacy choices when Google's European message applies, or its Do Not Sell or Share link in supported US states.",
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
