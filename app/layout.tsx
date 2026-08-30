import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Providers } from "@/providers";
import ShellLayout from "@/components/ShellLayout";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "digital agency",
    "web development",
    "UI/UX design",
    "SEO",
    "Next Solution",
    "web design",
    "digital marketing",
    "branding",
    "AI Services",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  classification: "Digital Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/logow.png",
    apple: "/logo.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
  ];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':'dark';document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-[#0A0A0A] dark:text-neutral-50">
        <Providers>
          <ShellLayout>
            {children}
          </ShellLayout>
        </Providers>
      </body>
    </html>
  );
}
