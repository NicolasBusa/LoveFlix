'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, HelpCircle, LayoutGrid, Lock, LogOut, User } from 'lucide-react';
import { signOut } from '@/app/login/actions';
import MobileDock from './MobileDock';

interface NavigationProps {
  userFullName?: string | null;
}

export default function Navigation({ userFullName }: NavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    const isHidden = pathname?.startsWith('/builder') || pathname?.startsWith('/sites/');
    if (!isHidden) {
      document.body.classList.add('pb-24', 'md:pb-0');
    } else {
      document.body.classList.remove('pb-24', 'md:pb-0');
    }

    return () => {
      document.body.classList.remove('pb-24', 'md:pb-0');
    };
  }, [pathname]);

  // Hide navigation entirely on the builder and site preview routes
  if (pathname?.startsWith('/builder') || pathname?.startsWith('/sites/')) {
    return null;
  }

  const firstName = userFullName?.split(' ')[0];

  return (
    <>
      {/* Desktop Navigation (Hidden on Mobile) */}
      <nav className="hidden md:block fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 uppercase hover:opacity-80 transition">
            Surpresa Digital
          </Link>
          <div className="flex space-x-6 text-sm font-medium text-neutral-400">
            <Link href="/" className={`${pathname === '/' ? 'text-white' : 'hover:text-white'} transition-colors duration-300`}>Início</Link>
            <Link href="/como-funciona" className={`${pathname === '/como-funciona' ? 'text-white' : 'hover:text-white'} transition-colors duration-300`}>Como Funciona</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors duration-300">Planos</Link>
            <Link href="/faq" className={`${pathname === '/faq' ? 'text-white' : 'hover:text-white'} transition-colors duration-300`}>FAQ</Link>
          </div>
          
          {firstName ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/onboarding" 
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <User size={16} /> {firstName}
              </Link>
              <button 
                onClick={() => signOut()}
                className="p-2.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-300"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Lock size={16} /> Fazer Login
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Floating Dock (Hidden on Desktop) */}
      <MobileDock firstName={firstName} />
    </>
  );
}
