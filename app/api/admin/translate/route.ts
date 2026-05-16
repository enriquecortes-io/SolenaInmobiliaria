import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, sourceLang } = await req.json();

    const targets = ["es", "en", "fr", "ru"].filter(l => l !== sourceLang);
    const translations: Record<string, string> = { [sourceLang]: text };

    for (const target of targets) {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      // La respuesta es un array anidado — extraer el texto traducido
      const translated = data[0].map((item: any) => item[0]).join("");
      translations[target] = translated;
    }

    return NextResponse.json({ translations });
  } catch (e) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
