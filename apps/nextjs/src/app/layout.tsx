import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { Toaster } from "@hermes/ui";

import { Analytics } from "~/components/analytics";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeProvider } from "~/components/theme-provider";
import { siteConfig } from "~/config/site";
import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "article",
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage.toString(),
        width: 1200,
        height: 530,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={[
          "relative m-0 min-h-full max-w-[100vw] font-sans",
          fontSans.variable,
        ].join(" ")}
      >
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {props.children}
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
