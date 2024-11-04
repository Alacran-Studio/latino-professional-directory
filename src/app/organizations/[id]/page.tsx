"use client";

import mockDirectoryData from "@/app/mock/mock-directory";
import { notFound } from "next/navigation";
import Logo from "@/components/Directory/Logo";
import Tags from "@/components/Directory/Tags";

export default function Page({ params }: { params: { id: string } }) {
  const id: number = +params.id;

  const org = mockDirectoryData.find((org) => {
    return org.id == id;
  });

  if (undefined === org) {
    notFound();
  }

  const locations: string = org.locations.join(", ");

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Logo
          src={org.logo_url}
          alt={`${org.name} logo`}
          width={452}
          height={288}
        />
      </div>
      <div>
        <h2>{org.name}</h2>
        <Tags tags={org.industry_tags} />
        <p>Location: {locations}</p>
      </div>
      <p>{org.description}</p>
    </div>
  );
}
