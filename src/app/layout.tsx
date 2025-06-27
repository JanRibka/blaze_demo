import type { Viewport } from "next";
import "../styles/globals.css";

import ToastProvider from "@/components/toastProvider";
import { fontSans } from "@/config/heroUI/app/fonts";
import { Providers } from "@/config/heroUI/providers";
import { mergeStyles } from "@/lib/utils/styles";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={mergeStyles(
          "min-h-screen font-sans overflow-hidden",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ToastProvider
            placement="top-center"
            toastOffset={60}
            toastProps={{ timeout: 5000, shouldShowTimeoutProgress: true }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
