import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const { data: p } = await supabase
    .from("properties")
    .select("titulo, ubicacion, precio, tipo, descripcion, galeria_urls")
    .eq("slug", slug)
    .single();

  if (!p) return { title: "The Edit Marbella" };

  const titulo = p.titulo?.[locale] || p.titulo?.["es"] || "Propiedad";
  const desc   = p.descripcion?.[locale] || p.descripcion?.["es"] || "";
  const precio = p.precio ? `€${Number(p.precio).toLocaleString("es-ES")}` : "";
  const image  = p.galeria_urls?.[0] || "https://theeditmarbella.vercel.app/og-default.jpg";

  const title       = `${titulo} — ${p.ubicacion || "Marbella"} | The Edit Marbella`;
  const description = desc
    ? desc.slice(0, 155)
    : `${p.tipo || "Propiedad"} en ${p.ubicacion || "Marbella"}${precio ? ` · ${precio}` : ""} · The Edit Marbella`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 800, alt: titulo }],
      type: "website",
      siteName: "The Edit Marbella",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PropiedadPage({ params }: Props) {
  const { locale, slug } = await params;
  // Redirigir a la home con el slug como parámetro
  // La home maneja el modal de propiedad via query param
  redirect(`/${locale}?propiedad=${slug}`);
}
