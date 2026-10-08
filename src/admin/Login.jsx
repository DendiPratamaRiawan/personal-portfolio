import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { LogoMark } from '../components/Logo';
import { supabase } from '../lib/supabase';
import { inputCls } from './Fields';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message === 'Invalid login credentials' ? 'Email atau password salah.' : error.message);
  };

  return (
    <div className="dot-grid grid min-h-screen place-items-center bg-paper px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl border hairline bg-surface p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.3)] sm:p-8"
      >
        <LogoMark size={48} />
        <h1 className="mt-6 text-2xl font-bold">Masuk panel</h1>
        <p className="mt-1 text-sm text-muted">Khusus pemilik website.</p>

        <div className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold">Email</label>
            <input type="email" required autoComplete="username" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className={`${inputCls} pr-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-label="Lihat password">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary w-full !py-3">
            {busy && <Loader2 size={16} className="animate-spin" />} Masuk
          </button>
        </div>
      </motion.form>
    </div>
  );
}
