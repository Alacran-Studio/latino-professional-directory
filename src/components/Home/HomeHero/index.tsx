import Image from "next/image";
import DisplayHeading from "@/components/common/DisplayHeading";
import LinkButton from "@/components/common/LinkButton";
import { APP_NAME } from "@/lib/constants";

export default function HomeHero() {
  return (
    <section className="relative h-[500px] w-full bg-black md:h-[60vh] md:min-h-[500px]">
      <div className="h-full w-full">
        <Image
          src="/hero.jpg"
          priority={true}
          width={2048}
          height={1365}
          className="h-full w-full object-cover opacity-60 md:object-[30%_40%]"
          alt="Group of people listening to a panel discussion with panelists seated on stage."
        />
      </div>
      <div className="absolute bottom-[7%] left-0 right-0 flex flex-col items-center px-6 text-center md:bottom-[10%]">
        <h1 className="font-lexend text-sm font-medium tracking-widest text-white/80 uppercase">
          {APP_NAME}
        </h1>
        <DisplayHeading className="mt-2 text-white">
          Find Your Community
        </DisplayHeading>
        <p className="mt-3 max-w-lg text-base font-medium leading-snug text-white/90 md:mt-4">
          Find local events and online career resources tailored to Latino
          professionals across all industries.
        </p>
        <LinkButton href="/about" title="Learn More" className="mt-4 md:mt-5" />
      </div>
    </section>
  );
}
