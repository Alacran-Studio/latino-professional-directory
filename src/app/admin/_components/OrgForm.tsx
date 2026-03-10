"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrganization } from "../organizations/[id]/_actions/updateOrganization";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { MultiSelect } from "@/components/admin/MultiSelect";
import { GalleryUpload } from "@/components/admin/GalleryUpload";
import { RequestOptionModal } from "@/components/admin/RequestOptionModal";
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
  const [bannerPosition, setBannerPosition] = useState(org.banner_position ?? "50% 50%");
  const [videoUrl, setVideoUrl] = useState(org.video_url ?? "");

  // Multi-select state (full objects for FilterDropdown compatibility)
  const [selectedIndustries, setSelectedIndustries] = useState(org.industries ?? []);
  const [selectedServices, setSelectedServices] = useState(org.services ?? []);
  const [selectedCities, setSelectedCities] = useState(org.cities ?? []);
  const [selectedAffinities, setSelectedAffinities] = useState(org.affinities ?? []);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          currentPosition={bannerPosition}
          onUpload={setBannerUrl}
          onPositionChange={setBannerPosition}
          aspectRatio="banner"
        />
        <p className="-mt-1 text-xs text-secondary-foreground">
          Use a landscape image for best results — recommended 1200×400px or wider.
        </p>
        <input type="hidden" name="photo_url" value={bannerUrl} />
        <input type="hidden" name="banner_position" value={bannerPosition} />

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

        <div className="space-y-1.5">
          <MultiSelect
            label="Focus Industries"
            name="industry_ids"
            options={allIndustries}
            selected={selectedIndustries}
            onChange={setSelectedIndustries}
          />
          <RequestOptionModal orgName={org.name} orgId={org.id} optionType="industry" />
        </div>

        <div className="space-y-1.5">
          <MultiSelect
            label="Key Services"
            name="service_ids"
            options={allServices}
            selected={selectedServices}
            onChange={setSelectedServices}
          />
          <RequestOptionModal orgName={org.name} orgId={org.id} optionType="service" />
        </div>

        <div className="space-y-1.5">
          <MultiSelect
            label="Communities"
            name="affinity_ids"
            options={allAffinities}
            selected={selectedAffinities}
            onChange={setSelectedAffinities}
          />
          <RequestOptionModal orgName={org.name} orgId={org.id} optionType="community" />
        </div>

        <MultiSelect
          label="Locations"
          name="city_ids"
          options={allCities}
          selected={selectedCities}
          onChange={setSelectedCities}
        />
      </section>

      {/* ── Social Links ── */}
      <section className="space-y-5">
        <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
          Social Links
        </h2>
        <Field label="LinkedIn" name="linkedin_url" defaultValue={org.linkedin_url ?? ""} placeholder="https://linkedin.com/company/..." />
        <Field label="Instagram" name="instagram_url" defaultValue={org.instagram_url ?? ""} placeholder="https://instagram.com/..." />
        <Field label="Facebook" name="facebook_url" defaultValue={org.facebook_url ?? ""} placeholder="https://facebook.com/..." />
        <Field label="X (Twitter)" name="x_url" defaultValue={org.x_url ?? ""} placeholder="https://x.com/..." />
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
