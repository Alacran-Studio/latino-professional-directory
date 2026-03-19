"use client";

import Image from "next/image";
import Link from "next/link";
import { IndustryType } from "@/app/types";
import IndustryPill from "@/components/common/IndustryPill";
import { trackFeaturedOrgClick } from "@/lib/analytics";

export interface FeaturedOrgCardProps {
  id: number;
  slug: string;
  name: string;
  logoUrl: string;
  shortDescription?: string;
  industries: IndustryType[];
}

export default function FeaturedOrgCard({
  id,
  slug,
  name,
  logoUrl,
  shortDescription,
  industries,
}: FeaturedOrgCardProps) {
  return (
    <Link
      href={`/organizations/${slug}`}
      onClick={() => trackFeaturedOrgClick(id, name)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border-2 border-accent bg-card shadow-xl transition-all duration-300 ease-in-out hover:bg-cardHover hover:shadow-2xl sm:w-56 md:w-64"
    >
        {/* Logo */}
        <div className="flex h-28 w-full items-center justify-center p-4 transition-colors group-hover:bg-muted/40">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={200}
            height={200}
            className="max-h-20 w-auto object-contain"
          />
        </div>

        {/* Text inside card — grows to fill remaining card height */}
        <div className="flex flex-1 flex-col items-center justify-start px-4 py-3 text-center">
          <p className="font-lexend text-base font-bold">
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
            <p className="mt-2 text-xs text-secondary-foreground">{shortDescription}</p>
          )}
        </div>
    </Link>
  );
}
