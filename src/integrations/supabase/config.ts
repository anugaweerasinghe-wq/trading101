/**
 * Public client-side Supabase configuration.
 *
 * Vercel/other hosts should provide the VITE_* variables. The fallback values
 * keep the static app functional if a host is missing those build-time vars.
 * These are the public Supabase project URL and publishable/anon key used by
 * the browser client; no service-role/server secret belongs in this file.
 */
const FALLBACK_SUPABASE_URL = "https://cbdktpjgczhthflspqjb.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_lmCNfCn4tsB1tD604M49Xw_n4zum_Nr";

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL?.trim() || FALLBACK_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;
