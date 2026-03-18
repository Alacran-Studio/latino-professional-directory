"use client";

import { useState } from "react";
import Link from "next/link";
import { FullBrand } from "@/components/common/FullBrand";
import { sendPasswordReset } from "./_actions/sendPasswordReset";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await sendPasswordReset(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSubmitted(true);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <FullBrand fillColor="var(--foreground)" textClassName="text-foreground" />
        </div>

        <div className="rounded-lg border border-border bg-card p-8 shadow-md">
          {submitted ? (
            <div className="text-center">
              <h1 className="font-lexend mb-3 text-2xl font-semibold text-foreground">
                Check your email
              </h1>
              <p className="mb-6 text-sm text-secondary-foreground">
                If an account exists for that email address, you&apos;ll receive a
                password reset link shortly.
              </p>
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:underline"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-lexend mb-2 text-center text-2xl font-semibold text-foreground">
                Forgot your password?
              </h1>
              <p className="mb-6 text-center text-sm text-secondary-foreground">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
                  {error}
                </div>
              )}

              <form action={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-2 text-sm font-bold text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-12 rounded-md border-2 border-border bg-background pl-3 text-foreground"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-primary px-4 py-3 text-lg text-neutralLight transition-all duration-200 hover:bg-primary-hover disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-secondary-foreground">
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Back to login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
