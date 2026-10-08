import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FileText, ImagePlus, Languages, Link2, Loader2, Sparkles, Trash2, X } from 'lucide-react';
import { uploadFile } from './storage';
import { fetchLinkMeta } from './fetchMeta';
import { translateValue } from './translate';

export const inputCls =
  'w-full rounded-xl border hairline bg-paper px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/10';

function TagsInput({ value = [], onChange, placeholder }) {
  const [draft, setDraft] = useState('');
  const add = (raw) => {
    const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) onChange([...new Set([...(value || []), ...parts])]);
    setDraft('');
  };
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-1.5 !py-2`}>
      {(value || []).map((t) => (
        <span key={t} className="flex items-center gap-1 rounded-lg bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
          {t}
          <button type="button" onClick={() => onChange(value.filter((v) => v !== t))} aria-label={`Hapus ${t}`}>
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add(draft);
          } else if (e.key === 'Backspace' && !draft && value?.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && add(draft)}
        placeholder={value?.length ? '' : placeholder}
        className="min-w-[8rem] flex-1 bg-transparent py-1 outline-none"
      />
    </div>
  );
}

function FileInput({ value, onChange, folder, accept = 'image/*', kind = 'image' }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const handle = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadFile(file, folder));
      toast.success('File terunggah');
    } catch (err) {
      toast.error(`Upload gagal: ${err.message}`);
    } finally {
      setBusy(false);
      ref.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handle(e.dataTransfer.files?.[0]);
        }}
        className="flex items-center gap-3 rounded-xl border border-dashed border-ink/20 bg-paper p-3"
      >
        <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg bg-ink/5 text-muted">
          {busy ? (
            <Loader2 className="animate-spin" size={20} />
          ) : value && kind === 'image' ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : value ? (
            <FileText size={24} className="text-accent" />
          ) : (
            <ImagePlus size={22} />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => ref.current.click()} disabled={busy} className="btn-primary !px-3.5 !py-1.5 text-xs">
              {value ? 'Ganti' : 'Upload'}
            </button>
            <button type="button" onClick={() => setShowUrl((s) => !s)} className="btn-ghost !px-3 !py-1.5 text-xs">
              <Link2 size={13} /> URL
            </button>
            {value && (
              <button type="button" onClick={() => onChange(null)} className="btn-ghost !px-3 !py-1.5 text-xs hover:!border-red-500 hover:!text-red-500">
                <Trash2 size={13} />
              </button>
            )}
          </div>
          <p className="truncate text-xs text-muted">{value ? value.split('/').pop() : 'Drag & drop atau klik Upload'}</p>
        </div>
        <input ref={ref} type="file" accept={accept} hidden onChange={(e) => handle(e.target.files?.[0])} />
      </div>
      {showUrl && <input className={inputCls} placeholder="https://..." value={value || ''} onChange={(e) => onChange(e.target.value || null)} />}
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex items-center gap-3 py-2 text-left text-sm">
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${value ? 'bg-accent' : 'bg-ink/15'}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
      </span>
      {label}
    </button>
  );
}

function MetaUrlInput({ value, onChange, onMeta, placeholder }) {
  const [busy, setBusy] = useState(false);
  const run = async () => {
    if (!value) return toast.error('Isi link dulu');
    setBusy(true);
    try {
      const meta = await fetchLinkMeta(value);
      onMeta(meta);
      toast.success('Data berita berhasil diambil — cek & sesuaikan bila perlu');
    } catch {
      toast.error('Tidak bisa mengambil data dari link ini. Isi manual saja.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex gap-2">
      <input type="url" className={inputCls} value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      <button type="button" onClick={run} disabled={busy} className="btn-primary shrink-0 !px-4 text-xs">
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} Ambil data
      </button>
    </div>
  );
}

export function FormFields({ fields, values, setValues, suggestions = {} }) {
  const set = (name) => (v) => setValues((prev) => ({ ...prev, [name]: v }));

  return (
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      {fields.map((f) => {
        const value = values[f.name];
        let input;
        switch (f.type) {
          case 'textarea':
            input = <textarea rows={f.rows || 4} className={`${inputCls} resize-y`} value={value || ''} placeholder={f.placeholder} onChange={(e) => set(f.name)(e.target.value)} />;
            break;
          case 'select':
            input = (
              <select className={inputCls} value={value || ''} onChange={(e) => set(f.name)(e.target.value)}>
                {f.options.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            );
            break;
          case 'tags':
            input = <TagsInput value={value} onChange={set(f.name)} placeholder={f.placeholder} />;
            break;
          case 'image':
            input = <FileInput value={value} onChange={set(f.name)} folder={f.folder} />;
            break;
          case 'file':
            input = <FileInput value={value} onChange={set(f.name)} folder={f.folder} accept={f.accept} kind="file" />;
            break;
          case 'toggle':
            input = <Toggle value={!!value} onChange={set(f.name)} label={f.label} />;
            break;
          default:
            input = f.fetchMeta ? (
              <MetaUrlInput value={value} onChange={set(f.name)} placeholder={f.placeholder} onMeta={(meta) => setValues((prev) => ({ ...prev, ...meta }))} />
            ) : (
              <>
                <input
                  type={f.type || 'text'}
                  className={inputCls}
                  value={value ?? ''}
                  placeholder={f.placeholder}
                  required={f.required}
                  list={f.suggestFrom ? `dl-${f.name}` : undefined}
                  onChange={(e) => set(f.name)(e.target.value)}
                />
                {f.suggestFrom && (
                  <datalist id={`dl-${f.name}`}>
                    {(suggestions[f.suggestFrom] || []).map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                )}
              </>
            );
        }

        return (
          <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
            {f.type !== 'toggle' && (
              <label className="mb-1.5 block text-xs font-semibold">
                {f.label} {f.required && <span className="text-accent">*</span>}
              </label>
            )}
            {input}
            {f.help && <p className="mt-1.5 text-xs leading-relaxed text-muted">{f.help}</p>}
          </div>
        );
      })}
    </div>
  );
}

const preview = (v) => {
  const s = Array.isArray(v) ? v.join(', ') : String(v ?? '');
  return s.length > 140 ? `${s.slice(0, 140)}…` : s;
};

// Form dengan tab Bahasa Indonesia / English. Versi Inggris disimpan di values.translations.en
export function BilingualFields({ fields, values, setValues, suggestions }) {
  const [lang, setLang] = useState('id');
  const [busy, setBusy] = useState(false);
  const translatable = fields.filter((f) => f.translate);
  const en = values.translations?.en || {};
  const filled = translatable.filter((f) => (Array.isArray(en[f.name]) ? en[f.name].length : en[f.name])).length;

  const setEn = (updater) =>
    setValues((prev) => {
      const current = prev.translations?.en || {};
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, translations: { ...(prev.translations || {}), en: next } };
    });

  const autoTranslate = async () => {
    const todo = translatable.filter((f) => (Array.isArray(values[f.name]) ? values[f.name].length : values[f.name]));
    if (!todo.length) return toast.error('Isi dulu versi Bahasa Indonesia');
    if (filled && !window.confirm('Timpa terjemahan Inggris yang sudah ada?')) return;
    setBusy(true);
    try {
      const result = {};
      for (const f of todo) result[f.name] = await translateValue(values[f.name]);
      setEn((cur) => ({ ...cur, ...result }));
      setLang('en');
      toast.success('Terjemahan selesai — cek & koreksi bila perlu');
    } catch {
      toast.error('Layanan terjemahan sedang sibuk, coba lagi nanti atau isi manual.');
    } finally {
      setBusy(false);
    }
  };

  if (!translatable.length) return <FormFields fields={fields} values={values} setValues={setValues} suggestions={suggestions} />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-paper p-1.5">
        <div className="flex gap-1">
          {[
            ['id', 'Bahasa Indonesia'],
            ['en', `English ${filled}/${translatable.length}`],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setLang(id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${lang === id ? 'bg-surface text-accent shadow-soft' : 'text-muted hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={autoTranslate} disabled={busy} className="btn-ghost !px-3.5 !py-2 text-xs">
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />} Terjemahkan otomatis
        </button>
      </div>

      {lang === 'id' ? (
        <FormFields fields={fields} values={values} setValues={setValues} suggestions={suggestions} />
      ) : (
        <>
          <p className="mb-5 rounded-xl bg-sky px-4 py-3 text-xs leading-relaxed text-accent">
            Versi Inggris tampil saat pengunjung memilih <b>EN</b>. Kolom yang dikosongkan otomatis memakai versi Indonesia.
          </p>
          <FormFields
            fields={translatable.map((f) => ({
              ...f,
              required: false,
              fetchMeta: false,
              half: false,
              label: `${f.label} (English)`,
              help: values[f.name] ? `ID: ${preview(values[f.name])}` : undefined,
            }))}
            values={en}
            setValues={setEn}
          />
        </>
      )}
    </div>
  );
}
