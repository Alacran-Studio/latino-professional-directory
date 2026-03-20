import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppSidebarProvider } from "@/components/AppSidebarProvider";
import StructuredData from "@/components/StructuredData";
import { PropsWithChildren } from "react";
import { InternalNavigationLinks } from "./types";
import { getBodyFont, getFontVariables } from "@/lib/utils";
import { APP_NAME, APP_DESCRIPTION, APP_DESCRIPTION_LONG, APP_URL } from "@/lib/constants";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";

const darkModeDisabled = process.env.NEXT_PUBLIC_DISABLE_DARK_MODE === "true";

const Base = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={getFontVariables()}>
      <head>
        <StructuredData />
        {!darkModeDisabled && (
          <script
            dangerouslySetInnerHTML={{
              __html: `if(window.matchMedia('(prefers-color-scheme:dark)').matches)document.documentElement.classList.add('dark')`,
            }}
          />
        )}
      </head>
      <body className={`min-h-screen ${getBodyFont()}`}>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""} />
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
    name: "Directory",
    href: "/directory",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Join",
    href: "/join",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: APP_NAME,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION_LONG,
    type: "website",
    locale: "en_US",
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION_LONG,
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
  <AppSidebarProvider>
    {children}
    <Toaster position="top-right" richColors />
  </AppSidebarProvider>
);
