import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/system";
import { customTheme } from "@/components/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import React from "react";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "Zayats-Yacht",
  description: "Refactored Allied-Yacht application",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
console.log("montserrat: ", montserrat);
console.log("montserrat.className: ", montserrat.className);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
