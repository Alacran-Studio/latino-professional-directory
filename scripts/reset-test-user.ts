import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

const email = process.argv[2];

if (!email) {
  console.error("Usage: npx tsx scripts/reset-test-user.ts <email>");
  process.exit(1);
}

async function main() {
  const sql = postgres({
    host: process.env.POSTGRES_HOST!,
    database: process.env.POSTGRES_DATABASE!,
    port: Number(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
  });

  console.log(`\nResetting test user: ${email}\n`);

  // 1. DB cleanup (FK order)
  const linkResult = await sql`
    DELETE FROM lpdd.user_organizations
    WHERE user_id = (SELECT id FROM lpdd.users WHERE email = ${email})`;
  console.log(`[DB] user_organizations: ${linkResult.count} deleted`);

  const contactResult = await sql`
    DELETE FROM lpdd.organization_contacts WHERE email = ${email}`;
  console.log(`[DB] organization_contacts: ${contactResult.count} deleted`);

  const orgResult = await sql`
    DELETE FROM lpdd.organizations
    WHERE id NOT IN (SELECT organization_id FROM lpdd.organization_contacts WHERE organization_id IS NOT NULL)
    AND status = 'pending'`;
  console.log(`[DB] organizations (orphaned pending): ${orgResult.count} deleted`);

  const userResult = await sql`
    DELETE FROM lpdd.users WHERE email = ${email}`;
  console.log(`[DB] users: ${userResult.count} deleted`);

  // 2. Supabase Auth cleanup
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data } = await supabase.auth.admin.listUsers();
    const authUser = data?.users?.find((u) => u.email === email);

    if (authUser) {
      await supabase.auth.admin.deleteUser(authUser.id);
      console.log(`[Auth] Supabase user deleted: ${authUser.id}`);
    } else {
      console.log(`[Auth] No Supabase user found for ${email}`);
    }
  } else {
    console.log(`[Auth] SUPABASE_SERVICE_ROLE_KEY not set — skip auth cleanup (delete manually in dashboard)`);
  }

  await sql.end();
  console.log("\nDone!\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
