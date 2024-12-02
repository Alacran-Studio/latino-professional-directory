import { DirectoryOrgType } from "@/app/types";
import Paragraph from "@/components/common/Paragraph";
import Subheading from "@/components/common/Subheading";
import Link from "next/link";
import Logo from "@/components/Directory/Logo";
import Tags from "@/components/Directory/Tags";
import { isValidString } from "@/lib/utils";

export default function DirectoryOrg({
  id,
  logo_url,
  name,
  short_description,
  industries,
}: DirectoryOrgType) {
  return (
    <Link href={`/organizations/${id}`}>
      <div className="flex w-full cursor-pointer flex-col items-center rounded-lg border border-border bg-card p-6 shadow-lg shadow-gray-300 transition duration-300 ease-in-out hover:bg-cardHover sm:flex-row dark:shadow-gray-800">
        {/* Organization Logo */}
        {isValidString(logo_url) && (
          <Logo src={logo_url} alt={`${name} logo`} width={200} height={200} />
        )}

        {/* Organization Info */}
        <div className="ml-4">
          <Subheading>{name}</Subheading>
          <Paragraph className="text-secondary-foreground">
            {short_description}
          </Paragraph>
          <Tags tags={industries} className="px-3 py-1" />
        </div>
      </div>
    </Link>
  );
}
