import EventsDirectory from "@/components/Events";
import Image from "next/image";
import DisplayHeading from "@/components/common/DisplayHeading";
import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Events | ${APP_NAME}`,
  description:
    "Discover networking events, workshops, and conferences for the professional development of Latino professionals.",
};

export default function EventsPage() {
  return (
    <main className="flex flex-col items-center justify-between">
      {/* Hero */}
      <section className="relative h-[300px] w-full bg-black md:h-[400px]">
        <Image
          src="/hero.jpg"
          width={2048}
          height={1365}
          priority
          className="h-full w-full object-cover opacity-50"
          alt="Audience at a professional development event."
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-8 md:px-12 md:pb-12">
          <p className="font-lexend text-sm font-medium tracking-widest text-white/80 uppercase">
            {APP_NAME}
          </p>
          <DisplayHeading className="mt-1 text-accent">
            Upcoming Events
          </DisplayHeading>
        </div>
      </section>

      <EventsDirectory className="mt-6" />
    </main>
  );
}
