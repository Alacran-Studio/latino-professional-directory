import HomeHero from "@/components/Home/HomeHero";
import FeaturedOrgs from "@/components/Home/FeaturedOrgs";
import Header2 from "@/components/common/Header2";
import Paragraph from "@/components/common/Paragraph";
import LinkButton from "@/components/common/LinkButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HomeHero />

      {/* Featured Organizations */}
      <FeaturedOrgs />

      {/* Directory Preview Section */}
      <section className="flex w-full max-w-6xl flex-col items-center px-6 py-16 md:flex-row md:gap-12 md:py-24">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <Header2>The Directory</Header2>
          <Paragraph className="mt-4 max-w-md text-secondary-foreground">
            Browse organizations dedicated to fostering the growth and
            development of Latino professionals across all industries.
          </Paragraph>
          <LinkButton
            href="/directory"
            title="Browse Directory"
            className="mt-6"
          />
        </div>
        <div className="mt-8 flex-1 md:mt-0">
          <div className="overflow-hidden rounded-xl border border-border shadow-lg">
            <Image
              src="/hero.jpg"
              width={600}
              height={400}
              className="h-auto w-full object-cover"
              alt="Preview of the directory showing organizations."
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full max-w-5xl bg-border" />

      {/* Our Story Section */}
      <section className="flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center md:py-24">
        <Header2>Our Story</Header2>
        <Paragraph className="mt-4 max-w-2xl text-secondary-foreground">
          We strive to provide a comprehensive and updated list of organizations
          dedicated to fostering the growth and development of Latine
          professionals.
        </Paragraph>
        <LinkButton href="/about" title="Learn More" className="mt-6" />
      </section>

      {/* Add Your Org CTA */}
      <section className="w-full bg-brand py-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <Header2 className="text-white">Add Your Organization</Header2>
          <Paragraph className="mt-4 max-w-xl text-white/80">
            Is your organization dedicated to the professional development of
            Latino professionals? Join our directory and connect with the
            community.
          </Paragraph>
          <LinkButton href="/join" title="Get Listed" className="mt-6" />
        </div>
      </section>
    </main>
  );
}
