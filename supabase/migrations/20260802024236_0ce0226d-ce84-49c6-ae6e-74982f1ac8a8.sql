DROP POLICY IF EXISTS "Allow public insert on market_articles" ON public.market_articles;
DROP POLICY IF EXISTS "Allow public update on market_articles" ON public.market_articles;
REVOKE INSERT, UPDATE, DELETE ON public.market_articles FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;