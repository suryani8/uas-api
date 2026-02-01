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

## Penawaran

Pengembangan aplikasi ResepKu didasarkan pada prinsip alokasi sumber daya yang efektif untuk menghasilkan platform manajemen kuliner yang komprehensif. Dengan mengintegrasikan teknologi fullstack yang modern dan antarmuka yang intuitif, aplikasi ini memastikan bahwa setiap fitur yang dikembangkan memberikan nilai guna yang maksimal sesuai dengan perencanaan kebutuhan pengguna.

### 1. Tujuan Pengembangan Berbasis Fungsionalitas
Aplikasi ini dirancang untuk mencapai target spesifik dalam mempermudah akses informasi memasak:

Optimalisasi Pencarian Resep: Melalui integrasi TheMealDB API, sistem menyediakan akses ke ribuan data resep global secara efisien.

Efisiensi Pengelolaan Bahan: Fitur "Cari Berdasarkan Bahan" memungkinkan pengguna menginput stok bahan yang tersedia untuk mendapatkan rekomendasi masakan yang relevan, guna menekan pemborosan sumber daya pangan.

Keamanan dan Personalisasi Data: Implementasi sistem login dan register yang didukung oleh JWT dan Bcrypt memastikan setiap pengguna dapat menyimpan koleksi resep favorit dan catatan pribadi secara aman.

### 2. Implementasi Visual dan Teknologi Terpadu
Penawaran ini didukung oleh tampilan antarmuka yang telah diimplementasikan secara sistematis:

Antarmuka Pengguna yang Intuitif: Tampilan halaman Beranda, Jelajahi, dan Koleksi dirancang dengan estetika dark mode yang bersih untuk meningkatkan kenyamanan navigasi.

Detail Resep yang Informatif: Halaman detail resep menyajikan informasi bahan secara terperinci serta akses ke video tutorial, memastikan target fungsionalitas edukasi kuliner tercapai sepenuhnya.

Stabilitas Infrastruktur: Penggunaan Next.js, Express.js, dan Prisma ORM menjamin bahwa sistem beroperasi dengan performa tinggi dan pengelolaan database MySQL yang akurat.

### 3. Kesimpulan Penawaran
Secara objektif, ResepKu membuktikan bahwa perencanaan yang matang pada aspek teknologi dan desain antarmuka dapat menghasilkan produk yang selaras dengan ekspektasi pengguna. Dengan menggabungkan kemudahan pencarian resep dan manajemen bahan makanan, aplikasi ini memberikan jaminan efisiensi informasi yang terukur bagi setiap penggunanya.
