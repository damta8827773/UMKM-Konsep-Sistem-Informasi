export type Tone = "red" | "amber" | "green";
export type StatusKey = "kosong" | "restock" | "aman";

export interface StockStatus {
  key: StatusKey;
  label: string;
  tone: Tone;
  rank: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  emoji: string;
  image?: string; // optional photo URL; falls back to a category photo, then emoji
  category: string;
  stock: number;
  reorderPoint: number;
  unit: string;
  price: number; // Rupiah per unit
  weeklySold: number;
  monthlySold: number;
  supplier: string;
  supplierColor: string;
}

export interface CartItem {
  productId: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  qty: number;
  maxStock: number;
}

export type OrderStatus = "baru" | "diproses" | "selesai" | "batal";

export interface OrderItem {
  productId: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  buyerName: string;
  paymentMethod: string;
  createdAt: number;
}

export type ReviewType = "ulasan" | "komplain";

export interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number; // 1..5
  comment: string;
  type: ReviewType;
  buyerName: string;
  createdAt: number;
}

/** Aggregated rating for a product (computed from reviews). */
export interface RatingSummary {
  average: number;
  count: number;
}
