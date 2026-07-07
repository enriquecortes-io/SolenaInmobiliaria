"use client";
import { useState, useEffect } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  tipo_propiedad: string;
  localizacion: string;
  precio_estimado: string;
  plazo_venta: string;
  fase: string;
  created_at: string;
}

interface Props { password: string; }

const C = { sidebar:"#1A0E08", gold:"#C9A876", terra:"#A0574D", text:"#6B5D54", border:"#DDD8D0", bg:"#FAF9F7" };
const FASES = ["nuevo","contactado","visita programada","oferta","cerrado","no contesta","durmiente"];
const FASE_COLORS: Record<string,string> = { "nuevo":"#3b82f6","contactado":"#10b981","visita programada":"#f59e0b","oferta":"#8b5cf6","cerrado":"#059669","no contesta":"#f97316","durmiente":"#A0574D" };
const S: React.CSSProperties = { padding:"8px 12px", border:`1px solid #DDD8D0`, borderRadius:"6px", fontSize:"13px", fontFamily:"system-ui", outline:"none", background:"white" };

export default function Leads({ password }: Props) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [faseFilter, setFaseFilter] = useState("todas");
  const [sort, setSort] = useState<{field:string|null,dir:"asc"|"desc"}>({field:"created_at",dir:"desc"});

  const toggleSort = (field:string) => setSort(p=>({field,dir:p.field===field&&p.dir==="asc"?"desc":"asc"}));

  const loadLeads = () => {
    setLoading(true);
    fetch("/api/leads",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({password,action:"list"}),
    }).then(r=>r.json()).then(d=>{setLeads(d.leads||[]);setLoading(false);}).catch(()=>setLoading(false));
  };

  useEffect(()=>{loadLeads();},[]);

  const updateFase = async (id:string, fase:string) => {
    await fetch("/api/leads",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({password,action:"updateFase",id,fase}),
    });
    loadLeads();
  };

  const filtered = [...leads]
    .filter(l=>faseFilter==="todas"||(l.fase||"nuevo")===faseFilter)
    .filter(l=>!search||l.name?.toLowerCase().includes(search.toLowerCase())||l.email?.toLowerCase().includes(search.toLowerCase())||l.phone?.includes(search))
    .sort((a,b)=>{
      if(!sort.field) return 0;
      const f=sort.field as keyof Lead;
      return sort.dir==="asc"?String(a[f]||"").localeCompare(String(b[f]||"")):String(b[f]||"").localeCompare(String(a[f]||""));
    });

  const TH: React.CSSProperties = { padding:"12px 16px", textAlign:"left", fontSize:"11px", fontWeight:700, color:C.text, textTransform:"uppercase", letterSpacing:"0.06em", cursor:"pointer" };

  return (
    <div style={{ padding:"32px", fontFamily:"system-ui" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
        <div>
          <p style={{ fontSize:"11px", color:C.text, textTransform:"uppercase", letterSpacing:"0.15em", margin:"0 0 4px" }}>Solena Inmobiliaria</p>
          <h1 style={{ fontSize:"24px", fontWeight:700, color:C.sidebar, margin:0 }}>Leads</h1>
        </div>
        <span style={{ background:"#F2EDE4", padding:"4px 14px", borderRadius:"20px", fontSize:"13px", color:C.text }}>{leads.length} leads</span>
      </div>
      <div style={{ display:"flex", gap:"10px", marginBottom:"16px", flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar nombre, email, teléfono..." style={{...S,width:"280px"}}/>
        <select value={faseFilter} onChange={e=>setFaseFilter(e.target.value)} style={S}>
          <option value="todas">Todas las fases</option>
          {FASES.map(f=><option key={f} value={f}>{f}</option>)}
        </select>
        <button onClick={loadLeads} style={{ padding:"8px 16px", background:C.sidebar, color:"white", border:"none", borderRadius:"6px", fontSize:"13px", cursor:"pointer" }}>Actualizar</button>
      </div>
      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:C.text }}>Cargando leads...</div>
      ) : (
        <div style={{ background:"white", borderRadius:"10px", border:`1px solid ${C.border}`, overflow:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"800px" }}>
            <thead>
              <tr style={{ background:C.bg }}>
                {[["Cliente","name"],["Email","email"],["Teléfono","phone"],["Localización","localizacion"],["Precio","precio_estimado"],["Plazo","plazo_venta"],["Fase","fase"],["Fecha","created_at"]].map(([label,field])=>(
                  <th key={field} onClick={()=>toggleSort(field)} style={TH}>{label} {sort.field===field?(sort.dir==="asc"?"↑":"↓"):"↕"}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={8} style={{ padding:"40px", textAlign:"center", color:C.text }}>No hay leads</td></tr>
              ) : filtered.map((l,i)=>(
                <tr key={l.id} style={{ borderTop:`1px solid ${C.border}`, background:i%2===0?"white":C.bg }}>
                  <td style={{ padding:"12px 16px", fontSize:"13px", fontWeight:600, color:C.sidebar }}>{l.name||"—"}</td>
                  <td style={{ padding:"12px 16px", fontSize:"13px", color:C.text }}>{l.email||"—"}</td>
                  <td style={{ padding:"12px 16px", fontSize:"13px", color:C.text }}>{l.phone||"—"}</td>
                  <td style={{ padding:"12px 16px", fontSize:"13px", color:C.text }}>{l.localizacion||"—"}</td>
                  <td style={{ padding:"12px 16px", fontSize:"13px", color:C.text }}>{l.precio_estimado||"—"}</td>
                  <td style={{ padding:"12px 16px", fontSize:"13px", color:C.text }}>{l.plazo_venta||"—"}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <select value={l.fase||"nuevo"} onChange={e=>updateFase(l.id,e.target.value)}
                      style={{ fontSize:"11px", fontWeight:600, padding:"3px 8px", borderRadius:"12px", border:"none", cursor:"pointer", color:FASE_COLORS[l.fase||"nuevo"], background:`${FASE_COLORS[l.fase||"nuevo"]}18` }}>
                      {FASES.map(f=><option key={f} value={f}>{f}</option>)}
                    </select>
                  </td>
                  <td style={{ padding:"12px 16px", fontSize:"12px", color:C.text }}>{l.created_at?new Date(l.created_at).toLocaleDateString("es-ES"):"—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
