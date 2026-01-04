import { Analytics } from "@vercel/analytics/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "gp-grid - Fast TypeScript Data Grid",
    template: "%s | gp-grid",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: "gp-grid - Fast TypeScript Data Grid",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "gp-grid - Fast TypeScript Data Grid",
    description: siteConfig.description,
  },
  icons: {
    icon: [
      {
        url: "/logo-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
