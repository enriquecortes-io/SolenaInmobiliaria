"use client";
import { useState, useEffect } from "react";

const C = { sidebar:"#1A0E08", gold:"#C9A876", terra:"#A0574D", text:"#6B5D54", border:"#DDD8D0", bg:"#FAF9F7" };
const FASES = ["nuevo","contactado","visita programada","oferta","cerrado","no contesta","durmiente"];
const FASE_COLORS: Record<string,string> = { "nuevo":"#3b82f6","contactado":"#10b981","visita programada":"#f59e0b","oferta":"#8b5cf6","cerrado":"#059669","no contesta":"#f97316","durmiente":"#A0574D" };

interface Props { password: string; }

export default function Dashboard({ password }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hoyISO = new Date(); hoyISO.setHours(0,0,0,0);
    Promise.all([
      fetch("/api/properties").then(r=>r.json()),
      fetch("/api/leads",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password,action:"list"}) }).then(r=>r.json()).catch(()=>({leads:[]})),
    ]).then(([propsData, leadsData]) => {
      const props = Array.isArray(propsData)?propsData:(propsData.properties||[]);
      const leads = leadsData.leads||[];
      const leadsHoy = leads.filter((l:any)=>l.created_at>=hoyISO.toISOString()).length;
      setData({ props, leads, leadsHoy });
      setLoading(false);
    }).catch(()=>setLoading(false));
  }, []);

  if (loading) return <div style={{ padding:"32px", color:C.text, fontFamily:"system-ui" }}>Cargando dashboard...</div>;

  const { props, leads, leadsHoy } = data;
  const kpis = [
    { label:"Propiedades activas", value:props.length, sub:`${props.filter((p:any)=>p.destacada).length} destacadas`, color:"#059669", bg:"#f0fdf4" },
    { label:"Leads hoy", value:leadsHoy, sub:`${leads.length} total`, color:"#2563eb", bg:"#eff6ff" },
    { label:"En negociación", value:leads.filter((l:any)=>l.fase==="oferta").length, sub:"fase oferta", color:C.terra, bg:"#fff5f5" },
    { label:"Cerrados", value:leads.filter((l:any)=>l.fase==="cerrado").length, sub:"operaciones cerradas", color:C.gold, bg:"#fffbeb" },
  ];
  const faseCount = FASES.map(f=>({ fase:f, count:leads.filter((l:any)=>(l.fase||"nuevo")===f).length }));

  return (
    <div style={{ padding:"32px", maxWidth:"1200px", fontFamily:"system-ui" }}>
      <div style={{ marginBottom:"2rem" }}>
        <p style={{ fontSize:"11px", color:C.text, textTransform:"uppercase", letterSpacing:"0.15em", margin:"0 0 4px" }}>Solena Inmobiliaria</p>
        <h1 style={{ fontSize:"24px", fontWeight:700, color:C.sidebar, margin:0 }}>Dashboard</h1>
        <p style={{ fontSize:"13px", color:C.text, margin:"4px 0 0" }}>{new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
        {kpis.map(k=>(
          <div key={k.label} style={{ background:k.bg, border:`1px solid ${k.color}22`, borderRadius:"12px", padding:"1.25rem" }}>
            <p style={{ fontSize:"11px", fontWeight:600, color:C.text, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 0.5rem" }}>{k.label}</p>
            <p style={{ fontSize:"2.5rem", fontWeight:800, color:k.color, margin:"0 0 0.25rem", lineHeight:1 }}>{k.value}</p>
            <p style={{ fontSize:"12px", color:C.text, margin:0 }}>{k.sub}</p>
          </div>
        ))}
      </div>
      <div style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"12px", padding:"1.25rem", marginBottom:"2rem" }}>
        <h2 style={{ fontSize:"14px", fontWeight:700, color:C.sidebar, margin:"0 0 1rem" }}>Pipeline de leads</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {faseCount.filter(f=>f.count>0).map(f=>(
            <div key={f.fase} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"120px", fontSize:"11px", color:C.sidebar, textTransform:"capitalize", flexShrink:0 }}>{f.fase}</div>
              <div style={{ flex:1, background:"#F2EDE4", borderRadius:"4px", overflow:"hidden", height:"16px" }}>
                <div style={{ width:`${Math.min(100,(f.count/leads.length)*100)}%`, height:"100%", background:FASE_COLORS[f.fase]||C.terra, borderRadius:"4px", transition:"width 0.5s" }}/>
              </div>
              <span style={{ fontSize:"12px", fontWeight:700, color:FASE_COLORS[f.fase]||C.terra, width:"24px", textAlign:"right" }}>{f.count}</span>
            </div>
          ))}
          {leads.length===0 && <p style={{ color:C.text, fontSize:"13px" }}>Sin leads registrados</p>}
        </div>
      </div>
      <div style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"12px", padding:"1.25rem" }}>
        <h2 style={{ fontSize:"14px", fontWeight:700, color:C.sidebar, margin:"0 0 1rem" }}>Últimos leads</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {[...leads].sort((a:any,b:any)=>b.created_at?.localeCompare(a.created_at)).slice(0,8).map((l:any)=>(
            <div key={l.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", background:C.bg, borderRadius:"6px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <span style={{ fontSize:"13px", fontWeight:600, color:C.sidebar }}>{l.name||"—"}</span>
                {l.email && <span style={{ fontSize:"12px", color:C.text }}>{l.email}</span>}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ fontSize:"11px", fontWeight:600, color:FASE_COLORS[l.fase||"nuevo"], background:`${FASE_COLORS[l.fase||"nuevo"]}18`, padding:"2px 8px", borderRadius:"12px" }}>{l.fase||"nuevo"}</span>
                <span style={{ fontSize:"11px", color:C.text }}>{l.created_at?new Date(l.created_at).toLocaleDateString("es-ES"):"—"}</span>
              </div>
            </div>
          ))}
          {leads.length===0 && <p style={{ color:C.text, fontSize:"13px" }}>Sin leads</p>}
        </div>
      </div>
    </div>
  );
}
