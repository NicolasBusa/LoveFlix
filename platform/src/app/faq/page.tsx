"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Quanto tempo o site fica no ar?",
      answer: "O site do casal ficará disponível no ar por exatamente 1 ano após a data de criação. Durante todo esse período, vocês poderão acessar os momentos inesquecíveis sempre que quiserem através do seu subdomínio exclusivo."
    },
    {
      question: "Posso alterar as fotos ou a história depois?",
      answer: "Sim! Após a compra, você terá acesso a um painel privado de Onboarding onde poderá atualizar os textos, a linha do tempo e substituir as fotografias do seu site surpresa."
    },
    {
      question: "Quem poderá ver as nossas fotos?",
      answer: "Apenas quem possuir a senha de acesso. O site é gerado sob um subdomínio privado e possui uma tela de login antes de exibir qualquer conteúdo, garantindo total privacidade para o casal."
    },
    {
      question: "Quanto tempo demora para ficar pronto?",
      answer: "É instantâneo! Nosso sistema é totalmente automatizado. Após o pagamento ser aprovado e você preencher os dados no painel, o site é gerado e fica online no mesmo segundo."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Aceitamos pagamentos com segurança através do Stripe, o que inclui as principais bandeiras de cartão de crédito e PIX."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 font-sans overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-rose-900/10 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] bg-red-900/10 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Header */}
      <section className="relative z-10 pt-20 md:pt-24 pb-12 md:pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 md:mb-6 leading-tight">
          Perguntas <br className="md:hidden" />
          <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-red-400">Frequentes</span>
        </h1>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          Tire todas as suas dúvidas sobre a criação do site surpresa.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="relative z-10 pb-20 md:pb-32 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className="p-6 md:p-8 rounded-[2rem] bg-neutral-900/30 border border-white/5 hover:bg-neutral-900/70 hover:border-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <p className="text-sm md:text-base text-neutral-400 mb-4 md:mb-6">Ainda tem dúvidas? Fale conosco.</p>
            <Link href="/#pricing" className="inline-block w-full sm:w-auto px-8 py-4 rounded-full bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] text-sm md:text-base">
              Quero criar meu site
            </Link>
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
