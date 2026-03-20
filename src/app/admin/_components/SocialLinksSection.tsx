"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateSocialLinks } from "../organizations/[id]/_actions/updateSocialLinks";
import { FormField, DisplayRow } from "@/components/admin/FormField";
import { SectionHeading } from "@/components/admin/SectionHeading";
import { EditButton, FormButtons } from "@/components/admin/FormControls";
import { OnboardingChecklist } from "@/components/admin/OnboardingChecklist";
import type { AdminOrg } from "@/types/admin";

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
      <SectionHeading action={!editing && <EditButton onClick={() => setEditing(true)} />}>
        Social Links
      </SectionHeading>

      {isOnboarding && (
        <OnboardingChecklist items={[
          { label: "LinkedIn", met: !!saved.linkedin_url?.trim(), optional: true },
          { label: "Instagram", met: !!saved.instagram_url?.trim(), optional: true },
          { label: "Facebook", met: !!saved.facebook_url?.trim(), optional: true },
          { label: "X (Twitter)", met: !!saved.x_url?.trim(), optional: true },
        ]} />
      )}

      {editing ? (
        <form action={handleSubmit} className="space-y-5">
          <FormField label="LinkedIn" name="linkedin_url" defaultValue={saved.linkedin_url} placeholder="https://linkedin.com/company/..." />
          <FormField label="Instagram" name="instagram_url" defaultValue={saved.instagram_url} placeholder="https://instagram.com/..." />
          <FormField label="Facebook" name="facebook_url" defaultValue={saved.facebook_url} placeholder="https://facebook.com/..." />
          <FormField label="X (Twitter)" name="x_url" defaultValue={saved.x_url} placeholder="https://x.com/..." />
          <FormButtons saving={saving} onCancel={() => setEditing(false)} />
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
