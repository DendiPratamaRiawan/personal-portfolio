// Logo portofolio: huruf "D" dengan simpul jaringan (hub kuning + 2 node) di dalamnya.
export function LogoMark({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#2F6BFF" />
      <path d="M14 12h9.5C30.4 12 36 17.4 36 24s-5.6 12-12.5 12H14z" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinejoin="round" />
      <path d="M20.5 24 28 19M20.5 24 28 29" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="19" r="2.2" fill="#fff" />
      <circle cx="28" cy="29" r="2.2" fill="#fff" />
      <circle cx="20.5" cy="24" r="3.2" fill="#FFC43D" />
    </svg>
  );
}

export default function Logo({ size = 40, light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className={`font-display text-xl font-bold leading-none tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        dendi<span className="text-accent">.</span>
        <span className={light ? 'text-sun' : 'text-accent'}>pr</span>
      </span>
    </span>
  );
}
