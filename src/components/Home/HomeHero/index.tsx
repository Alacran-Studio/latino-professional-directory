import { getKoulenFontClass } from "@/lib/utils";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative h-[25vh] min-h-[250px] w-full bg-black md:h-[50vh] md:min-h-[425px]">
      <div className="h-full w-full">
        <Image
          src="/hero.jpg"
          priority={true}
          width={2048}
          height={1365}
          className="h-full w-full object-cover opacity-60 md:object-[30%_60%]"
          alt="Group of people listening to a panel discussion with panelists seated on stage."
        />
      </div>
      <div className="absolute bottom-[15%] left-[5%] mr-[5%] flex flex-col-reverse md:flex-col">
        <h1 className={"text-sm font-medium text-white md:text-3xl"}>
          Latiné Professional Development Directory
        </h1>
        <h2
          className={`${getKoulenFontClass()} text-3xl leading-8 text-white md:text-9xl`}
        >
          Find Your Community
        </h2>
      </div>
    </section>
  );
}
