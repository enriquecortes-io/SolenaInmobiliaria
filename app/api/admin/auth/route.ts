import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const { data: users, error } = await supabase
      .from("admin_users")
      .select("id, name, role, password");

    if (error || !users?.length) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    let matched = null;
    for (const u of users) {
      if (await bcrypt.compare(password, u.password)) { matched = u; break; }
    }

    if (!matched) {
      await bcrypt.hash("dummy", 12); // timing attack prevention
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: { id: matched.id, name: matched.name, role: matched.role },
    });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
