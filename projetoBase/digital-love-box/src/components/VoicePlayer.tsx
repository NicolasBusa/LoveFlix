import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VoicePlayer = () => (
  <section className="editorial-panel p-6 flex items-center gap-6">
    <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
      <Play size={20} fill="currentColor" />
    </button>
    <div className="flex-1 space-y-2">
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Mensagem de Voz.mp3</div>
      <div className="flex items-end gap-[2px] h-8">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [8, Math.random() * 32, 8] }}
            transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: 'easeInOut' }}
            className="flex-1 bg-primary/40 rounded-full"
          />
        ))}
      </div>
    </div>
  </section>
);

export default VoicePlayer;
