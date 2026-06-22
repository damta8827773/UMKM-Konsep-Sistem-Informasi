# 4. Tahap Implementasi Sistem

## 4.a. Lingkungan Implementasi
- **Bahasa:** TypeScript (frontend) · **Aturan keamanan:** Firestore Rules
- **Menjalankan:** `npm install` → isi `.env.local` → `npm run dev` → http://localhost:3000
- **Deploy:** Vercel (frontend) + Firebase (Firestore & Auth)

## 4.b. Studi Kasus: Transaksi di "Warung Bu Sari"

### Skenario 1 — Pembeli belanja & memberi ulasan
1. Pembeli membuka storefront, mencari **"Indomie Goreng"**, mengatur jumlah **3**, lalu
   **Tambah ke keranjang**.
2. Di keranjang menekan **Checkout**, mengisi nama **"Andi"**, memilih **QRIS**, menekan
   **Bayar (dummy)**.
3. Sistem menyimpan **Order** (`status: baru`) ke Firestore.
4. Di layar sukses, Andi memberi **⭐⭐⭐⭐⭐** dan komentar "cepat & rapi" → tersimpan
   sebagai **review** (`type: ulasan`).

### Skenario 2 — Admin memproses pesanan
1. Admin login di URL admin (ter-allowlist email) → membuka **Dashboard**.
2. Pada **Pesanan Masuk**, menekan **Proses (kurangi stok)** untuk order Andi.
3. Stok Indomie berkurang **3**, order menjadi `status: selesai`, KPI **Pendapatan**
   bertambah.

### Skenario 3 — Komplain pelanggan
1. Pembeli lain memilih tab **Komplain**, memberi ⭐⭐ dan menulis "kemasan penyok".
2. Admin melihatnya **real-time** di panel **Ulasan & Komplain** (badge merah "komplain").

## 4.c. Hasil Pengetesan (ringkas)
| Fitur | Uji | Hasil |
|-------|-----|-------|
| Tambah ke keranjang | Klik Tambah | ✅ Jumlah & total benar |
| Checkout dummy | Bayar | ✅ Order tersimpan, status `baru` |
| Ulasan/komplain | Kirim bintang+komentar | ✅ Muncul di admin & rata-rata di kartu |
| Proses pesanan | Klik Proses | ✅ Stok berkurang, status `selesai` |
| Akses admin email lain | Login non-allowlist | ✅ Ditolak (Rules + UI) |

## 4.d. Pemeliharaan (Maintenance)
- Tambah email admin: ubah `NEXT_PUBLIC_ADMIN_EMAILS` di `.env.local` **dan** `firestore.rules`.
- Tambah bahasa: buat `messages/<kode>.ts` + daftarkan di `i18n/config.ts`.
- Ganti foto produk: taruh file di `public/products/` lalu atur `common/libs/category-images.ts`.
