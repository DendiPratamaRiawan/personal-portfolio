import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, GraduationCap, HeartHandshake, Users } from 'lucide-react';
import { SectionHead, Tabs } from './ui';
import { useLang } from '../i18n';

const TYPES = [
  { id: 'work', Icon: Briefcase },
  { id: 'education', Icon: GraduationCap },
  { id: 'organization', Icon: Users },
  { id: 'volunteer', Icon: HeartHandshake },
];

export default function Experience({ experiences }) {
  const { t, tr } = useLang();
  const tabs = TYPES.map((x) => ({ ...x, label: t(`experience.${x.id}`), count: experiences.filter((e) => e.type === x.id).length })).filter((x) => x.count);
  const [selected, setSelected] = useState('work');
  const tab = tabs.some((x) => x.id === selected) ? selected : tabs[0]?.id;
  const items = experiences.filter((e) => e.type === tab);
  const Icon = TYPES.find((x) => x.id === tab)?.Icon || Briefcase;

  if (!tabs.length) return null;

  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('experience.label')} title={t('experience.title')} color="coral">
          <Tabs id="exp" tabs={tabs} value={tab} onChange={setSelected} />
        </SectionHead>

        <AnimatePresence mode="wait">
          <motion.ol
            key={tab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="relative grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {items.map((e) => (
              <li key={e.id} className="card flex gap-5 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky text-accent">
                  <Icon size={21} />
                </span>
                <div className="min-w-0">
                  {e.date_label && <span className="inline-block rounded-full bg-sun/25 px-3 py-0.5 text-xs font-bold text-[#8a5800]">{tr(e, 'date_label')}</span>}
                  <h3 className="mt-2 text-lg font-bold leading-snug sm:text-xl">{tr(e, 'title')}</h3>
                  {e.subtitle && <p className="mt-0.5 font-medium text-muted">{tr(e, 'subtitle')}</p>}
                  {tr(e, 'description') && <p className="mt-3 text-sm leading-relaxed text-muted">{tr(e, 'description')}</p>}
                </div>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
