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
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider/SessionProvider';

export const metadata: Metadata = {
  title: 'Zayats-Yacht',
  description: 'Refactored Allied-Yacht application',
  authors: {
    url: 'https://www.linkedin.com/in/%D0%B4%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9-%D0%B8%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2-67816178/',
    name: 'Dmytro Ivanov'
  },
  openGraph: {
    title: 'Zayats-Yacht',
    images: [],
    type: 'website'
  }
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
  const session = await getServerSession();
  console.log('RootLayout().  session: ', session);

  return (
    <html lang="en" suppressHydrationWarning={true} className={montserrat.className}>
      <SessionProvider session={session}>
        <body>
          <Providers>
            <CssBaseline />
            <div className={styles.page}>
              <Navbar />
              {children}
              <ContactUs />
              <CopyrightFooter />
            </div>
          </Providers>
          <SpeedInsights />
        </body>
      </SessionProvider>
    </html>
  );
}
