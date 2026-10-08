import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useLang } from '../i18n';

export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex rounded-full bg-ink/[0.05] p-1 text-xs font-bold ${className}`} role="group" aria-label="Bahasa / Language">
      {['id', 'en'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative rounded-full px-3 py-1.5 uppercase transition-colors ${lang === l ? 'text-white' : 'text-muted hover:text-ink'}`}
        >
          {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 450, damping: 35 }} />}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}

export default function Navbar({ links }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: '-40% 0px -55% 0px',
    });
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [links]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4 ${
          scrolled || open ? 'bg-surface/90 shadow-soft ring-1 ring-ink/5 backdrop-blur-lg' : ''
        }`}
      >
        <a href="#home" onClick={() => setOpen(false)} aria-label="Home">
          <Logo size={38} />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${active === l.id ? 'bg-sky text-accent' : 'text-muted hover:text-ink'}`}
              >
                {t(`nav.${l.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <a href="#contact" className="btn-primary hidden !py-2 sm:inline-flex">
            {t('cta.contact')}
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white xl:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl bg-surface p-3 shadow-soft ring-1 ring-ink/5 xl:hidden"
          >
            <ul className="grid grid-cols-2 gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 font-semibold ${active === l.id ? 'bg-sky text-accent' : 'hover:bg-paper'}`}
                  >
                    {t(`nav.${l.id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              {t('cta.contact')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
