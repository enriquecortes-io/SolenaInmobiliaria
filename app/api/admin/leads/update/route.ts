import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const supabase = getSupabaseAdmin();

async function verifyCaller(password: string): Promise<boolean> {
  const { data: users } = await supabase
    .from("admin_users")
    .select("password_hash, role");
  if (!users?.length) return false;
  for (const u of users) {
    const ok = await bcrypt.compare(password, u.password_hash);
    if (ok) return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { password, id, agente, notas } = await req.json();
    if (!await verifyCaller(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const updates: Record<string, any> = {};
    if (agente !== undefined) updates.agente = agente;
    if (notas !== undefined) updates.notas = notas;
    await supabase.from("leads").update(updates).eq("id", id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
