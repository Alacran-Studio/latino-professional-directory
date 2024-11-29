"use client";

import Subheading from "@/components/common/Subheading";
import Image from "next/image";

export default function LoadingResults() {
  return (
    <div className="animate-strongerPulse flex flex-col items-center justify-center space-y-4 p-8 text-center sm:mt-20">
      <Image
        src="/Search.svg"
        alt="Loading..."
        width={133}
        height={131}
        className="opacity-75"
        priority
      />
      <Subheading className="text-secondary-foreground">
        Loading Organizations...
      </Subheading>
    </div>
  );
}
