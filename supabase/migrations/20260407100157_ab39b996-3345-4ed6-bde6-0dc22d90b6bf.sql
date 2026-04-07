
CREATE POLICY "Allow public insert on market_articles"
ON public.market_articles
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public update on market_articles"
ON public.market_articles
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
