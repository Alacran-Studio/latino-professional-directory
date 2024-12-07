"use client";

import { IndustryType } from "@/app/types";

interface Props {
  tags: IndustryType[];
  className: string;
}

export default function Tags({ tags, className }: Props) {
  let styles: string = [
    "bg-accent",
    "dark:bg-accent",
    "flex-shrink-0",
    "items-center",
    "space-x-2",
    "rounded-full",
    "inline-block",
  ].join(" ");

  if (className) {
    styles += ` ${className}`;
  }

  return (
    <div className="mt-1 flex flex-wrap gap-2 pb-4">
      {tags.map((tag, index) => (
        <div key={index} className={styles}>
          <span>{tag.name}</span>
        </div>
      ))}
    </div>
  );
}
