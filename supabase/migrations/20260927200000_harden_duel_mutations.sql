-- Harden duel mutations. Participants may no longer directly UPDATE arbitrary
-- columns on duel rows. Starting values are read from the caller's synced
-- practice-stat row inside constrained SECURITY DEFINER functions.

REVOKE INSERT, UPDATE ON public.duels FROM authenticated;
GRANT SELECT ON public.duels TO authenticated;

CREATE OR REPLACE FUNCTION public.create_practice_duel(p_code text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  start_value numeric;
  new_id uuid;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_code IS NULL OR length(p_code) < 4 OR length(p_code) > 32 THEN
    RAISE EXCEPTION 'Invalid duel code';
  END IF;

  SELECT portfolio_value INTO start_value
  FROM public.trader_stats
  WHERE user_id = uid;

  IF start_value IS NULL OR start_value <= 0 THEN
    RAISE EXCEPTION 'Practice stats must be synced before creating a duel';
  END IF;

  INSERT INTO public.duels (code, creator_id, creator_start_value, status)
  VALUES (p_code, uid, start_value, 'open')
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.join_practice_duel(p_duel_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  start_value numeric;
  affected integer;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT portfolio_value INTO start_value
  FROM public.trader_stats
  WHERE user_id = uid;

  IF start_value IS NULL OR start_value <= 0 THEN
    RAISE EXCEPTION 'Practice stats must be synced before joining a duel';
  END IF;

  UPDATE public.duels
  SET opponent_id = uid,
      opponent_start_value = start_value,
      status = 'active',
      starts_at = now(),
      ends_at = now() + interval '30 days'
  WHERE id = p_duel_id
    AND creator_id <> uid
    AND opponent_id IS NULL
    AND status = 'open';

  GET DIAGNOSTICS affected = ROW_COUNT;
  RETURN affected = 1;
END;
$$;

REVOKE ALL ON FUNCTION public.create_practice_duel(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.join_practice_duel(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_practice_duel(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.join_practice_duel(uuid) TO authenticated;
