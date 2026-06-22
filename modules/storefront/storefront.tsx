"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useI18n } from "@/i18n/provider";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Button } from "@/common/components/ui/button";
import { ConfigNotice } from "@/common/components/config-notice";
import { cn } from "@/common/libs/utils";

const PAGE_SIZE = 24;

export function Storefront() {
  const { products, loading, error } = useProducts();
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("__all__");
  const [shown, setShown] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => ["__all__", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "__all__" || p.category === category) &&
        (!q || `${p.name} ${p.category}`.toLowerCase().includes(q))
    );
  }, [products, search, category]);

  // Reset paging whenever the filter changes.
  useEffect(() => setShown(PAGE_SIZE), [search, category]);

  const paged = visible.slice(0, shown);

  if (error) return <ConfigNotice message={error} />;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-soft via-surface to-surface p-6 sm:p-8"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand shadow-card">
          Katalog UMKM · 1000+ produk
        </span>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-[32px]">{t("store.title")}</h1>
        <p className="mt-1.5 max-w-xl text-sm text-muted">{t("store.subtitle")}</p>
      </motion.div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 sm:w-72">
          <Search className="h-4 w-4 text-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("store.search")}
            className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
          />
        </div>
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                category === c ? "border-brand bg-brand-soft text-brand" : "border-border bg-surface text-muted hover:text-text"
              )}
            >
              {c === "__all__" ? t("store.all") : c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-faint">
          {products.length === 0 ? t("store.emptyAdmin") : t("store.noMatch")}
        </div>
      ) : (
        <>
          <div className="mb-3 text-xs text-faint">
            {t("store.showing", { shown: String(paged.length), total: String(visible.length) })}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {paged.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i % PAGE_SIZE} />
            ))}
          </div>
          {shown < visible.length && (
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => setShown((s) => s + PAGE_SIZE)}>
                {t("store.loadMore")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
