-- Repair public reviews access and cloud leaderboard RPC after the portfolio-cloud migration.
-- Idempotent and safe to re-run.

DO $$
BEGIN
  IF to_regclass('public.reviews') IS NOT NULL THEN
    GRANT SELECT ON public.reviews TO anon, authenticated;

    IF NOT EXISTS (
      SELECT 1
      FROM pg_policies
      WHERE schemaname = 'public'
        AND tablename = 'reviews'
        AND policyname = 'Public can read visible reviews'
    ) THEN
      CREATE POLICY "Public can read visible reviews"
        ON public.reviews
        FOR SELECT
        TO anon, authenticated
        USING (is_visible = true);
    END IF;
  END IF;
END
$$;

DO $$
BEGIN
  IF to_regclass('public.practice_portfolios') IS NOT NULL
     AND to_regclass('public.practice_positions') IS NOT NULL
     AND to_regclass('public.profiles') IS NOT NULL
     AND to_regclass('public.market_prices') IS NOT NULL THEN

    EXECUTE $fn$
      CREATE OR REPLACE FUNCTION public.get_cloud_leaderboard(p_limit integer DEFAULT 100)
      RETURNS TABLE (
        user_id uuid,
        username text,
        country text,
        portfolio_value numeric,
        pnl_pct numeric,
        trades integer,
        priced_at timestamptz
      )
      LANGUAGE sql
      STABLE
      SECURITY DEFINER
      SET search_path = public
      AS $body$
        SELECT
          pf.id,
          pf.username,
          pf.country,
          round(pp.cash + COALESCE(pos.value, 0), 2) AS portfolio_value,
          round(((pp.cash + COALESCE(pos.value, 0)) - 100000) / 100000 * 100, 2) AS pnl_pct,
          pp.trades_count,
          COALESCE(pos.priced_at, pp.updated_at)
        FROM public.practice_portfolios pp
        JOIN public.profiles pf
          ON pf.id = pp.user_id
         AND pf.is_public = true
        LEFT JOIN LATERAL (
          SELECT
            sum(x.quantity * COALESCE(mp.price, x.last_price)) AS value,
            min(COALESCE(mp.updated_at, x.updated_at)) AS priced_at
          FROM public.practice_positions x
          LEFT JOIN public.market_prices mp
            ON mp.asset_id = x.asset_id
          WHERE x.user_id = pp.user_id
        ) pos ON true
        WHERE pp.trades_count >= 5
        ORDER BY 5 DESC
        LIMIT LEAST(GREATEST(p_limit, 1), 500);
      $body$;
    $fn$;

    REVOKE ALL ON FUNCTION public.get_cloud_leaderboard(integer) FROM public;
    GRANT EXECUTE ON FUNCTION public.get_cloud_leaderboard(integer) TO anon, authenticated;
  END IF;
END
$$;
