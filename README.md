# 🛒 Warung Analytics — Storefront + Admin (Next.js + Firebase)

A single full-stack Next.js app for a grocery store ("Warung Kelontong"):

- **Buyer side** — public storefront: browse products, adjust quantity, cart, and a
  **dummy checkout** (prototype — no real money).
- **Admin side** — Google login **restricted to one email**; manage stock (+/−), process
  orders (auto-deducts stock), and a BI dashboard (KPIs, turnover, supplier spend).

Data & auth run on **Firebase** (Firestore + Auth). No hand-written `.html`/`.js`/`.css`
pages — everything is `.ts`/`.tsx` + Tailwind. The only `.css` is `app/globals.css`
(design tokens), the conventional Tailwind entry.

---

## 🔐 SECURITY — read first

1. **Rotate the keys you shared in chat.** The Firebase + Gemini keys posted earlier are
   considered burned. Regenerate them (Firebase Console / Google AI Studio) before use.
2. Keys live **only in `.env.local`** (gitignored). Nothing is hardcoded in source.
3. The real access control is **`firestore.rules`** — not the client. Only
   `damtafaiz@gmail.com` can write products/read orders. Deploy it:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Firebase web `apiKey` is safe to be public (security = rules). The **Gemini** key is
   server-only — never prefix it with `NEXT_PUBLIC_`.

---

## 🏗️ Structure (damtaweb-style, single app)

```
sj/
├── app/                     # routes (App Router)
│   ├── page.tsx             # storefront (buyer home)
│   ├── cart/ · checkout/    # buyer cart + dummy checkout
│   └── admin/               # admin dashboard + login (guarded)
├── modules/                 # feature UIs
│   ├── layout/  storefront/  cart/  checkout/  auth/  admin/
├── services/                # data layer
│   ├── firebase/            # client init + auth
│   ├── products.ts orders.ts metrics.ts seed-data.ts
├── contexts/                # auth + cart providers
├── hooks/                   # use-products, use-orders
├── common/                  # ui primitives, libs, types, constants
├── middleware.ts            # edge headers (/admin)
└── firestore.rules          # the real security boundary
```

---

## 🚀 Run

```bash
npm install
cp .env.local.example .env.local      # fill with your ROTATED Firebase keys
npm run dev                           # http://localhost:3000
```

In Firebase Console: enable **Authentication → Google**, create a **Firestore** database,
and deploy `firestore.rules`. Then open the app, go to **/admin**, log in with the admin
Google account, and click **“Isi produk contoh”** to seed the catalog.

---

## 🔄 How the flows work

**Buyer:** storefront → adjust qty → add to cart (saved in localStorage) → cart page
(+/−, remove) → checkout (pick dummy payment) → an **order** is written to Firestore
with status `baru`.

**Admin:** dashboard shows live KPIs + orders. Pressing **“Proses”** on an order deducts
each item’s stock (admin-only write) and marks it `selesai`. Stock is **never** mutated by
buyers — that’s enforced by Firestore Rules, so there’s no way to tamper with inventory
from the storefront.

---

## 🧰 Stack
Next.js 14 · React 18 · TypeScript · Tailwind · Recharts · Firebase (Firestore + Auth) ·
shadcn-style primitives · Sonner · next-themes.

> **Gemini / Nano Banana note:** UI here is built as real React components, not generated
> images — buttons must be clickable, responsive, and themeable. An AI-generated image
> navbar would be non-functional, which this project explicitly avoids.
