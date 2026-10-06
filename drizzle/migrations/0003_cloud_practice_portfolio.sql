CREATE TABLE public.practice_portfolios (
  user_id uuid PRIMARY KEY,
  cash numeric NOT NULL DEFAULT 100000 CHECK (cash >= 0 AND cash < 1e12),
  trades_count integer NOT NULL DEFAULT 0 CHECK (trades_count >= 0),
  realized_pnl numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.practice_portfolios TO authenticated;
GRANT ALL ON public.practice_portfolios TO service_role;
ALTER TABLE public.practice_portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read portfolio" ON public.practice_portfolios FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners insert portfolio" ON public.practice_portfolios FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update portfolio" ON public.practice_portfolios FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_practice_portfolios_updated_at BEFORE UPDATE ON public.practice_portfolios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.practice_positions (
  user_id uuid NOT NULL,
  asset_id text NOT NULL CHECK (asset_id ~ '^[a-z0-9-]{1,20}$'),
  symbol text NOT NULL CHECK (length(symbol) BETWEEN 1 AND 20),
  asset_type text NOT NULL CHECK (asset_type IN ('stock','etf','crypto','commodity','forex')),
  quantity numeric NOT NULL CHECK (quantity > 0),
  avg_price numeric NOT NULL CHECK (avg_price > 0),
  last_price numeric NOT NULL CHECK (last_price > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, asset_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_positions TO authenticated;
GRANT ALL ON public.practice_positions TO service_role;
ALTER TABLE public.practice_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read positions" ON public.practice_positions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners insert positions" ON public.practice_positions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update positions" ON public.practice_positions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners delete positions" ON public.practice_positions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_practice_positions_updated_at BEFORE UPDATE ON public.practice_positions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Shared price cache written only by the market-data function (service role).
CREATE TABLE public.market_prices (
  asset_id text PRIMARY KEY,
  price numeric NOT NULL CHECK (price > 0),
  source text NOT NULL DEFAULT 'provider',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.market_prices TO anon, authenticated;
GRANT ALL ON public.market_prices TO service_role;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prices are public" ON public.market_prices FOR SELECT TO anon, authenticated USING (true);

-- Public ranking: exposes only username, country and computed practice figures.
CREATE OR REPLACE FUNCTION public.get_cloud_leaderboard(p_limit integer DEFAULT 100)
RETURNS TABLE (user_id uuid, username text, country text, portfolio_value numeric, pnl_pct numeric, trades integer, priced_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT pf.id, pf.username, pf.country,
         round(pp.cash + COALESCE(pos.value, 0), 2) AS portfolio_value,
         round(((pp.cash + COALESCE(pos.value, 0)) - 100000) / 100000 * 100, 2) AS pnl_pct,
         pp.trades_count,
         COALESCE(pos.priced_at, pp.updated_at)
  FROM public.practice_portfolios pp
  JOIN public.profiles pf ON pf.id = pp.user_id AND pf.is_public = true
  LEFT JOIN LATERAL (
    SELECT sum(x.quantity * COALESCE(mp.price, x.last_price)) AS value,
           min(COALESCE(mp.updated_at, x.updated_at)) AS priced_at
    FROM public.practice_positions x
    LEFT JOIN public.market_prices mp ON mp.asset_id = x.asset_id
    WHERE x.user_id = pp.user_id
  ) pos ON true
  WHERE pp.trades_count >= 5
  ORDER BY 5 DESC
  LIMIT LEAST(GREATEST(p_limit, 1), 500);
$$;
REVOKE ALL ON FUNCTION public.get_cloud_leaderboard(integer) FROM public;
GRANT EXECUTE ON FUNCTION public.get_cloud_leaderboard(integer) TO anon, authenticated;