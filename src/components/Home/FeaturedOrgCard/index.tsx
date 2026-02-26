import Image from "next/image";
import Link from "next/link";
import { IndustryType } from "@/app/types";
import IndustryPill from "@/components/common/IndustryPill";

export interface FeaturedOrgCardProps {
  id: number;
  name: string;
  logoUrl: string;
  shortDescription?: string;
  industries: IndustryType[];
}

export default function FeaturedOrgCard({
  id,
  name,
  logoUrl,
  shortDescription,
  industries,
}: FeaturedOrgCardProps) {
  return (
    <div className="relative flex h-full flex-col items-center">

      {/* Card */}
      <Link
        href={`/organizations/${id}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-accent bg-card shadow-xl transition-shadow hover:shadow-2xl sm:w-52 md:w-56"
      >
        {/* Logo */}
        <div className="flex h-36 w-full items-center justify-center p-4 transition-colors group-hover:bg-muted/40 sm:h-40">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={200}
            height={200}
            className="max-h-28 w-auto object-contain sm:max-h-32"
          />
        </div>

        {/* Text inside card — grows to fill remaining card height */}
        <div className="flex flex-1 flex-col items-center justify-start px-4 py-3 text-center">
          <p className="font-lexend text-sm font-bold sm:text-base">
            {name}
          </p>
          {industries.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {industries.map((industry) => (
                <IndustryPill key={industry.id} industry={industry} />
              ))}
            </div>
          )}
          {shortDescription && (
            <p className="mt-auto pt-3 text-base text-secondary-foreground sm:text-sm">{shortDescription}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
