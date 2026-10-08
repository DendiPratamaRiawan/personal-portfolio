// Data lokal (cadangan). Dipakai selama database Supabase belum diisi.
// Setelah "Import data awal" di halaman admin, semua konten diambil dari database.
// Konten utama berbahasa Indonesia; versi Inggris ada di `translations.en`.
import simagangImg from '../assets/simagang.jpg';
import gotokoImg from '../assets/Gotoko.jpg';
import kipkuImg from '../assets/KipKu.jpg';
import blkImg from '../assets/BLKcertif.png';
import cyberImg from '../assets/cyber.png';
import profileImg from '../assets/foto_dendi.png';
import cvFile from '../assets/CV-dendi.pdf';
import activityImg1 from '../assets/dendi1.jpg';
import activityImg2 from '../assets/dendi2.jpg';
import activityImg3 from '../assets/dendi3.jpg';
import activityImg4 from '../assets/dendi4.jpg';

const en = (fields) => ({ translations: { en: fields } });

const skillGroups = [
  ['Jaringan & Keamanan', 'Network & Security', ['Network Configuration', 'Network Topology Design', 'Sophos Firewall Configuration', 'Penetration Testing', 'Wazuh', 'Log Analysis & SIEM', 'Bug Tracking']],
  ['IT Support', 'IT Support', ['Hardware & Software Troubleshooting', 'Active Directory', 'CCTV Installation', 'Microsoft 365', 'Raspberry Pi']],
  ['Pengembangan', 'Development', ['Python & Flask', 'React Native & Expo', 'Tailwind CSS']],
  ['Cloud & Data', 'Cloud & Data', ['AWS (Amazon Web Services)', 'Supabase', 'MySQL', 'Firebase']],
];

const withOrder = (list) => list.map((item, i) => ({ id: `local-${i}-${item.title || item.name || item.caption}`, sort_order: i, translations: {}, ...item }));

export const portfolioData = {
  profile: {
    name: 'Dendi Pratama Riawan',
    tagline: 'Saya menjaga jaringan tetap stabil, perangkat tetap sehat, dan orang-orang yang mengandalkannya tetap produktif.',
    roles: ['IT Support Specialist', 'Network Engineer', 'Junior Cyber Security'],
    highlights: ['IT Support & Infrastruktur', 'Konfigurasi & Desain Jaringan', 'Keamanan Siber (Blue Team)'],
    about:
      'Mahasiswa Teknik Informatika di Universitas Faletehan yang menjunjung integritas, tanggung jawab, dan semangat belajar yang tinggi. Tertarik pada IT Support dan Network Engineering, dengan pengalaman langsung menangani troubleshooting perangkat keras dan lunak, serta konfigurasi dan perawatan jaringan dasar. Aktif mengembangkan kemampuan teknis melalui pelatihan dan sertifikasi. Memiliki kemampuan komunikasi yang baik, terbiasa bekerja dalam tim, dan siap menghadapi tantangan di industri IT.',
    photo_url: profileImg,
    cv_url: cvFile,
    location: 'Serang, Banten, Indonesia',
    email: 'dendipratamar@gmail.com',
    phone: '087768808324',
    github: 'https://github.com/DendiPratamaRiawan/',
    linkedin: 'https://www.linkedin.com/in/dendipratamar',
    instagram: 'https://www.instagram.com/prtmaar_',
    open_to_work: true,
    ...en({
      tagline: 'I keep networks stable, devices healthy, and the people who rely on them productive.',
      highlights: ['IT Support & Infrastructure', 'Network Configuration & Design', 'Cyber Security (Blue Team)'],
      about:
        'Informatics Engineering student at Universitas Faletehan with strong integrity, responsibility, and a high commitment to continuous learning. Highly interested in IT Support and Network Engineering, with hands-on experience troubleshooting hardware and software, as well as basic network configuration and maintenance. Actively developing technical skills through training and certifications. Equipped with strong communication skills, comfortable working in a team, and ready to take on challenges in the IT industry.',
    }),
  },

  skills: withOrder(skillGroups.flatMap(([category, categoryEn, names]) => names.map((name) => ({ name, category, ...en({ category: categoryEn }) })))),

  experiences: withOrder([
    { type: 'work', title: 'IT Support Specialist', subtitle: 'PT Pelindo (PERSERO) Regional 2 Banten', date_label: 'Juli 2026', ...en({ date_label: 'July 2026' }) },
    { type: 'work', title: 'IT Support Specialist', subtitle: 'PT Indorama Petrochemicals', date_label: 'April 2026' },
    { type: 'education', title: 'Teknik Informatika (IPK: 3.81 / 4.00)', subtitle: 'Universitas Faletehan', date_label: '2023 - Sekarang', ...en({ title: 'Informatics Engineering (GPA: 3.81 / 4.00)', date_label: '2023 - Present' }) },
    { type: 'education', title: 'IPS', subtitle: 'SMA Negeri 2 Rangkasbitung', date_label: '2020 - 2023', ...en({ title: 'Social Sciences' }) },
    { type: 'organization', title: 'Kepala Divisi Informasi & Komunikasi', subtitle: 'Himpunan Program Studi Informatika', date_label: '2025 - 2026', ...en({ title: 'Head of Information & Communication Division' }) },
    { type: 'organization', title: 'Kepala Divisi Isu & Dakwah', subtitle: 'UKM Kerohanian Islam', date_label: '2023 - 2025', ...en({ title: "Head of Issues & Da'wah Division" }) },
    { type: 'volunteer', title: 'Ketua Relawan', subtitle: 'Faletehan Menyapa Desa (FMD), BEM Universitas Faletehan', date_label: '2026', ...en({ title: 'Head of Volunteer' }) },
    { type: 'volunteer', title: 'Relawan Humas', subtitle: 'Faletehan Expo Competition 2025', date_label: '2025', ...en({ title: 'Public Relations Volunteer' }) },
  ]),

  certificates: withOrder([
    {
      type: 'certificate',
      title: 'Cyber Security Red Team & Blue Team',
      issuer: 'Akademi Surosowan Cyber',
      date_label: '2026',
      image_url: cyberImg,
      link: 'https://drive.google.com/file/d/15MiK7V3Y48r2Z2_KYQiCjZr8F3YH4Six/view?usp=sharing',
    },
    {
      type: 'certificate',
      title: 'Cloud Computing Support',
      issuer: 'BBVP Serang',
      date_label: '2024',
      image_url: blkImg,
      link: 'https://drive.google.com/file/d/10F_iLVY9iabFxBZ0e7UjdGJqP4ctCKw8/view?usp=sharing',
    },
  ]),

  projects: withOrder([
    {
      title: 'SIMAGANG APP',
      description:
        'Aplikasi presensi berbasis geofencing yang memanfaatkan GPS dan realtime database untuk memastikan presensi dilakukan di lokasi yang ditentukan, dengan konfigurasi lokasi yang dapat disesuaikan secara instan.',
      tech: ['React Native Expo SDK 54', 'Firebase', 'MobileFaceNet TFLite', 'OpenStreetMap'],
      date_label: '2026',
      image_url: simagangImg,
      github_url: '',
      featured: true,
      ...en({
        description:
          'A geofencing-based attendance app that uses GPS and a realtime database to make sure check-ins happen at the designated location, with location settings that can be adjusted instantly.',
      }),
    },
    {
      title: 'FinMahasiswa APP',
      description:
        'Aplikasi manajemen keuangan personal yang dirancang khusus untuk mahasiswa, terutama penerima beasiswa KIP-Kuliah. Membantu mengelola uang saku, pencairan beasiswa, dan pengeluaran bulanan secara terstruktur melalui antarmuka yang intuitif.',
      tech: ['React Native Expo SDK 54', 'Firebase'],
      date_label: '2026',
      image_url: kipkuImg,
      github_url: 'https://github.com/rosi1598201-cpu/KipKu-PPM2.git',
      ...en({
        description:
          'A personal finance app built for university students, especially KIP-Kuliah scholarship recipients. It helps manage allowance, scholarship disbursements, and monthly spending in a structured way through an intuitive interface.',
      }),
    },
    {
      title: 'GoToko.id APP',
      description:
        'Aplikasi e-commerce mobile untuk pengalaman belanja online yang ringkas dan intuitif: autentikasi pengguna, katalog produk per kategori (Fashion, Elektronik, Aksesoris), produk unggulan, serta keranjang belanja real-time dengan navigasi bawah yang responsif.',
      tech: ['React Native Expo SDK 54', 'Firebase'],
      date_label: '2025',
      image_url: gotokoImg,
      github_url: '',
      ...en({
        description:
          'A mobile e-commerce app for a simple, intuitive shopping experience: user authentication, product catalog by category (Fashion, Electronics, Accessories), featured products, and a real-time shopping cart with responsive bottom navigation.',
      }),
    },
  ]),

  services: withOrder([
    {
      title: 'Dukungan & Keamanan Jaringan',
      level: 'Menengah',
      description: 'Konfigurasi, troubleshooting, dan perawatan LAN/WAN, MikroTik, Cisco, serta Sophos Firewall.',
      ...en({ title: 'Network Support & Security', level: 'Intermediate', description: 'Configuration, troubleshooting, and maintenance of LAN/WAN, MikroTik, Cisco, and Sophos Firewalls.' }),
    },
    {
      title: 'IT Support & Infrastruktur',
      level: 'Menengah',
      description: 'Instalasi software, perawatan hardware, dukungan pengguna, serta pengelolaan CCTV dan NVR.',
      ...en({ title: 'IT Support & Infrastructure', level: 'Intermediate', description: 'Software installation, hardware maintenance, user support, CCTV, and NVR management.' }),
    },
    {
      title: 'Pengembangan Web & Mobile',
      level: 'Menengah',
      description: 'Aplikasi web & mobile responsif dengan React, React Native Expo, Tailwind CSS, Python Flask, dan Supabase.',
      ...en({ title: 'Web & Mobile Development', level: 'Intermediate', description: 'Responsive web & mobile apps using React, React Native Expo, Tailwind CSS, Python Flask, and Supabase.' }),
    },
    {
      title: 'Manajemen Database',
      level: 'Menengah',
      description: 'Desain database relasional, operasi CRUD, dan administrasi database cloud dengan MySQL dan Supabase.',
      ...en({ title: 'Database Management', level: 'Intermediate', description: 'Relational database design, CRUD operations, and cloud database administration using MySQL and Supabase.' }),
    },
    {
      title: 'Keamanan Siber (Blue Team)',
      level: 'Dasar',
      description: 'Monitoring jaringan, analisis log, manajemen kerentanan, dan deteksi ancaman.',
      ...en({ title: 'Cybersecurity (Blue Team)', level: 'Basic', description: 'Network monitoring, log analysis, vulnerability management, and threat detection.' }),
    },
  ]),

  activities: withOrder([
    { image_url: activityImg1, caption: 'Perjalanan magang', ...en({ caption: 'Internship journey' }) },
    { image_url: activityImg2, caption: 'Konfigurasi firewall', ...en({ caption: 'Firewall configuration' }) },
    { image_url: activityImg3, caption: 'Sesi IT Support', ...en({ caption: 'IT support session' }) },
    { image_url: activityImg4, caption: 'Perawatan perangkat', ...en({ caption: 'Maintenance' }) },
  ]),

  publications: withOrder([
    {
      title:
        'Penguatan Keterampilan Praktik Mahasiswa Kebidanan melalui Uji Kelayakan dan Pemanfaatan SMARTHOM (Simulator Persalinan) di Laboratorium Universitas Faletehan',
      authors: 'Feling Polwandari, Dewi Rahmawati, Muchamad Fajar Arifin, Sita Aulia Adzani, Rindiani Rindiani, Kaila Amatul Azhar, Dendi Pratama Riawan',
      venue: 'SAFARI: Jurnal Pengabdian Masyarakat Indonesia, Vol. 6 No. 1 (2026)',
      date_label: '2025',
      link: 'https://doi.org/10.56910/safari.v6i1.3402',
      ...en({
        title:
          "Strengthening Midwifery Students' Practical Skills through Feasibility Testing and Use of SMARTHOM (Childbirth Simulator) at the Universitas Faletehan Laboratory",
      }),
    },
    {
      title: 'Application of Logistic Regression Method for Predicting Diabetes Mellitus',
      authors: 'Dendi Pratama Riawan, Dede Brahma Arianto',
      venue: 'Ambidextrous: Journal of Innovation, Efficiency and Technology in Organization, Vol. 4 No. 3 (2026), pp. 204–211',
      date_label: '2026',
      link: 'https://journal.takaza.id/index.php/ambidextrous/article/view/539',
    },
  ]),

  news: [],
};
