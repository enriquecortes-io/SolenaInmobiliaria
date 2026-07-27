import { NextResponse } from "next/server";
import { getSupabaseAdmin, checkPassword } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { password, slug, motivo } = await req.json();
    if (!checkPassword(password)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });

    const supabase = getSupabaseAdmin();
    const { data: prop } = await supabase.from("properties").select("*").eq("slug", slug).maybeSingle();
    if (!prop) return NextResponse.json({ ok: false, error: "No encontrada" }, { status: 404 });

    await supabase.from("property_bajas").insert({
      slug: prop.slug, titulo: prop.titulo, precio: prop.precio,
      tipo: prop.tipo, zona: prop.zona, referencia: prop.referencia, motivo,
    });
    const { error } = await supabase.from("properties").delete().eq("slug", slug);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
