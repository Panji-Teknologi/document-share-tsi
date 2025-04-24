'use client';

import { useEffect, ReactNode } from 'react';

// next
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// project import
import Loader from '@/components/Loader';
import { APP_LOGGED_IN_PATH } from '@/config';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      let redirectPath = APP_LOGGED_IN_PATH;
      router.push(redirectPath);
    }
  }, [status]);

  if (status === 'loading') return <Loader />;

  return children;
};

export default GuestGuard;
