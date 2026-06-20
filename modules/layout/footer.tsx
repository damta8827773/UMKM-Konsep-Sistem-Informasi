"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useI18n } from "@/i18n/provider";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-faint sm:flex-row sm:px-6">
        <span>© {year} Warung Analytics · prototype UMKM</span>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-surface-2 hover:text-muted"
        >
          <Lock className="h-3.5 w-3.5" />
          {t("nav.admin")}
        </Link>
      </div>
    </footer>
  );
}
