import Image from "next/image";
import HomeHero from "./ui/home-hero";
import IntroSection from "./ui/intro-section";
import Directory from "./ui/directory";

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
