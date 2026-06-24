import type { Product } from "@/common/types";
import { categoryImage } from "./category-images";

// Item NAME → specific emoji (always correct, used as the final fallback tile).
const ITEM_EMOJI: [RegExp, string][] = [
  [/beras/i, "🍚"], [/gula/i, "🍬"], [/minyak/i, "🛢️"], [/tepung/i, "🌾"], [/telur/i, "🥚"],
  [/garam/i, "🧂"], [/margarin|mentega/i, "🧈"], [/mie|^mi /i, "🍜"], [/bubur/i, "🥣"],
  [/sarden|sardine/i, "🐟"], [/kornet/i, "🥫"], [/nugget/i, "🍗"], [/sosis/i, "🌭"], [/bakso/i, "🍡"],
  [/kopi/i, "☕"], [/teh/i, "🍵"], [/susu/i, "🥛"], [/sirup/i, "🧃"], [/air mineral/i, "💧"],
  [/soda/i, "🥤"], [/energi/i, "⚡"], [/kecap/i, "🫗"], [/saus sambal|sambal/i, "🌶️"],
  [/saus tomat/i, "🍅"], [/penyedap|kaldu/i, "🧂"], [/lada/i, "🧂"], [/cuka/i, "🧴"],
  [/sabun/i, "🧼"], [/sampo/i, "🧴"], [/pasta gigi/i, "🪥"], [/deterjen/i, "🧺"], [/pewangi/i, "🧴"],
  [/pembersih/i, "🧽"], [/tisu/i, "🧻"], [/keripik/i, "🥔"], [/biskuit/i, "🍪"], [/wafer/i, "🧇"],
  [/cokelat|coklat/i, "🍫"], [/permen/i, "🍬"], [/kacang/i, "🥜"], [/keju/i, "🧀"], [/jelly/i, "🍮"],
  [/korek/i, "🔥"], [/baterai/i, "🔋"], [/obat nyamuk/i, "🦟"], [/buku/i, "📓"], [/pulpen/i, "🖊️"],
  [/plastik/i, "🛍️"], [/lampu/i, "💡"],
];

export function itemEmoji(name?: string, fallback = "📦"): string {
  const n = (name ?? "").toLowerCase();
  for (const [re, e] of ITEM_EMOJI) if (re.test(n)) return e;
  return fallback;
}

// Real photo by web image search (Bing thumbnail CDN), keyed on the FULL product
// name (item + brand + weight) → shows an actual product photo, e.g. a rice sack.
// Hotlink-friendly for <img>; if it fails the UI cascades to the category image.
// NOTE: search-sourced images are for the PROTOTYPE only - use licensed photos in
// production (or set a per-product `image` URL).
function searchPhoto(name?: string): string {
  if (!name || !name.trim()) return "";
  const q = encodeURIComponent(`${name} produk kemasan`);
  return `https://tse1.mm.bing.net/th?q=${q}&w=400&h=400&c=7&rs=1&p=0&dpr=1&mkt=id-ID`;
}

/**
 * Ordered image candidates for a product. The card tries them in turn and falls
 * back to the emoji tile if all fail:
 *   admin URL → web-search product photo → category image
 */
export function imageSources(p: Partial<Pick<Product, "image" | "category" | "name">>): string[] {
  return [
    p?.image && p.image.trim() ? p.image.trim() : "",
    searchPhoto(p?.name),
    categoryImage(p?.category),
  ].filter(Boolean);
}

/** First candidate (kept for callers that only need one URL). */
export function productImage(p: Partial<Pick<Product, "image" | "category" | "name">>): string {
  return imageSources(p)[0] ?? "";
}
