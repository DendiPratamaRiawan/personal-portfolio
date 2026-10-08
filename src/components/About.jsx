import { useMemo } from 'react';
import { CheckCircle2, Cloud, Code2, GraduationCap, Headset, Mail, MapPin, Shield } from 'lucide-react';
import { Reveal, SectionHead } from './ui';
import { useLang } from '../i18n';

const PALETTE = [
  { Icon: Shield, bg: 'bg-accent', soft: 'bg-sky', text: 'text-accent' },
  { Icon: Headset, bg: 'bg-mint', soft: 'bg-mint/10', text: 'text-mint' },
  { Icon: Code2, bg: 'bg-coral', soft: 'bg-coral/10', text: 'text-coral' },
  { Icon: Cloud, bg: 'bg-sun', soft: 'bg-sun/15', text: 'text-[#a86b00]' },
];

export function About({ profile, experiences }) {
  const { t, tr } = useLang();
  const [lead, ...rest] = (tr(profile, 'about') || '').split(/(?<=\.)\s+/);
  const edu = experiences.find((e) => e.type === 'education');

  const info = [
    edu && { Icon: GraduationCap, label: t('about.education'), value: edu.subtitle, sub: tr(edu, 'title') },
    profile.location && { Icon: MapPin, label: t('about.location'), value: profile.location },
    profile.email && { Icon: Mail, label: t('about.email'), value: profile.email, href: `mailto:${profile.email}` },
  ].filter(Boolean);

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('about.label')} title={t('about.title')} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Reveal className="card p-7 sm:p-10 lg:col-span-7">
            {lead && <p className="font-display text-2xl font-semibold leading-snug sm:text-[1.65rem]">{lead}</p>}
            {rest.length > 0 && <p className="mt-5 leading-relaxed text-muted">{rest.join(' ')}</p>}
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            {tr(profile, 'highlights')?.length > 0 && (
              <Reveal delay={0.08} className="card bg-accent p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-wider text-white/70">{t('about.focus')}</p>
                <ul className="mt-4 space-y-3">
                  {tr(profile, 'highlights').map((h) => (
                    <li key={h} className="flex items-center gap-3 font-semibold">
                      <CheckCircle2 size={20} className="shrink-0 text-sun" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Reveal delay={0.14} className="card divide-y divide-ink/[0.06] px-7 py-2">
              {info.map(({ Icon, label, value, sub, href }) => (
                <div key={label} className="flex items-start gap-4 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-accent">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="block truncate font-semibold hover:text-accent">
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold">{value}</p>
                    )}
                    {sub && <p className="text-sm text-muted">{sub}</p>}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills({ skills }) {
  const { t, tr } = useLang();
  const groups = useMemo(() => {
    const map = new Map();
    skills.forEach((s) => {
      const key = s.category || 'General';
      if (!map.has(key)) map.set(key, { label: tr(s, 'category') || key, items: [] });
      map.get(key).items.push(tr(s, 'name'));
    });
    return [...map.values()];
  }, [skills, tr]);

  if (!groups.length) return null;

  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('skills.label')} title={t('skills.title')} color="mint">
          <p className="text-sm font-semibold text-muted">
            <span className="font-display text-3xl font-bold text-ink">{skills.length}</span> {t('skills.count')}
          </p>
        </SectionHead>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => {
            const p = PALETTE[i % PALETTE.length];
            return (
              <Reveal key={g.label} delay={i * 0.06} className="card group p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${p.bg}`}>
                  <p.Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{g.label}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((n) => (
                    <span key={n} className={`rounded-lg px-2.5 py-1 text-[13px] font-medium ${p.soft} ${p.text}`}>
                      {n}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
