import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL = "https://theeditmarbella.vercel.app";
const LOCALES  = ["es", "en", "fr", "ru"];

export async function GET() {
 const { data: properties } = await supabase
   .from("properties")
   .select("slug, updated_at")
   .eq("activa", true);

 const slugs = properties || [];
 const now = new Date().toISOString();

 const staticPages = LOCALES.flatMap(locale => [
   { url:`${BASE_URL}/${locale}`,             lastmod: now, changefreq:"weekly",  priority:"1.0" },
   { url:`${BASE_URL}/${locale}/propiedades`, lastmod: now, changefreq:"daily",   priority:"0.9" },
   { url:`${BASE_URL}/${locale}/legal`,       lastmod: now, changefreq:"yearly",  priority:"0.2" },
   { url:`${BASE_URL}/${locale}/privacidad`,  lastmod: now, changefreq:"yearly",  priority:"0.2" },
   { url:`${BASE_URL}/${locale}/cookies`,     lastmod: now, changefreq:"yearly",  priority:"0.2" },
 ]);

 const propertyPages = LOCALES.flatMap(locale =>
   slugs.map(p => ({
     url: `${BASE_URL}/${locale}/propiedades/${p.slug}`,
     lastmod: p.updated_at ? new Date(p.updated_at).toISOString() : now,
     changefreq: "weekly",
     priority: "0.85",
   }))
 );

 const allPages = [...staticPages, ...propertyPages];

 const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
   <loc>${p.url}</loc>
   <lastmod>${p.lastmod}</lastmod>
   <changefreq>${p.changefreq}</changefreq>
   <priority>${p.priority}</priority>
 </url>`).join("\n")}
</urlset>`;

 return new NextResponse(xml, {
   headers: {
     "Content-Type": "application/xml; charset=utf-8",
     "Cache-Control": "public, max-age=3600, must-revalidate",
   },
 });
}
