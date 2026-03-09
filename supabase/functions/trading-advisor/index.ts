import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, portfolio, assets, selectedAsset, conversationHistory } = await req.json();
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

    // Build rich portfolio context
    const cash = portfolio?.cash ?? 10000;
    const totalValue = portfolio?.totalValue ?? 10000;
    const positions = portfolio?.positions || [];
    const trades = portfolio?.trades || [];
    
    // Calculate win/loss stats
    const sellTrades = trades.filter((t: any) => t.type === 'sell');
    const wins = sellTrades.filter((t: any) => {
      const buys = trades.filter((bt: any) => bt.assetId === t.assetId && bt.type === 'buy' && bt.timestamp < t.timestamp);
      if (buys.length === 0) return false;
      return t.price > buys[buys.length - 1].price;
    });
    const winRate = sellTrades.length > 0 ? ((wins.length / sellTrades.length) * 100).toFixed(1) : 'N/A';
    
    // Detailed trades with entry/exit context
    const recentTrades = trades.slice(0, 20).map((t: any) => {
      const parts = [
        `${t.type.toUpperCase()} ${t.quantity?.toFixed(4) || '?'} ${t.assetId?.toUpperCase() || '?'}`,
        `@ $${t.price?.toFixed(2) || '?'}`,
        t.timestamp ? `on ${new Date(t.timestamp).toLocaleDateString()}` : '',
      ];
      if (t.journal?.reasoning) parts.push(`(Rationale: "${t.journal.reasoning}")`);
      return parts.filter(Boolean).join(' ');
    }).join('\n');

    // Positions with ENTRY PRICE clearly labeled
    const positionsSummary = positions.map((p: any) => {
      const pnl = p.profitLoss ?? 0;
      const pnlPct = p.profitLossPercent ?? 0;
      const currentPrice = p.asset?.price?.toFixed(2) || '?';
      const entryPrice = p.averagePrice?.toFixed(2) || '?';
      return `${p.asset?.symbol || '?'}: ${p.quantity?.toFixed(4) || '?'} units | ENTRY PRICE: $${entryPrice} | CURRENT PRICE: $${currentPrice} | P&L: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)} (${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(1)}%)`;
    }).join('\n');

    // Currently viewing asset
    const viewingAsset = selectedAsset 
      ? `Currently viewing: ${selectedAsset.symbol} (${selectedAsset.name}) at $${selectedAsset.price?.toFixed(2)}, 24h change: ${selectedAsset.changePercent?.toFixed(2)}%`
      : '';

    const systemPrompt = `You are TradeHQ's Neural AI Trading Mentor with FULL, LIVE access to the user's personal portfolio data below. You MUST reference this real data when answering portfolio questions. Never say you don't have access to their data.

═══ USER'S LIVE PORTFOLIO ═══
Total Portfolio Value: $${totalValue.toFixed(2)}
Available Cash: $${cash.toFixed(2)}
Invested Amount: $${(totalValue - cash).toFixed(2)}
Open Positions: ${positions.length}
Total Trades Executed: ${trades.length}
Win Rate: ${winRate}${winRate !== 'N/A' ? '%' : ''} (${wins.length} wins / ${sellTrades.length} closed trades)

${positions.length > 0 ? `═══ OPEN POSITIONS (with Entry Prices) ═══\n${positionsSummary}` : '═══ NO OPEN POSITIONS ═══\nThe user has not bought any assets yet.'}

${trades.length > 0 ? `═══ TRADE HISTORY (most recent first) ═══\n${recentTrades}` : '═══ NO TRADE HISTORY ═══\nThe user has not made any trades yet.'}

${viewingAsset ? `═══ CURRENTLY VIEWING ═══\n${viewingAsset}` : ''}

═══ RESPONSE RULES ═══
1. When asked about portfolio, positions, entry price, P&L, trades — ALWAYS quote the EXACT numbers from above
2. If asked "what's my entry price for X?" — look up the ENTRY PRICE field for that asset above
3. Keep answers 2-6 sentences. Be concise and actionable.
4. No markdown formatting (no bold, italics, bullets, headers)
5. Sound like a knowledgeable trading coach, not a textbook
6. If portfolio is empty, encourage the user to make their first trade
7. Provide risk management insights based on actual position sizes
8. Always remind this is a simulator for educational purposes
9. ONLY discuss trading/investing topics. Redirect off-topic questions politely.

═══ STRATEGIC RISK/REWARD ANALYSIS ═══
When analyzing ANY asset, ALWAYS provide a balanced "Strategic Risk/Reward Take":
- Structure: 50% Bull Case (Growth potential, catalysts, support levels) + 50% Bear Case (Key risks, resistance levels, headwinds)
- Tone: NEVER doom-post. Instead of "Why it will crash," say "Bear Case and Support Levels."
- Use language like "Key upside catalysts include..." and "Downside risks to monitor include..."
- Always mention key support/resistance levels when discussing price action
- End with a balanced conclusion: "Risk/Reward: [Favorable/Neutral/Cautious] at current levels"`;

    // Build message array with conversation history for context
    const aiMessages: { role: string; content: string }[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history if provided (last 10 messages for context)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const recent = conversationHistory.slice(-10);
      for (const msg of recent) {
        aiMessages.push({ role: msg.role, content: msg.content });
      }
    }

    // Add current message
    aiMessages.push({ role: 'user', content: message });

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: aiMessages,
        stream: true,
        max_tokens: 500,
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
