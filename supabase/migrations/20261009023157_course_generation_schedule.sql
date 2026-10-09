-- Credentials stay encrypted in Vault and are returned only to the service-authenticated worker.
CREATE TABLE tradehq_private.course_generation_settings (
 id boolean PRIMARY KEY DEFAULT true CHECK(id), enabled boolean NOT NULL DEFAULT false,
 free_confirmed boolean NOT NULL DEFAULT false, model text NOT NULL DEFAULT 'gemini-3.8-flash',
 gsc_property text NOT NULL DEFAULT '', topic_requests jsonb NOT NULL DEFAULT '[]'::jsonb
);
CREATE TABLE tradehq_private.course_generation_runs (
 period text NOT NULL, slot integer NOT NULL CHECK(slot IN (1,2)), attempts integer NOT NULL DEFAULT 0,
 status text NOT NULL DEFAULT 'queued', last_error text, retry_after timestamptz,
 draft_id uuid REFERENCES public.course_drafts(id), updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 PRIMARY KEY(period,slot)
);
CREATE TABLE tradehq_private.course_generation_state (
 id boolean PRIMARY KEY DEFAULT true CHECK(id), pending_token text, pending_expires timestamptz,
 pending_period text,pending_slot integer,lease_id uuid,lease_period text,lease_slot integer,
 last_started timestamptz,last_finished timestamptz
);
INSERT INTO tradehq_private.course_generation_settings(id) VALUES(true);
INSERT INTO tradehq_private.course_generation_state(id) VALUES(true);
ALTER TABLE tradehq_private.course_generation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tradehq_private.course_generation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tradehq_private.course_generation_state ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON tradehq_private.course_generation_settings,tradehq_private.course_generation_runs,
 tradehq_private.course_generation_state FROM PUBLIC,anon,authenticated;
GRANT ALL ON tradehq_private.course_generation_settings,tradehq_private.course_generation_runs,
 tradehq_private.course_generation_state TO service_role;

CREATE FUNCTION tradehq_private.course_generation_status() RETURNS jsonb
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT jsonb_build_object('enabled',s.enabled,'freeConfirmed',s.free_confirmed,'model',s.model,
 'gscProperty',s.gsc_property,'topicRequests',s.topic_requests,
 'hasApiKey',EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_course_gemini_key'),
 'hasGscCredentials',EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_course_gsc_credentials'),
 'lastStarted',st.last_started,'lastFinished',st.last_finished,
 'runs',coalesce((SELECT jsonb_agg(to_jsonb(r)) FROM (
 SELECT period,slot,status,attempts,last_error,retry_after,draft_id,updated_at
 FROM tradehq_private.course_generation_runs ORDER BY period DESC,slot LIMIT 12) r),'[]'::jsonb))
 FROM tradehq_private.course_generation_settings s JOIN tradehq_private.course_generation_state st USING(id);
$$;

CREATE FUNCTION tradehq_private.configure_course_generation(p_settings jsonb) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE secret_id uuid; key text:=p_settings->>'apiKey'; credentials jsonb:=p_settings->'gscCredentials';
BEGIN
 IF jsonb_typeof(p_settings) IS DISTINCT FROM 'object' OR octet_length(p_settings::text)>16000
 OR jsonb_typeof(p_settings->'enabled') IS DISTINCT FROM 'boolean'
 OR jsonb_typeof(p_settings->'freeConfirmed') IS DISTINCT FROM 'boolean'
 OR jsonb_typeof(p_settings->'topicRequests') IS DISTINCT FROM 'array'
 OR jsonb_array_length(p_settings->'topicRequests')>20
 OR coalesce(p_settings->>'model','') NOT IN ('gemini-3.8-flash','gemini-3.5-flash-lite') THEN
 RAISE EXCEPTION 'Invalid generation settings'; END IF;
 IF (p_settings->>'enabled')::boolean AND NOT (p_settings->>'freeConfirmed')::boolean THEN
 RAISE EXCEPTION 'Use a free-tier project with billing disabled'; END IF;
 IF key IS NOT NULL AND key<>'' THEN
  IF key !~ '^[a-zA-Z0-9_-]{20,150}$' THEN RAISE EXCEPTION 'Invalid API key'; END IF;
  SELECT id INTO secret_id FROM vault.secrets WHERE name='tradehq_course_gemini_key';
  IF secret_id IS NULL THEN PERFORM vault.create_secret(key,'tradehq_course_gemini_key');
  ELSE PERFORM vault.update_secret(secret_id,key); END IF;
 END IF;
 IF credentials IS NOT NULL AND credentials<>'null'::jsonb THEN
  IF coalesce(credentials->>'type','')<>'service_account'
  OR coalesce(credentials->>'client_email','') !~ '^[^ @]+@[^ @]+[.]gserviceaccount[.]com$'
  OR coalesce(credentials->>'private_key','') NOT LIKE '-----BEGIN PRIVATE KEY-----%'
  THEN RAISE EXCEPTION 'Invalid Search Console service account'; END IF;
  secret_id:=NULL;
  SELECT id INTO secret_id FROM vault.secrets WHERE name='tradehq_course_gsc_credentials';
  IF secret_id IS NULL THEN PERFORM vault.create_secret(credentials::text,'tradehq_course_gsc_credentials');
  ELSE PERFORM vault.update_secret(secret_id,credentials::text); END IF;
 END IF;
 UPDATE tradehq_private.course_generation_settings SET enabled=(p_settings->>'enabled')::boolean,
 free_confirmed=(p_settings->>'freeConfirmed')::boolean,model=p_settings->>'model',
 gsc_property=left(coalesce(p_settings->>'gscProperty',''),300),topic_requests=p_settings->'topicRequests' WHERE id;
 RETURN tradehq_private.course_generation_status();
END; $$;

CREATE FUNCTION tradehq_private.request_course_generation(p_force boolean DEFAULT false) RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE token text; request_id bigint; current_period text:=to_char(clock_timestamp() AT TIME ZONE 'Asia/Colombo','YYYY-MM');
 slot integer; settings tradehq_private.course_generation_settings; state tradehq_private.course_generation_state;
BEGIN
 SELECT * INTO settings FROM tradehq_private.course_generation_settings WHERE id;
 IF NOT settings.enabled OR NOT settings.free_confirmed
 OR NOT EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_course_gemini_key') THEN RETURN NULL; END IF;
 SELECT * INTO state FROM tradehq_private.course_generation_state WHERE id FOR UPDATE;
 IF state.pending_token IS NOT NULL AND state.pending_expires>clock_timestamp() THEN RETURN NULL; END IF;
 IF state.last_started>clock_timestamp()-interval '5 minutes' AND (state.last_finished IS NULL OR state.last_finished<state.last_started) THEN RETURN NULL; END IF;
 SELECT candidate INTO slot FROM generate_series(1,2) candidate
 WHERE (candidate=1 OR p_force OR extract(day FROM clock_timestamp() AT TIME ZONE 'Asia/Colombo')>=15)
 AND NOT EXISTS(SELECT 1 FROM public.course_drafts WHERE generation_period=current_period AND generation_slot=candidate)
 AND NOT EXISTS(SELECT 1 FROM tradehq_private.course_generation_runs r WHERE r.period=current_period AND r.slot=candidate
 AND (r.attempts>=3 OR (r.retry_after>clock_timestamp() AND NOT p_force)))
 ORDER BY candidate LIMIT 1;
 IF slot IS NULL THEN RETURN NULL; END IF;
 token:=replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-','');
 UPDATE tradehq_private.course_generation_state SET pending_token=token,pending_expires=clock_timestamp()+interval '2 minutes',
 pending_period=current_period,pending_slot=slot WHERE id;
 SELECT net.http_post(url:='https://cbdktpjgczhthflspqjb.supabase.co/functions/v1/generate-course-draft',
 body:='{}'::jsonb,headers:=jsonb_build_object('Content-Type','application/json','x-generation-token',token),
 timeout_milliseconds:=120000) INTO request_id;
 RETURN request_id;
END; $$;

CREATE FUNCTION tradehq_private.claim_course_generation(p_token text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE state tradehq_private.course_generation_state; settings tradehq_private.course_generation_settings; key text; credentials text;
BEGIN
 IF p_token IS NULL OR length(p_token)<>64 THEN RETURN NULL; END IF;
 SELECT * INTO settings FROM tradehq_private.course_generation_settings WHERE id;
 IF NOT settings.enabled OR NOT settings.free_confirmed THEN RETURN NULL; END IF;
 UPDATE tradehq_private.course_generation_state SET lease_id=gen_random_uuid(),last_started=clock_timestamp(),pending_token=NULL,
 lease_period=pending_period,lease_slot=pending_slot
 WHERE id AND pending_token=p_token AND pending_expires>clock_timestamp()
 AND (last_started IS NULL OR last_started<clock_timestamp()-interval '5 minutes' OR last_finished>=last_started)
 RETURNING * INTO state;
 IF NOT FOUND THEN RETURN NULL; END IF;
 INSERT INTO tradehq_private.course_generation_runs(period,slot,attempts,status)
 VALUES(state.lease_period,state.lease_slot,1,'generating')
 ON CONFLICT(period,slot) DO UPDATE SET attempts=course_generation_runs.attempts+1,status='generating',updated_at=clock_timestamp();
 SELECT decrypted_secret INTO key FROM vault.decrypted_secrets WHERE name='tradehq_course_gemini_key';
 SELECT decrypted_secret INTO credentials FROM vault.decrypted_secrets WHERE name='tradehq_course_gsc_credentials';
 RETURN jsonb_build_object('lease',state.lease_id,'period',state.lease_period,'slot',state.lease_slot,
 'apiKey',key,'model',settings.model,'gscProperty',settings.gsc_property,
 'gscCredentials',credentials::jsonb,'topicRequests',settings.topic_requests,
 'existing',coalesce((SELECT jsonb_agg(jsonb_build_object('slug',document->>'slug','title',document->>'title','description',document->>'description')) FROM public.course_drafts),'[]'::jsonb));
END; $$;

CREATE FUNCTION tradehq_private.finish_course_generation(p_lease uuid,p_document jsonb,p_research jsonb,p_error text) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE state tradehq_private.course_generation_state; draft uuid;
BEGIN
 SELECT * INTO state FROM tradehq_private.course_generation_state WHERE id AND lease_id=p_lease FOR UPDATE;
 IF NOT FOUND THEN RETURN false; END IF;
 IF p_error IS NULL THEN
  draft:=tradehq_private.ingest_course(state.lease_period,state.lease_slot,p_document,p_research);
  UPDATE tradehq_private.course_generation_runs SET status='draft_ready',draft_id=draft,last_error=NULL,retry_after=NULL,updated_at=clock_timestamp()
   WHERE period=state.lease_period AND slot=state.lease_slot;
 ELSE
  UPDATE tradehq_private.course_generation_runs SET status='paused',last_error=left(p_error,1000),
   retry_after=clock_timestamp()+interval '1 day',updated_at=clock_timestamp()
   WHERE period=state.lease_period AND slot=state.lease_slot;
 END IF;
 UPDATE tradehq_private.course_generation_state SET last_finished=clock_timestamp(),lease_id=NULL WHERE id;
 RETURN true;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.course_generation_status(),tradehq_private.configure_course_generation(jsonb),
 tradehq_private.request_course_generation(boolean),tradehq_private.claim_course_generation(text),
 tradehq_private.finish_course_generation(uuid,jsonb,jsonb,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.course_generation_status(),tradehq_private.configure_course_generation(jsonb),
 tradehq_private.request_course_generation(boolean),tradehq_private.claim_course_generation(text),
 tradehq_private.finish_course_generation(uuid,jsonb,jsonb,text) TO service_role;

CREATE FUNCTION public.course_generation_status() RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.course_generation_status(); $$;
CREATE FUNCTION public.configure_course_generation(p_settings jsonb) RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.configure_course_generation(p_settings); $$;
CREATE FUNCTION public.request_course_generation(p_force boolean DEFAULT false) RETURNS bigint LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.request_course_generation(p_force); $$;
CREATE FUNCTION public.claim_course_generation(p_token text) RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.claim_course_generation(p_token); $$;
CREATE FUNCTION public.finish_course_generation(p_lease uuid,p_document jsonb,p_research jsonb,p_error text) RETURNS boolean LANGUAGE sql SECURITY INVOKER SET search_path=''
 AS $$ SELECT tradehq_private.finish_course_generation(p_lease,p_document,p_research,p_error); $$;
REVOKE ALL ON FUNCTION public.course_generation_status(),public.configure_course_generation(jsonb),
 public.request_course_generation(boolean),public.claim_course_generation(text),public.finish_course_generation(uuid,jsonb,jsonb,text)
 FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.course_generation_status(),public.configure_course_generation(jsonb),
 public.request_course_generation(boolean),public.claim_course_generation(text),public.finish_course_generation(uuid,jsonb,jsonb,text)
 TO service_role;
-- One course after the 1st, one after the 15th. The worker has at most three attempts per slot.
-- Daily checks cost no AI tokens when setup is missing or both monthly drafts already exist.
SELECT cron.schedule('tradehq-course-drafts','30 3 * * *','SELECT tradehq_private.request_course_generation();');
