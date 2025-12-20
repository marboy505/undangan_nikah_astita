# Undangan Pernikahan Muhammad Adam R & Dhea Ananda

Website undangan pernikahan digital yang indah dan interaktif untuk Muhammad Adam R & Dhea Ananda. Website ini dibuat dengan HTML, CSS, dan JavaScript murni dengan berbagai fitur modern seperti countdown timer, galeri foto, formulir konfirmasi kehadiran, dan sistem ucapan tamu.

## Fitur

- **Loader Pembuka**: Animasi pembuka yang indah saat halaman dimuat
- **Musik Latar**: Musik pengiring yang bisa dihidupkan/matikan
- **Countdown Timer**: Penghitung mundur ke hari pernikahan
- **Tentang Pasangan**: Bagian yang menceritakan kisah cinta pasangan
- **Detail Acara**: Informasi lengkap tentang tanggal, waktu, dan lokasi
- **Galeri Foto**: Slide galeri foto dengan navigasi otomatis
- **Form Konfirmasi Kehadiran**: Form untuk tamu mengonfirmasi kehadiran
- **Sistem Ucapan & Doa**: Tempat untuk tamu meninggalkan ucapan dan doa
- **Desain Responsif**: Tampilan yang indah di semua perangkat
- **Animasi Scroll**: Efek animasi saat pengguna menggulir halaman

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan animasi dan efek transisi)
- JavaScript (tanpa framework eksternal)
- Font Google: Playfair Display dan Poppins
- Font Awesome untuk ikon
- AOS (Animate On Scroll) Library

## Struktur File

- `index.html`: Halaman utama website
- `style.css`: File CSS untuk styling dan animasi
- `script.js`: Fungsi utama JavaScript
- `enhanced_gallery.js`: Fungsi tambahan untuk galeri foto
- `images/`: Folder berisi gambar-gambar untuk website
- `music/`: Folder berisi file musik latar

## Live Demo

🌐 Website dapat diakses di: [https://marboy505.github.io/udangan_nikah/](https://marboy505.github.io/udangan_nikah/)

## Cara Menjalankan di Lokal

1. Clone repository ini:
   ```bash
   git clone https://github.com/marboy505/udangan_nikah.git
   cd udangan_nikah
   ```

2. Buka file `index.html` di browser Anda
   - Double-click file `index.html`, atau
   - Gunakan Live Server di VS Code untuk pengalaman yang lebih baik

## Cara Customize untuk Undangan Anda

### 1. Ubah Informasi Pasangan

Edit file `index.html`:
- **Line 6**: Ubah nama pasangan di `<title>`
- **Line 51**: Ubah nama pasangan di heading utama
- **Line 98-104**: Ubah foto dan info mempelai wanita
- **Line 112-118**: Ubah foto dan info mempelai pria
- **Line 124-125**: Ubah cerita pasangan

### 2. Ubah Tanggal & Waktu Pernikahan

Edit file `script.js`:
- **Line 39**: Ubah tanggal pernikahan di `const weddingDate`

Edit file `index.html`:
- **Line 139**: Ubah tanggal acara
- **Line 145**: Ubah waktu akad
- **Line 171**: Ubah waktu resepsi

### 3. Ubah Lokasi Acara

Edit file `index.html`:
- **Line 150-157**: Ganti embed Google Maps dengan lokasi Anda
  - Buka Google Maps
  - Cari lokasi acara
  - Klik "Share" > "Embed a map"
  - Copy kode iframe dan paste di line 150
- **Line 158**: Ubah alamat lokasi
- **Line 165**: Ubah lokasi akad

Edit file `script.js`:
- **Line 265**: Ubah URL Google Maps

### 4. Ganti Foto

Ganti file di folder `images/`:
- `bride.jpg`: Foto mempelai wanita
- `groom.jpg`: Foto mempelai pria
- `gallery1.jpg`, `gallery2.jpg`, dll: Foto galeri
- Atau upload foto screenshot yang sudah ada

### 5. Ganti Musik Background

- Ganti file `music/background-music.mp3` dengan lagu pilihan Anda
- Format yang didukung: MP3, WAV, OGG

### 6. Ubah Nomor Kontak

Edit file `index.html`:
- **Line 220-221**: Ubah nomor WhatsApp untuk konfirmasi

## Deploy ke GitHub Pages

1. Push repository ke GitHub (sudah selesai ✅)

2. Aktifkan GitHub Pages:
   - Buka https://github.com/marboy505/udangan_nikah
   - Klik tab **Settings**
   - Klik **Pages** di menu kiri
   - Di **Source**, pilih branch **main** dan folder **/ (root)**
   - Klik **Save**

3. Tunggu 2-5 menit, website akan live di:
   `https://marboy505.github.io/udangan_nikah/`

## Deploy ke Platform Lain

Website ini juga bisa di-deploy ke:
- **Netlify**: Drag & drop folder project
- **Vercel**: Import dari GitHub
- **Firebase Hosting**: Gunakan Firebase CLI
- **000webhost / Hosting Gratis lainnya**: Upload via FTP

## Fitur Penting

### RSVP & Ucapan
- Data RSVP dan ucapan tersimpan di `localStorage` browser
- Untuk production, sebaiknya integrasikan dengan:
  - Google Sheets API
  - Firebase Firestore
  - Backend API sendiri

### SEO & Sharing
Tambahkan meta tags di `<head>` untuk sharing yang lebih baik:
```html
<meta property="og:title" content="Undangan Pernikahan - Nama Pasangan">
<meta property="og:description" content="Kami mengundang Anda...">
<meta property="og:image" content="URL_GAMBAR_UNTUK_PREVIEW">
```

## Troubleshooting

**Musik tidak autoplay?**
- Browser modern memblok autoplay
- User perlu klik icon musik untuk memulai

**Countdown tidak akurat?**
- Pastikan format tanggal di `script.js` benar: `'Month DD, YYYY HH:MM:SS'`

**Google Maps tidak muncul?**
- Pastikan iframe embed code sudah benar
- Periksa koneksi internet

## Support

Jika ada pertanyaan atau masalah, bisa hubungi:
- Email: [your-email@example.com]
- WhatsApp: [nomor-whatsapp]

## Hak Cipta dan Lisensi

Desain dan kode ini dibuat untuk keperluan pribadi. Silakan sesuaikan dengan kebutuhan Anda.

© 2025 Muhammad Adam R & Dhea Ananda. Dengan penuh cinta.