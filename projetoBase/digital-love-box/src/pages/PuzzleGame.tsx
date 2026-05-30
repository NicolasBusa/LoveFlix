import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Puzzle, RotateCcw, Trophy, ImagePlus } from 'lucide-react';
import confetti from 'canvas-confetti';

type GamePhase = 'upload' | 'difficulty' | 'playing' | 'won';

interface PieceState {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
  placed: boolean;
}

const DIFFICULTY_MAP: Record<number, { cols: number; rows: number }> = {
  12: { cols: 4, rows: 3 },
  25: { cols: 5, rows: 5 },
  50: { cols: 10, rows: 5 },
  100: { cols: 10, rows: 10 },
};

const PuzzleGame = () => {
  const [phase, setPhase] = useState<GamePhase>('upload');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number>(12);
  const [pieces, setPieces] = useState<PieceState[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const grid = DIFFICULTY_MAP[difficulty];

  // Board dimensions based on viewport
  const getBoardSize = useCallback(() => {
    const vw = Math.min(window.innerWidth - 32, 600);
    const vh = window.innerHeight * 0.6;
    const aspect = grid.cols / grid.rows;
    let w = vw;
    let h = w / aspect;
    if (h > vh) {
      h = vh;
      w = h * aspect;
    }
    return { width: Math.floor(w), height: Math.floor(h) };
  }, [grid]);

  const [boardSize, setBoardSize] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const update = () => setBoardSize(getBoardSize());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [getBoardSize]);

  const pieceW = boardSize.width / grid.cols;
  const pieceH = boardSize.height / grid.rows;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target?.result as string);
      setPhase('difficulty');
    };
    reader.readAsDataURL(file);
  };

  const startGame = (diff: number) => {
    setDifficulty(diff);
    const g = DIFFICULTY_MAP[diff];
    const size = getBoardSize();
    const pw = size.width / g.cols;
    const ph = size.height / g.rows;

    // scatter pieces around the board area
    const newPieces: PieceState[] = [];
    for (let r = 0; r < g.rows; r++) {
      for (let c = 0; c < g.cols; c++) {
        const scatterX = Math.random() * (size.width - pw);
        const scatterY = size.height + 20 + Math.random() * (Math.min(size.height, 300));
        newPieces.push({
          id: r * g.cols + c,
          row: r,
          col: c,
          x: scatterX,
          y: scatterY,
          placed: false,
        });
      }
    }
    // shuffle
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i].x, newPieces[j].x] = [newPieces[j].x, newPieces[i].x];
      [newPieces[i].y, newPieces[j].y] = [newPieces[j].y, newPieces[i].y];
    }
    setPieces(newPieces);
    setPhase('playing');
  };

  const snapThreshold = Math.min(pieceW, pieceH) * 0.35;

  const getClientPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { cx: e.touches[0].clientX, cy: e.touches[0].clientY };
    }
    if ('changedTouches' in e && e.changedTouches.length > 0) {
      return { cx: e.changedTouches[0].clientX, cy: e.changedTouches[0].clientY };
    }
    if ('clientX' in e) {
      return { cx: (e as MouseEvent).clientX, cy: (e as MouseEvent).clientY };
    }
    return { cx: 0, cy: 0 };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent, piece: PieceState) => {
    if (piece.placed) return;
    e.preventDefault();
    const { cx, cy } = getClientPos(e);
    const board = boardRef.current?.getBoundingClientRect();
    if (!board) return;
    setDraggingId(piece.id);
    setDragOffset({
      x: cx - board.left - piece.x,
      y: cy - board.top - piece.y,
    });
  };

  useEffect(() => {
    if (draggingId === null) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const { cx, cy } = getClientPos(e);
      const board = boardRef.current?.getBoundingClientRect();
      if (!board) return;
      const newX = cx - board.left - dragOffset.x;
      const newY = cy - board.top - dragOffset.y;
      setPieces((prev) =>
        prev.map((p) => (p.id === draggingId ? { ...p, x: newX, y: newY } : p))
      );
    };

    const handleUp = (e: MouseEvent | TouchEvent) => {
      const { cx, cy } = getClientPos(e);
      const board = boardRef.current?.getBoundingClientRect();
      if (!board) return;
      const newX = cx - board.left - dragOffset.x;
      const newY = cy - board.top - dragOffset.y;

      setPieces((prev) => {
        const updated = prev.map((p) => {
          if (p.id !== draggingId) return p;
          const targetX = p.col * pieceW;
          const targetY = p.row * pieceH;
          const dist = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);
          if (dist < snapThreshold) {
            return { ...p, x: targetX, y: targetY, placed: true };
          }
          return { ...p, x: newX, y: newY };
        });

        // Check win
        if (updated.every((p) => p.placed)) {
          setTimeout(() => {
            setPhase('won');
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#e11d48', '#fb7185', '#fff', '#fda4af'] });
          }, 300);
        }
        return updated;
      });
      setDraggingId(null);
    };

    window.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [draggingId, dragOffset, pieceW, pieceH, snapThreshold]);

  const placedCount = pieces.filter((p) => p.placed).length;
  const totalCount = pieces.length;

  const resetGame = () => {
    setPieces([]);
    setPhase('upload');
    setImageSrc(null);
  };

  const playAgain = () => {
    setPhase('difficulty');
  };

  return (
    <div className="min-h-screen bg-background text-foreground paper-texture">
      {/* Header */}
      <header className="sticky top-0 z-50  bg-background w-full border-b-2 border-foreground border-b border-foreground px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-handwritten text-lg">Voltar</span>
        </Link>
        <div className="flex-1 ">
          <h1 className="font-serif text-xl italic">Nosso Quebra-Cabeça</h1>
        </div>
        <div className="w-16" />
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* UPLOAD PHASE */}
          {phase === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 pt-12"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Puzzle size={36} className="text-primary" />
              </div>
              <div className=" space-y-2">
                <h2 className="text-2xl font-serif">Monte nosso momento</h2>
                <p className="font-handwritten text-lg text-muted-foreground">
                  Escolha uma foto especial para transformar em quebra-cabeça 💕
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="editorial-panel px-8 py-4 flex items-center gap-3 hover:border-primary/50 transition-all group cursor-pointer"
              >
                <ImagePlus size={22} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="font-handwritten text-xl">Escolher Foto</span>
              </button>

              {/* Or use a default demo image */}
              <button
                onClick={() => {
                  // Use a placeholder romantic gradient as demo
                  const canvas = document.createElement('canvas');
                  canvas.width = 400;
                  canvas.height = 300;
                  const ctx = canvas.getContext('2d')!;
                  const grad = ctx.createLinearGradient(0, 0, 400, 300);
                  grad.addColorStop(0, '#fda4af');
                  grad.addColorStop(0.5, '#fb7185');
                  grad.addColorStop(1, '#e11d48');
                  ctx.fillStyle = grad;
                  ctx.fillRect(0, 0, 400, 300);
                  ctx.font = 'bold 40px serif';
                  ctx.fillStyle = 'white';
                  ctx.textAlign = 'center';
                  ctx.fillText('♥ Nosso Amor ♥', 200, 160);
                  setImageSrc(canvas.toDataURL());
                  setPhase('difficulty');
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-handwritten text-base"
              >
                ou use uma imagem demo ✨
              </button>
            </motion.div>
          )}

          {/* DIFFICULTY PHASE */}
          {phase === 'difficulty' && imageSrc && (
            <motion.div
              key="difficulty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 pt-8"
            >
              <div className="w-40 h-40 rounded-none overflow-hidden border-2 border-foreground shadow-lg">
                <img src={imageSrc} alt="Foto escolhida" className="w-full h-full object-cover" />
              </div>
              <div className=" space-y-2">
                <h2 className="text-2xl font-serif">Escolha a dificuldade</h2>
                <p className="font-handwritten text-lg text-muted-foreground">
                  Quanto mais peças, mais desafiador 🧩
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {[12, 25, 50, 100].map((d) => (
                  <button
                    key={d}
                    onClick={() => startGame(d)}
                    className="editorial-panel p-4  hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <span className="text-2xl font-serif text-primary group-hover:scale-110 inline-block transition-transform">
                      {d}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 font-handwritten text-sm">
                      {d <= 12 ? 'Fácil' : d <= 25 ? 'Médio' : d <= 50 ? 'Difícil' : 'Expert'}
                    </p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPhase('upload')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-handwritten text-base mt-2"
              >
                ← trocar foto
              </button>
            </motion.div>
          )}

          {/* PLAYING PHASE */}
          {phase === 'playing' && imageSrc && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Progress bar */}
              <div className="w-full flex items-center gap-3">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${(placedCount / totalCount) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {placedCount}/{totalCount}
                </span>
              </div>

              {/* Board + pieces area */}
              <div
                ref={boardRef}
                className="relative select-none touch-none"
                style={{
                  width: boardSize.width,
                  height: boardSize.height + Math.min(boardSize.height, 300) + 40,
                }}
              >
                {/* Board background (watermark) */}
                <div
                  className="absolute top-0 left-0 rounded-none overflow-hidden border border-foreground"
                  style={{ width: boardSize.width, height: boardSize.height }}
                >
                  <img
                    src={imageSrc}
                    alt=""
                    className="w-full h-full object-cover opacity-10"
                  />
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {Array.from({ length: grid.rows - 1 }).map((_, i) => (
                      <div
                        key={`h${i}`}
                        className="absolute left-0 right-0 border-t border-foreground/30"
                        style={{ top: `${((i + 1) / grid.rows) * 100}%` }}
                      />
                    ))}
                    {Array.from({ length: grid.cols - 1 }).map((_, i) => (
                      <div
                        key={`v${i}`}
                        className="absolute top-0 bottom-0 border-l border-foreground/30"
                        style={{ left: `${((i + 1) / grid.cols) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pieces */}
                {pieces.map((piece) => (
                  <div
                    key={piece.id}
                    onMouseDown={(e) => handlePointerDown(e, piece)}
                    onTouchStart={(e) => handlePointerDown(e, piece)}
                    className={`absolute overflow-hidden ${
                      piece.placed
                        ? 'pointer-events-none'
                        : 'cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl'
                    } ${draggingId === piece.id ? 'z-50 scale-105' : piece.placed ? 'z-10' : 'z-20'}`}
                    style={{
                      width: pieceW,
                      height: pieceH,
                      left: piece.x,
                      top: piece.y,
                      transition: draggingId === piece.id ? 'none' : piece.placed ? 'all 0.3s ease' : 'box-shadow 0.2s',
                      borderRadius: 3,
                      border: piece.placed ? '1px solid hsl(var(--primary) / 0.3)' : '1px solid hsl(var(--border))',
                    }}
                  >
                    <div
                      style={{
                        width: boardSize.width,
                        height: boardSize.height,
                        marginLeft: -piece.col * pieceW,
                        marginTop: -piece.row * pieceH,
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt=""
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={resetGame}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-handwritten text-base mt-2"
              >
                <RotateCcw size={14} /> Recomeçar
              </button>
            </motion.div>
          )}

          {/* WON PHASE */}
          {phase === 'won' && imageSrc && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 pt-8"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Trophy size={32} className="text-primary" />
              </motion.div>
              <div className=" space-y-3">
                <h2 className="text-3xl font-serif italic">Você completou!</h2>
                <p className="font-handwritten text-2xl text-primary">
                  Você completou o nosso amor! Te amo! 💕
                </p>
              </div>
              <div className="w-full max-w-sm rounded-none overflow-hidden border-2 border-primary/30 shadow-xl">
                <img src={imageSrc} alt="Nosso momento" className="w-full object-cover" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={playAgain}
                  className="editorial-panel px-6 py-3 font-handwritten text-lg hover:border-primary/50 transition-all"
                >
                  🧩 Jogar Novamente
                </button>
                <Link
                  to="/"
                  className="editorial-panel px-6 py-3 font-handwritten text-lg hover:border-primary/50 transition-all"
                >
                  ♥ Voltar ao Cartão
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PuzzleGame;
