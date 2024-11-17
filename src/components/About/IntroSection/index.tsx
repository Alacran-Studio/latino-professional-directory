import Image from "next/image";

const pageContent = {
  heading: "Our Mission",
  intro_p_1:
    "At Latiné Power Network, we believe that success is rooted in community, belonging, and shared knowledge. We are a platform designed to empower Latiné professionals by fostering meaningful connections that lead to growth, confidence, and leadership.",
  intro_img_1: {
    url: "/about/about-1.jpg",
    alt: "Group of diverse people at a Latiné Heritage Month event.",
    width: 355,
    height: 184,
  },
  intro_p_2:
    "Our mission is simple: to create a space where individuals can find their community, learn from each other, and thrive together. We understand the power of ambition, authenticity, and perseverance in shaping successful careers.",
  intro_img_2: {
    url: "/about/about-2.jpg",
    alt: "An audience member of an event speaking and others around them listening.",
    width: 355,
    height: 184,
  },
  intro_p_3:
    "Thatʼs why we offer tools, resources, and opportunities that not only help professionals achieve their goals but also connect with others who share their values and drive. Whether you're looking to expand your network, grow your skillset, or simply belong to a supportive community, [Latiné Pro Connect] is here to guide you every step of the way.",
};

export default function AboutIntroSection() {
  return (
    <section>
      <h1>{pageContent.heading}</h1>
      <p>{pageContent.intro_p_1}</p>
      <Image
        src={pageContent.intro_img_1.url}
        priority={true}
        width={pageContent.intro_img_1.width}
        height={pageContent.intro_img_1.height}
        alt={pageContent.intro_img_1.alt}
      />
      <p>{pageContent.intro_p_2}</p>
      <Image
        src={pageContent.intro_img_2.url}
        priority={true}
        width={pageContent.intro_img_2.width}
        height={pageContent.intro_img_2.height}
        alt={pageContent.intro_img_2.alt}
      />
      <p>{pageContent.intro_p_3}</p>
    </section>
  );
}
