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

// Curated REAL photos (Unsplash CDN) for common items. If an URL fails, the UI
// cascades to the category image, then the emoji tile — so it never breaks.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&h=400&q=70`;
const ITEM_PHOTO: [RegExp, string][] = [
  [/beras/i, u("1586201375761-83865001e31c")],
  [/kopi/i, u("1447933601403-0c6688de566e")],
  [/telur/i, u("1582722872445-44dc5f7e3c8f")],
  [/cokelat|coklat/i, u("1511381939415-e44015466834")],
  [/biskuit/i, u("1499636136210-6f4ee915583e")],
  [/kacang/i, u("1567892737950-30c4db37cd89")],
  [/teh/i, u("1564890369478-c89ca6d9cde9")],
  [/susu/i, u("1563636619-e9143da7973b")],
  [/keripik/i, u("1566478989037-eec170784d0b")],
];

function itemPhoto(name?: string): string {
  const n = (name ?? "").toLowerCase();
  for (const [re, url] of ITEM_PHOTO) if (re.test(n)) return url;
  return "";
}

/**
 * Ordered list of image candidates for a product. The card tries them in turn
 * and falls back to the emoji tile if all fail:
 *   admin URL → curated item photo → category image
 */
export function imageSources(p: Partial<Pick<Product, "image" | "category" | "name">>): string[] {
  return [
    p?.image && p.image.trim() ? p.image.trim() : "",
    itemPhoto(p?.name),
    categoryImage(p?.category),
  ].filter(Boolean);
}

/** First candidate (kept for callers that only need one URL). */
export function productImage(p: Partial<Pick<Product, "image" | "category" | "name">>): string {
  return imageSources(p)[0] ?? "";
}
