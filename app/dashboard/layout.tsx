'use client';

import { SessionProvider } from 'next-auth/react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 md:ml-0 w-full">{children}</main>
      </div>
    </SessionProvider>
  );
}