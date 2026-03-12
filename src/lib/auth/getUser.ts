import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzleClient";
import { UsersTable } from "@drizzle/schema";
import { eq } from "drizzle-orm";

export type DbUser = {
  id: number;
  supabase_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
};

export async function getAuthUser(): Promise<{
  supabaseId: string;
  dbUser: DbUser;
} | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const rows = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.supabase_id, user.id));

  if (rows.length === 0) return null;

  return {
    supabaseId: user.id,
    dbUser: rows[0] as DbUser,
  };
}
