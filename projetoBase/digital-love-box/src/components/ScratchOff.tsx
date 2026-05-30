import { useRef, useEffect, useCallback } from 'react';

const ScratchOff = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#52525b';
    ctx.textAlign = 'center';
    ctx.fillText('Raspe aqui ✨', canvas.offsetWidth / 2, canvas.offsetHeight / 2);
  }, []);

  const scratch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x * 2, y * 2, 40, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  return (
    <div className="relative w-full aspect-video bg-primary/10 rounded-none overflow-hidden border border-foreground flex items-center justify-center">
      <div className=" p-6">
        <p className="text-xl font-serif italic text-foreground">"Você é meu lugar favorito no mundo."</p>
      </div>
      <canvas
        ref={canvasRef}
        onMouseMove={scratch}
        onTouchMove={scratch}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
};

export default ScratchOff;
