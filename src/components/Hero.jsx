import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Network, ShieldCheck, Wrench } from 'lucide-react';
import { SocialLinks } from './icons';
import { LogoMark } from './Logo';
import { useLang } from '../i18n';

const ROLE_STYLES = [
  { Icon: Wrench, cls: 'bg-sky text-accent' },
  { Icon: Network, cls: 'bg-mint/15 text-mint' },
  { Icon: ShieldCheck, cls: 'bg-sun/25 text-[#a86b00]' },
];

function Barcode({ seed }) {
  const bars = [...(seed + seed)].map((c, i) => ((c.charCodeAt(0) * (i + 3)) % 4) + 1);
  let x = 0;
  return (
    <svg viewBox={`0 0 ${bars.reduce((a, b) => a + b + 1.5, 0)} 30`} className="h-8 w-28" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y="0" width={w} height="30" fill="currentColor" />;
        x += w + 1.5;
        return rect;
      })}
    </svg>
  );
}

function IdCard({ profile }) {
  const { t, tr } = useLang();
  const role = tr(profile, 'roles')?.[0];
  const city = profile.location?.split(',')[0];

  return (
    <div className="relative flex justify-center">
      <motion.div
        initial={{ y: -220, rotate: -10, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60, damping: 8, mass: 1, delay: 0.15 }}
        style={{ transformOrigin: '50% 0%' }}
        className="flex flex-col items-center"
      >
        {/* Tali lanyard */}
        <div
          className="h-24 w-8 rounded-b-md sm:h-32"
          style={{ background: 'repeating-linear-gradient(180deg, #2F6BFF 0 18px, #255cf0 18px 20px)' }}
        />
        <div className="-mt-1 h-6 w-14 rounded-lg bg-gradient-to-b from-slate-200 to-slate-400 shadow ring-1 ring-black/10" />
        <div className="-mt-1 h-4 w-6 rounded-b-full border-[3px] border-t-0 border-slate-400" />

        <motion.div
          whileHover={{ rotate: -1.5, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="-mt-1 w-[18.5rem] overflow-hidden rounded-[28px] bg-surface shadow-[0_40px_80px_-30px_rgb(15_23_42/0.45)] ring-1 ring-ink/5 sm:w-[21rem]"
        >
          <div className="relative bg-accent px-5 pb-4 pt-7 text-white">
            <span className="absolute left-1/2 top-2.5 h-2 w-14 -translate-x-1/2 rounded-full bg-paper/90" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-lg font-bold">
                <LogoMark size={26} /> dendi.pr
              </span>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">{t('hero.card')}</span>
            </div>
          </div>

          <div className="dot-grid relative h-56 overflow-hidden bg-sky sm:h-64">
            <div className="absolute bottom-[-30%] left-1/2 h-[95%] w-[95%] -translate-x-1/2 rounded-full bg-sun" />
            {profile.photo_url && <img src={profile.photo_url} alt={profile.name} className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto max-w-none object-contain" />}
          </div>

          <div className="p-5">
            <p className="font-display text-xl font-bold leading-tight">{profile.name}</p>
            {role && <p className="mt-0.5 text-sm font-semibold text-accent">{role}</p>}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-paper p-3 text-xs">
              <div>
                <p className="font-semibold text-muted">{t('hero.location')}</p>
                <p className="mt-0.5 font-bold">{city}</p>
              </div>
              <div>
                <p className="font-semibold text-muted">{t('hero.status')}</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-bold">
                  <span className={`h-2 w-2 rounded-full ${profile.open_to_work ? 'bg-signal' : 'bg-coral'}`} />
                  {profile.open_to_work ? t('hero.available') : t('hero.unavailable')}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between text-ink/80">
              <Barcode seed={profile.name} />
              <span className="font-mono text-[11px] font-semibold text-muted">ID · DPR-{new Date().getFullYear()}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero({ data }) {
  const { t, tr } = useLang();
  const { profile, projects, certificates, experiences, skills } = data;
  const words = profile.name.split(' ');
  const last = words.length > 1 ? words.pop() : '';
  const roles = tr(profile, 'roles') || [];

  const gpa = experiences.map((e) => (tr(e, 'title') || '').match(/(?:IPK|GPA)[:\s]*([\d.]+)/i)).find(Boolean)?.[1];
  const stats = [
    { value: projects.length, label: t('hero.projects') },
    { value: certificates.length, label: t('hero.certificates') },
    gpa ? { value: gpa, label: t('hero.gpa') } : { value: `${skills.length}+`, label: t('hero.skills') },
  ];

  const fade = (delay) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' } });

  return (
    <section id="home" className="relative isolate overflow-hidden pb-16 pt-20 sm:pb-24">
      {/* latar cerah */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky via-paper to-paper" />
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-sun/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-64 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 pt-0 lg:order-1 lg:col-span-7 lg:pt-36">
          <motion.span {...fade(0.1)} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold shadow-soft">
            <span className="relative flex h-2.5 w-2.5">
              {profile.open_to_work && <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />}
              <span className={`relative h-2.5 w-2.5 rounded-full ${profile.open_to_work ? 'bg-signal' : 'bg-coral'}`} />
            </span>
            {profile.open_to_work ? t('hero.open') : t('hero.busy')}
          </motion.span>

          <motion.p {...fade(0.15)} className="mt-6 text-lg font-semibold text-muted">
            {t('hero.hello')}
          </motion.p>
          <motion.h1 {...fade(0.2)} className="mt-1 text-[clamp(2.6rem,6.5vw,4.9rem)] font-extrabold leading-[1.02]">
            {words.join(' ')} {last && <span className="marker px-1">{last}</span>}
          </motion.h1>

          {tr(profile, 'tagline') && (
            <motion.p {...fade(0.28)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {tr(profile, 'tagline')}
            </motion.p>
          )}

          <motion.div {...fade(0.34)} className="mt-6 flex flex-wrap gap-2">
            {roles.map((r, i) => {
              const { Icon, cls } = ROLE_STYLES[i % ROLE_STYLES.length];
              return (
                <span key={r} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold ${cls}`}>
                  <Icon size={15} /> {r}
                </span>
              );
            })}
          </motion.div>

          <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap items-center gap-3">
            {profile.cv_url && (
              <a href={profile.cv_url} download target="_blank" rel="noopener noreferrer" className="btn-primary !px-6 !py-3">
                <Download size={17} /> {t('cta.cv')}
              </a>
            )}
            <a href="#projects" className="btn-ghost group !px-6 !py-3">
              {t('cta.projects')} <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div {...fade(0.46)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <dl className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold">{s.value}</dd>
                  <dd className="text-sm font-medium text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
            <span className="hidden h-12 w-px bg-ink/10 sm:block" />
            <div>
              <SocialLinks profile={profile} className="-ml-2" />
              {profile.location && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} /> {profile.location}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <IdCard profile={profile} />
        </div>
      </div>
    </section>
  );
}
