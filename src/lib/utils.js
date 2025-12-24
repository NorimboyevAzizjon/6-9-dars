import { clsx } from "clsx";
// tailwind-merge removed

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
