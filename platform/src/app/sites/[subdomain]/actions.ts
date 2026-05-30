'use server';

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function verifySitePassword(subdomain: string, passwordAttempt: string) {
  // Busca a senha correta
  const { data: couple, error } = await supabase
    .from('couples')
    .select('password')
    .eq('subdomain', subdomain)
    .single();

  if (error || !couple) {
    return { success: false };
  }

  // Verifica
  if (couple.password === passwordAttempt) {
    // Se estiver correta, seta um cookie seguro de sessão (expira ao fechar o navegador)
    const cookieStore = await cookies();
    cookieStore.set(`site_auth_${subdomain}`, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true };
  }

  return { success: false };
}
