"use client";

import mockDirectoryData from "@/app/mock/mock-directory";

export default function Page({ params }: { params: {org_id: number} } ) {
  const org = mockDirectoryData.find((org) => {
    return org.id == params.org_id;
  })

  return <>
    <h2>Organization Data</h2>
    <ul>
      <li>ID: {org?.id}</li>
      <li>Name: {org?.name}</li>
      <li>Description: {org?.description}</li>
      <li>Industry Tags: {org?.industry_tags}</li>
      <li>Locations: {org?.locations}</li>
      <li>Latino Serving: {org?.latino_serving}</li>
      <li>Affinities: {org?.affinities}</li>
    </ul>
  </>
}
