"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/common/types";
import { Card } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { QtyStepper } from "@/common/components/ui/qty-stepper";
import { useCart } from "@/contexts/cart-context";
import { useI18n } from "@/i18n/provider";
import { deriveStatus } from "@/services/metrics";
import { formatRupiah } from "@/common/libs/utils";
import { imageSources, itemEmoji } from "@/common/libs/product-image";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const { t } = useI18n();
  const [qty, setQty] = useState(1);
  const [srcIdx, setSrcIdx] = useState(0); // cascade through image candidates
  const status = deriveStatus(product.stock, product.reorderPoint);
  const soldOut = product.stock === 0;
  const sources = imageSources(product);
  const icon = itemEmoji(product.name, product.emoji); // always matches the item

  function handleAdd() {
    add(product, qty);
    toast.success(`${t("product.added")}: ${product.name}`, { description: `${qty} ${product.unit} ${t("product.toCart")}` });
    setQty(1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.4), ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
    <Card className="flex h-full flex-col p-4">
      <div className="relative mb-3 h-32 overflow-hidden rounded-lg">
        {srcIdx < sources.length ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sources[srcIdx]}
            alt={product.name}
            loading="lazy"
            onError={() => setSrcIdx((i) => i + 1)}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          // Final fallback — emoji tile that always matches the product name.
          <div className="grid h-full place-items-center bg-gradient-to-br from-surface-2 to-brand-soft/50">
            <span className="text-6xl drop-shadow-sm">{icon}</span>
          </div>
        )}
      </div>

      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        <Badge tone={status.tone} className="shrink-0">{t(`status.${status.key}`)}</Badge>
      </div>
      <p className="text-xs text-faint">{product.category}</p>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-lg font-extrabold tracking-tight">{formatRupiah(product.price)}</span>
        <span className="text-xs text-faint">{t("product.stock")} {product.stock} {product.unit}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {soldOut ? (
          <span className="text-sm font-semibold text-danger">{t("product.soldOut")}</span>
        ) : (
          <QtyStepper value={qty} max={product.stock} onChange={setQty} size="sm" />
        )}
        <Button size="sm" onClick={handleAdd} disabled={soldOut} className="shrink-0">
          <ShoppingCart className="h-3.5 w-3.5" />
          {t("product.add")}
        </Button>
      </div>
    </Card>
    </motion.div>
  );
}
