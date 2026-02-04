import { EventType } from "@/app/types";
import Link from "next/link";
import { isValidString } from "@/lib/utils";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

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

  return (
    <Link href={`/events/${id}`} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg shadow-gray-300 hover:bg-cardHover dark:shadow-gray-800">
        {/* Photo */}
        {isValidString(photo_url) ? (
          <div className="relative h-48 w-full">
            <Image
              src={photo_url}
              alt={`${name} event photo`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-muted">
            <PhotographIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
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
            className="mt-4 w-full rounded-lg bg-brandGold px-4 py-2.5 text-sm font-semibold text-neutral-900"
          >
            Learn More
          </button>
        </div>
      </div>
    </Link>
  );
}
