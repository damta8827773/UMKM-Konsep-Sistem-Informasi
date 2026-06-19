"use client";

import { useState } from "react";
import { Check, X, Package } from "lucide-react";
import { toast } from "sonner";
import type { Order, OrderStatus } from "@/common/types";
import { processOrder, cancelOrder } from "@/services/orders";
import { useI18n } from "@/i18n/provider";
import { Card, CardHeader, CardTitle, CardDescription } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { formatRupiah } from "@/common/libs/utils";

const statusTone: Record<OrderStatus, "brand" | "amber" | "green" | "red"> = {
  baru: "amber",
  diproses: "brand",
  selesai: "green",
  batal: "red",
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  const { t } = useI18n();
  const [busy, setBusy] = useState<string | null>(null);

  async function run(fn: () => Promise<void>, id: string) {
    setBusy(id);
    try {
      await fn();
    } catch (e) {
      toast.error(t("common.fail"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{t("admin.ordersTitle")}</CardTitle>
          <CardDescription>{t("admin.ordersDesc")}</CardDescription>
        </div>
      </CardHeader>

      <div className="flex flex-col gap-3 p-4">
        {orders.length === 0 && (
          <div className="py-8 text-center text-[13px] text-faint">
            <Package className="mx-auto mb-2 h-6 w-6" /> {t("admin.noOrders")}
          </div>
        )}
        {orders.map((o) => (
          <div key={o.id} className="rounded-lg border border-border p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge tone={statusTone[o.status]}>{t(`admin.orderStatus.${o.status}`)}</Badge>
                <span className="text-sm font-semibold">{o.buyerName}</span>
                <span className="text-xs text-faint">· {o.paymentMethod}</span>
              </div>
              <span className="text-sm font-bold tabular-nums">{formatRupiah(o.total)}</span>
            </div>
            <div className="mb-3 text-xs text-muted">
              {o.items.map((i) => `${i.emoji} ${i.name}×${i.qty}`).join("  ·  ")}
            </div>
            {o.status === "baru" && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => run(() => processOrder(o.id), o.id)} disabled={busy === o.id}>
                  <Check className="h-3.5 w-3.5" /> {t("admin.process")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => run(() => cancelOrder(o.id), o.id)} disabled={busy === o.id}>
                  <X className="h-3.5 w-3.5" /> {t("admin.cancel")}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
