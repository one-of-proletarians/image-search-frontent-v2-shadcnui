import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uid = () => Math.random().toString(36).slice(2);

export const sizeFormatter = new Intl.NumberFormat("en-US", {
  unit: "byte",
  maximumFractionDigits: 0,
  notation: "compact",
}).format;
