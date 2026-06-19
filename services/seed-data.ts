import type { Product } from "@/common/types";

/** Sample catalog the admin can one-click load into Firestore. */
export const SAMPLE_PRODUCTS: Omit<Product, "id">[] = [
  { name: "Beras Pandan Wangi 5kg", sku: "BRS-005", emoji: "🍚", category: "Sembako", stock: 42, reorderPoint: 15, unit: "pcs", price: 72000, weeklySold: 380, monthlySold: 1520, supplier: "CV Sumber Rejeki", supplierColor: "#4f46e5" },
  { name: "Minyak Goreng Sania 2L", sku: "MYK-002", emoji: "🛢️", category: "Sembako", stock: 9, reorderPoint: 12, unit: "pcs", price: 38000, weeklySold: 210, monthlySold: 840, supplier: "CV Sumber Rejeki", supplierColor: "#4f46e5" },
  { name: "Indomie Goreng (dus)", sku: "MIE-040", emoji: "🍜", category: "Makanan Instan", stock: 88, reorderPoint: 20, unit: "pcs", price: 115000, weeklySold: 420, monthlySold: 1680, supplier: "PT Sinar Mas", supplierColor: "#06b6d4" },
  { name: "Susu UHT Ultra 1L", sku: "SSU-110", emoji: "🥛", category: "Minuman", stock: 0, reorderPoint: 10, unit: "pcs", price: 21000, weeklySold: 160, monthlySold: 620, supplier: "PT Sinar Mas", supplierColor: "#06b6d4" },
  { name: "Gula Pasir Gulaku 1kg", sku: "GLA-001", emoji: "🧂", category: "Sembako", stock: 11, reorderPoint: 15, unit: "pcs", price: 17500, weeklySold: 240, monthlySold: 960, supplier: "CV Sumber Rejeki", supplierColor: "#4f46e5" },
  { name: "Kopi Kapal Api 165gr", sku: "KPI-165", emoji: "☕", category: "Minuman", stock: 56, reorderPoint: 20, unit: "pcs", price: 12500, weeklySold: 310, monthlySold: 1240, supplier: "PT Sinar Mas", supplierColor: "#06b6d4" },
  { name: "Sabun Lifebuoy Batang", sku: "SBN-022", emoji: "🧼", category: "Kebutuhan Rumah", stock: 0, reorderPoint: 18, unit: "pcs", price: 4500, weeklySold: 34, monthlySold: 138, supplier: "Toko Grosir Jaya", supplierColor: "#f59e0b" },
  { name: "Telur Ayam 1kg", sku: "TLR-001", emoji: "🥚", category: "Sembako", stock: 24, reorderPoint: 10, unit: "kg", price: 29000, weeklySold: 295, monthlySold: 1180, supplier: "UD Berkah Tani", supplierColor: "#2f9461" },
  { name: "Kecap Manis Bango 600ml", sku: "KCP-600", emoji: "🍶", category: "Bumbu", stock: 7, reorderPoint: 12, unit: "pcs", price: 24000, weeklySold: 21, monthlySold: 86, supplier: "Toko Grosir Jaya", supplierColor: "#f59e0b" },
  { name: "Tepung Terigu Segitiga", sku: "TPG-001", emoji: "🌾", category: "Sembako", stock: 31, reorderPoint: 15, unit: "pcs", price: 13000, weeklySold: 28, monthlySold: 112, supplier: "CV Sumber Rejeki", supplierColor: "#4f46e5" },
  { name: "Sarden ABC Kaleng", sku: "SRD-155", emoji: "🐟", category: "Makanan Instan", stock: 18, reorderPoint: 12, unit: "pcs", price: 11000, weeklySold: 17, monthlySold: 71, supplier: "PT Sinar Mas", supplierColor: "#06b6d4" },
  { name: "Pewangi Molto Refill", sku: "PWG-088", emoji: "🧴", category: "Kebutuhan Rumah", stock: 22, reorderPoint: 10, unit: "pcs", price: 9500, weeklySold: 9, monthlySold: 38, supplier: "Toko Grosir Jaya", supplierColor: "#f59e0b" },
];
