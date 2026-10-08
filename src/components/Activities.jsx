import { useState } from 'react';
import { ArrowUpRight, CalendarDays, Newspaper } from 'lucide-react';
import { Reveal, SectionHead, Slider } from './ui';
import Modal from './Modal';
import { useLang } from '../i18n';

function useFormatDate() {
  const { lang } = useLang();
  return (d) => {
    if (!d) return '';
    const date = new Date(d);
    return isNaN(date) ? d : date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };
}

function PostCard({ post, onOpen }) {
  const { t, tr } = useLang();
  const fmt = useFormatDate();
  const external = post.source_url && !tr(post, 'content');
  const Tag = external ? 'a' : 'button';
  const props = external ? { href: post.source_url, target: '_blank', rel: 'noopener noreferrer' } : { onClick: () => onOpen(post) };

  return (
    <Tag {...props} className="card group flex w-[82vw] max-w-[22rem] flex-col overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 sm:w-[22rem]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky">
        {post.image_url ? (
          <img src={post.image_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="dot-grid grid h-full place-items-center text-accent">
            <CalendarDays size={36} />
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1 text-xs font-bold shadow-soft">
          <CalendarDays size={12} className="text-accent" /> {fmt(post.published_at)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-accent">{tr(post, 'title')}</h3>
        {tr(post, 'summary') && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{tr(post, 'summary')}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-accent">
          {external ? `${t('cta.readOn')} ${post.source_name || 'web'}` : t('cta.readMore')}
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Tag>
  );
}

function PhotoCard({ photo }) {
  const { tr } = useLang();
  return (
    <figure className="group relative w-[66vw] max-w-[17rem] overflow-hidden rounded-3xl shadow-soft sm:w-[17rem]">
      <img src={photo.image_url} alt={tr(photo, 'caption') || ''} loading="lazy" className="aspect-[3/4] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      {tr(photo, 'caption') && (
        <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-surface/95 px-4 py-3 text-sm font-bold shadow-soft">{tr(photo, 'caption')}</figcaption>
      )}
    </figure>
  );
}

export default function Activities({ posts, media, photos }) {
  const { t, tr } = useLang();
  const fmt = useFormatDate();
  const [active, setActive] = useState(null);

  return (
    <section id="activities" className="bg-gradient-to-b from-paper via-sky/60 to-paper py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('activities.label')} title={t('activities.title')} color="sun" />
      </div>

      {posts.length + photos.length > 0 && (
        <Slider>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} onOpen={setActive} />
          ))}
          {photos.map((p) => (
            <PhotoCard key={p.id} photo={p} />
          ))}
        </Slider>
      )}

      {media.length > 0 && (
        <div className="container-x mt-16">
          <Reveal className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral/10 text-coral">
              <Newspaper size={18} />
            </span>
            <h3 className="text-xl font-bold">{t('activities.media')}</h3>
            <span className="text-sm text-muted">
              · {media.length} {t('activities.articles')}
            </span>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {media.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.05}>
                <a
                  href={m.source_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!m.source_url) {
                      e.preventDefault();
                      setActive(m);
                    }
                  }}
                  className="card group flex h-full items-center gap-4 p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-sky">
                    {m.image_url ? <img src={m.image_url} alt="" loading="lazy" className="h-full w-full object-cover" /> : <Newspaper className="m-auto mt-7 text-accent" size={24} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-muted">
                      <span className="text-accent">{m.source_name || 'News'}</span> · {fmt(m.published_at)}
                    </p>
                    <p className="mt-1 line-clamp-2 font-bold leading-snug transition-colors group-hover:text-accent">{tr(m, 'title')}</p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <article>
            {active.image_url && <img src={active.image_url} alt="" className="max-h-[50vh] w-full object-cover" />}
            <div className="p-6 sm:p-10">
              <p className="text-sm font-bold text-accent">{fmt(active.published_at)}</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{tr(active, 'title')}</h3>
              {tr(active, 'summary') && <p className="mt-4 text-lg leading-relaxed text-muted">{tr(active, 'summary')}</p>}
              {tr(active, 'content') && <div className="mt-6 whitespace-pre-line leading-relaxed">{tr(active, 'content')}</div>}
              {active.source_url && (
                <a href={active.source_url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
                  {t('cta.readOn')} {active.source_name || 'web'} <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}
