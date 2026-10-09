import { createClient } from "npm:@supabase/supabase-js@2.75.1";
import { createCourseAdminHandler } from "../_shared/courseAdmin.ts";
import { validateCourseDocument } from "../_shared/courseDocument.ts";
import { clientIp, allow } from "../_shared/rateLimit.ts";

const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
async function rpc(name: string, args: Record<string, unknown>) {
  const { data, error } = await client.rpc(name, args);
  if (error) throw new Error(error.message);
  return data;
}
Deno.serve(createCourseAdminHandler({
  getKey: () => Deno.env.get("ADMIN_MASTER_KEY"),
  rateLimit: async req => await allow("course-admin-global", "course-admin-global", 300, 60)
    && await allow("course-admin:" + clientIp(req), "course-admin", 300, 30),
  store: {
    settings: () => rpc("course_generation_status", {}),
    configure: settings => rpc("configure_course_generation", { p_settings: settings }),
    run: () => rpc("request_course_generation", { p_force: true }),
    async list() {
      const { data, error } = await client.from("course_drafts")
        .select("id,status,revision,published_revision,document,research,created_at,updated_at,reviewed_at")
        .order("created_at", { ascending: false }).limit(200);
      if (error) throw error;
      return data ?? [];
    },
    save: (id, revision, document) => rpc("save_course_draft", { p_id: id, p_revision: revision, p_document: document }),
    async publish(id, revision, reviewer) {
      const { data, error } = await client.from("course_drafts").select("document").eq("id", id).single();
      if (error) throw error;
      const errors = validateCourseDocument(data.document, true);
      if (errors.length) throw new Error("Course is incomplete: " + errors.join(" "));
      return rpc("publish_course_draft", { p_id: id, p_revision: revision, p_reviewer: reviewer });
    },
    reject: (id, revision) => rpc("reject_course_draft", { p_id: id, p_revision: revision }),
  },
}));
