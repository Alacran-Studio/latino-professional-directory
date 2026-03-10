import { APP_NAME, APP_URL } from "@/lib/constants";

export function orgAdminInviteEmail({
  firstName,
  orgName,
  inviteUrl,
}: {
  firstName: string;
  orgName: string;
  inviteUrl: string;
}) {
  return {
    subject: `You've been invited to manage ${orgName} on ${APP_NAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">Hi ${firstName},</h2>
        <p>
          You've been invited to become an admin for <strong>${orgName}</strong> on the
          ${APP_NAME}.
        </p>
        <p>
          Click the button below to set up your account. This invite link expires in 7 days.
        </p>
        <p>
          <a href="${inviteUrl}"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            Accept Invite
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          If you weren't expecting this invite, you can safely ignore this email.
        </p>
        <p style="color: #888; font-size: 14px;">
          &mdash; The ${APP_NAME} Team
        </p>
      </div>
    `,
  };
}
