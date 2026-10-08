import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, LayoutDashboard, Loader2, LogOut, Mail, Menu, ShieldAlert, UserRound, X } from 'lucide-react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import { LogoMark } from '../components/Logo';
import { RESOURCES } from './resources';
import Login from './Login';
import Dashboard from './Dashboard';
import ProfileForm from './ProfileForm';
import CrudManager from './CrudManager';
import Messages from './Messages';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Profil', icon: UserRound },
  ...Object.entries(RESOURCES).map(([id, r]) => ({ id, label: r.label, icon: r.icon })),
  { id: 'messages', label: 'Pesan masuk', icon: Mail },
];

function useHashPage() {
  const read = () => {
    const h = window.location.hash.slice(1);
    return NAV.some((n) => n.id === h) ? h : 'dashboard';
  };
  const [page, setPage] = useState(read);
  useEffect(() => {
    const onHash = () => setPage(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = useCallback((id) => {
    window.location.hash = id;
    window.scrollTo(0, 0);
  }, []);
  return [page, go];
}

function Screen({ children }) {
  return <div className="grid min-h-screen place-items-center bg-paper p-6 text-center">{children}</div>;
}

function Shell({ session }) {
  const [page, go] = useHashPage();
  const [menu, setMenu] = useState(false);
  const [unread, setUnread] = useState(0);

  const refreshUnread = useCallback(() => {
    supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
      .then(({ count }) => setUnread(count || 0));
  }, []);
  useEffect(refreshUnread, [refreshUnread]);

  const navigate = (id) => {
    go(id);
    setMenu(false);
  };

  const sidebar = (
    <nav className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <LogoMark size={36} />
          <div>
            <p className="font-display text-lg font-bold leading-tight">Panel Admin</p>
            <p className="text-xs text-muted">dendi.pr</p>
          </div>
        </div>
        <button onClick={() => setMenu(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5 lg:hidden" aria-label="Tutup menu">
          <X size={18} />
        </button>
      </div>
      <ul className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {NAV.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => navigate(id)}
              className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${page === id ? 'text-paper' : 'text-muted hover:bg-ink/5 hover:text-ink'}`}
            >
              {page === id && <motion.span layoutId="admin-nav" className="absolute inset-0 rounded-xl bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
              <Icon size={17} className="relative" />
              <span className="relative flex-1 text-left">{label}</span>
              {id === 'messages' && unread > 0 && <span className="relative rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">{unread}</span>}
            </button>
          </li>
        ))}
      </ul>
      <div className="space-y-1 border-t hairline p-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-ink/5 hover:text-ink">
          <ArrowUpRight size={17} /> Lihat website
        </a>
        <button onClick={() => supabase.auth.signOut()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-red-500/10 hover:text-red-500">
          <LogOut size={17} /> Keluar
        </button>
      </div>
    </nav>
  );

  const resource = RESOURCES[page];

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r hairline bg-surface lg:block">{sidebar}</aside>

      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenu(false)}>
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-72 bg-surface"
            >
              {sidebar}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b hairline bg-paper/80 px-4 py-3 backdrop-blur lg:hidden">
        <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper" aria-label="Buka menu">
          <Menu size={18} />
        </button>
        <p className="font-display font-bold">{NAV.find((n) => n.id === page)?.label}</p>
        <span className="w-10" />
      </header>

      <main className="px-4 py-8 sm:px-8 lg:ml-64 lg:py-10">
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {page === 'dashboard' && <Dashboard go={navigate} email={session.user.email} />}
              {page === 'profile' && <ProfileForm />}
              {page === 'messages' && <Messages onChange={refreshUnread} />}
              {resource && <CrudManager key={page} resource={resource} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    document.title = 'Panel | DPR';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    if (!isSupabaseReady) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase.rpc('is_admin').then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session]);

  const content = (() => {
    if (!isSupabaseReady)
      return (
        <Screen>
          <div className="max-w-md">
            <ShieldAlert className="mx-auto text-accent" size={36} />
            <h1 className="mt-4 text-2xl font-bold">Supabase belum dikonfigurasi</h1>
            <p className="mt-2 text-sm text-muted">
              Isi <code className="font-mono">VITE_SUPABASE_URL</code> dan <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> di file <code className="font-mono">.env</code>, lalu jalankan ulang server.
            </p>
          </div>
        </Screen>
      );
    if (session === undefined || (session && isAdmin === null))
      return (
        <Screen>
          <Loader2 className="animate-spin text-muted" />
        </Screen>
      );
    if (!session) return <Login />;
    if (!isAdmin)
      return (
        <Screen>
          <div className="max-w-md">
            <ShieldAlert className="mx-auto text-red-500" size={36} />
            <h1 className="mt-4 text-2xl font-bold">Akses ditolak</h1>
            <p className="mt-2 text-sm text-muted">
              Akun <b>{session.user.email}</b> belum terdaftar di tabel <code className="font-mono">admin_users</code>.
            </p>
            <button onClick={() => supabase.auth.signOut()} className="btn-primary mt-6">
              Keluar
            </button>
          </div>
        </Screen>
      );
    return <Shell session={session} />;
  })();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: 'rgb(var(--ink))', color: 'rgb(var(--paper))', borderRadius: '999px', fontSize: '14px' } }} />
      {content}
    </>
  );
}
