import type { Metadata } from "next";
import TallyEmbed from "./TallyEmbed";

export const metadata: Metadata = {
  title: "Join - Latino Professional Directory",
  description:
    "Add your organization to our directory of professional development resources for Latino professionals.",
};

export default function Page() {
  return <TallyEmbed />;
}
