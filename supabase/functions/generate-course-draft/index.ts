import { createClient } from "npm:@supabase/supabase-js@2.75.1";
import { generateCourse, type GenerationClaim } from "../_shared/courseGenerator.ts";
import { checkCourseDemand } from "../_shared/courseDemandCheck.ts";
const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
Deno.serve(async req => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const token = req.headers.get("x-generation-token");
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return json({ error: "Unauthorized" }, 401);
  if (req.headers.get("x-course-check") === "search-demand") {
    // A separate purpose-bound claim consumes an expiring server-issued token.
    // Credentials come from Vault over a service-authenticated RPC, never the request.
    const { data: check, error: checkError } = await client.rpc("claim_course_demand_check", { p_token: token });
    if (checkError) return json({ error: "Connection check unavailable" }, 503);
    if (!check) return json({ error: "Unauthorized or check already consumed" }, 401);
    const result = await checkCourseDemand(check.credentials, check.property);
    const { data: saved, error: saveError } = await client.rpc("finish_course_demand_check", { p_lease: check.lease, p_result: result });
    if (saveError || !saved) return json({ error: "Could not save connection check" }, 503);
    return json(result);
  }
  const { data, error } = await client.rpc("claim_course_generation", { p_token: token });
  if (error) return json({ error: "Generation service unavailable" }, 503);
  if (!data) return json({ error: "Unauthorized or generation already running" }, 401);
  const claim = data as GenerationClaim;
  try {
    const { document, research } = await generateCourse(claim);
    const { data: finished, error: finishError } = await client.rpc("finish_course_generation", {
      p_lease: claim.lease, p_document: document, p_research: research, p_error: null,
    });
    if (finishError || !finished) throw new Error("Could not save the draft. Check the generation status.");
    return json({ ok: true, status: "awaiting_owner_review" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";
    // Provider responses, prompts and credentials are never logged or echoed.
    await client.rpc("finish_course_generation", { p_lease: claim.lease, p_document: null, p_research: null, p_error: message.slice(0, 1000) });
    return json({ ok: false, status: "paused", error: message.slice(0, 1000) });
  }
});
