import { NextResponse } from "next/server";
import { getSupabaseAdmin, checkPassword } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { password, property } = await req.json();
    if (!checkPassword(password)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    if (!property?.slug) return NextResponse.json({ ok: false, error: "Slug requerido" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const row = { ...property, updated_at: new Date().toISOString() };
    delete row.id;

    const { data: existing } = await supabase.from("properties").select("id").eq("slug", property.slug).maybeSingle();

    let error;
    if (existing) {
      ({ error } = await supabase.from("properties").update(row).eq("slug", property.slug));
    } else {
      ({ error } = await supabase.from("properties").insert(row));
    }
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
