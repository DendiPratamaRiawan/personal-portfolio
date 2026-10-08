import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BilingualFields, FormFields } from './Fields';

const TEXT_FIELDS = [
  { name: 'name', label: 'Nama lengkap', type: 'text', required: true },
  {
    name: 'tagline',
    label: 'Deskripsi singkat di bawah nama',
    type: 'textarea',
    rows: 3,
    translate: true,
    help: 'Tampil besar di bagian paling atas website, tepat di bawah nama kamu. 1–2 kalimat.',
  },
  { name: 'roles', label: 'Peran / jabatan', type: 'tags', translate: true, placeholder: 'IT Support Specialist', help: 'Peran pertama juga tampil di kartu ID.' },
  { name: 'about', label: 'Tentang saya', type: 'textarea', rows: 7, translate: true, help: 'Kalimat pertama tampil lebih besar di section Tentang.' },
  { name: 'highlights', label: 'Fokus utama', type: 'tags', translate: true, help: 'Tampil di kotak biru "Fokus saya".' },
  { name: 'open_to_work', label: 'Tampilkan status "Terbuka untuk peluang kerja"', type: 'toggle' },
];

const FILE_FIELDS = [
  { name: 'photo_url', label: 'Foto profil (PNG latar transparan paling bagus)', type: 'image', folder: 'profile', half: true },
  { name: 'cv_url', label: 'File CV (PDF) — upload untuk mengganti', type: 'file', accept: 'application/pdf', folder: 'profile', half: true },
];

const CONTACT_FIELDS = [
  { name: 'email', label: 'Email', type: 'email', half: true },
  { name: 'phone', label: 'No. WhatsApp', type: 'text', half: true },
  { name: 'location', label: 'Lokasi', type: 'text' },
  { name: 'github', label: 'GitHub', type: 'url', half: true },
  { name: 'linkedin', label: 'LinkedIn', type: 'url', half: true },
  { name: 'instagram', label: 'Instagram', type: 'url', half: true },
];

export default function ProfileForm() {
  const [values, setValues] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('profile')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setValues(data || { roles: [], highlights: [], open_to_work: true, translations: {} });
      });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (!values.name) return toast.error('Nama wajib diisi');
    setSaving(true);
    const { updated_at, ...rest } = values; // eslint-disable-line no-unused-vars
    const { error } = await supabase.from('profile').upsert({ ...rest, id: 1, translations: rest.translations || {} });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success('Profil tersimpan');
  };

  if (!values) {
    return (
      <div className="grid place-items-center py-24 text-muted">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const sections = [
    { title: 'Teks utama', note: 'Bisa diisi dalam Bahasa Indonesia & English', body: <BilingualFields fields={TEXT_FIELDS} values={values} setValues={setValues} /> },
    { title: 'Foto & CV', body: <FormFields fields={FILE_FIELDS} values={values} setValues={setValues} /> },
    { title: 'Kontak & sosial media', body: <FormFields fields={CONTACT_FIELDS} values={values} setValues={setValues} /> },
  ];

  return (
    <form onSubmit={save}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-mono">Data utama</p>
          <h1 className="mt-1 text-3xl font-bold">Profil</h1>
        </div>
        <button type="submit" disabled={saving} className="btn-primary self-start">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Simpan profil
        </button>
      </div>
      <div className="space-y-5">
        {sections.map((s) => (
          <section key={s.title} className="rounded-2xl border hairline bg-surface p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold">{s.title}</h2>
              {s.note && <p className="text-xs text-muted">{s.note}</p>}
            </div>
            {s.body}
          </section>
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 flex justify-end">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Simpan profil
        </button>
      </div>
    </form>
  );
}
