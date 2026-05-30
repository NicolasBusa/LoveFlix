"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { login, signup, resetPassword } from './actions';
import { Mail, Lock, User, Phone, ArrowRight, Loader2, Check, X } from 'lucide-react';

type Mode = 'login' | 'signup' | 'forgot';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  
  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  // Password validation
  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  let strength = 0;
  if (hasLength) strength += 1;
  if (hasLetter) strength += 1;
  if (hasNumber) strength += 1;
  if (hasSymbol) strength += 1;

  let strengthLabel = 'Muito Fraca';
  let strengthColor = 'bg-neutral-600';
  let strengthTextColor = 'text-neutral-500';

  if (password.length > 0) {
    if (strength <= 2) {
      strengthLabel = 'Fraca';
      strengthColor = 'bg-red-500';
      strengthTextColor = 'text-red-400';
    } else if (strength === 3) {
      strengthLabel = 'Média';
      strengthColor = 'bg-yellow-500';
      strengthTextColor = 'text-yellow-400';
    } else if (strength === 4) {
      strengthLabel = 'Forte';
      strengthColor = 'bg-green-500';
      strengthTextColor = 'text-green-400';
    }
  }

  // Disable button if signing up and password is weak (Must be Forte = 4)
  const isSubmitDisabled = loading || (mode === 'signup' && strength < 4);

  const handleSubmit = () => {
    setLoading(true);
  };

  const getAction = () => {
    if (mode === 'login') return login;
    if (mode === 'signup') return signup;
    return resetPassword;
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-rose-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-red-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {mode === 'login' && 'Bem-vindo de volta'}
              {mode === 'signup' && 'Crie sua conta'}
              {mode === 'forgot' && 'Recuperar Senha'}
            </h1>
            <p className="text-neutral-400 text-sm">
              {mode === 'login' && 'Acesse seu painel para gerenciar o site.'}
              {mode === 'signup' && 'O primeiro passo para eternizar seus momentos.'}
              {mode === 'forgot' && 'Insira seu e-mail para receber um link de redefinição.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
              {message}
            </div>
          )}

          <form action={getAction()} onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="next" value={searchParams.get('next') || '/onboarding'} />
            
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label htmlFor="full_name" className="text-sm font-medium text-neutral-300 ml-1">Nome Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                      <User size={18} />
                    </div>
                    <input 
                      id="full_name" 
                      name="full_name" 
                      type="text" 
                      required 
                      placeholder="João da Silva"
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-white placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-neutral-300 ml-1">Telefone (WhatsApp)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                      <Phone size={18} />
                    </div>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="(11) 99999-9999"
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-white placeholder:text-neutral-600"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                  <Mail size={18} />
                </div>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="seu@email.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-white placeholder:text-neutral-600"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-neutral-300 ml-1">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                    <Lock size={18} />
                  </div>
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-white placeholder:text-neutral-600"
                  />
                </div>

                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-3 space-y-2 p-3 bg-black/30 rounded-xl border border-white/5 transition-all duration-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Força da senha:</span>
                      <span className={`font-semibold transition-colors duration-300 ${strengthTextColor}`}>{strengthLabel}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 1 ? strengthColor : 'bg-transparent'}`}></div>
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 2 ? strengthColor : 'bg-transparent'}`}></div>
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 3 ? strengthColor : 'bg-transparent'}`}></div>
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 4 ? strengthColor : 'bg-transparent'}`}></div>
                    </div>

                    {/* Checklist */}
                    <ul className="text-xs space-y-1.5 mt-2">
                      <li className={`flex items-center gap-2 transition-colors duration-300 ${hasLength ? 'text-green-400' : 'text-neutral-500'}`}>
                        {hasLength ? <Check size={12} /> : <X size={12} />} Mínimo de 8 caracteres
                      </li>
                      <li className={`flex items-center gap-2 transition-colors duration-300 ${hasLetter ? 'text-green-400' : 'text-neutral-500'}`}>
                        {hasLetter ? <Check size={12} /> : <X size={12} />} Pelo menos uma letra
                      </li>
                      <li className={`flex items-center gap-2 transition-colors duration-300 ${hasNumber ? 'text-green-400' : 'text-neutral-500'}`}>
                        {hasNumber ? <Check size={12} /> : <X size={12} />} Pelo menos um número
                      </li>
                      <li className={`flex items-center gap-2 transition-colors duration-300 ${hasSymbol ? 'text-green-400' : 'text-neutral-500'}`}>
                        {hasSymbol ? <Check size={12} /> : <X size={12} />} Pelo menos um símbolo (!@#$...)
                      </li>
                    </ul>
                  </div>
                )}
                
                {mode === 'login' && (
                  <div className="flex justify-end pt-1">
                    <button 
                      type="button"
                      onClick={() => { setMode('forgot'); setLoading(false); setPassword(''); }} 
                      className="text-xs text-neutral-500 hover:text-white transition-colors"
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitDisabled}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] mt-6 flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:bg-rose-600 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {mode === 'login' && 'Entrar na Conta'}
                  {mode === 'signup' && 'Criar Minha Conta'}
                  {mode === 'forgot' && 'Enviar Link de Recuperação'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-400">
            {mode === 'login' && (
              <p>
                Não possui uma conta?{' '}
                <button onClick={() => { setMode('signup'); setLoading(false); setPassword(''); }} className="text-rose-400 font-medium hover:text-rose-300 hover:underline">
                  Cadastre-se
                </button>
              </p>
            )}
            
            {(mode === 'signup' || mode === 'forgot') && (
              <p>
                Já possui uma conta?{' '}
                <button onClick={() => { setMode('login'); setLoading(false); setPassword(''); }} className="text-rose-400 font-medium hover:text-rose-300 hover:underline">
                  Fazer login
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
