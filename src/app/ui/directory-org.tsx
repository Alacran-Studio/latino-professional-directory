import Image from "next/image";
import { DirectoryOrgType } from "../types";

export default function DirectoryOrg({
  logo_url,
  name,
  description,
  industry_tags,
}: DirectoryOrgType) {
  return (
    <div className="border-border bg-card hover:bg-cardHover flex w-full cursor-pointer flex-col items-center rounded-lg border p-6 shadow-lg shadow-gray-300 transition duration-300 ease-in-out sm:flex-row dark:shadow-gray-800">
      {/* Organization Logo */}
      <div className="dark:from-logoGradientFrom dark:via-logoGradientVia dark:to-logoGradientTo mb-4 h-36 w-36 flex-shrink-0 rounded-lg p-2 sm:mb-0 sm:mr-4 sm:h-32 sm:w-32 dark:bg-gradient-to-r">
        <Image
          src={logo_url}
          alt={`${name} logo`}
          width={200}
          height={200}
          className="h-full w-full rounded-md object-scale-down"
        />
      </div>

      {/* Organization Info */}
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">
          {description}
        </p>
        <div className="mt-1 flex flex-wrap gap-2 text-sm">
          {industry_tags.map((industry_tag, index) => (
            <div
              key={index}
              className="flex-shrink-0 items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-xs dark:bg-blue-900"
            >
              <span>{industry_tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
