import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Lock, Save, Plus, FileText } from "lucide-react";

type Sentiment = "Bullish" | "Bearish" | "Neutral";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  focus_asset: string;
  sentiment: Sentiment;
  created_at: string;
  updated_at?: string | null;
}

interface VerifyResponse {
  valid: boolean;
}

interface AdminArticlesResponse {
  articles?: Article[];
  error?: string;
}

interface SaveArticleResponse {
  article?: Article;
  error?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function callAdminFunction<T>(
  path: string,
  masterKey: string,
  body?: Record<string, unknown>,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST"
): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      "x-admin-key": masterKey,
    },
    body: method === "GET" ? undefined : JSON.stringify(body ?? {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || `Request failed: ${response.status}`);
  }

  return data as T;
}

export default function AdminEditor() {
  const { toast } = useToast();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterKey, setMasterKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [focusAsset, setFocusAsset] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment>("Neutral");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  useEffect(() => {
    if (!isEditing) {
      setSlug(normalizeSlug(title));
    }
  }, [title, isEditing]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setContent("");
    setFocusAsset("");
    setSentiment("Neutral");
  };

  const loadArticles = async (keyOverride?: string) => {
    const keyToUse = keyOverride ?? masterKey;
    if (!keyToUse) return;

    setIsLoadingArticles(true);
    try {
      const result = await callAdminFunction<AdminArticlesResponse>(
        "admin-market-articles-list",
        keyToUse,
        {},
        "POST"
      );

      setArticles(result.articles ?? []);
    } catch (error: any) {
      toast({
        title: "Failed to load articles",
        description: error.message || "Could not fetch articles.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingArticles(false);
    }
  };

  const verifyKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const result = await callAdminFunction<VerifyResponse>(
        "verify-admin-key",
        masterKey,
        { key: masterKey },
        "POST"
      );

      if (!result.valid) {
        toast({
          title: "Access denied",
          description: "Invalid master key.",
          variant: "destructive",
        });
        return;
      }

      setIsUnlocked(true);
      await loadArticles(masterKey);

      toast({
        title: "Access granted",
        description: "CMS unlocked successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Unable to verify master key.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanSlug = normalizeSlug(slug || title);
    const cleanContent = content.trim();
    const cleanAsset = focusAsset.trim().toLowerCase();

    if (!cleanTitle || !cleanSlug || !cleanContent || !cleanAsset) {
      toast({
        title: "Missing fields",
        description: "Title, slug, content, and focus asset are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const result = await callAdminFunction<SaveArticleResponse>(
        isEditing ? "admin-market-articles-update" : "admin-market-articles-create",
        masterKey,
        {
          id: editingId,
          title: cleanTitle,
          slug: cleanSlug,
          content: cleanContent,
          focus_asset: cleanAsset,
          sentiment,
        },
        "POST"
      );

      toast({
        title: isEditing ? "Article updated" : "Article published",
        description: isEditing
          ? "Your article was updated successfully."
          : "Your article was published successfully.",
      });

      resetForm();
      await loadArticles();

      if (result.article) {
        console.log("Saved article:", result.article);
      }
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message || "Unable to save article.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const editArticle = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setSlug(article.slug);
    setContent(article.content);
    setFocusAsset(article.focus_asset);
    setSentiment(article.sentiment);
  };

  if (!isUnlocked) {
    return (
      <>
        <Helmet>
          <title>Admin Editor — TradeHQ</title>
        </Helmet>

        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <form
            onSubmit={verifyKey}
            className="w-full max-w-sm space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-[hsl(var(--neon))]" />
              <h1 className="text-lg font-bold text-foreground">Admin Access</h1>
            </div>

            <input
              type="password"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              placeholder="Enter Master Key"
              autoComplete="current-password"
              className="w-full h-10 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
            />

            <button
              type="submit"
              disabled={isVerifying || !masterKey.trim()}
              className="w-full h-10 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Unlock Editor"}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>CMS Editor — TradeHQ</title>
      </Helmet>

      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-[hsl(var(--neon))]" />
              Market Articles CMS
            </h1>

            <button
              onClick={resetForm}
              type="button"
              className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-foreground hover:bg-white/[0.08] flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              New Article
            </button>
          </div>

          <form
            onSubmit={handleSave}
            className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(normalizeSlug(e.target.value))}
                  className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Focus Asset (e.g. btc, aapl)
                </label>
                <input
                  value={focusAsset}
                  onChange={(e) => setFocusAsset(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Sentiment</label>
                <select
                  value={sentiment}
                  onChange={(e) => setSentiment(e.target.value as Sentiment)}
                  className="w-full h-9 px-3 rounded-lg bg-[hsl(var(--input))] border border-border text-foreground text-sm focus:outline-none"
                >
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
                onChange={(e) => setContent(e.target.value)}
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
              {isSaving ? "Saving..." : isEditing ? "Update Article" : "Publish Article"}
            </button>
          </form>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Published Articles ({articles.length})
            </h2>

            {isLoadingArticles ? (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-muted-foreground">
                Loading articles...
              </div>
            ) : (
              articles.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {a.focus_asset.toUpperCase()} · {a.sentiment} ·{" "}
                      {new Date(a.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editArticle(a)}
                      className="text-xs px-2 py-1 rounded-md bg-white/[0.05] text-foreground hover:bg-white/[0.1]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
