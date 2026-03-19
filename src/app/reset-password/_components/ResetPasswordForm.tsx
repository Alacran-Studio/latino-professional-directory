"use client";

import { useState } from "react";
import { PasswordInput } from "@/components/common/PasswordInput";
import { updatePassword } from "../_actions/updatePassword";

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await updatePassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-sm font-bold text-foreground">
            New Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={6}
            inputClassName="h-12 rounded-md border-2 border-border bg-background pl-3 text-foreground"
            placeholder="At least 6 characters"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="mb-2 text-sm font-bold text-foreground">
            Confirm New Password
          </label>
          <PasswordInput
            id="confirm_password"
            name="confirm_password"
            required
            minLength={6}
            inputClassName="h-12 rounded-md border-2 border-border bg-background pl-3 text-foreground"
            placeholder="Repeat your new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary px-4 py-3 text-lg text-neutralLight transition-all duration-200 hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? "Updating..." : "Set New Password"}
        </button>
      </form>
    </>
  );
}
