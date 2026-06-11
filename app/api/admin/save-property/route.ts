import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

let _supabase: ReturnType<typeof getSupabaseAdmin> | null = null;
function getClient() {
  if (!_supabase) _supabase = getSupabaseAdmin();
  return _supabase;
}

const TIPO_PREFIX: Record<string, string> = {
  "villa":      "VILLA",
  "apartment":  "APT",
  "townhouse":  "TH",
  "plot":       "PLOT",
  "penthouse":  "PH",
};

async function generateRef(tipo: string): Promise<string> {
  const prefix = TIPO_PREFIX[tipo] || "PRO";
  const { count } = await getClient()
    .from("properties")
    .select("id", { count: "exact", head: true })
    .like("referencia", `${prefix}-%`);
  const num = 110 + (count || 0);
  return `${prefix}-${num}`;
}

async function verifyCaller(password: string): Promise<boolean> {
  const { data: users, error } = await getClient()
    .from("admin_users")
    .select("password_hash, role");
  console.log("[vc] error:", error, "users:", users?.length, "first:", JSON.stringify(users?.[0])?.slice(0, 80));
  if (!users?.length) return false;
  for (const u of users) {
    const hash = (u as any).password_hash;
    console.log("[vc] hash type:", typeof hash, "len:", String(hash).length);
    if (!hash || typeof hash !== "string") continue;
    const ok = await bcrypt.compare(String(password), String(hash));
    if (ok && (u.role === "superadmin" || u.role === "agente")) return true;
  }
  return false;
}

// Genera SEO descriptions en 4 idiomas con NVIDIA NIM
async function generateSeoDescriptions(property: any): Promise<Record<string, string>> {
  const apiKey = process.env.NVIDIA;
  if (!apiKey) return {};

  const titulo = typeof property.titulo === "object"
    ? property.titulo.es || property.titulo.en || ""
    : property.titulo || "";

  const descripcion = typeof property.descripcion === "object"
    ? property.descripcion.es || property.descripcion.en || ""
    : property.descripcion || "";

  const context = `
Propiedad: ${titulo}
Tipo: ${property.tipo || ""}
Ubicación: ${property.ubicacion || ""}
Precio: €${Number(property.precio || 0).toLocaleString("es-ES")}
Superficie: ${property.m2_construidos || ""} m²
Habitaciones: ${property.habitaciones || ""}
Baños: ${property.banos || ""}
Descripción: ${descripcion.slice(0, 500)}
  `.trim();

  const prompt = `Eres un experto en SEO para inmobiliaria de lujo. 
Genera descripciones SEO para una propiedad en 4 idiomas (es, en, fr, ru).
Cada descripción debe:
- Tener exactamente entre 140-155 caracteres
- Incluir keywords naturales de lujo inmobiliario
- Mencionar ubicación, tipo y precio si cabe
- Ser persuasiva pero elegante, nunca comercial agresiva
- NO repetir el título exacto

Datos de la propiedad:
${context}

Responde ÚNICAMENTE con JSON válido, sin markdown, sin explicaciones:
{
  "es": "descripción en español",
  "en": "description in english",
  "fr": "description en français",
  "ru": "описание на русском"
}`;

  try {
    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      console.error("NVIDIA API error:", await res.text());
      return {};
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";

    // Limpiar posibles backticks de markdown
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error("SEO generation error:", e);
    return {};
  }
}

export async function POST(req: NextRequest) {
  try {
    const { password, property } = await req.json();

    const authorized = await verifyCaller(password);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generar referencia si no tiene
    if (!property.referencia && property.tipo) {
      property.referencia = await generateRef(property.tipo);
    }

    // Limpiar campos numéricos vacíos
    const numFields = ["habitaciones","banos","m2_construidos","m2_parcela","precio","garajes","trasteros","planta","ano_construccion"];
    for (const f of numFields) {
      if (property[f] === "" || property[f] === null || (typeof property[f] === "number" && isNaN(property[f]))) {
        delete property[f];
      }
    }

    // Generar SEO descriptions automáticamente si hay descripción
    const hasDescription = property.descripcion &&
      (typeof property.descripcion === "string"
        ? property.descripcion.length > 50
        : Object.values(property.descripcion).some((v: any) => v?.length > 50));

    if (hasDescription && !property.seo_description?.es) {
      // SEO generation triggered
      const seoDesc = await generateSeoDescriptions(property);
      if (Object.keys(seoDesc).length > 0) {
        property.seo_description = seoDesc;
        // SEO descriptions ready
      }
    }

    // Traducir título y descripción automáticamente si están en texto plano
    const LANGS = ["es", "en", "fr", "ru"];
    const sourceLang = property.sourceLang || "es";

    async function translateText(text: string, source: string): Promise<Record<string, string>> {
      const translations: Record<string, string> = { [source]: text };
      const targets = LANGS.filter(l => l !== source);
      await Promise.all(targets.map(async (target) => {
        try {
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text.slice(0, 3000))}`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          const data = await res.json();
          translations[target] = data[0].map((item: any) => item[0]).join("");
        } catch {
          translations[target] = text;
        }
      }));
      return translations;
    }

    const needsTranslation = (val: any) => {
      if (typeof val === "string") return !!val;
      if (typeof val === "object" && val !== null) {
        const values = Object.values(val) as string[];
        const unique = new Set(values.filter(Boolean));
        return unique.size === 1;
      }
      return false;
    };

    const getSourceText = (val: any) => {
      if (typeof val === "string") return val;
      return (val as any)?.[sourceLang] || Object.values(val as any)[0] || "";
    };

    if (needsTranslation(property.titulo)) {
      property.titulo = await translateText(getSourceText(property.titulo), sourceLang);
    }
    if (needsTranslation(property.descripcion)) {
      property.descripcion = await translateText(getSourceText(property.descripcion), sourceLang);
    }

    const { data, error } = await getClient()
      .from("properties")
      .upsert(property, { onConflict: "slug" })
      .select();

    if (error) throw error;
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
