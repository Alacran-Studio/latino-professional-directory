"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/resend";
import { passwordResetEmail } from "@/lib/email/templates/passwordReset";
import { APP_URL } from "@/lib/constants";

export async function sendPasswordReset(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email) return { error: "Email is required." };

  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: `${APP_URL}/auth/callback?next=/reset-password`,
    },
  });

  // Only send email if the account exists — silently skip otherwise
  // to avoid revealing whether an email is registered
  if (!error && data?.properties?.action_link) {
    await sendEmail({
      to: email,
      ...passwordResetEmail({ resetUrl: data.properties.action_link }),
    });
  }

  // Always return success to prevent email enumeration
  return { success: true };
}
