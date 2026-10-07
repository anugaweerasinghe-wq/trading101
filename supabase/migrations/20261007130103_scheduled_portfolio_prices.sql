CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
DO $$ BEGIN
 IF NOT EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_price_refresh_token') THEN
 PERFORM vault.create_secret(replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-',''),
 'tradehq_price_refresh_token','Authentication for the TradeHQ background price updater');
 END IF;
END; $$;
CREATE FUNCTION tradehq_private.request_price_refresh() RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE token text; request_id bigint;
BEGIN
 SELECT decrypted_secret INTO token FROM vault.decrypted_secrets WHERE name='tradehq_price_refresh_token';
 IF token IS NULL THEN RAISE EXCEPTION 'Refresh authentication unavailable'; END IF;
 SELECT net.http_post(url:='https://cbdktpjgczhthflspqjb.supabase.co/functions/v1/refresh-portfolio-prices',
 body:='{}'::jsonb,headers:=jsonb_build_object('Content-Type','application/json','x-refresh-token',token),
 timeout_milliseconds:=120000) INTO request_id;
 RETURN request_id;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.request_price_refresh() FROM PUBLIC,anon,authenticated,service_role;
-- Do not put credentials in the cron command or logs.
SELECT cron.schedule('tradehq-portfolio-prices','*/5 * * * *','SELECT tradehq_private.request_price_refresh();');
-- The queue contains the private authentication header until it is sent.
REVOKE ALL ON net.http_request_queue FROM PUBLIC,anon,authenticated;
