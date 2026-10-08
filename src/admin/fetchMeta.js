// Ambil judul, deskripsi, gambar, dan nama media dari link berita.
// Browser tidak bisa membaca HTML situs lain secara langsung (CORS), jadi
// pakai layanan publik: Microlink (utama) lalu AllOrigins (cadangan).

const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const toDate = (v) => {
  if (!v) return undefined;
  const d = new Date(v);
  return isNaN(d) ? undefined : d.toISOString().slice(0, 10);
};

async function viaMicrolink(url) {
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message || 'microlink gagal');
  const d = json.data;
  return {
    title: d.title,
    summary: d.description,
    image_url: d.image?.url,
    source_name: d.publisher || hostname(url),
    published_at: toDate(d.date),
  };
}

async function viaAllOrigins(url) {
  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
  const json = await res.json();
  const doc = new DOMParser().parseFromString(json.contents || '', 'text/html');
  const meta = (...keys) => {
    for (const k of keys) {
      const el = doc.querySelector(`meta[property="${k}"], meta[name="${k}"]`);
      if (el?.content) return el.content.trim();
    }
    return undefined;
  };
  const title = meta('og:title', 'twitter:title') || doc.title;
  if (!title) throw new Error('metadata tidak ditemukan');
  let image = meta('og:image', 'twitter:image');
  if (image && !/^https?:/.test(image)) image = new URL(image, url).href;
  return {
    title,
    summary: meta('og:description', 'description', 'twitter:description'),
    image_url: image,
    source_name: meta('og:site_name') || hostname(url),
    published_at: toDate(meta('article:published_time', 'pubdate', 'date')),
  };
}

export async function fetchLinkMeta(url) {
  let result;
  try {
    result = await viaMicrolink(url);
  } catch {
    result = await viaAllOrigins(url);
  }
  // Buang nilai kosong supaya tidak menimpa isian yang sudah ada
  return Object.fromEntries(Object.entries({ ...result, category: 'berita' }).filter(([, v]) => v));
}
