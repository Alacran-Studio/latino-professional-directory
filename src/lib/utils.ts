import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Koulen, Lexend } from "next/font/google";

const koulenFont = Koulen({
  weight: "400",
  subsets: ["latin"],
});

const lexendFont = Lexend({
  subsets: ["latin"],
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getKoulenFontClass() {
  return koulenFont.className;
}

export function getLexendFont() {
  return lexendFont.className;
}

export function isValidString(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}
