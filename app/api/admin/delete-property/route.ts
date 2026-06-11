import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

async function verifyCaller(password: string): Promise<boolean> {
  const { data: users } = await getSupabaseAdmin()
    .from("admin_users")
    .select("password_hash, role");
  if (!users?.length) return false;
  for (const u of users) {
    const hash = (u as any).password_hash;
    if (!hash || typeof hash !== "string") continue;
    const ok = await bcrypt.compare(String(password), hash);
    if (ok && u.role === "superadmin") return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { password, slug, motivo } = await req.json();
    if (!await verifyCaller(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!slug || !motivo) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Guardar datos antes de borrar
    const { data: prop } = await getSupabaseAdmin()
      .from("properties")
      .select("slug, titulo, precio, tipo, zona, referencia")
      .eq("slug", slug)
      .single();

    if (prop) {
      await getSupabaseAdmin().from("property_bajas").insert({
        slug: prop.slug,
        titulo: prop.titulo,
        precio: prop.precio,
        tipo: prop.tipo,
        zona: prop.zona,
        referencia: prop.referencia,
        motivo,
      });
    }

    const { error } = await getSupabaseAdmin().from("properties").delete().eq("slug", slug);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
