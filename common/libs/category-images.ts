// -------------------------------------------------------------
//  📸  FOTO PRODUK PER KATEGORI  (file lokal di /assets/img)
//
//  Ganti path di bawah dengan foto ASLI milikmu:
//   1) taruh file gambar di folder  public/assets/img/  (mis. minuman.jpg)
//   2) ubah path-nya di sini, mis:  Minuman: "/assets/img/minuman.jpg"
//
//  Untuk foto per PRODUK, taruh di public/assets/img/products/ lalu set field
//  `image` produk = "/assets/img/products/namafile.jpg".
//
//  Default menunjuk ke placeholder .svg berdesain. Jika file tidak ada / gagal
//  dimuat, kartu produk otomatis menampilkan ikon yang cocok dengan namanya.
// -------------------------------------------------------------
export const CATEGORY_IMAGE: Record<string, string> = {
  Sembako: "/assets/img/sembako.svg",
  "Makanan Instan": "/assets/img/makanan-instan.svg",
  Minuman: "/assets/img/minuman.svg",
  Bumbu: "/assets/img/bumbu.svg",
  "Kebutuhan Rumah": "/assets/img/kebutuhan-rumah.svg",
  Snack: "/assets/img/snack.svg",
  Lainnya: "/assets/img/lainnya.svg",
};

export function categoryImage(category?: string): string {
  return (category && CATEGORY_IMAGE[category]) || "";
}
