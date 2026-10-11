# 🥞 Martabak Lab ✦ Build Your Own Martabak

> **Proyek UAS — Pengembangan Web Modern**  
> Interactive Food Customization & Self-Checkout Single Page Application (SPA) berbasis **React 19 + Vite + Tailwind CSS v4 + Framer Motion** dengan **100% Pure Procedural Vector SVG Engine**.

---

## 🌐 Live Demo

- **GitHub Pages (`gh-pages` branch)**: [https://r1oon.github.io/martabak-lab/](https://r1oon.github.io/martabak-lab/)
- **Vercel Production**: [https://martabak-lab.vercel.app/](https://martabak-lab.vercel.app/)

---

## ✨ Fitur Utama

1. **Pure Procedural Vector SVG Martabak Engine**:
   - Tampilan *top-down* martabak manis bersarang/berpori dengan *butter gloss* dan pinggiran renyah (*crunchy crust*).
   - Reaktif terhadap **3 Ukuran Loyang** (*Kecil 20cm, Sedang 26cm, Besar 32cm*) dan **5 Varian Adonan** (*Original, Pandan, Red Velvet, Chocolate, Black Charcoal*).
2. **Interaksi Multi-Topping (Drag & Drop + Touch Click-to-Add)**:
   - Sebaran partikel topping menggunakan algoritma *Uniform Circular Rejection Sampling* (Keju Parut, Meises Cokelat, Kacang Sangrai, Remahan Oreo, Pisang Raja, Stroberi Segar, Jagung Manis, Kacang Almond).
   - Olesan saus merata (*Susu Kental Manis, Saus Cokelat Lumer, Saus Karamel, Saus Stroberi, Saus Matcha*) serta taburan *Meises Warna-Warni* & *Keju Flakes*.
3. **Hero Showcase Acak & Transisi Sinematik "Gigit Sampai Habis"**:
   - Fitur **Acak Kreasi 🎲** di halaman depan dan animasi gigitan bertahap (*bite transition*) berkecepatan 60 FPS saat mulai merakit.
4. **Kalkulasi Harga Realtime & Tiket Pesanan**:
   - Rincian harga otomatis terhitung setiap kali ukuran, adonan, topping, atau sentuhan akhir berubah, lengkap dengan simulasi proses memanggang dan tiket nomor pesanan akhir.

---

## 🌿 Struktur Branch Repository

- **`main`**: Berisi *source code* lengkap aplikasi (`src/`, `public/`, `package.json`, `vite.config.js`).
- **`gh-pages`**: Berisi hasil *production build* statis (`index.html` & `assets/`) untuk hosting GitHub Pages.

---

## 🚀 Cara Menjalankan secara Lokal

```bash
cd martabak-lab
npm install
npm run dev
```

Build untuk produksi:
```bash
npm run build
npm run preview
```
