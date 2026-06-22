# 3. Tahap Perancangan Sistem

## 3.a. Rancangan & Spesifikasi Teknis

### Arsitektur
```mermaid
flowchart TB
    subgraph Client[Browser]
        UI[Next.js App Router + React + Tailwind]
    end
    subgraph Firebase[Google Firebase]
        AUTH[Authentication - Google]
        FS[(Firestore: products, orders, reviews)]
        RULES{{Firestore Security Rules}}
    end
    UI -->|sign-in| AUTH
    UI -->|read/write| RULES --> FS
    AUTH -. token email .- RULES
```

### Spesifikasi Teknis
| Komponen | Teknologi |
|----------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend / DB | Firebase Firestore (NoSQL, real-time) |
| Autentikasi | Firebase Auth (Google) + allowlist email admin |
| Grafik | Recharts |
| Keamanan | Firestore Rules (batas otorisasi), security headers |
| i18n | Indonesia & Inggris (skalabel) |

## 3.b. Flowchart Proses

### Alur Pembelian (Pembeli)
```mermaid
flowchart TD
    A([Mulai]) --> B[Buka Storefront]
    B --> C[Cari / filter produk]
    C --> D[Atur jumlah & Tambah ke keranjang]
    D --> E{Lanjut belanja?}
    E -- Ya --> C
    E -- Tidak --> F[Buka Keranjang]
    F --> G[Checkout: isi nama & metode bayar]
    G --> H[(Simpan Order ke Firestore - status: baru)]
    H --> I[Beri Ulasan / Komplain produk]
    I --> J([Selesai])
```

### Alur Proses Pesanan & Stok (Admin)
```mermaid
flowchart TD
    A([Login Admin]) --> B{Email ter-allowlist?}
    B -- Tidak --> X[Akses Ditolak]
    B -- Ya --> C[Dashboard Admin]
    C --> D[Lihat Pesanan Masuk]
    D --> E{Proses pesanan?}
    E -- Ya --> F[Kurangi stok tiap item]
    F --> G[(Update Order - status: selesai)]
    E -- Batal --> H[(Order - status: batal)]
    C --> I[Kelola stok / tambah / hapus produk]
    C --> J[Lihat KPI, grafik, ulasan & komplain]
```

## 3.c. Rancangan Basis Data (Struktur Firestore)

```mermaid
erDiagram
    PRODUCTS ||--o{ ORDER_ITEMS : "dibeli dalam"
    PRODUCTS ||--o{ REVIEWS : "diulas pada"
    ORDERS ||--|{ ORDER_ITEMS : "berisi"

    PRODUCTS {
        string id PK
        string name
        string sku
        string category
        int stock
        int reorderPoint
        int price
        string supplier
    }
    ORDERS {
        string id PK
        array items
        int total
        string status
        string buyerName
        number createdAt
    }
    REVIEWS {
        string id PK
        string productId FK
        string productName
        int rating
        string comment
        string type
        number createdAt
    }
```

**Koleksi Firestore:** `products`, `orders`, `reviews`. Status pesanan: `baru → diproses
→ selesai / batal`. Jenis ulasan: `ulasan` (bintang) & `komplain`.

## 3.d. Pembuatan & Pengetesan Program
- UI dibangun sebagai komponen React (shadcn idiom) + diuji lewat `next build` (type-check).
- Prototipe interaktif dapat dirancang di **Figma** (wireframe storefront & dashboard)
  sebelum implementasi kode.
