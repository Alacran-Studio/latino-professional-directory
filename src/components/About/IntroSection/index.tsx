const pageContent = {
  heading: "Our Mission",
  intro_p_1:
    "At Latiné Power Network, we believe that success is rooted in community, belonging, and shared knowledge. We are a platform designed to empower Latiné professionals by fostering meaningful connections that lead to growth, confidence, and leadership.",
  intro_img_1_url: "",
  intro_p_2:
    "Our mission is simple: to create a space where individuals can find their community, learn from each other, and thrive together. We understand the power of ambition, authenticity, and perseverance in shaping successful careers.",
  intro_img_2_url: "",
  intro_p_3:
    "Thatʼs why we offer tools, resources, and opportunities that not only help professionals achieve their goals but also connect with others who share their values and drive. Whether you're looking to expand your network, grow your skillset, or simply belong to a supportive community, [Latiné Pro Connect] is here to guide you every step of the way.",
};

export default function AboutIntroSection() {
  return (
    <section>
      <h1>{pageContent.heading}</h1>
      <p>{pageContent.intro_p_1}</p>
      <p>{pageContent.intro_p_2}</p>
      <p>{pageContent.intro_p_3}</p>
    </section>
  );
}
