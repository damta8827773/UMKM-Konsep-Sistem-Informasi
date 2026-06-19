"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Product } from "@/common/types";
import { turnover } from "@/services/metrics";
import { useI18n } from "@/i18n/provider";
import { Card, CardHeader, CardTitle, CardDescription } from "@/common/components/ui/card";
import { Segmented } from "@/common/components/ui/segmented";

export function TurnoverChart({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const [range, setRange] = useState<"weekly" | "monthly">("weekly");
  const { fast, slow } = turnover(products, range);
  const data = [
    ...fast.map((d) => ({ ...d, kind: "fast" as const })),
    ...slow.map((d) => ({ ...d, kind: "slow" as const })),
  ];

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{t("admin.turnoverTitle")}</CardTitle>
          <CardDescription>{t("admin.turnoverDesc")}</CardDescription>
        </div>
        <Segmented options={[{ label: t("admin.weekly"), value: "weekly" }, { label: t("admin.monthly"), value: "monthly" }]} value={range} onChange={setRange} />
      </CardHeader>
      <div className="px-4 pb-5 pt-4 sm:px-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 4, right: 16 }}>
              <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--faint))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: "hsl(var(--muted))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "hsl(var(--surface-2))" }}
                contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12, color: "hsl(var(--text))" }}
                formatter={(v: number) => [`${v} ${t("admin.soldUnit")}`, t("admin.sold")]}
              />
              <Bar dataKey="sold" radius={[0, 6, 6, 0]} barSize={15}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.kind === "fast" ? "hsl(var(--safe))" : "hsl(var(--track))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 border-t border-border pt-3 text-xs font-medium text-muted">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded bg-safe" /> {t("admin.fastMoving")}</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded bg-track" /> {t("admin.slowMoving")}</span>
        </div>
      </div>
    </Card>
  );
}
