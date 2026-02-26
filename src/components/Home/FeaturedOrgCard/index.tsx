import Image from "next/image";
import Link from "next/link";
import { IndustryType } from "@/app/types";

export interface FeaturedOrgCardProps {
  id: number;
  name: string;
  logoUrl: string;
  industries: IndustryType[];
  featured?: boolean;
}

export default function FeaturedOrgCard({
  id,
  name,
  logoUrl,
  industries,
  featured = false,
}: FeaturedOrgCardProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Star badge for featured */}
      {featured && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-2xl md:-top-4 md:left-4 md:translate-x-0">
          <span role="img" aria-label="Featured">&#11088;</span>
        </div>
      )}

      {/* Card */}
      <Link
        href={`/organizations/${id}`}
        className="group flex w-48 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl transition-shadow hover:shadow-2xl sm:w-52 md:w-56"
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

        {/* Text inside card — fixed height so all cards align */}
        <div className="flex min-h-[72px] flex-col items-center justify-start px-4 py-3 text-center">
          <p className="font-lexend text-xs font-bold uppercase tracking-wide sm:text-sm">
            {name}
          </p>
          {industries.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {industries.map((industry) => (
                <span
                  key={industry.id}
                  className="inline-block rounded-full bg-brandGold px-2 py-0.5 text-xs font-semibold"
                >
                  {industry.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
