FOTO PRODUK  (/assets/img)
==========================

File .svg di folder ini = placeholder berdesain per kategori
(dipakai bila foto pencarian gagal dimuat).

A) Ganti foto PER KATEGORI:
   1. Taruh gambarmu di folder ini, contoh: minuman.jpg
   2. Buka  common/libs/category-images.ts
   3. Ubah path kategori, contoh:  Minuman: "/assets/img/minuman.jpg"

B) Foto PER PRODUK (paling akurat):
   1. Taruh gambar di  public/assets/img/products/  (contoh: beras-topikoki-5kg.jpg)
   2. Set field `image` produk di Firestore = "/assets/img/products/beras-topikoki-5kg.jpg"

Urutan tampil: image produk -> foto pencarian web -> placeholder kategori -> ikon.
