import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter, Lexend } from "next/font/google";

const interFont = Inter({
  subsets: ["latin"],
});

const lexendFont = Lexend({
  subsets: ["latin"],
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

export function isValidString(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}
