import React from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import styles from '@/app/page.module.css';
import Navbar from '@/components/Navbar/Navbar';
import CopyrightFooter from '@/components/CopyrightFooter';
import ContactUs from '@/components/ContactUs/ContactUs';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Zayats-Yacht',
  description: 'Refactored Allied-Yacht application'
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={montserrat.className}>
      <body>
        <Providers>
          <CssBaseline />
          <div className={styles.page}>
            <Navbar isAuthenticated={false} />
            {children}
            <ContactUs />
            <CopyrightFooter />
          </div>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
