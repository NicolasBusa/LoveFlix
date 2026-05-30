import Link from 'next/link';
import { ShoppingCart, Mail, Settings, Sparkles, ChevronRight } from 'lucide-react';

export default function ComoFunciona() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 font-sans overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="absolute top-[20%] right-[10%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-rose-900/20 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[70vw] h-[70vw] md:w-[30vw] md:h-[30vw] bg-red-900/10 rounded-full blur-[90px] md:blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Header */}
      <section className="relative z-10 pt-20 md:pt-24 pb-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 md:mb-6 leading-tight">
          Seu presente pronto em <br className="md:hidden" />
          <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-red-400">minutos.</span>
        </h1>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          Criamos um processo totalmente automatizado para que você foque apenas no que importa: emocionar quem você ama.
        </p>
      </section>

      {/* Steps */}
      <section className="relative z-10 pb-20 md:pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="relative p-6 md:p-8 rounded-[2rem] bg-neutral-900/50 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row gap-6 md:gap-8 items-center text-center sm:text-left group hover:bg-neutral-800/50 transition-all duration-500">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform duration-500">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">1. Escolha o Presente</h3>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                  Acesse nossa página inicial, garanta seu acesso à experiência LoveFlix, e realize o pagamento seguro de forma rápida.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 md:p-8 rounded-[2rem] bg-neutral-900/50 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row gap-6 md:gap-8 items-center text-center sm:text-left group hover:bg-neutral-800/50 transition-all duration-500">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform duration-500">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">2. Acesso Exclusivo</h3>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                  Imediatamente após a aprovação do pagamento, nossa automação envia um e-mail com a sua senha secreta de acesso e o link para o painel de edição.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 md:p-8 rounded-[2rem] bg-neutral-900/50 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row gap-6 md:gap-8 items-center text-center sm:text-left group hover:bg-neutral-800/50 transition-all duration-500">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform duration-500">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">3. Personalize a História</h3>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                  No painel de Onboarding, você escolhe qual será o subdomínio do site, envia as melhores fotos de vocês e escreve a narrativa do casal.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-rose-950/40 to-red-950/40 border border-rose-500/30 backdrop-blur-sm flex flex-col sm:flex-row gap-6 md:gap-8 items-center text-center sm:text-left group hover:bg-rose-950/60 transition-all duration-500 shadow-[0_0_30px_rgba(225,29,72,0.1)]">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-rose-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-rose-600/50">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">4. Surpreenda!</h3>
                <p className="text-sm md:text-base text-rose-200/80 leading-relaxed">
                  Assim que salvar, o site entra no ar instantaneamente. Basta enviar o link e a senha para o seu amor e preparar os lencinhos para a emoção.
                </p>
              </div>
              <Link href="/#pricing" className="mt-2 md:mt-0 w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 shrink-0">
                Começar <ChevronRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 md:py-12 px-6 text-center text-neutral-500 text-xs md:text-sm relative z-10">
        <p>© 2026 Surpresa Digital. Todos os direitos reservados.</p>
        <p className="mt-2">Feito com ❤️ para eternizar momentos.</p>
      </footer>

    </main>
  );
}
