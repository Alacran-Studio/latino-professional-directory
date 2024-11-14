import { DirectoryOrgType } from "@/app/types";
import Logo from "@/components/Directory/Logo";
import Tags from "@/components/Directory/Tags";

export default function DirectoryOrg({
  logo_url,
  name,
  description,
  industries,
}: DirectoryOrgType) {
  return (
    <div className="flex w-full cursor-pointer flex-col items-center rounded-lg border border-border bg-card p-6 shadow-lg shadow-gray-300 transition duration-300 ease-in-out hover:bg-cardHover sm:flex-row dark:shadow-gray-800">
      {/* Organization Logo */}
      <Logo src={logo_url} alt={`${name} logo`} width={200} height={200} />

      {/* Organization Info */}
      <div className="ml-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">
          {description}
        </p>
        <div className="mt-1 flex flex-wrap gap-2 text-sm">
          <Tags tags={industries} />
        </div>
      </div>
    </div>
  );
}
