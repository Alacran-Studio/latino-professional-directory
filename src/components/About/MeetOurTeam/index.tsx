import Header1 from "@/components/common/Header1";
import LinkedInIcon from "@/components/common/icons/LinkedIn";
import Image from "next/image";

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

export default function MeetOurTeam() {
  return (
    <section>
      <Header1 className="mb-5 text-center">Meet Our Team</Header1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="mx-auto flex w-64 flex-col">
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
              <p className="text-secondary-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
