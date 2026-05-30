import { motion } from 'framer-motion';
import { useMemo } from 'react';

const SYMBOLS = ['♥', '♡', '❤', '❥', '❣', '♥'];

interface Particle {
  id: number;
  symbol: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      x: Math.random() * 100,
      size: 8 + Math.random() * 14,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 20,
      opacity: 0.03 + Math.random() * 0.05, // Muito transparente e sutil
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-primary select-none"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            opacity: p.opacity,
            bottom: '-5vh', // Começa um pouco abaixo da tela
          }}
          animate={{
            y: [0, '-110vh'], // Sobe até sumir no topo
            x: [0, Math.sin(p.id) * 50], // Oscilação lateral suave
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
