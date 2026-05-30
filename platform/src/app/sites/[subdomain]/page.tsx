import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import LoveFlixTemplate from '@/components/templates/LoveFlix';
import BaseTemplate from '@/components/templates/Base';
import PasswordLockClient from './PasswordLockClient'; // We will create this wrapper

// Disable ISR since we use searchParams
export const dynamic = 'force-dynamic';

export default async function SitePage(props: {
  params: Promise<{ subdomain: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { subdomain } = await props.params;
  const searchParams = await props.searchParams;
  const token = searchParams.token as string | undefined;

  // 1. Fetch couple data from Supabase
  const { data: couple, error } = await supabase
    .from('couples')
    .select('*, templates(name)')
    .eq('subdomain', subdomain)
    .single();

  if (error || !couple) {
    console.error('Error fetching subdomain:', error);
    notFound();
  }

  // 2. Token Verification (Secure URL)
  // Se não tem token ou é inválido, escondemos o site simulando 404
  if (!token || couple.access_token !== token) {
    notFound();
  }

  // 3. Password Verification (Cookie)
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(`site_auth_${subdomain}`)?.value === 'true';

  if (!isAuthenticated) {
    // Render the password lock screen
    return <PasswordLockClient subdomain={subdomain} />;
  }

  // 4. Render the correct template based on DB (We should remove password from couple object sent to client just to be safe)
  const safeCouple = { ...couple };
  delete safeCouple.password;
  delete safeCouple.access_token;

  const templateName = couple.templates?.name;

  if (templateName === 'projetoLoveFlix') {
    return <LoveFlixTemplate coupleData={safeCouple} />;
  }

  if (templateName === 'projetoBase') {
    return <BaseTemplate coupleData={safeCouple} />;
  }

  // Default fallback if template name is somehow missing or invalid
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
      <h1 className="text-2xl">Template não configurado.</h1>
    </div>
  );
}
