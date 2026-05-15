import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, sourceLang } = await req.json();

    const targets = ["es", "en", "fr", "ru"].filter(l => l !== sourceLang);
    const translations: Record<string, string> = { [sourceLang]: text };

    for (const target of targets) {
      const langNames: Record<string, string> = {
        es: "Spanish", en: "English", fr: "French", ru: "Russian"
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Translate the following real estate text from ${langNames[sourceLang]} to ${langNames[target]}. Return ONLY the translation, no explanations:\n\n${text}`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      translations[target] = data.candidates[0].content.parts[0].text.trim();
    }

    return NextResponse.json({ translations });
  } catch (e) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
