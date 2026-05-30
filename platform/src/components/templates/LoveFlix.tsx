export default function LoveFlixTemplate({ coupleData }: { coupleData: any }) {
  // Extract data with fallbacks
  const title = coupleData.couple_title || "LoveFlix";
  const heroImage = coupleData.hero_image_url || "/default-hero.jpg";

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans">
      {/* Navbar Mock */}
      <nav className="fixed w-full z-50 flex items-center px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-[#E50914] text-3xl font-black tracking-tighter">LOVEFLIX</h1>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-8 md:left-16 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl">{title}</h2>
          <p className="text-lg md:text-xl text-gray-300 drop-shadow-md mb-6 line-clamp-3">
            {coupleData.custom_data?.history_text || "A série mais romântica já criada. Assista aos nossos melhores momentos."}
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-white/80 transition flex items-center gap-2">
              ▶ Assistir
            </button>
            <button className="bg-gray-500/50 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/70 transition">
              ℹ Mais Informações
            </button>
          </div>
        </div>
      </div>

      {/* Content Mock */}
      <div className="relative z-10 -mt-16 px-8 md:px-16 pb-20">
        <h3 className="text-2xl font-bold mb-6 text-gray-200">Nossa Galeria</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-[250px] h-[140px] bg-gray-800 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
