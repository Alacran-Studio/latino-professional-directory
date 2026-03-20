"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateSocialLinks } from "../organizations/[id]/_actions/updateSocialLinks";
import type { AdminOrg } from "@/types/admin";

function Field({
  label, name, defaultValue, placeholder,
}: {
  label: string; name: string; defaultValue: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-bold text-foreground">{label}</label>
      <input id={name} name={name} type="text" defaultValue={defaultValue} placeholder={placeholder}
        className="w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground" />
    </div>
  );
}

function DisplayRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm font-bold text-foreground">{label}</dt>
      <dd className="text-sm text-secondary-foreground">
        {value || <span className="italic opacity-50">Not set</span>}
      </dd>
    </div>
  );
}

export function SocialLinksSection({ org, isOnboarding = false }: { org: AdminOrg; isOnboarding?: boolean }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({
    linkedin_url: org.linkedin_url ?? "",
    instagram_url: org.instagram_url ?? "",
    facebook_url: org.facebook_url ?? "",
    x_url: org.x_url ?? "",
  });

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    const result = await updateSocialLinks(org.id, formData);
    setSaving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      setSaved({
        linkedin_url: (formData.get("linkedin_url") as string) ?? "",
        instagram_url: (formData.get("instagram_url") as string) ?? "",
        facebook_url: (formData.get("facebook_url") as string) ?? "",
        x_url: (formData.get("x_url") as string) ?? "",
      });
      setEditing(false);
      toast.success("Social links saved.");
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
          Social Links
        </h2>
        {!editing && (
          <button type="button" onClick={() => setEditing(true)}
            className="rounded-md border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5">
            Edit
          </button>
        )}
      </div>

      {isOnboarding && (
        <div className="rounded-lg border border-border bg-gray-50 p-3 space-y-1.5">
          {[
            { label: "LinkedIn", value: saved.linkedin_url },
            { label: "Instagram", value: saved.instagram_url },
            { label: "Facebook", value: saved.facebook_url },
            { label: "X (Twitter)", value: saved.x_url },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-secondary-foreground">
              <span>{value?.trim() ? "✅" : "⬜"}</span>
              <span>{label} <span className="italic">(optional)</span></span>
            </div>
          ))}
        </div>
      )}

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <Field label="LinkedIn" name="linkedin_url" defaultValue={saved.linkedin_url} placeholder="https://linkedin.com/company/..." />
          <Field label="Instagram" name="instagram_url" defaultValue={saved.instagram_url} placeholder="https://instagram.com/..." />
          <Field label="Facebook" name="facebook_url" defaultValue={saved.facebook_url} placeholder="https://facebook.com/..." />
          <Field label="X (Twitter)" name="x_url" defaultValue={saved.x_url} placeholder="https://x.com/..." />
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-neutralLight hover:bg-primary-hover disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(false)}
              className="rounded-xl border border-border px-5 py-2 text-sm text-secondary-foreground hover:text-foreground">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <dl className="space-y-3">
          <DisplayRow label="LinkedIn" value={saved.linkedin_url} />
          <DisplayRow label="Instagram" value={saved.instagram_url} />
          <DisplayRow label="Facebook" value={saved.facebook_url} />
          <DisplayRow label="X (Twitter)" value={saved.x_url} />
        </dl>
      )}
    </section>
  );
}
