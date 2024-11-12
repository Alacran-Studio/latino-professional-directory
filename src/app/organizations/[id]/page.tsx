import * as React from "react";
import { fetchOrganization } from "@/lib/dbOperations";
import { DirectoryOrgType } from "@/app/types";
import { notFound } from "next/navigation";

interface PageProps {
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const id = (await params).id;
  const org: DirectoryOrgType = await fetchOrganization(+id);

  if (undefined == org) {
    notFound();
  }

  const { name, description, short_description, website_url, industries } = org;

  return (
    <div className="grid grid-cols-2 gap-3">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{short_description}</p>
    </div>
  );
}
