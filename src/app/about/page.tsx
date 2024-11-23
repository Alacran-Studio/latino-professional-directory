import React from "react";
import AboutIntroSection from "@/components/About/IntroSection";
import MeetOurTeam from "@/components/About/MeetOurTeam";
import OurValuesSection from "@/components/About/OurValues";

const AboutPage = () => {
  return (
    <main className="relative p-7">
      <div
        className="absolute inset-0 -z-10 bg-no-repeat"
        style={{
          backgroundImage: "url('/background-art1.svg')",
          backgroundSize: "28%",
          backgroundPosition: "bottom left",
        }}
      />
      <div
        className="absolute inset-0 -z-10 bg-no-repeat"
        style={{
          backgroundImage: "url('/background-art2.svg')",
          backgroundSize: "18%",
          backgroundPosition: "right top",
        }}
      />

      <AboutIntroSection />
      <OurValuesSection />
      <MeetOurTeam />
    </main>
  );
};

export default AboutPage;
