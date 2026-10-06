ALTER TABLE public.profiles
  ALTER COLUMN is_public SET DEFAULT true;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base TEXT;
  candidate TEXT;
  n INT := 0;
BEGIN
  base := lower(regexp_replace(COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1), 'trader'), '[^a-z0-9]+', '-', 'g'));
  IF base = '' OR base IS NULL THEN base := 'trader'; END IF;
  candidate := base;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    n := n + 1;
    candidate := base || '-' || n::text;
  END LOOP;

  INSERT INTO public.profiles (id, username, is_public)
  VALUES (NEW.id, candidate, COALESCE((NEW.raw_user_meta_data->>'is_public')::boolean, true));

  INSERT INTO public.trader_stats (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;