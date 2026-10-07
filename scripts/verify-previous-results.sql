BEGIN;
SET LOCAL ROLE anon;
DO $$ BEGIN
 IF (SELECT count(*) FROM public.get_previous_practice_results())<>1 THEN RAISE EXCEPTION 'Legacy public/activity filter failed'; END IF;
 IF has_table_privilege(current_user,'tradehq_private.previous_practice_results','SELECT') THEN RAISE EXCEPTION 'Raw snapshot exposed'; END IF;
 IF has_table_privilege(current_user,'tradehq_private.previous_practice_results','UPDATE') THEN RAISE EXCEPTION 'Snapshot writable'; END IF;
 IF (SELECT trades FROM public.get_previous_practice_results())<>8 THEN RAISE EXCEPTION 'Original count lost'; END IF;
END; $$;
RESET ROLE;
UPDATE public.trader_stats SET trades=0,portfolio_value=100000,pnl_pct=0 WHERE user_id='00000000-0000-4000-8000-000000000471';
DO $$ BEGIN
 IF (SELECT portfolio_value FROM public.get_previous_practice_results())<>105000 THEN RAISE EXCEPTION 'New summaries overwrote previous results'; END IF;
 IF EXISTS(SELECT 1 FROM public.get_cloud_leaderboard()) THEN RAISE EXCEPTION 'Previous result leaked into server-ranked board'; END IF;
END; $$;
UPDATE public.profiles SET is_public=false WHERE id='00000000-0000-4000-8000-000000000471';
SET LOCAL ROLE anon;
DO $$ BEGIN
 IF EXISTS(SELECT 1 FROM public.get_previous_practice_results()) THEN RAISE EXCEPTION 'Private historical result exposed'; END IF;
END; $$;
RESET ROLE;
SELECT 'Previous results passed: frozen values, public/activity filter, raw/write denial, private opt-out, separate ranked board' AS verification;
ROLLBACK;
