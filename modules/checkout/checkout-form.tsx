"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import { useI18n } from "@/i18n/provider";
import { createOrder } from "@/services/orders";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { PostPurchaseReview } from "@/modules/reviews/post-purchase-review";
import { cn, formatRupiah } from "@/common/libs/utils";

export function CheckoutForm() {
  const { items, total, clear } = useCart();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [method, setMethod] = useState("qris");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<{ productId: string; name: string }[]>([]);

  const METHODS = [
    { id: "qris", label: t("checkout.qris"), emoji: "📱" },
    { id: "transfer", label: t("checkout.transfer"), emoji: "🏦" },
    { id: "cod", label: t("checkout.cod"), emoji: "💵" },
  ];

  async function handlePay() {
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const id = await createOrder({ items, buyerName: name, paymentMethod: method });
      setPurchased(items.map((i) => ({ productId: i.productId, name: i.name })));
      clear();
      setDone(id);
      toast.success(t("checkout.paySuccess"), { description: t("checkout.paySuccessDesc") });
    } catch (e) {
      toast.error(t("checkout.failed"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-safe" />
        <h2 className="mb-1 text-xl font-bold">{t("checkout.done")}</h2>
        <p className="mb-1 text-sm text-muted">{t("checkout.orderNo")}</p>
        <p className="mb-5 font-mono text-sm font-semibold">{done}</p>
        {purchased.length > 0 && <PostPurchaseReview items={purchased} buyerName={name} />}
        <div className="mt-6">
          <Link href="/"><Button>{t("checkout.back")}</Button></Link>
        </div>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="mx-auto max-w-md p-10 text-center">
        <h2 className="mb-2 text-lg font-bold">{t("checkout.nothing")}</h2>
        <Link href="/"><Button>{t("cart.startShopping")}</Button></Link>
      </Card>
    );
  }

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold tracking-tight">{t("checkout.title")}</h1>

      <div className="mb-4 flex items-center gap-2 rounded-lg border border-warn/30 bg-warn-soft px-4 py-2.5 text-xs font-medium text-warn">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        {t("checkout.dummyWarn")}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-bold">{t("checkout.buyerData")}</h2>
            <label className="mb-1.5 block text-xs font-medium text-muted">{t("checkout.name")}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("checkout.namePlaceholder")} />
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-bold">{t("checkout.method")}</h2>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold transition-colors",
                    method === m.id ? "border-brand bg-brand-soft text-brand" : "border-border bg-surface text-muted hover:text-text"
                  )}
                >
                  <span className="text-lg">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card className="h-fit p-5 lg:sticky lg:top-20">
          <h2 className="mb-3 text-sm font-bold">{t("checkout.summary")}</h2>
          <div className="mb-3 flex flex-col gap-2 border-b border-border pb-3">
            {items.map((i) => (
              <div key={i.productId} className="flex justify-between gap-2 text-xs">
                <span className="min-w-0 truncate text-muted">{i.emoji} {i.name} ×{i.qty}</span>
                <span className="shrink-0 font-semibold tabular-nums">{formatRupiah(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2 text-base font-bold">
            <span>{t("checkout.total")}</span>
            <span>{formatRupiah(total)}</span>
          </div>
          <Button className="mt-2 w-full" onClick={handlePay} disabled={submitting}>
            {submitting ? t("checkout.processing") : `${t("checkout.pay")} ${formatRupiah(total)} ${t("checkout.dummy")}`}
          </Button>
        </Card>
      </div>
    </div>
  );
}
