import { Award, Briefcase, Cpu, FolderGit2, Images, Layers, Newspaper } from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);

export const EXPERIENCE_TYPES = [
  ['work', 'Pengalaman Kerja'],
  ['education', 'Pendidikan'],
  ['organization', 'Organisasi'],
  ['volunteer', 'Volunteer'],
];

// Setiap resource = 1 tabel Supabase. CrudManager membaca konfigurasi ini
// untuk membuat daftar, form tambah/edit, dan filter secara otomatis.
export const RESOURCES = {
  news: {
    table: 'news',
    label: 'Kegiatan & Berita',
    singular: 'kegiatan / berita',
    icon: Newspaper,
    orderBy: [['published_at', false], ['created_at', false]],
    sortable: false,
    image: 'image_url',
    title: (r) => r.title,
    subtitle: (r) => `${r.category === 'berita' ? 'Berita media' : 'Kegiatan saya'} · ${r.published_at}${r.source_name ? ` · ${r.source_name}` : ''}`,
    badge: (r) => (!r.is_published ? 'Draft' : null),
    filter: { field: 'category', options: [['kegiatan', 'Kegiatan saya'], ['berita', 'Berita media']] },
    defaults: () => ({ category: 'kegiatan', published_at: today(), is_published: true }),
    fields: [
      {
        name: 'source_url',
        label: 'Link berita (opsional)',
        type: 'url',
        fetchMeta: true,
        placeholder: 'https://news.example.com/artikel-tentang-saya',
        help: 'Tempel link berita lalu klik "Ambil data" untuk mengisi otomatis. Kosongkan jika ingin menulis kegiatan secara manual.',
      },
      { name: 'title', label: 'Judul', translate: true, type: 'text', required: true },
      { name: 'category', label: 'Tampil di', type: 'select', options: [['kegiatan', 'Kegiatan saya (slider)'], ['berita', 'Berita media (daftar link)']], half: true },
      { name: 'published_at', label: 'Tanggal', type: 'date', half: true },
      { name: 'summary', label: 'Ringkasan', translate: true, type: 'textarea', rows: 3, help: 'Tampil di kartu. 1–3 kalimat.' },
      { name: 'content', label: 'Isi lengkap (opsional)', translate: true, type: 'textarea', rows: 10, help: 'Jika diisi, pengunjung bisa membaca cerita lengkap di website. Jika kosong dan ada link, kartu langsung membuka link berita.' },
      { name: 'image_url', label: 'Gambar', type: 'image', folder: 'news' },
      { name: 'source_name', label: 'Nama media / sumber', type: 'text', placeholder: 'detik.com', half: true },
      { name: 'is_published', label: 'Tampilkan di website', type: 'toggle', half: true },
    ],
  },

  projects: {
    table: 'projects',
    label: 'Proyek',
    singular: 'proyek',
    icon: FolderGit2,
    image: 'image_url',
    title: (r) => r.title,
    subtitle: (r) => [r.date_label, r.tech?.slice(0, 3).join(', ')].filter(Boolean).join(' · '),
    badge: (r) => (r.featured ? 'Unggulan' : null),
    defaults: () => ({ tech: [], featured: false }),
    fields: [
      { name: 'title', label: 'Nama proyek', translate: true, type: 'text', required: true },
      { name: 'date_label', label: 'Tahun / periode', type: 'text', placeholder: '2026', half: true },
      { name: 'featured', label: 'Jadikan proyek unggulan (kartu besar)', type: 'toggle', half: true },
      { name: 'description', label: 'Deskripsi', translate: true, type: 'textarea', rows: 5 },
      { name: 'tech', label: 'Teknologi', type: 'tags', placeholder: 'Ketik lalu Enter' },
      { name: 'image_url', label: 'Gambar / screenshot', type: 'image', folder: 'projects' },
      { name: 'github_url', label: 'Link GitHub', type: 'url', half: true },
      { name: 'demo_url', label: 'Link demo', type: 'url', half: true },
    ],
  },

  certificates: {
    table: 'certificates',
    label: 'Sertifikat & Award',
    singular: 'sertifikat / award',
    icon: Award,
    image: 'image_url',
    title: (r) => r.title,
    subtitle: (r) => [r.type === 'award' ? 'Award' : 'Sertifikat', r.issuer, r.date_label].filter(Boolean).join(' · '),
    filter: { field: 'type', options: [['certificate', 'Sertifikat'], ['award', 'Award']] },
    defaults: () => ({ type: 'certificate' }),
    fields: [
      { name: 'type', label: 'Jenis', type: 'select', options: [['certificate', 'Sertifikat'], ['award', 'Award / Penghargaan']], half: true },
      { name: 'date_label', label: 'Tahun', type: 'text', placeholder: '2026', half: true },
      { name: 'title', label: 'Judul', translate: true, type: 'text', required: true },
      { name: 'issuer', label: 'Penerbit / penyelenggara', translate: true, type: 'text' },
      { name: 'image_url', label: 'Gambar sertifikat', type: 'image', folder: 'certificates' },
      { name: 'link', label: 'Link kredensial', type: 'url' },
    ],
  },

  skills: {
    table: 'skills',
    label: 'Skill',
    singular: 'skill',
    icon: Cpu,
    title: (r) => r.name,
    subtitle: (r) => r.category,
    groupBy: 'category',
    defaults: () => ({ category: 'General' }),
    fields: [
      { name: 'name', label: 'Nama skill', type: 'text', required: true },
      { name: 'category', label: 'Kategori', translate: true, type: 'text', suggestFrom: 'category', help: 'Skill dikelompokkan berdasarkan kategori di website. Contoh: Jaringan & Keamanan, IT Support, Pengembangan.' },
    ],
  },

  experiences: {
    table: 'experiences',
    label: 'Pengalaman',
    singular: 'pengalaman',
    icon: Briefcase,
    title: (r) => r.title,
    subtitle: (r) => [r.subtitle, r.date_label].filter(Boolean).join(' · '),
    filter: { field: 'type', options: EXPERIENCE_TYPES },
    defaults: () => ({ type: 'work' }),
    fields: [
      { name: 'type', label: 'Jenis', type: 'select', options: EXPERIENCE_TYPES, half: true },
      { name: 'date_label', label: 'Periode', translate: true, type: 'text', placeholder: '2023 - Present', half: true },
      { name: 'title', label: 'Jabatan / jurusan / peran', translate: true, type: 'text', required: true },
      { name: 'subtitle', label: 'Perusahaan / institusi / organisasi', translate: true, type: 'text' },
      { name: 'description', label: 'Deskripsi (opsional)', translate: true, type: 'textarea', rows: 4 },
    ],
  },

  services: {
    table: 'services',
    label: 'Layanan',
    singular: 'layanan',
    icon: Layers,
    title: (r) => r.title,
    subtitle: (r) => r.level,
    defaults: () => ({ level: 'Menengah' }),
    fields: [
      { name: 'title', label: 'Nama layanan', translate: true, type: 'text', required: true },
      { name: 'level', label: 'Level', translate: true, type: 'text', placeholder: 'Dasar / Menengah / Mahir' },
      { name: 'description', label: 'Deskripsi', translate: true, type: 'textarea', rows: 3 },
    ],
  },

  activities: {
    table: 'activities',
    label: 'Galeri Aktivitas',
    singular: 'foto aktivitas',
    icon: Images,
    image: 'image_url',
    title: (r) => r.caption || '(tanpa keterangan)',
    subtitle: () => 'Tampil di slider Kegiatan, setelah postingan',
    defaults: () => ({}),
    fields: [
      { name: 'image_url', label: 'Foto', type: 'image', folder: 'activities', required: true },
      { name: 'caption', label: 'Keterangan', translate: true, type: 'text', placeholder: 'Konfigurasi firewall di kantor' },
    ],
  },
};
