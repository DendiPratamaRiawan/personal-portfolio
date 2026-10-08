import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseReady = Boolean(url && anonKey);
export const supabase = isSupabaseReady ? createClient(url, anonKey) : null;
export const BUCKET = 'portfolio';

const raw = import.meta.env.VITE_ADMIN_PATH || '/ruang-kendali';
export const ADMIN_PATH = '/' + raw.replace(/^\/+|\/+$/g, '');
