'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const nextUrl = formData.get('next') as string || '/onboarding'

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect(`/login?error=Credenciais inválidas&next=${nextUrl}`)
  }

  revalidatePath(nextUrl, 'layout')
  redirect(nextUrl)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;
  const phone = formData.get('phone') as string;

  // Server-side validation for password strength
  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const nextUrl = formData.get('next') as string || '/onboarding';

  if (!hasLength || !hasLetter || !hasNumber || !hasSymbol) {
    return redirect(`/login?error=A senha não atende aos requisitos mínimos de segurança.&next=${nextUrl}`);
  }

  const data = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    let errorMessage = 'Ocorreu um erro ao tentar criar a conta.';
    if (error.message.includes('already registered')) {
      errorMessage = 'Este e-mail já está cadastrado.';
    } else if (error.message.includes('Password should be')) {
      errorMessage = 'A senha informada é fraca demais.';
    }
    return redirect(`/login?error=${errorMessage}&next=${nextUrl}`);
  }

  return redirect(`/login?message=Por favor, verifique seu e-mail para confirmar o cadastro.&next=${nextUrl}`);
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string;
  
  // Como `headers()` pode estar em evolução no Next 15, para segurança caso n seja prod, usamos fallback
  const fallbackOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${fallbackOrigin}/auth/callback?next=/update-password`,
  })

  if (error) {
    return redirect(`/login?error=Erro ao solicitar recuperação de senha. Verifique o e-mail informado.`)
  }

  return redirect('/login?message=Enviamos um e-mail com as instruções para você redefinir sua senha.')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string;

  // Server-side validation for password strength
  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (!hasLength || !hasLetter || !hasNumber || !hasSymbol) {
    return redirect('/update-password?error=A senha não atende aos requisitos mínimos de segurança.');
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return redirect(`/update-password?error=Não foi possível atualizar a senha. O link pode ter expirado.`);
  }

  return redirect('/onboarding')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
