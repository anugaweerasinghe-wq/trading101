import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, Save, Plus, FileText, Trash2 } from "lucide-react";

export default function AdminEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterKey, setMasterKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  // Article form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [focusAsset, setFocusAsset] = useState("");
  const [sentiment, setSentiment] = useState<"Bullish" | "Bearish" | "Neutral">("Neutral");
  const [isSaving, setIsSaving] = useState(false);

  // Articles list
  const [articles, setArticles] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const verifyKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin-key`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: masterKey }),
        }
      );
      const result = await resp.json();
      if (result.valid) {
        setIsAuthenticated(true);
        loadArticles();
      } else {
        toast({ title: "Access Denied", description: "Invalid master key.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Verification failed.", variant: "destructive" });
    } finally {
      setIsVerifying(false);
    }
  };

  const loadArticles = async () => {
    const { data } = await supabase
      .from('market_articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setArticles(data);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim() || !focusAsset.trim()) {
      toast({ title: "Missing Fields", description: "All fields are required.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('market_articles')
          .update({ title, slug: slug.toLowerCase(), content, focus_asset: focusAsset.toLowerCase(), sentiment, updated_at: new Date().toISOString() })
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: "Updated", description: "Article updated successfully." });
      } else {
        const { error } = await supabase
          .from('market_articles')
          .insert({ title, slug: slug.toLowerCase(), content, focus_asset: focusAsset.toLowerCase(), sentiment });
        if (error) throw error;
        toast({ title: "Published", description: "Article published successfully." });
      }
      resetForm();
      loadArticles();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Save failed.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setTitle(""); setSlug(""); setContent(""); setFocusAsset(""); setSentiment("Neutral"); setEditingId(null);
  };

  const editArticle = (a: any) => {
    setEditingId(a.id);
    setTitle(a.title);
    setSlug(a.slug);
    setContent(a.content);
    setFocusAsset(a.focus_asset);
    setSentiment(a.sentiment);
  };

  const deleteArticle = async (id: string) => {
    // Need authenticated user or service role for delete - using direct approach
    toast({ title: "Info", description: "Delete requires service role access. Remove via backend." });
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!editingId) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  }, [title, editingId]);

  if (!isAuthenticated) {
    return (
      <>
        <Helmet><title>Admin Editor — TradeHQ</title></Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <form onSubmit={verifyKey} className="w-full max-w-sm space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]" style={{ backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-[hsl(var(--neon))]" />
              <h1 className="text-lg font-bold text-foreground">Admin Access</h1>
            </div>
            <input
              type="password"
              value={masterKey}
              onChange={e => setMasterKey(e.target.value)}
              placeholder="Enter Master Key"
              className="w-full h-10 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full h-10 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Unlock Editor'}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>CMS Editor — TradeHQ</title></Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-[hsl(var(--neon))]" />
              Market Articles CMS
            </h1>
            <button onClick={resetForm} className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-foreground hover:bg-white/[0.08] flex items-center gap-1">
              <Plus className="w-3 h-3" /> New Article
            </button>
          </div>

          {/* Editor Form */}
          <form onSubmit={handleSave} className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]" style={{ backdropFilter: 'blur(12px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Slug</label>
                <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Focus Asset (e.g. btc, aapl)</label>
                <input value={focusAsset} onChange={e => setFocusAsset(e.target.value)} className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Sentiment</label>
                <select value={sentiment} onChange={e => setSentiment(e.target.value as any)} className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none">
                  <option value="Bullish">Bullish</option>
                  <option value="Bearish">Bearish</option>
                  <option value="Neutral">Neutral</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Content (Markdown)</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] resize-y"
                placeholder="# Article Title&#10;&#10;Write your analysis in Markdown..."
              />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="h-9 px-5 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {isSaving ? 'Saving...' : editingId ? 'Update Article' : 'Publish Article'}
            </button>
          </form>

          {/* Articles List */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Published Articles ({articles.length})</h2>
            {articles.map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground">{a.focus_asset.toUpperCase()} · {a.sentiment} · {new Date(a.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editArticle(a)} className="text-xs px-2 py-1 rounded-md bg-white/[0.05] text-foreground hover:bg-white/[0.1]">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
