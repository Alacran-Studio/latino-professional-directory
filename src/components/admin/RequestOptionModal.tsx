"use client";

import { useState } from "react";
import { requestNewOption } from "@/app/organizations/[slug]/_actions/requestNewOption";

type OptionType = "industry" | "service" | "community";

interface RequestOptionModalProps {
  orgName: string;
  orgId: number;
  optionType: OptionType;
}

const labelMap: Record<OptionType, string> = {
  industry: "industry",
  service: "key service",
  community: "community",
};

export function RequestOptionModal({ orgName, orgId, optionType }: RequestOptionModalProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const label = labelMap[optionType];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await requestNewOption({ orgName, orgId, optionType, requestedValue: value });
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => { setValue(""); setSuccess(false); setError(null); }, 300);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-secondary-foreground underline-offset-2 hover:text-foreground hover:underline"
      >
        Don&apos;t see your {label}? Let us know.
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 text-secondary-foreground hover:text-foreground"
            >
              ✕
            </button>

            {success ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span className="text-3xl">🙌</span>
                <h2 className="font-lexend text-lg font-semibold text-foreground">Request sent!</h2>
                <p className="text-sm text-secondary-foreground">
                  We&apos;ll review your request and add it to the directory if it&apos;s a good fit.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-neutralLight"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h2 className="font-lexend text-lg font-semibold text-foreground">
                    Request a new {label}
                  </h2>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    Tell us what {label} you&apos;d like added and we&apos;ll review it.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-foreground">
                    {label.charAt(0).toUpperCase() + label.slice(1)} name
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={`e.g. ${optionType === "industry" ? "Architecture" : optionType === "service" ? "Job Board" : "LGBTQ+"}`}
                    className="w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground"
                    required
                  />
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl border border-border px-4 py-2 text-sm text-secondary-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-neutralLight disabled:opacity-50"
                  >
                    {loading ? "Sending…" : "Send request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
