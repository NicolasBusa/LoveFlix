'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import BuilderForm from './components/BuilderForm';
import PreviewMockup from './components/PreviewMockup';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const PLACEHOLDER_PHOTOS = {
  hero: '/preview-template/img/hero.png',
  profile: '/preview-template/img/profile.png',
  m1: '/preview-template/img/m1.png',
  m2: '/preview-template/img/m2.png',
  m3: '/preview-template/img/m3.png',
  m4: '/preview-template/img/m4.png',
  m5: '/preview-template/img/m5.png',
};

const INITIAL_CONFIG = {
  names: { person1: "Ana", person2: "Carlos" },
  coupleTitle: "Ana & Carlos",
  tagline: "1º Grande Amor",
  startDate: "2019-03-15",
  badges: ["❤️ Top 1 Casais Mais Apaixonados", "🌟 Amor Eterno"],
  bio: "Te amo não somente pelo que és, mas pelo que sou quando estou contigo. Te amo porque puseste a mão na minha alma e passaste por debaixo das minhas fraquezas e com teu amor fizeste sair à luz toda a beleza que ninguém antes de ti conseguiu encontrar.",
  photos: {
    hero: PLACEHOLDER_PHOTOS.hero,
    profile: PLACEHOLDER_PHOTOS.profile,
    heroPosition: "center",
    profilePosition: "center"
  },
  moments: [
    { src: PLACEHOLDER_PHOTOS.m1, title: "Nossa Primeira Viagem", label: "Aventura Inesquecível", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m2, title: "Jantar Especial", label: "Noite Perfeita", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m3, title: "Pôr do Sol na Praia", label: "Paz e Amor", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m4, title: "Nosso Abraço Favorito", label: "Abraço Eterno", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m5, title: "Dança e Alegria", label: "Celebrando Nós", objectPosition: "center" },
    { src: "", title: "", label: "", objectPosition: "center" },
    { src: "", title: "", label: "", objectPosition: "center" },
    { src: "", title: "", label: "", objectPosition: "center" },
    { src: "", title: "", label: "", objectPosition: "center" },
    { src: "", title: "", label: "", objectPosition: "center" }
  ],
  hot: [
    { src: PLACEHOLDER_PHOTOS.m3, title: "Pôr do Sol", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m1, title: "Viagem Juntos", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m2, title: "Jantar Romântico", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" },
    { src: "", title: "", objectPosition: "center" }
  ],
  tabs: {
    historia: { label: "História", content: "Nossa história começou em 15 de março de 2019, quando dois mundos se encontraram e nunca mais quiseram se separar. Cada dia ao seu lado é uma nova página de um livro lindo que escrevo com o maior prazer do mundo." },
    momentos: { label: "Momentos", content: "Cada sorriso compartilhado, cada aventura vivida, cada silêncio confortável — são esses momentos que guardarei para sempre no coração." },
    abracosBeijos: { label: "Abraços e Beijos", content: "Seu abraço é o lugar mais seguro do mundo. Cada beijo é uma declaração silenciosa de tudo que sinto por você. Poderia ficar assim para sempre." },
    cartasDeAmor: { label: "Cartas de Amor", content: "Amor meu,\n\nNão existe palavra grande o suficiente para descrever o que sinto por você. Você transformou minha vida de uma forma que só almas verdadeiras conseguem. Obrigado por existir, por me escolher todos os dias e por fazer o ordinário se transformar em extraordinário.\n\nSempre seu(sua),\nCom todo meu amor ❤️" },
    detalhes: {
      label: "Detalhes",
      items: [
        { icon: "📅", label: "Juntos desde", value: "{{startDate}}" },
        { icon: "📍", label: "Onde nos conhecemos", value: "São Paulo, SP" },
        { icon: "💑", label: "Primeira viagem juntos", value: "Setembro de 2019" },
        { icon: "🌟", label: "Conquista favorita", value: "Nos escolher todo dia" },
        { icon: "🎵", label: "Nossa música", value: "Perfect — Ed Sheeran" }
      ]
    }
  },
  timeline: [
    { src: PLACEHOLDER_PHOTOS.m4, date: "Março 2019", icon: "✨", title: "Primeiro Encontro", description: "Dois mundos se encontraram e nunca mais quiseram se separar.", objectPosition: "center" },
    { src: PLACEHOLDER_PHOTOS.m2, date: "Abril 2019", icon: "💞", title: "Primeiro Beijo", description: "Debaixo de um céu estrelado, o momento que selou tudo.", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" },
    { src: "", date: "", icon: "", title: "", description: "", objectPosition: "center" }
  ],
  cinema: { enabled: true, musicVideoId: "2Vv-BfVoq4g", autoplayInterval: 5500 }
};

const STORAGE_KEY = 'builder_draft';

function loadDraft(): typeof INITIAL_CONFIG | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return null;
}

function isPlaceholder(url: string): boolean {
  return !url || url.startsWith('/preview-template/img/');
}

function validateConfig(config: typeof INITIAL_CONFIG): string[] {
  const missing: string[] = [];
  if (!config.coupleTitle || config.coupleTitle === INITIAL_CONFIG.coupleTitle) missing.push('Título do Site');
  if (!config.startDate) missing.push('Data de Início (Senha)');
  if (isPlaceholder(config.photos.hero)) missing.push('Foto de Capa');
  if (isPlaceholder(config.photos.profile)) missing.push('Foto de Perfil');
  if (!config.bio || config.bio === INITIAL_CONFIG.bio) missing.push('Biografia');
  if (!config.tabs.historia.content || config.tabs.historia.content === INITIAL_CONFIG.tabs.historia.content) missing.push('História Completa');
  if (!config.tabs.cartasDeAmor.content || config.tabs.cartasDeAmor.content === INITIAL_CONFIG.tabs.cartasDeAmor.content) missing.push('Carta de Amor');
  const realMoments = config.moments.filter((m: any) => m.src && !isPlaceholder(m.src));
  if (realMoments.length < 3) missing.push(`Melhores Momentos (${realMoments.length}/3 mínimo)`);
  const realTimeline = config.timeline.filter((t: any) => t.src && !isPlaceholder(t.src) && t.title);
  if (realTimeline.length < 2) missing.push(`Linha do Tempo (${realTimeline.length}/2 mínimo)`);
  return missing;
}

export default function BuilderPage() {
  const supabase = createClient();
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewKeyRef = useRef(0);

  // Load draft after hydration to prevent React mismatch errors
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setConfig(draft);
    }
  }, []);

  // Removed body scroll lock that causes iOS touch bugs

  const handleConfigChange = useCallback((newConfig: typeof INITIAL_CONFIG) => {
    setConfig(newConfig);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig)); } catch {}
    }, 300);
  }, []);

  const handleClearDraft = () => {
    if (confirm('Tem certeza que deseja limpar o rascunho? Todos os dados preenchidos serão perdidos.')) {
      localStorage.removeItem(STORAGE_KEY);
      setConfig(INITIAL_CONFIG);
    }
  };

  const handleFinishAttempt = () => {
    const missing = validateConfig(config);
    setMissingFields(missing);
    setShowConfirmModal(true);
  };

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleConfirmFinish = async () => {
    setShowConfirmModal(false);
    setIsCheckoutLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Save draft before redirecting so nothing is lost
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch {}
        window.location.href = '/login?redirect=/builder';
        return;
      }

      const cleanedConfig = {
        ...config,
        hot: config.hot.filter((item: any) => item.src && item.src.trim() !== "" && !isPlaceholder(item.src)),
        moments: config.moments.filter((item: any) => item.src && item.src.trim() !== "" && !isPlaceholder(item.src)),
        timeline: config.timeline.filter((item: any) => item.src && item.src.trim() !== "" && !isPlaceholder(item.src))
      };

      const subdomain = config.coupleTitle 
         ? config.coupleTitle.toLowerCase().replace(/[^a-z0-9]/g, '-') + `-${Math.floor(Math.random() * 1000)}`
         : `casal-${Math.floor(Math.random() * 100000)}`;

      const { error } = await supabase.from('sites').insert({
        user_id: user.id, slug: subdomain, site_id: subdomain, config: cleanedConfig, status: 'draft', theme: 'loveflix'
      });

      if (error) throw error;
      localStorage.removeItem(STORAGE_KEY);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain, template_id: 'loveflix' })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro ao gerar checkout');
      
      window.location.href = data.url;
    } catch (err: any) {
      console.error(err);
      alert(`Ocorreu um erro: ${err.message || 'Erro ao salvar o site ou gerar o pagamento.'}`);
      setIsCheckoutLoading(false);
    }
  };

  const openMobilePreview = () => {
    previewKeyRef.current += 1;
    setShowMobilePreview(true);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-[100dvh] bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* Left: Form */}
      <div className="w-full lg:w-[60%] h-full flex flex-col">
        <BuilderForm 
          config={config} 
          onChange={handleConfigChange} 
          onFinish={handleFinishAttempt}
          onPreview={openMobilePreview}
        />
      </div>

      {/* Right: Desktop Preview */}
      <div className="hidden lg:block lg:w-[40%] h-full relative border-l border-white/5">
        <button onClick={handleClearDraft} className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all border border-white/5">
          <Trash2 size={12} /> Limpar Rascunho
        </button>
        <PreviewMockup config={config} />
      </div>

      {/* Mobile: Preview Modal */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/95 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md">
            <span className="font-semibold text-sm text-white">Preview em tempo real</span>
            <button onClick={() => setShowMobilePreview(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <PreviewMockup key={previewKeyRef.current} config={config} />
          </div>
          <div className="px-4 py-3 border-t border-white/10 flex justify-center">
            <button onClick={handleClearDraft} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all border border-white/5">
              <Trash2 size={12} /> Limpar Rascunho
            </button>
          </div>
        </div>
      )}

      {/* Task 6: Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-full ${missingFields.length > 0 ? 'bg-amber-500/20' : 'bg-green-500/20'}`}>
                <AlertTriangle size={20} className={missingFields.length > 0 ? 'text-amber-400' : 'text-green-400'} />
              </div>
              <h3 className="text-lg font-bold text-white">
                {missingFields.length > 0 ? 'Campos não preenchidos' : 'Tudo pronto!'}
              </h3>
            </div>

            {missingFields.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-neutral-400 mb-3">Os seguintes campos ainda não foram preenchidos:</p>
                <ul className="space-y-1.5">
                  {missingFields.map((field) => (
                    <li key={field} className="flex items-center gap-2 text-sm text-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-5">
              <p className="text-xs text-red-300">
                ⚠️ <strong>Atenção:</strong> Após confirmar a finalização, não será possível alterar o site novamente.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 hover:bg-white/10 transition-colors">
                Voltar e Completar
              </button>
              <button disabled={isCheckoutLoading} onClick={handleConfirmFinish} className="flex-1 px-4 py-2.5 rounded-full bg-red-600 text-sm text-white font-semibold hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(229,9,20,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                {isCheckoutLoading ? 'Gerando Pagamento...' : `Finalizar ${missingFields.length > 0 ? 'Mesmo Assim' : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
