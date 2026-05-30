import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Get hostname of request (e.g. joaoemaria.seudominio.com, or localhost:3000)
  const hostname = req.headers.get('host') || 'localhost:3000';
  
  // Define allowed production domains
  const currentHost = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.yourdomain.com`, '') // Replace with actual production domain later
      : hostname.replace(`.localhost:3000`, '');

  let response = NextResponse.next();

  // If the current host is the root domain, localhost, or the local IP, do not rewrite
  const isRootDomain = [
    'localhost:3000',
    '192.168.200.117:3000',
    'yourdomain.com',
    'www.yourdomain.com',
    'app.yourdomain.com'
  ].includes(hostname);

  if (!isRootDomain) {
    // Rewrite to the dynamic site route
    url.pathname = `/sites/${currentHost}${url.pathname}`;
    response = NextResponse.rewrite(url);
  }

  // Passa a resposta para o gerenciador de sessão atualizar os cookies do SSR
  return await updateSession(req, response);
}
