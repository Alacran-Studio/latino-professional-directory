import Header1 from "@/components/common/Header1";
import Cards from "./Cards";
import { CardType, IconName } from "@/app/types";

const pageContent = {
  heading: "Our Values",
  valueCards: [
    {
      title: "Ambition & Excellence",
      icon: IconName.Trophy,
      description:
        "We support driven professionals in reaching their highest potential.",
      borderColor: "secondary",
    },
    {
      title: "Authenticity & Inclusion",
      icon: IconName.Group,
      description:
        "We embrace our true selves and ensure everyone has a place at the table.",
      borderColor: "accent",
    },
    {
      title: "Connection & Belonging",
      icon: IconName.Handshake,
      description:
        "We create pathways for meaningful relationships that foster confidence and wisdom.",
      borderColor: "primary",
    },
    {
      title: "Learning & Leadership",
      icon: IconName.School,
      description:
        "We cultivate knowledge and leadership skills that elevate our community.",
      borderColor: "brand",
    },
  ] as CardType[],
};

export default function OurValuesSection() {
  return (
    <section className="mb-8">
      <Header1 className="text-center">{pageContent.heading}</Header1>
      <Cards cards={pageContent.valueCards} />
    </section>
  );
}
