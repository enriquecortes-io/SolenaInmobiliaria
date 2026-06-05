import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import PropertyExperience from "@/components/Experience/PropertyExperience";

// Service role — server only
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL = "https://theeditmarbella.vercel.app";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Convierte cualquier formato de imagen a URL absoluta crawleable por Google
function resolveOgImage(url: string | undefined): string {
  if (!url) return `${BASE_URL}/og-default.jpg`;
  // Ya es absoluta
  if (url.startsWith("http")) return url;
  // Ruta de Supabase storage
  if (url.startsWith("/gallery/")) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/properties${url}`;
  }
  // Google Drive — usar el proxy de imagen optimizada del propio sitio
  if (url.startsWith("/api/drive?id=")) {
    const id = url.replace("/api/drive?id=", "");
    return `${BASE_URL}/api/image?id=${id}&w=1200&q=85`;
  }
  return `${BASE_URL}/og-default.jpg`;
}

export async function generateStaticParams() {
  const { data } = await supabase.from("properties").select("slug").eq("activa", true);
  const slugs = data?.map(p => p.slug) || [];
  const locales = ["es", "en", "fr", "ru"];
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: p } = await supabase
    .from("properties")
    .select("titulo, ubicacion, precio, tipo, descripcion, galeria_urls, m2_construidos, habitaciones, banos")
    .eq("slug", slug)
    .single();

  if (!p) return { title: "The Edit Marbella" };

  const titulo  = p.titulo?.[locale]      || p.titulo?.es      || "Propiedad";
  const desc    = p.descripcion?.[locale] || p.descripcion?.es || "";
  const precio  = p.precio ? `€${Number(p.precio).toLocaleString("es-ES")}` : "";
  const ogImage = resolveOgImage(p.galeria_urls?.[0]);

  const title = `${titulo} — ${p.ubicacion || "Marbella"} | The Edit Marbella`;
  // Usar seo_description generada por IA si existe, sino fallback editorial
  const description = (
    p.seo_description?.[locale] ||
    p.seo_description?.es ||
    desc.slice(0, 120) ||
    `${p.tipo} en ${p.ubicacion} · ${precio}`
  ).slice(0, 155);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",          // ← correcto para inmobiliario
    "name": titulo,
    "description": description,
    "url": `${BASE_URL}/${locale}/propiedades/${slug}`,
    "image": p.galeria_urls?.map(resolveOgImage) || [ogImage],
    "offers": {
      "@type": "Offer",
      "price": p.precio,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": p.m2_construidos,
      "unitCode": "MTK",
    },
    "numberOfRooms": p.habitaciones,
    "numberOfBathroomsTotal": p.banos,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": p.ubicacion,
      "addressRegion": "Andalucía",
      "addressCountry": "ES",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "The Edit Marbella", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": locale === "fr" ? "Propriétés" : locale === "ru" ? "Недвижимость" : "Propiedades", "item": `${BASE_URL}/${locale}/propiedades` },
      { "@type": "ListItem", "position": 3, "name": titulo, "item": `${BASE_URL}/${locale}/propiedades/${slug}` },
    ],
  };

  return {
    title,
    description,
    openGraph: {
      title, description,
      images: [{ url: ogImage, width: 1200, height: 800, alt: titulo }],
      type: "website",
      siteName: "The Edit Marbella",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title, description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/propiedades/${slug}`,
      languages: {
        "es": `${BASE_URL}/es/propiedades/${slug}`,
        "en": `${BASE_URL}/en/propiedades/${slug}`,
        "fr": `${BASE_URL}/fr/propiedades/${slug}`,
        "ru": `${BASE_URL}/ru/propiedades/${slug}`,
      },
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
      "script:ld+json:breadcrumb": JSON.stringify(breadcrumbLd),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;

  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("activa", true)
    .single();

  if (!property) notFound();

  return <PropertyExperience property={property} locale={locale} />;
}
