import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zayats-Yacht - Photo & Video Gallery',
  description: 'Refactored Allied-Yacht application'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
