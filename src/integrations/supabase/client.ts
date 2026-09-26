// Only public client configuration belongs here. Never put a service-role or secret key in VITE_* variables.
// Access is enforced by server authorization and database RLS, not by hiding this anon key.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://bpzedtifdjbfrojlkano.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwemVkdGlmZGpiZnJvamxrYW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDU3NzAsImV4cCI6MjA3NjQ4MTc3MH0.7LzlcE59SijTpe2mXKE4t-3JnqHyGf9rTWzmOjI8Ce4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  }
});