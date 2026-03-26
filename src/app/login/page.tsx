"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "./_actions/login";
import { FullBrand } from "@/components/common/FullBrand";
import { PasswordInput } from "@/components/common/PasswordInput";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <FullBrand fillColor="var(--foreground)" textClassName="text-foreground" />
        </div>

        <div className="rounded-lg border border-border bg-card p-8 shadow-md">
          <h1 className="font-lexend mb-6 text-center text-2xl font-semibold text-foreground">
            Admin Login
          </h1>

          {error && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm font-bold text-foreground">
                Password
              </label>
              <PasswordInput
                id="password"
                name="password"
                required
                inputClassName="h-12 rounded-md border-2 border-border bg-background pl-3 text-foreground"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-lg text-neutralLight transition-all duration-200 hover:bg-primary-hover disabled:opacity-50"
            >
              {loading && (
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-secondary-foreground hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
