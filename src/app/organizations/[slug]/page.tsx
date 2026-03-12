import * as React from "react";
import type { Metadata } from "next";
import { DirectoryOrgType } from "@/app/types";
import { notFound, permanentRedirect } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { isValidString } from "@/lib/utils";
import EventCard from "@/components/Events/EventCard";
import Header1 from "@/components/common/Header1";
import OrganizationProfile from "@/components/OrganizationProfile";
import type { OrganizationProfileUI } from "@/types/organization";
import {
  fetchOrganizationBySlug,
  fetchOrgSlugById,
  fetchEventsForOrganization,
} from "@/lib/dbOperations";
import { APP_NAME } from "@/lib/constants";

const COVER_FALLBACK =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop";

function toProfileUI(org: DirectoryOrgType): OrganizationProfileUI {
  return {
    id: org.id,
    name: org.name,
    slug: org.slug,
    logo_url: org.logo_url ?? null,
    photo_url: org.photo_url ?? null,
    banner_position: org.banner_position ?? null,
    short_description: org.short_description ?? null,
    description: org.description ?? null,
    website_url: org.website_url ?? null,
    video_url: org.video_url ?? null,
    linkedin_url: org.linkedin_url ?? null,
    instagram_url: org.instagram_url ?? null,
    facebook_url: org.facebook_url ?? null,
    x_url: org.x_url ?? null,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let org;
  try {
    org = await fetchOrganizationBySlug(slug);
  } catch {
    return {};
  }
  if (!org) return {};

  const title = `${org.name} | ${APP_NAME}`;
  const description = isValidString(org.short_description)
    ? org.short_description
    : isValidString(org.description)
    ? org.description.slice(0, 160)
    : undefined;

  const image = isValidString(org.photo_url)
    ? org.photo_url
    : isValidString(org.logo_url)
    ? org.logo_url
    : COVER_FALLBACK;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 400 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

interface PageProps {
  slug: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { slug } = await params;

  // Slug-first: try to find org by slug (handles "1871" slug correctly)
  let org: DirectoryOrgType | null = await fetchOrganizationBySlug(slug);

  // Not found by slug — check if it's a legacy numeric ID and redirect
  if (!org) {
    const numericId = Number(slug);
    if (Number.isInteger(numericId) && numericId > 0 && String(numericId) === slug) {
      const resolvedSlug = await fetchOrgSlugById(numericId);
      if (resolvedSlug) permanentRedirect(`/organizations/${resolvedSlug}`);
    }
    notFound();
  }

  const events = await fetchEventsForOrganization(org.id);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="absolute left-4 top-4 z-10 sm:left-7 md:left-14">
        <BackButton href="/directory" label="Directory" />
      </div>
      <OrganizationProfile org={toProfileUI(org)} />
      {events.length > 0 && (
        <div className="mt-8 space-y-6 px-4 sm:px-7 md:px-14">
          <Header1 className="mb-6">Events from {org.name}</Header1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
