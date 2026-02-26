import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Koulen, Lexend, Lato } from "next/font/google";

const koulenFont = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
});

const lexendFont = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const latoFont = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBodyFont() {
  return latoFont.className;
}

export function getLexendFont() {
  return lexendFont.className;
}

export function getFontVariables() {
  return `${koulenFont.variable} ${lexendFont.variable} ${latoFont.variable}`;
}

export function isValidString(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}
