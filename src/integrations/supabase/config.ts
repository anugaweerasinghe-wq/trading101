/**
 * Public client-side Supabase configuration.
 *
 * Vercel/other hosts should provide the VITE_* variables. The fallback values
 * keep the static app functional if a host is missing those build-time vars.
 * These are the public Supabase project URL and publishable/anon key used by
 * the browser client; no service-role/server secret belongs in this file.
 */
const FALLBACK_SUPABASE_URL = "https://bpzedtifdjbfrojlkano.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwemVkdGlmZGpiZnJvamxrYW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDU3NzAsImV4cCI6MjA3NjQ4MTc3MH0.7LzlcE59SijTpe2mXKE4t-3JnqHyGf9rTWzmOjI8Ce4";

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL?.trim() || FALLBACK_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;
