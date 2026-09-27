-- Retire historical leaderboard summaries that may include the old weekly
-- virtual-cash refill. Users can resync clean, refill-free browser portfolios.
UPDATE public.trader_stats
SET portfolio_value = 100000,
    pnl_pct = 0,
    trades = 0,
    win_rate = 0,
    max_drawdown = 0,
    updated_at = now();
