import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppSidebarProvider } from "@/components/AppSidebarProvider";
import { PropsWithChildren } from "react";

const lexend = Lexend({ subsets: ["latin"] });

const Base = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`min-h-screen ${lexend.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

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
        <AppSidebar />
        <div className="flex w-full flex-col">
          <NavBar />
          {children}
        </div>
      </Providers>
    </Base>
  );
}

const Providers = ({ children }: React.PropsWithChildren) => (
  <AppSidebarProvider>{children}</AppSidebarProvider>
);
