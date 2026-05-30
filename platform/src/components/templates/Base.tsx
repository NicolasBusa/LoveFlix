export default function BaseTemplate({ coupleData }: { coupleData: any }) {
  // Extract data with fallbacks
  const title = coupleData.couple_title || "Nosso Amor";
  const heroImage = coupleData.hero_image_url || "/default-hero.jpg";

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800 font-sans">
      <header className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 text-5xl md:text-7xl text-white font-serif italic tracking-wide drop-shadow-lg">
          {title}
        </h1>
      </header>
      
      <main className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-light mb-6 text-rose-900">Nossa História</h2>
        <p className="text-lg leading-relaxed text-slate-700">
          {coupleData.custom_data?.history_text || "Uma linda história de amor construída dia após dia."}
        </p>
      </main>
    </div>
  );
}
