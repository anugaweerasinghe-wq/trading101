import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Trade Stocks, Crypto & Forex for Free | Real-Time Trading Simulator — Practice, Learn & Master Trading</title>
        <meta
          name="description"
          content="Start trading stocks, crypto, and forex for free with TradeHQ. Real-time charts, zero risk, and learn technical analysis, risk management & strategies."
        />
        <link rel="canonical" href="https://tradinghq.vercel.app/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        {/* Hero component will display the short homepage title visually */}
        <Hero />
      </div>
    </>
  );
};

export default Index;
