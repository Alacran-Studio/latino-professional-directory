import Image from "next/image";
import Header2 from "@/components/common/Header2";
import FeaturedOrgCard from "@/components/Home/FeaturedOrgCard";
import type { FeaturedOrgCardProps } from "@/components/Home/FeaturedOrgCard";

const FEATURED_ORGS: FeaturedOrgCardProps[] = [
  {
    name: "Techqueria",
    logoUrl: "/org-logos/techqueria/techqueria-logo.png",
    industry: "Tech and Engineering",
    websiteUrl: "https://www.techqueria.org",
  },
  {
    name: "ALPFA",
    logoUrl: "/org-logos/alpfa/alpfa-logo.png",
    industry: "Finance",
    websiteUrl: "https://www.alpfa.org",
  },
  {
    name: "1871",
    logoUrl: "/org-logos/1871/1871-logo.png",
    industry: "Tech and Innovation",
    websiteUrl: "https://www.1871.com",
  },
];

export default function FeaturedOrgs({ className = "" }: { className?: string }) {
  return (
    <section className={`relative w-full overflow-hidden py-16 md:py-24 ${className}`}>
      {/* Background art - blue blob */}
      <Image
        src="/design-elements/feature-bg-blue.png"
        alt=""
        width={1440}
        height={500}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none object-cover opacity-60"
      />

      {/* Background art - yellow swoosh */}
      <Image
        src="/design-elements/feature-bg-yellow.svg"
        alt=""
        width={1440}
        height={824}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-full max-w-none opacity-50"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6">
        <Header2 className="text-center">Featured Organizations</Header2>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-10">
          {FEATURED_ORGS.map((org) => (
            <FeaturedOrgCard key={org.name} {...org} />
          ))}
        </div>
      </div>
    </section>
  );
}
