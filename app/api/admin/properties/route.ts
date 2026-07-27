import { NextResponse } from "next/server";
import { getSupabaseAdmin, checkPassword } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (!checkPassword(password)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, properties: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
