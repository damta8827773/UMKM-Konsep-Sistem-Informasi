# 1. Tahap Investigasi Sistem

## 1.a. Studi Awal (Observasi & Wawancara)

### Observasi
Pengamatan langsung pada warung kelontong UMKM menemukan kondisi berikut:
- Pencatatan stok masih **manual** (buku/ingatan) → sering salah hitung & lupa restock.
- Tidak ada data **barang cepat/lambat laku**, sehingga pembelian ke supplier kurang tepat.
- Tidak ada riwayat **pesanan pelanggan** maupun **masukan/komplain** yang terstruktur.
- Pemilik kesulitan mengetahui **nilai aset stok** dan **pengeluaran ke tiap supplier**.

### Wawancara (ringkasan dengan pemilik warung)
| Pertanyaan | Jawaban / Temuan |
|-----------|------------------|
| Bagaimana mencatat stok? | Manual, kadang tidak update saat ramai |
| Bagaimana tahu barang harus dipesan? | Berdasarkan "kelihatan habis", tidak ada titik reorder |
| Apakah pelanggan bisa memberi masukan? | Belum ada, hanya lisan |
| Apa yang diinginkan? | Tahu stok real-time, barang laku, dan pendapatan |

### Identifikasi Masalah
1. Stok tidak akurat dan tidak real-time.
2. Keputusan restock tidak berbasis data.
3. Tidak ada kanal ulasan/komplain pelanggan.
4. Tidak ada laporan KPI (aset, pendapatan, supplier).

## 1.b. Studi Kelayakan (Feasibility Study)

| Aspek | Analisis | Kelayakan |
|-------|----------|-----------|
| **Teknis** | Memakai Next.js + Firebase (cloud, gratis tier). Tidak perlu server fisik. Skill web tersedia. | ✅ Layak |
| **Operasional** | Antarmuka sederhana (web), bisa diakses dari HP/laptop. Admin cukup 1 akun email. | ✅ Layak |
| **Ekonomi** | Firebase Spark plan **gratis** untuk skala UMKM; hosting murah/gratis (Vercel). | ✅ Layak |
| **Hukum** | Data produk & pesanan milik sendiri; pembayaran masih dummy (prototype). | ✅ Layak |
| **Jadwal** | Dapat dibangun bertahap (storefront → admin → analitik → ulasan). | ✅ Layak |

**Kesimpulan:** Sistem **layak dikembangkan** karena murah, teknis memungkinkan, dan
menyelesaikan masalah nyata UMKM.
