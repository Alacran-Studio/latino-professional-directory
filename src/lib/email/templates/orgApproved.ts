import { APP_NAME, APP_URL } from "@/lib/constants";

export function orgApprovedEmail({
  orgName,
  firstName,
}: {
  orgName: string;
  firstName: string;
}) {
  return {
    subject: `Your organization has been approved: ${orgName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">Great news, ${firstName}!</h2>
        <p>
          <strong>${orgName}</strong> has been approved and is now listed in the
          ${APP_NAME}.
        </p>
        <p>
          <a href="${APP_URL}/directory"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            View Directory
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          &mdash; The ${APP_NAME} Team
        </p>
      </div>
    `,
  };
}
