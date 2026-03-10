import { APP_NAME, APP_URL } from "@/lib/constants";

export function orgReadyForReviewEmail({
  orgName,
  orgId,
}: {
  orgName: string;
  orgId: number;
}) {
  return {
    subject: `${orgName} is ready for final review`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">Profile ready for review</h2>
        <p>
          <strong>${orgName}</strong> has completed their profile and submitted it for
          final review. Once you're happy with it, toggle them to <strong>Active</strong>
          to publish their listing.
        </p>
        <p>
          <a href="${APP_URL}/admin/organizations/${orgId}"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            Review ${orgName}
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          &mdash; ${APP_NAME} Admin
        </p>
      </div>
    `,
  };
}
