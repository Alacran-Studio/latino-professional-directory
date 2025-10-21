import type { Metadata } from "next";
import TallyEmbed from "./TallyEmbed";

export const metadata: Metadata = {
  title: "Contact - Latino Professional Directory",
  description:
    "Get in touch with us to add your organization to our directory of professional development resources for Latino professionals in the Chicagoland area.",
};

export default function Page() {
  return <TallyEmbed />;
}
