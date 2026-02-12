import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Koulen, Lexend, Be_Vietnam_Pro } from "next/font/google";

const koulenFont = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
});

const lexendFont = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const beVietnamProFont = Be_Vietnam_Pro({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBodyFont() {
  return beVietnamProFont.className;
}

export function getLexendFont() {
  return lexendFont.className;
}

export function getFontVariables() {
  return `${koulenFont.variable} ${lexendFont.variable} ${beVietnamProFont.variable}`;
}

export function isValidString(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}
