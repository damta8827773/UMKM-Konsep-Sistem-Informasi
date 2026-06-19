import type { Product } from "@/common/types";

// Realistic-ish UMKM catalog generator. Produces up to N varied products by
// combining items × brands × sizes per category (sensible combos), with
// deterministic pseudo-random stock/price so results are stable across runs.

type Size = { label: string; mult: number };
type Cat = {
  name: string;
  emoji: string;
  unit: string;
  basePrice: number;
  items: string[];
  brands: string[];
  sizes: Size[];
};

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
    name: "Sembako", emoji: "🍚", unit: "pcs", basePrice: 16000,
    items: ["Beras Pandan Wangi", "Beras Rojolele", "Gula Pasir", "Minyak Goreng", "Tepung Terigu", "Telur Ayam", "Garam Dapur", "Margarin"],
    brands: ["Sania", "Bimoli", "Gulaku", "Rose Brand", "Segitiga Biru", "Filma", "Tropical", "Cap Sendok"],
    sizes: [{ label: "250gr", mult: 0.4 }, { label: "500gr", mult: 0.7 }, { label: "1kg", mult: 1 }, { label: "2kg", mult: 1.9 }, { label: "5kg", mult: 4.5 }],
  },
  {
    name: "Makanan Instan", emoji: "🍜", unit: "pcs", basePrice: 9000,
    items: ["Mie Goreng", "Mie Kuah Ayam", "Bubur Instan", "Sarden Kaleng", "Kornet", "Nugget", "Sosis", "Bakso Frozen"],
    brands: ["Indomie", "Sedaap", "ABC", "Pronas", "Fiesta", "Kanzler", "So Good", "Gaga"],
    sizes: [{ label: "sachet", mult: 0.5 }, { label: "isi 5", mult: 2.4 }, { label: "kaleng", mult: 1.2 }, { label: "250gr", mult: 2 }, { label: "dus", mult: 11 }],
  },
  {
    name: "Minuman", emoji: "🥤", unit: "pcs", basePrice: 8000,
    items: ["Kopi", "Teh Celup", "Susu UHT", "Sirup", "Air Mineral", "Minuman Soda", "Susu Kental Manis", "Energi"],
    brands: ["Kapal Api", "Nescafe", "Sariwangi", "Ultra", "Frisian Flag", "Marjan", "Aqua", "Teh Pucuk"],
    sizes: [{ label: "sachet", mult: 0.35 }, { label: "165gr", mult: 1 }, { label: "250ml", mult: 0.8 }, { label: "600ml", mult: 1.4 }, { label: "1L", mult: 2.2 }],
  },
  {
    name: "Bumbu", emoji: "🧂", unit: "pcs", basePrice: 6000,
    items: ["Kecap Manis", "Saus Sambal", "Saus Tomat", "Penyedap Rasa", "Lada Bubuk", "Bumbu Nasi Goreng", "Kaldu Jamur", "Cuka"],
    brands: ["Bango", "ABC", "Indofood", "Sasa", "Masako", "Royco", "Ladaku", "Desaku"],
    sizes: [{ label: "sachet", mult: 0.3 }, { label: "135ml", mult: 0.8 }, { label: "275ml", mult: 1.2 }, { label: "600ml", mult: 2.3 }, { label: "refill", mult: 1.8 }],
  },
  {
    name: "Kebutuhan Rumah", emoji: "🧼", unit: "pcs", basePrice: 7000,
    items: ["Sabun Mandi", "Sampo", "Pasta Gigi", "Deterjen", "Pewangi Pakaian", "Pembersih Lantai", "Tisu", "Sabun Cuci Piring"],
    brands: ["Lifebuoy", "Pepsodent", "Rinso", "Molto", "SuperPell", "Sunlight", "Clear", "Nice"],
    sizes: [{ label: "sachet", mult: 0.4 }, { label: "batang", mult: 0.7 }, { label: "100ml", mult: 1 }, { label: "400ml", mult: 2.6 }, { label: "refill", mult: 2 }],
  },
  {
    name: "Snack", emoji: "🍪", unit: "pcs", basePrice: 4500,
    items: ["Keripik Kentang", "Biskuit", "Wafer", "Cokelat", "Permen", "Kacang", "Stik Keju", "Jelly"],
    brands: ["Chitato", "Roma", "Tango", "SilverQueen", "Kopiko", "Garuda", "Nabati", "Inaco"],
    sizes: [{ label: "kecil", mult: 0.6 }, { label: "sedang", mult: 1 }, { label: "besar", mult: 1.8 }, { label: "isi 10", mult: 5.5 }, { label: "toples", mult: 7 }],
  },
  {
    name: "Lainnya", emoji: "🛍️", unit: "pcs", basePrice: 5000,
    items: ["Korek Api", "Baterai", "Obat Nyamuk", "Buku Tulis", "Pulpen", "Tisu Basah", "Kantong Plastik", "Lampu LED"],
    brands: ["Tokai", "ABC", "Baygon", "Sidu", "Standard", "Mitu", "Wings", "Philips"],
    sizes: [{ label: "isi 1", mult: 0.5 }, { label: "isi 2", mult: 0.9 }, { label: "isi 4", mult: 1.6 }, { label: "isi 10", mult: 3.5 }, { label: "pak", mult: 5 }],
  },
];

function prng(seed: number): number {
  let s = (seed * 2654435761) % 2147483647;
  if (s <= 0) s += 2147483646;
  s = (s * 16807) % 2147483647;
  return s / 2147483647;
}

/** Generate up to `count` UMKM products (default 1000). */
export function generateCatalog(count = 1000): Omit<Product, "id">[] {
  const out: Omit<Product, "id">[] = [];
  let round = 0;
  while (out.length < count) {
    for (const cat of CATEGORIES) {
      if (out.length >= count) break;
      const i = out.length;
      const item = cat.items[round % cat.items.length];
      const brand = cat.brands[(round * 3 + 1) % cat.brands.length];
      const size = cat.sizes[(round * 2) % cat.sizes.length];
      const sup = SUPPLIERS[i % SUPPLIERS.length];

      const price = Math.max(1000, Math.round((cat.basePrice * size.mult * (0.85 + prng(i) * 0.5)) / 500) * 500);
      const weeklySold = Math.floor(prng(i + 1) * 350) + 3;
      out.push({
        name: `${item} ${brand} ${size.label}`,
        sku: `UMKM-${String(i + 1).padStart(4, "0")}`,
        emoji: cat.emoji,
        category: cat.name,
        stock: Math.floor(prng(i + 2) * 80),
        reorderPoint: 10 + Math.floor(prng(i + 3) * 12),
        unit: cat.unit,
        price,
        weeklySold,
        monthlySold: weeklySold * 4 + Math.floor(prng(i + 4) * 40),
        supplier: sup.name,
        supplierColor: sup.color,
      });
    }
    round++;
  }
  return out;
}
