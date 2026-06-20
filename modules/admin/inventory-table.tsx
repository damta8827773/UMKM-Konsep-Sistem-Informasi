"use client";

import { useMemo, useState } from "react";
import { Search, Minus, Plus, Trash2, Sparkles, Eraser } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/common/types";
import { deriveStatus } from "@/services/metrics";
import { updateStock, deleteProduct, seedProducts, clearAllProducts } from "@/services/products";
import { useI18n } from "@/i18n/provider";
import { Card, CardHeader, CardTitle, CardDescription } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";

export function InventoryTable({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [clearing, setClearing] = useState(false);

  const ROW_CAP = 80;
  const allRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q ? products.filter((p) => `${p.name} ${p.category} ${p.sku}`.toLowerCase().includes(q)) : products;
    return [...list].sort((a, b) => deriveStatus(a.stock, a.reorderPoint).rank - deriveStatus(b.stock, b.reorderPoint).rank);
  }, [products, search]);
  const rows = allRows.slice(0, ROW_CAP);

  async function adjust(p: Product, delta: number) {
    setBusyId(p.id);
    try {
      await updateStock(p.id, p.stock + delta);
    } catch (e) {
      toast.error(t("admin.failChangeStock"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setBusyId(null);
    }
  }

  async function handleSeed() {
    setSeeding(true);
    try {
      // append:true → "Tambah semua" works even when products already exist.
      const n = await seedProducts(1000, { append: true });
      toast.success(`${n} ${t("admin.seedDone")}`);
    } catch (e) {
      toast.error(t("common.fail"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setSeeding(false);
    }
  }

  async function handleClear() {
    if (!window.confirm(t("admin.clearConfirm"))) return;
    setClearing(true);
    try {
      const n = await clearAllProducts();
      toast.success(`${n} ${t("admin.cleared")}`);
    } catch (e) {
      toast.error(t("common.fail"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setClearing(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{t("admin.stockTitle")}</CardTitle>
          <CardDescription>{t("admin.stockDesc")}</CardDescription>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5">
            <Search className="h-[15px] w-[15px] text-faint" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("admin.search")} className="w-28 bg-transparent text-[13px] outline-none placeholder:text-faint sm:w-40" />
          </div>
          <Button size="sm" onClick={handleSeed} disabled={seeding}>
            <Sparkles className="h-3.5 w-3.5" /> {seeding ? t("admin.seeding") : t("admin.seedAll")}
          </Button>
          {products.length > 0 && (
            <Button size="sm" variant="outline" onClick={handleClear} disabled={clearing}>
              <Eraser className="h-3.5 w-3.5" /> {clearing ? t("admin.clearing") : t("admin.clearAll")}
            </Button>
          )}
        </div>
      </CardHeader>

      <div className="overflow-x-auto px-2 pb-2.5 pt-1.5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-faint">
              <th className="px-4 py-3">{t("admin.product")}</th>
              <th className="px-4 py-3">{t("admin.category")}</th>
              <th className="px-4 py-3 text-center">{t("admin.status")}</th>
              <th className="px-4 py-3 text-center">{t("admin.adjustStock")}</th>
              <th className="px-4 py-3 text-right">{t("admin.delete")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5} className="py-10 text-center text-[13px] text-faint">{t("admin.noProducts")}</td></tr>
            )}
            {rows.map((p) => {
              const s = deriveStatus(p.stock, p.reorderPoint);
              return (
                <tr key={p.id} className="border-t border-border hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-surface-2 text-lg">{p.emoji}</div>
                      <div>
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-[11px] text-faint">SKU · {p.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted">{p.category}</td>
                  <td className="px-4 py-3 text-center"><Badge tone={s.tone}>{t(`status.${s.key}`)}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => adjust(p, -1)} disabled={busyId === p.id || p.stock === 0} className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface hover:bg-surface-2 disabled:opacity-40" aria-label="-"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="min-w-[3ch] text-center text-sm font-bold tabular-nums">{p.stock}</span>
                      <button onClick={() => adjust(p, 1)} disabled={busyId === p.id} className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface hover:bg-surface-2 disabled:opacity-40" aria-label="+"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => deleteProduct(p.id).catch(() => toast.error(t("admin.failDelete")))} className="text-faint transition-colors hover:text-danger" aria-label={t("admin.delete")}><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {allRows.length > ROW_CAP && (
          <div className="px-4 py-3 text-center text-xs text-faint">
            {t("admin.rowCap", { shown: String(ROW_CAP), total: String(allRows.length) })}
          </div>
        )}
      </div>
    </Card>
  );
}
