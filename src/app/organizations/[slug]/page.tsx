import * as React from "react";
import type { Metadata } from "next";
import { DirectoryOrgType, OrgPhotoType } from "@/app/types";
import { notFound, permanentRedirect } from "next/navigation";
import Tags from "@/components/Directory/Tags";
import Image from "next/image";
import Header1 from "@/components/common/Header1";
import Paragraph from "@/components/common/Paragraph";
import BackButton from "@/components/common/BackButton";
import CoverImage from "@/components/common/CoverImage";
import { isValidString } from "@/lib/utils";
import EventCard from "@/components/Events/EventCard";
import { LocationMarkerIcon, GlobeAltIcon } from "@heroicons/react/outline";
import OrgWebsiteLink from "./_components/OrgWebsiteLink";
import SocialLinks from "./_components/SocialLinks";
import {
  fetchOrganizationBySlug,
  fetchOrgSlugById,
  fetchEventsForOrganization,
} from "@/lib/dbOperations";
import { APP_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const org = await fetchOrganizationBySlug(slug);
  if (!org) return {};

  const title = `${org.name} | ${APP_NAME}`;
  const description = isValidString(org.short_description)
    ? org.short_description
    : isValidString(org.description)
    ? org.description.slice(0, 160)
    : undefined;
  const image = isValidString(org.photo_url) ? org.photo_url : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && { images: [{ url: image, width: 1200, height: 400 }] }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

const COVER_FALLBACK =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop";

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

  const {
    id,
    name,
    description,
    short_description,
    logo_url,
    website_url,
    industries,
    services = [],
    affinities = [],
    gallery_photos = [],
    photo_url,
    banner_position,
    video_url,
    linkedin_url,
    instagram_url,
    facebook_url,
    x_url,
    cities = [],
  } = org;

  const coverSrc = isValidString(photo_url) ? photo_url : COVER_FALLBACK;
  const cityText = cities.map((c) => c.name).join(", ");
  const hasSocialLinks = [linkedin_url, instagram_url, facebook_url, x_url].some(isValidString);

  // Embed-friendly video URL (YouTube short links → embed)
  const embedUrl = isValidString(video_url)
    ? video_url
        .replace("youtube.com/watch?v=", "youtube.com/embed/")
        .replace("youtu.be/", "youtube.com/embed/")
    : null;

  return (
    <article className="mx-auto mb-8 w-full max-w-7xl lg:mb-16">
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden rounded-b-2xl sm:h-56 md:h-72 lg:h-80">
        <CoverImage
          src={coverSrc}
          fallback={COVER_FALLBACK}
          alt={`${name} cover photo`}
          objectPosition={banner_position ?? "50% 50%"}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40" />
        <div className="absolute left-4 top-4 z-10 sm:left-7 md:left-14">
          <BackButton href="/directory" label="Directory" />
        </div>
      </div>

      {/* Org info card */}
      <div className="-mt-16 relative z-10 mx-4 rounded-xl border border-border bg-card p-6 shadow-lg sm:mx-7 md:mx-14">
        <div className="flex flex-col items-center gap-4 font-lexend sm:flex-row sm:items-start">
          {isValidString(logo_url) ? (
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border sm:h-24 sm:w-24">
              <Image
                src={logo_url}
                alt={`${name} logo`}
                fill
                sizes="96px"
                className="object-scale-down"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-border sm:h-24 sm:w-24">
              <GlobeAltIcon className="h-10 w-10 text-secondary-foreground" />
            </div>
          )}

          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold uppercase tracking-wide sm:text-2xl">
              {name}
            </h1>
            {isValidString(short_description) && (
              <p className="mt-1 text-base text-secondary-foreground">
                {short_description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="mt-8 space-y-8 px-4 sm:px-7 md:px-14">
        {/* About Us */}
        {isValidString(description) && (
          <section className="rounded-xl border border-border bg-card p-6 shadow-lg font-lexend">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-wide sm:text-xl">
              About Us
            </h2>
            <Paragraph className="text-sm text-secondary-foreground">
              {description}
            </Paragraph>
          </section>
        )}

        {/* Contact Info + Focus Industries */}
        {(isValidString(cityText) ||
          isValidString(website_url) ||
          hasSocialLinks ||
          industries.length > 0) && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(isValidString(cityText) || isValidString(website_url) || hasSocialLinks) && (
              <section className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <h2 className="mb-4 font-lexend text-lg font-bold uppercase tracking-wide sm:text-xl">
                  Contact Info
                </h2>
                <div className="space-y-3">
                  {isValidString(cityText) && (
                    <div className="flex items-center gap-3">
                      <LocationMarkerIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-secondary-foreground">{cityText}</span>
                    </div>
                  )}
                  {isValidString(website_url) && (
                    <OrgWebsiteLink
                      orgId={id}
                      orgName={name}
                      websiteUrl={website_url}
                    />
                  )}
                  <SocialLinks
                    linkedin_url={linkedin_url}
                    instagram_url={instagram_url}
                    facebook_url={facebook_url}
                    x_url={x_url}
                  />
                </div>
              </section>
            )}

            {industries.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <h2 className="mb-4 font-lexend text-lg font-bold uppercase tracking-wide sm:text-xl">
                  Focus Industries
                </h2>
                <Tags tags={industries} />
              </section>
            )}
          </div>
        )}

        {/* Key Services + Communities */}
        {(services.length > 0 || affinities.length > 0) && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <h2 className="mb-4 font-lexend text-lg font-bold uppercase tracking-wide sm:text-xl">
                  Key Services
                </h2>
                <Tags tags={services} type="services" />
              </section>
            )}

            {affinities.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <h2 className="mb-4 font-lexend text-lg font-bold uppercase tracking-wide sm:text-xl">
                  Communities
                </h2>
                <Tags tags={affinities} />
              </section>
            )}
          </div>
        )}

        {/* Photo Gallery */}
        {gallery_photos.length > 0 && (
          <section>
            <h2 className="mb-4 font-lexend text-lg font-bold uppercase tracking-wide sm:text-xl">
              Gallery
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery_photos.map((photo: OrgPhotoType) => (
                <div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-xl border border-border"
                >
                  <Image
                    src={photo.url}
                    alt={`${name} gallery photo`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {embedUrl && (
          <section>
            <h2 className="mb-4 font-lexend text-lg font-bold uppercase tracking-wide sm:text-xl">
              Video
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
              <iframe
                src={embedUrl}
                title={`${name} video`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Events */}
        {events.length > 0 && (
          <section>
            <Header1 className="mb-6">Events from {name}</Header1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}
