import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Head from "next/head";

const lexend = Lexend({ subsets: ["latin"] });

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
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <body className={`min-h-screen ${lexend.className}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
