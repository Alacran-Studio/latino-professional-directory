import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppSidebarProvider } from "@/components/AppSidebarProvider";
import StructuredData from "@/components/StructuredData";
import { PropsWithChildren } from "react";
import { InternalNavigationLinks } from "./types";
import { getInterFont } from "@/lib/utils";

const Base = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`min-h-screen ${getInterFont()}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

/**
 * @description Used to plumb through our internal links across both the
 * navigation bar and the mobile menu.
 * */
const internalLinks: InternalNavigationLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  // {
  //   name: "LOGIN",
  //   href: "/login",
  // },
];

export const metadata: Metadata = {
  title: "Latino Professional Directory",
  description:
    "A directory for organizations and events to support the professional development of Latino professionals.",
  openGraph: {
    title: "Latino Professional Directory",
    description:
      "Discover organizations and events for the professional development of Latinos & allies across industries to build connections and power your career.",
    type: "website",
    locale: "en_US",
    siteName: "Latino Professional Directory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latino Professional Directory",
    description:
      "Discover organizations and events for the professional development of Latinos & allies across industries to build connections and power your career.",
  },
  keywords: [
    "Latino professionals",
    "professional development",
    "networking",
    "career development",
    "Latino organizations",
    "professional events",
    "career connections",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Base>
      <Providers>
        <AppSidebar links={internalLinks} />
        <div className="flex w-full flex-col">
          <NavBar links={internalLinks} />
          {children}
        </div>
      </Providers>
    </Base>
  );
}

const Providers = ({ children }: React.PropsWithChildren) => (
  <AppSidebarProvider>{children}</AppSidebarProvider>
);
