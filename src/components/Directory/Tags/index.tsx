"use client";

import { IndustryType } from "@/app/types";

interface Props {
  tags: IndustryType[];
}

export default function Tags({ tags }: Props) {
  return (
    <div className="mt-1 flex flex-wrap gap-2 text-sm">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-accent dark:bg-accent flex-shrink-0 items-center space-x-2 rounded-full px-3 py-1 text-xs"
        >
          <span>{tag.name}</span>
        </div>
      ))}
    </div>
  );
}