"use client";
import { useState, useEffect } from "react";
import ImageSorter from "./ImageSorter";
import ImageSorter from "./ImageSorter";
import ImageSorter from "./ImageSorter";

function slugify(s: string): string {
  return (s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
}

interface Property {
  id: string; slug: string; titulo: string; descripcion: string; precio: number;
  habitaciones: number; banos: number; m2_construidos: number; m2_parcela: number;
  m2_terraza: number; plazas_parking: number;
  ubicacion: string; tipo: string; zona: string;
  activa: boolean; destacada: boolean; video_url: string; galeria_urls: string[];
  referencia?: string; estado?: string; orientacion?: string; amueblado?: string;
  certificado_energetico?: string; amenidades?: string[];
  contacto_nombre?: string; contacto_telefono?: string; contacto_email?: string;
}

const C = { sidebar:"#1A0E08", gold:"#C9A876", terra:"#A0574D", text:"#6B5D54", border:"#DDD8D0", bg:"#FAF9F7" };
const L: React.CSSProperties = { display:"block", fontSize:"11px", fontWeight:600, color:C.text, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px" };
const S: React.CSSProperties = { padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:"6px", fontSize:"13px", fontFamily:"system-ui", outline:"none", background:"white", color:"#111" };
const INP: React.CSSProperties = { width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:"6px", fontSize:"14px", fontFamily:"system-ui", outline:"none", boxSizing:"border-box", marginBottom:"16px" };

const T = (v:any):string => (v && typeof v === "object") ? (v.es || v.en || "") : (v || "");

const EMPTY: any = {
  slug:"", referencia:"", titulo:"", descripcion:"", precio:0, habitaciones:0, banos:0,
  m2_construidos:0, m2_parcela:0, m2_terraza:0, plazas_parking:0,
  ubicacion:"", tipo:"", zona:"", estado:"", orientacion:"", amueblado:"no",
  certificado_energetico:"", amenidades:[], video_url:"", galeria_urls:"",
  activa:false, destacada:false, contacto_nombre:"", contacto_telefono:"", contacto_email:"",
};

export default function Portfolio({ password }: { password: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [filters, setFilters] = useState({ tipo:"", zona:"", activa:"", search:"" });
  const [sort, setSort] = useState<{field:string|null, dir:"asc"|"desc"}>({field:null, dir:"asc"});
  const [editing, setEditing] = useState<any|null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{slug:string, nombre:string}|null>(null);
  const [deleteMotivo, setDeleteMotivo] = useState("");
  const [deleteOtro, setDeleteOtro] = useState("");

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/properties", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ password }) });
      const data = await res.json();
      setProperties(data.properties || []);
    } catch { setStatus("❌ Error al cargar"); }
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const openNew = () => { setIsNew(true); setEditing({ ...EMPTY }); setStatus(""); };
  const openEdit = (p: Property) => {
    setIsNew(false);
    setEditing({ ...p, titulo: T(p.titulo), descripcion: T(p.descripcion), galeria_urls: (p.galeria_urls||[]).join("\n"), amenidades: p.amenidades||[] });
    setStatus("");
  };

  const handleSave = async () => {
    if (!editing.titulo || editing.titulo.trim().length < 2) { setStatus("❌ El título no puede estar vacío"); return; }
    const slug = editing.slug?.trim() || slugify(editing.titulo);
    if (!slug) { setStatus("❌ Slug inválido"); return; }
    setStatus("Guardando...");
    try {
      const property = {
        ...editing, slug,
        titulo: { es: editing.titulo, en: "", fr: "", ru: "" },
        descripcion: { es: editing.descripcion || "", en: "", fr: "", ru: "" },
        galeria_urls: (editing.galeria_urls||"").split("\n").map((s:string)=>s.trim()).filter(Boolean),
      };
      const res = await fetch("/api/admin/save-property", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ password, property }),
      });
      const data = await res.json();
      if (data.ok) { setStatus("✅ Guardado correctamente"); setEditing(null); fetchProperties(); }
      else setStatus(`❌ ${data.error}`);
    } catch { setStatus("❌ Error al guardar"); }
  };

  const handleToggle = async (p: Property, field: "activa"|"destacada") => {
    try {
      await fetch("/api/admin/save-property", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ password, property: { ...p, galeria_urls: p.galeria_urls||[], [field]: !p[field] } }),
      });
      fetchProperties();
    } catch {}
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal || !deleteMotivo) return;
    const motivo = deleteMotivo === "otra" ? deleteOtro : deleteMotivo;
    try {
      const res = await fetch("/api/admin/delete-property", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ password, slug: deleteModal.slug, motivo }),
      });
      const data = await res.json();
      if (data.ok) { setStatus("✅ Propiedad eliminada"); setDeleteModal(null); setDeleteMotivo(""); setDeleteOtro(""); setEditing(null); fetchProperties(); }
      else setStatus(`❌ ${data.error}`);
    } catch {}
  };

  const toggleSort = (field: string) => setSort(prev => ({ field, dir: prev.field===field && prev.dir==="asc" ? "desc" : "asc" }));

  const filtered = properties.filter(p => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!T(p.titulo).toLowerCase().includes(q) && !(p.slug||"").includes(q) && !(p.referencia||"").toLowerCase().includes(q) && !(p.ubicacion||"").toLowerCase().includes(q)) return false;
    }
    if (filters.tipo && p.tipo!==filters.tipo) return false;
    if (filters.zona && p.zona!==filters.zona) return false;
    if (filters.activa==="activa" && !p.activa) return false;
    if (filters.activa==="borrador" && p.activa) return false;
    return true;
  }).sort((a,b) => {
    if (!sort.field) return 0;
    const av = (a as any)[sort.field], bv = (b as any)[sort.field];
    if (typeof av === "number" && typeof bv === "number") return sort.dir==="asc" ? av-bv : bv-av;
    return sort.dir==="asc" ? String(av||"").localeCompare(String(bv||"")) : String(bv||"").localeCompare(String(av||""));
  });

  const TH = (label:string, field?:string) => (
    <th onClick={field?()=>toggleSort(field):undefined}
      style={{ padding:"12px 16px", textAlign:"left", fontSize:"11px", fontWeight:700, color:C.text, textTransform:"uppercase", letterSpacing:"0.06em", cursor:field?"pointer":"default", whiteSpace:"nowrap" }}>
      {label} {field ? (sort.field===field?(sort.dir==="asc"?"↑":"↓"):"↕") : ""}
    </th>
  );

  return (
    <div style={{ padding:"32px", fontFamily:"system-ui" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
        <div>
          <p style={{ fontSize:"11px", color:C.text, textTransform:"uppercase", letterSpacing:"0.15em", margin:"0 0 4px" }}>Solena Inmobiliaria</p>
          <h1 style={{ fontSize:"24px", fontWeight:700, color:C.sidebar, margin:0 }}>Propiedades</h1>
        </div>
        <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
          <span style={{ background:"#F2EDE4", padding:"4px 14px", borderRadius:"20px", fontSize:"13px", color:C.text }}>{filtered.length} propiedades</span>
          <button onClick={openNew} style={{ padding:"10px 18px", background:C.sidebar, color:"white", border:"none", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>+ Nueva propiedad</button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"12px", marginBottom:"24px", background:"white", padding:"16px", borderRadius:"8px", boxShadow:"0 1px 4px rgba(26,14,8,0.06)" }}>
        <div>
          <label style={L}>Buscar</label>
          <input value={filters.search} onChange={e=>setFilters(p=>({...p,search:e.target.value}))} placeholder="Título, slug, referencia..." style={{...S,width:"100%",boxSizing:"border-box"}}/>
        </div>
        <div>
          <label style={L}>Tipo</label>
          <select value={filters.tipo} onChange={e=>setFilters(p=>({...p,tipo:e.target.value}))} style={S}>
            <option value="">Todos</option>
            <option value="villa">Villa</option>
            <option value="apartamento">Apartamento</option>
            <option value="atico">Ático</option>
            <option value="adosado">Adosado</option>
            <option value="terreno">Terreno</option>
          </select>
        </div>
        <div>
          <label style={L}>Zona</label>
          <select value={filters.zona} onChange={e=>setFilters(p=>({...p,zona:e.target.value}))} style={S}>
            <option value="">Todas</option>
            <option value="marbella">Marbella</option>
            <option value="estepona">Estepona</option>
            <option value="mijas">Mijas</option>
            <option value="benahavis">Benahavís</option>
            <option value="sotogrande">Sotogrande</option>
            <option value="malaga">Málaga</option>
          </select>
        </div>
        <div>
          <label style={L}>Estado</label>
          <select value={filters.activa} onChange={e=>setFilters(p=>({...p,activa:e.target.value}))} style={S}>
            <option value="">Todos</option>
            <option value="activa">Publicadas</option>
            <option value="borrador">Borradores</option>
          </select>
        </div>
      </div>

      {status && !editing && (
        <div style={{ padding:"10px 16px", borderRadius:"6px", marginBottom:"16px", background:status.startsWith("✅")?"#f0fdf4":"#fef2f2", border:`1px solid ${status.startsWith("✅")?"#86efac":"#fca5a5"}`, color:status.startsWith("✅")?"#166534":"#991b1b", fontSize:"13px" }}>{status}</div>
      )}

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:C.text }}>Cargando...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px", color:C.text }}>No hay propiedades. Crea la primera con "+ Nueva propiedad".</div>
      ) : (
        <div style={{ background:"white", borderRadius:"8px", boxShadow:"0 1px 4px rgba(26,14,8,0.06)", overflow:"hidden" }}>
          <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"900px" }}>
            <thead>
              <tr style={{ borderBottom:"2px solid #f3f4f6" }}>
                {TH("Ref")}
                {TH("Propiedad","titulo")}
                {TH("Tipo","tipo")}
                {TH("Zona","zona")}
                {TH("Ubicación")}
                {TH("Precio","precio")}
                {TH("Estado")}
                {TH("Destacada")}
                {TH("Acciones")}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p,i) => (
                <tr key={p.slug} style={{ borderBottom:"1px solid #f3f4f6", background:i%2===0?"white":"#fafafa" }}>
                  <td style={{ padding:"14px 16px" }}>
                    <span style={{ fontFamily:"monospace", fontSize:"12px", fontWeight:700, color:C.terra, background:"#faf3f1", padding:"3px 8px", borderRadius:"4px", whiteSpace:"nowrap" }}>{p.referencia||"—"}</span>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ fontWeight:600, fontSize:"14px", color:"#111" }}>{T(p.titulo)||p.slug}</div>
                    <div style={{ fontSize:"12px", color:"#8A847C", marginTop:"2px" }}>{p.slug}</div>
                  </td>
                  <td style={{ padding:"14px 16px", fontSize:"13px", textTransform:"capitalize" }}>{p.tipo||"—"}</td>
                  <td style={{ padding:"14px 16px", fontSize:"13px", textTransform:"capitalize" }}>{p.zona||"—"}</td>
                  <td style={{ padding:"14px 16px", fontSize:"13px" }}>{p.ubicacion||"—"}</td>
                  <td style={{ padding:"14px 16px", fontSize:"13px", fontWeight:600 }}>{p.precio?`${Number(p.precio).toLocaleString("es-ES")} €`:"—"}</td>
                  <td style={{ padding:"14px 16px" }}>
                    <button onClick={()=>handleToggle(p,"activa")}
                      style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:600, border:"none", cursor:"pointer", background:p.activa?"#dcfce7":"#F2EDE4", color:p.activa?"#166534":C.text }}>
                      {p.activa?"Publicada":"Borrador"}
                    </button>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <button onClick={()=>handleToggle(p,"destacada")}
                      style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:600, border:"none", cursor:"pointer", background:p.destacada?"#fef3c7":"#F2EDE4", color:p.destacada?"#92400e":C.text }}>
                      {p.destacada?"⭐ Sí":"No"}
                    </button>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", gap:"6px" }}>
                      <button onClick={()=>openEdit(p)}
                        style={{ padding:"6px 10px", background:"#eff6ff", border:"none", borderRadius:"6px", fontSize:"12px", cursor:"pointer", color:"#1d4ed8" }}>Editar</button>
                      <button onClick={()=>setDeleteModal({slug:p.slug, nombre:T(p.titulo)||p.slug})}
                        style={{ padding:"6px 10px", background:"#fef2f2", border:"none", borderRadius:"6px", fontSize:"12px", cursor:"pointer", color:"#991b1b" }}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {editing && (
        <div onClick={()=>setEditing(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"white", borderRadius:"12px", padding:"32px", width:"100%", maxWidth:"680px", maxHeight:"90vh", overflowY:"auto" }}>
            <h2 style={{ fontSize:"18px", fontWeight:700, color:"#111", marginBottom:"24px" }}>
              {isNew ? "Nueva propiedad" : `Editar — ${editing.slug}`}
            </h2>

            <label style={L}>Título</label>
            <input value={editing.titulo||""} onChange={e=>{
              const titulo = e.target.value;
              setEditing((p:any)=>({...p, titulo, slug: isNew ? slugify(titulo) : p.slug}));
            }} style={INP} placeholder="Villa moderna en Nueva Andalucía"/>

            <label style={L}>Referencia</label>
            <input value={editing.referencia||""} onChange={e=>setEditing((p:any)=>({...p, referencia:e.target.value}))} style={INP} placeholder="SOL-001"/>

            <label style={L}>Slug (URL pública)</label>
            <input value={editing.slug||""} onChange={e=>setEditing((p:any)=>({...p, slug:e.target.value}))} style={INP}/>
            <p style={{ fontSize:"11px", color:"#8A847C", margin:"-8px 0 16px" }}>solenainmo.es/propiedades/{editing.slug||"..."}</p>

            <label style={L}>Descripción</label>
            <textarea value={editing.descripcion||""} onChange={e=>setEditing((p:any)=>({...p, descripcion:e.target.value}))} rows={6} style={{...INP, resize:"vertical"}}/>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              {[
                {label:"Precio (€)", field:"precio", type:"number"},
                {label:"Habitaciones", field:"habitaciones", type:"number"},
                {label:"Baños", field:"banos", type:"number"},
                {label:"M² Construidos", field:"m2_construidos", type:"number"},
                {label:"M² Parcela", field:"m2_parcela", type:"number"},
                {label:"M² Terraza", field:"m2_terraza", type:"number"},
                {label:"Plazas Parking", field:"plazas_parking", type:"number"},
                {label:"Ubicación", field:"ubicacion", type:"text"},
              ].map(({label,field,type})=>(
                <div key={field}>
                  <label style={L}>{label}</label>
                  <input type={type} value={editing[field]||""}
                    onChange={e=>setEditing((p:any)=>({...p,[field]:type==="number"?parseFloat(e.target.value)||0:e.target.value}))}
                    style={INP}/>
                </div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              <div>
                <label style={L}>Tipo</label>
                <select value={editing.tipo||""} onChange={e=>setEditing((p:any)=>({...p,tipo:e.target.value}))} style={INP}>
                  <option value="">— Seleccionar —</option>
                  <option value="villa">Villa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="atico">Ático</option>
                  <option value="adosado">Adosado</option>
                  <option value="terreno">Terreno</option>
                </select>
              </div>
              <div>
                <label style={L}>Zona</label>
                <select value={editing.zona||""} onChange={e=>setEditing((p:any)=>({...p,zona:e.target.value}))} style={INP}>
                  <option value="">— Seleccionar —</option>
                  <option value="marbella">Marbella</option>
                  <option value="estepona">Estepona</option>
                  <option value="mijas">Mijas</option>
                  <option value="benahavis">Benahavís</option>
                  <option value="sotogrande">Sotogrande</option>
                  <option value="malaga">Málaga</option>
                </select>
              </div>
              <div>
                <label style={L}>Estado</label>
                <select value={editing.estado||""} onChange={e=>setEditing((p:any)=>({...p,estado:e.target.value}))} style={INP}>
                  <option value="">—</option>
                  <option value="nueva">Nueva construcción</option>
                  <option value="buen-estado">Buen estado</option>
                  <option value="reformado">Reformado</option>
                  <option value="a-reformar">A reformar</option>
                </select>
              </div>
              <div>
                <label style={L}>Orientación</label>
                <select value={editing.orientacion||""} onChange={e=>setEditing((p:any)=>({...p,orientacion:e.target.value}))} style={INP}>
                  <option value="">—</option>
                  <option value="sur">Sur</option>
                  <option value="norte">Norte</option>
                  <option value="este">Este</option>
                  <option value="oeste">Oeste</option>
                  <option value="sur-este">Sur-Este</option>
                  <option value="sur-oeste">Sur-Oeste</option>
                </select>
              </div>
              <div>
                <label style={L}>Amueblado</label>
                <select value={editing.amueblado||"no"} onChange={e=>setEditing((p:any)=>({...p,amueblado:e.target.value}))} style={INP}>
                  <option value="no">No</option>
                  <option value="si">Sí</option>
                  <option value="parcial">Parcial</option>
                </select>
              </div>
              <div>
                <label style={L}>Cert. Energético</label>
                <select value={editing.certificado_energetico||""} onChange={e=>setEditing((p:any)=>({...p,certificado_energetico:e.target.value}))} style={INP}>
                  <option value="">—</option>
                  {["A","B","C","D","E","F","G"].map(l=><option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <label style={L}>Amenidades</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"16px" }}>
              {["Piscina","Jardín","Terraza","Ascensor","Aire acondicionado","Calefacción","Seguridad 24h","Spa","Gimnasio","Garaje","Trastero","Domótica","Vistas al mar","Primera línea de playa","Urbanización cerrada"].map(a=>{
                const list = editing.amenidades || [];
                const on = list.includes(a);
                return (
                  <span key={a} onClick={()=>setEditing((p:any)=>({...p, amenidades: on?list.filter((x:string)=>x!==a):[...list,a]}))}
                    style={{ fontSize:"12px", cursor:"pointer", padding:"5px 10px", border:`1px solid ${on?C.terra:C.border}`, borderRadius:"20px", background:on?"#faf3f1":"white", color:on?C.terra:"#111" }}>
                    {a}
                  </span>
                );
              })}
            </div>

            <label style={L}>URL Video</label>
            <input value={editing.video_url||""} onChange={e=>setEditing((p:any)=>({...p,video_url:e.target.value}))} style={INP}/>

            <label style={L}>URLs Galería (una por línea — la primera es la principal)</label>
            <textarea value={editing.galeria_urls||""} onChange={e=>setEditing((p:any)=>({...p,galeria_urls:e.target.value}))} rows={4} style={{...INP,resize:"vertical"}}/>
            <ImageSorter
              urls={(editing.galeria_urls||"").split("\n").map((s:string)=>s.trim()).filter(Boolean)}
              onChange={urls => setEditing((p:any)=>({...p, galeria_urls: urls.join("\n")}))}
              onSave={handleSave}
            />
            <ImageSorter
              urls={(editing.galeria_urls||"").split("\n").map((s:string)=>s.trim()).filter(Boolean)}
              onChange={urls => setEditing((p:any)=>({...p, galeria_urls: urls.join("\n")}))}
              onSave={handleSave}
            />
            <ImageSorter
              urls={(editing.galeria_urls||"").split("\n").map((s:string)=>s.trim()).filter(Boolean)}
              onChange={urls => setEditing((p:any)=>({...p, galeria_urls: urls.join("\n")}))}
              onSave={handleSave}
            />

            <div style={{ display:"flex", gap:"16px", marginBottom:"24px" }}>
              <label style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"14px", cursor:"pointer" }}>
                <input type="checkbox" checked={editing.activa||false} onChange={e=>setEditing((p:any)=>({...p,activa:e.target.checked}))}/>
                Publicada
              </label>
              <label style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"14px", cursor:"pointer" }}>
                <input type="checkbox" checked={editing.destacada||false} onChange={e=>setEditing((p:any)=>({...p,destacada:e.target.checked}))}/>
                Destacada
              </label>
            </div>

            {status && (
              <div style={{ padding:"12px", borderRadius:"6px", marginBottom:"16px", background:status.startsWith("✅")?"#f0fdf4":"#fef2f2", border:`1px solid ${status.startsWith("✅")?"#86efac":"#fca5a5"}`, color:status.startsWith("✅")?"#166534":"#991b1b", fontSize:"13px" }}>{status}</div>
            )}

            <div style={{ display:"flex", gap:"12px" }}>
              <button onClick={()=>setEditing(null)} style={{ flex:1, padding:"12px", background:"#F2EDE4", border:"none", borderRadius:"6px", fontSize:"13px", cursor:"pointer", color:"#111" }}>Cancelar</button>
              <button onClick={handleSave} style={{ flex:2, padding:"12px", background:C.sidebar, color:"white", border:"none", borderRadius:"6px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div style={{ background:"white", borderRadius:"12px", padding:"32px", width:"100%", maxWidth:"480px" }}>
            <h3 style={{ fontSize:"18px", fontWeight:700, color:"#111", marginBottom:"8px" }}>Eliminar propiedad</h3>
            <p style={{ fontSize:"14px", color:C.text, marginBottom:"24px" }}>
              <strong>{deleteModal.nombre}</strong> — Esta acción es irreversible. Indica el motivo:
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"20px" }}>
              {[
                { value:"venta-solitario", label:"Venta en solitario" },
                { value:"venta-compartida", label:"Venta compartida con otra agencia" },
                { value:"venta-dueno", label:"Vendida directamente por el dueño" },
                { value:"otra-agencia", label:"Vendida por otra agencia" },
                { value:"desestimada", label:"Desestimada / Retirada del mercado" },
                { value:"otra", label:"Otra razón" },
              ].map(opt => (
                <label key={opt.value} style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer", padding:"10px 14px", border:`2px solid ${deleteMotivo===opt.value?C.sidebar:"#e5e7eb"}`, borderRadius:"8px", background:deleteMotivo===opt.value?"#faf9f7":"white" }}>
                  <input type="radio" name="motivo" value={opt.value} checked={deleteMotivo===opt.value} onChange={()=>setDeleteMotivo(opt.value)}/>
                  <span style={{ fontSize:"13px", color:"#111" }}>{opt.label}</span>
                </label>
              ))}
            </div>
            {deleteMotivo === "otra" && (
              <textarea value={deleteOtro} onChange={e=>setDeleteOtro(e.target.value)} placeholder="Describe el motivo..." rows={3}
                style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:"6px", fontSize:"13px", marginBottom:"20px", boxSizing:"border-box", resize:"vertical" }}/>
            )}
            <div style={{ display:"flex", gap:"12px" }}>
              <button onClick={()=>{ setDeleteModal(null); setDeleteMotivo(""); setDeleteOtro(""); }}
                style={{ flex:1, padding:"10px", background:"#f3f4f6", border:"none", borderRadius:"6px", fontSize:"14px", cursor:"pointer", color:"#111" }}>Cancelar</button>
              <button onClick={handleDeleteConfirm} disabled={!deleteMotivo || (deleteMotivo==="otra" && !deleteOtro)}
                style={{ flex:1, padding:"10px", background:deleteMotivo?"#dc2626":"#d1d5db", border:"none", borderRadius:"6px", fontSize:"14px", fontWeight:600, cursor:deleteMotivo?"pointer":"not-allowed", color:"white" }}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
