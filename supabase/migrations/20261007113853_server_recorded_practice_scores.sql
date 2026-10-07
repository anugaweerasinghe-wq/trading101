-- Competitive scores come only from a server-recorded simulation ledger.
-- Existing browser portfolios may be imported privately, but never ranked.
BEGIN;
CREATE SCHEMA IF NOT EXISTS tradehq_private;
REVOKE ALL ON SCHEMA tradehq_private FROM PUBLIC;
GRANT USAGE ON SCHEMA tradehq_private TO anon, authenticated;

CREATE TABLE public.practice_assets (
  asset_id text PRIMARY KEY, symbol text NOT NULL, asset_type text NOT NULL,
  simulator_price numeric NOT NULL CHECK (simulator_price > 0 AND simulator_price < 1e9)
);
ALTER TABLE public.practice_assets ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.practice_assets FROM anon,authenticated;
GRANT SELECT ON public.practice_assets TO anon, authenticated;
CREATE POLICY "Read supported simulation assets" ON public.practice_assets FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.market_prices (
  asset_id text PRIMARY KEY REFERENCES public.practice_assets(asset_id),
  price numeric NOT NULL CHECK (price > 0 AND price < 1e9), source text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(), observed_at timestamptz
);
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.market_prices FROM anon,authenticated;
GRANT SELECT ON public.market_prices TO anon, authenticated;
GRANT ALL ON public.market_prices TO service_role;
CREATE POLICY "Read cached simulation valuation quotes" ON public.market_prices FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.practice_portfolios (
  user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  cash numeric NOT NULL DEFAULT 100000 CHECK (cash >= 0 AND cash < 1e15),
  ranked boolean NOT NULL DEFAULT true, cycle_id uuid NOT NULL DEFAULT gen_random_uuid(),
  trades_count integer NOT NULL DEFAULT 0, peak_value numeric NOT NULL DEFAULT 100000,
  max_drawdown numeric NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.practice_positions (
  user_id uuid REFERENCES public.practice_portfolios(user_id) ON DELETE CASCADE,
  asset_id text REFERENCES public.practice_assets(asset_id),
  quantity numeric NOT NULL CHECK (quantity > 0 AND quantity < 1e15),
  avg_price numeric NOT NULL CHECK (avg_price > 0 AND avg_price < 1e12),
  PRIMARY KEY (user_id, asset_id)
);
CREATE TABLE public.practice_trades (
  id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cycle_id uuid NOT NULL, asset_id text NOT NULL REFERENCES public.practice_assets(asset_id),
  side text NOT NULL CHECK (side IN ('buy','sell')), quantity numeric NOT NULL,
  price numeric NOT NULL, fee numeric NOT NULL, total numeric NOT NULL,
  realized_pnl numeric, price_source text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX practice_trades_user_cycle ON public.practice_trades(user_id,cycle_id,created_at);
CREATE TABLE public.practice_portfolio_backups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.practice_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_portfolio_backups ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.practice_portfolios,public.practice_positions,public.practice_trades,public.practice_portfolio_backups FROM anon,authenticated;
GRANT SELECT ON public.practice_portfolios,public.practice_positions,public.practice_trades,public.practice_portfolio_backups TO authenticated;
CREATE POLICY "Read own account portfolio" ON public.practice_portfolios FOR SELECT TO authenticated USING ((select auth.uid())=user_id);
CREATE POLICY "Read own account positions" ON public.practice_positions FOR SELECT TO authenticated USING ((select auth.uid())=user_id);
CREATE POLICY "Read own recorded trades" ON public.practice_trades FOR SELECT TO authenticated USING ((select auth.uid())=user_id);
CREATE POLICY "Read own saved practice backups" ON public.practice_portfolio_backups FOR SELECT TO authenticated USING ((select auth.uid())=user_id);
REVOKE INSERT,UPDATE,DELETE ON public.trader_stats FROM anon,authenticated;

CREATE FUNCTION tradehq_private.portfolio_snapshot(uid uuid) RETURNS jsonb
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT jsonb_build_object('cash',p.cash,'ranked',p.ranked,'cycle_id',p.cycle_id,'updated_at',p.updated_at,
  'positions',coalesce((SELECT jsonb_agg(jsonb_build_object('asset_id',x.asset_id,'symbol',a.symbol,'asset_type',a.asset_type,
    'quantity',x.quantity,'avg_price',x.avg_price,'last_price',coalesce(m.price,a.simulator_price)))
    FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)
    LEFT JOIN public.market_prices m USING(asset_id) WHERE x.user_id=p.user_id),'[]'::jsonb))
 FROM public.practice_portfolios p WHERE p.user_id=uid;
$$;
REVOKE ALL ON FUNCTION tradehq_private.portfolio_snapshot(uuid) FROM PUBLIC,anon,authenticated;

CREATE FUNCTION tradehq_private.current_value(uid uuid) RETURNS numeric
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT p.cash+coalesce((SELECT sum(x.quantity*coalesce(m.price,a.simulator_price))
 FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)
 LEFT JOIN public.market_prices m USING(asset_id) WHERE x.user_id=p.user_id),0)
 FROM public.practice_portfolios p WHERE p.user_id=uid;
$$;
REVOKE ALL ON FUNCTION tradehq_private.current_value(uuid) FROM PUBLIC,anon,authenticated;

CREATE FUNCTION tradehq_private.refresh_stats(uid uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE p public.practice_portfolios; val numeric; closed integer; wins integer;
BEGIN
 SELECT * INTO p FROM public.practice_portfolios WHERE user_id=uid FOR UPDATE;
 IF NOT FOUND THEN RETURN; END IF;
 val:=tradehq_private.current_value(uid);
 UPDATE public.practice_portfolios SET peak_value=greatest(peak_value,val),
  max_drawdown=greatest(max_drawdown,100*(greatest(peak_value,val)-val)/greatest(peak_value,val)) WHERE user_id=uid;
 SELECT count(*),count(*) FILTER(WHERE realized_pnl>0) INTO closed,wins
 FROM public.practice_trades WHERE user_id=uid AND cycle_id=p.cycle_id AND side='sell';
 INSERT INTO public.trader_stats(user_id,portfolio_value,pnl_pct,trades,win_rate,max_drawdown,badges)
 SELECT uid,round(val,2),round((val-100000)/1000,2),p.trades_count,
  CASE WHEN closed>0 THEN round(wins*100.0/closed,2) ELSE 0 END,max_drawdown,0
 FROM public.practice_portfolios WHERE user_id=uid
 ON CONFLICT(user_id) DO UPDATE SET portfolio_value=excluded.portfolio_value,pnl_pct=excluded.pnl_pct,
 trades=excluded.trades,win_rate=excluded.win_rate,max_drawdown=excluded.max_drawdown,updated_at=now();
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.refresh_stats(uuid) FROM PUBLIC,anon,authenticated;

CREATE FUNCTION tradehq_private.initialize_portfolio(p_import jsonb) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE uid uuid:=auth.uid(); v_cash numeric:=100000; item jsonb; activity boolean:=false; asset text; qty numeric; cost numeric;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
 -- Serializes first-device imports; an existing account copy always wins.
 PERFORM pg_advisory_xact_lock(hashtextextended(uid::text,0));
 IF EXISTS(SELECT 1 FROM public.practice_portfolios WHERE user_id=uid) THEN
  RETURN tradehq_private.portfolio_snapshot(uid);
 END IF;
 IF p_import IS NOT NULL THEN
  IF pg_column_size(p_import)>2000000 THEN RAISE EXCEPTION 'Portfolio import too large'; END IF;
  v_cash:=coalesce((p_import->>'cash')::numeric,100000);
  IF v_cash IS NULL OR v_cash<0 OR v_cash>=1e12 OR v_cash::text IN ('NaN','Infinity','-Infinity') THEN RAISE EXCEPTION 'Invalid cash'; END IF;
  IF jsonb_typeof(p_import->'positions')<>'array' OR jsonb_array_length(p_import->'positions')>200 THEN RAISE EXCEPTION 'Invalid positions'; END IF;
  activity:=v_cash<>100000 OR jsonb_array_length(p_import->'positions')>0 OR coalesce(p_import->>'has_activity','false')='true';
 END IF;
 INSERT INTO public.practice_portfolios(user_id,cash,ranked) VALUES(uid,v_cash,NOT activity);
 IF activity THEN
  INSERT INTO public.practice_portfolio_backups(user_id,snapshot) VALUES(uid,p_import);
  FOR item IN SELECT value FROM jsonb_array_elements(p_import->'positions') LOOP
   asset:=item->>'asset_id'; qty:=(item->>'quantity')::numeric; cost:=(item->>'avg_price')::numeric;
   IF qty IS NULL OR cost IS NULL OR qty<=0 OR qty>=1e15 OR cost<=0 OR cost>=1e12
    OR qty::text IN ('NaN','Infinity','-Infinity') OR cost::text IN ('NaN','Infinity','-Infinity') THEN RAISE EXCEPTION 'Invalid imported position'; END IF;
   INSERT INTO public.practice_positions(user_id,asset_id,quantity,avg_price) VALUES(uid,asset,qty,cost);
  END LOOP;
 END IF;
 PERFORM tradehq_private.refresh_stats(uid);
 RETURN tradehq_private.portfolio_snapshot(uid);
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.initialize_portfolio(jsonb) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION tradehq_private.initialize_portfolio(jsonb) TO authenticated;
CREATE FUNCTION public.initialize_practice_portfolio(p_import jsonb DEFAULT NULL) RETURNS jsonb
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.initialize_portfolio(p_import); $$;
REVOKE ALL ON FUNCTION public.initialize_practice_portfolio(jsonb) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.initialize_practice_portfolio(jsonb) TO authenticated;

CREATE FUNCTION tradehq_private.record_trade(p_asset_id text,p_side text,p_quantity numeric,p_request_id uuid) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE uid uuid:=auth.uid(); p public.practice_portfolios; a public.practice_assets; q numeric; source text;
 x public.practice_positions; amount numeric; fee numeric; realized numeric:=null; duplicate public.practice_trades;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
 IF p_request_id IS NULL OR p_side NOT IN ('buy','sell') OR p_side IS NULL OR p_quantity IS NULL OR p_quantity<=0 OR p_quantity>=1e15
  OR p_quantity::text IN ('NaN','Infinity','-Infinity') THEN RAISE EXCEPTION 'Invalid order'; END IF;
 SELECT * INTO p FROM public.practice_portfolios WHERE user_id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Initialize account portfolio first'; END IF;
 SELECT * INTO duplicate FROM public.practice_trades WHERE id=p_request_id;
 IF FOUND THEN
  IF duplicate.user_id<>uid OR duplicate.cycle_id<>p.cycle_id OR duplicate.asset_id<>p_asset_id OR duplicate.side<>p_side OR duplicate.quantity<>p_quantity THEN
   RAISE EXCEPTION 'Order identifier already used'; END IF;
  RETURN jsonb_build_object('portfolio',tradehq_private.portfolio_snapshot(uid),'trade',to_jsonb(duplicate));
 END IF;
 SELECT * INTO a FROM public.practice_assets WHERE asset_id=p_asset_id;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unsupported asset'; END IF;
 SELECT price,'Cached provider quote: '||m.source INTO q,source FROM public.market_prices m WHERE asset_id=p_asset_id;
 IF q IS NULL THEN q:=a.simulator_price; source:='Fixed simulator price'; END IF;
 amount:=q*p_quantity; fee:=amount*0.001;
 SELECT * INTO x FROM public.practice_positions WHERE user_id=uid AND asset_id=p_asset_id;
 IF p_side='buy' THEN
  IF p.cash<amount+fee THEN RAISE EXCEPTION 'Insufficient funds'; END IF;
  UPDATE public.practice_portfolios SET cash=cash-amount-fee WHERE user_id=uid;
  INSERT INTO public.practice_positions(user_id,asset_id,quantity,avg_price) VALUES(uid,p_asset_id,p_quantity,(amount+fee)/p_quantity)
  ON CONFLICT(user_id,asset_id) DO UPDATE SET avg_price=(practice_positions.avg_price*practice_positions.quantity+amount+fee)/(practice_positions.quantity+p_quantity),quantity=practice_positions.quantity+p_quantity;
 ELSE
  IF x.quantity IS NULL OR x.quantity<p_quantity THEN RAISE EXCEPTION 'Insufficient shares'; END IF;
  realized:=amount-fee-x.avg_price*p_quantity;
  UPDATE public.practice_portfolios SET cash=cash+amount-fee WHERE user_id=uid;
  IF x.quantity=p_quantity THEN DELETE FROM public.practice_positions WHERE user_id=uid AND asset_id=p_asset_id;
  ELSE UPDATE public.practice_positions SET quantity=quantity-p_quantity WHERE user_id=uid AND asset_id=p_asset_id; END IF;
 END IF;
 INSERT INTO public.practice_trades(id,user_id,cycle_id,asset_id,side,quantity,price,fee,total,realized_pnl,price_source)
 VALUES(p_request_id,uid,p.cycle_id,p_asset_id,p_side,p_quantity,q,fee,CASE WHEN p_side='buy' THEN amount+fee ELSE amount-fee END,realized,source);
 UPDATE public.practice_portfolios SET trades_count=trades_count+1,updated_at=now() WHERE user_id=uid;
 PERFORM tradehq_private.refresh_stats(uid);
 RETURN jsonb_build_object('portfolio',tradehq_private.portfolio_snapshot(uid),'trade',(SELECT to_jsonb(t) FROM public.practice_trades t WHERE id=p_request_id));
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.record_trade(text,text,numeric,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION tradehq_private.record_trade(text,text,numeric,uuid) TO authenticated;
CREATE FUNCTION public.record_practice_trade(p_asset_id text,p_side text,p_quantity numeric,p_request_id uuid) RETURNS jsonb
LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.record_trade(p_asset_id,p_side,p_quantity,p_request_id); $$;
REVOKE ALL ON FUNCTION public.record_practice_trade(text,text,numeric,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.record_practice_trade(text,text,numeric,uuid) TO authenticated;

CREATE FUNCTION tradehq_private.start_ranked_portfolio() RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE uid uuid:=auth.uid();
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
 PERFORM 1 FROM public.practice_portfolios WHERE user_id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Initialize account portfolio first'; END IF;
 IF EXISTS(SELECT 1 FROM public.duels WHERE (creator_id=uid OR opponent_id=uid) AND status IN ('open','active') AND ends_at>now()) THEN
  RAISE EXCEPTION 'Finish your current duels before starting fresh'; END IF;
 INSERT INTO public.practice_portfolio_backups(user_id,snapshot) VALUES(uid,tradehq_private.portfolio_snapshot(uid));
 DELETE FROM public.practice_positions WHERE user_id=uid;
 UPDATE public.practice_portfolios SET cash=100000,ranked=true,cycle_id=gen_random_uuid(),trades_count=0,peak_value=100000,max_drawdown=0,updated_at=now() WHERE user_id=uid;
 PERFORM tradehq_private.refresh_stats(uid);
 RETURN tradehq_private.portfolio_snapshot(uid);
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.start_ranked_portfolio() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION tradehq_private.start_ranked_portfolio() TO authenticated;
CREATE FUNCTION public.start_ranked_practice() RETURNS jsonb LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.start_ranked_portfolio(); $$;
REVOKE ALL ON FUNCTION public.start_ranked_practice() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.start_ranked_practice() TO authenticated;

CREATE FUNCTION tradehq_private.leaderboard(p_limit integer) RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,priced_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT p.user_id,f.username,f.country,round(v.value,2),round((v.value-100000)/1000,2),p.trades_count,v.priced_at
 FROM public.practice_portfolios p JOIN public.profiles f ON f.id=p.user_id AND f.is_public
 CROSS JOIN LATERAL (SELECT p.cash+coalesce(sum(x.quantity*coalesce(m.price,a.simulator_price)),0) AS value,
 min(m.updated_at) AS priced_at FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)
 LEFT JOIN public.market_prices m USING(asset_id) WHERE x.user_id=p.user_id) v
 WHERE p.ranked AND p.trades_count>=5 ORDER BY 5 DESC,p.user_id LIMIT least(greatest(coalesce(p_limit,100),1),500);
$$;
REVOKE ALL ON FUNCTION tradehq_private.leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION tradehq_private.leaderboard(integer) TO anon,authenticated;
CREATE OR REPLACE FUNCTION public.get_cloud_leaderboard(p_limit integer DEFAULT 100)
RETURNS TABLE(user_id uuid,username text,country text,portfolio_value numeric,pnl_pct numeric,trades integer,priced_at timestamptz)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path='' AS $$ SELECT * FROM tradehq_private.leaderboard(p_limit); $$;
REVOKE ALL ON FUNCTION public.get_cloud_leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_cloud_leaderboard(integer) TO anon,authenticated;
-- Asset catalog values are inserted below, from the reviewed application inventory.

INSERT INTO public.practice_assets(asset_id,symbol,asset_type,simulator_price) VALUES
('btc','BTC','crypto',95000),
('eth','ETH','crypto',3850),
('sol','SOL','crypto',248.5),
('bnb','BNB','crypto',312.8),
('xrp','XRP','crypto',0.6245),
('ada','ADA','crypto',0.582),
('doge','DOGE','crypto',0.0825),
('avax','AVAX','crypto',38.9),
('dot','DOT','crypto',7.85),
('matic','MATIC','crypto',0.895),
('link','LINK','crypto',14.85),
('ltc','LTC','crypto',72.4),
('shib','SHIB','crypto',1.245e-05),
('uni','UNI','crypto',6.82),
('atom','ATOM','crypto',9.45),
('algo','ALGO','crypto',0.189),
('ftm','FTM','crypto',0.425),
('near','NEAR','crypto',3.85),
('icp','ICP','crypto',12.45),
('xlm','XLM','crypto',0.1285),
('vet','VET','crypto',0.0285),
('fil','FIL','crypto',5.85),
('hbar','HBAR','crypto',0.0785),
('apt','APT','crypto',9.25),
('arb','ARB','crypto',1.12),
('op','OP','crypto',2.45),
('inj','INJ','crypto',28.5),
('sui','SUI','crypto',1.45),
('sei','SEI','crypto',0.52),
('tia','TIA','crypto',12.85),
('aapl','AAPL','stock',255.25),
('msft','MSFT','stock',378.91),
('googl','GOOGL','stock',338.58),
('amzn','AMZN','stock',178.25),
('nvda','NVDA','stock',190.2),
('tsla','TSLA','stock',248.5),
('meta','META','stock',505.95),
('nflx','NFLX','stock',485.6),
('amd','AMD','stock',142.3),
('crm','CRM','stock',264.9),
('intc','INTC','stock',43.25),
('orcl','ORCL','stock',118.45),
('adbe','ADBE','stock',528.3),
('csco','CSCO','stock',52.8),
('avgo','AVGO','stock',1285.5),
('txn','TXN','stock',168.25),
('qcom','QCOM','stock',145.8),
('now','NOW','stock',742.5),
('ibm','IBM','stock',168.9),
('uber','UBER','stock',62.45),
('shop','SHOP','stock',78.5),
('snow','SNOW','stock',165.2),
('pltr','PLTR','stock',21.85),
('coin','COIN','stock',148.5),
('spot','SPOT','stock',285.4),
('sq','SQ','stock',68.25),
('pypl','PYPL','stock',62.8),
('twlo','TWLO','stock',68.5),
('docu','DOCU','stock',58.25),
('zm','ZM','stock',68.4),
('roku','ROKU','stock',68.25),
('net','NET','stock',85.4),
('ddog','DDOG','stock',128.5),
('mdb','MDB','stock',385.2),
('crwd','CRWD','stock',285.4),
('zs','ZS','stock',195.8),
('panw','PANW','stock',315.4),
('okta','OKTA','stock',98.5),
('wday','WDAY','stock',265.8),
('veev','VEEV','stock',195.4),
('jpm','JPM','stock',172.45),
('v','V','stock',275.8),
('ma','MA','stock',452.3),
('bac','BAC','stock',35.45),
('wfc','WFC','stock',48.25),
('gs','GS','stock',385.4),
('ms','MS','stock',92.5),
('unh','UNH','stock',528.4),
('jnj','JNJ','stock',158.25),
('pfe','PFE','stock',28.45),
('mrna','MRNA','stock',98.5),
('abbv','ABBV','stock',172.8),
('lly','LLY','stock',752.4),
('wmt','WMT','stock',165.8),
('cost','COST','stock',725.4),
('hd','HD','stock',358.25),
('low','LOW','stock',225.4),
('tgt','TGT','stock',142.8),
('sbux','SBUX','stock',98.5),
('mcd','MCD','stock',295.4),
('ko','KO','stock',62.45),
('pep','PEP','stock',172.8),
('dis','DIS','stock',108.5),
('nke','NKE','stock',98.25),
('xom','XOM','stock',108.5),
('cvx','CVX','stock',152.4),
('ba','BA','stock',218.5),
('cat','CAT','stock',295.8),
('de','DE','stock',398.5),
('spy','SPY','etf',478.25),
('qqq','QQQ','etf',405.9),
('iwm','IWM','etf',198.45),
('dia','DIA','etf',378.6),
('voo','VOO','etf',439.8),
('arkk','ARKK','etf',48.25),
('vti','VTI','etf',245.8),
('ivv','IVV','etf',482.5),
('agg','AGG','etf',98.5),
('ief','IEF','etf',95.8),
('tlt','TLT','etf',92.45),
('gld','GLD','etf',185.4),
('slv','SLV','etf',21.85),
('uso','USO','etf',72.5),
('xlf','XLF','etf',42.85),
('xlk','XLK','etf',195.4),
('xle','XLE','etf',85.4),
('xlv','XLV','etf',142.8),
('smh','SMH','etf',195.8),
('soxx','SOXX','etf',545.2),
('eurusd','EUR/USD','forex',1.0892),
('gbpusd','GBP/USD','forex',1.2685),
('usdjpy','USD/JPY','forex',148.52),
('usdchf','USD/CHF','forex',0.8745),
('audusd','AUD/USD','forex',0.6582),
('usdcad','USD/CAD','forex',1.3485),
('nzdusd','NZD/USD','forex',0.6145),
('eurgbp','EUR/GBP','forex',0.8585),
('eurjpy','EUR/JPY','forex',161.85),
('gbpjpy','GBP/JPY','forex',188.45),
('usdhkd','USD/HKD','forex',7.8245),
('usdsgd','USD/SGD','forex',1.3425),
('usdmxn','USD/MXN','forex',17.245),
('usdzar','USD/ZAR','forex',18.854),
('usdtry','USD/TRY','forex',32.485),
('gold','XAU','commodity',2024.5),
('silver','XAG','commodity',23.45),
('oil','WTI','commodity',78.25),
('natgas','NG','commodity',2.85),
('copper','HG','commodity',3.82),
('platinum','XPT','commodity',985.4),
('palladium','XPD','commodity',1025.8),
('brent','BRENT','commodity',82.45),
('wheat','ZW','commodity',585.4),
('corn','ZC','commodity',445.8),
('soybean','ZS','commodity',1185.4),
('coffee','KC','commodity',185.4),
('sugar','SB','commodity',21.45),
('cotton','CT','commodity',78.25),
('aluminum','ALI','commodity',2245.8);
COMMIT;
