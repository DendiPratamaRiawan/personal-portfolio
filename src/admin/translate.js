// Terjemahan otomatis ID -> EN untuk admin. Hasilnya disimpan ke database,
// jadi pengunjung tidak bergantung pada layanan ini (dan admin bisa mengoreksi).
// Utama: MyMemory (gratis, maks ~500 karakter per request). Cadangan: Google gtx.

const MAX = 450;

function chunk(text) {
  const parts = [];
  for (const para of text.split(/(\n+)/)) {
    if (/^\n+$/.test(para) || para.length <= MAX) {
      parts.push(para);
      continue;
    }
    let buf = '';
    for (const sentence of para.split(/(?<=[.!?])\s+/)) {
      if ((buf + ' ' + sentence).trim().length > MAX && buf) {
        parts.push(buf.trim());
        buf = sentence;
      } else buf = `${buf} ${sentence}`;
    }
    if (buf.trim()) parts.push(buf.trim());
  }
  return parts;
}

async function myMemory(q, from, to) {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${from}|${to}`);
  const json = await res.json();
  if (json.responseStatus !== 200 || json.quotaFinished) throw new Error(json.responseDetails || 'MyMemory gagal');
  return json.responseData.translatedText;
}

async function google(q, from, to) {
  const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(q)}`);
  const json = await res.json();
  return json[0].map((x) => x[0]).join('');
}

export async function translateText(text, from = 'id', to = 'en') {
  if (!text || !text.trim()) return text;
  const out = [];
  for (const part of chunk(text)) {
    if (!part.trim()) {
      out.push(part);
      continue;
    }
    try {
      out.push(await myMemory(part, from, to));
    } catch {
      out.push(await google(part, from, to));
    }
  }
  return out.join(' ').replace(/ (\n+) /g, '$1');
}

export async function translateValue(value) {
  if (Array.isArray(value)) return Promise.all(value.map((v) => translateText(v)));
  return translateText(value);
}
