"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { LOCALES } from "@/i18n/config";
import { cn } from "@/common/libs/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ganti bahasa"
        className="flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-2"
      >
        <Globe className="h-[18px] w-[18px]" />
        <span className="hidden text-base leading-none sm:inline">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-card">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                l.code === locale ? "bg-brand-soft text-brand" : "text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1 text-left font-medium">{l.label}</span>
              {l.code === locale && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
