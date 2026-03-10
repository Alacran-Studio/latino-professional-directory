"use client";

import { useState } from "react";
import { acceptInvite } from "../_actions/acceptInvite";
import { PasswordInput } from "@/components/common/PasswordInput";

interface AcceptInviteFormProps {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function AcceptInviteForm({ token, firstName, lastName, email }: AcceptInviteFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("token", token);
    const result = await acceptInvite(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success, acceptInvite redirects — no need to handle here
  }

  return (
    <div className="rounded-lg border border-border bg-card p-8">
      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              readOnly
              className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-secondary-foreground"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              readOnly
              className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-secondary-foreground"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-secondary-foreground"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Create Password
          </label>
          <PasswordInput
            name="password"
            required
            minLength={6}
            inputClassName="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <PasswordInput
            name="confirm_password"
            required
            minLength={6}
            inputClassName="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Repeat your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Setting up account..." : "Accept Invite"}
        </button>
      </form>
    </div>
  );
}
