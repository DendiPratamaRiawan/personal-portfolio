import { supabase } from '../lib/supabase';
import { portfolioData } from '../data/portfolioData';
import { uploadFile } from './storage';

export const SEED_TABLES = ['skills', 'experiences', 'services', 'certificates', 'projects', 'activities', 'publications'];
const IMAGE_FOLDERS = { certificates: 'certificates', projects: 'projects', activities: 'activities' };

// Salin data lokal (src/data/portfolioData.js) beserta gambarnya ke Supabase.
async function uploadLocal(url, folder) {
  if (!url) return null;
  const res = await fetch(url);
  const blob = await res.blob();
  const name = url.split('/').pop().split('?')[0];
  return uploadFile(new File([blob], name, { type: blob.type }), folder);
}

const strip = ({ id, ...rest }) => rest; // eslint-disable-line no-unused-vars

async function isEmpty(table) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  return !count;
}

// Aman dijalankan ulang: tabel yang sudah berisi dilewati, jadi data tidak dobel.
export async function seedDatabase(log = () => {}) {
  const { data: existing } = await supabase.from('profile').select('id').eq('id', 1).maybeSingle();
  if (!existing) {
    log('Mengunggah foto profil & CV...');
    const p = portfolioData.profile;
    const profile = { ...p, id: 1, photo_url: await uploadLocal(p.photo_url, 'profile'), cv_url: await uploadLocal(p.cv_url, 'profile') };
    const { error } = await supabase.from('profile').upsert(profile);
    if (error) throw new Error(`profile: ${error.message}`);
  }

  for (const table of SEED_TABLES) {
    if (!(await isEmpty(table))) {
      log(`${table} sudah berisi, dilewati.`);
      continue;
    }
    log(`Menyimpan ${table}...`);
    const folder = IMAGE_FOLDERS[table];
    const rows = [];
    for (const row of portfolioData[table]) {
      rows.push(folder ? { ...strip(row), image_url: await uploadLocal(row.image_url, folder) } : strip(row));
    }
    if (!rows.length) continue;
    // defaultToNull: false -> kolom yang tidak diisi memakai nilai default tabel, bukan NULL
    const { error } = await supabase.from(table).insert(rows, { defaultToNull: false });
    if (error) throw new Error(`${table}: ${error.message}`);
  }

  log('Selesai!');
}
