import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Plane, UtensilsCrossed, Drama, Home, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type Category = 'Viagens' | 'Gastronomia' | 'Aventuras' | 'Futuro';

interface Dream {
  id: number;
  texto: string;
  categoria: Category;
  concluido: boolean;
}

const CATEGORY_CONFIG: Record<Category, { emoji: string; icon: typeof Plane; color: string }> = {
  Viagens: { emoji: '✈️', icon: Plane, color: 'bg-[hsl(200,60%,92%)] text-[hsl(200,50%,40%)]' },
  Gastronomia: { emoji: '🍕', icon: UtensilsCrossed, color: 'bg-[hsl(30,60%,92%)] text-[hsl(30,50%,40%)]' },
  Aventuras: { emoji: '🎭', icon: Drama, color: 'bg-[hsl(280,40%,92%)] text-[hsl(280,40%,40%)]' },
  Futuro: { emoji: '🏡', icon: Home, color: 'bg-[hsl(140,40%,90%)] text-[hsl(140,40%,35%)]' },
};

const INITIAL_DREAMS: Dream[] = [
  { id: 1, texto: 'Ver o pôr do sol em Santorini juntos', categoria: 'Viagens', concluido: false },
  { id: 2, texto: 'Fazer uma road trip sem destino', categoria: 'Viagens', concluido: true },
  { id: 3, texto: 'Conhecer a aurora boreal de mãos dadas', categoria: 'Viagens', concluido: false },
  { id: 4, texto: 'Cozinhar um jantar italiano completo', categoria: 'Gastronomia', concluido: true },
  { id: 5, texto: 'Experimentar comida de rua em Bangkok', categoria: 'Gastronomia', concluido: false },
  { id: 6, texto: 'Fazer um piquenique gourmet no parque', categoria: 'Gastronomia', concluido: false },
  { id: 7, texto: 'Pular de paraquedas juntos', categoria: 'Aventuras', concluido: false },
  { id: 8, texto: 'Dançar sob a chuva sem se importar', categoria: 'Aventuras', concluido: true },
  { id: 9, texto: 'Acampar e ver as estrelas a noite toda', categoria: 'Aventuras', concluido: false },
  { id: 10, texto: 'Adotar um pet juntos', categoria: 'Futuro', concluido: false },
  { id: 11, texto: 'Montar a nossa casinha dos sonhos', categoria: 'Futuro', concluido: false },
  { id: 12, texto: 'Plantar uma árvore no nosso jardim', categoria: 'Futuro', concluido: false },
];

const TABS: { label: string; value: string }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: '✈️ Viagens', value: 'Viagens' },
  { label: '🍕 Gastronomia', value: 'Gastronomia' },
  { label: '🎭 Aventuras', value: 'Aventuras' },
  { label: '🏡 Futuro', value: 'Futuro' },
];

const BucketList = () => {
  const [dreams, setDreams] = useState<Dream[]>(INITIAL_DREAMS);
  const [activeTab, setActiveTab] = useState('Todos');
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('Viagens');

  // Calcula progresso: total de concluídos / total de sonhos * 100
  const completed = dreams.filter((d) => d.concluido).length;
  const progress = Math.round((completed / dreams.length) * 100);

  // Filtra sonhos pela aba selecionada
  const filtered = activeTab === 'Todos' ? dreams : dreams.filter((d) => d.categoria === activeTab);

  const toggleDream = (id: number) => {
    setDreams((prev) => prev.map((d) => (d.id === id ? { ...d, concluido: !d.concluido } : d)));
  };

  const addDream = () => {
    if (!newText.trim()) return;
    setDreams((prev) => [...prev, { id: Date.now(), texto: newText.trim(), categoria: newCategory, concluido: false }]);
    setNewText('');
  };

  return (
    <section className="space-y-6">
      {/* Cabeçalho */}
      <div className=" space-y-2">
        <Sparkles className="mx-auto text-primary/40" size={22} />
        <h2 className="text-2xl font-serif italic">Nossos Sonhos</h2>
        <p className="font-handwritten text-lg text-muted-foreground">uma bucket list feita a dois ♥</p>
      </div>

      {/* Barra de progresso */}
      <div className="editorial-panel p-4 rounded-none space-y-2">
        <div className="flex justify-between font-handwritten text-sm text-muted-foreground">
          <span>{completed} de {dreams.length} sonhos realizados</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2.5 rounded-full bg-secondary" />
      </div>

      {/* Formulário para adicionar */}
      <div className="editorial-panel rounded-none p-4 space-y-3">
        <p className="font-handwritten text-muted-foreground ">adicionar um novo sonho ✨</p>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addDream()}
          placeholder="Descreva o sonho..."
          className="w-full rounded-none border border-foreground bg-background px-4 py-2.5 font-handwritten text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex gap-2">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as Category)}
            className="flex-1 rounded-none border border-foreground bg-background px-3 py-2 font-handwritten text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {(Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_CONFIG[cat].emoji} {cat}</option>
            ))}
          </select>
          <button
            onClick={addDream}
            className="flex items-center gap-1.5 px-5 py-2 rounded-none bg-primary/15 border border-primary/30 font-handwritten text-sm hover:bg-primary/25 transition-colors"
          >
            <Plus size={14} /> Adicionar
          </button>
        </div>
      </div>

      {/* Abas de categoria */}
      <div className="flex flex-wrap gap-2 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-full font-handwritten text-sm transition-all border ${
              activeTab === tab.value
                ? 'bg-primary/15 border-primary/30 text-foreground'
                : 'bg-card/50 border-foreground text-muted-foreground hover:border-primary/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de sonhos */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((dream) => {
            const config = CATEGORY_CONFIG[dream.categoria];
            const Icon = config.icon;
            return (
              <motion.div
                key={dream.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: dream.concluido ? 0.55 : 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="editorial-panel rounded-none p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => toggleDream(dream.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
                  <Icon size={14} />
                </div>
                <span className={`flex-1 font-handwritten text-base ${dream.concluido ? 'line-through text-muted-foreground' : ''}`}>
                  {dream.texto}
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    dream.concluido ? 'bg-primary border-primary text-primary-foreground' : 'border-foreground'
                  }`}
                >
                  {dream.concluido && <Check size={12} />}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default BucketList;
