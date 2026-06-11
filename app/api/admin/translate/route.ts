import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

const VALID_LANGS = ["es", "en", "fr", "ru"];

async function verifyCaller(password: string): Promise<boolean> {
  const { data: users } = await getSupabaseAdmin()
    .from("admin_users")
    .select("password_hash, role");
  if (!users?.length) return false;
  for (const u of users) {
    const hash = (u as any).password_hash;
    if (!hash || typeof hash !== "string") continue;
    const ok = await bcrypt.compare(String(password), hash);
    if (ok) return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, text, sourceLang } = body;

    if (!password || !await verifyCaller(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof text !== "string" || text.length === 0 || text.length > 5000) {
      return NextResponse.json({ error: "Texto inválido" }, { status: 400 });
    }

    if (!VALID_LANGS.includes(sourceLang)) {
      return NextResponse.json({ error: "Idioma inválido" }, { status: 400 });
    }

    const targets = VALID_LANGS.filter(l => l !== sourceLang);
    const translations: Record<string, string> = { [sourceLang]: text };

    for (const target of targets) {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      const translated = data[0].map((item: any) => item[0]).join("");
      translations[target] = translated;
    }

    return NextResponse.json({ translations });
  } catch (e) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
