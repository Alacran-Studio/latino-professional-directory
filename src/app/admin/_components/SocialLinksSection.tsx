"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateSocialLinks } from "../organizations/[id]/_actions/updateSocialLinks";
import type { AdminOrg } from "@/types/admin";
import { useOrgFormContext } from "./OrgFormContext";

function Field({
  label, name, value, onChange, placeholder,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-bold text-foreground">{label}</label>
      <input id={name} name={name} type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
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

export function SocialLinksSection({ org }: { org: AdminOrg }) {
  const { updatePreview } = useOrgFormContext();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({
    linkedin_url: org.linkedin_url ?? "",
    instagram_url: org.instagram_url ?? "",
    facebook_url: org.facebook_url ?? "",
    x_url: org.x_url ?? "",
  });
  const [draft, setDraft] = useState(saved);
  const previewTimerRef = useRef<ReturnType<typeof setTimeout>>();

  function schedulePreviewUpdate(newDraft: typeof draft) {
    clearTimeout(previewTimerRef.current);
    previewTimerRef.current = setTimeout(() => updatePreview(newDraft), 800);
  }

  function handleDraftChange(field: keyof typeof draft, value: string) {
    const updated = { ...draft, [field]: value };
    setDraft(updated);
    schedulePreviewUpdate(updated);
  }

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    const result = await updateSocialLinks(org.id, formData);
    setSaving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      const newSaved = {
        linkedin_url: (formData.get("linkedin_url") as string) ?? "",
        instagram_url: (formData.get("instagram_url") as string) ?? "",
        facebook_url: (formData.get("facebook_url") as string) ?? "",
        x_url: (formData.get("x_url") as string) ?? "",
      };
      setSaved(newSaved);
      setDraft(newSaved);
      updatePreview(newSaved);
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
          <button type="button" onClick={() => { setDraft(saved); setEditing(true); }}
            className="text-sm text-primary hover:underline">
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <Field label="LinkedIn" name="linkedin_url" value={draft.linkedin_url} onChange={(v) => handleDraftChange("linkedin_url", v)} placeholder="https://linkedin.com/company/..." />
          <Field label="Instagram" name="instagram_url" value={draft.instagram_url} onChange={(v) => handleDraftChange("instagram_url", v)} placeholder="https://instagram.com/..." />
          <Field label="Facebook" name="facebook_url" value={draft.facebook_url} onChange={(v) => handleDraftChange("facebook_url", v)} placeholder="https://facebook.com/..." />
          <Field label="X (Twitter)" name="x_url" value={draft.x_url} onChange={(v) => handleDraftChange("x_url", v)} placeholder="https://x.com/..." />
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-neutralLight hover:bg-primary-hover disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => { setDraft(saved); setEditing(false); }}
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
