'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, HelpCircle, LayoutGrid, Lock, User } from 'lucide-react';

interface MobileDockProps {
  firstName?: string;
}

export default function MobileDock({ firstName }: MobileDockProps) {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl p-2 flex justify-between items-center px-6">
      <Link href="/" className={`flex flex-col items-center p-2 rounded-full ${pathname === '/' ? 'text-rose-400' : 'text-neutral-400 hover:text-white'} transition-colors`}>
        <Home size={22} />
        <span className="text-[10px] mt-1 font-medium">Início</span>
      </Link>
      <Link href="/como-funciona" className={`flex flex-col items-center p-2 rounded-full ${pathname === '/como-funciona' ? 'text-rose-400' : 'text-neutral-400 hover:text-white'} transition-colors`}>
        <LayoutGrid size={22} />
        <span className="text-[10px] mt-1 font-medium">Processo</span>
      </Link>
      <Link href="/faq" className={`flex flex-col items-center p-2 rounded-full ${pathname === '/faq' ? 'text-rose-400' : 'text-neutral-400 hover:text-white'} transition-colors`}>
        <HelpCircle size={22} />
        <span className="text-[10px] mt-1 font-medium">FAQ</span>
      </Link>
      
      {firstName ? (
        <Link href="/onboarding" className={`flex flex-col items-center p-2 rounded-full ${pathname === '/onboarding' ? 'text-rose-400' : 'text-neutral-400 hover:text-white'} transition-colors`}>
          <User size={22} />
          <span className="text-[10px] mt-1 font-medium">Painel</span>
        </Link>
      ) : (
        <Link href="/login" className={`flex flex-col items-center p-2 rounded-full ${pathname === '/login' ? 'text-rose-400' : 'text-neutral-400 hover:text-white'} transition-colors`}>
          <Lock size={22} />
          <span className="text-[10px] mt-1 font-medium">Login</span>
        </Link>
      )}
    </div>
  );
}
