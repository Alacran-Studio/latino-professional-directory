import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter, Lexend } from "next/font/google";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lexendFont = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInterFont() {
  return interFont.className;
}

export function getLexendFont() {
  return lexendFont.className;
}

export function getFontVariables() {
  return `${interFont.variable} ${lexendFont.variable}`;
}

export function isValidString(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}
