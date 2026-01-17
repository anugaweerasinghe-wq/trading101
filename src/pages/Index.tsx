import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <>
      <Helmet>
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
