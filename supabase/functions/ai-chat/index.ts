import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  system?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

const DEFAULT_SYSTEM = `You are TradeHQ's AI Trading Mentor — friendly, concise, expert. Rules:
- Keep answers under 120 words unless complex.
- No markdown headers, no bullet asterisks. Plain conversational prose with line breaks.
- Only discuss trading, investing, markets, risk, psychology. Politely redirect off-topic.
- Always end with: (Educational simulation only — not financial advice.)
- Never give specific buy/sell signals or guarantees.`;

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
        systemInstruction: { parts: [{ text: req.system ?? DEFAULT_SYSTEM }] },
        contents,
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
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
    { role: "system", content: req.system ?? DEFAULT_SYSTEM },
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
      temperature: 0.7,
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
    { role: "system", content: req.system ?? DEFAULT_SYSTEM },
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
    const body: ChatRequest = await req.json();
    if (!body?.message || typeof body.message !== "string" || body.message.length > 4000) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (e) {
        lastErr = `${p.name}: ${(e as Error).message}`;
        console.warn("AI provider failed", lastErr);
      }
    }

    return new Response(JSON.stringify({ error: "All AI providers failed", detail: lastErr }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});