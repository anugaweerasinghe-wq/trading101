import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, holdings } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const heldList = Array.isArray(holdings) && holdings.length > 0
      ? holdings
          .map(
            (h: any) =>
              `${h.symbol} (${h.name}, type=${h.type}, qty=${h.quantity}, price=${h.currentPrice})`,
          )
          .join("; ")
      : "no current holdings";

    const systemPrompt = `You are a financial scenario parser for an EDUCATIONAL trading simulator.
The user describes a hypothetical market scenario in plain English. You extract:
1. Which assets are shocked and by what % (negative for drops, positive for gains).
2. The time horizon in days (default 30 if unspecified).
3. A short 2-sentence educational narrative describing the scenario and what beginners should learn.

Rules:
- If user names a sector ("tech stocks", "crypto"), expand to ALL relevant held symbols from this list: ${heldList}.
- If the named asset is NOT in the holdings, still include it in shocks (the engine will ignore it gracefully).
- shockPercent is the total expected move over the horizon (e.g. -30 means -30% by end).
- Keep narrative neutral, educational, and end with: "(Educational simulation only — not financial advice.)"
- confidence is 0-1 reflecting how clearly the prompt specified the shock.`;

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "parse_scenario",
                description: "Return structured shocks for the simulator.",
                parameters: {
                  type: "object",
                  properties: {
                    shocks: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          symbol: { type: "string" },
                          shockPercent: { type: "number" },
                          confidence: { type: "number" },
                        },
                        required: ["symbol", "shockPercent", "confidence"],
                        additionalProperties: false,
                      },
                    },
                    horizonDays: { type: "number" },
                    narrative: { type: "string" },
                  },
                  required: ["shocks", "horizonDays", "narrative"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "parse_scenario" },
          },
        }),
      },
    );

    if (aiResp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (aiResp.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, errText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(
        JSON.stringify({ error: "Could not parse scenario from prompt" }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("scenario-parser error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
