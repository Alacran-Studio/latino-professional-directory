import HomeHero from "@/components/Home/HomeHero";
import Directory from "@/components/Directory";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HomeHero></HomeHero>

      {/* <div>
        <p>Placeholder Featured Organizations</p>
      </div> */}

      <Directory className="mt-6"></Directory>
    </main>
  );
}
