import type { AdminOrg, AdminOrgRelated } from "@/types/admin";
import { BasicInfoSection } from "./BasicInfoSection";
import { MediaSection } from "./MediaSection";
import { ClassificationSection } from "./ClassificationSection";
import { SocialLinksSection } from "./SocialLinksSection";

interface OrgFormProps {
  org: AdminOrg;
  allIndustries: AdminOrgRelated[];
  allServices: AdminOrgRelated[];
  allCities: AdminOrgRelated[];
  allCommunities: AdminOrgRelated[];
  isOnboarding?: boolean;
}

export function OrgForm({ org, allIndustries, allServices, allCities, allCommunities, isOnboarding = false }: OrgFormProps) {
  return (
    <div className="max-w-2xl space-y-10">
      <BasicInfoSection org={org} isOnboarding={isOnboarding} />
      <hr className="border-border" />
      <MediaSection org={org} isOnboarding={isOnboarding} />
      <hr className="border-border" />
      <ClassificationSection
        org={org}
        allIndustries={allIndustries}
        allServices={allServices}
        allCities={allCities}
        allCommunities={allCommunities}
        isOnboarding={isOnboarding}
      />
      <hr className="border-border" />
      <SocialLinksSection org={org} isOnboarding={isOnboarding} />
    </div>
  );
}
