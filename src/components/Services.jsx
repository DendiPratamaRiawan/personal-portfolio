import { ArrowUpRight, Cpu, Database, Globe, Headset, Network, ShieldCheck } from 'lucide-react';
import { Reveal, SectionHead } from './ui';
import { useLang } from '../i18n';

const STYLES = [
  { Icon: Network, cls: 'bg-sky text-accent' },
  { Icon: Headset, cls: 'bg-mint/15 text-mint' },
  { Icon: Globe, cls: 'bg-coral/15 text-coral' },
  { Icon: Database, cls: 'bg-sun/25 text-[#a86b00]' },
  { Icon: ShieldCheck, cls: 'bg-sky text-accent' },
  { Icon: Cpu, cls: 'bg-mint/15 text-mint' },
];

export default function Services({ services }) {
  const { t, tr } = useLang();
  if (!services.length) return null;

  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('services.label')} title={t('services.title')} color="mint" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const { Icon, cls } = STYLES[i % STYLES.length];
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.06} className="card group flex flex-col p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 ${cls}`}>
                    <Icon size={24} />
                  </span>
                  {s.level && <span className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-muted">{tr(s, 'level')}</span>}
                </div>
                <h3 className="mt-6 text-xl font-bold leading-snug">{tr(s, 'title')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(s, 'description')}</p>
              </Reveal>
            );
          })}
          <Reveal delay={0.12}>
            <a href="#contact" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-sun p-7 text-ink shadow-soft transition-transform duration-300 hover:-translate-y-1">
              <span className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/30" />
              <span className="grid h-12 w-12 place-items-center self-end rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </span>
              <div className="relative">
                <h3 className="text-2xl font-bold leading-tight">{t('services.more')}</h3>
                <p className="mt-2 text-sm font-medium text-ink/70">{t('services.moreText')}</p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
