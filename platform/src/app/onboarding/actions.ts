'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteSite(siteId: string, passwordConfirm: string) {
  const supabase = await createClient();
  
  // 1. Obter o usuário atual
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user || !user.email) {
    return { success: false, error: 'Usuário não autenticado.' };
  }

  // 2. Validar a senha chamando o signInWithPassword (simulação de verificação)
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: passwordConfirm,
  });

  if (signInError) {
    return { success: false, error: 'Senha incorreta.' };
  }

  // 3. Excluir o site do banco de dados (o RLS já garante que auth.uid() == user_id)
  const { error: deleteError } = await supabase.from('sites').delete().eq('id', siteId);

  if (deleteError) {
    return { success: false, error: 'Erro ao excluir o site no banco de dados.' };
  }

  // 4. Revalidar a página para atualizar a lista
  revalidatePath('/onboarding');
  
  return { success: true };
}
