import { metadata } from "@/base/meta/meta";

import "./globals.css";

import { ThemeModeScript } from "flowbite-react";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

metadata.manifest = "/manifest.json";

export { metadata };

import { openSans } from "@/base/font/Fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${openSans.variable} antialiased`}
      >
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}
