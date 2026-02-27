"use client";

interface TagsProps {
  tags: { id: number; name: string }[];
  type?: "industries" | "services";
}

export default function Tags({ tags, type = "industries" }: TagsProps) {
  const pillClass =
    type === "services"
      ? "inline-block rounded-full bg-brand px-3 py-1 text-label font-lexend text-white"
      : "inline-block rounded-full bg-accent px-3 py-1 text-label font-lexend";

  return (
    <div className="mt-1 flex flex-wrap gap-2 pb-4">
      {tags.map((tag) => (
        <span key={tag.id} className={pillClass}>
          {tag.name}
        </span>
      ))}
    </div>
  );
}
