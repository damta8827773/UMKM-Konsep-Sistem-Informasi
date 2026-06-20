import type { Product } from "@/common/types";

// Map a product NAME to a SPECIFIC emoji so the visual always matches the item
// (never random). First match wins; order matters (specific before generic).
const ITEM_EMOJI: [RegExp, string][] = [
  [/beras/i, "🍚"],
  [/gula/i, "🍬"],
  [/minyak/i, "🛢️"],
  [/tepung/i, "🌾"],
  [/telur/i, "🥚"],
  [/garam/i, "🧂"],
  [/margarin|mentega/i, "🧈"],
  [/mie|^mi /i, "🍜"],
  [/bubur/i, "🥣"],
  [/sarden|sardine/i, "🐟"],
  [/kornet/i, "🥫"],
  [/nugget/i, "🍗"],
  [/sosis/i, "🌭"],
  [/bakso/i, "🍡"],
  [/kopi/i, "☕"],
  [/teh/i, "🍵"],
  [/susu/i, "🥛"],
  [/sirup/i, "🧃"],
  [/air mineral/i, "💧"],
  [/soda/i, "🥤"],
  [/energi/i, "⚡"],
  [/kecap/i, "🫗"],
  [/saus sambal|sambal/i, "🌶️"],
  [/saus tomat/i, "🍅"],
  [/penyedap|kaldu/i, "🧂"],
  [/lada/i, "🧂"],
  [/cuka/i, "🧴"],
  [/sabun/i, "🧼"],
  [/sampo/i, "🧴"],
  [/pasta gigi/i, "🪥"],
  [/deterjen/i, "🧺"],
  [/pewangi/i, "🧴"],
  [/pembersih/i, "🧽"],
  [/tisu/i, "🧻"],
  [/keripik/i, "🥔"],
  [/biskuit/i, "🍪"],
  [/wafer/i, "🧇"],
  [/cokelat|coklat/i, "🍫"],
  [/permen/i, "🍬"],
  [/kacang/i, "🥜"],
  [/keju/i, "🧀"],
  [/jelly/i, "🍮"],
  [/korek/i, "🔥"],
  [/baterai/i, "🔋"],
  [/obat nyamuk/i, "🦟"],
  [/buku/i, "📓"],
  [/pulpen/i, "🖊️"],
  [/plastik/i, "🛍️"],
  [/lampu/i, "💡"],
];

/** Specific emoji for a product name, falling back to the category emoji. */
export function itemEmoji(name?: string, fallback = "📦"): string {
  const n = (name ?? "").toLowerCase();
  for (const [re, e] of ITEM_EMOJI) if (re.test(n)) return e;
  return fallback;
}

/** Real photo URL only when an admin set one; otherwise the UI shows the icon tile. */
export function productImage(p: Partial<Pick<Product, "image">>): string {
  return p?.image && p.image.trim() ? p.image.trim() : "";
}
