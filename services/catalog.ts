import type { Product } from "@/common/types";

// Realistic Indonesian UMKM catalog. Brands & sizes are defined PER ITEM, so
// every generated name makes sense (e.g. "Air Mineral Aqua 600ml", never
// "Air Mineral Marjan"). Combos are unique → no duplicate product names.

type Size = { label: string; mult: number };
type Item = { name: string; emoji: string; base: number; brands: string[]; sizes: Size[] };
type Cat = { name: string; emoji: string; unit: string; items: Item[] };

const S = (label: string, mult: number): Size => ({ label, mult });

const SUPPLIERS = [
  { name: "CV Sumber Rejeki", color: "#4f46e5" },
  { name: "PT Sinar Mas", color: "#06b6d4" },
  { name: "Toko Grosir Jaya", color: "#f59e0b" },
  { name: "UD Berkah Tani", color: "#2f9461" },
  { name: "PT Niaga Sentosa", color: "#a855f7" },
  { name: "CV Mitra Pangan", color: "#ef4444" },
];

const CATEGORIES: Cat[] = [
  {
    name: "Sembako", emoji: "🍚", unit: "pcs",
    items: [
      { name: "Beras", emoji: "🍚", base: 13000, brands: ["Topi Koki", "Rojolele", "Pandan Wangi", "Setra Ramos", "Maknyuss"], sizes: [S("1kg", 1), S("2kg", 2), S("5kg", 4.8), S("10kg", 9.5)] },
      { name: "Gula Pasir", emoji: "🍬", base: 16000, brands: ["Gulaku", "Rose Brand", "Gunung Madu"], sizes: [S("250gr", 0.3), S("500gr", 0.55), S("1kg", 1)] },
      { name: "Minyak Goreng", emoji: "🛢️", base: 19000, brands: ["Bimoli", "Sania", "Filma", "Fortune", "Tropical"], sizes: [S("250ml", 0.3), S("500ml", 0.55), S("1L", 1), S("2L", 1.9)] },
      { name: "Tepung Terigu", emoji: "🌾", base: 12000, brands: ["Segitiga Biru", "Cakra Kembar", "Kunci Biru"], sizes: [S("500gr", 0.55), S("1kg", 1)] },
      { name: "Garam Dapur", emoji: "🧂", base: 4000, brands: ["Refina", "Cap Kapal", "Dolphin"], sizes: [S("250gr", 0.6), S("500gr", 1)] },
      { name: "Margarin", emoji: "🧈", base: 7000, brands: ["Blue Band", "Simas", "Forvita"], sizes: [S("200gr", 1), S("250gr", 1.2)] },
    ],
  },
  {
    name: "Makanan Instan", emoji: "🍜", unit: "pcs",
    items: [
      { name: "Mie Goreng", emoji: "🍜", base: 3000, brands: ["Indomie", "Mie Sedaap", "Sarimi", "Supermi"], sizes: [S("pcs", 1), S("isi 5", 4.8), S("dus", 38)] },
      { name: "Mie Kuah Ayam", emoji: "🍜", base: 3000, brands: ["Indomie", "Mie Sedaap", "Sarimi"], sizes: [S("pcs", 1), S("isi 5", 4.8), S("dus", 38)] },
      { name: "Sarden", emoji: "🐟", base: 9000, brands: ["ABC", "Botan", "Gaga", "King's"], sizes: [S("155gr", 1), S("425gr", 2.4)] },
      { name: "Kornet", emoji: "🥫", base: 12000, brands: ["Pronas", "CIP", "Bernardi"], sizes: [S("198gr", 1), S("340gr", 1.6)] },
      { name: "Nugget", emoji: "🍗", base: 18000, brands: ["Fiesta", "So Good", "Champ", "Kanzler"], sizes: [S("250gr", 1), S("500gr", 1.9)] },
      { name: "Sosis", emoji: "🌭", base: 16000, brands: ["Kanzler", "So Nice", "Champ", "Bernardi"], sizes: [S("isi 4", 1), S("360gr", 1.8)] },
    ],
  },
  {
    name: "Minuman", emoji: "🥤", unit: "pcs",
    items: [
      { name: "Air Mineral", emoji: "💧", base: 3000, brands: ["Aqua", "Le Minerale", "Cleo", "Vit", "Club"], sizes: [S("330ml", 0.7), S("600ml", 1), S("1.5L", 1.6)] },
      { name: "Kopi", emoji: "☕", base: 1500, brands: ["Kapal Api", "Nescafe", "ABC", "Good Day", "Torabika", "Luwak"], sizes: [S("sachet", 1), S("renceng", 9), S("165gr", 8)] },
      { name: "Teh Celup", emoji: "🍵", base: 6000, brands: ["Sariwangi", "Sosro", "Tong Tji"], sizes: [S("isi 25", 1), S("isi 50", 1.8)] },
      { name: "Susu UHT", emoji: "🥛", base: 6000, brands: ["Ultra Milk", "Frisian Flag", "Indomilk", "Greenfields"], sizes: [S("200ml", 1), S("1L", 3.2)] },
      { name: "Sirup", emoji: "🧃", base: 18000, brands: ["Marjan", "ABC", "Pohon Pinang"], sizes: [S("460ml", 1), S("600ml", 1.25)] },
      { name: "Minuman Soda", emoji: "🥤", base: 6000, brands: ["Coca-Cola", "Sprite", "Fanta"], sizes: [S("250ml", 1), S("390ml", 1.4), S("1L", 2.6)] },
    ],
  },
  {
    name: "Bumbu", emoji: "🧂", unit: "pcs",
    items: [
      { name: "Kecap Manis", emoji: "🫗", base: 8000, brands: ["Bango", "ABC", "Sedaap"], sizes: [S("135ml", 1), S("275ml", 1.8), S("600ml", 3.4)] },
      { name: "Saus Sambal", emoji: "🌶️", base: 7000, brands: ["ABC", "Indofood", "Sasa"], sizes: [S("135ml", 1), S("335ml", 2.1)] },
      { name: "Saus Tomat", emoji: "🍅", base: 7000, brands: ["ABC", "Del Monte", "Heinz"], sizes: [S("135ml", 1), S("340ml", 2.1)] },
      { name: "Penyedap Rasa", emoji: "🧂", base: 1000, brands: ["Masako", "Royco", "Sasa"], sizes: [S("sachet", 1), S("100gr", 7), S("250gr", 15)] },
      { name: "Cuka", emoji: "🧴", base: 4000, brands: ["Dixi", "Cap Tawon"], sizes: [S("135ml", 1), S("625ml", 3)] },
    ],
  },
  {
    name: "Kebutuhan Rumah", emoji: "🧼", unit: "pcs",
    items: [
      { name: "Sabun Mandi", emoji: "🧼", base: 4000, brands: ["Lifebuoy", "Lux", "Nuvo", "Giv"], sizes: [S("batang", 1), S("isi 4", 3.6), S("cair 250ml", 4)] },
      { name: "Sampo", emoji: "🧴", base: 2000, brands: ["Clear", "Sunsilk", "Pantene", "Head & Shoulders"], sizes: [S("sachet", 1), S("170ml", 14), S("340ml", 26)] },
      { name: "Pasta Gigi", emoji: "🪥", base: 8000, brands: ["Pepsodent", "Close Up", "Formula"], sizes: [S("75gr", 1), S("190gr", 2.1)] },
      { name: "Deterjen", emoji: "🧺", base: 1500, brands: ["Rinso", "Daia", "Attack", "So Klin"], sizes: [S("sachet", 1), S("350gr", 9), S("800gr", 18)] },
      { name: "Pewangi Pakaian", emoji: "🧴", base: 1500, brands: ["Molto", "So Klin", "Downy"], sizes: [S("sachet", 1), S("450ml", 14), S("refill", 12)] },
      { name: "Tisu", emoji: "🧻", base: 9000, brands: ["Paseo", "Nice", "Tessa"], sizes: [S("isi 50", 1), S("isi 250", 3.6)] },
    ],
  },
  {
    name: "Snack", emoji: "🍪", unit: "pcs",
    items: [
      { name: "Keripik Kentang", emoji: "🥔", base: 5000, brands: ["Chitato", "Lays", "Piattos"], sizes: [S("35gr", 1), S("68gr", 1.8), S("160gr", 3.8)] },
      { name: "Biskuit", emoji: "🍪", base: 7000, brands: ["Roma", "Khong Guan", "Biskuat"], sizes: [S("sedang", 1), S("kaleng", 5)] },
      { name: "Wafer", emoji: "🧇", base: 2000, brands: ["Tango", "Nabati", "Selamat"], sizes: [S("kecil", 1), S("besar", 4)] },
      { name: "Cokelat", emoji: "🍫", base: 9000, brands: ["SilverQueen", "Cadbury", "Delfi"], sizes: [S("30gr", 1), S("65gr", 1.9)] },
      { name: "Permen", emoji: "🍬", base: 1000, brands: ["Kopiko", "Mentos", "Relaxa"], sizes: [S("bungkus", 1), S("toples", 12)] },
      { name: "Kacang", emoji: "🥜", base: 5000, brands: ["Garuda", "Dua Kelinci", "Mr.P"], sizes: [S("80gr", 1), S("200gr", 2.2)] },
    ],
  },
  {
    name: "Lainnya", emoji: "🛍️", unit: "pcs",
    items: [
      { name: "Korek Api", emoji: "🔥", base: 2000, brands: ["Tokai", "Cricket"], sizes: [S("pcs", 1), S("isi 3", 2.8)] },
      { name: "Baterai", emoji: "🔋", base: 6000, brands: ["ABC", "Energizer", "Panasonic"], sizes: [S("AA isi 2", 1), S("AAA isi 2", 1)] },
      { name: "Obat Nyamuk", emoji: "🦟", base: 9000, brands: ["Baygon", "HIT", "Vape"], sizes: [S("bakar", 1), S("semprot 200ml", 2.4)] },
      { name: "Buku Tulis", emoji: "📓", base: 4000, brands: ["Sidu", "Kiky", "Big Boss"], sizes: [S("38 lembar", 1), S("58 lembar", 1.4)] },
      { name: "Pulpen", emoji: "🖊️", base: 2500, brands: ["Standard", "Pilot", "Faster"], sizes: [S("pcs", 1), S("isi 5", 4.6)] },
      { name: "Tisu Basah", emoji: "🧻", base: 5000, brands: ["Mitu", "Sleek", "Nice"], sizes: [S("isi 10", 1), S("isi 50", 3.8)] },
    ],
  },
];

function prng(seed: number): number {
  let s = (seed * 2654435761) % 2147483647;
  if (s <= 0) s += 2147483646;
  s = (s * 16807) % 2147483647;
  return s / 2147483647;
}

type Combo = { cat: Cat; item: Item; brand: string; size: Size };

/** Generate up to `count` UNIQUE, brand-correct UMKM products (default 1000). */
export function generateCatalog(count = 1000): Omit<Product, "id">[] {
  // Build every unique (item × brand × size) combo, grouped per category.
  const groups: Combo[][] = CATEGORIES.map((cat) => {
    const list: Combo[] = [];
    for (const item of cat.items) for (const brand of item.brands) for (const size of item.sizes) list.push({ cat, item, brand, size });
    return list;
  });

  // Interleave categories so the catalog feels varied.
  const combos: Combo[] = [];
  const maxLen = Math.max(...groups.map((g) => g.length));
  for (let col = 0; col < maxLen && combos.length < count; col++) {
    for (const g of groups) {
      if (g[col]) combos.push(g[col]);
      if (combos.length >= count) break;
    }
  }

  return combos.map((c, i) => {
    const price = Math.max(1000, Math.round((c.item.base * c.size.mult * (0.9 + prng(i) * 0.35)) / 500) * 500);
    const weeklySold = Math.floor(prng(i + 1) * 350) + 3;
    const sup = SUPPLIERS[i % SUPPLIERS.length];
    return {
      name: `${c.item.name} ${c.brand} ${c.size.label}`,
      sku: `UMKM-${String(i + 1).padStart(4, "0")}`,
      emoji: c.item.emoji,
      category: c.cat.name,
      stock: Math.floor(prng(i + 2) * 80),
      reorderPoint: 10 + Math.floor(prng(i + 3) * 12),
      unit: c.cat.unit,
      price,
      weeklySold,
      monthlySold: weeklySold * 4 + Math.floor(prng(i + 4) * 40),
      supplier: sup.name,
      supplierColor: sup.color,
    };
  });
}
