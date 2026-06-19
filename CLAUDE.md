# CLAUDE.md — Warung Analytics

Guidance for AI agents (and humans). Single full-stack **Next.js + Firebase** app for a
grocery store: a public **storefront** (buyer) plus an email-gated **admin** dashboard
(inventory + orders). Payments are **dummy** (prototype).

## Project shape
- **One Next.js app** (App Router) at the project root — damtaweb-style folders:
  `app/`, `modules/`, `services/`, `contexts/`, `hooks/`, `common/`, `middleware.ts`.
- **Firebase** is the backend: **Firestore** (products, orders) + **Auth** (Google).
- **No hand-written `.html`/`.js`/`.css` pages.** Everything is `.ts`/`.tsx` + Tailwind.
  Only `app/globals.css` holds the `@tailwind` directives + design tokens.

## Run / verify
```bash
npm install
cp .env.local.example .env.local     # ROTATED Firebase keys only — never hardcode
npm run dev                          # http://localhost:3000
```

## Security rules (non-negotiable)
- **Secrets only in `.env.local`** (gitignored). `services/firebase/client.ts` reads config
  from `process.env` — no keys in source.
- **`firestore.rules` is the real boundary.** Only `damtafaiz@gmail.com` may write
  products / read & process orders. Client checks (`isAdminUser`, `AdminGuard`) are UX only.
- Gemini key is **server-only** (no `NEXT_PUBLIC_`).

## Internationalization (i18n)
- Lightweight React-context i18n (no locale routing). `useI18n().t("key")` everywhere;
  never hardcode user-facing copy.
- Messages live in `messages/<code>.ts`; `messages/id.ts` is the source of truth (its
  `Messages` type forces every other language to mirror its keys).
- Active locales registered in `i18n/config.ts` (currently `id`, `en`). **Add a language**
  by creating its message file + registering it — roadmap goes up to 25 (`PLANNED_LOCALES`).
  The switcher only shows fully-translated locales, so users never see half-translated UI.

## Conventions
- **One source of truth for derived data** in `services/metrics.ts` (stock status, KPIs,
  turnover, supplier spend). Never hardcode counts.
- **Stock is mutated only by admin** (Firestore Rules). Buyers create orders; the admin
  "Proses" action deducts stock. Storefront cannot tamper with inventory.
- **Semantic colors via tokens** `danger`/`warn`/`safe` (+ `-soft`) in `globals.css`.
- **UI primitives** in `common/components/ui/` (shadcn idiom, `cn()` helper); feature
  widgets in `modules/` compose them.

---

## Design direction (taste-skill)
Apply the [taste-skill](https://github.com/Leonxlnx/taste-skill) philosophy — strong
hierarchy, deliberate typography & spacing, purposeful (not decorative) motion. Soft
light/dark theme; semantic alerts: **red = critical/expired, amber = warn/reorder,
green = safe**. Keep layouts responsive — **no overflow / offside elements**.

> **Do not "generate UI via Gemini/Nano Banana".** Navbars and controls are real React
> components (clickable, responsive, themeable). Image-generated UI is non-functional and
> is explicitly out of scope.

---

## 20 recommended 21st.dev / shadcn components

> React + Tailwind. **Rule: components must do a job, not be decoration.**

### ✅ Integrated (functional — wired)
| # | Component | Where it lives | Job |
|---|-----------|----------------|-----|
| 1 | **Card** | `common/components/ui/card.tsx` | Surface for every widget |
| 2 | **Badge** (status pill) | `common/components/ui/badge.tsx` | Stok Aman / Restock / Kosong, order status |
| 3 | **Button** (variants) | `common/components/ui/button.tsx` | Add to cart, pay, admin actions |
| 4 | **Input** | `common/components/ui/input.tsx` | Buyer name, search |
| 5 | **Qty Stepper** | `common/components/ui/qty-stepper.tsx` | +/- quantity (cards, cart, admin stock) |
| 6 | **Segmented control** | `common/components/ui/segmented.tsx` | Weekly/monthly turnover toggle |
| 7 | **Number Ticker** (Magic UI) | `common/components/ui/number-ticker.tsx` | Animated KPI counts |
| 8 | **Skeleton** | `common/components/ui/skeleton.tsx` | Loading states |
| 9 | **Data Table** (sortable) | `modules/admin/inventory-table.tsx` | Stock management |
| 10 | **Recharts Bar** | `modules/admin/turnover-chart.tsx` | Fast vs slow movers |
| 11 | **Recharts Donut** | `modules/admin/supplier-donut.tsx` | Supplier spend |
| 12 | **Sonner (toast)** | `app/layout.tsx` + flows | Add-to-cart / pay / stock toasts |
| 13 | **Theme toggle** (next-themes) | `modules/layout/theme-toggle.tsx` | Light/dark |
| 14 | **Navbar** | `modules/layout/navbar.tsx` | Cart badge + admin link |
| 15 | **Product Card** | `modules/storefront/product-card.tsx` | Storefront item |

### 🔜 Recommended next (functional — not yet built)
| # | Component | Job it would do |
|---|-----------|-----------------|
| 16 | **Command Menu (⌘K)** | Jump to product / admin section |
| 17 | **Sheet / Drawer** | Slide-over product or order detail |
| 18 | **Dialog** | Confirm delete / order detail modal |
| 19 | **Dropdown Menu** | Per-row admin actions |
| 20 | **Date Range Picker** | Filter orders / KPIs by period |

### 🔶 Use sparingly (only if it signals urgency)
- **Border Beam / Glow Card** — highlight a critical/expired card.
- **Animated Alert Ticker (Marquee)** — running list of out-of-stock items.

### ❌ Skip (pure decoration)
- Spotlight / Sparkles / animated gradient hero — no data value.
