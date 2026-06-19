import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Full Rupiah, e.g. 72000 → "Rp 72.000". */
export function formatRupiah(value: number): string {
  return "Rp " + Math.round(value).toLocaleString("id-ID");
}

/** Compact Rupiah, e.g. 84600000 → "Rp 84,6 Jt". */
export function formatRupiahCompact(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1).replace(".", ",")} M`;
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1).replace(".", ",")} Jt`;
  if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)} Rb`;
  return `Rp ${value}`;
}
