import { useState, useEffect } from 'react';

const RelationshipCounter = () => {
  const startDate = new Date('2023-06-12T00:00:00');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = now.getTime() - startDate.getTime();
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  const units = [
    { label: 'Anos', val: years, emoji: '💍' },
    { label: 'Meses', val: months, emoji: '🌙' },
    { label: 'Dias', val: days, emoji: '☀️' },
    { label: 'Horas', val: hours, emoji: '⏰' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      {units.map((item) => (
        <div key={item.label} className="editorial-panel p-5  relative overflow-hidden">
          <span className="absolute top-2 right-3 text-lg opacity-40">{item.emoji}</span>
          <div className="text-3xl font-mono font-bold text-foreground tabular-nums">{item.val}</div>
          <div className="font-handwritten text-base text-muted-foreground mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default RelationshipCounter;
