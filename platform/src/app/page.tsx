import Link from 'next/link';
import { PlayCircle, Heart, Clock, Clapperboard, Lock, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 font-sans overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-rose-900/30 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] bg-red-900/20 rounded-full blur-[90px] md:blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-8 md:mb-10">
          <Sparkles size={14} className="text-rose-400" />
          Presente Inesquecível
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 max-w-4xl leading-[1.1]">
          Eternize sua história de amor em uma <br />
          <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-red-400">
            experiência cinematográfica.
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mb-10 font-light leading-relaxed">
          Um site exclusivo, protegido por senha, criado para emocionar. 
          Crie a sua plataforma no estilo LoveFlix, adicione suas fotos e a narrativa do casal, e nós fazemos a mágica acontecer.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="#pricing" 
            className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(229,9,20,0.3)] flex justify-center items-center"
          >
            Quero meu LoveFlix
          </Link>
          <Link 
            href="#loveflix" 
            className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <PlayCircle size={20} /> Ver Demonstração
          </Link>
        </div>
      </section>

      {/* Deep Dive: LoveFlix */}
      <section id="loveflix" className="relative z-10 py-16 md:py-20 px-6 border-t border-white/5 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Mockup Placeholder */}
            <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-md">
                  <PlayCircle size={32} className="text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4 flex gap-1.5 z-20">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 px-4 text-center">
                <Clapperboard size={48} className="mb-4 opacity-50 w-8 md:w-10 h-8 md:h-10" />
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase">Mockup LoveFlix (Desktop)</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight">Para casais que amam maratonar.</h3>
              <p className="text-neutral-400 text-sm md:text-base mb-8 leading-relaxed">
                Inspirado nas maiores plataformas de streaming do mundo. Uma interface escura, imersiva e feita para contar sua história em formato de episódios inesquecíveis.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-2 md:p-3 rounded-xl bg-red-500/10 text-red-500 shrink-0">
                    <PlayCircle size={20} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base mb-1">Modo Cinema</h4>
                    <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">Slideshow em tela cheia com a música que marcou o casal tocando ao fundo.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 md:p-3 rounded-xl bg-red-500/10 text-red-500 shrink-0">
                    <Clock size={20} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base mb-1">Linha do Tempo</h4>
                    <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">Relembre as datas mais importantes do relacionamento em cards dinâmicos.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 md:p-3 rounded-xl bg-red-500/10 text-red-500 shrink-0">
                    <Heart size={20} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base mb-1">Sessão Em Alta</h4>
                    <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">Galeria de &quot;Melhores Momentos&quot; categorizada como os filmes do momento.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section id="pricing" className="relative z-10 py-16 md:py-24 px-6 border-t border-white/5 bg-gradient-to-t from-[#0a0a0a] to-neutral-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Escolha o seu presente</h2>
            <p className="text-neutral-400 text-sm md:text-base">Hospedagem inclusa, domínio personalizado e acesso por senha.</p>
          </div>
          
          <div className="max-w-md mx-auto">
            {/* Card LoveFlix */}
            <div className="relative rounded-[2rem] bg-gradient-to-b from-neutral-800 to-neutral-900 border border-red-500/30 p-6 md:p-8 shadow-[0_0_40px_rgba(229,9,20,0.1)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(229,9,20,0.2)]">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-1">LOVEFLIX</h3>
                <p className="text-neutral-400 text-xs md:text-sm">A experiência cinematográfica completa.</p>
              </div>
              <div className="mb-6 md:mb-8">
                <span className="text-4xl font-bold">R$ 49</span>
                <span className="text-neutral-500">,90</span>
                <span className="text-xs text-neutral-500 ml-1">/ único</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm md:text-base text-neutral-300">
                <li className="flex items-center gap-3"><Shield size={16} className="text-red-500 shrink-0" /> Subdomínio Exclusivo</li>
                <li className="flex items-center gap-3"><Lock size={16} className="text-red-500 shrink-0" /> Proteção por Senha</li>
                <li className="flex items-center gap-3"><PlayCircle size={16} className="text-red-500 shrink-0" /> Modo Cinema c/ Música</li>
                <li className="flex items-center gap-3"><Clock size={16} className="text-red-500 shrink-0" /> Linha do Tempo Dinâmica</li>
              </ul>
              <Link href="/login?next=/builder" className="w-full py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] text-sm md:text-base flex justify-center items-center">
                Garantir Meu Acesso
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 text-center text-neutral-500 text-xs md:text-sm relative z-10">
        <p>© 2026 Surpresa Digital. Todos os direitos reservados.</p>
        <p className="mt-2">Feito com ❤️ para eternizar momentos.</p>
      </footer>

    </main>
  );
}
