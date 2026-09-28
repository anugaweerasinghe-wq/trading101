import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { consumeRateLimit, decodeJwtSubject, getBearerToken } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

const DEFAULT_SYSTEM = `You are TradeHQ's educational market mentor. Be concise and factual.
- Discuss market mechanics, investing concepts, risk, psychology, and the TradeHQ simulator.
- Do not provide personalized buy/sell instructions, allocations, price targets, guarantees, or expected-return promises.
- Distinguish hypothetical examples from observed facts.
- Keep answers under 120 words unless the concept genuinely needs more context.
- End with: (Educational simulation only — not financial advice.)`;

function cleanHistory(value: unknown): ChatRequest["history"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) =>
      item &&
      (item.role === "user" || item.role === "assistant") &&
      typeof item.content === "string"
    )
    .slice(-8)
    .map((item) => ({
      role: item.role as "user" | "assistant",
      content: item.content.trim().slice(0, 1200),
    }))
    .filter((item) => item.content.length > 0);
}

async function tryGeminiDirect(req: ChatRequest, key: string): Promise<string> {
  const contents = [
    ...(req.history ?? []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: req.message }] },
  ];
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: DEFAULT_SYSTEM }] },
        contents,
        generationConfig: { maxOutputTokens: 400, temperature: 0.5 },
      }),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("gemini empty");
  return text;
}

async function tryGroq(req: ChatRequest, key: string): Promise<string> {
  const messages = [
    { role: "system", content: DEFAULT_SYSTEM },
    ...(req.history ?? []),
    { role: "user", content: req.message },
  ];
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 400,
      temperature: 0.5,
    }),
  });
  if (!res.ok) throw new Error(`groq ${res.status}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("groq empty");
  return text;
}

async function tryLovable(req: ChatRequest, key: string): Promise<string> {
  const messages = [
    { role: "system", content: DEFAULT_SYSTEM },
    ...(req.history ?? []),
    { role: "user", content: req.message },
  ];
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages,
      max_tokens: 400,
      temperature: 0.5,
    }),
  });
  if (!res.ok) throw new Error(`lovable ${res.status}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("lovable empty");
  return text;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const token = getBearerToken(req);
    const userId = token ? decodeJwtSubject(token) : null;
    if (!userId) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const burst = await consumeRateLimit("ai-chat:5m", userId, 15, 300);
    if (!burst.allowed) {
      return new Response(JSON.stringify({ error: "Too many mentor requests. Please try again shortly." }), {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(burst.retryAfterSeconds),
        },
      });
    }

    const daily = await consumeRateLimit("ai-chat:day", userId, 120, 86400);
    if (!daily.allowed) {
      return new Response(JSON.stringify({ error: "Daily mentor request limit reached." }), {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(daily.retryAfterSeconds),
        },
      });
    }

    const raw = await req.json();
    const message = typeof raw?.message === "string" ? raw.message.trim() : "";
    if (!message || message.length > 2000) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: ChatRequest = {
      message,
      history: cleanHistory(raw?.history),
    };

    const gemini = Deno.env.get("GEMINI_API_KEY");
    const groq = Deno.env.get("GROQ_API_KEY");
    const lovable = Deno.env.get("LOVABLE_API_KEY");

    const providers: { name: string; run: () => Promise<string> }[] = [];
    if (gemini) providers.push({ name: "gemini", run: () => tryGeminiDirect(body, gemini) });
    if (groq) providers.push({ name: "groq", run: () => tryGroq(body, groq) });
    if (lovable) providers.push({ name: "lovable", run: () => tryLovable(body, lovable) });

    let lastErr = "no providers configured";
    for (const p of providers) {
      try {
        const text = await p.run();
        return new Response(JSON.stringify({ text, provider: p.name }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": String(Math.min(burst.remaining, daily.remaining)),
          },
        });
      } catch (e) {
        lastErr = `${p.name}: ${(e as Error).message}`;
        console.warn("AI provider failed", lastErr);
      }
    }

    console.error("All AI providers failed", lastErr);
    return new Response(JSON.stringify({ error: "Mentor service is temporarily unavailable" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-chat error", e);
    return new Response(JSON.stringify({ error: "Mentor service is temporarily unavailable" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
