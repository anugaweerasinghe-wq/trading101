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
    const { assets, timeframe } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Analyzing market trends for assets:', assets.map((a: any) => a.symbol));

    // Build a detailed prompt for market analysis
    const assetDetails = assets.map((asset: any) => 
      `${asset.symbol} (${asset.name}): Current price $${asset.price.toFixed(2)}, Type: ${asset.type}, 24h Change: ${asset.changePercent.toFixed(2)}%`
    ).join('\n');

    const prompt = `You are a financial market analyst. Analyze the following assets and provide realistic price movement predictions for the next ${timeframe} days.

Current Assets:
${assetDetails}

Consider:
1. Historical performance patterns for each asset type (stocks, ETFs, crypto, commodities)
2. Market volatility and typical price ranges
3. Correlation between assets
4. Realistic growth/decline scenarios
5. Seasonal trends and market cycles

For EACH asset, provide:
- Expected daily volatility (as a percentage, e.g., 2.5 means 2.5% daily volatility)
- Trend direction (bullish, bearish, or neutral)
- Annual expected return (as a percentage)
- Risk level (low, medium, high)

Be realistic - most stocks don't grow 1000% per year. Crypto is more volatile than stocks. ETFs are more stable. Use historical market data knowledge.

Return ONLY a JSON array with this exact structure:
[
  {
    "symbol": "BTC",
    "dailyVolatility": 3.5,
    "trend": "bullish",
    "annualReturn": 45.0,
    "riskLevel": "high"
  }
]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a financial analyst providing realistic market predictions based on historical data and market trends. Always return valid JSON arrays.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI Response:', content);

    // Extract JSON from the response (handle markdown code blocks)
    let predictions;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        predictions = JSON.parse(jsonMatch[0]);
      } else {
        predictions = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse market analysis');
    }

    console.log('Parsed predictions:', predictions);

    return new Response(
      JSON.stringify({ predictions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in market-analysis:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
