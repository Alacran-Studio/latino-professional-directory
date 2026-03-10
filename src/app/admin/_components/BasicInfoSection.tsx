"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateBasicInfo } from "../organizations/[id]/_actions/updateBasicInfo";
import type { AdminOrg } from "@/types/admin";

function Field({
  label, name, defaultValue, required, textarea, rows = 3, placeholder,
}: {
  label: string; name: string; defaultValue: string;
  required?: boolean; textarea?: boolean; rows?: number; placeholder?: string;
}) {
  const cls = "w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground";
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-bold text-foreground">{label}</label>
      {textarea ? (
        <textarea id={name} name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} className={cls} />
      ) : (
        <input id={name} name={name} type="text" defaultValue={defaultValue} required={required} placeholder={placeholder} className={cls} />
      )}
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

export function BasicInfoSection({ org }: { org: AdminOrg }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({
    name: org.name,
    website_url: org.website_url,
    short_description: org.short_description ?? "",
    description: org.description ?? "",
    video_url: org.video_url ?? "",
  });

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    const result = await updateBasicInfo(org.id, formData);
    setSaving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      setSaved({
        name: (formData.get("name") as string) ?? saved.name,
        website_url: (formData.get("website_url") as string) ?? saved.website_url,
        short_description: (formData.get("short_description") as string) ?? "",
        description: (formData.get("description") as string) ?? "",
        video_url: (formData.get("video_url") as string) ?? "",
      });
      setEditing(false);
      toast.success("Basic info saved.");
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
          Basic Info
        </h2>
        {!editing && (
          <button type="button" onClick={() => setEditing(true)}
            className="text-sm text-primary hover:underline">
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <Field label="Name" name="name" defaultValue={saved.name} required />
          <Field label="Website URL" name="website_url" defaultValue={saved.website_url} required />
          <Field label="Short Description" name="short_description" defaultValue={saved.short_description} textarea />
          <Field label="Description" name="description" defaultValue={saved.description} textarea rows={6} />
          <Field label="Video URL" name="video_url" defaultValue={saved.video_url}
            placeholder="https://youtube.com/embed/..." />
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
          <DisplayRow label="Name" value={saved.name} />
          <DisplayRow label="Website URL" value={saved.website_url} />
          <DisplayRow label="Short Description" value={saved.short_description} />
          <DisplayRow label="Description" value={saved.description} />
          <DisplayRow label="Video URL" value={saved.video_url} />
        </dl>
      )}
    </section>
  );
}
