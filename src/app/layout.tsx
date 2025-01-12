import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import layoutStyles from '@/components/layout/layout.module.css';
import { siteData } from "@/const/const";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";


const siteName = 'mumemo';
const description = 'Notion + Vercelで開発した個人サイト.情報技術を中心に雑多なことを書いていきます.';

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'mumemo',
  title: {
    default: siteName,
    template: `%s - ${siteName}`
  },
  description: description,
  colorScheme: "dark light",
  openGraph: {
    title: siteName,
    description: description,
    url: siteData.url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
    images: {
      url: "/icon.svg",
      width: 1200,
      height: 600,
    }
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.png',
    apple: '/icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className={layoutStyles.grid}>
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
