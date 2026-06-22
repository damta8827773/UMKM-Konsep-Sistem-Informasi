"use client";

import { Star } from "lucide-react";
import { cn } from "@/common/libs/utils";

/** Read-only OR interactive star rating. Pass `onChange` to make it clickable. */
export function StarRating({
  value,
  onChange,
  size = 16,
  className,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  className?: string;
}) {
  const interactive = !!onChange;
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value);
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(n)}
            aria-label={`${n} bintang`}
            className={cn(interactive && "cursor-pointer transition-transform hover:scale-110", !interactive && "cursor-default")}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled ? "fill-amber-400 text-amber-400" : "fill-transparent text-border"}
            />
          </button>
        );
      })}
    </div>
  );
}
