import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScratchOff from './ScratchOff';

const QUIZ_QUESTIONS = [
  { q: 'Qual foi o lugar do nosso primeiro beijo?', a: ['Parque', 'Cinema', 'Restaurante', 'Carro'], correct: 0 },
  { q: 'Qual comida eu mais amo pedir?', a: ['Pizza', 'Sushi', 'Hambúrguer', 'Tailandesa'], correct: 1 },
  { q: 'Qual nossa música?', a: ['Yellow', 'Lover', 'Perfect', 'Sintoma Amor'], correct: 0 },
];

const QuizLock = () => {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    if (idx === QUIZ_QUESTIONS[step].correct) {
      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep((s) => s + 1);
      } else {
        setComplete(true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#e11d48', '#fb7185', '#ffffff'] });
      }
    } else {
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(null), 500);
    }
  };

  if (complete) {
    return (
      <section className="editorial-panel p-8">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className=" space-y-6">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
            <Gift size={32} />
          </div>
          <h2 className="text-2xl font-serif">Você acertou tudo!</h2>
          <p className="text-muted-foreground">Como recompensa, aqui está algo especial:</p>
          <ScratchOff />
        </motion.div>
      </section>
    );
  }

  return (
    <section className="editorial-panel p-8 space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-xl font-serif">O quanto você me conhece?</h2>
        <span className="text-xs font-mono text-muted-foreground">{step + 1}/{QUIZ_QUESTIONS.length}</span>
      </div>
      <p className="text-lg">{QUIZ_QUESTIONS[step].q}</p>
      <div className="grid grid-cols-1 gap-3">
        {QUIZ_QUESTIONS[step].a.map((opt, i) => (
          <motion.button
            key={i}
            animate={shakeIdx === i ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={() => handleAnswer(i)}
            className={`w-full text-left p-4 rounded-none bg-transparent border transition-all text-sm ${shakeIdx === i ? 'border-primary' : 'border-foreground hover:border-primary/50'}`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default QuizLock;
