"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { toast } from "sonner";
import type { ReviewType } from "@/common/types";
import { createReview } from "@/services/reviews";
import { useI18n } from "@/i18n/provider";
import { StarRating } from "@/common/components/ui/star-rating";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/libs/utils";

interface Line {
  productId: string;
  name: string;
}

/** Shown after checkout: let the buyer rate / complain about each bought product. */
export function PostPurchaseReview({ items, buyerName }: { items: Line[]; buyerName: string }) {
  const { t } = useI18n();
  const [rating, setRating] = useState<Record<string, number>>({});
  const [comment, setComment] = useState<Record<string, string>>({});
  const [type, setType] = useState<Record<string, ReviewType>>({});
  const [done, setDone] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);

  async function submit(item: Line) {
    const r = rating[item.productId] ?? 0;
    if (r < 1) {
      toast.error(t("review.needStar"));
      return;
    }
    setBusy(item.productId);
    try {
      await createReview({
        productId: item.productId,
        productName: item.name,
        rating: r,
        comment: comment[item.productId] ?? "",
        type: type[item.productId] ?? "ulasan",
        buyerName,
      });
      setDone((d) => new Set(d).add(item.productId));
      toast.success(t("review.thanks"));
    } catch (e) {
      toast.error(t("common.fail"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-6 text-left">
      <h3 className="mb-1 text-sm font-bold">{t("review.title")}</h3>
      <p className="mb-3 text-xs text-muted">{t("review.subtitle")}</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const submitted = done.has(item.productId);
          const curType = type[item.productId] ?? "ulasan";
          return (
            <div key={item.productId} className="rounded-lg border border-border p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{item.name}</span>
                {submitted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-safe">
                    <Check className="h-3.5 w-3.5" /> {t("review.sent")}
                  </span>
                ) : (
                  <StarRating value={rating[item.productId] ?? 0} onChange={(v) => setRating((s) => ({ ...s, [item.productId]: v }))} size={20} />
                )}
              </div>

              {!submitted && (
                <>
                  <div className="mb-2 inline-flex rounded-md border border-border bg-surface-2 p-0.5">
                    {(["ulasan", "komplain"] as ReviewType[]).map((tp) => (
                      <button
                        key={tp}
                        onClick={() => setType((s) => ({ ...s, [item.productId]: tp }))}
                        className={cn(
                          "rounded px-2.5 py-1 text-[11px] font-semibold capitalize transition-colors",
                          curType === tp ? "bg-surface text-text shadow-card" : "text-muted"
                        )}
                      >
                        {t(`review.${tp}`)}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comment[item.productId] ?? ""}
                    onChange={(e) => setComment((s) => ({ ...s, [item.productId]: e.target.value }))}
                    placeholder={t("review.placeholder")}
                    rows={2}
                    className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={() => submit(item)} disabled={busy === item.productId}>
                      <Send className="h-3.5 w-3.5" /> {t("review.send")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
