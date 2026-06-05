import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(

async function verifyCaller(password: string): Promise<boolean> {
  const { data: users } = await supabase.from("admin_users").select("password, role");
  if (!users?.length) return false;
  for (const u of users) {
    const ok = await bcrypt.compare(password, u.password);
    if (ok) return true;
  }
  return false;
}
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!await verifyCaller(password)) {
      return NextResponse.json({ error:"Unauthorized" }, { status:401 });
    }
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ leads: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status:500 });
  }
}
