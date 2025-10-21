import type { Metadata } from "next";
import TallyEmbed from "./TallyEmbed";

export const metadata: Metadata = {
  title: "Contact - Latiné Professional Development Directory",
  description:
    "Get in touch with us to add your organization to our directory of professional development resources for Latiné professionals in the Chicagoland area.",
};

export default function Page() {
  return <TallyEmbed />;
}
