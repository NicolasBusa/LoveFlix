import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeCapsule = () => {
  const unlockDate = new Date('2025-06-12T00:00:00');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isLocked = now < unlockDate;
  const diff = unlockDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hoursLeft = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));

  return (
    <section className="editorial-panel p-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-secondary rounded-full text-primary">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="font-bold">Cápsula do Tempo</h3>
          <p className="text-sm text-muted-foreground">
            {isLocked ? `Faltam ${daysLeft}d ${hoursLeft}h para desbloquear` : 'Desbloqueada!'}
          </p>
        </div>
      </div>
      <div className={isLocked ? 'blur-md select-none pointer-events-none' : ''}>
        <p className="text-muted-foreground leading-relaxed">
          Esta é uma mensagem do passado. Se você está lendo isso, sobrevivemos a mais um ano de aventuras e nosso amor só cresceu. Cada dia ao seu lado é uma confirmação de que fiz a melhor escolha da minha vida.
        </p>
      </div>
      {isLocked && (
        <div className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Conteúdo criptografado até 12/06/2025
        </div>
      )}
    </section>
  );
};

export default TimeCapsule;
