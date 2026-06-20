import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/ui/SplashScreen";
import { LanguageProvider } from "@/providers/LanguageProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KEKELI Creative Agency — Agence de communication à Dakar",
    template: "%s | KEKELI Creative Agency",
  },
  description:
    "KEKELI Creative Agency accompagne les entreprises, artistes et événements à Dakar avec une communication percutante et une stratégie digitale d'impact.",
  keywords: ["agence communication Dakar", "agence digitale Sénégal", "stratégie digitale Afrique", "photo shooting Dakar", "développement web Sénégal", "communication artiste"],
  authors: [{ name: "KEKELI Creative Agency" }],
  creator: "KEKELI Creative Agency",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://kekelicreativeagency.com"),
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: "KEKELI Creative Agency",
    title: "KEKELI Creative Agency — Mettre la lumière sur votre projet",
    description: "Agence de communication basée à Dakar, Sénégal. Communication, stratégie digitale, photo & vidéo.",
    /* opengraph-image.tsx génère l'image dynamiquement */
  },
  twitter: {
    card: "summary_large_image",
    site: "@kekeli_agency",
    title: "KEKELI Creative Agency — Mettre la lumière sur votre projet",
    description: "Agence de communication basée à Dakar, Sénégal.",
    /* opengraph-image.tsx génère l'image dynamiquement */
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://kekelicreativeagency.com/#organization",
  name: "KEKELI Creative Agency",
  url: "https://kekelicreativeagency.com",
  logo: {
    "@type": "ImageObject",
    url: "https://kekelicreativeagency.com/images/logo-kekeli.png",
    width: 512,
    height: 512,
  },
  sameAs: [
    "https://www.instagram.com/kekeli_agency",
    "https://www.facebook.com/kekelicreativeagency",
    "https://www.linkedin.com/company/kekeli-creative-agency",
    "https://www.youtube.com/@kekelicreativeagency",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SZR10E0WGB" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SZR10E0WGB');
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <LanguageProvider>
          <SplashScreen />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
