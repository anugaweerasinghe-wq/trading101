
-- Market Articles CMS table
CREATE TABLE public.market_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  focus_asset TEXT NOT NULL,
  sentiment TEXT NOT NULL DEFAULT 'Neutral' CHECK (sentiment IN ('Bullish', 'Bearish', 'Neutral')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index on focus_asset for instant lookups
CREATE INDEX idx_market_articles_focus_asset ON public.market_articles (focus_asset);
CREATE INDEX idx_market_articles_slug ON public.market_articles (slug);

-- Newsletter subscribers table
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'footer_form'
);

CREATE INDEX idx_subscribers_email ON public.subscribers (email);

-- RLS policies - articles are publicly readable, subscribers insert-only
ALTER TABLE public.market_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can read articles (public content)
CREATE POLICY "Articles are publicly readable"
  ON public.market_articles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can subscribe (insert only, no read/update/delete for anon)
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
