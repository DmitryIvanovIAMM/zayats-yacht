import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/system";
import { customTheme } from "@/components/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import React from "react";

export const metadata: Metadata = {
  title: "Zayats-Yacht",
  description: "Refactored Allied-Yacht application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
