import React from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@mui/system';
import { customTheme } from '@/components/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Montserrat } from 'next/font/google';
import { CssBaseline } from '@mui/material';

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
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
