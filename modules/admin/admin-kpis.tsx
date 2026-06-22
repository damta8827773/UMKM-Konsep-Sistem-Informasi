"use client";

import { motion } from "framer-motion";
import { Wallet, PackageX, ShoppingBag, Coins } from "lucide-react";
import type { Order, Product } from "@/common/types";
import { computeKpis } from "@/services/metrics";
import { useI18n } from "@/i18n/provider";
import { Card } from "@/common/components/ui/card";
import { NumberTicker } from "@/common/components/ui/number-ticker";
import { formatRupiahCompact } from "@/common/libs/utils";

export function AdminKpis({ products, orders }: { products: Product[]; orders: Order[] }) {
  const k = computeKpis(products, orders);
  const { t } = useI18n();

  const tiles = [
    { icon: <Wallet className="h-5 w-5" />, cls: "bg-brand-soft text-brand", value: formatRupiahCompact(k.assetValue), label: t("admin.kpiAsset") },
    { icon: <Coins className="h-5 w-5" />, cls: "bg-safe-soft text-safe", value: formatRupiahCompact(k.revenue), label: t("admin.kpiRevenue") },
    { icon: <ShoppingBag className="h-5 w-5" />, cls: "bg-warn-soft text-warn", value: <NumberTicker value={k.newOrders} />, label: t("admin.kpiNewOrders") },
    { icon: <PackageX className="h-5 w-5" />, cls: "bg-danger-soft text-danger", value: <NumberTicker value={k.stockout} />, label: t("admin.kpiStockout") },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {tiles.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
          whileHover={{ y: -3 }}
        >
          <Card className="p-5">
            <div className={`mb-3 grid h-10 w-10 place-items-center rounded-[11px] ${t.cls}`}>{t.icon}</div>
            <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.value}</div>
            <div className="mt-1.5 text-[13px] font-medium text-muted">{t.label}</div>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
