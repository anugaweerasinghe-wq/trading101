import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const key = req.headers.get("x-admin-key");
    const masterKey = Deno.env.get("ADMIN_MASTER_KEY");
    if (!masterKey || key !== masterKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { action, id, patch } = await req.json();

    if (action === "list") {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update") {
      const allowed: Record<string, unknown> = {};
      if (typeof patch?.content === "string") allowed.content = patch.content.trim().slice(0, 1000);
      if (typeof patch?.name === "string") allowed.name = patch.name.trim().slice(0, 60) || null;
      if (typeof patch?.rating === "number") allowed.rating = Math.max(1, Math.min(5, patch.rating));
      if (typeof patch?.is_visible === "boolean") allowed.is_visible = patch.is_visible;
      if (typeof patch?.is_featured === "boolean") allowed.is_featured = patch.is_featured;
      allowed.updated_at = new Date().toISOString();
      const { error } = await supabase.from("reviews").update(allowed).eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});