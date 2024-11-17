import Header1 from "@/components/common/Header1";

const pageContent = {
  heading: "Our Values",
  valueCards: [
    {
      title: "Ambition & Excellence",
      icon: "",
      description:
        "We support driven professionals in reaching their highest potential.",
      borderColor: "secondary",
    },
    {
      title: "Authenticity & Inclusion",
      icon: "",
      description:
        "We embrace our true selves and ensure everyone has a place at the table.",
      borderColor: "accent",
    },
    {
      title: "Connection & Belonging",
      icon: "",
      description:
        "We create pathways for meaningful relationships that foster confidence and wisdom.",
      borderColor: "primary",
    },
    {
      title: "Learning & Leadership",
      icon: "",
      description:
        "We cultivate knowledge and leadership skills that elevate our community.",
      borderColor: "brand",
    },
  ],
};

export default function OurValuesSection() {
  return (
    <section>
      <Header1 className="text-center">{pageContent.heading}</Header1>
    </section>
  );
}
