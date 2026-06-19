"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/common/types";
import { subscribeOrders } from "@/services/orders";

export function useOrders(enabled: boolean) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const unsub = subscribeOrders(
      (o) => {
        setOrders(o);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [enabled]);

  return { orders, loading };
}
