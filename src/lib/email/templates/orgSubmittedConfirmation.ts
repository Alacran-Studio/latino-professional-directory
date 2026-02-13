import { APP_URL, APP_NAME } from "@/lib/constants";

export function orgSubmittedConfirmationEmail({
  orgName,
  firstName,
}: {
  orgName: string;
  firstName: string;
}) {
  return {
    subject: `We received your submission: ${orgName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">Thanks for submitting, ${firstName}!</h2>
        <p>
          We received your submission for <strong>${orgName}</strong> and it is
          currently under review.
        </p>
        <p>
          You can track the status of your organization anytime by logging into
          your admin dashboard.
        </p>
        <p>
          <a href="${APP_URL}/admin"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            View Dashboard
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          &mdash; The ${APP_NAME} Team
        </p>
      </div>
    `,
  };
}
