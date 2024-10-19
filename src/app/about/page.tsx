import Image from "next/image";
import React from "react";
import LinkedInIcon from "../../components/common/icons/LinkedInIcon";

const teamMembers = [
  {
    name: "Jorge Viramontes",
    role: "Project Manager / Tech Lead",
    image: "/team-headshots/jorge.jpg",
    linkedin: "https://www.linkedin.com/in/jorgealbertoviramontes/",
  },
  {
    name: "Gerardo Rodriguez",
    role: "Software Engineer",
    image: "/team-headshots/gerardo.jpg",
    linkedin: "https://www.linkedin.com/in/geraxrodriguez/",
  },
  {
    name: "Natasha Koller",
    role: "Graphic Designer",
    image: "/team-headshots/natasha.jpg",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Niza Cuéllar",
    role: "Graphic Designer",
    image: "/team-headshots/niza.jpg",
    linkedin: "https://www.linkedin.com/in/niza-cuellar-0a8234188/",
  },
  {
    name: "Mario Galeno",
    role: "Software Architect",
    image: "/team-headshots/mario.jpg",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Francisco Gonzalez",
    role: "Software Engineer",
    image: "/team-headshots/francisco.jpg",
    linkedin: "https://www.linkedin.com/in/francisco-gonzalez-0906/",
  },
];

const AboutPage = () => {
  return (
    <section className="p-5">
      <div
        className="absolute inset-0 -z-10 bg-no-repeat"
        style={{
          backgroundImage: "url('/background-art1.svg')",
          backgroundSize: "35%",
          backgroundPosition: "bottom left",
        }}
      />
      <div
        className="absolute inset-0 -z-10 bg-no-repeat"
        style={{
          backgroundImage: "url('/background-art2.svg')",
          backgroundSize: "30%",
          backgroundPosition: "right top",
        }}
      />
      <h2 className="mb-5 text-center text-3xl">Meet Our Team</h2>
      <div className="grid gap-20 gap-y-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex w-64 flex-col">
            <Image
              src={member.image}
              alt={member.name}
              width={350}
              height={350}
              className="rounded-lg"
            />
            <div className="flex flex-col items-start px-2 py-3">
              <div className="flex w-full justify-between">
                <h3 className="overflow-hidden text-ellipsis">{member.name}</h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-500 hover:scale-110"
                >
                  <LinkedInIcon />
                </a>
              </div>
              <p className="text-secondary">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPage;
