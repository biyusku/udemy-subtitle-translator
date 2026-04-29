# 🎓 Penerjemah Subtitle Langsung Udemy

<div align="center">

![Ekstensi Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Lisensi: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Versi](https://img.shields.io/badge/version-0.2.0-blue)

**Terjemahkan subtitle dan transkrip Udemy ke bahasa apa pun — langsung di atas video.**

[← README Utama](../README.md)

</div>

---

## 📸 Tangkapan Layar

<div align="center">

| Pengaturan Awal | Panel Pengaturan |
|:---:|:---:|
| ![Pengaturan Awal](../screenshots/popup-onboarding.png) | ![Pengaturan](../screenshots/popup-settings.png) |

</div>

---

## ✨ Fitur

- 🌍 **Dukungan multibahasa** — pilih dari bahasa yang tersedia atau masukkan kode ISO/BCP47 kustom
- 🧠 **Deteksi sumber cerdas** — membaca dari `video.textTracks`, DOM subtitle, atau panel transkrip
- 🖥️ **Siap layar penuh** — cache transkrip menjaga terjemahan tetap aktif
- 👁️ **Sembunyikan subtitle asli** — tampilkan hanya lapisan terjemahan
- ⚡ **Cache terjemahan** — baris yang berulang disajikan seketika tanpa permintaan baru
- 🔌 **Dua penyedia** — Google GTX (tanpa konfigurasi) atau server LibreTranslate Anda sendiri
- 🎯 **Panduan pertama kali** — satu pertanyaan untuk mengatur bahasa default
- 🛠️ **Tanpa langkah build** — JS murni, dimuat langsung

---

## 🚀 Instalasi

### Mode Pengembang (manual)

1. Clone atau unduh repositori ini sebagai ZIP
2. Buka **`chrome://extensions`** di Chrome
3. Aktifkan **Mode pengembang** (kanan atas)
4. Klik **Muat ekstensi yang tidak dipaketkan**
5. Pilih folder **`extension/`**

> Versi Chrome Web Store segera hadir.

---

## 🔧 Cara Kerja

```
Halaman kuliah Udemy
       │
       ▼
 Skrip Konten  (content.js)
   Mendeteksi teks subtitle aktif
       │
       ▼
 Worker Latar Belakang  (background.js)
   Menerjemahkan lewat penyedia yang dipilih
   Menyimpan baris berulang di cache
       │
       ▼
 Lapisan ditambahkan di atas video
```

---

## 🌐 Penyedia Terjemahan

| Penyedia | Pengaturan | Catatan |
|---|---|---|
| **Google GTX** | Tidak ada | Default. Tidak perlu API key. |
| **LibreTranslate** | URL Endpoint | Server sendiri atau publik. Kontrol privasi penuh. |

---

## 🎛️ Penggunaan

1. Buka halaman kuliah Udemy mana pun
2. Klik ikon ekstensi di toolbar
3. Saat pertama kali — pilih bahasa Anda
4. Aktifkan subtitle video atau buka panel transkrip
5. Pastikan **Ekstensi aktif** menyala
6. Subtitle terjemahan muncul di atas video

---

## ⚠️ Keterbatasan

- Hanya bekerja dengan kursus yang sudah memiliki subtitle atau transkrip
- Tidak melakukan konversi ucapan ke teks secara langsung
- Kualitas terjemahan bergantung pada penyedia dan pasangan bahasa

---

## 🔒 Privasi

Ekstensi ini mungkin mengirimkan teks subtitle ke penyedia terjemahan yang dipilih. Tidak ada riwayat penelusuran, data pribadi, atau kredensial Udemy yang dikumpulkan.

Baca [PRIVACY.md](../PRIVACY.md) untuk detail lengkap.

---

## 📄 Lisensi

[MIT](../LICENSE) © 2026