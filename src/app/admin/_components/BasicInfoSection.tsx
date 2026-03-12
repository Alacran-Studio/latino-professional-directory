"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateBasicInfo } from "../organizations/[id]/_actions/updateBasicInfo";
import type { AdminOrg } from "@/types/admin";
import { useOrgFormContext } from "./OrgFormContext";


function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1);
    } else if (u.pathname.includes("/embed/")) {
      return url;
    } else {
      videoId = u.searchParams.get("v");
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

function VideoPreview({ url }: { url: string }) {
  if (!url.trim()) return null;
  const embedUrl = getYoutubeEmbedUrl(url);
  if (!embedUrl) return null;
  return (
    <div className="w-1/2">
      <div className="relative w-full overflow-hidden rounded-lg border border-border" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

function Field({
  label, name, value, onChange, required, textarea, rows = 3, placeholder,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  required?: boolean; textarea?: boolean; rows?: number; placeholder?: string;
}) {
  const cls = "w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground";
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-bold text-foreground">{label}</label>
      {textarea ? (
        <textarea id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={cls} />
      ) : (
        <input id={name} name={name} type="text" value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className={cls} />
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
  const { updatePreview } = useOrgFormContext();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({
    name: org.name,
    website_url: org.website_url,
    short_description: org.short_description ?? "",
    description: org.description ?? "",
    video_url: org.video_url ?? "",
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

  function startEditing() {
    setDraft(saved);
    setEditing(true);
  }

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    const result = await updateBasicInfo(org.id, formData);
    setSaving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      const newSaved = {
        name: (formData.get("name") as string) ?? saved.name,
        website_url: (formData.get("website_url") as string) ?? saved.website_url,
        short_description: (formData.get("short_description") as string) ?? "",
        description: (formData.get("description") as string) ?? "",
        video_url: (formData.get("video_url") as string) ?? "",
      };
      setSaved(newSaved);
      setDraft(newSaved);
      updatePreview(newSaved);
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
          <button type="button" onClick={startEditing}
            className="text-sm text-primary hover:underline">
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <Field label="Name" name="name" value={draft.name} onChange={(v) => handleDraftChange("name", v)} required />
          <Field label="Website URL" name="website_url" value={draft.website_url} onChange={(v) => handleDraftChange("website_url", v)} required />
          <Field label="Short Description" name="short_description" value={draft.short_description} onChange={(v) => handleDraftChange("short_description", v)} textarea />
          <Field label="Description" name="description" value={draft.description} onChange={(v) => handleDraftChange("description", v)} textarea rows={6} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="video_url" className="mb-1.5 text-sm font-bold text-foreground">Video URL</label>
              <input
                id="video_url"
                name="video_url"
                type="text"
                value={draft.video_url}
                onChange={(e) => handleDraftChange("video_url", e.target.value)}
                placeholder="https://youtube.com/embed/..."
                className="w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground"
              />
            </div>
            <VideoPreview url={draft.video_url} />
          </div>
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
          <DisplayRow label="Name" value={saved.name} />
          <DisplayRow label="Website URL" value={saved.website_url} />
          <DisplayRow label="Short Description" value={saved.short_description} />
          <DisplayRow label="Description" value={saved.description} />
          <div className="flex flex-col gap-2">
            <DisplayRow label="Video URL" value={saved.video_url} />
            <VideoPreview url={saved.video_url} />
          </div>
        </dl>
      )}
    </section>
  );
}
