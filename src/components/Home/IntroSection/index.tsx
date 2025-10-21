import LinkButton from "@/components/common/LinkButton";

export default function IntroSection() {
  return (
    <section
      className={`flex w-full flex-col items-center pt-8 text-center md:pt-10`}
    >
      <p className="mx-6 max-w-4xl text-xl font-medium leading-snug tracking-normal text-secondary-foreground sm:text-2xl lg:text-3xl">
        Discover organizations and events for the professional development of
        Latinos & allies across industries to build connections and power your
        career.
      </p>
      <div className="mt-8">
        <LinkButton href="/about" title="Learn More"></LinkButton>
      </div>
    </section>
  );
}
