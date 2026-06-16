import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

const supabase = getSupabaseAdmin();

async function verifySuperadmin(password: string): Promise<boolean> {
  const { data: users } = await supabase.from("admin_users").select("password_hash, role");
  if (!users?.length) return false;
  for (const u of users) {
    if (await bcrypt.compare(password, u.password_hash) && u.role === "superadmin") return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { password, action, user } = await req.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!await verifySuperadmin(password)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (action === "list") {
      const { data } = await supabase.from("admin_users").select("id,name,role,created_at").order("created_at");
      return NextResponse.json({ users: data });
    }

    if (action === "create") {
      if (!user?.password) return NextResponse.json({ error: "Password requerido" }, { status: 400 });
      const hashed = await bcrypt.hash(user.password, 12);
      const { password: _pw, ...userWithout } = user;
      const { data, error } = await supabase.from("admin_users").insert({ ...userWithout, password_hash: hashed }).select("id,name,role,created_at").single();
      if (error) throw error;
      return NextResponse.json({ ok: true, user: data });
    }

    if (action === "update") {
      const updates = { ...user };
      if (updates.password) { updates.password_hash = await bcrypt.hash(updates.password, 12); delete updates.password; }
      const { data, error } = await supabase.from("admin_users").update(updates).eq("id", user.id).select("id,name,role,created_at").single();
      if (error) throw error;
      return NextResponse.json({ ok: true, user: data });
    }

    if (action === "delete") {
      await supabase.from("admin_users").delete().eq("id", user.id);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Acción desconocida" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
