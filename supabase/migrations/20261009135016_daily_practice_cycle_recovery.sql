-- Retry caps apply per part and per two-month preparation cycle.
CREATE OR REPLACE FUNCTION tradehq_private.request_daily_practice(p_manual boolean DEFAULT false) RETURNS bigint LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE s tradehq_private.daily_practice_state; c tradehq_private.course_generation_settings; token text; request_id bigint;
BEGIN
 SELECT * INTO c FROM tradehq_private.course_generation_settings WHERE id;
 SELECT * INTO s FROM tradehq_private.daily_practice_state WHERE id FOR UPDATE;
 IF NOT s.enabled OR NOT c.free_confirmed OR NOT EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_course_gemini_key') THEN RETURN NULL; END IF;
 -- Keep an active part intact. A failed/unfinished past cycle never blocks every future bank.
 IF s.pending_expires>clock_timestamp() OR s.lease_expires>clock_timestamp() THEN RETURN NULL; END IF;
 WHILE (clock_timestamp() AT TIME ZONE 'Asia/Colombo')::date >= (s.next_due+interval '2 months')::date-7 LOOP
  UPDATE tradehq_private.daily_practice_state SET next_due=(next_due+interval '2 months')::date,
   exercises='[]'::jsonb,attempts=0,retry_after=NULL,pending_hash=NULL,pending_expires=NULL,
   lease=NULL,lease_expires=NULL,last_started=NULL,
   last_error='Previous preparation cycle was incomplete. The approved bank continues while this cycle is prepared.'
   WHERE id RETURNING * INTO s;
 END LOOP;
 IF NOT s.enabled OR NOT c.free_confirmed OR NOT EXISTS(SELECT 1 FROM vault.secrets WHERE name='tradehq_course_gemini_key')
 OR (NOT p_manual AND (clock_timestamp() AT TIME ZONE 'Asia/Colombo')::date<s.next_due-7)
 OR s.attempts>=3 OR s.retry_after>clock_timestamp() OR s.pending_expires>clock_timestamp() OR s.lease_expires>clock_timestamp()
 OR s.last_started>clock_timestamp()-interval '2 minutes' THEN RETURN NULL; END IF;
 token:=replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-','');
 UPDATE tradehq_private.daily_practice_state SET pending_hash=encode(sha256(convert_to(token,'UTF8')),'hex'),
 pending_expires=clock_timestamp()+interval '2 minutes' WHERE id;
 SELECT net.http_post(url:='https://cbdktpjgczhthflspqjb.supabase.co/functions/v1/generate-daily-practice',body:='{}'::jsonb,
 headers:=jsonb_build_object('Content-Type','application/json','x-generation-token',token),timeout_milliseconds:=120000) INTO request_id;
 RETURN request_id;
END; $$;
