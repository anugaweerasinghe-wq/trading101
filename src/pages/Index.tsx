import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TradingHQ | The Ultimate AI-Powered Trading Simulator & Journal</title>
        <meta
          name="description"
          content="Master the markets with TradingHQ. Practice trading Crypto, Stocks, and Forex with real-time data, AI-driven mentorship, and an automated trading journal. Start your legacy today."
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
