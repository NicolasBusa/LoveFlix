import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function SucessoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative stars */}
      <div className="absolute top-20 left-1/4 text-white/10 animate-pulse">
        <Sparkles size={40} />
      </div>
      <div className="absolute bottom-32 right-1/4 text-red-500/10 animate-pulse delay-700">
        <Heart size={60} />
      </div>

      <div className="max-w-lg w-full bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] p-8 md:p-12 text-center relative z-10 animate-in fade-in zoom-in duration-700">
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 rounded-full animate-pulse" />
            <div className="w-24 h-24 bg-gradient-to-tr from-green-500/20 to-green-400/10 border border-green-500/30 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <CheckCircle className="text-green-400 w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-neutral-400 mb-8 leading-relaxed text-lg">
            Sua <span className="text-red-500 font-semibold">Surpresa Romântica</span> está quase pronta. O seu site exclusivo já está sendo processado em nossos servidores.
          </p>
          
          {/* Next Steps Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full mb-8 text-left shadow-inner">
            <h3 className="text-sm text-white font-semibold flex items-center gap-2 mb-3">
              <Mail className="text-red-500" size={18} />
              O que acontece agora?
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Nós acabamos de enviar um <strong className="text-white">e-mail com as informações da sua compra</strong>, incluindo o link de acesso seguro e a senha do seu site. 
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                <Sparkles size={14} />
              </div>
              <p className="text-xs text-neutral-500">
                Fique de olho na sua caixa de entrada (e verifique a pasta de spam, por precaução). Pode levar até 2 minutinhos.
              </p>
            </div>
          </div>
          
          <Link 
            href="/onboarding"
            className="group w-full bg-red-600 text-white rounded-full py-4 px-6 font-semibold flex items-center justify-center gap-2 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300"
          >
            Acessar Meus Presentes
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Footer / Logo branding */}
      <div className="mt-12 text-neutral-600 text-sm font-medium tracking-widest uppercase">
        Love<span className="text-red-600">Flix</span>
      </div>
    </div>
  );
}
