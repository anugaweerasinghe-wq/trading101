-- Keep every original asset ID intact, including legacy MATIC positions and trade history.
INSERT INTO public.practice_assets(asset_id,symbol,asset_type,simulator_price) VALUES
('usdc','USDC','crypto',0.999718),
('usdt','USDT','crypto',0.999503),
('dai','DAI','crypto',0.999989),
('trx','TRX','crypto',0.332191),
('bch','BCH','crypto',277.03),
('ton','TON','crypto',1.38),
('etc','ETC','crypto',8.11),
('xmr','XMR','crypto',544.27),
('aave','AAVE','crypto',165.18),
('grt','GRT','crypto',0.02616787),
('ldo','LDO','crypto',0.412042),
('rune','RUNE','crypto',0.678915),
('kas','KAS','crypto',0.03931111),
('stx','STX','crypto',0.392636),
('imx','IMX','crypto',0.187519),
('render','RENDER','crypto',1.85),
('pepe','PEPE','crypto',3.88e-06),
('bonk','BONK','crypto',3.27e-06),
('wld','WLD','crypto',0.484973),
('pol','POL','crypto',0.098777),
('tao','TAO','crypto',273.42)
ON CONFLICT(asset_id) DO NOTHING;
ALTER TABLE public.market_prices ADD COLUMN quote_data jsonb;

-- Unheld catalog quotes do not need duel valuation history; original historical data stays intact.
CREATE OR REPLACE FUNCTION tradehq_private.remember_quote() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 IF TG_OP='UPDATE' AND NEW.price IS NOT DISTINCT FROM OLD.price
 AND NEW.source IS NOT DISTINCT FROM OLD.source AND NEW.observed_at IS NOT DISTINCT FROM OLD.observed_at THEN RETURN NEW; END IF;
 IF EXISTS(SELECT 1 FROM public.practice_positions WHERE asset_id=NEW.asset_id)
 OR EXISTS(SELECT 1 FROM public.practice_trades WHERE asset_id=NEW.asset_id) THEN
 INSERT INTO tradehq_private.market_price_history(asset_id,price,source,observed_at)
 VALUES(NEW.asset_id,NEW.price,NEW.source,NEW.observed_at);
 END IF;
 RETURN NEW;
END; $$;

CREATE FUNCTION tradehq_private.store_market_data(p_asset text,p_quote jsonb) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE ok boolean;
BEGIN
 IF jsonb_typeof(p_quote) IS DISTINCT FROM 'object' OR octet_length(p_quote::text)>8192
 OR p_quote->>'source' IS DISTINCT FROM 'live' THEN RETURN false; END IF;
 ok:=tradehq_private.store_quote(p_asset,(p_quote->>'price')::numeric,p_quote#>>'{provenance,provider}',
 (p_quote#>>'{provenance,observedAt}')::timestamptz,p_quote#>>'{provenance,status}');
 IF ok THEN UPDATE public.market_prices SET quote_data=p_quote WHERE asset_id=p_asset; END IF;
 RETURN ok;
EXCEPTION WHEN invalid_text_representation OR datetime_field_overflow THEN RETURN false;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.store_market_data(text,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.store_market_data(text,jsonb) TO service_role;
CREATE FUNCTION public.store_practice_market_data(p_asset text,p_quote jsonb) RETURNS boolean
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.store_market_data(p_asset,p_quote); $$;
REVOKE ALL ON FUNCTION public.store_practice_market_data(text,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.store_practice_market_data(text,jsonb) TO service_role;

CREATE OR REPLACE FUNCTION tradehq_private.claim_price_refresh(p_token text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE lease uuid; assets jsonb;
BEGIN
 IF p_token IS NULL OR length(p_token)<>64 THEN RETURN NULL; END IF;
 UPDATE tradehq_private.price_refresh_state SET last_started=clock_timestamp(),lease_id=gen_random_uuid(),pending_token=NULL
 WHERE id AND pending_token=p_token AND pending_expires>clock_timestamp()
 AND (last_started IS NULL OR last_started<clock_timestamp()-interval '4 minutes') RETURNING lease_id INTO lease;
 IF lease IS NULL THEN RETURN NULL; END IF;
 WITH held AS (SELECT DISTINCT a.asset_id,a.asset_type FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)),
 limited AS (SELECT h.* FROM held h LEFT JOIN tradehq_private.price_refresh_attempts t USING(asset_id)
 WHERE h.asset_type IN ('stock','etf','forex') ORDER BY t.attempted_at NULLS FIRST,h.asset_id LIMIT 2),
 selected AS (SELECT asset_id,asset_type FROM public.practice_assets WHERE asset_type='crypto' UNION ALL SELECT * FROM limited),
 marked AS (INSERT INTO tradehq_private.price_refresh_attempts(asset_id,attempted_at)
 SELECT asset_id,clock_timestamp() FROM selected ON CONFLICT(asset_id) DO UPDATE SET attempted_at=excluded.attempted_at RETURNING asset_id)
 SELECT coalesce(jsonb_agg(jsonb_build_object('assetId',s.asset_id,'type',s.asset_type)),'[]'::jsonb) INTO assets
 FROM selected s JOIN marked m USING(asset_id);
 RETURN jsonb_build_object('lease',lease,'assets',assets);
END; $$;

