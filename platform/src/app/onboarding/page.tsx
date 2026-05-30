import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function Onboarding() {
  const supabase = await createClient();
  
  // Obter o usuário logado
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Buscar os sites vinculados a esse usuário que estão ativos
  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Map the sites to match the DashboardClient Site interface
  const mappedSites = (sites || []).map(site => ({
    id: site.id,
    slug: site.slug,
    created_at: site.created_at,
    access_token: site.access_token,
  }));

  return <DashboardClient initialSites={mappedSites} />;
}
