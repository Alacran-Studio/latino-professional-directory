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
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await sendInvite(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    }
    setLoading(false);
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

      {success && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
          Invite sent successfully.
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
