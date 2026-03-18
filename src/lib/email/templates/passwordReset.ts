import { APP_NAME } from "@/lib/constants";

export function passwordResetEmail({ resetUrl }: { resetUrl: string }) {
  return {
    subject: `Reset your ${APP_NAME} password`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #12263A;">Reset your password</h2>
        <p>
          We received a request to reset the password for your ${APP_NAME} account.
        </p>
        <p>
          Click the button below to set a new password. This link expires in 1 hour.
        </p>
        <p>
          <a href="${resetUrl}"
             style="display: inline-block; background: #2D56B2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
            Reset Password
          </a>
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 24px;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
        <p style="color: #888; font-size: 14px;">
          &mdash; The ${APP_NAME} Team
        </p>
      </div>
    `,
  };
}
