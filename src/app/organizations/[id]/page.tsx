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

  return (
    <>
      <h2>Organization Data</h2>
      <ul>
        <li>ID: {org?.id}</li>
        <li>Name: {org?.name}</li>
        <li>
          <Logo
            src={org.logo_url}
            alt={`${org.name} logo`}
            width={452}
            height={288}
          />
        </li>
        <li>Description: {org?.description}</li>
        <li>
          Industry Tags: <Tags tags={org.industry_tags} />
        </li>
        <li>Locations: {org?.locations}</li>
        <li>Latino Serving: {org?.latino_serving}</li>
        <li>Affinities: {org?.affinities}</li>
      </ul>
    </>
  );
}
