import * as React from "react";
import { EventType } from "@/app/types";
import { notFound } from "next/navigation";
import Tags from "@/components/Directory/Tags";
import Image from "next/image";
import Header1 from "@/components/common/Header1";
import Paragraph from "@/components/common/Paragraph";
import Subheading from "@/components/common/Subheading";
import { isValidString } from "@/lib/utils";
import Link from "next/link";
import { headers } from "next/headers";
import EventRegisterButton from "./_components/EventRegisterButton";

interface PageProps {
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const id = (await params).id;

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(
    `${baseUrl}/api/events/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const { event } = await response.json();
  const typedEvent: EventType = event;

  if (undefined == typedEvent) {
    notFound();
  }

  const {
    name,
    description,
    short_description,
    event_date,
    event_time,
    location,
    city,
    registration_url,
    photo_url,
    video_url,
    is_virtual,
    industries,
    organizations,
  } = typedEvent;

  // Format date for display
  const formattedDate = new Date(event_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="mb-8 sm:px-7 md:px-14 lg:mx-auto lg:mb-16 lg:max-w-7xl">
      <div
        className={`flex flex-col ${isValidString(photo_url) ? "md:flex-row-reverse md:items-end md:justify-between" : ""}`}
      >
        <div
          className={`mb-6 ${isValidString(photo_url) ? "md:w-1/2" : "md:w-full"}`}
        >
          <Header1 className="mb-8 mt-3 text-center">{name}</Header1>

          {/* Event Details */}
          <div className="mb-4">
            <Subheading className="mb-2 text-secondary-foreground">
              {formattedDate}
            </Subheading>
            {event_time && (
              <Paragraph className="mb-2 text-secondary-foreground">
                Time: {event_time}
              </Paragraph>
            )}
            <Paragraph className="mb-4 text-secondary-foreground">
              Location: {location} {city && `• ${city.name}`}{" "}
              {is_virtual === "true" && "(Virtual)"}
            </Paragraph>
          </div>

          <Subheading className="mb-6 text-secondary-foreground">
            {short_description}
          </Subheading>

          <Tags tags={industries} />

          {/* Hosting Organizations */}
          {organizations.length > 0 && (
            <div className="mb-4">
              <Paragraph className="mb-2 text-sm font-semibold">
                Hosted by:
              </Paragraph>
              <div className="mb-4 flex flex-wrap gap-2">
                {organizations.map((org) => (
                  <Link
                    key={org.id}
                    href={`/organizations/${org.id}`}
                    className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"
                  >
                    {org.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Registration Button */}
          {isValidString(registration_url) && (
            <EventRegisterButton
              eventId={id}
              eventName={name}
              registrationUrl={registration_url}
            />
          )}
        </div>

        {/* Event Photo */}
        {isValidString(photo_url) && (
          <div
            className={`h-[288px] w-full max-w-[450px] md:my-auto md:mr-7 md:w-1/2 md:flex-shrink-0 md:object-contain lg:mb-6 lg:mr-14 lg:mt-0 lg:max-w-2xl`}
          >
            <Image
              src={photo_url}
              alt={`${name} event photo`}
              width={450}
              height={288}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className={`${isValidString(photo_url) ? "text-center" : ""}`}>
        <Paragraph className="mb-6">{description}</Paragraph>
      </div>

      {/* Event Video */}
      {isValidString(video_url) && (
        <div className="mt-8">
          <Subheading className="mb-4">Event Video</Subheading>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={video_url}
              title={`${name} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
