import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TradeHQ — Free Stock, Crypto & Forex Simulator</title>
        <meta
          name="description"
          content="Practice trading stocks, crypto, and forex with $100K virtual cash. Real charts, zero risk, learn technical analysis & risk management."
        />
        <link rel="canonical" href="https://tradinghq.vercel.app/" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
      </div>
    </>
  );
};

export default Index;
