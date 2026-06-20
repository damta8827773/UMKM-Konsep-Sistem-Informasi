import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase/client";
import type { Product } from "@/common/types";
import { generateCatalog } from "./catalog";

const col = collection(db, "products");

/** Fill in safe defaults so a partial/malformed Firestore doc never crashes the UI. */
function normalizeProduct(id: string, data: Record<string, unknown>): Product {
  const num = (v: unknown, d = 0) => (typeof v === "number" && !Number.isNaN(v) ? v : d);
  const str = (v: unknown, d = "") => (typeof v === "string" && v.length ? v : d);
  return {
    id,
    name: str(data.name, "(Tanpa nama)"),
    sku: str(data.sku, id),
    emoji: str(data.emoji, "📦"),
    image: typeof data.image === "string" ? data.image : undefined,
    category: str(data.category, "Lainnya"),
    stock: num(data.stock),
    reorderPoint: num(data.reorderPoint, 0),
    unit: str(data.unit, "pcs"),
    price: num(data.price),
    weeklySold: num(data.weeklySold),
    monthlySold: num(data.monthlySold),
    supplier: str(data.supplier, "-"),
    supplierColor: str(data.supplierColor, "#cbd2e0"),
  };
}

/** Live subscription to the catalog (storefront + admin). */
export function subscribeProducts(cb: (products: Product[]) => void, onError?: (e: Error) => void) {
  const q = query(col, orderBy("name"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => normalizeProduct(d.id, d.data() as Record<string, unknown>))),
    (err) => onError?.(err)
  );
}

export async function updateStock(id: string, newStock: number) {
  await updateDoc(doc(db, "products", id), { stock: Math.max(0, Math.round(newStock)) });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, "products", id));
}

export async function addProduct(p: Omit<Product, "id">) {
  await addDoc(col, p);
}

/**
 * One-click seed of the UMKM catalog (admin only — Firestore Rules enforce it).
 * Writes in chunks because a Firestore batch is capped at 500 ops.
 * No-op if products already exist.
 */
export async function seedProducts(count = 1000, opts?: { append?: boolean }): Promise<number> {
  if (!opts?.append) {
    const existing = await getDocs(col);
    if (!existing.empty) return 0;
  }

  const products = generateCatalog(count);
  const CHUNK = 450;
  for (let i = 0; i < products.length; i += CHUNK) {
    const batch = writeBatch(db);
    for (const p of products.slice(i, i + CHUNK)) batch.set(doc(col), p);
    await batch.commit();
  }
  return products.length;
}

/** Delete every product (admin reset). Batched because of the 500-op limit. */
export async function clearAllProducts(): Promise<number> {
  const snap = await getDocs(col);
  const docs = snap.docs;
  const CHUNK = 450;
  for (let i = 0; i < docs.length; i += CHUNK) {
    const batch = writeBatch(db);
    for (const d of docs.slice(i, i + CHUNK)) batch.delete(d.ref);
    await batch.commit();
  }
  return docs.length;
}
