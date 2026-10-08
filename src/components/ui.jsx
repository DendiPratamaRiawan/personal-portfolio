import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

const DOTS = { accent: 'bg-accent', sun: 'bg-sun', mint: 'bg-mint', coral: 'bg-coral' };

export function SectionHead({ label, title, color = 'accent', center = false, children }) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-5 sm:mb-12 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-muted shadow-soft">
          <span className={`h-2 w-2 rounded-full ${DOTS[color]}`} />
          {label}
        </span>
        <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.1]">{title}</h2>
      </div>
      {children}
    </Reveal>
  );
}

export function Tabs({ tabs, value, onChange, id }) {
  return (
    <div className="no-scrollbar flex max-w-full gap-1 self-start overflow-x-auto rounded-full bg-surface p-1.5 shadow-soft md:shrink-0 md:self-auto">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            value === t.id ? 'text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {value === t.id && <motion.span layoutId={`tab-${id}`} className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
          <span className="relative">{t.label}</span>
          {t.count != null && <span className={`relative rounded-full px-1.5 text-[10px] ${value === t.id ? 'bg-white/25' : 'bg-ink/[0.06]'}`}>{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

// Slider horizontal: swipe / trackpad / tombol panah. Kartu bergeser masuk saat terlihat.
export function Slider({ children }) {
  const ref = useRef(null);
  const [nav, setNav] = useState({ prev: false, next: false, progress: 0 });
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setNav({ prev: el.scrollLeft > 4, next: el.scrollLeft < max - 4, progress: max > 0 ? el.scrollLeft / max : 1 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    const raf = requestAnimationFrame(update);
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, count]);

  const go = (dir) => {
    const el = ref.current;
    const slide = el.querySelector('[data-slide]');
    el.scrollBy({ left: dir * (slide ? slide.offsetWidth + 20 : el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const scrollable = nav.prev || nav.next;

  return (
    <div>
      <div ref={ref} className="slider-track">
        {Children.map(children, (child, i) => (
          <motion.div
            data-slide
            className="flex shrink-0 snap-start"
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {child}
          </motion.div>
        ))}
      </div>
      {scrollable && (
        <div className="container-x mt-4 flex items-center gap-5">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
            <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${Math.max(12, nav.progress * 100)}%` }} />
          </div>
          <div className="flex gap-2">
            {[
              [-1, nav.prev, ArrowLeft, 'Sebelumnya'],
              [1, nav.next, ArrowRight, 'Berikutnya'],
            ].map(([dir, enabled, Icon, aria]) => (
              <button
                key={dir}
                onClick={() => go(dir)}
                disabled={!enabled}
                aria-label={aria}
                className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink shadow-soft transition-all hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-35"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
