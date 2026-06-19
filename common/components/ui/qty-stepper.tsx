"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/common/libs/utils";

/** Reusable +/- quantity control used in storefront cards and the cart. */
export function QtyStepper({
  value,
  min = 1,
  max,
  onChange,
  size = "md",
}: {
  value: number;
  min?: number;
  max: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const btn =
    "grid place-items-center rounded-md border border-border bg-surface text-text transition-colors hover:bg-surface-2 disabled:opacity-40 disabled:pointer-events-none";
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Kurangi"
        className={cn(btn, dim)}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-[2ch] text-center text-sm font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Tambah"
        className={cn(btn, dim)}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
