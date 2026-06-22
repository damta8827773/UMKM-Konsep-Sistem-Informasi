<div align="center">

# 🛒 Warung Analytics

**Storefront + Admin Inventory System for a grocery store ("Warung Kelontong")**

A single full-stack **Next.js 14** app with a **Firebase** backend — a public buyer
storefront and an email-gated admin dashboard for inventory, orders & analytics.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-ffca28?logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ Features

### 🏪 Buyer (storefront — public)
- Browse a catalog of up to **1.000 UMKM products** with category-matching icons
- **Search** + **category filter** + **pagination** (load more)
- **Quantity stepper**, persistent **cart** (localStorage)
- **Dummy checkout** (QRIS / transfer / COD) — prototype only, no real money

### 🛠️ Admin (email-gated dashboard)
- Google sign-in restricted to **one allowed email** (everyone else is blocked)
- **KPI cards** (asset value, revenue, new orders, stockouts) with animated counters
- **Recharts**: product turnover (fast vs slow) + supplier spend donut
- **Stock management** — adjust stock ±, delete, **add 1.000 sample products**, clear all
- **Order processing** — mark an order done → stock deducts automatically

### 🌐 Platform
- **Light / dark** theme · **i18n** (Indonesian + English, scalable to 25 locales)
- Clean **shadcn-style** UI components · responsive, no overflow
- **Firestore Security Rules** as the real authorization boundary

---

## 🧰 Tech stack

| Layer        | Technology                                             |
|--------------|--------------------------------------------------------|
| Framework    | Next.js 14 (App Router) · React 18 · TypeScript         |
| Styling      | Tailwind CSS · CSS variables (design tokens)            |
| Backend      | Firebase **Firestore** (data) + **Auth** (Google login) |
| Charts       | Recharts                                                |
| UX           | next-themes · Sonner (toasts) · lucide-react icons      |

---

## 📁 Project structure

```
.
├── app/                  # routes (App Router): storefront, /cart, /checkout, /admin
├── common/               # UI primitives, libs, types, constants
├── contexts/             # Auth & Cart providers
├── hooks/                # useProducts, useOrders
├── i18n/                 # locale config + provider (t())
├── messages/             # id.ts (source of truth) + en.ts
├── modules/              # feature widgets (storefront, cart, checkout, admin, layout, auth)
├── services/             # firebase client, products, orders, metrics, catalog generator
├── middleware.ts         # security headers / admin matcher
└── firestore.rules       # authorization boundary (deploy to Firebase)
```

---

## 🚀 Getting started (local)

> Requires **Node.js 18+**.

```bash
# 1. install dependencies
npm install

# 2. configure environment
cp .env.local.example .env.local
#    then fill the NEXT_PUBLIC_FIREBASE_* values from your Firebase project

# 3. run the dev server
npm run dev
```

Open **http://localhost:3000**.

### 🔥 Firebase setup (one-time)
In the [Firebase Console](https://console.firebase.google.com) for your project:
1. **Authentication → Sign-in method →** enable **Google**.
2. **Firestore Database →** create a database (production mode).
3. **Firestore → Rules →** paste the contents of [`firestore.rules`](./firestore.rules) and **Publish**.
4. In the app: open **Admin** (footer link) → sign in with the allowed email →
   **“Tambah semua (1000)”** to seed the catalog.

> The admin email is set via `NEXT_PUBLIC_ADMIN_EMAIL` and enforced by the rules.

---

## 🔐 Security notes
- **No secrets in source** — all config comes from `.env.local` (gitignored).
- `NEXT_PUBLIC_FIREBASE_*` values are safe to expose; **Firestore Rules** are the real gate.
- Any **server-only** key (e.g. Gemini) must **not** use the `NEXT_PUBLIC_` prefix.
- Client-side admin checks are UX only — `firestore.rules` is authoritative.

---

## 📜 Scripts

| Command          | Description                          |
|------------------|--------------------------------------|
| `npm run dev`    | Start the dev server (port 3000)     |
| `npm run build`  | Production build                     |
| `npm run start`  | Run the production build             |
| `npm run lint`   | Lint                                 |

---

## 📚 Dokumentasi (Tugas Sistem Informasi)
Analisis & perancangan lengkap (SDLC + Audit SI) ada di folder [`docs/`](./docs):
Investigasi · Analisis (Rich Picture, SWOT, PIECES, Fishbone) · Perancangan (Flowchart,
ERD) · Implementasi · Audit SI (COSO, COBIT, ISO).

## 📄 License
MIT © Damta Noviyan Muhamad Faiz
