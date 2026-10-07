-- All public members appear; only comparable server-ledger portfolios receive ranks.
ALTER TABLE public.market_prices ADD COLUMN quote_status text NOT NULL DEFAULT 'provider';

CREATE FUNCTION tradehq_private.store_quote(p_asset text,p_price numeric,p_source text,p_observed timestamptz,p_status text) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 IF p_price IS NULL OR p_price<=0 OR p_price>=1e9 OR p_price::text IN ('NaN','Infinity','-Infinity')
 OR p_status NOT IN ('provider','realtime','delayed','previous_close') OR p_status IS NULL
 OR p_observed>clock_timestamp()+interval '5 minutes' THEN RETURN false; END IF;
 INSERT INTO public.market_prices(asset_id,price,source,observed_at,quote_status,updated_at)
 VALUES(p_asset,p_price,p_source,p_observed,p_status,clock_timestamp())
 ON CONFLICT(asset_id) DO UPDATE SET price=excluded.price,source=excluded.source,observed_at=excluded.observed_at,
 quote_status=excluded.quote_status,updated_at=excluded.updated_at
 WHERE market_prices.observed_at IS NULL OR excluded.observed_at>=market_prices.observed_at;
 RETURN FOUND;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.store_quote(text,numeric,text,timestamptz,text) FROM PUBLIC,anon,authenticated;
GRANT USAGE ON SCHEMA tradehq_private TO service_role;
GRANT EXECUTE ON FUNCTION tradehq_private.store_quote(text,numeric,text,timestamptz,text) TO service_role;
CREATE FUNCTION public.store_practice_quote(p_asset text,p_price numeric,p_source text,p_observed timestamptz,p_status text) RETURNS boolean
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.store_quote(p_asset,p_price,p_source,p_observed,p_status); $$;
REVOKE ALL ON FUNCTION public.store_practice_quote(text,numeric,text,timestamptz,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.store_practice_quote(text,numeric,text,timestamptz,text) TO service_role;

CREATE FUNCTION tradehq_private.public_members(p_limit integer,p_username text)
RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,
 portfolio_status text,practice_rank bigint,priced_at timestamptz,observed_at timestamptz,price_status text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 WITH members AS (
 SELECT f.id user_id,f.username,f.country,
 CASE WHEN p.user_id IS NOT NULL THEN round(v.value,2) END portfolio_value,
 CASE WHEN p.ranked THEN round((v.value-100000)/1000,2) END pnl_pct,coalesce(p.trades_count,0) trades,
 CASE WHEN p.user_id IS NULL THEN 'not_started' WHEN NOT p.ranked THEN 'imported' ELSE 'ranked' END portfolio_status,
 p.ranked AND p.trades_count>=1 eligible,v.priced_at,v.observed_at,
 CASE WHEN p.user_id IS NULL THEN 'not_started' WHEN v.positions=0 THEN 'cash_only'
 WHEN v.missing>0 THEN 'simulator' WHEN v.priced_at<now()-interval '15 minutes' THEN 'stale'
 WHEN v.previous_close>0 THEN 'previous_close' WHEN v.observed_at IS NULL THEN 'unknown_time'
 WHEN v.observed_at<now()-interval '15 minutes' THEN 'delayed' ELSE 'provider' END price_status
 FROM public.profiles f LEFT JOIN public.practice_portfolios p ON p.user_id=f.id
 CROSS JOIN LATERAL (SELECT p.cash+coalesce(sum(x.quantity*coalesce(m.price,a.simulator_price)),0) value,
 count(*) positions,count(*) FILTER(WHERE m.asset_id IS NULL) missing,
 count(*) FILTER(WHERE m.quote_status='previous_close') previous_close,
 min(m.updated_at) priced_at,
 CASE WHEN count(*) FILTER(WHERE m.observed_at IS NULL)>0 THEN NULL ELSE min(m.observed_at) END observed_at
 FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)
 LEFT JOIN public.market_prices m USING(asset_id) WHERE x.user_id=p.user_id) v
 WHERE f.is_public
 ), ranked AS (
 SELECT user_id,rank() OVER(ORDER BY pnl_pct DESC) practice_rank FROM members WHERE eligible
 )
 SELECT m.user_id,m.username,m.country,m.portfolio_value,m.pnl_pct,m.trades,m.portfolio_status,
 r.practice_rank,m.priced_at,m.observed_at,m.price_status FROM members m LEFT JOIN ranked r USING(user_id)
 WHERE p_username IS NULL OR m.username=p_username
 ORDER BY r.practice_rank NULLS LAST,lower(m.username),m.user_id LIMIT least(greatest(coalesce(p_limit,100),1),500);
$$;
REVOKE ALL ON FUNCTION tradehq_private.public_members(integer,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION tradehq_private.public_members(integer,text) TO anon,authenticated;
CREATE FUNCTION public.get_public_practice_members(p_limit integer DEFAULT 100,p_username text DEFAULT NULL)
RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,
 portfolio_status text,practice_rank bigint,priced_at timestamptz,observed_at timestamptz,price_status text)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path='' AS $$ SELECT * FROM tradehq_private.public_members(p_limit,p_username); $$;
REVOKE ALL ON FUNCTION public.get_public_practice_members(integer,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_practice_members(integer,text) TO anon,authenticated;

CREATE OR REPLACE FUNCTION tradehq_private.leaderboard(p_limit integer)
RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,priced_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT m.user_id,m.username,m.country,m.portfolio_value,m.pnl_pct,m.trades,m.priced_at
 FROM tradehq_private.public_members(p_limit,NULL) m WHERE m.practice_rank IS NOT NULL;
$$;
CREATE OR REPLACE FUNCTION tradehq_private.previous_results(p_limit integer)
RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,reported_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT s.user_id,p.username,p.country,s.portfolio_value,s.pnl_pct,s.trades,s.reported_at
 FROM tradehq_private.previous_practice_results s JOIN public.profiles p ON p.id=s.user_id
 WHERE p.is_public AND s.portfolio_value::text NOT IN ('NaN','Infinity','-Infinity')
 AND s.pnl_pct::text NOT IN ('NaN','Infinity','-Infinity')
 ORDER BY s.pnl_pct DESC,s.user_id LIMIT least(greatest(coalesce(p_limit,100),1),500);
$$;

CREATE OR REPLACE FUNCTION tradehq_private.portfolio_snapshot(uid uuid) RETURNS jsonb
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT jsonb_build_object('cash',p.cash,'ranked',p.ranked,'cycle_id',p.cycle_id,'updated_at',p.updated_at,
 'trades',coalesce((SELECT jsonb_agg(to_jsonb(t) ORDER BY t.created_at DESC,t.id) FROM public.practice_trades t WHERE t.user_id=p.user_id AND t.cycle_id=p.cycle_id),'[]'::jsonb),
 'positions',coalesce((SELECT jsonb_agg(jsonb_build_object('asset_id',x.asset_id,'symbol',a.symbol,'asset_type',a.asset_type,
 'quantity',x.quantity,'avg_price',x.avg_price,'last_price',coalesce(m.price,a.simulator_price),
 'priced_at',m.updated_at,'observed_at',m.observed_at,'quote_status',coalesce(m.quote_status,'simulator')))
 FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)
 LEFT JOIN public.market_prices m USING(asset_id) WHERE x.user_id=p.user_id),'[]'::jsonb))
 FROM public.practice_portfolios p WHERE p.user_id=uid;
$$;

-- One authenticated scheduler lease at a time. Token stays in Vault, never in API results.
CREATE TABLE tradehq_private.price_refresh_state(id boolean PRIMARY KEY DEFAULT true CHECK(id),
 last_started timestamptz,last_finished timestamptz,last_result jsonb,lease_id uuid);
ALTER TABLE tradehq_private.price_refresh_state ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON tradehq_private.price_refresh_state FROM PUBLIC,anon,authenticated;
CREATE POLICY "Service refresh state" ON tradehq_private.price_refresh_state TO service_role USING(true) WITH CHECK(true);
INSERT INTO tradehq_private.price_refresh_state(id) VALUES(true);
CREATE TABLE tradehq_private.price_refresh_attempts(asset_id text PRIMARY KEY REFERENCES public.practice_assets(asset_id),attempted_at timestamptz NOT NULL);
ALTER TABLE tradehq_private.price_refresh_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON tradehq_private.price_refresh_attempts FROM PUBLIC,anon,authenticated;
CREATE POLICY "Service refresh attempts" ON tradehq_private.price_refresh_attempts TO service_role USING(true) WITH CHECK(true);
GRANT SELECT,UPDATE ON tradehq_private.price_refresh_state TO service_role;
GRANT SELECT,INSERT,UPDATE ON tradehq_private.price_refresh_attempts TO service_role;

CREATE FUNCTION tradehq_private.claim_price_refresh(p_token text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE lease uuid; assets jsonb;
BEGIN
 IF p_token IS NULL OR length(p_token)<>64 OR NOT EXISTS(
 SELECT 1 FROM vault.decrypted_secrets WHERE name='tradehq_price_refresh_token' AND decrypted_secret=p_token)
 THEN RETURN NULL; END IF;
 UPDATE tradehq_private.price_refresh_state SET last_started=clock_timestamp(),lease_id=gen_random_uuid()
 WHERE id AND (last_started IS NULL OR last_started<clock_timestamp()-interval '4 minutes') RETURNING lease_id INTO lease;
 IF lease IS NULL THEN RETURN NULL; END IF;
 WITH held AS (SELECT DISTINCT a.asset_id,a.asset_type FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)),
 limited AS (SELECT h.* FROM held h LEFT JOIN tradehq_private.price_refresh_attempts t USING(asset_id)
 WHERE h.asset_type IN ('stock','etf','forex') ORDER BY t.attempted_at NULLS FIRST,h.asset_id LIMIT 2),
 selected AS (SELECT * FROM held WHERE asset_type='crypto' UNION ALL SELECT * FROM limited),
 marked AS (INSERT INTO tradehq_private.price_refresh_attempts(asset_id,attempted_at)
 SELECT asset_id,clock_timestamp() FROM selected ON CONFLICT(asset_id) DO UPDATE SET attempted_at=excluded.attempted_at RETURNING asset_id)
 SELECT coalesce(jsonb_agg(jsonb_build_object('assetId',s.asset_id,'type',s.asset_type)),'[]'::jsonb) INTO assets
 FROM selected s JOIN marked m USING(asset_id);
 RETURN jsonb_build_object('lease',lease,'assets',assets);
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.claim_price_refresh(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.claim_price_refresh(text) TO service_role;
CREATE FUNCTION public.claim_portfolio_price_refresh(p_token text) RETURNS jsonb
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.claim_price_refresh(p_token); $$;
REVOKE ALL ON FUNCTION public.claim_portfolio_price_refresh(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_portfolio_price_refresh(text) TO service_role;

CREATE FUNCTION tradehq_private.finish_price_refresh(p_lease uuid,p_result jsonb) RETURNS void
LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$
 UPDATE tradehq_private.price_refresh_state SET last_finished=clock_timestamp(),last_result=p_result
 WHERE id AND lease_id=p_lease;
$$;
REVOKE ALL ON FUNCTION tradehq_private.finish_price_refresh(uuid,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.finish_price_refresh(uuid,jsonb) TO service_role;
CREATE FUNCTION public.finish_portfolio_price_refresh(p_lease uuid,p_result jsonb) RETURNS void
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.finish_price_refresh(p_lease,p_result); $$;
REVOKE ALL ON FUNCTION public.finish_portfolio_price_refresh(uuid,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finish_portfolio_price_refresh(uuid,jsonb) TO service_role;
