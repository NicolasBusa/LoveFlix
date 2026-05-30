import { motion } from 'framer-motion';

const PROMISES = [
  { emoji: '🌅', text: 'Sempre assistir o pôr do sol juntos quando pudermos' },
  { emoji: '☕', text: 'Preparar seu café do jeito que você gosta toda manhã' },
  { emoji: '🎵', text: 'Nunca parar de criar playlists para nós' },
  { emoji: '🤝', text: 'Segurar sua mão nos momentos difíceis e nos fáceis' },
  { emoji: '✈️', text: 'Viajar o mundo inteiro ao seu lado' },
  { emoji: '💌', text: 'Sempre dizer "eu te amo" antes de dormir' },
];

const PromisesList = () => {
  return (
    <section className="space-y-6">
      <div className=" space-y-2">
        <h2 className="text-2xl font-serif">Minhas Promessas</h2>
        <p className="font-handwritten text-xl text-muted-foreground">coisas que prometo pra sempre ✦</p>
      </div>

      <div className="space-y-3">
        {PROMISES.map((promise, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="editorial-panel p-4 flex items-center gap-4"
          >
            <span className="text-2xl shrink-0">{promise.emoji}</span>
            <p className="font-handwritten text-lg text-foreground/85">{promise.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PromisesList;
