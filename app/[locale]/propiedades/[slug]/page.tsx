import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import PropertyPage from "@/components/Property/PropertyPage";

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
    .eq("slug", slug).single();

  if (!p) return { title: "The Edit Marbella" };

  const titulo = p.titulo?.[locale] || p.titulo?.es || "Propiedad";
  const desc   = p.descripcion?.[locale] || p.descripcion?.es || "";
  const precio = p.precio ? `€${Number(p.precio).toLocaleString("es-ES")}` : "";
  const image  = p.galeria_urls?.[0]
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/properties${p.galeria_urls[0]}`
    : "https://theeditmarbella.vercel.app/og-default.jpg";

  const title = `${titulo} — ${p.ubicacion || "Marbella"} | The Edit Marbella`;
  const description = desc.slice(0, 155) || `${p.tipo} en ${p.ubicacion} · ${precio}`;

  return {
    title, description,
    openGraph: { title, description, images:[{ url:image, width:1200, height:800, alt:titulo }], type:"website", siteName:"The Edit Marbella", locale },
    twitter: { card:"summary_large_image", title, description, images:[image] },
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

  return <PropertyPage property={property} locale={locale} />;
}
