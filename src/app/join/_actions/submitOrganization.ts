"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzleClient";
import {
  OrganizationsTable,
  OrganizationContacts,
  UsersTable,
  UserOrganizationsTable,
} from "../../../../drizzle/schema";
import { sendEmail } from "@/lib/email/resend";
import { orgSubmittedEmail } from "@/lib/email/templates/orgSubmitted";
import { orgSubmittedConfirmationEmail } from "@/lib/email/templates/orgSubmittedConfirmation";

interface SubmitData {
  name: string;
  description: string;
  short_description: string;
  website_url: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export async function submitOrganization(data: SubmitData) {
  const { name, description, short_description, website_url } = data;
  const { first_name, last_name, email, password, phone } = data;

  // Validate required fields
  if (!name || !website_url) {
    return { error: "Organization name and website URL are required." };
  }
  if (!first_name || !last_name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = await createSupabaseServerClient();

  // 1. Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
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
    // 2. Insert organization with status="pending"
    const [org] = await db
      .insert(OrganizationsTable)
      .values({
        name,
        description: description || null,
        short_description: short_description || null,
        website_url,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning({ id: OrganizationsTable.id });

    // 3. Insert organization contact
    await db.insert(OrganizationContacts).values({
      first_name,
      last_name,
      email,
      phone: phone || null,
      organization_id: org.id,
    });

    // 4. Insert user
    const [user] = await db
      .insert(UsersTable)
      .values({
        supabase_id: supabaseId,
        email,
        first_name,
        last_name,
        role: "org_admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning({ id: UsersTable.id });

    // 5. Link user to organization
    await db.insert(UserOrganizationsTable).values({
      user_id: user.id,
      organization_id: org.id,
      created_at: new Date().toISOString(),
    });
  } catch (err: any) {
    // If DB insert fails, the Supabase Auth user still exists.
    // This is an edge case we accept for MVP.
    if (err?.message?.includes("unique")) {
      return { error: "An organization with this name or website already exists." };
    }
    return { error: "Failed to create organization. Please try again." };
  }

  // 6. Send email notifications (non-blocking)
  const submitterName = `${first_name} ${last_name}`;

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    const { subject, html } = orgSubmittedEmail({
      orgName: name,
      submitterName,
      submitterEmail: email,
    });
    sendEmail({ to: adminEmail, subject, html });
  }

  const { subject: confirmSubject, html: confirmHtml } =
    orgSubmittedConfirmationEmail({ orgName: name, firstName: first_name });
  sendEmail({ to: email, subject: confirmSubject, html: confirmHtml });

  // 7. Auto sign-in (signUp may not auto-sign-in depending on Supabase config)
  await supabase.auth.signInWithPassword({ email, password });

  return { success: true };
}
