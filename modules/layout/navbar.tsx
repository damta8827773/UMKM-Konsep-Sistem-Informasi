"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Store, LayoutDashboard } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useI18n } from "@/i18n/provider";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { BrandLogo } from "@/common/components/brand-logo";
import { cn } from "@/common/libs/utils";

export function Navbar() {
  const { count } = useCart();
  const { isAdmin } = useAuth();
  const { t } = useI18n();
  const pathname = usePathname();

  // Admin link is ALWAYS visible so the login is discoverable. Clicking it when
  // not signed in shows the login card (AdminGuard); Firestore Rules remain the
  // real gate, so exposing the link is safe.
  const links = [
    { href: "/", label: t("nav.store"), icon: Store },
    { href: "/admin", label: t("nav.admin"), icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandLogo className="h-9 w-9 rounded-[10px] shadow-lg shadow-brand/30" />
          <span className="text-[15px] font-bold tracking-tight">Warung Analytics</span>
        </Link>

        <nav className="flex items-center gap-1.5">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-brand-soft text-brand" : "text-muted hover:bg-surface-2 hover:text-text"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="hidden sm:inline">{l.label}</span>
              </Link>
            );
          })}

          <Link
            href="/cart"
            aria-label={t("nav.cart")}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text transition-colors hover:bg-surface-2"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full border-2 border-bg bg-brand px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
