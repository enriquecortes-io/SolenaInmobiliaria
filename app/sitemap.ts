import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

// Service role — acceso garantizado con nuevo RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL = "https://theeditmarbella.vercel.app";
const LOCALES  = ["es", "en", "fr", "ru"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: properties } = await supabase
    .from("properties")
    .select("slug, updated_at")
    .eq("activa", true);

  const slugs = properties || [];

  const staticPages = LOCALES.flatMap(locale => [
    { url:`${BASE_URL}/${locale}`,             lastModified: new Date(), priority: 1.0,  changeFrequency: "weekly"  as const },
    { url:`${BASE_URL}/${locale}/propiedades`, lastModified: new Date(), priority: 0.9,  changeFrequency: "daily"   as const },
    { url:`${BASE_URL}/${locale}/legal`,       lastModified: new Date(), priority: 0.2,  changeFrequency: "yearly"  as const },
    { url:`${BASE_URL}/${locale}/privacidad`,  lastModified: new Date(), priority: 0.2,  changeFrequency: "yearly"  as const },
    { url:`${BASE_URL}/${locale}/cookies`,     lastModified: new Date(), priority: 0.2,  changeFrequency: "yearly"  as const },
  ]);

  const propertyPages = LOCALES.flatMap(locale =>
    slugs.map(p => ({
      url: `${BASE_URL}/${locale}/propiedades/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      priority: 0.85,
      changeFrequency: "weekly" as const,
    }))
  );

  return [...staticPages, ...propertyPages];
}
