"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import id from "@/messages/id";
import en from "@/messages/en";
import { DEFAULT_LOCALE, STORAGE_KEY, type LocaleCode } from "./config";

const DICTIONARIES: Record<LocaleCode, typeof id> = { id, en };

/** Resolve a dotted key like "cart.checkout" from a nested object. */
function lookup(obj: unknown, path: string): string | undefined {
  return path.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object" && k in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj) as string | undefined;
}

type Vars = Record<string, string | number>;

interface I18nState {
  locale: LocaleCode;
  setLocale: (l: LocaleCode) => void;
  t: (key: string, vars?: Vars) => string;
}

const I18nContext = createContext<I18nState | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Start from the default on both server and first client render (no hydration
  // mismatch); switch to the saved locale after mount.
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
    if (saved && saved in DICTIONARIES) setLocaleState(saved);
  }, []);

  function setLocale(l: LocaleCode) {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  }

  const value = useMemo<I18nState>(() => {
    const dict = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
    const t = (key: string, vars?: Vars) => {
      let str = lookup(dict, key) ?? lookup(DICTIONARIES[DEFAULT_LOCALE], key) ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) str = str.replace(`{${k}}`, String(v));
      return str;
    };
    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
