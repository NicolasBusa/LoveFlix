import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Volume2, Puzzle, CalendarHeart, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PasswordGate from '@/components/PasswordGate';
import RelationshipCounter from '@/components/RelationshipCounter';
import MemoryTimeline from '@/components/MemoryTimeline';
import QuizLock from '@/components/QuizLock';
import ReasonsJar from '@/components/ReasonsJar';
import VoicePlayer from '@/components/VoicePlayer';
import PhotoAlbum from '@/components/PhotoAlbum';
import TimeCapsule from '@/components/TimeCapsule';
import PolaroidWall from '@/components/PolaroidWall';
import LoveLetter from '@/components/LoveLetter';
import PromisesList from '@/components/PromisesList';
import ScatteredPhoto from '@/components/ScatteredPhoto';
import FloatingHearts from '@/components/FloatingHearts';
import DoodleDivider from '@/components/DoodleDivider';
import WashiTapeNote from '@/components/WashiTapeNote';

import scattered1 from '@/assets/scattered-1.jpg';
import scattered2 from '@/assets/scattered-2.jpg';
import scattered3 from '@/assets/scattered-3.jpg';
import scattered4 from '@/assets/scattered-4.jpg';
import scattered5 from '@/assets/scattered-5.jpg';
import album1 from '@/assets/album-1.jpg';
import album2 from '@/assets/album-2.jpg';
import album3 from '@/assets/album-3.jpg';
import album4 from '@/assets/album-4.jpg';
import album5 from '@/assets/album-5.jpg';

const Index = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('dlb_unlocked') === 'true');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 paper-texture relative overflow-x-hidden">
      <FloatingHearts />
      
      {!unlocked ? (
        <PasswordGate onUnlock={() => { setUnlocked(true); sessionStorage.setItem('dlb_unlocked', 'true'); }} />
      ) : (
        <div className="pb-32">
          {/* Typographic Brutalist Hero (Mobile First) */}
          <header className="relative w-full pt-20 pb-16 flex flex-col items-start px-4 md:px-12 z-10 border-b-2 border-foreground">
            <motion.h1 
              initial={{ x: -30, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-title-xl mb-6 truncate max-w-full"
            >
              PARA NÓS.
            </motion.h1>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
              <p className="font-serif text-3xl md:text-5xl uppercase leading-tight max-w-md">
                Uma narrativa <br/><span className="text-wine">inesquecível</span>.
              </p>
              
              <div className="flex flex-col items-start md:items-end space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Desde: 12.06.2023</span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-wine">Status: Eterno</span>
              </div>
            </div>
            
            {/* Nav Menu Brutalist Box */}
            <div className="flex flex-col md:flex-row gap-4 mt-12 w-full">
              <Link
                to="/calendario"
                className="flex-1 flex justify-between items-center editorial-panel px-6 py-4 font-serif text-2xl uppercase"
              >
                <div className="flex items-center gap-3">
                  <CalendarHeart size={20} className="text-wine" /> Calendário
                </div>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/sonhos"
                className="flex-1 flex justify-between items-center editorial-panel px-6 py-4 font-serif text-2xl uppercase"
              >
                <div className="flex items-center gap-3">
                  <Star size={20} /> Sonhos
                </div>
                <ArrowRight size={20} />
              </Link>
            </div>
          </header>

          <main className="relative w-full flex flex-col z-10 mt-12 px-4 md:px-12 gap-24">

            {/* Spotify Player in a raw container */}
            <section className="w-full md:w-3/4 self-end">
              <div className="flex items-center gap-4 mb-4 border-b-2 border-foreground pb-2">
                <Volume2 size={20} className="text-wine"/> 
                <span className="font-mono text-sm tracking-widest uppercase font-bold">Trilha Sonora</span>
              </div>
              <iframe
                className="w-full grayscale hover:grayscale-0 transition-all block"
                src="https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator&theme=0"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </section>

            {/* Asymmetric Counter Section */}
            <section className="w-full md:w-2/3 border-t-2 border-l-2 border-foreground p-6 md:p-12 relative">
              <div className="absolute top-0 right-0 p-4 border-l-2 border-b-2 border-foreground bg-foreground text-background font-mono text-xs font-bold uppercase tracking-widest">
                Tempo Real
              </div>
              <div className="mb-8 mt-6">
                <h2 className="text-title-xl text-wine">Sempre.</h2>
                <p className="font-serif text-2xl md:text-3xl uppercase">Contagem da nossa história</p>
              </div>
              <RelationshipCounter />
            </section>

            <DoodleDivider variant="wave" className="opacity-20" />

            {/* Love Letter (Should align Left while Photo align right) */}
            <div className="flex flex-col md:flex-row gap-12 w-full items-center">
              <div className="flex-1 w-full">
                <LoveLetter />
              </div>
              <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                <ScatteredPhoto src={album2} alt="Nós" rotation={-5} className="w-64 border-2 border-foreground shadow-[8px_8px_0_hsl(var(--foreground))]" />
              </div>
            </div>

            {/* Photo Carousel (Full width editorial spread) */}
            <section className="w-full my-12 border-y-2 border-foreground py-16 bg-card">
              <div className="px-4 md:px-12 mb-8 flex flex-col">
                <h2 className="font-serif text-5xl md:text-7xl uppercase">Galeria</h2>
                <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Lembranças Cruas</span>
              </div>
              <PhotoAlbum />
            </section>

            {/* Polaroid Wall with aggressive Title */}
            <section className="relative w-full">
              <h2 className="font-serif text-6xl md:text-8xl opacity-10 absolute -top-8 left-0 pointer-events-none z-0">MOMENTOS</h2>
              <div className="relative z-10 w-full px-2">
                <PolaroidWall />
              </div>
            </section>

            <DoodleDivider variant="dots" className="opacity-20" />

            {/* Timeline */}
            <section className="w-full md:w-3/4 mx-auto border-2 border-foreground p-6 md:p-12 bg-card shadow-[12px_12px_0_hsl(var(--wine))]">
              <h2 className="font-serif text-4xl uppercase mb-8 border-b-2 border-foreground pb-4">Linha do Tempo</h2>
              <MemoryTimeline />
            </section>

            {/* Interactive Section (Quiz & Jar) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mt-12 w-full">
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-4xl uppercase border-b-2 border-foreground pb-2">O Teste</h3>
                <QuizLock />
              </div>
              <div className="flex flex-col gap-6 mt-12 md:mt-0">
                <h3 className="font-serif text-4xl uppercase border-b-2 border-foreground pb-2 text-right">Promessas</h3>
                <PromisesList />
              </div>
            </div>

            {/* Reasons Jar & Voice */}
            <div className="flex flex-col md:flex-row gap-8 mt-12 items-stretch">
               <div className="flex-1 editorial-panel p-6">
                  <ReasonsJar />
               </div>
               <div className="flex-1 w-full flex flex-col justify-center border-2 border-foreground p-8 bg-wine text-background">
                  <h3 className="font-serif text-5xl uppercase mb-6">Nossa Voz</h3>
                  <VoicePlayer />
               </div>
            </div>

            <section className="w-full mt-12">
               <TimeCapsule />
            </section>

            {/* Puzzle Entry - Brutalist Action */}
            <section className="w-full bg-foreground text-background p-8 md:p-16 flex flex-col items-center  mt-12">
              <Puzzle className="mb-6 opacity-50" size={48} />
              <h2 className="text-5xl md:text-7xl font-serif uppercase leading-none mb-6">Jogo das Peças</h2>
              <Link
                to="/puzzle"
                className="bg-wine text-background uppercase font-serif text-2xl px-12 py-6 hover:bg-background hover:text-foreground transition-all duration-300 border-2 border-transparent hover:border-foreground"
              >
                Iniciar Jogo
              </Link>
            </section>

          </main>

          {/* Footer Editorial Style */}
          <footer className="mt-32 pt-16 border-t-2 border-foreground flex justify-between items-end px-4 md:px-12 pb-8">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl md:text-6xl font-serif leading-none">NÓS.</h1>
              <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                Criado com amor — 2023
              </p>
            </div>
            <div className="text-wine">
               <Heart size={32} fill="currentColor" />
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
