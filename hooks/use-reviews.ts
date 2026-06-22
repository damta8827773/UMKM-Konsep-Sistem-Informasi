"use client";

import { useEffect, useMemo, useState } from "react";
import type { Review } from "@/common/types";
import { ratingByProduct, subscribeReviews } from "@/services/reviews";
import { isFirebaseConfigured } from "@/services/firebase/client";

export function useReviews(enabled = true) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = subscribeReviews(
      (r) => {
        setReviews(r);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [enabled]);

  const ratings = useMemo(() => ratingByProduct(reviews), [reviews]);
  return { reviews, ratings, loading };
}
