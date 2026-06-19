import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/client";
import type { CartItem, Order, OrderItem, OrderStatus } from "@/common/types";
import { updateStock } from "./products";

const col = collection(db, "orders");

/** Buyer checkout (dummy payment). Rules allow create with status 'baru'. */
export async function createOrder(params: {
  items: CartItem[];
  buyerName: string;
  paymentMethod: string;
}): Promise<string> {
  const items: OrderItem[] = params.items.map((i) => ({
    productId: i.productId,
    name: i.name,
    emoji: i.emoji,
    price: i.price,
    qty: i.qty,
  }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ref = await addDoc(col, {
    items,
    total,
    status: "baru" as OrderStatus,
    buyerName: params.buyerName || "Tamu",
    paymentMethod: params.paymentMethod,
    createdAt: Date.now(),
  });
  return ref.id;
}

/** Admin: live order feed. Defaults guard against partial docs. */
export function subscribeOrders(cb: (orders: Order[]) => void, onError?: (e: Error) => void) {
  const q = query(col, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      cb(
        snap.docs.map((d) => {
          const data = d.data() as Partial<Order>;
          return {
            id: d.id,
            items: Array.isArray(data.items) ? data.items : [],
            total: typeof data.total === "number" ? data.total : 0,
            status: (data.status ?? "baru") as OrderStatus,
            buyerName: data.buyerName || "Tamu",
            paymentMethod: data.paymentMethod || "-",
            createdAt: typeof data.createdAt === "number" ? data.createdAt : 0,
          };
        })
      ),
    (err) => onError?.(err)
  );
}

/** Admin: mark an order processed → deduct stock once. */
export async function processOrder(orderId: string) {
  const ref = doc(db, "orders", orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const order = snap.data() as Omit<Order, "id">;
  if (order.status !== "baru") return;

  for (const item of order.items) {
    const pSnap = await getDoc(doc(db, "products", item.productId));
    if (pSnap.exists()) {
      const cur = (pSnap.data().stock as number) ?? 0;
      await updateStock(item.productId, cur - item.qty);
    }
  }
  await updateDoc(ref, { status: "selesai" satisfies OrderStatus });
}

export async function cancelOrder(orderId: string) {
  await updateDoc(doc(db, "orders", orderId), { status: "batal" satisfies OrderStatus });
}
