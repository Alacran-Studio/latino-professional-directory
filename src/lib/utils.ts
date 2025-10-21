import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";

const interFont = Inter({
  subsets: ["latin"],
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInterFont() {
  return interFont.className;
}

export function isValidString(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}
