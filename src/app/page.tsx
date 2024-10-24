import HomeHero from "@/components/HomeHero";
import IntroSection from "@/components/IntroSection";
import Directory from "@/components/Directory";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HomeHero></HomeHero>
      <IntroSection />

      {/* <div>
        <p>Placeholder Featured Organizations</p>
      </div> */}

      <Directory></Directory>
    </main>
  );
}
