import React from 'react';
import type { Metadata } from 'next';
import { ProtectedLayout } from '@/components/ProtectedLayout/ProtectedLayout';
import { getServerSession } from 'next-auth';
import { PATHS } from '@/helpers/paths';

export const metadata: Metadata = {
  title: 'Zayats-Yacht - Get Quote',
  description: 'Refactored Allied-Yacht application'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div>
      <ProtectedLayout
        session={session}
        allowedRoles={['admin', 'user']}
        callbackUrl={PATHS.quoteRequest}
      >
        {children}
      </ProtectedLayout>
    </div>
  );
}
