-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  country TEXT,
  bio TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (is_public = true OR auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
  ON public.profiles FOR DELETE TO authenticated
  USING (auth.uid() = id);

-- TRADER STATS
CREATE TABLE public.trader_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_value NUMERIC NOT NULL DEFAULT 100000,
  pnl_pct NUMERIC NOT NULL DEFAULT 0,
  trades INTEGER NOT NULL DEFAULT 0,
  win_rate NUMERIC NOT NULL DEFAULT 0,
  max_drawdown NUMERIC NOT NULL DEFAULT 0,
  badges INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.trader_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trader_stats TO authenticated;
GRANT ALL ON public.trader_stats TO service_role;

ALTER TABLE public.trader_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stats of public profiles are viewable"
  ON public.trader_stats FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = trader_stats.user_id AND p.is_public = true)
  );

CREATE POLICY "Users can insert their own stats"
  ON public.trader_stats FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON public.trader_stats FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- DUELS
CREATE TABLE public.duels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opponent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  creator_start_value NUMERIC NOT NULL DEFAULT 100000,
  opponent_start_value NUMERIC,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.duels TO anon;
GRANT SELECT, INSERT, UPDATE ON public.duels TO authenticated;
GRANT ALL ON public.duels TO service_role;

ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Duels are viewable by anyone with the link"
  ON public.duels FOR SELECT USING (true);

CREATE POLICY "Users can create their own duels"
  ON public.duels FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Participants can update their duel"
  ON public.duels FOR UPDATE TO authenticated
  USING (auth.uid() = creator_id OR auth.uid() = opponent_id OR (opponent_id IS NULL AND status = 'open'))
  WITH CHECK (auth.uid() = creator_id OR auth.uid() = opponent_id);

-- shared updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trader_stats_updated_at BEFORE UPDATE ON public.trader_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_duels_updated_at BEFORE UPDATE ON public.duels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- auto-create profile on signup
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();