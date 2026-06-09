import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch all subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from("subscribers")
      .select("email");

    if (fetchError) throw new Error(`Failed to fetch subscribers: ${fetchError.message}`);
    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: "No subscribers found", sent: 0 }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = new Date();
    const weekOf = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;border:1px solid #1a1a1a;">
  <tr><td style="padding:40px 32px 24px;">
    <h1 style="margin:0 0 8px;font-size:28px;color:#e0f2fe;font-weight:700;">TradeHQ Institutional Insights</h1>
    <p style="margin:0;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:1px;">Week of ${weekOf}</p>
  </td></tr>
  <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #1f1f1f;margin:0;"/></td></tr>
  <tr><td style="padding:24px 32px;">
    <h2 style="margin:0 0 12px;font-size:18px;color:#fff;">📊 Market Pulse</h2>
    <p style="margin:0 0 16px;font-size:14px;color:#999;line-height:1.6;">
      Markets continue to evolve — stay ahead with TradeHQ's paper trading simulator.
      Practice your strategies risk-free with $100K virtual capital across 150+ assets including stocks, ETFs, and crypto.
    </p>
    <h2 style="margin:0 0 12px;font-size:18px;color:#fff;">🎯 This Week's Focus</h2>
    <ul style="margin:0 0 16px;padding-left:20px;color:#999;font-size:14px;line-height:1.8;">
      <li>Test new trading strategies without risking real money</li>
      <li>Explore the AI Trading Mentor for personalized guidance</li>
      <li>Track your performance on the community leaderboard</li>
      <li>Master new concepts in our Learning Hub</li>
    </ul>
    <h2 style="margin:0 0 12px;font-size:18px;color:#fff;">🚀 Quick Actions</h2>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <tr>
        <td style="padding-right:12px;">
          <a href="https://tradinghq.lovable.app/trade" style="display:inline-block;padding:10px 24px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">Start Trading</a>
        </td>
        <td>
          <a href="https://tradinghq.lovable.app/learn" style="display:inline-block;padding:10px 24px;background:#1a1a1a;color:#0ea5e9;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;border:1px solid #333;">Learn More</a>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #1f1f1f;margin:0;"/></td></tr>
  <tr><td style="padding:20px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#555;">
      You're receiving this because you subscribed to TradeHQ Institutional Insights.<br/>
      TradeHQ is a simulated paper trading platform — not a real brokerage.
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    let sent = 0;
    const errors: string[] = [];

    // Send to each subscriber individually (Resend best practice)
    for (const sub of subscribers) {
      try {
        const res = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "TradeHQ <onboarding@resend.dev>",
            to: [sub.email],
            subject: `📊 TradeHQ Institutional Insights — ${weekOf}`,
            html,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          errors.push(`${sub.email}: ${res.status} ${errBody}`);
        } else {
          sent++;
        }
      } catch (e) {
        errors.push(`${sub.email}: ${e instanceof Error ? e.message : "Unknown error"}`);
      }

      // Small delay to avoid rate limits
      if (subscribers.length > 1) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    console.log(`Newsletter sent to ${sent}/${subscribers.length} subscribers. Errors: ${errors.length}`);
    if (errors.length > 0) console.error("Send errors:", errors);

    return new Response(JSON.stringify({
      message: `Newsletter sent to ${sent} of ${subscribers.length} subscribers`,
      sent,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Newsletter error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
