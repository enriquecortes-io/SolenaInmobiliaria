import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const C = {
  bg: "#FAFAF7", dark: "#1A0E08", gold: "#C9A96E",
  text: "#1A1714", muted: "rgba(45,74,62,0.75)", border: "#DDD8D0",
};
const SERIF = "'Libre Baskerville', Georgia, serif";
const SANS = "'Inter', sans-serif";

const T = (v: any): string =>
  v && typeof v === "object" ? v.es || v.en || "" : v || "";

async function getProperty(slug: string) {
  const supabase = createClient(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, ""),
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("activa", true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return { title: "Propiedad no encontrada · Solena" };
  return {
    title: `${T(p.titulo)} · Solena Inmobiliaria`,
    description: T(p.descripcion).slice(0, 155) || "Propiedad en la Costa del Sol",
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) notFound();

  const titulo = T(p.titulo);
  const descripcion = T(p.descripcion);
  const fotos: string[] = Array.isArray(p.galeria_urls) ? p.galeria_urls.filter(Boolean) : [];
  const precio = p.precio
    ? Number(p.precio).toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
    : "Precio a consultar";

  const stats = [
    { label: "Habitaciones", value: p.habitaciones },
    { label: "Baños", value: p.banos },
    { label: "M² construidos", value: p.m2_construidos },
    { label: "M² parcela", value: p.m2_parcela },
    { label: "M² terraza", value: p.m2_terraza },
    { label: "Parking", value: p.plazas_parking },
  ].filter(s => s.value && Number(s.value) > 0);

  const ficha = [
    { label: "Referencia", value: p.referencia },
    { label: "Tipo", value: p.tipo },
    { label: "Zona", value: p.zona },
    { label: "Ubicación", value: p.ubicacion },
    { label: "Estado", value: p.estado },
    { label: "Orientación", value: p.orientacion },
    { label: "Amueblado", value: p.amueblado },
    { label: "Cert. energético", value: p.certificado_energetico },
    { label: "Año construcción", value: p.ano_construccion },
  ].filter(f => f.value);

  const amenidades: string[] = Array.isArray(p.amenidades) ? p.amenidades : [];

  const LABEL: React.CSSProperties = {
    fontFamily: SANS, fontSize: "0.6rem", letterSpacing: "0.3em",
    textTransform: "uppercase", color: "rgba(45,74,62,0.6)", margin: 0,
  };

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: "5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1.5rem,4vw,3rem) 5rem" }}>

        <a href="/es" style={{ ...LABEL, color: C.gold, textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
          ← Volver
        </a>

        <header style={{ marginBottom: "2.5rem" }}>
          {p.zona && <p style={{ ...LABEL, color: C.gold, marginBottom: "0.6rem" }}>{p.zona}</p>}
          <h1 style={{
            fontFamily: SERIF, fontSize: "clamp(2rem,4.5vw,3.4rem)", fontWeight: 600,
            color: C.text, lineHeight: 1.15, margin: "0 0 0.8rem",
          }}>{titulo}</h1>
          {p.ubicacion && (
            <p style={{ fontFamily: SERIF, fontSize: "1.1rem", color: C.muted, margin: "0 0 1rem" }}>
              {p.ubicacion}
            </p>
          )}
          <p style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 600, color: C.gold, margin: 0 }}>
            {precio}
          </p>
        </header>

        {fotos.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "0.75rem", marginBottom: "3rem" }}>
            {fotos.map((url, i) => (
              <img key={i} src={url} alt={`${titulo} — imagen ${i + 1}`} loading={i > 1 ? "lazy" : "eager"}
                style={{
                  width: "100%", height: i === 0 ? 460 : 260, objectFit: "cover",
                  gridColumn: i === 0 && fotos.length > 1 ? "1 / -1" : "auto",
                  border: `1px solid ${C.border}`,
                }} />
            ))}
          </div>
        )}

        {stats.length > 0 && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "2.5rem",
            borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
            padding: "1.5rem 0", marginBottom: "3rem",
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <p style={{ ...LABEL, fontSize: "0.5rem", marginBottom: "0.3rem" }}>{s.label}</p>
                <p style={{ fontFamily: SERIF, fontSize: "1.6rem", fontWeight: 600, color: C.text, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {descripcion && (
          <section style={{ marginBottom: "3rem", maxWidth: 760 }}>
            <h2 style={{ ...LABEL, color: C.gold, marginBottom: "1rem" }}>Descripción</h2>
            {descripcion.split("\n").filter(Boolean).map((par, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontSize: "1.05rem", lineHeight: 1.8, color: C.muted, margin: "0 0 1rem" }}>
                {par}
              </p>
            ))}
          </section>
        )}

        {ficha.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ ...LABEL, color: C.gold, marginBottom: "1rem" }}>Ficha técnica</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
              {ficha.map(f => (
                <div key={f.label} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: "0.6rem" }}>
                  <p style={{ ...LABEL, fontSize: "0.45rem", marginBottom: "0.25rem" }}>{f.label}</p>
                  <p style={{ fontFamily: SERIF, fontSize: "1rem", color: C.text, margin: 0, textTransform: "capitalize" }}>
                    {String(f.value)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {amenidades.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ ...LABEL, color: C.gold, marginBottom: "1rem" }}>Características</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {amenidades.map(a => (
                <span key={a} style={{
                  fontFamily: SANS, fontSize: "0.75rem", color: C.text,
                  border: `1px solid ${C.border}`, padding: "0.45rem 0.9rem", background: "#fff",
                }}>{a}</span>
              ))}
            </div>
          </section>
        )}

        {p.video_url && (
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ ...LABEL, color: C.gold, marginBottom: "1rem" }}>Vídeo</h2>
            <video src={p.video_url} controls playsInline
              style={{ width: "100%", maxHeight: 620, background: "#000", border: `1px solid ${C.border}` }} />
          </section>
        )}

        <section style={{ background: C.dark, padding: "clamp(2rem,5vw,3rem)", textAlign: "center" }}>
          <p style={{ ...LABEL, color: C.gold, marginBottom: "0.8rem" }}>¿Te interesa?</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#F5F0E8", margin: "0 0 1.5rem", fontWeight: 600 }}>
            Concierta una visita sin compromiso
          </h2>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/34610589716?text=${encodeURIComponent(`Hola, me interesa la propiedad ${p.referencia || titulo}`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ ...LABEL, background: C.gold, color: C.bg, padding: "1rem 2.2rem", textDecoration: "none" }}>
              WhatsApp
            </a>
            <a href="tel:+34610589716"
              style={{ ...LABEL, border: `1px solid ${C.gold}`, color: C.gold, padding: "1rem 2.2rem", textDecoration: "none" }}>
              +34 610 589 716
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
