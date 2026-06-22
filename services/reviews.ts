import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/client";
import type { RatingSummary, Review, ReviewType } from "@/common/types";

const col = collection(db, "reviews");

/** Buyer submits a rating + comment for a product they purchased. */
export async function createReview(input: {
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  type: ReviewType;
  buyerName: string;
}): Promise<void> {
  await addDoc(col, {
    productId: input.productId,
    productName: input.productName,
    rating: Math.max(1, Math.min(5, Math.round(input.rating))),
    comment: input.comment.trim().slice(0, 500),
    type: input.type,
    buyerName: input.buyerName.trim() || "Tamu",
    createdAt: Date.now(),
  });
}

/** Live feed of all reviews (storefront aggregates + admin panel). */
export function subscribeReviews(cb: (reviews: Review[]) => void, onError?: (e: Error) => void) {
  const q = query(col, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      cb(
        snap.docs.map((d) => {
          const x = d.data() as Partial<Review>;
          return {
            id: d.id,
            productId: x.productId ?? "",
            productName: x.productName ?? "",
            rating: typeof x.rating === "number" ? x.rating : 0,
            comment: x.comment ?? "",
            type: (x.type ?? "ulasan") as ReviewType,
            buyerName: x.buyerName || "Tamu",
            createdAt: typeof x.createdAt === "number" ? x.createdAt : 0,
          };
        })
      ),
    (err) => onError?.(err)
  );
}

export async function deleteReview(id: string) {
  await deleteDoc(doc(db, "reviews", id));
}

/** Build a productId → {average, count} map from a review list. */
export function ratingByProduct(reviews: Review[]): Record<string, RatingSummary> {
  const acc: Record<string, { sum: number; count: number }> = {};
  for (const r of reviews) {
    if (r.type !== "ulasan") continue; // complaints don't affect the star average
    const a = acc[r.productId] ?? { sum: 0, count: 0 };
    a.sum += r.rating;
    a.count += 1;
    acc[r.productId] = a;
  }
  const out: Record<string, RatingSummary> = {};
  for (const [id, a] of Object.entries(acc)) out[id] = { average: a.sum / a.count, count: a.count };
  return out;
}
