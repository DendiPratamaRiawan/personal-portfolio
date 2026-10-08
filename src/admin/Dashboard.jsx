import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowUpRight, DatabaseZap, Loader2, Mail, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { RESOURCES } from './resources';
import { SEED_TABLES, seedDatabase } from './seed';

export default function Dashboard({ go, email }) {
  const [counts, setCounts] = useState({});
  const [hasProfile, setHasProfile] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [log, setLog] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const tables = [...Object.values(RESOURCES).map((r) => r.table), 'messages'];
    Promise.all(tables.map((t) => supabase.from(t).select('*', { count: 'exact', head: true }))).then((res) =>
      setCounts(Object.fromEntries(tables.map((t, i) => [t, res[i].count ?? 0])))
    );
    supabase
      .from('profile')
      .select('id')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => setHasProfile(!!data));
  }, [reload]);

  const seed = async () => {
    if (!window.confirm('Salin data dari kode (proyek, skill, sertifikat, foto, dll) ke database? Tabel yang sudah berisi akan dilewati.')) return;
    setSeeding(true);
    try {
      await seedDatabase(setLog);
      toast.success('Data awal berhasil diimport');
      setReload((n) => n + 1);
    } catch (err) {
      toast.error(err.message);
      setLog(`Gagal: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const hour = new Date().getHours();
  const greet = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 19 ? 'Selamat sore' : 'Selamat malam';

  return (
    <div>
      <p className="label-mono">{email}</p>
      <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{greet}, Dendi.</h1>
      <p className="mt-2 text-muted">Semua perubahan di sini langsung tampil di website setelah halaman di-refresh.</p>

      {(!hasProfile || SEED_TABLES.some((t) => counts[t] === 0)) && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-accent/40 bg-accent/5 p-6 sm:flex-row sm:items-center">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-white">
            <DatabaseZap size={22} />
          </span>
          <div className="flex-1">
            <h2 className="font-bold">{hasProfile ? 'Data awal belum lengkap' : 'Database masih kosong'}</h2>
            <p className="text-sm text-muted">Salin data dari kode ke database agar semua bisa diedit dari sini. Bagian yang sudah terisi akan dilewati, jadi aman diulang.</p>
            {log && <p className="mt-2 font-mono text-xs text-accent">{log}</p>}
          </div>
          <button onClick={seed} disabled={seeding} className="btn-primary shrink-0">
            {seeding && <Loader2 size={15} className="animate-spin" />} Import data awal
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(RESOURCES).map(([key, r]) => {
          const Icon = r.icon;
          return (
            <button key={key} onClick={() => go(key)} className="group rounded-2xl border hairline bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-accent">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={17} />
                </span>
                <ArrowUpRight size={16} className="text-muted transition group-hover:rotate-45 group-hover:text-accent" />
              </div>
              <p className="mt-5 font-display text-3xl font-bold tabular-nums">{counts[r.table] ?? '–'}</p>
              <p className="text-sm text-muted">{r.label}</p>
            </button>
          );
        })}
        <button onClick={() => go('messages')} className="group rounded-2xl bg-ink p-5 text-left text-paper transition hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-paper/10">
              <Mail size={17} />
            </span>
            <ArrowUpRight size={16} className="transition group-hover:rotate-45" />
          </div>
          <p className="mt-5 font-display text-3xl font-bold tabular-nums">{counts.messages ?? '–'}</p>
          <p className="text-sm opacity-70">Pesan masuk</p>
        </button>
      </div>

      <div className="mt-8 rounded-2xl border hairline bg-surface p-5 sm:p-6">
        <h2 className="font-bold">Aksi cepat</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => go('news')} className="btn-ghost">
            <Plus size={15} /> Posting kegiatan / tempel link berita
          </button>
          <button onClick={() => go('projects')} className="btn-ghost">
            <Plus size={15} /> Tambah proyek
          </button>
          <button onClick={() => go('certificates')} className="btn-ghost">
            <Plus size={15} /> Tambah sertifikat
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Lihat website <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
