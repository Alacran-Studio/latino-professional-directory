"use client";

import Image from "next/image";
import LinkButton from "@/components/common/LinkButton";
import Subheading from "@/components/common/Subheading";
import Paragraph from "@/components/common/Paragraph";

export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Image
        src="/Search.svg"
        alt="No Results Found"
        width={133}
        height={131}
        className="opacity-75"
      />
      <Subheading>We couldn’t find any results.</Subheading>
      <Paragraph className="text-secondary-foreground">
        Try a different search or refine your filters.
      </Paragraph>
      <LinkButton
        href="/join"
        title="Submit an Organization"
        type="compact"
      />
    </div>
  );
}
