import type { Product } from "@/common/types";

// Keyword per category → a real free photo (LoremFlickr, no API key needed).
const CATEGORY_KEYWORD: Record<string, string> = {
  Sembako: "rice,grocery",
  "Makanan Instan": "instant,noodle",
  Minuman: "drink,beverage",
  Bumbu: "spice,sauce",
  "Kebutuhan Rumah": "soap,household",
};

// Stable per-product seed so each item keeps the same photo across reloads.
function hash(s: string): number {
  const str = s || "x";
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Resolve a product's display photo:
 * 1) admin-set `image` URL  →  2) a real category photo  →  (emoji fallback in UI).
 */
export function productImage(p: Partial<Pick<Product, "image" | "category" | "sku">>): string {
  if (p?.image && p.image.trim()) return p.image.trim();
  const kw = CATEGORY_KEYWORD[p?.category ?? ""] ?? "grocery,food";
  return `https://loremflickr.com/400/400/${encodeURIComponent(kw)}?lock=${hash(p?.sku ?? "")}`;
}
