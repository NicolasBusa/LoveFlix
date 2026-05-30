import { motion } from 'framer-motion';

type DoodleVariant = 'hearts' | 'dots' | 'stars' | 'wave' | 'arrows';

interface DoodleDividerProps {
  variant?: DoodleVariant;
  className?: string;
}

const PATTERNS: Record<DoodleVariant, string> = {
  hearts: '♥ · ♥ · ♥',
  dots: '· · · ✦ · · ·',
  stars: '✧ · ✦ · ✧',
  wave: '~ ♡ ~ ♡ ~',
  arrows: '→ ♥ ←',
};

const DoodleDivider = ({ variant = 'hearts', className = '' }: DoodleDividerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.5 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 justify-center py-2 ${className}`}
    >
      <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-primary/20" />
      <span className="font-handwritten text-lg text-primary/25 tracking-[0.3em]">
        {PATTERNS[variant]}
      </span>
      <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-primary/20" />
    </motion.div>
  );
};

export default DoodleDivider;
