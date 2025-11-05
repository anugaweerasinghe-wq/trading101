import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { trades, emotionalBreakdown } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are an expert trading psychology analyst. Analyze the trader's journal entries and provide insights on their emotional patterns, strengths, weaknesses, and recommendations for improvement.

Focus on:
1. Emotional patterns and their correlation with trade outcomes
2. Common psychological mistakes (FOMO, revenge trading, overconfidence, etc.)
3. Strengths in decision-making
4. Specific actionable recommendations

Return your analysis in this exact JSON format:
{
  "totalTrades": number,
  "emotionalPatterns": [
    {
      "emotion": "string",
      "winRate": number,
      "avgProfit": number,
      "frequency": number,
      "recommendation": "string"
    }
  ],
  "mostSuccessfulEmotion": "string",
  "leastSuccessfulEmotion": "string",
  "commonMistakes": ["string"],
  "strengths": ["string"],
  "aiInsights": "string (2-3 paragraphs of detailed analysis)"
}`;

    const userPrompt = `Analyze these trades:

${JSON.stringify(trades, null, 2)}

Emotional breakdown:
${JSON.stringify(emotionalBreakdown, null, 2)}

Provide detailed psychological analysis and actionable recommendations.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    const analysis = JSON.parse(analysisText);

    return new Response(JSON.stringify({
      ...analysis,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
