"use client";

import { IndustryType } from "@/app/types";
import IndustryPill from "@/components/common/IndustryPill";

interface Props {
  tags: IndustryType[];
}

export default function Tags({ tags }: Props) {
  return (
    <div className="mt-1 flex flex-wrap gap-2 pb-4">
      {tags.map((tag) => (
        <IndustryPill key={tag.id} industry={tag} />
      ))}
    </div>
  );
}
