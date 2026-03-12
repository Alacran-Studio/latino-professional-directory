"use client";

import type { AdminOrg, AdminOrgRelated } from "@/types/admin";
import type { OrganizationProfileUI } from "@/types/organization";
import { BasicInfoSection } from "./BasicInfoSection";
import { MediaSection } from "./MediaSection";
import { ClassificationSection } from "./ClassificationSection";
import { SocialLinksSection } from "./SocialLinksSection";
import { OrgFormProvider, useOrgFormContext } from "./OrgFormContext";
import OrganizationProfile from "@/components/OrganizationProfile";

interface OrgFormProps {
  org: AdminOrg;
  allIndustries: AdminOrgRelated[];
  allServices: AdminOrgRelated[];
  allCities: AdminOrgRelated[];
  allAffinities: AdminOrgRelated[];
}

function toProfileUI(org: AdminOrg): OrganizationProfileUI {
  return {
    id: org.id,
    name: org.name,
    slug: org.slug,
    logo_url: org.logo_url,
    photo_url: org.photo_url,
    banner_position: org.banner_position,
    short_description: org.short_description,
    description: org.description,
    website_url: org.website_url,
    video_url: org.video_url,
    linkedin_url: org.linkedin_url,
    instagram_url: org.instagram_url,
    facebook_url: org.facebook_url,
    x_url: org.x_url,
    industries: org.industries ?? [],
    services: org.services ?? [],
    affinities: org.affinities ?? [],
    cities: org.cities ?? [],
    gallery_photos: (org.gallery_photos ?? []).map((p) => ({
      id: p.id,
      url: p.url,
      display_order: p.display_order,
    })),
  };
}

function PreviewPanel() {
  const { preview } = useOrgFormContext();
  return (
    <div className="sticky top-8 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-xl border border-border">
      <div className="border-b border-border px-4 py-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
          Live Preview
        </p>
      </div>
      <OrganizationProfile org={preview} />
    </div>
  );
}

export function OrgForm({ org, allIndustries, allServices, allCities, allAffinities }: OrgFormProps) {
  return (
    <OrgFormProvider initialOrg={toProfileUI(org)}>
      <div className="flex items-start gap-8">
        <div className="min-w-0 max-w-2xl flex-1 space-y-10">
          <BasicInfoSection org={org} />
          <hr className="border-border" />
          <MediaSection org={org} />
          <hr className="border-border" />
          <ClassificationSection
            org={org}
            allIndustries={allIndustries}
            allServices={allServices}
            allCities={allCities}
            allAffinities={allAffinities}
          />
          <hr className="border-border" />
          <SocialLinksSection org={org} />
        </div>
        <div className="w-[520px] shrink-0">
          <PreviewPanel />
        </div>
      </div>
    </OrgFormProvider>
  );
}
