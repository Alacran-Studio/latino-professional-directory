import Directory from "@/components/Directory";
import FeaturedOrgs from "@/components/Home/FeaturedOrgs";
import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Directory | ${APP_NAME}`,
  description:
    "Browse organizations dedicated to the professional development of Latino professionals across all industries.",
};

export default function DirectoryPage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <FeaturedOrgs />
      <Directory className="mt-6" />
    </main>
  );
}
