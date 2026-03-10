"use client";

import { GlobeAltIcon } from "@heroicons/react/outline";
import { trackOrgWebsiteClick } from "@/lib/analytics";

interface OrgWebsiteLinkProps {
  orgId: number | string;
  orgName: string;
  websiteUrl: string;
}

export default function OrgWebsiteLink({
  orgId,
  orgName,
  websiteUrl,
}: OrgWebsiteLinkProps) {
  return (
    <div className="flex items-center gap-3">
      <GlobeAltIcon className="h-5 w-5 flex-shrink-0 text-primary" />
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline-offset-2 hover:underline"
        onClick={() => trackOrgWebsiteClick(orgId, orgName)}
      >
        {websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </a>
    </div>
  );
}
