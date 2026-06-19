import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/common/libs/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        red: "bg-danger-soft text-danger before:h-1.5 before:w-1.5 before:rounded-full before:bg-current",
        amber: "bg-warn-soft text-warn before:h-1.5 before:w-1.5 before:rounded-full before:bg-current",
        green: "bg-safe-soft text-safe before:h-1.5 before:w-1.5 before:rounded-full before:bg-current",
        brand: "bg-brand-soft text-brand",
        neutral: "bg-surface-2 text-muted",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
