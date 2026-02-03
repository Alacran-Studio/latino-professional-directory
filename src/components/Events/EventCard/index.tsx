import { EventType } from "@/app/types";
import Paragraph from "@/components/common/Paragraph";
import Subheading from "@/components/common/Subheading";
import Link from "next/link";
import Tags from "@/components/Directory/Tags";
import { isValidString } from "@/lib/utils";
import Image from "next/image";

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
  organizations,
}: EventType) {
  // Format date for display
  const formattedDate = new Date(event_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/events/${id}`}>
      <div className="flex w-full cursor-pointer flex-col items-center rounded-lg border border-border bg-card p-6 shadow-lg shadow-gray-300 transition duration-300 ease-in-out hover:bg-cardHover sm:flex-row dark:shadow-gray-800">
        {/* Event Photo */}
        {isValidString(photo_url) && (
          <div className="h-[150px] w-[200px] flex-shrink-0">
            <Image
              src={photo_url}
              alt={`${name} event photo`}
              width={200}
              height={150}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        )}

        {/* Event Info */}
        <div className="ml-4 flex-1">
          <Subheading>{name}</Subheading>
          <Paragraph className="mb-2 text-sm text-secondary-foreground">
            {formattedDate}
            {event_time && ` • ${event_time}`}
          </Paragraph>
          <Paragraph className="mb-2 text-sm text-secondary-foreground">
            {location} {city && `• ${city.name}`}
          </Paragraph>
          <Paragraph className="mb-2 text-secondary-foreground">
            {short_description}
          </Paragraph>
          {organizations.length > 0 && (
            <Paragraph className="mb-2 text-xs text-muted-foreground">
              Hosted by: {organizations.map((org) => org.name).join(", ")}
            </Paragraph>
          )}
          <Tags tags={industries} className="px-3 py-1 text-label" />
        </div>
      </div>
    </Link>
  );
}
