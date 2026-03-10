"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrganization } from "../organizations/[id]/_actions/updateOrganization";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { MultiSelect } from "@/components/admin/MultiSelect";
import { GalleryUpload } from "@/components/admin/GalleryUpload";
import type { AdminOrg, AdminOrgRelated } from "@/types/admin";

interface OrgFormProps {
  org: AdminOrg;
  allIndustries: AdminOrgRelated[];
  allServices: AdminOrgRelated[];
  allCities: AdminOrgRelated[];
  allAffinities: AdminOrgRelated[];
}

export function OrgForm({
  org,
  allIndustries,
  allServices,
  allCities,
  allAffinities,
}: OrgFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Image URL state (controlled so we can inject hidden inputs)
  const [logoUrl, setLogoUrl] = useState(org.logo_url ?? "");
  const [bannerUrl, setBannerUrl] = useState(org.photo_url ?? "");
  const [videoUrl, setVideoUrl] = useState(org.video_url ?? "");

  // Multi-select state
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>(
    (org.industries ?? []).map((i) => i.id)
  );
  const [selectedServices, setSelectedServices] = useState<number[]>(
    (org.services ?? []).map((s) => s.id)
  );
  const [selectedCities, setSelectedCities] = useState<number[]>(
    (org.cities ?? []).map((c) => c.id)
  );
  const [selectedAffinities, setSelectedAffinities] = useState<number[]>(
    (org.affinities ?? []).map((a) => a.id)
  );

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
    <form action={handleSubmit} className="max-w-2xl space-y-8">
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

      {/* ── Basic Info ── */}
      <section className="space-y-5">
        <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
          Basic Info
        </h2>
        <Field label="Name" name="name" defaultValue={org.name} required />
        <Field label="Website URL" name="website_url" defaultValue={org.website_url} required />
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
      </section>

      {/* ── Media ── */}
      <section className="space-y-5">
        <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
          Media
        </h2>

        <CloudinaryUpload
          folder="lpdd/logos"
          label="Organization Logo"
          currentUrl={logoUrl}
          onUpload={setLogoUrl}
          aspectRatio="square"
        />
        <input type="hidden" name="logo_url" value={logoUrl} />

        <CloudinaryUpload
          folder="lpdd/banners"
          label="Banner Image"
          currentUrl={bannerUrl}
          onUpload={setBannerUrl}
          aspectRatio="banner"
        />
        <input type="hidden" name="photo_url" value={bannerUrl} />

        <GalleryUpload
          folder="lpdd/gallery"
          initialUrls={(org.gallery_photos ?? []).map((p) => p.url)}
        />

        <Field
          label="Video URL"
          name="video_url"
          defaultValue={videoUrl}
          placeholder="https://youtube.com/embed/..."
        />
      </section>

      {/* ── Classification ── */}
      <section className="space-y-5">
        <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
          Classification
        </h2>

        <MultiSelect
          label="Focus Industries"
          name="industry_ids"
          options={allIndustries}
          selected={selectedIndustries}
          onChange={setSelectedIndustries}
        />

        <MultiSelect
          label="Key Services"
          name="service_ids"
          options={allServices}
          selected={selectedServices}
          onChange={setSelectedServices}
        />

        <MultiSelect
          label="Communities"
          name="affinity_ids"
          options={allAffinities}
          selected={selectedAffinities}
          onChange={setSelectedAffinities}
        />

        <MultiSelect
          label="Locations"
          name="city_ids"
          options={allCities}
          selected={selectedCities}
          onChange={setSelectedCities}
        />
      </section>

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
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
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
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
