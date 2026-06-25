'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await loginAction(password);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-[var(--fg)] flex items-center justify-center p-4 transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="max-w-md w-full bg-[var(--gold-muted)] border border-[var(--gold-border)] rounded-2xl p-8 shadow-2xl">
        <h1 className="font-serif text-3xl mb-6 text-center text-[var(--gold)]">Admin Access</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-sans tracking-wide text-[var(--fg)]/70 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--bg)] border border-[var(--gold-border)] rounded-lg px-4 py-3 text-[var(--fg)] focus:outline-none focus:border-[#c9a86a] transition-colors"
              placeholder="Enter password..."
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--gold-muted)]/70 hover:bg-[#c9a86a] hover:text-[#0B0B0B] border border-[var(--gold-border)] rounded-lg py-3 transition-all duration-300 font-semibold tracking-wide disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
