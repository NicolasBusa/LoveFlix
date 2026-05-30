import { motion } from 'framer-motion';

interface PolaroidPhotoProps {
  src: string;
  caption?: string;
  rotation?: number;
  tapePosition?: 'left' | 'right' | 'center';
  className?: string;
}

const PolaroidPhoto = ({ src, caption, rotation = 0, tapePosition = 'center', className = '' }: PolaroidPhotoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-block ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Tape */}
      <div className={`tape tape-${tapePosition}`} />
      
      {/* polaroid-raw frame */}
      <div className="polaroid-raw">
        <img
          src={src}
          alt={caption || 'Memória'}
          className="w-full aspect-square object-cover"
        />
        {caption && (
          <p className="font-handwritten text-lg text-warm  mt-3 px-1">
            {caption}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PolaroidPhoto;
