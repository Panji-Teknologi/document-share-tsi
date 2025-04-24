'use client';

import { useEffect, ReactNode } from 'react';

// next
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// project-import
import Loader from '@/components/Loader';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/');
    }
  }, [status]);

  if (status === 'loading') return <Loader />;

  return children;
};

export default AuthGuard;
