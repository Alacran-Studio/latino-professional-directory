import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Latino Professional Directory <hello@mail.latinoprofessionaldirectory.com>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log(`[Email] Sending to: ${to}, subject: "${subject}"`);
  console.log(`[Email] API key present: ${!!process.env.RESEND_API_KEY}`);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[Email] Resend API error:", error);
    } else {
      console.log("[Email] Sent successfully, id:", data?.id);
    }
  } catch (error) {
    console.error("[Email] Failed to send:", error);
  }
}
