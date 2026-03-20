import type { AdminOrg } from "@/types/admin";

export interface OrgCompletion {
  basicInfo: {
    name: boolean;
    website_url: boolean;
    short_description: boolean;
    description: boolean;
    complete: boolean;
  };
  media: {
    logo: boolean;
    banner: boolean;
    complete: boolean;
  };
  classification: {
    industry: boolean;
    service: boolean;
    city: boolean;
    complete: boolean;
  };
  metCount: number;
  total: number;
  allComplete: boolean;
}

export function computeCompletion(org: AdminOrg): OrgCompletion {
  const name = !!org.name?.trim();
  const website_url = !!org.website_url?.trim();
  const short_description = !!org.short_description?.trim();
  const description = !!org.description?.trim();
  const logo = !!org.logo_url?.trim();
  const banner = !!org.photo_url?.trim();
  const industry = (org.industries?.length ?? 0) > 0;
  const service = (org.services?.length ?? 0) > 0;
  const city = (org.cities?.length ?? 0) > 0;

  const basicInfoComplete = name && website_url && short_description && description;
  const mediaComplete = logo && banner;
  const classificationComplete = industry && service && city;

  const requirements = [name, website_url, short_description, description, logo, banner, industry, service, city];
  const metCount = requirements.filter(Boolean).length;

  return {
    basicInfo: { name, website_url, short_description, description, complete: basicInfoComplete },
    media: { logo, banner, complete: mediaComplete },
    classification: { industry, service, city, complete: classificationComplete },
    metCount,
    total: requirements.length,
    allComplete: metCount === requirements.length,
  };
}
