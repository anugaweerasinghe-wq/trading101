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
      content: `Guest mode does not require an account. Practice portfolio data, trade history, journal entries, watchlists, course progress and preferences are primarily stored in your browser.

If you create an optional account, the authentication service stores your email address and account credentials. TradeHQ also stores your chosen public username and may store profile fields such as country or bio together with aggregate simulated statistics used for public profiles, leaderboards and challenges.

If you submit a community review, TradeHQ stores the review, rating and optional display name. The review endpoint also stores a one-way hash derived from the request IP address so duplicate submissions can be limited without storing the raw IP in the reviews table.

If you use an AI feature, the text you submit and the limited simulator context needed for that feature may be sent through TradeHQ's backend to an AI service provider to generate a response.

Hosting, authentication and backend providers may process ordinary technical request data such as IP address, browser information and timestamps for delivery, security and abuse prevention.`
    },
    {
      icon: Lock,
      title: "How Information Is Used",
      content: `TradeHQ uses information to operate optional accounts, sync simulated statistics, display public profiles when applicable, moderate community reviews, provide requested AI features, keep the service secure and diagnose technical problems.

TradeHQ does not collect payment-card or brokerage credentials because it does not execute real-money trades. TradeHQ does not sell personal information.

Public profile information is intentionally visible to other visitors. Do not put private or sensitive information in a public username, bio or review.`
    },
    {
      icon: Eye,
      title: "Local Storage, Retention & Security",
      content: `Guest-mode practice data is stored in browser local storage and can be removed by clearing this site's storage. Optional account, profile and review records are stored on the service backend until they are deleted under the account or moderation features that apply to them.

TradeHQ uses HTTPS and service-provider access controls, but no online service can promise perfect security. Do not reuse an important password on any website.`
    },
    {
      icon: Globe,
      title: "Service Providers, International Processing & Advertising",
      content: `TradeHQ uses third-party infrastructure for hosting, authentication, database functions and optional AI features. Those providers may process data in countries other than your own under their own legal and security obligations.

TradeHQ does not currently depend on a standalone behavioural-analytics SDK in the web application. Hosting and backend services may still create operational logs.

If Google AdSense or another advertising service is enabled in the future, third-party vendors including Google may use cookies or similar storage to serve and measure ads. Google's advertising cookies can be used to serve ads based on visits to this and other sites. Visitors can manage personalized-ad settings through Google's Ads Settings. Where Google requires a certified consent-management platform for EEA, UK or Swiss traffic, TradeHQ will use one before serving applicable personalized ads.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | TradeHQ</title>
        <meta name="description" content="TradeHQ privacy policy: guest storage, optional accounts, public practice profiles, reviews, AI features, service providers and advertising-cookie disclosures." />
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
              Last Updated: September 26, 2026
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
                <span>Guest mode works without an account; optional accounts store account data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>Guest practice data is primarily local; signed-in users can sync aggregate practice statistics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>No payment-card or brokerage credentials are required for the simulator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>Privacy disclosures are kept aligned with the features currently used by TradeHQ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-profit">✓</span>
                <span>TradeHQ does not sell personal information</span>
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
                Use the <a href="/contact" className="underline text-primary">TradeHQ contact page</a> for privacy questions.
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
                  "No. Guest mode works without an account. Optional sign-in is used for features such as public profiles, leaderboards and challenges.",
              },
              {
                question: "What is stored if I create an account?",
                answer:
                  "The authentication service stores your email and account credentials. TradeHQ also stores your public username and may sync aggregate simulated statistics for public-profile and leaderboard features.",
              },
              {
                question: "Does TradeHQ sell personal information?",
                answer:
                  "No. TradeHQ does not sell personal information. It does use third-party infrastructure providers to operate hosting, authentication, backend and optional AI features.",
              },
              {
                question: "What happens if advertising is added?",
                answer:
                  "If Google AdSense or another ad service is enabled, the privacy policy and consent controls will cover the cookies and data processing required by that service and applicable regions.",
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
