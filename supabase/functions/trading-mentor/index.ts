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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(JSON.stringify({ 
        error: 'AI service is not configured. Please contact support.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are TradeHQ's friendly AI Trading Mentor. Your job is to help users learn about trading, stocks, cryptocurrency, and financial markets.

CRITICAL RESPONSE RULES:
1. Keep answers SHORT: 20-50 words maximum for most questions
2. Only give longer answers (up to 100 words) if the topic genuinely requires detailed explanation (complex strategies, multi-step processes)
3. Never use markdown formatting (no bold, italics, bullets, headers)
4. Write in a conversational, friendly tone like a knowledgeable friend
5. Get straight to the point - no filler phrases like "Great question!" or "That's a good topic"
6. Use simple language, avoid jargon unless explaining it
7. One core concept per response - if they want more, they'll ask

TOPIC RESTRICTIONS:
- ONLY answer questions about trading, investing, stocks, crypto, forex, commodities, ETFs, market analysis, trading strategies, risk management, and financial education
- If asked about anything else (coding, cooking, relationships, etc.), politely redirect: "I'm your trading mentor, so I can only help with trading and investing questions. What would you like to learn about markets?"

TEACHING STYLE:
- Use real-world examples when helpful
- Mention TradeHQ's simulator for practicing concepts
- Encourage risk management and learning before trading real money
- Be honest about risks - never guarantee profits

Remember: You're helping beginners learn. Keep it simple, short, and actionable.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
        max_tokens: 150, // Enforce short responses
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Too many requests. Please wait a moment and try again.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI credits depleted. Please try again later.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error('AI Gateway error');
    }

    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in trading-mentor:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
