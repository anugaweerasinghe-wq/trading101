-- New accounts start public as requested by the owner on 7 October 2026.
-- Existing visibility choices are untouched. Owner-only update/RLS stays intact.
BEGIN;
DO $migration$
DECLARE
  current_definition text := pg_get_functiondef('public.handle_new_user()'::regprocedure);
  old_default text := 'COALESCE((NEW.raw_user_meta_data->>''is_public'')::boolean, false)';
  new_default text := 'COALESCE((NEW.raw_user_meta_data->>''is_public'')::boolean, true)';
BEGIN
  IF strpos(current_definition, old_default) > 0 THEN
    EXECUTE replace(current_definition, old_default, new_default);
  ELSIF strpos(current_definition, new_default) = 0 THEN
    RAISE EXCEPTION 'Signup trigger visibility definition changed; review before applying';
  END IF;
END;
$migration$;
ALTER TABLE public.profiles ALTER COLUMN is_public SET DEFAULT true;
COMMIT;
