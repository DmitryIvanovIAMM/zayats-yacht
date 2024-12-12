import React from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@mui/system';
import { customTheme } from '@/components/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Montserrat } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Zayats-Yacht',
  description: 'Refactored Allied-Yacht application'
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={montserrat.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
