"use client";

import { EventType } from "@/app/types";
import Link from "next/link";
import { isValidString } from "@/lib/utils";
import Image from "next/image";
import { trackEventClick } from "@/lib/analytics";
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

const DEFAULT_IMAGES: Record<string, string> = {
  Tech: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
  Healthcare:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  Finance:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  "Professional Services":
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
  "Venture Capital":
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
  Education:
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
  Engineering:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
  "Real Estate":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  Law: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop";

function getDefaultImage(industries: EventType["industries"]): string {
  for (const industry of industries) {
    if (DEFAULT_IMAGES[industry.name]) {
      return DEFAULT_IMAGES[industry.name];
    }
  }
  return FALLBACK_IMAGE;
}

export default function EventCard({
  id,
  name,
  short_description,
  event_date,
  event_time,
  location,
  city,
  photo_url,
  industries,
}: EventType) {
  const formattedDate = new Date(event_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const locationText = [location, city?.name].filter(Boolean).join(", ");
  const imageUrl = isValidString(photo_url)
    ? photo_url
    : getDefaultImage(industries);

  return (
    <Link href={`/events/${id}`} onClick={() => trackEventClick(id, name)} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg shadow-gray-300 hover:bg-cardHover dark:shadow-gray-800">
        {/* Photo */}
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={`${name} event photo`}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 font-lexend">
          {/* Industry tag */}
          {industries.length > 0 && (
            <p className="text-sm font-semibold text-brandGold">
              {industries.map((i) => i.name).join(" / ")}
            </p>
          )}

          {/* Event name */}
          <h3 className="mt-1 text-base font-bold uppercase tracking-wide">
            {name}
          </h3>

          {/* Description */}
          {isValidString(short_description) && (
            <p className="mt-2 line-clamp-2 text-sm text-secondary-foreground">
              {short_description}
            </p>
          )}

          {/* Details block */}
          <div className="mt-auto space-y-1 pt-4 text-sm text-secondary-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
            {isValidString(event_time) && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 flex-shrink-0" />
                <span>{event_time}</span>
              </div>
            )}
            {isValidString(locationText) && (
              <div className="flex items-center gap-2">
                <LocationMarkerIcon className="h-4 w-4 flex-shrink-0" />
                <span>{locationText}</span>
              </div>
            )}
          </div>

          {/* Learn More button */}
          <button
            tabIndex={-1}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-brandGold to-yellow-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Learn More
          </button>
        </div>
      </div>
    </Link>
  );
}
