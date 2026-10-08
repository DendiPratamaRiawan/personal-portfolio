import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BilingualFields, inputCls } from './Fields';
import { removeStoredFile } from './storage';

function Drawer({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="flex h-full w-full max-w-xl flex-col bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b hairline px-5 py-4">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Tutup">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{children}</div>
            <div className="border-t hairline px-5 py-4">{footer}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CrudManager({ resource }) {
  const r = resource;
  const sortable = r.sortable !== false;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null); // null | {} (baru) | row
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    let q = supabase.from(r.table).select('*');
    const order = r.orderBy || [['sort_order', true], ['created_at', true]];
    order.forEach(([col, asc]) => (q = q.order(col, { ascending: asc })));
    return q.then(({ data, error }) => {
      if (error) toast.error(error.message);
      setRows(data || []);
      setLoading(false);
    });
  }, [r]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const term = query.toLowerCase();
    return rows.filter(
      (row) =>
        (filter === 'all' || row[r.filter?.field] === filter) &&
        (!term || JSON.stringify([r.title(row), r.subtitle?.(row)]).toLowerCase().includes(term))
    );
  }, [rows, query, filter, r]);

  const suggestions = useMemo(() => {
    const out = {};
    r.fields.filter((f) => f.suggestFrom).forEach((f) => (out[f.suggestFrom] = [...new Set(rows.map((x) => x[f.suggestFrom]).filter(Boolean))]));
    return out;
  }, [rows, r]);

  const openForm = (row) => {
    setEditing(row || {});
    setValues(row ? { ...row } : r.defaults());
  };

  const save = async (e) => {
    e?.preventDefault();
    const missing = r.fields.find((f) => f.required && !values[f.name]);
    if (missing) return toast.error(`${missing.label} wajib diisi`);

    setSaving(true);
    const payload = {};
    r.fields.forEach((f) => (payload[f.name] = values[f.name] === '' ? null : values[f.name] ?? null));
    payload.translations = values.translations || {};

    let error;
    if (editing.id) {
      ({ error } = await supabase.from(r.table).update(payload).eq('id', editing.id));
    } else {
      if (sortable) payload.sort_order = rows.reduce((m, x) => Math.max(m, x.sort_order ?? 0), -1) + 1;
      ({ error } = await supabase.from(r.table).insert(payload));
    }
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success('Tersimpan');
    setEditing(null);
    load();
  };

  const remove = async (row) => {
    if (!window.confirm(`Hapus "${r.title(row)}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const { error } = await supabase.from(r.table).delete().eq('id', row.id);
    if (error) return toast.error(error.message);
    if (r.image && row[r.image]) removeStoredFile(row[r.image]).catch(() => {});
    toast.success('Dihapus');
    setRows((list) => list.filter((x) => x.id !== row.id));
  };

  // Tukar posisi dengan tetangga, lalu tulis ulang sort_order seluruh daftar
  const move = async (row, dir) => {
    const list = [...rows];
    const i = list.findIndex((x) => x.id === row.id);
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    const ordered = list.map((x, k) => ({ ...x, sort_order: k }));
    setRows(ordered);
    const changed = ordered.filter((x, k) => rows[k]?.id !== x.id || rows[k]?.sort_order !== k);
    const results = await Promise.all(changed.map((x) => supabase.from(r.table).update({ sort_order: x.sort_order }).eq('id', x.id)));
    if (results.some((res) => res.error)) {
      toast.error('Gagal menyimpan urutan');
      load();
    }
  };

  const Icon = r.icon;
  const canMove = sortable && !query && filter === 'all';

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-mono">Kelola konten</p>
          <h1 className="mt-1 text-3xl font-bold">{r.label}</h1>
        </div>
        <button onClick={() => openForm(null)} className="btn-primary self-start">
          <Plus size={16} /> Tambah {r.singular}
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input className={`${inputCls} !pl-10`} placeholder="Cari..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {r.filter && (
          <select className={`${inputCls} sm:w-48`} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Semua</option>
            {r.filter.options.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border hairline bg-surface">
        {loading ? (
          <div className="grid place-items-center py-20 text-muted">
            <Loader2 className="animate-spin" />
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Icon size={24} />
            </span>
            <p className="text-sm text-muted">{rows.length ? 'Tidak ada yang cocok.' : `Belum ada ${r.singular}.`}</p>
          </div>
        ) : (
          <ul className="divide-y divide-ink/[0.07]">
            <AnimatePresence initial={false}>
              {visible.map((row, i) => {
                const badge = r.badge?.(row);
                return (
                  <motion.li key={row.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3 px-3 py-3 sm:px-4">
                    {canMove && (
                      <div className="flex flex-col">
                        <button onClick={() => move(row, -1)} disabled={i === 0} className="rounded p-0.5 text-muted hover:text-accent disabled:opacity-20" aria-label="Naik">
                          <ArrowUp size={14} />
                        </button>
                        <button onClick={() => move(row, 1)} disabled={i === visible.length - 1} className="rounded p-0.5 text-muted hover:text-accent disabled:opacity-20" aria-label="Turun">
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    )}
                    {r.image && (
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-ink/5">
                        {row[r.image] && <img src={row[r.image]} alt="" className="h-full w-full object-cover" loading="lazy" />}
                      </div>
                    )}
                    <button onClick={() => openForm(row)} className="min-w-0 flex-1 text-left">
                      <p className="flex items-center gap-2 truncate font-semibold">
                        <span className="truncate">{r.title(row)}</span>
                        {badge && <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">{badge}</span>}
                      </p>
                      {r.subtitle && <p className="truncate text-xs text-muted">{r.subtitle(row)}</p>}
                    </button>
                    <button onClick={() => openForm(row)} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink" aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => remove(row)} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-500" aria-label="Hapus">
                      <Trash2 size={15} />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
      {sortable && rows.length > 1 && <p className="mt-3 text-xs text-muted">Gunakan panah ↑↓ untuk mengatur urutan tampil di website (nonaktif saat mencari/memfilter).</p>}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? `Edit ${r.singular}` : `Tambah ${r.singular}`}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className="btn-ghost">
              Batal
            </button>
            <button onClick={save} disabled={saving} className="btn-primary">
              {saving && <Loader2 size={15} className="animate-spin" />} Simpan
            </button>
          </div>
        }
      >
        <form onSubmit={save}>
          <BilingualFields fields={r.fields} values={values} setValues={setValues} suggestions={suggestions} />
        </form>
      </Drawer>
    </div>
  );
}
