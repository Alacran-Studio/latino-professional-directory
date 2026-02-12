import Image from "next/image";

export interface FeaturedOrgCardProps {
  name: string;
  logoUrl: string;
  industry: string;
  websiteUrl: string;
  featured?: boolean;
}

export default function FeaturedOrgCard({
  name,
  logoUrl,
  industry,
  websiteUrl,
  featured = false,
}: FeaturedOrgCardProps) {
  const domain = websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="relative flex flex-col items-center">
      {/* Star badge for featured */}
      {featured && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-2xl md:-top-4 md:left-4 md:translate-x-0">
          <span role="img" aria-label="Featured">&#11088;</span>
        </div>
      )}

      {/* Card */}
      <div className="group flex w-48 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:w-52 md:w-56">
        {/* Logo */}
        <div className="flex h-36 w-full items-center justify-center p-4 sm:h-40">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={200}
            height={200}
            className="max-h-28 w-auto object-contain sm:max-h-32"
          />
        </div>

        {/* Text inside card */}
        <div className="px-4 py-3 text-center">
          <p className="font-lexend text-xs font-bold uppercase tracking-wide sm:text-sm">
            {name}
          </p>
          <p className="mt-1 text-xs font-semibold text-brandGold">
            {industry}
          </p>
          <p className="text-xs text-secondary-foreground">
            {domain}
          </p>
        </div>
      </div>
    </div>
  );
}
