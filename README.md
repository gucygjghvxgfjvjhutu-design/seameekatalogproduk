# SeaMee Website Katalog

Website statis (HTML, CSS, JavaScript), tanpa backend. Cukup buka `index.html` di browser,
atau unggah seluruh folder ke hosting statis (Netlify, GitHub Pages, Vercel, hosting biasa).

## Struktur berkas

| Berkas | Isi |
| --- | --- |
| index.html | Landing page (hero, info produk, cara penyajian ringkas, ajakan) |
| produk.html | Galeri foto, detail, harga, jumlah pesanan, komposisi, penyimpanan |
| cerita-kami.html | Brand story dan Tentang Kami |
| cara-penyajian.html | Empat langkah penyajian dan informasi penyimpanan |
| faq.html | Pertanyaan umum (accordion) |
| pesan.html | Ajakan pemesanan dan tiga langkah cara memesan |
| assets/css/style.css | Gaya tambahan (tombol, animasi, aksesibilitas) |
| assets/js/config.js | Tautan WhatsApp, Instagram, harga |
| assets/js/main.js | Interaksi: menu, galeri, FAQ, jumlah pesanan, animasi |
| assets/css/tailwind.css | CSS hasil kompilasi Tailwind |
| assets/js/icons.js | Ikon SVG inline |
| _build/ | Konfigurasi untuk membangun ulang CSS |
| assets/img/ | Logo, kemasan depan dan belakang, mi kering, mi siap saji (WebP) |

## Mengubah kontak

Buka `assets/js/config.js`.

1. `WA`: tautan WhatsApp. Saat ini tautan grup.
2. `WANUM`: isi nomor WhatsApp Business (contoh `6281234567890`) agar tombol membuka chat langsung dengan pesan otomatis.
3. `IG`: tautan profil Instagram. Teks `@f4dryn` di footer ada di tiap berkas HTML, cari dan ganti jika akun berubah.

## Mengubah harga

Ubah `PRICE` di `config.js` untuk perhitungan di tombol pesan, dan cari `Rp13.000` di berkas HTML untuk teks yang tampil.

## Catatan produksi

1. CSS Tailwind sudah dikompilasi ke `assets/css/tailwind.css`, jadi situs tidak bergantung pada CDN. Ikon memakai SVG inline (`assets/js/icons.js`). Hanya font Anton dan Plus Jakarta Sans yang dimuat dari Google Fonts, dengan font cadangan jika gagal dimuat.
2. Jika Anda menambah atau mengubah kelas Tailwind di HTML, bangun ulang CSS dari folder `_build`: `npm i tailwindcss@3.4.17` lalu `npx tailwindcss -c tailwind.config.js -i in.css -o ../assets/css/tailwind.css --minify`.
3. Foto kemasan bertuliskan 250gr, sedangkan data produk 75 gram. Samakan sebelum rilis.
4. Masa simpan, izin edar, dan klaim kesehatan sengaja tidak dicantumkan karena belum terverifikasi.
