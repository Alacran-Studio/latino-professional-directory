"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepOrgInfo } from "./StepOrgInfo";
import { StepContactInfo } from "./StepContactInfo";
import { submitOrganization } from "../_actions/submitOrganization";

type Step = "org_info" | "contact_info";

export function JoinForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("org_info");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "",
    website_url: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError(null);
    setLoading(true);

    const result = await submitOrganization(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin?submitted=true");
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            step === "org_info"
              ? "bg-primary text-white"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          }`}
        >
          {step === "org_info" ? "1" : "\u2713"}
        </div>
        <div className="h-px w-8 bg-border" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            step === "contact_info"
              ? "bg-primary text-white"
              : "bg-card text-secondary-foreground"
          }`}
        >
          2
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6">
        {step === "org_info" && (
          <StepOrgInfo
            data={formData}
            onChange={handleChange}
            onNext={() => setStep("contact_info")}
          />
        )}

        {step === "contact_info" && (
          <StepContactInfo
            data={formData}
            onChange={handleChange}
            onBack={() => setStep("org_info")}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
