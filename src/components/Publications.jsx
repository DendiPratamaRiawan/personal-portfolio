import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Reveal, SectionHead } from './ui';
import { useLang } from '../i18n';

function Authors({ text, highlight }) {
  if (!highlight || !text?.includes(highlight)) return text;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <b className="font-semibold text-ink">{highlight}</b>
      {after}
    </>
  );
}

export default function Publications({ items, ownerName }) {
  const { t, tr } = useLang();
  if (!items.length) return null;

  return (
    <section id="publications" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('publications.label')} title={t('publications.title')} color="coral" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((pub, i) => (
            <Reveal key={pub.id} delay={(i % 2) * 0.06} className="card group flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral/15 text-coral">
                  <BookOpen size={22} />
                </span>
                {pub.date_label && <span className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-muted">{pub.date_label}</span>}
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug">{tr(pub, 'title')}</h3>
              {pub.authors && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <Authors text={pub.authors} highlight={ownerName} />
                </p>
              )}
              {pub.venue && <p className="mt-2 text-sm italic text-muted">{pub.venue}</p>}
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-bold text-accent hover:underline"
                >
                  {t('publications.read')} <ArrowUpRight size={15} />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
