import Image from "next/image";
import Header2 from "@/components/common/Header2";
import FeaturedOrgCard from "@/components/Home/FeaturedOrgCard";
import { fetchFeaturedOrganizations } from "@/lib/dbOperations";

export default async function FeaturedOrgs({ className = "" }: { className?: string }) {
  const orgs = await fetchFeaturedOrganizations();

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
          {orgs.map((org) => (
            <FeaturedOrgCard
              key={org.id}
              id={org.id}
              name={org.name}
              logoUrl={org.logo_url}
              shortDescription={org.short_description}
              industries={org.industries}
              featured
            />
          ))}
        </div>
      </div>
    </section>
  );
}
