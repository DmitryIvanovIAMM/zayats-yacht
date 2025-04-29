import React from 'react';
import type { Metadata } from 'next';
import { ProtectedLayout } from '@/components/ProtectedLayout/ProtectedLayout';
import { getServerSession } from 'next-auth';
import { PATHS } from '@/helpers/paths';
import PageNavigationTabs, { Tab } from '@/components/PageNavigationTabs/PageNavigationTabs';

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

  const tabs: Tab[] = [
    { label: 'Quote Requests', link: '/admin/users-requests' },
    { label: 'Schedule Management', link: '/admin/schedule-management' },
    { label: 'Ports', link: '/admin/ports' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '15px'
      }}
    >
      <ProtectedLayout session={session} allowedRoles={['admin']} callbackUrl={PATHS.usersRequests}>
        <PageNavigationTabs tabs={tabs} />
        {children}
      </ProtectedLayout>
    </div>
  );
}
