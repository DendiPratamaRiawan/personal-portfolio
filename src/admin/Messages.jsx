import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Inbox, Loader2, Mail, MailOpen, Reply, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Messages({ onChange }) {
  const [rows, setRows] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setRows(data || []);
      });
  }, []);

  const markRead = async (row, is_read = true) => {
    setRows((list) => list.map((x) => (x.id === row.id ? { ...x, is_read } : x)));
    await supabase.from('messages').update({ is_read }).eq('id', row.id);
    onChange?.();
  };

  const toggle = (row) => {
    setOpen(open === row.id ? null : row.id);
    if (!row.is_read) markRead(row);
  };

  const remove = async (row) => {
    if (!window.confirm(`Hapus pesan dari ${row.name}?`)) return;
    const { error } = await supabase.from('messages').delete().eq('id', row.id);
    if (error) return toast.error(error.message);
    setRows((list) => list.filter((x) => x.id !== row.id));
    onChange?.();
  };

  return (
    <div>
      <div className="mb-6">
        <p className="label-mono">Dari form kontak</p>
        <h1 className="mt-1 text-3xl font-bold">Pesan masuk</h1>
      </div>

      <div className="overflow-hidden rounded-2xl border hairline bg-surface">
        {!rows ? (
          <div className="grid place-items-center py-20 text-muted">
            <Loader2 className="animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-muted">
            <Inbox size={28} />
            <p className="text-sm">Belum ada pesan.</p>
          </div>
        ) : (
          <ul className="divide-y divide-ink/[0.07]">
            {rows.map((m) => (
              <li key={m.id}>
                <button onClick={() => toggle(m)} className="flex w-full items-start gap-3 px-4 py-4 text-left hover:bg-ink/[0.02]">
                  <span className={`mt-0.5 ${m.is_read ? 'text-muted' : 'text-accent'}`}>{m.is_read ? <MailOpen size={18} /> : <Mail size={18} />}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className={`truncate ${m.is_read ? '' : 'font-bold'}`}>{m.name}</span>
                      <span className="shrink-0 font-mono text-[11px] text-muted">{new Date(m.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </span>
                    <span className="block truncate text-sm text-muted">{open === m.id ? m.email : m.message}</span>
                  </span>
                </button>
                {open === m.id && (
                  <div className="px-4 pb-5 pl-11">
                    <p className="whitespace-pre-line text-sm leading-relaxed">{m.message}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: Pesan dari portfolio')}`} className="btn-primary !py-1.5 text-xs">
                        <Reply size={14} /> Balas
                      </a>
                      <button onClick={() => markRead(m, false)} className="btn-ghost !py-1.5 text-xs">
                        Tandai belum dibaca
                      </button>
                      <button onClick={() => remove(m)} className="btn-ghost !py-1.5 text-xs hover:!border-red-500 hover:!text-red-500">
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
