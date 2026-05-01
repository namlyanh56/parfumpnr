# aura. Perfumery Website

Website toko parfum lengkap dengan halaman admin untuk mengelola konten tanpa coding.

## 📁 Struktur File

```
aura-perfumery/
├── index.html      → Homepage utama
├── shop.html       → Halaman toko / semua produk
├── product.html    → Detail produk (dinamis via ?id=)
├── admin.html      → Dashboard admin
├── main.js         → Data, Cart, dan semua logika JS
├── style.css       → Semua styling
└── README.md       → Dokumentasi ini
```

> **Total: 7 file** — clean, no framework, no build tool needed.

---

## 🚀 Cara Pakai

1. **Download semua file** ke satu folder yang sama
2. Buka `index.html` di browser — selesai!
3. Untuk admin, buka `admin.html`
   - Username: `admin`
   - Password: `aura2025`

---

## 🛠️ Fitur Admin Panel

| Panel | Yang Bisa Diedit |
|-------|-----------------|
| **Dashboard** | Statistik produk & preview cepat |
| **Products** | Tambah / edit / hapus produk, harga, gambar, badge, stok |
| **Homepage** | Hero title, subtitle, gambar hero, teks featured & try first, media press |
| **Brand** | Nama brand, announcement bar, teks about, email |
| **Testimonials** | Tambah / edit / hapus review pelanggan |

---

## 🛒 Fitur Website

- **Homepage** — Hero fullscreen, featured banner, tab produk feminine/masculine, press marquee, testimonials, newsletter
- **Shop** — Filter kategori, sorting harga & nama, grid produk
- **Product Detail** — Galeri gambar, fragrance notes dengan emoji, the vibe, the tune, add to cart
- **Cart Sidebar** — Slide-in cart, tambah/hapus item, total harga
- **Toast Notifications** — Feedback saat add to cart
- **Responsive** — Mobile-friendly, hamburger menu

---

## 💾 Penyimpanan Data

Semua data disimpan di **localStorage** browser:
- `aura_data` → konten website (produk, hero, brand, dll)
- `aura_cart` → isi keranjang belanja

Untuk **reset ke default**, masuk admin → klik tombol "Reset to Default".

---

## 🎨 Kustomisasi

### Ganti Warna Brand
Edit variabel di `style.css`:
```css
:root {
  --sage: #5c6b5a;       /* warna hijau sage (aksen utama) */
  --gold: #c8a96e;       /* warna gold (bintang review) */
  --cream: #f5f0e8;      /* background section cream */
}
```

### Ganti Password Admin
Di `admin.html`, cari:
```javascript
if(u==='admin' && p==='aura2025')
```
Ganti `aura2025` dengan password yang kamu inginkan.

### Tambah Produk via Admin
1. Buka `admin.html`
2. Login
3. Klik **Products** → **+ Add Product**
4. Isi semua field, klik **Save Product**

### Upload Gambar
Gunakan URL gambar dari:
- [Unsplash](https://unsplash.com) (gratis)
- [Imgur](https://imgur.com) (upload sendiri)
- Hosting gambar apapun yang accessible via URL

---

## 📦 Deploy ke Internet (Gratis)

### Opsi 1: GitHub Pages
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
# Lalu di GitHub: Settings → Pages → Deploy from main branch
```

### Opsi 2: Netlify (Drag & Drop)
1. Buka [netlify.com](https://netlify.com)
2. Drag folder ke dashboard
3. Selesai — langsung online!

### Opsi 3: Vercel
```bash
npm i -g vercel
vercel
```

---

## ⚠️ Catatan Penting

- Data tersimpan di **browser lokal** — jika buka di browser/perangkat berbeda, data tidak otomatis sync
- Untuk production dengan database sungguhan, perlu backend (Node.js / Firebase / Supabase)
- Gambar dari Unsplash memerlukan koneksi internet

---

© 2025 aura. Perfumery
