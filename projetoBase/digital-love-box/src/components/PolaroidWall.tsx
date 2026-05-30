import { motion } from 'framer-motion';
import PolaroidPhoto from './PolaroidPhoto';

import scattered1 from '@/assets/scattered-1.jpg';
import scattered2 from '@/assets/scattered-2.jpg';
import scattered3 from '@/assets/scattered-3.jpg';
import scattered4 from '@/assets/scattered-4.jpg';
import scattered5 from '@/assets/scattered-5.jpg';

const photos = [
  { src: scattered1, caption: 'Nosso piquenique ♥', rotation: -4, tape: 'left' as const },
  { src: scattered2, caption: 'De mãos dadas, sempre', rotation: 3, tape: 'right' as const },
  { src: scattered3, caption: 'Dançando na cozinha', rotation: -2, tape: 'center' as const },
  { src: scattered4, caption: 'Nossa playlist', rotation: 5, tape: 'left' as const },
  { src: scattered5, caption: 'Fogos de artifício ✨', rotation: -3, tape: 'right' as const },
];

const PolaroidWall = () => {
  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className=" space-y-2"
      >
        <h2 className="text-2xl font-serif">Nosso Mural</h2>
        <p className="font-handwritten text-xl text-muted-foreground">fotos penduradas com carinho ♥</p>
      </motion.div>

      {/* String line */}
      <div className="relative">
        <div className="string-line absolute top-6 left-0 right-0 z-0" />
        
        <div className="grid grid-cols-2 gap-6 pt-4 relative z-10">
          {photos.slice(0, 4).map((photo, i) => (
            <PolaroidPhoto
              key={i}
              src={photo.src}
              caption={photo.caption}
              rotation={photo.rotation}
              tapePosition={photo.tape}
              className="w-full"
            />
          ))}
        </div>

        {/* Center last one */}
        <div className="flex justify-center mt-6 relative z-10">
          <PolaroidPhoto
            src={photos[4].src}
            caption={photos[4].caption}
            rotation={photos[4].rotation}
            tapePosition={photos[4].tape}
            className="w-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default PolaroidWall;
