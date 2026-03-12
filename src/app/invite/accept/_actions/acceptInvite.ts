"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzleClient";
import {
  UsersTable,
  UserOrganizationsTable,
} from "../../../../../drizzle/schema";
import {
  fetchInviteByToken,
  markInviteAccepted,
} from "@/lib/admin/inviteOperations";
import { sendEmail } from "@/lib/email/resend";
import type { AdminInvite } from "@/types/admin";
import { redirect } from "next/navigation";

function validateForm(
  token: string,
  password: string,
  confirmPassword: string
): string | null {
  if (!token || !password || !confirmPassword)
    return "All fields are required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return null;
}

async function validateInvite(token: string): Promise<{ error: string } | AdminInvite> {
  const invite = await fetchInviteByToken(token);
  if (!invite || invite.status !== "pending")
    return { error: "This invite is invalid or has already been used." };
  if (new Date(invite.expires_at) < new Date())
    return { error: "This invite has expired." };
  return invite;
}

export async function acceptInvite(formData: FormData) {
  const token = (formData.get("token") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();
  const confirmPassword = (formData.get("confirm_password") as string)?.trim();

  const formError = validateForm(token, password, confirmPassword);
  if (formError) return { error: formError };

  const invite = await validateInvite(token);
  if ("error" in invite) return invite;

  const supabase = await createSupabaseServerClient();

  // Create Supabase Auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: invite.email,
    password,
  });

  if (authError) {
    if (authError.message.includes("already registered"))
      return { error: "An account with this email already exists." };
    else return { error: "Failed to create account. Please try again." };
  } else if (!authData.user) {
    return { error: "Failed to create account. Please try again." };
  }

  try {
    // Insert user with org_admin role
    const [user] = await db
      .insert(UsersTable)
      .values({
        supabase_id: authData.user.id,
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

    // Mark invite as accepted
    await markInviteAccepted(token);

    // Notify admin
    await sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL!,
      subject: `${invite.first_name} ${invite.last_name} has joined ${invite.organization_name}`,
      html: `<p>${invite.first_name} ${invite.last_name} (${invite.email}) accepted their invite and is now managing <strong>${invite.organization_name}</strong>.</p>`,
    });
  } catch (err: any) {
    if (err?.message?.includes("unique"))
      return { error: "An account with this email already exists." };
    return { error: "Failed to set up account. Please try again." };
  }

  // Auto sign-in
  await supabase.auth.signInWithPassword({ email: invite.email, password });

  redirect("/admin");
}
