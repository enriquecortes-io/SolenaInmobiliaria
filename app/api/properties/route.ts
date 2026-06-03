import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Anon key es correcto aquí — es un endpoint público de solo lectura
// RLS ya garantiza que solo devuelve propiedades activas
const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Caché en memoria — evita martillear Supabase con cada visita
let cache: { data: any; ts: number } | null = null;
const CACHE_TTL = 60 * 1000; // 60 segundos

export const dynamic = "force-dynamic";

export async function GET() {
 try {
   const now = Date.now();

   // Devolver caché si está fresco
   if (cache && now - cache.ts < CACHE_TTL) {
     return NextResponse.json(
       { properties: cache.data },
       {
         headers: {
           "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
           "X-Cache": "HIT",
         },
       }
     );
   }

   const { data, error } = await supabase
     .from("properties")
     .select("slug,titulo,descripcion,precio,ubicacion,zona,tipo,m2_construidos,m2_parcela,habitaciones,banos,galeria_urls")
     .eq("activa", true)
     .order("created_at", { ascending: false })
     .limit(5);

   if (error) throw error;

   // Actualizar caché
   cache = { data, ts: now };

   return NextResponse.json(
     { properties: data },
     {
       headers: {
         "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
         "X-Cache": "MISS",
       },
     }
   );
 } catch (e: any) {
   return NextResponse.json({ error: e.message }, { status: 500 });
 }
}
