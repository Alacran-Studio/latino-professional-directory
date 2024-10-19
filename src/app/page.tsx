import Image from "next/image";
import HomeHero from "../components/HomeHero/HomeHero";
import IntroSection from "../components/IntroSection/IntroSection";
import Directory from "../components/Directory/directory";

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
