-- Owner-triggered read-only checks use the worker's normal server-side claim model.
-- Tokens are hashed, expire in two minutes, and are consumed before Vault is read.
CREATE TABLE tradehq_private.course_demand_check (
 id boolean PRIMARY KEY DEFAULT true CHECK (id),
 token_hash text, expires_at timestamptz, lease uuid,
 property text NOT NULL DEFAULT '', requested_at timestamptz,
 checked_at timestamptz, result jsonb
);
INSERT INTO tradehq_private.course_demand_check(id) VALUES(true);
ALTER TABLE tradehq_private.course_demand_check ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON tradehq_private.course_demand_check FROM PUBLIC,anon,authenticated;
GRANT ALL ON tradehq_private.course_demand_check TO service_role;

CREATE FUNCTION tradehq_private.request_course_demand_check() RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE token text; property_value text; request_id bigint; state tradehq_private.course_demand_check;
BEGIN
 SELECT * INTO state FROM tradehq_private.course_demand_check WHERE id FOR UPDATE;
 IF state.requested_at > clock_timestamp()-interval '1 minute' THEN RETURN NULL; END IF;
 SELECT gsc_property INTO property_value FROM tradehq_private.course_generation_settings WHERE id;
 IF property_value='' OR NOT EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_course_gsc_credentials') THEN
  RAISE EXCEPTION 'Save the Search Console property and credentials first.';
 END IF;
 token:=replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-','');
 UPDATE tradehq_private.course_demand_check SET token_hash=encode(sha256(convert_to(token,'UTF8')),'hex'),
  expires_at=clock_timestamp()+interval '2 minutes',lease=NULL,property=property_value,
  requested_at=clock_timestamp(),checked_at=NULL,result=NULL WHERE id;
 SELECT net.http_post(url:='https://cbdktpjgczhthflspqjb.supabase.co/functions/v1/generate-course-draft',
  body:='{}'::jsonb,headers:=jsonb_build_object('Content-Type','application/json','x-generation-token',token,'x-course-check','search-demand'),
  timeout_milliseconds:=30000) INTO request_id;
 RETURN request_id;
END; $$;

CREATE FUNCTION tradehq_private.claim_course_demand_check(p_token text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE state tradehq_private.course_demand_check; credentials text; check_lease uuid:=gen_random_uuid();
BEGIN
 IF p_token IS NULL OR p_token !~ '^[a-f0-9]{64}$' THEN RETURN NULL; END IF;
 UPDATE tradehq_private.course_demand_check SET token_hash=NULL,lease=check_lease
 WHERE id AND token_hash=encode(sha256(convert_to(p_token,'UTF8')),'hex') AND expires_at>clock_timestamp()
 RETURNING * INTO state;
 IF NOT FOUND THEN RETURN NULL; END IF;
 SELECT decrypted_secret INTO credentials FROM vault.decrypted_secrets WHERE name='tradehq_course_gsc_credentials';
 RETURN jsonb_build_object('lease',check_lease,'property',state.property,'credentials',credentials::jsonb);
END; $$;

CREATE FUNCTION tradehq_private.finish_course_demand_check(p_lease uuid,p_result jsonb) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 UPDATE tradehq_private.course_demand_check SET lease=NULL,checked_at=clock_timestamp(),
 result=jsonb_build_object('ok',p_result->'ok','matchingQueries',p_result->'matchingQueries',
  'tokenHttpStatus',p_result->'tokenHttpStatus','queryHttpStatus',p_result->'queryHttpStatus',
  'error',p_result->'error','availableProperties',p_result->'availableProperties')
 WHERE id AND lease=p_lease AND checked_at IS NULL AND expires_at>clock_timestamp();
 RETURN FOUND;
END; $$;

CREATE FUNCTION public.request_course_demand_check() RETURNS bigint LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.request_course_demand_check(); $$;
CREATE FUNCTION public.claim_course_demand_check(p_token text) RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.claim_course_demand_check(p_token); $$;
CREATE FUNCTION public.finish_course_demand_check(p_lease uuid,p_result jsonb) RETURNS boolean LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.finish_course_demand_check(p_lease,p_result); $$;
REVOKE ALL ON FUNCTION tradehq_private.request_course_demand_check(),tradehq_private.claim_course_demand_check(text),
 tradehq_private.finish_course_demand_check(uuid,jsonb),public.request_course_demand_check(),
 public.claim_course_demand_check(text),public.finish_course_demand_check(uuid,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.request_course_demand_check(),tradehq_private.claim_course_demand_check(text),
 tradehq_private.finish_course_demand_check(uuid,jsonb),public.request_course_demand_check(),
 public.claim_course_demand_check(text),public.finish_course_demand_check(uuid,jsonb) TO service_role;
