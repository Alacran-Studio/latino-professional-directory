import { IndustryType } from "@/app/types";

export default function IndustryPill({ industry }: { industry: IndustryType }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-label font-lexend leading-none">
      {industry.name}
    </span>
  );
}
