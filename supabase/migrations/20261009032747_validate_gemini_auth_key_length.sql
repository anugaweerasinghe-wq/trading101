-- Validate length separately: PostgreSQL regex repetition bounds cannot exceed 255.
-- Google AI Studio now issues authorization keys containing a dot.
-- Keep validation bounded, preserve Vault storage and existing service-only grants.
CREATE OR REPLACE FUNCTION tradehq_private.configure_course_generation(p_settings jsonb) RETURNS jsonb
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
  IF length(key) NOT BETWEEN 20 AND 256 OR key !~ '^[a-zA-Z0-9_.-]+$' THEN RAISE EXCEPTION 'Invalid API key'; END IF;
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
