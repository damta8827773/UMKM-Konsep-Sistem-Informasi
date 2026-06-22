"use client";

import { Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useReviews } from "@/hooks/use-reviews";
import { deleteReview } from "@/services/reviews";
import { useI18n } from "@/i18n/provider";
import { Card, CardHeader, CardTitle, CardDescription } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { StarRating } from "@/common/components/ui/star-rating";

function timeAgo(ts: number) {
  const d = Math.floor((Date.now() - ts) / 60000);
  if (d < 1) return "baru saja";
  if (d < 60) return `${d} mnt lalu`;
  const h = Math.floor(d / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export function ReviewsPanel() {
  const { t } = useI18n();
  const { reviews } = useReviews(true);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{t("admin.reviewsTitle")}</CardTitle>
          <CardDescription>{t("admin.reviewsDesc")}</CardDescription>
        </div>
        {reviews.length > 0 && <Badge tone="brand">{reviews.length}</Badge>}
      </CardHeader>

      <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto p-4">
        {reviews.length === 0 && (
          <div className="py-8 text-center text-[13px] text-faint">
            <MessageSquare className="mx-auto mb-2 h-6 w-6" /> {t("admin.noReviews")}
          </div>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="rounded-lg border border-border p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge tone={r.type === "komplain" ? "red" : "green"}>{t(`review.${r.type}`)}</Badge>
                <StarRating value={r.rating} size={13} />
              </div>
              <button onClick={() => deleteReview(r.id).catch(() => toast.error(t("common.fail")))} className="text-faint transition-colors hover:text-danger" aria-label="Hapus">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-sm font-semibold">{r.productName}</div>
            {r.comment && <p className="mt-0.5 text-[13px] text-muted">“{r.comment}”</p>}
            <div className="mt-1 text-[11px] text-faint">{r.buyerName} · {timeAgo(r.createdAt)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
