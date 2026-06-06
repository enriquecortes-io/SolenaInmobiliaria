import { getSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/config";

const supabase = getSupabase();
const LOCALES = ["es", "en", "fr", "ru"];

export async function GET() {
  const { data: properties } = await supabase
    .from("properties")
    .select("slug, updated_at")
    .eq("activa", true);

  const slugs = properties || [];
  const now = new Date().toISOString();

  const staticPaths = [
    { path: "",             changefreq: "weekly", priority: "1.0" },
    { path: "/propiedades", changefreq: "daily",  priority: "0.9" },
    { path: "/legal",       changefreq: "yearly", priority: "0.2" },
    { path: "/privacidad",  changefreq: "yearly", priority: "0.2" },
    { path: "/cookies",     changefreq: "yearly", priority: "0.2" },
  ];

  const alts = (path: string) =>
    LOCALES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${path}"/>`).join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}"/>`;

  const staticEntries = LOCALES.flatMap(locale =>
    staticPaths.map(({ path, changefreq, priority }) =>
      `  <url>\n    <loc>${BASE_URL}/${locale}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alts(path)}\n  </url>`
    )
  );

  const propertyEntries = LOCALES.flatMap(locale =>
    slugs.map(p => {
      const lastmod = p.updated_at ? new Date(p.updated_at).toISOString() : now;
      const path = `/propiedades/${p.slug}`;
      return `  <url>\n    <loc>${BASE_URL}/${locale}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n${alts(path)}\n  </url>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticEntries, ...propertyEntries].join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
