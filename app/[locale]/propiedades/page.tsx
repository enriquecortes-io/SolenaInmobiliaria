import { getSupabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";
import { headers } from "next/headers";
import { Metadata } from "next";
import { Property } from "@/types/property";
import PropertiesExperience from "@/components/Properties/PropertiesExperience";

const BASE_URL = "https://theeditmarbella.vercel.app";

const META: Record<string, { title: string; description: string }> = {
 es: { title: "Propiedades Ultra-Exclusivas en Marbella | The Edit Marbella", description: "Selección curada de villas, penthouses y propiedades de lujo en Marbella, Golden Mile y Costa del Sol." },
 en: { title: "Ultra-Luxury Properties in Marbella | The Edit Marbella", description: "A curated selection of luxury villas, penthouses and properties in Marbella, Golden Mile and Costa del Sol." },
 fr: { title: "Propriétés Ultra-Luxe à Marbella | The Edit Marbella", description: "Une sélection de villas, penthouses et propriétés de luxe à Marbella, Golden Mile et Costa del Sol." },
 ru: { title: "Элитная Недвижимость в Марбелье | The Edit Marbella", description: "Подборка вилл, пентхаусов и элитной недвижимости в Марбелье, Голден Майл и Коста-дель-Соль." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
 const { locale } = await params;
 const m = META[locale] || META["en"];
 return {
   title: m.title,
   description: m.description,
   openGraph: {
     title: m.title,
     description: m.description,
     images: [{ url: `${BASE_URL}/og-default.jpg`, width: 1200, height: 630 }],
     type: "website",
     siteName: "The Edit Marbella",
   },
   alternates: {
     canonical: `${BASE_URL}/${locale}/propiedades`,
     languages: {
       "es": `${BASE_URL}/es/propiedades`,
       "en": `${BASE_URL}/en/propiedades`,
       "fr": `${BASE_URL}/fr/propiedades`,
       "ru": `${BASE_URL}/ru/propiedades`,
     },
   },
 };
}

const supabase = getSupabase();

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ zona?: string; tipo?: string; precio?: string }>;
}

// Mapeo de rangos de precio a valores numéricos
const PRECIO_RANGES: Record<string, { min: number; max?: number }> = {
  "500k-1m": { min: 500000,   max: 1000000 },
  "1m-2m":   { min: 1000000,  max: 2000000 },
  "2m-5m":   { min: 2000000,  max: 5000000 },
  "5m+":     { min: 5000000 },
};

export default async function PropertiesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { zona, tipo, precio } = await searchParams;

  // Construir query Supabase con filtros
  let query = supabase
    .from("properties")
    .select("slug,titulo,precio,ubicacion,tipo,zona,m2_construidos,m2_parcela,habitaciones,banos,galeria_urls,destacada,id,descripcion,video_url,infografias,activa")
    .eq("activa", true);

  // Filtro zona — usa columna zona exacta
  if (zona) {
    query = query.eq("zona", zona);
  }

  // Filtro tipo — villa, atico, etc
  if (tipo) {
    query = query.eq("tipo", tipo);
  }

  // Filtro precio — rango numérico
  if (precio && PRECIO_RANGES[precio]) {
    const range = PRECIO_RANGES[precio];
    query = query.gte("precio", range.min);
    if (range.max) query = query.lte("precio", range.max);
  }

  const { data, error } = await query.order("destacada", { ascending: false });

  const properties: Property[] = error ? [] : (data || []);

  const headersList = await headers();
  const ua = headersList.get("user-agent") || "";
  const isMobile = /iPhone|Android|Mobile|iPad/i.test(ua);

  return (
    <PropertiesExperience
      properties={properties}
      locale={locale}
      filters={{ zona, tipo, precio }}
      isMobile={isMobile}
    />
  );
}
