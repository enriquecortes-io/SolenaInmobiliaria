"use client";
import { useState, useEffect } from "react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  tipo: string;
  zona: string;
}

const C = { sidebar:"#1A0E08", gold:"#C9A876", terra:"#A0574D", text:"#6B5D54", border:"#DDD8D0", bg:"#FAF9F7" };

export default function Portfolio() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/properties")
      .then(r => r.json())
      .then(d => { setProperties(d.properties || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = properties.filter(p =>
    !search ||
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase()) ||
    p.zona?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding:"32px", fontFamily:"system-ui" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
        <div>
          <p style={{ fontSize:"11px", color:C.text, textTransform:"uppercase", letterSpacing:"0.15em", margin:"0 0 4px" }}>Solena Inmobiliaria</p>
          <h1 style={{ fontSize:"24px", fontWeight:700, color:C.sidebar, margin:0 }}>Propiedades</h1>
        </div>
        <span style={{ background:"#F2EDE4", padding:"4px 14px", borderRadius:"20px", fontSize:"13px", color:C.text }}>{properties.length} propiedades</span>
      </div>

      <div style={{ marginBottom:"16px" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por título, ubicación, zona..."
          style={{ padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:"6px", fontSize:"13px", fontFamily:"system-ui", outline:"none", background:"white", width:"300px" }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:C.text }}>Cargando propiedades...</div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1rem" }}>
          {filtered.map(p => (
            <div key={p.id} style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"12px", overflow:"hidden" }}>
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} style={{ width:"100%", height:"180px", objectFit:"cover" }} />
              ) : (
                <div style={{ width:"100%", height:"180px", background:"#F2EDE4", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"32px" }}>🏠</span>
                </div>
              )}
              <div style={{ padding:"16px" }}>
                <p style={{ fontSize:"11px", color:C.gold, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 4px" }}>{p.zona || p.tipo}</p>
                <h3 style={{ fontSize:"15px", fontWeight:700, color:C.sidebar, margin:"0 0 4px" }}>{p.title || "Sin título"}</h3>
                <p style={{ fontSize:"12px", color:C.text, margin:"0 0 12px" }}>{p.location}</p>
                <p style={{ fontSize:"18px", fontWeight:700, color:C.terra, margin:"0 0 12px" }}>
                  {p.price ? `${p.price.toLocaleString("es-ES")} €` : "Precio consultar"}
                </p>
                <div style={{ display:"flex", gap:"12px", fontSize:"12px", color:C.text }}>
                  {p.bedrooms > 0 && <span>🛏 {p.bedrooms}</span>}
                  {p.bathrooms > 0 && <span>🚿 {p.bathrooms}</span>}
                  {p.area > 0 && <span>📐 {p.area} m²</span>}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ color:C.text, fontSize:"14px", gridColumn:"1/-1", textAlign:"center", padding:"40px" }}>No hay propiedades</p>
          )}
        </div>
      )}
    </div>
  );
}
