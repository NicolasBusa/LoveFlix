'use client';

import { useRouter } from 'next/navigation';
import PasswordLock from '@/components/templates/PasswordLock';
import { verifySitePassword } from './actions';

export default function PasswordLockClient({ subdomain }: { subdomain: string }) {
  const router = useRouter();

  const handleUnlock = async (password: string) => {
    const { success } = await verifySitePassword(subdomain, password);
    
    if (success) {
      // Reload the page to trigger the server component again, which will now see the cookie
      router.refresh();
      return true;
    }
    
    return false;
  };

  return <PasswordLock onUnlock={handleUnlock} />;
}
