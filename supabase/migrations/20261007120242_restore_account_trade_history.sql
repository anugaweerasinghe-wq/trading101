-- Restore current-cycle server orders with each authorized account snapshot.
-- The private helper remains inaccessible to browser roles; existing wrappers authenticate auth.uid().
CREATE OR REPLACE FUNCTION tradehq_private.portfolio_snapshot(uid uuid) RETURNS jsonb
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT jsonb_build_object('cash',p.cash,'ranked',p.ranked,'cycle_id',p.cycle_id,'updated_at',p.updated_at,
  'trades',coalesce((SELECT jsonb_agg(to_jsonb(t) ORDER BY t.created_at DESC,t.id) FROM public.practice_trades t WHERE t.user_id=p.user_id AND t.cycle_id=p.cycle_id),'[]'::jsonb),
  'positions',coalesce((SELECT jsonb_agg(jsonb_build_object('asset_id',x.asset_id,'symbol',a.symbol,'asset_type',a.asset_type,
    'quantity',x.quantity,'avg_price',x.avg_price,'last_price',coalesce(m.price,a.simulator_price)))
    FROM public.practice_positions x JOIN public.practice_assets a USING(asset_id)
    LEFT JOIN public.market_prices m USING(asset_id) WHERE x.user_id=p.user_id),'[]'::jsonb))
 FROM public.practice_portfolios p WHERE p.user_id=uid;
$$;
