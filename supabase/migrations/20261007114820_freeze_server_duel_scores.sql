-- New duels use immutable server ledger cycles and values as of their deadline.
-- Historical client-summary duels are retained as legacy, without invented final scores.
BEGIN;
ALTER TABLE public.duels ADD COLUMN score_mode text NOT NULL DEFAULT 'legacy' CHECK(score_mode IN ('legacy','server')),
 ADD COLUMN creator_cycle_id uuid, ADD COLUMN opponent_cycle_id uuid,
 ADD COLUMN creator_final_value numeric, ADD COLUMN opponent_final_value numeric,
 ADD COLUMN settled_at timestamptz;
REVOKE INSERT,UPDATE,DELETE ON public.duels FROM anon,authenticated;
DROP POLICY IF EXISTS "Duels are viewable by anyone with the link" ON public.duels;
CREATE POLICY "Read participant or public-profile duels" ON public.duels FOR SELECT TO anon,authenticated USING (
 auth.uid() IN (creator_id,opponent_id) OR (
 EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=creator_id AND p.is_public)
 AND (opponent_id IS NULL OR EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=opponent_id AND p.is_public))));
ALTER TABLE public.practice_trades ALTER COLUMN created_at SET DEFAULT clock_timestamp();

CREATE TABLE tradehq_private.market_price_history (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 asset_id text NOT NULL REFERENCES public.practice_assets(asset_id),price numeric NOT NULL,
 source text NOT NULL,observed_at timestamptz,cached_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX market_price_history_asset_time ON tradehq_private.market_price_history(asset_id,cached_at DESC,id DESC);
ALTER TABLE tradehq_private.market_price_history ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON tradehq_private.market_price_history FROM PUBLIC,anon,authenticated;
GRANT ALL ON tradehq_private.market_price_history TO service_role;
CREATE FUNCTION tradehq_private.remember_quote() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 INSERT INTO tradehq_private.market_price_history(asset_id,price,source,observed_at) VALUES(NEW.asset_id,NEW.price,NEW.source,NEW.observed_at);
 RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.remember_quote() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER record_valuation_quote AFTER INSERT OR UPDATE ON public.market_prices FOR EACH ROW EXECUTE FUNCTION tradehq_private.remember_quote();
INSERT INTO tradehq_private.market_price_history(asset_id,price,source,observed_at) SELECT asset_id,price,source,observed_at FROM public.market_prices;

CREATE FUNCTION tradehq_private.value_at(uid uuid,cycle uuid,cutoff timestamptz) RETURNS numeric
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 WITH trades AS (SELECT * FROM public.practice_trades WHERE user_id=uid AND cycle_id=cycle AND created_at<=cutoff),
 holdings AS (SELECT asset_id,sum(CASE WHEN side='buy' THEN quantity ELSE -quantity END) AS quantity FROM trades GROUP BY asset_id)
 SELECT 100000+coalesce((SELECT sum(CASE WHEN side='buy' THEN -total ELSE total END) FROM trades),0)
 +coalesce((SELECT sum(h.quantity*coalesce(
  (SELECT q.price FROM tradehq_private.market_price_history q WHERE q.asset_id=h.asset_id AND q.cached_at<=cutoff ORDER BY q.cached_at DESC,q.id DESC LIMIT 1),
  (SELECT t.price FROM trades t WHERE t.asset_id=h.asset_id ORDER BY t.created_at DESC,t.id DESC LIMIT 1))) FROM holdings h WHERE h.quantity>0),0);
$$;
REVOKE ALL ON FUNCTION tradehq_private.value_at(uuid,uuid,timestamptz) FROM PUBLIC,anon,authenticated;

CREATE FUNCTION tradehq_private.create_duel(p_code text) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE uid uuid:=auth.uid(); p public.practice_portfolios; new_id uuid;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
 IF p_code IS NULL OR p_code !~ '^[a-z0-9]{4,32}$' THEN RAISE EXCEPTION 'Invalid duel code'; END IF;
 SELECT * INTO p FROM public.practice_portfolios WHERE user_id=uid FOR UPDATE;
 IF NOT FOUND OR NOT p.ranked THEN RAISE EXCEPTION 'Start ranked practice before creating a duel'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.profiles WHERE id=uid AND is_public) THEN RAISE EXCEPTION 'A public profile is required for duels'; END IF;
 IF (SELECT count(*) FROM public.duels WHERE creator_id=uid AND score_mode='server' AND ends_at>now())>=20 THEN RAISE EXCEPTION 'Finish existing duels before creating more'; END IF;
 INSERT INTO public.duels(code,creator_id,creator_start_value,creator_cycle_id,score_mode,status)
 VALUES(p_code,uid,tradehq_private.current_value(uid),p.cycle_id,'server','open') RETURNING id INTO new_id;
 RETURN new_id;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.create_duel(text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION tradehq_private.create_duel(text) TO authenticated;
CREATE OR REPLACE FUNCTION public.create_practice_duel(p_code text) RETURNS uuid
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.create_duel(p_code); $$;
REVOKE ALL ON FUNCTION public.create_practice_duel(text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.create_practice_duel(text) TO authenticated;

CREATE FUNCTION tradehq_private.join_duel(p_duel_id uuid) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE uid uuid:=auth.uid(); d public.duels; creator public.practice_portfolios; opponent public.practice_portfolios;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
 SELECT * INTO d FROM public.duels WHERE id=p_duel_id FOR UPDATE;
 IF NOT FOUND OR d.creator_id=uid OR d.opponent_id IS NOT NULL OR d.status<>'open' OR d.ends_at<=clock_timestamp() THEN RETURN false; END IF;
 IF d.score_mode<>'server' THEN RAISE EXCEPTION 'Legacy challenges cannot be joined; create a new duel'; END IF;
 PERFORM 1 FROM public.practice_portfolios WHERE user_id IN (uid,d.creator_id) ORDER BY user_id FOR UPDATE;
 SELECT * INTO creator FROM public.practice_portfolios WHERE user_id=d.creator_id;
 SELECT * INTO opponent FROM public.practice_portfolios WHERE user_id=uid;
 IF creator.user_id IS NULL OR opponent.user_id IS NULL OR NOT creator.ranked OR NOT opponent.ranked OR creator.cycle_id<>d.creator_cycle_id THEN
  RAISE EXCEPTION 'Both participants need ranked practice portfolios'; END IF;
 IF (SELECT count(*) FROM public.profiles WHERE id IN (uid,d.creator_id) AND is_public)<>2 THEN RAISE EXCEPTION 'Both profiles must be public to join'; END IF;
 UPDATE public.duels SET opponent_id=uid,creator_start_value=tradehq_private.current_value(d.creator_id),
 opponent_start_value=tradehq_private.current_value(uid),opponent_cycle_id=opponent.cycle_id,
 status='active',starts_at=clock_timestamp(),ends_at=clock_timestamp()+interval '30 days' WHERE id=d.id;
 RETURN true;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.join_duel(uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION tradehq_private.join_duel(uuid) TO authenticated;
CREATE OR REPLACE FUNCTION public.join_practice_duel(p_duel_id uuid) RETURNS boolean
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.join_duel(p_duel_id); $$;
REVOKE ALL ON FUNCTION public.join_practice_duel(uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.join_practice_duel(uuid) TO authenticated;

CREATE FUNCTION tradehq_private.duel_score(p_duel_id uuid) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE d public.duels; creator_name text; opponent_name text; creator_public boolean; opponent_public boolean; cv numeric; ov numeric;
BEGIN
 SELECT * INTO d FROM public.duels WHERE id=p_duel_id FOR UPDATE;
 IF NOT FOUND THEN RETURN NULL; END IF;
 SELECT username,is_public INTO creator_name,creator_public FROM public.profiles WHERE id=d.creator_id;
 SELECT username,is_public INTO opponent_name,opponent_public FROM public.profiles WHERE id=d.opponent_id;
 IF NOT coalesce(auth.uid() IN (d.creator_id,d.opponent_id),false)
  AND NOT (coalesce(creator_public,false) AND (d.opponent_id IS NULL OR coalesce(opponent_public,false))) THEN RETURN NULL; END IF;
 IF d.score_mode='server' AND d.opponent_id IS NOT NULL AND d.ends_at<=clock_timestamp() AND d.settled_at IS NULL THEN
  PERFORM 1 FROM public.practice_portfolios WHERE user_id IN (d.creator_id,d.opponent_id) ORDER BY user_id FOR UPDATE;
  UPDATE public.duels SET creator_final_value=tradehq_private.value_at(d.creator_id,d.creator_cycle_id,d.ends_at),
   opponent_final_value=tradehq_private.value_at(d.opponent_id,d.opponent_cycle_id,d.ends_at),settled_at=clock_timestamp(),status='finished'
   WHERE id=d.id RETURNING * INTO d;
 END IF;
 IF d.score_mode='server' THEN
  cv:=coalesce(d.creator_final_value,tradehq_private.current_value(d.creator_id));
  ov:=CASE WHEN d.opponent_id IS NOT NULL THEN coalesce(d.opponent_final_value,tradehq_private.current_value(d.opponent_id)) END;
 END IF;
 RETURN to_jsonb(d)||jsonb_build_object('creator_name',CASE WHEN creator_public OR auth.uid()=d.creator_id THEN creator_name ELSE 'Private trader' END,
 'opponent_name',CASE WHEN opponent_public OR auth.uid()=d.opponent_id THEN opponent_name ELSE 'Private trader' END,'creator_value',cv,'opponent_value',ov);
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.duel_score(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION tradehq_private.duel_score(uuid) TO anon,authenticated;
CREATE FUNCTION public.get_practice_duel_score(p_duel_id uuid) RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.duel_score(p_duel_id); $$;
REVOKE ALL ON FUNCTION public.get_practice_duel_score(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_practice_duel_score(uuid) TO anon,authenticated;

CREATE FUNCTION tradehq_private.public_duels(p_limit integer) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE d record; result jsonb:='[]'::jsonb;
BEGIN
 FOR d IN SELECT x.id FROM public.duels x JOIN public.profiles c ON c.id=x.creator_id AND c.is_public
 JOIN public.profiles o ON o.id=x.opponent_id AND o.is_public WHERE x.score_mode='server'
 ORDER BY x.created_at DESC LIMIT least(greatest(coalesce(p_limit,50),1),100) LOOP
  result:=result||jsonb_build_array(tradehq_private.duel_score(d.id));
 END LOOP;
 RETURN result;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.public_duels(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION tradehq_private.public_duels(integer) TO anon,authenticated;
CREATE FUNCTION public.get_public_practice_duels(p_limit integer DEFAULT 50) RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.public_duels(p_limit); $$;
REVOKE ALL ON FUNCTION public.get_public_practice_duels(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_practice_duels(integer) TO anon,authenticated;
-- Fresh ranked resets should not be held hostage by unscorable legacy invites.
DO $$ DECLARE definition text:=pg_get_functiondef('tradehq_private.start_ranked_portfolio()'::regprocedure);
BEGIN
 definition:=replace(definition,'FROM public.duels WHERE (creator_id=uid','FROM public.duels WHERE score_mode=''server'' AND (creator_id=uid');
 EXECUTE definition;
END; $$;
COMMIT;
