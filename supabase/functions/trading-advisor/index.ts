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
    const { message, portfolio, assets } = await req.json();
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

    const systemPrompt = `You are a friendly trading mentor for TradeSandbox, a simulated trading platform.

IMPORTANT FORMATTING RULES:
- Always respond in ONE single paragraph
- Never use markdown formatting like bold, italics, bullet points, or numbered lists
- Never use asterisks, underscores, or any special formatting characters
- Keep your tone warm, friendly, and conversational like talking to a friend
- Be concise and direct in your explanations

Your role:
- Give realistic, educational advice about trading stocks, ETFs, crypto, and commodities
- Explain risks and rewards in simple everyday language
- Consider the user's portfolio when giving advice
- Be encouraging but honest about market realities
- Explain trading concepts simply without jargon

User's Portfolio Summary:
Total Value: $${portfolio?.totalValue?.toFixed(2) || '10,000.00'}, Cash: $${portfolio?.cash?.toFixed(2) || '10,000.00'}, Positions: ${portfolio?.positions?.length || 0}
${portfolio?.positions?.map((p: any) => `${p.asset.symbol}: ${p.quantity} shares @ $${p.asset.price.toFixed(2)} (P&L: ${p.profitLoss >= 0 ? '+' : ''}$${p.profitLoss.toFixed(2)})`).join(', ') || 'No positions yet'}

Available Assets: ${assets?.map((a: any) => `${a.symbol}: $${a.price.toFixed(2)} (${a.change >= 0 ? '+' : ''}${a.changePercent?.toFixed(2) || a.change?.toFixed(2)}%)`).join(', ') || 'Loading...'}`;

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
          { role: 'user', content: message }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI credits depleted. Please add credits to continue.' 
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
    console.error('Error in trading-advisor:', error);
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
