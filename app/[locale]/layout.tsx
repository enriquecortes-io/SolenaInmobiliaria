import type { Metadata } from "next";
import SkyBackground from "@/components/SkyBackground";
import CookieBanner from "@/components/CookieBanner";
import LegalFooter from "@/components/LegalFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { notFound } from "next/navigation";

const locales = ["en", "es", "fr", "ru"];

const META: Record<string, { title: string; description: string }> = {
  es: {
    title: "The Edit Marbella — Real Estate Curators | Marbella",
    description: "Selección privada de propiedades ultra-exclusivas en Marbella y la Costa del Sol. Real Estate Curators.",
  },
  en: {
    title: "The Edit Marbella — Real Estate Curators | Marbella",
    description: "A private selection of ultra-luxury properties in Marbella and the Costa del Sol. Real Estate Curators.",
  },
  fr: {
    title: "The Edit Marbella — Real Estate Curators | Marbella",
    description: "Une sélection privée de propriétés ultra-luxe à Marbella et la Costa del Sol. Real Estate Curators.",
  },
  ru: {
    title: "The Edit Marbella — Real Estate Curators | Marbella",
    description: "Частная подборка элитной недвижимости в Марбелье и Коста-дель-Соль. Real Estate Curators.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META["en"];
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: "The Edit Marbella",
      description: m.description,
      images: [{ url:"https://mdlm-xi.vercel.app/og-default.jpg", width:1200, height:630 }],
      type: "website",
      siteName: "The Edit Marbella",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: "The Edit Marbella",
      description: m.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale}>
      
      <link rel="preload" href="/fonts/cormorant-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      <link rel="preload" href="/fonts/montserrat-300.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="/fonts/fonts.css"/>
      <body style={{ background: "#FAFAF7", margin: 0 }}>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wvt1b8ox5g");` }}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "The Edit Marbella",
          "description": "A private selection of ultra-luxury properties in Marbella. Real Estate Curators.",
          "url": "https://mdlm-xi.vercel.app",
          "areaServed": ["Marbella", "Estepona", "Sotogrande", "Costa del Sol"],
          "priceRange": "€€€€€",
          "address": { "@type": "PostalAddress", "addressRegion": "Andalucía", "addressCountry": "ES" }
        })}} />
        {children}<CookieBanner /><LegalFooter /><WhatsAppButton /></body>
    </html>
  );
}
