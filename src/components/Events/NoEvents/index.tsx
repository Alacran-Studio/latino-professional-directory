"use client";

import Image from "next/image";
import Subheading from "@/components/common/Subheading";
import Paragraph from "@/components/common/Paragraph";

export default function NoEvents() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Image
        src="/Search.svg"
        alt="No Events Found"
        width={133}
        height={131}
        className="opacity-75"
      />
      <Subheading>We couldn&apos;t find any events.</Subheading>
      <Paragraph className="text-secondary-foreground">
        Try adjusting your filters or check back later for new events.
      </Paragraph>
    </div>
  );
}
