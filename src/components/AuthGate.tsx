import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../engine/supabase';
import { signIn, signUp, loadFromCloud } from '../engine/cloudSync';
import type { CloudData } from '../engine/cloudSync';

export function AuthGate({
  children,
  onCloudLoad,
}: {
  children: ReactNode;
  onCloudLoad: (data: CloudData) => void;
}) {
  // undefined = still checking, null = not logged in, Session = logged in
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fn = mode === 'login' ? signIn : signUp;
      const { data, error: authError } = await fn(email, password);

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.session) {
        const cloudData = await loadFromCloud();
        if (cloudData?.progress) {
          onCloudLoad(cloudData);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Still checking session
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  // Authenticated — render app
  if (session) {
    return <>{children}</>;
  }

  // Not authenticated — show login/register form
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🇮🇹</div>
          <h1 className="text-2xl font-bold text-text-bright">Italiano</h1>
          <p className="text-text-dim text-sm mt-1">Zaloguj się, aby synchronizować postępy</p>
        </div>

        <div className="bg-bg-card rounded-2xl border border-border p-6">
          {/* Mode tabs */}
          <div className="flex rounded-xl bg-bg overflow-hidden mb-6 border border-border">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === 'login' ? 'bg-accent text-bg' : 'text-text-dim hover:text-text'
              }`}
            >
              Zaloguj się
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === 'register' ? 'bg-accent text-bg' : 'text-text-dim hover:text-text'
              }`}
            >
              Zarejestruj się
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-text-dim block mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="twoj@email.com"
                className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-dim focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-sm text-text-dim block mb-1">Hasło</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="min. 6 znaków"
                className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-dim focus:outline-none focus:border-accent"
              />
            </div>

            {error && (
              <div className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '...' : mode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-dim mt-4">
          Twoje dane są bezpiecznie przechowywane w chmurze.
        </p>
      </div>
    </div>
  );
}
