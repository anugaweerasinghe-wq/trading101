// Isolated PostgreSQL verification. Never connects to a production database.
import { PGlite } from '@electric-sql/pglite';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const repo = fileURLToPath(new URL('../', import.meta.url));
const db = new PGlite();
try {
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
    CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid PRIMARY KEY,email text,raw_user_meta_data jsonb);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    GRANT USAGE ON SCHEMA auth TO anon,authenticated; GRANT EXECUTE ON FUNCTION auth.uid() TO anon,authenticated;`);
  for (const path of [
    'supabase/migrations/20260802024211_00f706fa-25c6-4a1e-9f9e-17b13547e1b7.sql',
    'supabase/migrations/20260927200000_harden_duel_mutations.sql',
  ]) await db.exec(readFileSync(repo + path, 'utf8'));
  const migrations = readdirSync(repo + 'supabase/migrations').filter(name => /server_recorded_practice_scores|freeze_server_duel_scores/.test(name)).sort();
  for (const path of migrations) await db.exec(readFileSync(repo + 'supabase/migrations/' + path, 'utf8'));
  for (const path of ['scripts/verify-server-practice.sql', 'scripts/verify-server-duels.sql']) {
    const results = await db.exec(readFileSync(repo + path, 'utf8'));
    for (const result of results) for (const row of result.rows) if (row.verification) console.log(row.verification);
    console.log('PASS', path);
  }
} catch (error) {
  console.error('Backend verification failed:', error.message);
  process.exitCode = 1;
} finally {
  await db.close();
}
