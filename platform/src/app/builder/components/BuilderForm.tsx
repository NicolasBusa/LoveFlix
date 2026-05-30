'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Camera, Upload, Trash2, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import PhotoUploader from './PhotoUploader';

interface BuilderFormProps {
  config: any;
  onChange: (newConfig: any) => void;
  onFinish: () => void;
  onPreview?: () => void;
}

const STEPS = [
  { id: 'identity', title: 'O Casal' },
  { id: 'details', title: 'Nossa História' },
  { id: 'photos', title: 'Fotos Principais' },
  { id: 'hot', title: 'Em Alta' },
  { id: 'moments', title: 'Melhores Momentos' },
  { id: 'timeline', title: 'Linha do Tempo' }
];

export default function BuilderForm({ config, onChange, onFinish, onPreview }: BuilderFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const isUserPhoto = (src: string) => src && !src.startsWith('/preview-template/img/');

  const handleTextChange = (path: string[], value: string) => {
    const newConfig = { ...config };
    let current = newConfig;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onChange(newConfig);
  };

  const handleBlobUpload = async (blob: Blob, imagePath: string[]): Promise<string | null> => {
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const fileName = `${Math.random()}.jpg`;
      const filePath = `${user.id}/temp/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, blob, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);

      handleTextChange(imagePath, publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem cortada.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-white/5 relative z-10 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">Crie seu LoveFlix</h1>
        
        {/* Progress Bar */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(index)}
              className="flex-1 min-w-[75px] flex flex-col gap-2 cursor-pointer group text-left shrink-0 touch-manipulation"
            >
              <div 
                className={`h-1.5 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-red-600' : 'bg-white/10 group-hover:bg-white/20'
                }`}
              />
              <span className={`text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                index <= currentStep ? 'text-red-500' : 'text-neutral-600 group-hover:text-neutral-400'
              }`}>
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 p-4 lg:p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* STEP 0: Identidade */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Nome dela(e)</label>
              <input 
                type="text" 
                value={config.names.person1}
                onChange={(e) => handleTextChange(['names', 'person1'], e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Nome dele(a)</label>
              <input 
                type="text" 
                value={config.names.person2}
                onChange={(e) => handleTextChange(['names', 'person2'], e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Título do Site</label>
              <input 
                type="text" 
                value={config.coupleTitle}
                onChange={(e) => handleTextChange(['coupleTitle'], e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Data de Início (Senha)</label>
              <input 
                type="date" 
                value={config.startDate}
                onChange={(e) => handleTextChange(['startDate'], e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                style={{ colorScheme: 'dark' }}
              />
              <p className="text-xs text-neutral-500 mt-2">Esta data será a senha de acesso ao site.</p>
            </div>
          </div>
        )}

        {/* STEP 1: História e Bio */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Pequena Biografia (Hero)</label>
              <textarea 
                value={config.bio}
                onChange={(e) => handleTextChange(['bio'], e.target.value)}
                rows={4}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">História Completa (Aba História)</label>
              <textarea 
                value={config.tabs.historia.content}
                onChange={(e) => handleTextChange(['tabs', 'historia', 'content'], e.target.value)}
                rows={6}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Carta de Amor</label>
              <textarea 
                value={config.tabs.cartasDeAmor.content}
                onChange={(e) => handleTextChange(['tabs', 'cartasDeAmor', 'content'], e.target.value)}
                rows={6}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Fotos Principais */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/50">
              <label className="block text-sm font-medium text-neutral-400 mb-4">Foto de Capa (Vertical)</label>
              <PhotoUploader
                src={config.photos.hero || null}
                onUpload={(blob) => handleBlobUpload(blob, ['photos', 'hero'])}
                aspectRatio={9 / 16}
                className="w-48 aspect-[9/16]"
                disabled={uploading}
              />
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/50">
              <label className="block text-sm font-medium text-neutral-400 mb-4">Foto de Perfil (Quadrada)</label>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <PhotoUploader
                  src={config.photos.profile || null}
                  onUpload={(blob) => handleBlobUpload(blob, ['photos', 'profile'])}
                  aspectRatio={1}
                  isCircular={true}
                  className="w-24 h-24 shrink-0"
                  disabled={uploading}
                />
                <div className="text-xs text-neutral-500 sm:max-w-[200px] text-center sm:text-left">
                  Utilizada na tela inicial de "Quem está assistindo?". Dê preferência a uma foto onde o rosto de ambos esteja visível e centralizado.
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: Em Alta */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-neutral-400">Adicione até 10 fotos para a seção "Em Alta". Deixe em branco as que não quiser usar.</p>
            
            <div className="grid gap-4">
              {config.hot.map((item: any, idx: number) => (
                <div key={`hot-${idx}`} className="p-4 rounded-xl bg-neutral-900 border border-white/10">
                  <div className="flex gap-4 items-center">
                    <PhotoUploader
                      src={item.src || null}
                      onUpload={(blob) => handleBlobUpload(blob, ['hot', idx.toString(), 'src'])}
                      aspectRatio={16 / 9}
                      className="w-16 h-16 shrink-0"
                      disabled={uploading}
                    />
                    <div className="flex-1 space-y-2 min-w-0">
                      <input 
                        type="text" 
                        value={item.title}
                        placeholder="Título (ex: Pôr do Sol)"
                        onChange={(e) => handleTextChange(['hot', idx.toString(), 'title'], e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Galeria de Momentos */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-neutral-400">Adicione até 10 fotos que irão aparecer no seu mural de "Melhores Momentos".</p>
            
            <div className="grid gap-4">
              {config.moments.map((moment: any, idx: number) => (
                <div key={`moment-${idx}`} className="p-4 rounded-xl bg-neutral-900 border border-white/10">
                  <div className="flex gap-4 items-center">
                    <PhotoUploader
                      src={moment.src || null}
                      onUpload={(blob) => handleBlobUpload(blob, ['moments', idx.toString(), 'src'])}
                      aspectRatio={16 / 9}
                      className="w-16 h-16 shrink-0"
                      disabled={uploading}
                    />
                    <div className="flex-1 space-y-2 min-w-0">
                      <input type="text" value={moment.title} placeholder="Título da foto" onChange={(e) => handleTextChange(['moments', idx.toString(), 'title'], e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-sm text-white focus:outline-none focus:border-red-500" />
                      <input type="text" value={moment.label} placeholder="Legenda" onChange={(e) => handleTextChange(['moments', idx.toString(), 'label'], e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-xs text-neutral-400 focus:outline-none focus:border-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* STEP 5: Linha do Tempo */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-neutral-400">Adicione até 10 fotos para a "Linha do Tempo" e conte os marcos do relacionamento.</p>
            
            <div className="grid gap-4">
              {config.timeline.map((item: any, idx: number) => (
                <div key={`timeline-${idx}`} className="p-4 rounded-xl bg-neutral-900 border border-white/10">
                  <div className="flex gap-4 items-start">
                    <PhotoUploader
                      src={item.src || null}
                      onUpload={(blob) => handleBlobUpload(blob, ['timeline', idx.toString(), 'src'])}
                      aspectRatio={16 / 9}
                      className="w-16 h-16 shrink-0 mt-1"
                      disabled={uploading}
                    />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
                      <input type="text" value={item.title} placeholder="Título (Ex: Primeiro Encontro)" onChange={(e) => handleTextChange(['timeline', idx.toString(), 'title'], e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-sm text-white focus:outline-none focus:border-red-500" />
                      <div className="flex gap-2">
                        <input type="text" value={item.date} placeholder="Data (Ex: Março 2019)" onChange={(e) => handleTextChange(['timeline', idx.toString(), 'date'], e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-sm text-white focus:outline-none focus:border-red-500" />
                        <input type="text" value={item.icon} placeholder="Emoji (Ex: ✨)" onChange={(e) => handleTextChange(['timeline', idx.toString(), 'icon'], e.target.value)} className="w-16 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-sm text-center text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <input type="text" value={item.description} placeholder="Breve descrição" onChange={(e) => handleTextChange(['timeline', idx.toString(), 'description'], e.target.value)} className="w-full md:col-span-2 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-[16px] md:text-xs text-neutral-400 focus:outline-none focus:border-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Footer Controls */}
      <div className="p-4 pb-8 lg:p-6 border-t border-white/5 bg-neutral-950 flex flex-wrap justify-between items-center relative z-10 shrink-0 gap-3">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0 || uploading}
          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white disabled:opacity-50 transition-colors touch-manipulation"
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        {/* Mobile: Preview Button */}
        {onPreview && (
          <button
            onClick={onPreview}
            type="button"
            className="lg:hidden flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600/20 text-red-400 text-xs font-semibold border border-red-500/30 hover:bg-red-600/30 transition-all touch-manipulation"
          >
            📱 Ver Demo
          </button>
        )}

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors touch-manipulation"
          >
            Avançar <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={onFinish}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] touch-manipulation"
          >
            Salvar e Finalizar <CheckCircle size={16} />
          </button>
        )}
      </div>

    </div>
  );
}
