import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

import album1 from '@/assets/album-1.jpg';
import album2 from '@/assets/album-2.jpg';
import album3 from '@/assets/album-3.jpg';
import album4 from '@/assets/album-4.jpg';
import album5 from '@/assets/album-5.jpg';

const PHOTOS = [
  { src: album1, caption: 'Pôr do sol na praia — nosso lugar.' },
  { src: album2, caption: 'O café que começou tudo.' },
  { src: album3, caption: 'De mãos dadas pela serra.' },
  { src: album4, caption: 'Nosso primeiro Natal juntos.' },
  { src: album5, caption: 'Sob as estrelas, só nós dois.' },
];

const swipeThreshold = 50;

const PhotoAlbum = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragRef = useRef(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return PHOTOS.length - 1;
      if (next >= PHOTOS.length) return 0;
      return next;
    });
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-[0.2em]">
        <Camera size={14} /> <span>Nosso Álbum</span>
      </div>

      <div className="relative editorial-panel overflow-hidden rounded-none">
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={index}
              src={PHOTOS[index].src}
              alt={PHOTOS[index].caption}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragStart={(_, info) => { dragRef.current = info.point.x; }}
              onDragEnd={(_, info) => {
                const diff = info.point.x - dragRef.current;
                if (diff < -swipeThreshold) paginate(1);
                else if (diff > swipeThreshold) paginate(-1);
              }}
              className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
            />
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none bg-background border border-foreground flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none bg-background border border-foreground flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Caption + dots */}
        <div className="p-5  space-y-3">
          <p className="text-sm font-serif italic text-foreground/80">{PHOTOS[index].caption}</p>
          <div className="flex justify-center gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-primary w-5' : 'bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoAlbum;
