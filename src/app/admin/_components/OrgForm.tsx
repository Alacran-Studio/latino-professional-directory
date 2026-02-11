"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrganization } from "../organizations/[id]/_actions/updateOrganization";
import type { AdminOrg } from "@/types/admin";

interface OrgFormProps {
  org: AdminOrg;
}

export function OrgForm({ org }: OrgFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await updateOrganization(org.id, formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      router.refresh();
    }
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
          Organization updated successfully.
        </div>
      )}

      <Field label="Name" name="name" defaultValue={org.name} required />
      <Field
        label="Website URL"
        name="website_url"
        defaultValue={org.website_url}
        required
      />
      <Field
        label="Short Description"
        name="short_description"
        defaultValue={org.short_description ?? ""}
        textarea
      />
      <Field
        label="Description"
        name="description"
        defaultValue={org.description ?? ""}
        textarea
        rows={6}
      />
      <Field
        label="Logo URL"
        name="logo_url"
        defaultValue={org.logo_url ?? ""}
      />
      <Field
        label="Photo URL"
        name="photo_url"
        defaultValue={org.photo_url ?? ""}
      />
      <Field
        label="Video URL"
        name="video_url"
        defaultValue={org.video_url ?? ""}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-neutralLight transition-all duration-200 hover:bg-primary-hover disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  textarea,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}) {
  const inputClass =
    "w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground";

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-bold text-foreground">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          defaultValue={defaultValue}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
}
