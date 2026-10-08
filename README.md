# Portfolio — Dendi Pratama Riawan

React + Vite + Tailwind + Framer Motion, dengan konten dari **Supabase** yang dikelola lewat halaman admin tersembunyi.

```bash
npm install
npm run dev
```

Tanpa konfigurasi Supabase, website tetap jalan memakai data lokal di `src/data/portfolioData.js`.

## Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com) dengan nama **`portfolio-dendi`**.
2. Buka **SQL Editor → New query**, tempel seluruh isi [`supabase/schema.sql`](supabase/schema.sql), lalu **Run**.
   - Sebelum menjalankan, ganti email di baris `insert into public.admin_users ...` dengan email admin kamu.
3. Buka **Authentication → Users → Add user → Create new user**, isi email yang sama + password, centang *Auto Confirm User*.
4. (Disarankan) **Authentication → Sign In / Providers** → matikan *Allow new users to sign up*.
5. Salin `.env.example` menjadi `.env`, lalu isi dari **Project Settings → API**:
   ```env
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   VITE_ADMIN_PATH=/ruang-kendali
   ```
6. Jalankan ulang `npm run dev`, buka `http://localhost:5173/ruang-kendali`, login, lalu klik **Import data awal** di dashboard (cukup sekali). Semua data & gambar dari kode akan disalin ke database.

Saat deploy (Vercel/Netlify), tambahkan ketiga variabel di atas pada pengaturan Environment Variables. `vercel.json` dan `public/_redirects` sudah disiapkan supaya alamat admin tidak 404.

## Halaman admin

Tidak ada tombol/link login di website. Buka langsung alamat dari `VITE_ADMIN_PATH`.

| Menu | Fungsi |
| --- | --- |
| Profil | Nama, **deskripsi singkat di bawah nama**, peran, tentang saya, fokus, foto, **ganti file CV (PDF)**, kontak, sosial media |
| Kegiatan & Berita | **Kegiatan saya**: tulis manual (judul, foto, ringkasan, isi lengkap) → tampil di slider section *Activities*. **Berita media**: tempel link → **Ambil data** (judul, ringkasan, gambar, nama media terisi otomatis) → tampil di daftar *In the media* |
| Galeri Aktivitas | Foto tanpa tulisan panjang, tampil di slider Activities setelah postingan |
| Proyek, Sertifikat & Award, Skill, Pengalaman, Layanan | Tambah / edit / hapus / atur urutan |
| Pesan masuk | Pesan dari form kontak |

### Dua bahasa (ID / EN)

Pengunjung bisa memilih **ID** atau **EN** di navbar. Konten diisi dalam Bahasa Indonesia; di setiap form admin ada tab **English** dan tombol **Terjemahkan otomatis** (hasil disimpan ke database dan bisa dikoreksi). Kolom English yang kosong otomatis memakai versi Indonesia. Teks antarmuka (judul section, tombol) ada di `src/i18n.jsx`.

Gambar yang di-upload otomatis diperkecil (maks. 1800px, webp) dan disimpan di bucket Storage `portfolio`.

Keamanan: semua tabel memakai Row Level Security — publik hanya bisa membaca, dan hanya email yang terdaftar di tabel `admin_users` yang bisa mengubah data.
