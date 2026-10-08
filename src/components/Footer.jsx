import { ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { SocialLinks } from './icons';
import { useLang } from '../i18n';

export default function Footer({ profile, links }) {
  const { t, tr } = useLang();
  return (
    <footer className="bg-surface">
      <div className="container-x grid grid-cols-1 gap-8 py-12 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div>
          <Logo size={40} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{tr(profile, 'tagline')}</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="text-muted hover:text-accent">
                {t(`nav.${l.id}`)}
              </a>
            </li>
          ))}
        </ul>
        <SocialLinks profile={profile} className="-ml-2 md:ml-0" />
      </div>
      <div className="border-t hairline">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name}. {t('footer.rights')}
          </span>
          <a href="#home" className="inline-flex items-center gap-2 font-semibold hover:text-accent">
            {t('cta.backTop')} <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
