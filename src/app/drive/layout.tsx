import { ReactNode } from 'react';

// PROJECT IMPORTS
import DashboardLayout from '@/layout/DashboardLayout';
import AuthGuard from '@/utils/route-guard/AuthGuard';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}