import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, BarChart3, GraduationCap, BookOpen } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: route not found —", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page not found — TradeHQ</title>
        <meta name="description" content="The page you're looking for doesn't exist on TradeHQ. Head back to the free trading simulator, markets, or learn hub." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://tradinghq.vercel.app${location.pathname}`} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="text-center max-w-lg">
            <div className="text-[92px] leading-none font-black bg-gradient-to-br from-emerald-400 via-primary to-fuchsia-400 bg-clip-text text-transparent">
              404
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
              This page doesn't exist
            </h1>
            <p className="mt-3 text-muted-foreground">
              The link may be broken, the page may have moved, or the ticker you looked up may not be in our practice universe yet.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { to: "/", label: "Home", Icon: Home },
                { to: "/trade", label: "Trade", Icon: BarChart3 },
                { to: "/learn", label: "Learn", Icon: GraduationCap },
                { to: "/wiki/short-squeeze", label: "Wiki", Icon: BookOpen },
              ].map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:border-primary/30 hover:bg-primary/5 transition"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
};

export default NotFound;
