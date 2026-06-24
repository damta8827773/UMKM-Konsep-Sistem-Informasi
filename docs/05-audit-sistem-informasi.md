# 5. Audit Sistem Informasi

## 5.1. Terminologi Audit Sistem Informasi
**Audit Sistem Informasi (SI)** adalah proses pengumpulan & evaluasi bukti untuk menentukan
apakah sistem informasi telah:
- **menjaga aset** (data & infrastruktur),
- **memelihara integritas data**,
- **mencapai tujuan organisasi secara efektif**, dan
- **menggunakan sumber daya secara efisien**.

## 5.2. Tujuan Audit Sistem Informasi
1. **Availability** - sistem tersedia saat dibutuhkan (storefront & dashboard online).
2. **Confidentiality** - data sensitif (pesanan) hanya diakses pihak berwenang.
3. **Integrity** - data stok/pesanan akurat dan tidak diubah pihak tak sah.
4. **Effectiveness & Efficiency** - sistem mendukung tujuan UMKM dengan sumber daya minimal.
5. **Compliance** - sesuai kebijakan & aturan yang berlaku.

## 5.3. Proses Audit Sistem Informasi

### a) Berbasis Risiko (Risk-Based)
| Risiko | Dampak | Kontrol pada Warung Analytics |
|--------|--------|-------------------------------|
| Akses tidak sah ke data | Tinggi | Firebase Auth + **allowlist email** + Firestore Rules |
| Manipulasi stok oleh non-admin | Tinggi | `allow write: if isAdmin()` pada Rules |
| Kebocoran kredensial | Sedang | Key di `.env.local` (gitignore); rotasi kunci |
| Kehilangan data | Sedang | Firestore terkelola Google (replikasi, backup) |

### b) Berbasis Kendali (Control-Based)
Mengacu kerangka pengendalian mutu/keamanan:
- **ISO 9001:2000 (PWFS - Process, Work Flow, Standard):** prosedur baku (mis. alur proses
  pesanan & restock terdokumentasi pada [Perancangan](./03-perancangan-sistem.md)).

### c) Berbasis Komputer (Computer-Based / Frameworks)
| Kerangka | Fokus | Penerapan / Relevansi |
|----------|-------|------------------------|
| **COSO** | Pengendalian internal (5 komponen) | Lingkungan kontrol = pemisahan peran pembeli vs admin |
| **COBIT** | Tata kelola & manajemen TI | Kontrol akses, manajemen perubahan (lihat Maintenance) |
| **SARBOX (Sarbanes-Oxley)** | Akurasi pelaporan keuangan | KPI pendapatan dihitung dari data transaksi yang valid |
| **ISO 17799 / 27002** | Manajemen keamanan informasi | Rules, enkripsi transport (HTTPS), kontrol akses |
| **BASEL II** | Manajemen risiko (sektor perbankan) | Acuan prinsip manajemen risiko operasional |

## 5.4. Contoh Soal / Studi Kasus Audit

> **Studi Kasus:** Auditor menemukan bahwa siapa pun yang memiliki tautan dapat mengubah
> stok produk pada versi awal sistem.
>
> **Pertanyaan:** Termasuk pelanggaran prinsip audit apa, dan kontrol apa yang harus
> diterapkan?
>
> **Jawaban:** Pelanggaran **Integrity** & **Confidentiality** (akses tidak sah).
> Kontrol: terapkan **Firestore Security Rules** `allow write: if isAdmin()` dan
> **allowlist email** - sehingga hanya admin terverifikasi yang dapat menulis data
> (kontrol berbasis akses, sesuai COBIT & ISO 27002).

### Checklist Audit (ringkas)
- [x] Otentikasi pengguna admin (Google + allowlist)
- [x] Otorisasi tertulis di Firestore Rules (bukan hanya UI)
- [x] Kredensial tidak ter-commit (`.env.local` di-ignore)
- [x] Transport aman (HTTPS)
- [x] Validasi input (rating 1-5, status order, total ≥ 0) di Rules
