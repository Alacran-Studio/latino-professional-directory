import * as React from "react";
import { fetchOrganization } from "@/lib/dbOperations";
import { DirectoryOrgType } from "@/app/types";
import { notFound } from "next/navigation";
import Tags from "@/components/Directory/Tags";
import Image from "next/image";
import { NewTabIcon } from "@/components/ui/icons/NewTabSvg";

interface PageProps {
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const id = (await params).id;
  const org: DirectoryOrgType = await fetchOrganization(+id);

  if (undefined == org) {
    notFound();
  }

  const { name, description, logo_url, website_url, industries } = org;

  return (
    <section className="grid max-w-[1130px] grid-cols-2 gap-x-3 gap-y-10">
      <div className="col-start-1 h-[288px] max-w-[450px] dark:bg-gradient-to-r dark:from-logoGradientFrom dark:via-logoGradientVia dark:to-logoGradientTo">
        <Image
          src={logo_url}
          alt={`Logo for ${name}`}
          width={450}
          height={288}
          className="h-full w-full rounded-md object-scale-down"
        />
      </div>
      <div className="col-start-2">
        <h2 className="pb-4 text-7xl">{name}</h2>
        <Tags tags={industries} className="px-8 py-2 text-lg text-white" />
        <p className="pb-4">Location: worldwide</p>
        <a
          className="inline-block h-12 rounded-full bg-primary px-8 py-2 text-lg text-white hover:bg-primary-hover"
          href={website_url}
        >
          <span>
            Website <NewTabIcon />
          </span>
        </a>
      </div>
      <div className="col-span-2 text-center">
        <p>{description}</p>
      </div>
    </section>
  );
}
