-- Isolated PostgreSQL fixtures only, loaded immediately before the snapshot migration.
INSERT INTO auth.users(id,email,raw_user_meta_data) VALUES
('00000000-0000-4000-8000-000000000471','previous-public@example.invalid','{"username":"previous_public"}'),
('00000000-0000-4000-8000-000000000472','previous-private@example.invalid','{"username":"previous_private"}'),
('00000000-0000-4000-8000-000000000473','previous-short@example.invalid','{"username":"previous_short"}');
UPDATE public.profiles SET is_public=false WHERE id='00000000-0000-4000-8000-000000000472';
UPDATE public.trader_stats SET trades=8,portfolio_value=105000,pnl_pct=5 WHERE user_id='00000000-0000-4000-8000-000000000471';
UPDATE public.trader_stats SET trades=9,portfolio_value=109000,pnl_pct=9 WHERE user_id='00000000-0000-4000-8000-000000000472';
UPDATE public.trader_stats SET trades=1 WHERE user_id='00000000-0000-4000-8000-000000000473';
