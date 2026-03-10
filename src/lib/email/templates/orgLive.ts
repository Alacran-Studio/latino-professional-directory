import { APP_NAME, APP_URL } from "@/lib/constants";

export function orgLiveEmail({
  orgName,
  firstName,
  orgSlug,
}: {
  orgName: string;
  firstName: string;
  orgSlug: string;
}) {
  return {
    subject: `${orgName} is now live on the ${APP_NAME}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">You're live, ${firstName}! 🎉</h2>
        <p>
          <strong>${orgName}</strong> is now listed on the ${APP_NAME}.
          People can find you, learn about your work, and connect with your community.
        </p>
        <p>
          <a href="${APP_URL}/organizations/${orgSlug}"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            View Your Listing
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          &mdash; The ${APP_NAME} Team
        </p>
      </div>
    `,
  };
}
