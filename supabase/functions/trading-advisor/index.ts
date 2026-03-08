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
    const { message, portfolio, assets, selectedAsset } = await req.json();
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
    const wins = sellTrades.filter((t: any, _i: number, arr: any[]) => {
      const buys = trades.filter((bt: any) => bt.assetId === t.assetId && bt.type === 'buy' && bt.timestamp < t.timestamp);
      if (buys.length === 0) return false;
      return t.price > buys[buys.length - 1].price;
    });
    const winRate = sellTrades.length > 0 ? ((wins.length / sellTrades.length) * 100).toFixed(1) : 'N/A';
    
    // Recent trades summary (last 10)
    const recentTrades = trades.slice(0, 10).map((t: any) => 
      `${t.type.toUpperCase()} ${t.quantity?.toFixed(4) || '?'} ${t.assetId?.toUpperCase() || '?'} @ $${t.price?.toFixed(2) || '?'}`
    ).join('; ');

    // Positions summary
    const positionsSummary = positions.map((p: any) => {
      const pnl = p.profitLoss ?? 0;
      const pnlPct = p.profitLossPercent ?? 0;
      return `${p.asset?.symbol || '?'}: ${p.quantity?.toFixed(4) || '?'} units, avg $${p.averagePrice?.toFixed(2) || '?'}, P&L ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)} (${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(1)}%)`;
    }).join('; ');

    // Currently viewing asset
    const viewingAsset = selectedAsset 
      ? `Currently viewing: ${selectedAsset.symbol} at $${selectedAsset.price?.toFixed(2)}, 24h change: ${selectedAsset.changePercent?.toFixed(2)}%`
      : '';

    const systemPrompt = `You are TradeHQ's Neural AI Trading Mentor with FULL access to the user's portfolio data. You can answer any question about their portfolio, positions, trades, and performance.

USER PORTFOLIO SNAPSHOT:
- Total Value: $${totalValue.toFixed(2)}
- Available Cash: $${cash.toFixed(2)}
- Open Positions: ${positions.length}
- Total Trades: ${trades.length}
- Win Rate: ${winRate}${winRate !== 'N/A' ? '%' : ''} (${wins.length} wins / ${sellTrades.length} sells)
${positionsSummary ? `\nPOSITIONS:\n${positionsSummary}` : '\nNo open positions.'}
${recentTrades ? `\nRECENT TRADES:\n${recentTrades}` : '\nNo trade history.'}
${viewingAsset ? `\n${viewingAsset}` : ''}

RESPONSE RULES:
1. Keep answers SHORT: 2-4 sentences max for simple questions, up to 6 for complex portfolio analysis
2. Never use markdown formatting (no bold, italics, bullets, headers)
3. Sound like a knowledgeable trading coach, not a textbook
4. When asked about their portfolio, reference REAL data from above
5. Provide actionable insights based on their actual positions and performance
6. If win rate is low, gently suggest risk management improvements
7. If portfolio is concentrated, suggest diversification
8. Always remind this is a simulator for educational purposes
9. ONLY discuss trading/investing topics. Redirect off-topic questions politely.

PORTFOLIO ANALYSIS CAPABILITIES:
- You can calculate and discuss their best/worst performing positions
- You can analyze their trading patterns and suggest improvements
- You can assess portfolio diversification and risk exposure
- You can review their trade history and identify behavioral patterns`;

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
        max_tokens: 300,
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
