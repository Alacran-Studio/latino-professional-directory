export function orgSubmittedEmail({
  orgName,
  submitterName,
  submitterEmail,
}: {
  orgName: string;
  submitterName: string;
  submitterEmail: string;
}) {
  return {
    subject: `New organization submitted: ${orgName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">New Organization Submitted</h2>
        <p>A new organization has been submitted for review.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Organization</td>
            <td style="padding: 8px;">${orgName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Submitted by</td>
            <td style="padding: 8px;">${submitterName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 8px;">${submitterEmail}</td>
          </tr>
        </table>
        <p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/queue"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            Review in Admin
          </a>
        </p>
      </div>
    `,
  };
}
