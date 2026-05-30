import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const check = () => {
    if (pass === '12062023') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm paper-texture px-6">
      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm space-y-8 "
      >
        <div className="space-y-3">
          <div className="font-handwritten text-5xl text-primary/60 mb-2">♥</div>
          <h1 className="text-4xl font-serif text-foreground">Acesso Restrito</h1>
          <p className="font-handwritten text-lg text-muted-foreground">
            Insira a data em que tudo começou
          </p>
          <p className="text-muted-foreground text-xs font-mono">(DDMMAAAA)</p>
        </div>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          className={`w-full bg-background border-2 ${error ? 'border-primary' : 'border-foreground'} rounded-none py-4 px-6  text-2xl tracking-[1em] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground`}
          placeholder="••••••••"
        />
        <button
          onClick={check}
          className="w-full bg-foreground text-background font-handwritten text-xl py-4 rounded-none hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
        >
          <Lock size={18} /> Desbloquear Memórias
        </button>
        <p className="font-handwritten text-sm text-muted-foreground">
          pssiu... é a data do nosso primeiro encontro 🤫
        </p>
      </motion.div>
    </div>
  );
};

export default PasswordGate;
