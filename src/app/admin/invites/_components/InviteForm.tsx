"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminOrg } from "@/types/admin";
import { sendInvite } from "../_actions/sendInvite";

interface InviteFormProps {
  orgs: AdminOrg[];
}

export function InviteForm({ orgs }: InviteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteResult, setInviteResult] = useState<{ name: string; email: string; org: string; url: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInviteResult(null);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const orgId = formData.get("organization_id") as string;
    const orgName = orgs.find((o) => String(o.id) === orgId)?.name ?? "";

    const result = await sendInvite(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setInviteResult({ name: `${firstName} ${lastName}`, email, org: orgName, url: result.inviteUrl! });
      (e.target as HTMLFormElement).reset();
      router.refresh();
    }
    setLoading(false);
  }

  async function handleCopy() {
    if (!inviteResult) return;
    await navigator.clipboard.writeText(inviteResult.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-lexend mb-4 text-lg font-semibold text-foreground">
        Send Admin Invite
      </h2>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {inviteResult && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            Invite created for {inviteResult.name} ({inviteResult.email}) — {inviteResult.org}
          </p>
          <p className="mt-1 text-xs text-green-700 dark:text-green-400">
            Copy the link below to send manually, or it was emailed automatically.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <input
              readOnly
              value={inviteResult.url}
              className="min-w-0 flex-1 rounded-md border border-green-300 bg-white px-3 py-1.5 text-xs text-foreground dark:border-green-700 dark:bg-background"
            />
            <button
              onClick={handleCopy}
              className="shrink-0 rounded-md border border-green-300 px-3 py-1.5 text-xs font-medium text-green-800 transition-colors hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              First Name
            </label>
            <input
              name="first_name"
              type="text"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Maria"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Last Name
            </label>
            <input
              name="last_name"
              type="text"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Garcia"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="m.garcia@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Organization
          </label>
          <select
            name="organization_id"
            required
            defaultValue=""
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Select an organization...
            </option>
            {orgs.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>
      </form>
    </div>
  );
}
