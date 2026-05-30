import { motion } from 'framer-motion';

interface WashiTapeNoteProps {
  text: string;
  rotation?: number;
  color?: 'pink' | 'yellow' | 'blue';
  className?: string;
}

const colorMap = {
  pink: 'from-primary/20 to-primary/10 border-primary/15',
  yellow: 'from-[hsl(50,60%,85%,0.3)] to-[hsl(50,50%,80%,0.2)] border-[hsl(50,60%,85%,0.3)]',
  blue: 'from-[hsl(210,40%,70%,0.2)] to-[hsl(210,30%,60%,0.15)] border-[hsl(210,40%,70%,0.2)]',
};

const WashiTapeNote = ({ text, rotation = 0, color = 'pink', className = '' }: WashiTapeNoteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative inline-block ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Washi tape top */}
      <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gradient-to-r ${colorMap[color]} border rounded-sm opacity-70 z-10`} />
      {/* Note */}
      <div className="bg-card/40 backdrop-blur-sm border border-foreground rounded-none p-4 pt-5">
        <p className="font-handwritten text-lg text-foreground/70 ">{text}</p>
      </div>
    </motion.div>
  );
};

export default WashiTapeNote;
