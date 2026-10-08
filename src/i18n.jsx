import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'lang';

const DICT = {
  id: {
    nav: { about: 'Tentang', skills: 'Keahlian', experience: 'Pengalaman', activities: 'Kegiatan', projects: 'Proyek', services: 'Layanan', contact: 'Kontak' },
    cta: { contact: 'Hubungi saya', cv: 'Unduh CV', projects: 'Lihat proyek', readMore: 'Selengkapnya', readOn: 'Baca di', send: 'Kirim pesan', sending: 'Mengirim...', viewCredential: 'Lihat kredensial', source: 'Kode sumber', demo: 'Demo langsung', backTop: 'Kembali ke atas' },
    hero: {
      hello: 'Halo, saya',
      open: 'Terbuka untuk peluang kerja',
      busy: 'Sedang tidak menerima pekerjaan',
      card: 'Kartu Portofolio',
      location: 'Lokasi',
      status: 'Status',
      available: 'Tersedia',
      unavailable: 'Tidak tersedia',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      gpa: 'IPK',
      skills: 'Keahlian',
    },
    about: { label: 'Tentang saya', title: 'Siapa saya', focus: 'Fokus saya', education: 'Pendidikan', location: 'Lokasi', email: 'Email' },
    skills: { label: 'Keahlian', title: 'Tools & teknologi yang saya pakai', count: 'keahlian' },
    experience: { label: 'Perjalanan', title: 'Pengalaman & pendidikan', work: 'Kerja', education: 'Pendidikan', organization: 'Organisasi', volunteer: 'Relawan' },
    activities: { label: 'Kegiatan saya', title: 'Apa saja yang sedang saya kerjakan', media: 'Diliput media', articles: 'artikel' },
    projects: { label: 'Portofolio', title: 'Proyek & sertifikat', projects: 'Proyek', certificates: 'Sertifikat', awards: 'Penghargaan', featured: 'Unggulan' },
    services: { label: 'Layanan', title: 'Yang bisa saya bantu', more: 'Butuh hal lain?', moreText: 'Ceritakan kebutuhanmu — kita cari solusinya bersama.' },
    contact: {
      label: 'Kontak',
      title: 'Ayo bekerja sama',
      text: 'Terbuka untuk magang, pekerjaan penuh waktu, maupun proyek IT lepas. Kirim pesan dan saya akan membalas dalam 1×24 jam.',
      name: 'Nama',
      namePh: 'Nama kamu',
      email: 'Email',
      message: 'Pesan',
      messagePh: 'Ceritakan sedikit tentang kebutuhanmu...',
      success: 'Pesan terkirim. Terima kasih!',
      failed: 'Pesan gagal dikirim, coba lagi.',
      copied: 'Email disalin',
      whatsapp: 'WhatsApp',
      location: 'Lokasi',
    },
    footer: { rights: 'Hak cipta dilindungi.' },
  },
  en: {
    nav: { about: 'About', skills: 'Skills', experience: 'Experience', activities: 'Activities', projects: 'Projects', services: 'Services', contact: 'Contact' },
    cta: { contact: 'Contact me', cv: 'Download CV', projects: 'View projects', readMore: 'Read more', readOn: 'Read on', send: 'Send message', sending: 'Sending...', viewCredential: 'View credential', source: 'Source code', demo: 'Live demo', backTop: 'Back to top' },
    hero: {
      hello: "Hi, I'm",
      open: 'Open to work',
      busy: 'Not taking new work',
      card: 'Portfolio Pass',
      location: 'Location',
      status: 'Status',
      available: 'Available',
      unavailable: 'Unavailable',
      projects: 'Projects',
      certificates: 'Certificates',
      gpa: 'GPA',
      skills: 'Skills',
    },
    about: { label: 'About me', title: 'Who I am', focus: 'My focus', education: 'Education', location: 'Location', email: 'Email' },
    skills: { label: 'Skills', title: 'Tools & technologies I work with', count: 'skills' },
    experience: { label: 'Journey', title: 'Experience & education', work: 'Work', education: 'Education', organization: 'Organization', volunteer: 'Volunteer' },
    activities: { label: 'My activities', title: "What I've been up to", media: 'In the media', articles: 'articles' },
    projects: { label: 'Portfolio', title: 'Projects & certificates', projects: 'Projects', certificates: 'Certificates', awards: 'Awards', featured: 'Featured' },
    services: { label: 'Services', title: 'How I can help', more: 'Need something else?', moreText: "Tell me what you need — let's figure it out together." },
    contact: {
      label: 'Contact',
      title: "Let's work together",
      text: "Open to internships, full-time roles, and freelance IT work. Send a message and I'll reply within a day.",
      name: 'Name',
      namePh: 'Your name',
      email: 'Email',
      message: 'Message',
      messagePh: 'Tell me a bit about what you need...',
      success: 'Message sent. Thank you!',
      failed: 'Could not send the message, please try again.',
      copied: 'Email copied',
      whatsapp: 'WhatsApp',
      location: 'Location',
    },
    footer: { rights: 'All rights reserved.' },
  },
};

const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
  } catch {
    /* abaikan */
  }
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en';
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* abaikan */
    }
  }, []);

  const value = useMemo(() => {
    // t('hero.hello') -> teks UI
    const t = (path) => path.split('.').reduce((o, k) => o?.[k], DICT[lang]) ?? path;
    // tr(row, 'title') -> konten dari database sesuai bahasa (fallback ke Indonesia)
    const tr = (row, field) => {
      if (!row) return '';
      if (lang === 'en') {
        const v = row.translations?.en?.[field];
        if (Array.isArray(v) ? v.length : v) return v;
      }
      return row[field];
    };
    return { lang, setLang, t, tr };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangContext);
