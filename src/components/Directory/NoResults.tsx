"use client";

import Image from "next/image";
import LinkButton from "@/components/common/LinkButton";

export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Image
        src="/Search.svg"
        alt="No Results Found"
        width={150}
        height={150}
        className="opacity-75"
      />
      <h3 className="text-lg font-semibold">We couldn’t find any results.</h3>
      <p className="text-sm text-gray-500">
        Try a different search or refine your filters.
      </p>
      <LinkButton
        href="/contact"
        title="Submit an Organization"
        type="compact"
      />
    </div>
  );
}
