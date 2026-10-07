-- pg_net's extension-owned queue cannot have its owner grants revoked by postgres.
-- Use an expiring, single-use token instead of placing a persistent Vault credential there.
ALTER TABLE tradehq_private.price_refresh_state ADD COLUMN pending_token text, ADD COLUMN pending_expires timestamptz;
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
 selected AS (SELECT * FROM held WHERE asset_type='crypto' UNION ALL SELECT * FROM limited),
 marked AS (INSERT INTO tradehq_private.price_refresh_attempts(asset_id,attempted_at)
 SELECT asset_id,clock_timestamp() FROM selected ON CONFLICT(asset_id) DO UPDATE SET attempted_at=excluded.attempted_at RETURNING asset_id)
 SELECT coalesce(jsonb_agg(jsonb_build_object('assetId',s.asset_id,'type',s.asset_type)),'[]'::jsonb) INTO assets
 FROM selected s JOIN marked m USING(asset_id);
 RETURN jsonb_build_object('lease',lease,'assets',assets);
END; $$;

CREATE OR REPLACE FUNCTION tradehq_private.request_price_refresh() RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE token text; request_id bigint;
BEGIN
 token:=replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-','');
 UPDATE tradehq_private.price_refresh_state SET pending_token=token,pending_expires=clock_timestamp()+interval '2 minutes' WHERE id;
 SELECT net.http_post(url:='https://cbdktpjgczhthflspqjb.supabase.co/functions/v1/refresh-portfolio-prices',
 body:='{}'::jsonb,headers:=jsonb_build_object('Content-Type','application/json','x-refresh-token',token),
 timeout_milliseconds:=120000) INTO request_id;
 RETURN request_id;
END; $$;
