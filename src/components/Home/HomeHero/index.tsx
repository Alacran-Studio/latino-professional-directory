import Image from "next/image";
import Link from "next/link";
import Header1 from "@/components/common/Header1";

export default function HomeHero() {
  return (
    <section className="relative h-[75vh] min-h-[300px] w-full bg-black md:h-[60vh] md:min-h-[500px]">
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
        <Header1 className="text-white">Latino Professional Directory</Header1>
        <p className={"mt-3 text-base font-medium leading-snug text-white md:mt-4"}>
          Find local events and online career resources tailored to Latino
          professionals across all industries.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[15px] text-white transition-all duration-200 hover:bg-primary-hover md:mt-5"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
