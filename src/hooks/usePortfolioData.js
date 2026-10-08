import { useEffect, useState } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import { portfolioData as fallbackData } from '../data/portfolioData';

const CACHE_KEY = 'portfolio-cache-v3';
const LIST_TABLES = ['skills', 'experiences', 'certificates', 'projects', 'services', 'activities', 'publications', 'news'];

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* storage penuh / diblokir — abaikan */
  }
}

export async function fetchPortfolio() {
  const [profileRes, ...lists] = await Promise.all([
    supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
    ...LIST_TABLES.map((t) => {
      let q = supabase.from(t).select('*').order('sort_order', { ascending: true });
      if (t === 'news') q = q.eq('is_published', true).order('published_at', { ascending: false });
      else q = q.order('created_at', { ascending: true });
      return q;
    }),
  ]);

  const failed = [profileRes, ...lists].find((r) => r.error);
  if (failed) throw failed.error;

  // Belum ada baris profile = database belum diisi -> pakai data statis
  if (!profileRes.data) return fallbackData;

  const result = { profile: { ...fallbackData.profile, ...stripNulls(profileRes.data) } };
  LIST_TABLES.forEach((t, i) => (result[t] = lists[i].data ?? []));
  return result;
}

function stripNulls(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== ''));
}

export function usePortfolioData() {
  const [cached] = useState(() => (isSupabaseReady ? readCache() : null));
  const [data, setData] = useState(cached || fallbackData);
  // Ada cache = langsung tampil, data terbaru diambil di belakang layar
  const [ready, setReady] = useState(!isSupabaseReady || !!cached);

  useEffect(() => {
    if (!isSupabaseReady) return;
    let alive = true;
    fetchPortfolio()
      .then((d) => {
        if (!alive) return;
        setData(d);
        writeCache(d);
      })
      .catch((err) => console.warn('[portfolio] gagal memuat dari Supabase, memakai data lokal.', err))
      .finally(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  return { data, ready };
}
