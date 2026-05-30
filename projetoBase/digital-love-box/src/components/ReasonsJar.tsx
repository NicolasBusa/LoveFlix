import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const REASONS = [
  "O jeito que você sorri com os olhos quando está feliz.",
  "Sua paciência infinita para me ouvir falar sobre o dia.",
  "Como você sempre sabe qual música eu quero ouvir.",
  "A segurança que sinto apenas por estar ao seu lado.",
  "Sua determinação em conquistar seus sonhos.",
  "O carinho com que você faz as pequenas coisas.",
  "Como você transforma dias difíceis em momentos leves.",
  "O jeito que você me abraça quando sente que preciso.",
  "Suas piadas ruins que me fazem rir mesmo assim.",
  "Como você lembra de cada detalhe que eu conto.",
];

const ReasonsJar = () => {
  const [reason, setReason] = useState(REASONS[0]);

  const next = () => {
    let r: string;
    do { r = REASONS[Math.floor(Math.random() * REASONS.length)]; } while (r === reason);
    setReason(r);
  };

  return (
    <section className=" space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif">Pote de Motivos</h2>
        <p className="font-handwritten text-xl text-muted-foreground">por que eu amo você? 🫙</p>
      </div>

      <div className="editorial-panel p-8 min-h-[140px] flex items-center justify-center relative">
        {/* Decorative corners */}
        <span className="absolute top-2 left-3 text-primary/15 font-handwritten text-2xl">✿</span>
        <span className="absolute bottom-2 right-3 text-primary/15 font-handwritten text-2xl">♥</span>
        
        <AnimatePresence mode="wait">
          <motion.p
            key={reason}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-handwritten text-primary/80 leading-relaxed"
          >
            "{reason}"
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        onClick={next}
        className="mx-auto flex items-center gap-2 font-handwritten text-lg text-muted-foreground hover:text-primary transition-colors"
      >
        Sortear outro motivo <ChevronRight size={14} />
      </button>
    </section>
  );
};

export default ReasonsJar;
