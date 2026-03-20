"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateBasicInfo } from "../organizations/[id]/_actions/updateBasicInfo";
import { useCompletion } from "./CompletionContext";
import type { AdminOrg } from "@/types/admin";


function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1);
    } else if (u.pathname.includes("/embed/")) {
      return url; // already an embed URL
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

export function BasicInfoSection({ org, isOnboarding = false }: { org: AdminOrg; isOnboarding?: boolean }) {
  const { updateBasicInfo: updateBasicInfoContext } = useCompletion();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({
    name: org.name,
    website_url: org.website_url,
    short_description: org.short_description ?? "",
    description: org.description ?? "",
    video_url: org.video_url ?? "",
  });
  const [videoUrlDraft, setVideoUrlDraft] = useState(org.video_url ?? "");

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    const result = await updateBasicInfo(org.id, formData);
    setSaving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      const newVideoUrl = (formData.get("video_url") as string) ?? "";
      const newSaved = {
        name: (formData.get("name") as string) ?? saved.name,
        website_url: (formData.get("website_url") as string) ?? saved.website_url,
        short_description: (formData.get("short_description") as string) ?? "",
        description: (formData.get("description") as string) ?? "",
        video_url: newVideoUrl,
      };
      setSaved(newSaved);
      updateBasicInfoContext({
        name: !!newSaved.name?.trim(),
        website_url: !!newSaved.website_url?.trim(),
        short_description: !!newSaved.short_description?.trim(),
        description: !!newSaved.description?.trim(),
      });
      setVideoUrlDraft(newVideoUrl);
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
            className="rounded-md border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5">
            Edit
          </button>
        )}
      </div>

      {isOnboarding && (
        <div className="rounded-lg border border-border bg-gray-50 p-3 space-y-1.5">
          {[
            { label: "Name", met: !!saved.name?.trim() },
            { label: "Website URL", met: !!saved.website_url?.trim() },
            { label: "Short Description", met: !!saved.short_description?.trim() },
            { label: "Description", met: !!saved.description?.trim() },
          ].map(({ label, met }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span>{met ? "✅" : "⬜"}</span>
              <span className={met ? "text-foreground" : "text-secondary-foreground"}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-sm text-secondary-foreground">
            <span>{saved.video_url?.trim() ? "✅" : "⬜"}</span>
            <span>Video URL <span className="italic">(optional)</span></span>
          </div>
        </div>
      )}

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <Field label="Name" name="name" defaultValue={saved.name} required />
          <Field label="Website URL" name="website_url" defaultValue={saved.website_url} required />
          <Field label="Short Description" name="short_description" defaultValue={saved.short_description} textarea />
          <Field label="Description" name="description" defaultValue={saved.description} textarea rows={6} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="video_url" className="mb-1.5 text-sm font-bold text-foreground">Video URL</label>
              <input
                id="video_url"
                name="video_url"
                type="text"
                value={videoUrlDraft}
                onChange={(e) => setVideoUrlDraft(e.target.value)}
                placeholder="https://youtube.com/embed/..."
                className="w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground"
              />
            </div>
            <VideoPreview url={videoUrlDraft} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-neutralLight hover:bg-primary-hover disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => { setEditing(false); setVideoUrlDraft(saved.video_url); }}
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
