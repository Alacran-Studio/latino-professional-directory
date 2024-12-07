import * as React from "react";
import { fetchOrganization } from "@/lib/dbOperations";
import { DirectoryOrgType } from "@/app/types";
import { notFound } from "next/navigation";
import Tags from "@/components/Directory/Tags";
import Image from "next/image";
import Header1 from "@/components/common/Header1";
import Paragraph from "@/components/common/Paragraph";
import Subheading from "@/components/common/Subheading";
import { NewTabIcon } from "@/components/ui/icons/NewTabSvg";
import { isValidString } from "@/lib/utils";

interface PageProps {
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const id = (await params).id;
  const org: DirectoryOrgType = await fetchOrganization(+id);

  if (undefined == org) {
    notFound();
  }

  const {
    name,
    description,
    short_description,
    logo_url,
    website_url,
    industries,
    photo_url,
    video_url,
  } = org;

  return (
    <section className="mb-8 sm:px-7 md:px-14 lg:mx-auto lg:mb-16 lg:max-w-7xl">
      <div
        className={`flex flex-col ${isValidString(logo_url) ? "md:flex-row-reverse md:items-end md:justify-between" : ""}`}
      >
        <div
          className={`mb-6 ${isValidString(logo_url) ? "md:w-1/2" : "md:w-full"}`}
        >
          <Header1 className="mb-8 mt-3 text-center">{name}</Header1>
          <Subheading className="mb-6 text-secondary-foreground">
            {short_description}
          </Subheading>
          <Tags tags={industries} className="px-8 py-2 text-lg text-white" />
          <a
            className="inline-block h-12 rounded-full bg-primary px-8 py-2 text-lg text-white hover:bg-primary-hover"
            href={website_url}
          >
            <span>
              Website <NewTabIcon />
            </span>
          </a>
        </div>

        {isValidString(logo_url) && (
          <div
            className={`h-[288px] w-full max-w-[450px] md:my-auto md:mr-7 md:w-1/2 md:flex-shrink-0 md:object-contain lg:mb-6 lg:mr-14 lg:mt-0 lg:max-w-2xl`}
          >
            <Image
              src={logo_url}
              alt={`Logo for ${name}`}
              width={450}
              height={288}
              className="h-full w-full rounded-md object-scale-down"
            />
          </div>
        )}
      </div>
      <div className={`${isValidString(logo_url) ? "text-center" : ""}`}>
        <Paragraph className="mb-6">{description}</Paragraph>
      </div>
    </section>
  );
}
