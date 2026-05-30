import { motion } from 'framer-motion';

interface ScatteredPhotoProps {
  src: string;
  alt?: string;
  rotation?: number;
  className?: string;
  withPin?: boolean;
}

const ScatteredPhoto = ({ src, alt = '', rotation = 0, className = '', withPin = false }: ScatteredPhotoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {withPin && (
        <div className="pin -top-1.5 left-1/2 -translate-x-1/2 z-10" />
      )}
      <div className="polaroid-raw">
        <img src={src} alt={alt} className="w-full aspect-[4/3] object-cover" />
      </div>
    </motion.div>
  );
};

export default ScatteredPhoto;
