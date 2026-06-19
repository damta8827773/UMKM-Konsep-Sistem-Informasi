"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/common/types";
import { subscribeProducts } from "@/services/products";
import { isFirebaseConfigured } from "@/services/firebase/client";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setError("Firebase belum dikonfigurasi. Isi .env.local terlebih dahulu.");
      setLoading(false);
      return;
    }
    const unsub = subscribeProducts(
      (p) => {
        setProducts(p);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return { products, loading, error };
}
