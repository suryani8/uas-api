# 🍳 ResepKu

Aplikasi web untuk mencari, menyimpan, dan menemukan resep masakan berdasarkan bahan.

## 👤 Identitas Mahasiswa

| Nama | NIM |
|------|-----|
| Suryani | 2307015 |

## 📖 Deskripsi Aplikasi

ResepKu adalah aplikasi web berbasis fullstack yang memungkinkan pengguna untuk:
- 🔍 **Mencari Resep** - Temukan ribuan resep dari seluruh dunia dengan mudah.
- ⭐ **Simpan Favorit** - Simpan resep favorit ke koleksi pribadi serta beri catatan dan penilaian.
- 🥕 **Cari Berdasarkan Bahan** - Input bahan yang tersedia, temukan resep yang cocok.

## 🛠 Teknologi yang Digunakan

### Frontend
- **Next.js** - React Framework dengan App Router.
- **Tailwind CSS** - Utility-first CSS framework untuk styling.
- **React Query (TanStack Query)** - Manajemen data fetching & caching.
- **Zustand** - State management yang ringan.
- **React Hot Toast** - Sistem notifikasi user interface.
- **React Icons** - Library icon yang lengkap.

### Backend
- **Node.js** - JavaScript Runtime.
- **Express.js** - Web Framework untuk pembuatan API.
- **Prisma** - ORM (Object-Relational Mapping) untuk akses database.
- **MySQL** - Database relasional untuk menyimpan data pengguna dan resep.
- **JWT** - Autentikasi menggunakan Access Token & Refresh Token.
- **Bcrypt** - Hashing password untuk keamanan akun.

### External API
- **TheMealDB API** - Sumber data utama untuk resep masakan.

## ⚙ Cara Instalasi

Pastikan kamu sudah menginstal Node.js (v18+), MySQL Server, dan Git di perangkatmu.

### 1. Clone Repository

```bash
git clone https://github.com/[username]/uas-api.git
cd uas-api
```

### 2. Setup Backend

1. Masuk ke folder backend:

```bash
cd backend
```

2. Instal dependensi:

```bash
npm install
```

3. Konfigurasi Environment: Buat file `.env` dan sesuaikan dengan database MySQL kamu:

```
DATABASE_URL="mysql://root:password@localhost:3306/resepku_db"
JWT_SECRET="rahasia_super_kuat"
JWT_REFRESH_SECRET="refresh_token_rahasia"
CLIENT_URL="http://localhost:3000"
PORT=5000
```

4. Jalankan migrasi Prisma:

```bash
npx prisma migrate dev
```

5. Jalankan server:

```bash
npm run dev
```

### 3. Setup Frontend

1. Buka terminal baru dan masuk ke folder frontend:

```bash
cd frontend
```

2. Instal dependensi:

```bash
npm install
```

## 🚀 Cara Menjalankan Aplikasi

Aplikasi berjalan pada alamat berikut:

- **Frontend:** http://localhost:3000

Jalankan aplikasi dengan membuka terminal di folder frontend:

```bash
npm run dev
```

- **Backend API:** http://localhost:5000

Jalankan aplikasi aplikasi dengan membuka terminal di folder backend:

```bash
npm run dev
```
## Tangkapan Layar Aplikasi

### 1. Halaman Login
![Halaman Login](./tampilanWeb/login.png)

### 2. Halaman Register
![Halaman Register](./tampilanWeb/register.png)

### 3. Halaman Utama
![Halaman Utama](./tampilanWeb/beranda.png)

### 4. Halaman Koleksi Resep
![Halaman Koleksi](./tampilanWeb/koleksi.png)

### 5. Halaman Pencarian Resep
![Halaman Jelajahi](./tampilanWeb/jelajahi.png)
![Halaman Jelajahi2](./tampilanWeb/jelajahi2.png)

### 6. Halaman Cari Berdasarkan Bahan
![Halaman Bahan](./tampilanWeb/bahan.png)

### 7. Halaman Detail Resep
![Halaman Detail](./tampilanWeb/detailresep.png)

## 📢 Penawaran & Fitur Unggulan

Aplikasi **ResepKu** hadir sebagai solusi digital untuk manajemen kuliner yang efisien dan modern. Berikut adalah nilai tambah yang kami tawarkan:

### 🎁 Penawaran Pengguna
**Gratis Akses Penuh untuk Pengguna Baru** Nikmati seluruh ekosistem ResepKu tanpa biaya berlangganan. Cukup daftar dan akses fitur berikut:
* **Registrasi & Login:** Akun personal untuk pengalaman yang lebih privat.
* **Eksplorasi Tanpa Batas:** Jelajahi ratusan resep dari database global.
* **Koleksi Personal:** Simpan resep pilihan ke dalam daftar favorit.
* **Smart Search:** Cari resep hanya dengan menginput stok bahan yang ada.

---

### 🔥 Fitur Utama
| Fitur | Deskripsi |
| :--- | :--- |
| **Pencarian Berbasis Bahan** | Masukkan bahan yang tersedia, sistem akan merekomendasikan masakan yang relevan. |
| **Koleksi Favorit** | Simpan dan kelola resep pilihan Anda dalam satu halaman khusus. |
| **Detail Resep Lengkap** | Informasi bahan terperinci disertai langkah memasak yang sistematis. |
| **Keamanan Terjamin** | Perlindungan data menggunakan *JSON Web Token (JWT)* dan enkripsi *Bcrypt*. |

---

### 🎯 Target Pengguna
ResepKu dirancang secara inklusif untuk berbagai kalangan:
* **Personal:** Mahasiswa (masak hemat) & Ibu Rumah Tangga.
* **Komunitas:** Pecinta kuliner yang ingin mencoba variasi masakan baru.
* **Edukasi:** Sebagai referensi/media pembelajaran mata kuliah Pemrograman Web.
* **Bisnis:** Referensi digitalisasi aplikasi bagi pelaku UMKM kuliner.

---