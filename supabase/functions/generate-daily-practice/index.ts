import { createClient } from 'npm:@supabase/supabase-js@2.75.1';
import { generatePractice, type PracticeClaim } from '../_shared/dailyPracticeGenerator.ts';
const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
Deno.serve(async req => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  const token = req.headers.get('x-generation-token');
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return reply({ error: 'Unauthorized' }, 401);
  const { data, error } = await client.rpc('claim_daily_practice', { p_token: token });
  if (error || !data) return reply({ error: 'Unauthorized or expired request' }, 401);
  const claim = data as PracticeClaim;
  try {
    const generated = await generatePractice(claim);
    const { data: finished, error: failure } = await client.rpc('finish_daily_practice', { p_lease: claim.lease, p_exercises: generated.exercises, p_research: generated.research, p_error: null });
    if (failure || !finished) throw new Error('Could not store this generation part; no content was published.');
    return reply({ completed: claim.exercises.length + 10, approvalRequired: true });
  } catch (error) {
    // Only known application messages are retained; provider response bodies/credentials never are.
    const message = error instanceof Error && /^(Add a free|Choose a supported|Too few primary|Free Gemini|Gemini rejected|Gemini returned|Daily validation|Daily sources|Daily batch|Daily content|Could not store)/.test(error.message)
      ? error.message : 'Generation failed. No content was published; retry after the cooldown.';
    await client.rpc('finish_daily_practice', { p_lease: claim.lease, p_exercises: null, p_research: null, p_error: message });
    return reply({ error: message }, 409);
  }
});
