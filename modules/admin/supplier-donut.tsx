"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Product } from "@/common/types";
import { supplierSpend } from "@/services/metrics";
import { useI18n } from "@/i18n/provider";
import { Card, CardHeader, CardTitle, CardDescription } from "@/common/components/ui/card";
import { formatRupiahCompact } from "@/common/libs/utils";

export function SupplierDonut({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const { list, total } = supplierSpend(products);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{t("admin.supplierTitle")}</CardTitle>
          <CardDescription>{t("admin.supplierDesc")}</CardDescription>
        </div>
      </CardHeader>
      <div className="p-5 sm:p-6">
        {list.length === 0 ? (
          <div className="py-8 text-center text-[13px] text-faint">{t("admin.noData")}</div>
        ) : (
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="relative h-[150px] w-[150px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={list} dataKey="spend" nameKey="name" innerRadius={52} outerRadius={74} paddingAngle={2} stroke="hsl(var(--surface))" strokeWidth={3}>
                    {list.map((s) => (<Cell key={s.name} fill={s.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12, color: "hsl(var(--text))" }} formatter={(v: number) => [formatRupiahCompact(v), t("admin.spend")]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <div className="text-[17px] font-extrabold tracking-tight">{formatRupiahCompact(total)}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-faint">{t("admin.total")}</div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col gap-2.5">
              {list.map((s) => (
                <div key={s.name} className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded" style={{ background: s.color }} />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{s.name}</span>
                  <span className="text-[13px] font-bold tabular-nums">{formatRupiahCompact(s.spend)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
