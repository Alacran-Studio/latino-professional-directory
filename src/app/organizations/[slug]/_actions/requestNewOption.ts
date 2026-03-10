"use server";

import { sendEmail } from "@/lib/email/resend";
import { getAuthUser } from "@/lib/auth/getUser";

type OptionType = "industry" | "service" | "community";

export async function requestNewOption({
  orgName,
  orgId,
  optionType,
  requestedValue,
}: {
  orgName: string;
  orgId: number;
  optionType: OptionType;
  requestedValue: string;
}) {
  if (!requestedValue.trim()) {
    return { error: "Please describe what you'd like added." };
  }

  const labelMap: Record<OptionType, string> = {
    industry: "Industry",
    service: "Key Service",
    community: "Community",
  };

  const label = labelMap[optionType];
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL!;

  const auth = await getAuthUser();
  const submitterInfo = auth
    ? `${auth.dbUser.first_name} ${auth.dbUser.last_name} (${auth.dbUser.email})`
    : "Unknown (not logged in)";

  await sendEmail({
    to: adminEmail,
    subject: `New ${label} Request from ${orgName}`,
    html: `
      <h2>New ${label} Request</h2>
      <p><strong>Organization:</strong> ${orgName} (ID: ${orgId})</p>
      <p><strong>Requested ${label}:</strong> ${requestedValue}</p>
      <p><strong>Submitted by:</strong> ${submitterInfo}</p>
      <p>Review and add this to the directory if appropriate.</p>
    `,
  });

  return { success: true };
}
