'use client';

import { useEffect, useRef, useState } from 'react';
import { Monitor, LogIn, Home, Loader2 } from 'lucide-react';

interface PreviewMockupProps {
  config: any;
}

const PAGES = [
  { id: 'profile', label: 'Perfil', icon: Monitor, src: '/preview-template/index.html?preview=1' },
  { id: 'login', label: 'Login', icon: LogIn, src: '/preview-template/login.html?preview=1' },
  { id: 'home', label: 'Home', icon: Home, src: '/preview-template/home.html?preview=1' },
];

export default function PreviewMockup({ config }: PreviewMockupProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const configRef = useRef(config);
  const [activePage, setActivePage] = useState('profile');
  const [loading, setLoading] = useState(true);

  configRef.current = config;

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_CONFIG',
        config
      }, '*');
    }
  }, [config]);

  const handleIframeLoad = () => {
    setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'UPDATE_CONFIG',
          config: configRef.current
        }, '*');
      }
      setLoading(false);
    }, 150);
  };

  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    setLoading(true);
    const page = PAGES.find(p => p.id === pageId);
    if (page && iframeRef.current) {
      iframeRef.current.src = page.src;
    }
  };

  const currentPage = PAGES.find(p => p.id === activePage) || PAGES[0];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-neutral-950 p-4">

      {/* iPhone Mockup Container */}
      <div className="relative w-full max-w-[280px] aspect-[9/19.5] bg-black rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border-[6px] border-neutral-800 overflow-hidden ring-1 ring-white/10">
        
        {/* Dynamic Island */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-1/3 h-5 bg-black rounded-b-2xl"></div>
        </div>

        {/* Loading Overlay — hides old data flash */}
        {loading && (
          <div className="absolute inset-0 z-40 bg-[#0a0a0a] flex items-center justify-center">
            <Loader2 size={24} className="text-red-500 animate-spin" />
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={currentPage.src}
          className="w-full h-full border-none bg-[#0a0a0a]"
          title="LoveFlix Preview"
          sandbox="allow-scripts allow-same-origin"
          onLoad={handleIframeLoad}
        />
        
        {/* Shine Effect */}
        <div className="absolute inset-0 pointer-events-none rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent opacity-50"></div>
      </div>

      {/* Page Navigator */}
      <div className="flex items-center gap-1 mt-4 bg-neutral-900/80 rounded-full p-1 border border-white/10">
        {PAGES.map((page) => {
          const Icon = page.icon;
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => handlePageChange(page.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={13} />
              {page.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
