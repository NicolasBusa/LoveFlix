import { motion } from 'framer-motion';

const MEMORIES = [
  { date: '12 Jun 2023', title: 'O Primeiro Encontro', desc: 'Aquele café que durou 4 horas e parecia ter acabado de começar. Saímos de lá sabendo que algo especial tinha nascido.', emoji: '☕' },
  { date: '28 Jul 2023', title: 'Primeira Noite de Filmes', desc: 'Maratona de filmes, pipoca queimada e risadas até as 3 da manhã. O filme era horrível, mas a companhia era perfeita.', emoji: '🎬' },
  { date: '15 Ago 2023', title: 'A Primeira Viagem', desc: 'O pôr do sol na serra e a playlist que virou nossa trilha sonora. Foram 500km de estrada e zero silêncios constrangedores.', emoji: '🏔️' },
  { date: '10 Out 2023', title: 'O Dia da Chuva', desc: 'Ficamos presos na chuva sem guarda-chuva. Corremos feito loucos e rimos até doer a barriga.', emoji: '🌧️' },
  { date: '24 Dez 2023', title: 'Nosso Primeiro Natal', desc: 'Troca de presentes e a certeza de que queríamos todos os próximos juntos. Seu sorriso ao abrir o presente... inesquecível.', emoji: '🎄' },
  { date: '31 Dez 2023', title: 'Réveillon Juntos', desc: 'Fogos de artifício e um beijo à meia-noite. O começo do melhor ano das nossas vidas.', emoji: '🎆' },
];

const MemoryTimeline = () => (
  <section className="space-y-8">
    <div className=" space-y-2">
      <h2 className="text-2xl font-serif">Nossa Jornada</h2>
      <p className="font-handwritten text-xl text-muted-foreground">cada momento conta ✦</p>
    </div>
    <div className="relative border-l-2 border-dashed border-primary/20 ml-6 space-y-10">
      {MEMORIES.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="relative pl-10"
        >
          {/* Pin dot */}
          <div className="absolute -left-[9px] top-1 w-4 h-4 bg-primary rounded-full ring-4 ring-background shadow-md" />
          
          {/* Emoji badge */}
          <span className="absolute -left-[28px] top-6 text-lg">{m.emoji}</span>
          
          <div className="editorial-panel p-5 space-y-2">
            <span className="font-handwritten text-base text-primary/80">{m.date}</span>
            <h3 className="text-lg font-bold">{m.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default MemoryTimeline;
