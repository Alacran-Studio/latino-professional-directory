import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppSidebarProvider } from "@/components/AppSidebarProvider";
import { PropsWithChildren } from "react";
import { InternalNavigationLinks } from "./types";
import { getLexendFont } from "@/lib/utils";

export const runtime = "edge";

const Base = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`min-h-screen ${getLexendFont()}`}>
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
    name: "HOME",
    href: "/",
  },
  {
    name: "ABOUT",
    href: "/about",
  },
  {
    name: "CONTACT",
    href: "/contact",
  },
  // {
  //   name: "LOGIN",
  //   href: "/login",
  // },
];

export const metadata: Metadata = {
  title: "Latiné Professional Development Directory",
  description:
    "A directory for organizations and events in the Chicagoland area to support the professional development of Latiné professionals.",
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
