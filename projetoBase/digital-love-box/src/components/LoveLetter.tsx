import { motion } from 'framer-motion';
import loveLetterBg from '@/assets/love-letter-bg.jpg';

const LoveLetter = () => {
  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-none"
      >
        {/* Background image */}
        <img
          src={loveLetterBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        
        {/* Content */}
        <div className="relative editorial-panel p-8 md:p-10 space-y-6">
          <div className="">
            <h2 className="text-2xl font-serif mb-1">Uma Carta Para Você</h2>
            <div className="w-16 h-px bg-primary/40 mx-auto" />
          </div>
          
          <div className="font-handwritten text-xl md:text-2xl leading-relaxed text-foreground/90 space-y-4">
            <p>Meu amor,</p>
            <p>
              Eu poderia escrever mil páginas e ainda assim não seria o suficiente 
              para descrever o que você significa pra mim. Cada dia ao seu lado é 
              um capítulo novo da melhor história que eu já vivi.
            </p>
            <p>
              Você me ensinou que amor não é apenas sentimento — é escolha. 
              E eu escolho você, todos os dias, sem hesitar.
            </p>
            <p>
              Obrigado por cada risada, cada abraço apertado, cada "bom dia" 
              que faz meu coração acelerar mesmo depois de tanto tempo.
            </p>
            <p className="text-right text-primary/80 mt-6">
              Com todo meu amor, ∞
            </p>
          </div>

          {/* Decorative corner doodles */}
          <div className="absolute top-3 right-4 text-primary/15 text-3xl font-handwritten">♥</div>
          <div className="absolute bottom-3 left-4 text-primary/15 text-2xl font-handwritten">✿</div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
