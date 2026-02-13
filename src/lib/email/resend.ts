import { Resend } from "resend";
import { APP_NAME, APP_EMAIL_DOMAIN } from "@/lib/constants";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = `${APP_NAME} <hello@${APP_EMAIL_DOMAIN}>`;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[Email] Resend API error:", error);
    }
  } catch (error) {
    console.error("[Email] Failed to send:", error);
  }
}
