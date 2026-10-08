import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Check, Copy, Loader2, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { Reveal } from './ui';
import { SocialLinks } from './icons';
import { supabase, isSupabaseReady } from '../lib/supabase';
import { useLang } from '../i18n';

const FORMSPREE_URL = 'https://formspree.io/f/xrpbbraa';
const fieldCls =
  'w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3.5 outline-none transition placeholder:text-muted/60 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10';

function toWhatsApp(phone) {
  const digits = (phone || '').replace(/\D/g, '');
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
}

export default function Contact({ profile }) {
  const { t } = useLang();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success(t('contact.copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const { name, email, message } = Object.fromEntries(formData);

    const tasks = [
      fetch(FORMSPREE_URL, { method: 'POST', body: formData, headers: { Accept: 'application/json' } }).then((r) => {
        if (!r.ok) throw new Error('formspree');
      }),
    ];
    if (isSupabaseReady) {
      tasks.push(
        supabase
          .from('messages')
          .insert({ name, email, message })
          .then(({ error }) => {
            if (error) throw error;
          })
      );
    }
    const results = await Promise.allSettled(tasks);
    setLoading(false);
    if (results.some((r) => r.status === 'fulfilled')) {
      toast.success(t('contact.success'));
      formRef.current.reset();
    } else {
      toast.error(t('contact.failed'));
    }
  };

  const items = [
    profile.email && { Icon: Mail, label: 'Email', value: profile.email, action: copyEmail },
    profile.phone && { Icon: MessageCircle, label: t('contact.whatsapp'), value: profile.phone, href: `https://wa.me/${toWhatsApp(profile.phone)}` },
    profile.location && { Icon: MapPin, label: t('contact.location'), value: profile.location },
  ].filter(Boolean);

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="relative isolate grid grid-cols-1 gap-10 overflow-hidden rounded-[2rem] bg-accent p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border-[40px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-sun/30 blur-3xl" />

          <div className="flex flex-col text-white">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-sun" />
              {t('contact.label')}
            </span>
            <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05]">{t('contact.title')}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/80">{t('contact.text')}</p>

            <div className="mt-8 space-y-3">
              {items.map(({ Icon, label, value, href, action }) => {
                const Wrapper = href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={label}
                    {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-3.5 transition-colors hover:bg-white/15"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-accent">
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold text-white/65">{label}</span>
                      <span className="block truncate font-semibold">{value}</span>
                    </span>
                    {action && (
                      <button onClick={action} aria-label="Salin" className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/15">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    )}
                  </Wrapper>
                );
              })}
            </div>
            <SocialLinks profile={profile} className="-ml-2 mt-6" itemClassName="!text-white/80 hover:!bg-white/15 hover:!text-white" />
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 self-start rounded-3xl bg-surface p-6 shadow-[0_30px_60px_-25px_rgb(15_23_42/0.5)] sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">{t('contact.name')}</span>
                <input name="name" required placeholder={t('contact.namePh')} className={fieldCls} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">{t('contact.email')}</span>
                <input name="email" type="email" required placeholder="you@mail.com" className={fieldCls} />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">{t('contact.message')}</span>
              <textarea name="message" required rows={6} placeholder={t('contact.messagePh')} className={`${fieldCls} resize-none`} />
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-4 disabled:opacity-60">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
              {loading ? t('cta.sending') : t('cta.send')}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
