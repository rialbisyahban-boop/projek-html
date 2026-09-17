<img src="assets.jpeg" alt="Foto Profil" align="right" width="150" height="150" style="border-radius: 50%; object-fit: cover;" />

# **RIALBI SYAHBAN ZUHDI NASUTION**
## Rstream 

# Rstream ID

**Rstream ID** adalah sebuah website pemutar film dan trailer interaktif yang dibuat untuk membantu pengguna menjelajahi, mencari, dan menikmati koleksi film favorit secara online.

---

## Penjelasan

**Rstream ID** dibangun menggunakan **HTML, CSS, dan JavaScript** serta terintegrasi langsung dengan **TMDB (The Movie Database) API** untuk menyajikan katalog film dan *trailer* secara *real-time*. Website ini dilengkapi antarmuka bertema gelap (*dark mode*) yang responsif serta berbagai fitur navigasi seperti halaman beranda, koleksi video, pencarian (teks & suara), profil pengguna, hingga histori tontonan.

---

## Fitur Utama

- 🏠 **Halaman Beranda** — menampilkan katalog film pilihan dan *embedded video player*
- 🔍 **Search & Voice Search** — pencarian film berdasarkan judul serta fitur pencarian suara menggunakan mikrofon
- 🔐 **Autentikasi Pengguna** — fitur login dan pendaftaran akun yang tersimpan di *LocalStorage*
- 👤 **Halaman Anda & Histori** — melihat informasi profil serta riwayat film yang pernah ditonton
- 📥 **Halaman Download** — katalog mengelola daftar video yang diunduh
- 📱 **Responsive Design** — tampilan fleksibel untuk desktop maupun mobile (dilengkapi *bottom navigation bar* di ponsel)

---

## Struktur Proyek

``text
projekan-html-rialbi-syahban-zuhdi-nasution/
├── index.html               # Halaman utama (beranda & player)
├── html/
│   ├── anda.html            # Halaman profil & histori tontonan
│   └── download.html        # Halaman daftar video didownload
├── css/
│   ├── style.css            # Styling dasar
│   ├── navbar.css           # Styling navigasi atas
│   ├── sidebar.css          # Styling navigasi samping/bawah
│   ├── home.css             # Styling grid video & kartu film
│   ├── player.css           # Styling pemutar video
│   ├── auth.css             # Styling tombol & dropdown login
│   └── anda.css             # Styling halaman profil
├── js/
│   ├── config.js            # Konfigurasi TMDB API & LocalStorage
│   ├── home.js              # Logika render koleksi film
│   ├── player.js            # Logika pemutar video
│   ├── navigation.js        # Logika dropdown profil & UI state
│   ├── auth.js              # Logika login & logout
│   ├── voice.js             # Logika pencarian suara (Web Speech API)
│   ├── anda.js              # Logika halaman profil & histori
│   └── download.js          # Logika halaman download
└── asset.png                # Gambar logo/profil 


## Cara Menjalankan Proyek
Clone repositori ini:

Bash
git clone [https://github.com/Rialbi-Syahban/projekan-html-rialbi-syahban-zuhdi-nasution.git](https://github.com/username/projekan-html-rialbi-syahban-zuhdi-nasution.git)

Buka folder proyek.

Jalankan file index.html menggunakan browser atau ekstensi Live Server di VS Code agar pengambilan data dari TMDB API berjalan dengan lancar.

##  Penulis
Rialbi Syahban Zuhdi Nasution