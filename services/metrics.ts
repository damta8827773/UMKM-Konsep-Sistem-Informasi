import type { Order, Product, StockStatus } from "@/common/types";

const EXPIRY_NA = null; // expiry tracking is admin-managed; omitted from this MVP slice

/** Single source of truth for stock status — derived, never stored. */
export function deriveStatus(stock: number, reorderPoint: number): StockStatus {
  if (stock === 0) return { key: "kosong", label: "Kosong", tone: "red", rank: 0 };
  if (stock <= reorderPoint) return { key: "restock", label: "Perlu Restock", tone: "amber", rank: 1 };
  return { key: "aman", label: "Stok Aman", tone: "green", rank: 2 };
}

export function computeKpis(products: Product[], orders: Order[]) {
  const assetValue = products.reduce((s, p) => s + p.stock * p.price, 0);
  const stockout = products.filter((p) => p.stock === 0).length;
  const reorder = products.filter((p) => p.stock > 0 && p.stock <= p.reorderPoint).length;
  const revenue = orders
    .filter((o) => o.status === "selesai")
    .reduce((s, o) => s + o.total, 0);
  const newOrders = orders.filter((o) => o.status === "baru").length;
  return { assetValue, stockout, reorder, revenue, newOrders, productCount: products.length };
}

export function turnover(products: Product[], range: "weekly" | "monthly") {
  const field = range === "monthly" ? "monthlySold" : "weeklySold";
  const sorted = [...products].sort((a, b) => b[field] - a[field]);
  return {
    fast: sorted.slice(0, 5).map((p) => ({ name: p.name, sold: p[field] })),
    slow: sorted.slice(-5).reverse().map((p) => ({ name: p.name, sold: p[field] })),
  };
}

export function supplierSpend(products: Product[]) {
  const map = new Map<string, { name: string; color: string; spend: number }>();
  for (const p of products) {
    const cur = map.get(p.supplier) ?? { name: p.supplier, color: p.supplierColor, spend: 0 };
    cur.spend += p.stock * p.price;
    map.set(p.supplier, cur);
  }
  const list = [...map.values()].sort((a, b) => b.spend - a.spend);
  const total = list.reduce((s, x) => s + x.spend, 0);
  return { list, total };
}

export { EXPIRY_NA };
