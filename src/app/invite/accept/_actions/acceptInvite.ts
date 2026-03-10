"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzleClient";
import { UsersTable, UserOrganizationsTable } from "../../../../../drizzle/schema";
import { fetchInviteByToken, markInviteAccepted } from "@/lib/admin/inviteOperations";
import { redirect } from "next/navigation";

export async function acceptInvite(formData: FormData) {
  const token = (formData.get("token") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();
  const confirmPassword = (formData.get("confirm_password") as string)?.trim();

  if (!token || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // Re-validate invite (prevents race conditions and double-submits)
  const invite = await fetchInviteByToken(token);

  if (!invite) {
    return { error: "This invite is invalid or has already been used." };
  }

  if (invite.status !== "pending") {
    return { error: "This invite is invalid or has already been used." };
  }

  if (new Date(invite.expires_at) < new Date()) {
    return { error: "This invite has expired." };
  }

  const supabase = await createSupabaseServerClient();

  // Create Supabase Auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: invite.email,
    password,
  });

  if (authError) {
    if (authError.message.includes("already registered")) {
      return { error: "An account with this email already exists." };
    }
    return { error: "Failed to create account. Please try again." };
  }

  if (!authData.user) {
    return { error: "Failed to create account. Please try again." };
  }

  const supabaseId = authData.user.id;

  try {
    // Insert user with org_admin role
    const [user] = await db
      .insert(UsersTable)
      .values({
        supabase_id: supabaseId,
        email: invite.email,
        first_name: invite.first_name,
        last_name: invite.last_name,
        role: "org_admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning({ id: UsersTable.id });

    // Link user to organization
    await db.insert(UserOrganizationsTable).values({
      user_id: user.id,
      organization_id: invite.organization_id,
      created_at: new Date().toISOString(),
    });

    // Mark invite as accepted (do this before sign-in to ensure atomicity)
    await markInviteAccepted(token);
  } catch (err: any) {
    if (err?.message?.includes("unique")) {
      return { error: "An account with this email already exists." };
    }
    return { error: "Failed to set up account. Please try again." };
  }

  // Auto sign-in
  await supabase.auth.signInWithPassword({ email: invite.email, password });

  redirect("/admin");
}
