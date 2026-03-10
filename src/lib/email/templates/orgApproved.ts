import { APP_NAME, APP_URL } from "@/lib/constants";

export function orgApprovedEmail({
  orgName,
  firstName,
}: {
  orgName: string;
  firstName: string;
}) {
  return {
    subject: `Your organization has been approved — next steps`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">Great news, ${firstName}!</h2>
        <p>
          <strong>${orgName}</strong> has been approved for the ${APP_NAME}.
        </p>
        <p>
          Before your listing goes live, we'd love for you to complete your organization's profile —
          add a logo, cover photo, description, industries, and anything else that tells your story.
        </p>
        <p>
          Once you're happy with how it looks, hit <strong>"Submit for Final Review"</strong> from
          your admin page and we'll activate your listing. Then it's time to celebrate! 🎉
        </p>
        <p>
          <a href="${APP_URL}/admin"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            Complete Your Profile
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          &mdash; The ${APP_NAME} Team
        </p>
      </div>
    `,
  };
}
