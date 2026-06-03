-- Lock down market_articles: remove public write access
DROP POLICY IF EXISTS "Allow public insert on market_articles" ON public.market_articles;
DROP POLICY IF EXISTS "Allow public update on market_articles" ON public.market_articles;

-- Only service_role (edge functions) may write; SELECT remains public
REVOKE INSERT, UPDATE, DELETE ON public.market_articles FROM anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.market_articles TO service_role;

-- Subscribers: explicitly deny anon/authenticated SELECT/UPDATE/DELETE; service_role only
CREATE POLICY "No public read of subscribers"
  ON public.subscribers FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "No public update of subscribers"
  ON public.subscribers FOR UPDATE
  TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "No public delete of subscribers"
  ON public.subscribers FOR DELETE
  TO anon, authenticated
  USING (false);

REVOKE SELECT, UPDATE, DELETE ON public.subscribers FROM anon, authenticated;
GRANT ALL ON public.subscribers TO service_role;
