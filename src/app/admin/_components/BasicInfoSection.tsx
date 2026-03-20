"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateBasicInfo } from "../organizations/[id]/_actions/updateBasicInfo";
import { useCompletion } from "./CompletionContext";
import { FormField, DisplayRow, formInputCls } from "@/components/admin/FormField";
import { SectionHeading } from "@/components/admin/SectionHeading";
import { EditButton, FormButtons } from "@/components/admin/FormControls";
import { OnboardingChecklist } from "@/components/admin/OnboardingChecklist";
import type { AdminOrg } from "@/types/admin";

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
      <SectionHeading action={!editing && <EditButton onClick={() => setEditing(true)} />}>
        Basic Info
      </SectionHeading>

      {isOnboarding && (
        <OnboardingChecklist items={[
          { label: "Name", met: !!saved.name?.trim() },
          { label: "Website URL", met: !!saved.website_url?.trim() },
          { label: "Short Description", met: !!saved.short_description?.trim() },
          { label: "Description", met: !!saved.description?.trim() },
          { label: "Video URL", met: !!saved.video_url?.trim(), optional: true },
        ]} />
      )}

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <FormField label="Name" name="name" defaultValue={saved.name} required />
          <FormField label="Website URL" name="website_url" defaultValue={saved.website_url} required />
          <FormField label="Short Description" name="short_description" defaultValue={saved.short_description} textarea />
          <FormField label="Description" name="description" defaultValue={saved.description} textarea rows={6} />
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
                className={formInputCls}
              />
            </div>
            <VideoPreview url={videoUrlDraft} />
          </div>
          <FormButtons saving={saving} onCancel={() => { setEditing(false); setVideoUrlDraft(saved.video_url); }} />
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
