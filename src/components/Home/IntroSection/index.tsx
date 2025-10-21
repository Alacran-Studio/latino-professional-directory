import LinkButton from "@/components/common/LinkButton";

export default function IntroSection() {
  return (
    <section
      className={`flex w-full flex-col items-center pt-8 text-center md:pt-10`}
    >
      <LinkButton href="/about" title="Learn More"></LinkButton>
    </section>
  );
}
