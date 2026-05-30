'use client';

import { useState } from 'react';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function PasswordLock({ 
  onUnlock 
}: { 
  onUnlock: (password: string) => Promise<boolean> 
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    setLoading(true);
    setError(false);
    
    const success = await onUnlock(password);
    
    if (!success) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4 font-sans relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative w-full max-w-md bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
            <Lock className="w-8 h-8 text-neutral-300" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
          <p className="text-neutral-400 text-sm">
            Este é um presente privado. Por favor, insira a senha para acessar o conteúdo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className={`relative flex items-center transition-all ${error ? 'animate-shake' : ''}`}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Digite a senha..."
                className={`w-full bg-black/50 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-rose-500/50'} rounded-2xl py-4 pl-5 pr-14 outline-none transition-colors text-white placeholder:text-neutral-600`}
              />
              <button
                type="submit"
                disabled={!password || loading}
                className="absolute right-2 p-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-xl transition-colors text-white"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center mt-3 animate-in fade-in slide-in-from-top-1">
                Senha incorreta. Tente novamente.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
