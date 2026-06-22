// ─────────────────────────────────────────────────────────────
//  📸  FOTO PRODUK PER KATEGORI
//
//  Ganti path di bawah dengan foto ASLI milikmu:
//   1) taruh file gambar di folder  public/products/  (mis. minuman.jpg)
//   2) ubah path-nya di sini, mis:  Minuman: "/products/minuman.jpg"
//
//  Default menunjuk ke placeholder .svg berdesain. Jika file tidak ada / gagal
//  dimuat, kartu produk otomatis menampilkan ikon yang cocok dengan namanya.
// ─────────────────────────────────────────────────────────────
export const CATEGORY_IMAGE: Record<string, string> = {
  Sembako: "/products/sembako.svg",
  "Makanan Instan": "/products/makanan-instan.svg",
  Minuman: "/products/minuman.svg",
  Bumbu: "/products/bumbu.svg",
  "Kebutuhan Rumah": "/products/kebutuhan-rumah.svg",
  Snack: "/products/snack.svg",
  Lainnya: "/products/lainnya.svg",
};

export function categoryImage(category?: string): string {
  return (category && CATEGORY_IMAGE[category]) || "";
}
