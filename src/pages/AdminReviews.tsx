import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Trash2, Eye, EyeOff, Star, Save } from "lucide-react";

interface Review {
  id: string;
  name: string | null;
  content: string;
  rating: number;
  is_visible: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function AdminReviews() {
  const [unlocked, setUnlocked] = useState(false);
  const [key, setKey] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [edits, setEdits] = useState<Record<string, Partial<Review>>>({});

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    const { data, error } = await supabase.functions.invoke("verify-admin-key", { body: { key } });
    setVerifying(false);
    if (error || !(data as { valid?: boolean })?.valid) {
      toast.error("Invalid master key");
      return;
    }
    setUnlocked(true);
    load();
  };

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-reviews", {
      body: { action: "list" },
      headers: { "x-admin-key": key },
    });
    setLoading(false);
    if (error || (data as { error?: string })?.error) {
      toast.error("Could not load reviews");
      return;
    }
    setReviews(((data as { data: Review[] })?.data) ?? []);
  };

  const patchField = (id: string, patch: Partial<Review>) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const save = async (id: string) => {
    const patch = edits[id];
    if (!patch) return;
    const { error } = await supabase.functions.invoke("admin-reviews", {
      body: { action: "update", id, patch },
      headers: { "x-admin-key": key },
    });
    if (error) {
      toast.error("Update failed");
      return;
    }
    toast.success("Saved");
    setEdits((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    const { error } = await supabase.functions.invoke("admin-reviews", {
      body: { action: "delete", id },
      headers: { "x-admin-key": key },
    });
    if (error) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Deleted");
    load();
  };

  if (!unlocked) {
    return (
      <>
        <Helmet>
          <title>Admin Reviews — TradeHQ</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <form onSubmit={verify} className="w-full max-w-sm space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold">Admin Reviews</h1>
            </div>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Master Key"
              className="w-full h-10 px-3 rounded-lg bg-input border border-border text-sm"
            />
            <button
              type="submit"
              disabled={verifying || !key.trim()}
              className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50"
            >
              {verifying ? "Verifying…" : "Unlock"}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Reviews — TradeHQ</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h1>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {reviews.map((r) => {
            const e = edits[r.id] ?? {};
            const merged = { ...r, ...e };
            return (
              <div key={r.id} className="p-4 rounded-xl border border-border bg-white/[0.02] space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                  <span className="font-mono">{r.id.slice(0, 8)}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={merged.name ?? ""}
                    onChange={(ev) => patchField(r.id, { name: ev.target.value })}
                    placeholder="(anonymous)"
                    className="h-9 px-3 rounded-lg bg-input border border-border text-sm"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">Rating</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={merged.rating}
                      onChange={(ev) => patchField(r.id, { rating: Number(ev.target.value) })}
                      className="w-16 h-9 px-2 rounded-lg bg-input border border-border text-sm"
                    />
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <textarea
                  value={merged.content}
                  onChange={(ev) => patchField(r.id, { content: ev.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm resize-y"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => patchField(r.id, { is_visible: !merged.is_visible })}
                    className={`text-xs px-3 py-1.5 rounded-lg border ${merged.is_visible ? "bg-primary/10 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border"}`}
                  >
                    {merged.is_visible ? <><Eye className="w-3 h-3 inline mr-1" />Visible</> : <><EyeOff className="w-3 h-3 inline mr-1" />Hidden</>}
                  </button>
                  <button
                    type="button"
                    onClick={() => patchField(r.id, { is_featured: !merged.is_featured })}
                    className={`text-xs px-3 py-1.5 rounded-lg border ${merged.is_featured ? "bg-yellow-400/10 text-yellow-500 border-yellow-400/30" : "bg-muted text-muted-foreground border-border"}`}
                  >
                    {merged.is_featured ? "★ Featured" : "☆ Feature"}
                  </button>
                  <button
                    type="button"
                    disabled={!edits[r.id]}
                    onClick={() => save(r.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 ml-auto"
                  >
                    <Save className="w-3 h-3 inline mr-1" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/30"
                  >
                    <Trash2 className="w-3 h-3 inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}