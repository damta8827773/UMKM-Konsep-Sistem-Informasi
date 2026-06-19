"use client";

import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useI18n } from "@/i18n/provider";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { QtyStepper } from "@/common/components/ui/qty-stepper";
import { formatRupiah } from "@/common/libs/utils";

export function CartView() {
  const { items, total, setQty, remove } = useCart();
  const { t } = useI18n();

  if (items.length === 0) {
    return (
      <Card className="mx-auto max-w-md p-10 text-center">
        <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-faint" />
        <h2 className="mb-1 text-lg font-bold">{t("cart.empty")}</h2>
        <p className="mb-5 text-sm text-muted">{t("cart.emptyDesc")}</p>
        <Link href="/"><Button>{t("cart.startShopping")}</Button></Link>
      </Card>
    );
  }

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold tracking-tight">{t("cart.title")}</h1>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-3">
          {items.map((i) => (
            <Card key={i.productId} className="flex items-center gap-4 p-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-surface-2 text-2xl">{i.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{i.name}</div>
                <div className="text-xs text-faint">{formatRupiah(i.price)} / {i.unit}</div>
                <div className="mt-2"><QtyStepper value={i.qty} max={i.maxStock} onChange={(q) => setQty(i.productId, q)} size="sm" /></div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-bold tabular-nums">{formatRupiah(i.price * i.qty)}</span>
                <button onClick={() => remove(i.productId)} aria-label={t("cart.remove")} className="text-faint transition-colors hover:text-danger">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit p-5 lg:sticky lg:top-20">
          <h2 className="mb-3 text-sm font-bold">{t("cart.summary")}</h2>
          <div className="flex justify-between border-b border-border pb-3 text-sm text-muted">
            <span>{t("cart.subtotal")} ({items.length} {t("cart.item")})</span>
            <span className="font-semibold text-text">{formatRupiah(total)}</span>
          </div>
          <div className="flex justify-between py-3 text-base font-bold">
            <span>{t("cart.total")}</span>
            <span>{formatRupiah(total)}</span>
          </div>
          <Link href="/checkout" className="block">
            <Button className="w-full">{t("cart.checkout")} <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
