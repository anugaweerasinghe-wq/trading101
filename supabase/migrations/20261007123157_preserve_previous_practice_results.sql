-- Preserve existing reported summaries once. No user portfolio or ranked score is changed.
CREATE TABLE tradehq_private.previous_practice_results (
 user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
 portfolio_value numeric NOT NULL, pnl_pct numeric NOT NULL, trades integer NOT NULL,
 reported_at timestamptz NOT NULL, captured_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
ALTER TABLE tradehq_private.previous_practice_results ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON tradehq_private.previous_practice_results FROM PUBLIC,anon,authenticated;
GRANT SELECT ON tradehq_private.previous_practice_results TO service_role;
CREATE POLICY "Service reads previous result snapshots" ON tradehq_private.previous_practice_results
 FOR SELECT TO service_role USING (true);
INSERT INTO tradehq_private.previous_practice_results(user_id,portfolio_value,pnl_pct,trades,reported_at)
 SELECT s.user_id,s.portfolio_value,s.pnl_pct,s.trades,s.updated_at
 FROM public.trader_stats s JOIN public.profiles p ON p.id=s.user_id;

CREATE FUNCTION tradehq_private.previous_results(p_limit integer)
 RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,reported_at timestamptz)
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT s.user_id,p.username,p.country,s.portfolio_value,s.pnl_pct,s.trades,s.reported_at
 FROM tradehq_private.previous_practice_results s JOIN public.profiles p ON p.id=s.user_id
 WHERE p.is_public AND s.trades>=5
 AND s.portfolio_value::text NOT IN ('NaN','Infinity','-Infinity')
 AND s.pnl_pct::text NOT IN ('NaN','Infinity','-Infinity')
 ORDER BY s.pnl_pct DESC,s.user_id LIMIT least(greatest(coalesce(p_limit,100),1),500);
$$;
REVOKE ALL ON FUNCTION tradehq_private.previous_results(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION tradehq_private.previous_results(integer) TO anon,authenticated;
CREATE FUNCTION public.get_previous_practice_results(p_limit integer DEFAULT 100)
 RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,reported_at timestamptz)
 LANGUAGE sql STABLE SECURITY INVOKER SET search_path='' AS $$
 SELECT * FROM tradehq_private.previous_results(p_limit);
$$;
REVOKE ALL ON FUNCTION public.get_previous_practice_results(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_previous_practice_results(integer) TO anon,authenticated;
