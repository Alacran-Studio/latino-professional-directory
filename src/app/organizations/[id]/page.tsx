import * as React from "react";
import { DirectoryOrgType } from "@/app/types";
import { notFound } from "next/navigation";
import Tags from "@/components/Directory/Tags";
import Image from "next/image";
import Header1 from "@/components/common/Header1";
import Paragraph from "@/components/common/Paragraph";
import Subheading from "@/components/common/Subheading";
import { NewTabIcon } from "@/components/ui/icons/NewTabSvg";
import { isValidString } from "@/lib/utils";
import EventCard from "@/components/Events/EventCard";

interface PageProps {
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const id = (await params).id;

  // Fetch organization from API to get events
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/organizations/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const { organization } = await response.json();
  const org: DirectoryOrgType = organization;

  if (undefined == org) {
    notFound();
  }

  const {
    name,
    description,
    short_description,
    logo_url,
    website_url,
    industries,
    photo_url,
    video_url,
    events = [],
  } = org;

  return (
    <section className="mb-8 sm:px-7 md:px-14 lg:mx-auto lg:mb-16 lg:max-w-7xl">
      <div
        className={`flex flex-col ${isValidString(logo_url) ? "md:flex-row-reverse md:items-end md:justify-between" : ""}`}
      >
        <div
          className={`mb-6 ${isValidString(logo_url) ? "md:w-1/2" : "md:w-full"}`}
        >
          <Header1 className="mb-8 mt-3 text-center">{name}</Header1>
          <Subheading className="mb-6 text-secondary-foreground">
            {short_description}
          </Subheading>
          <Tags tags={industries} className="px-8 py-2 text-label text-white" />
          <a
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-2 text-label text-white hover:bg-primary-hover"
            href={website_url}
          >
            <span>Website</span>
            <NewTabIcon />
          </a>
        </div>

        {isValidString(logo_url) && (
          <div
            className={`h-[288px] w-full max-w-[450px] md:my-auto md:mr-7 md:w-1/2 md:flex-shrink-0 md:object-contain lg:mb-6 lg:mr-14 lg:mt-0 lg:max-w-2xl`}
          >
            <Image
              src={logo_url}
              alt={`Logo for ${name}`}
              width={450}
              height={288}
              className="h-full w-full rounded-md object-scale-down"
            />
          </div>
        )}
      </div>
      <div className={`${isValidString(logo_url) ? "text-center" : ""}`}>
        <Paragraph className="mb-6">{description}</Paragraph>
      </div>

      {/* Events Section */}
      {events.length > 0 && (
        <div className="mt-12">
          <Header1 className="mb-6 text-center">Events from {name}</Header1>
          <div className="grid gap-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
