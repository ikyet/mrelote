import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prefijo para archivos de /public cuando el sitio vive en un subdirectorio
// (GitHub Pages sirve en /<repo>/). next/image y las rutas en strings no lo
// agregan solos. Vacío en local / Netlify.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
