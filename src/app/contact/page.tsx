import Image from "next/image";
import ContactForm from "@/app/contact/Form";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col bg-black bg-[url('/skyline.jpg')] bg-cover bg-center bg-no-repeat p-8 md:px-32">
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50"></div>
      <div className="relative z-10">
        <div className="title">
          <h1 className="font-bold leading-10 md:text-2xl">
            Let’s talk about your organization
          </h1>
          <h2 className="pt-4 md:w-1/2 md:text-base">
            We are always looking to add organizations to our directory. Fill
            out this short form and someone from our team will reach out!
          </h2>
        </div>
        <div className="flex flex-col-reverse md:justify-between lg:flex-row">
          <ContactForm></ContactForm>
          <div className="mt-10 flex w-full flex-col items-center lg:w-5/12">
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              alt="Logo for Latiné Professional Development Directory"
            />
            <p className="mt-4 font-medium md:text-base">
              This website was built with the intention to provide useful
              resources to professionals in all industries. The intention is to
              provide a list of organizations that foster the growth and
              development of young Latine professionals, specifically targeted
              within the Chicagoland community.
            </p>
            <p className="mt-4 font-medium md:text-base">
              The Latine community is a vibrant ecosystem of industry
              professionals that prioritize community connection and resource
              sharing. Providing a platform for Latine professionals to connect,
              learn, and grow is the mission of the CLPDD.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
