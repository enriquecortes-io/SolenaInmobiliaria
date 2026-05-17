"use client";
import { useState, useEffect } from "react";

interface Props { password: string; }

interface Stats {
  totalProperties: number;
  activeProperties: number;
  totalLeads: number;
  leadsThisMonth: number;
  leadsThisWeek: number;
  topProperty: string;
  leadsByHorizon: Record<string, number>;
  leadsByMonth: { month: string; count: number }[];
  conversionByZona: { zona: string; leads: number; properties: number }[];
}

export default function Dashboard({ password }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/properties", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password}) }).then(r=>r.json()),
      fetch("/api/admin/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password}) }).then(r=>r.json()),
    ]).then(([propsData, leadsData]) => {
      const properties = propsData.properties || [];
      const leads = leadsData.leads || [];

      const now = new Date();
      const thisMonth = leads.filter((l: any) => {
        const d = new Date(l.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      const thisWeek = leads.filter((l: any) => {
        const d = new Date(l.created_at);
        return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
      });

      // Top propiedad por leads
      const propCount: Record<string, number> = {};
      leads.forEach((l: any) => { propCount[l.property_title] = (propCount[l.property_title]||0)+1; });
      const topProperty = Object.entries(propCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || "—";

      // Leads por horizonte
      const leadsByHorizon: Record<string, number> = {};
      leads.forEach((l: any) => { leadsByHorizon[l.horizon] = (leadsByHorizon[l.horizon]||0)+1; });

      // Leads por mes (últimos 6)
      const monthMap: Record<string, number> = {};
      leads.forEach((l: any) => {
        const d = new Date(l.created_at);
        const key = d.toLocaleDateString("es-ES", { month:"short", year:"2-digit" });
        monthMap[key] = (monthMap[key]||0)+1;
      });
      const leadsByMonth = Object.entries(monthMap).slice(-6).map(([month, count]) => ({ month, count }));

      // Leads por zona
      const zonaLeads: Record<string, number> = {};
      leads.forEach((l: any) => {
        const prop = properties.find((p: any) => p.slug === l.property_slug);
        const zona = prop?.zona || "Otras";
        zonaLeads[zona] = (zonaLeads[zona]||0)+1;
      });
      const zonaProps: Record<string, number> = {};
      properties.forEach((p: any) => { zonaProps[p.zona||"Otras"] = (zonaProps[p.zona||"Otras"]||0)+1; });
      const conversionByZona = Object.keys({...zonaLeads,...zonaProps}).map(zona => ({
        zona, leads: zonaLeads[zona]||0, properties: zonaProps[zona]||0
      }));

      setStats({
        totalProperties: properties.length,
        activeProperties: properties.filter((p:any)=>p.activa).length,
        totalLeads: leads.length,
        leadsThisMonth: thisMonth.length,
        leadsThisWeek: thisWeek.length,
        topProperty,
        leadsByHorizon,
        leadsByMonth,
        conversionByZona,
      });
      setLoading(false);
    });
  }, []);

  const Card = ({ label, value, sub, color }: { label:string; value:string|number; sub?:string; color?:string }) => (
    <div style={{ background:"white", borderRadius:"12px", padding:"24px", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
      <p style={{ fontSize:"11px", color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 8px", fontWeight:600 }}>{label}</p>
      <p style={{ fontSize:"36px", fontWeight:700, color: color||"#111", margin:"0 0 4px", lineHeight:1 }}>{value}</p>
      {sub && <p style={{ fontSize:"12px", color:"#9ca3af", margin:0 }}>{sub}</p>}
    </div>
  );

  const maxBar = Math.max(...(stats?.leadsByMonth.map(m=>m.count)||[1]));

  return (
    <div style={{ padding:"32px" }}>
      <div style={{ marginBottom:"32px" }}>
        <p style={{ fontSize:"12px", color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 4px" }}>Panel de Administración</p>
        <h1 style={{ fontSize:"24px", fontWeight:700, color:"#111", margin:0 }}>Dashboard</h1>
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#6b7280" }}>Calculando estadísticas...</div>
      ) : stats && (
        <>
          {/* KPIs */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:"16px", marginBottom:"32px" }}>
            <Card label="Propiedades activas" value={stats.activeProperties} sub={`de ${stats.totalProperties} totales`} color="#16a34a"/>
            <Card label="Total leads" value={stats.totalLeads} color="#2563eb"/>
            <Card label="Leads este mes" value={stats.leadsThisMonth} color="#7c3aed"/>
            <Card label="Leads esta semana" value={stats.leadsThisWeek} color="#ea580c"/>
            <Card label="Propiedad top" value="🏆" sub={stats.topProperty}/>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px", marginBottom:"24px" }}>

            {/* Leads por mes */}
            <div style={{ background:"white", borderRadius:"12px", padding:"24px", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:"13px", fontWeight:700, color:"#111", margin:"0 0 20px" }}>Leads por mes</p>
              {stats.leadsByMonth.length === 0 ? (
                <p style={{ color:"#9ca3af", fontSize:"13px" }}>Sin datos aún</p>
              ) : (
                <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"120px" }}>
                  {stats.leadsByMonth.map(({ month, count }) => (
                    <div key={month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
                      <span style={{ fontSize:"11px", fontWeight:700, color:"#374151" }}>{count}</span>
                      <div style={{
                        width:"100%", background:"#2563eb", borderRadius:"4px 4px 0 0",
                        height:`${(count/maxBar)*100}px`, minHeight:"4px",
                      }}/>
                      <span style={{ fontSize:"10px", color:"#9ca3af", textAlign:"center" }}>{month}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Leads por horizonte */}
            <div style={{ background:"white", borderRadius:"12px", padding:"24px", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:"13px", fontWeight:700, color:"#111", margin:"0 0 20px" }}>Horizonte de inversión</p>
              {Object.entries(stats.leadsByHorizon).length === 0 ? (
                <p style={{ color:"#9ca3af", fontSize:"13px" }}>Sin datos aún</p>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {Object.entries(stats.leadsByHorizon).sort((a,b)=>b[1]-a[1]).map(([h, count]) => {
                    const total = stats.totalLeads || 1;
                    const pct = Math.round((count/total)*100);
                    return (
                      <div key={h}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                          <span style={{ fontSize:"13px", color:"#374151" }}>{h}</span>
                          <span style={{ fontSize:"13px", fontWeight:700, color:"#111" }}>{count} ({pct}%)</span>
                        </div>
                        <div style={{ height:"6px", background:"#f3f4f6", borderRadius:"3px" }}>
                          <div style={{ height:"100%", width:`${pct}%`, background:"#7c3aed", borderRadius:"3px" }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Leads por zona */}
          <div style={{ background:"white", borderRadius:"12px", padding:"24px", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:"13px", fontWeight:700, color:"#111", margin:"0 0 20px" }}>Leads vs Propiedades por Zona</p>
            {stats.conversionByZona.length === 0 ? (
              <p style={{ color:"#9ca3af", fontSize:"13px" }}>Sin datos aún</p>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderBottom:"2px solid #f3f4f6" }}>
                    {["Zona","Propiedades activas","Leads recibidos","Ratio leads/prop"].map(h=>(
                      <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:"11px", fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.conversionByZona.sort((a,b)=>b.leads-a.leads).map((z,i)=>(
                    <tr key={z.zona} style={{ borderBottom:"1px solid #f3f4f6", background:i%2===0?"white":"#fafafa" }}>
                      <td style={{ padding:"12px 16px", fontWeight:600, color:"#111", textTransform:"capitalize" }}>{z.zona||"Sin zona"}</td>
                      <td style={{ padding:"12px 16px", color:"#374151" }}>{z.properties}</td>
                      <td style={{ padding:"12px 16px" }}>
                        <span style={{ padding:"3px 10px", borderRadius:"20px", background:"#eff6ff", color:"#1d4ed8", fontSize:"12px", fontWeight:600 }}>{z.leads}</span>
                      </td>
                      <td style={{ padding:"12px 16px", color: z.properties>0 ? "#16a34a" : "#9ca3af", fontWeight:600 }}>
                        {z.properties > 0 ? `${(z.leads/z.properties).toFixed(1)}x` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
