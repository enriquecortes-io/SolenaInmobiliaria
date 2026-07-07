"use client";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Leads from "./Leads";
import Portfolio from "./Portfolio";

const C = {
  bg:      "#FAF9F7",
  sidebar: "#1A0E08",
  gold:    "#C9A876",
  terra:   "#A0574D",
  text:    "#6B5D54",
  border:  "#DDD8D0",
  white:   "#FFFFFF",
};

type Section = "dashboard" | "leads" | "propiedades";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [authError, setAuthError] = useState("");
  const [username, setUsername] = useState("");
  const [section, setSection] = useState<Section>("dashboard");

  useEffect(() => {
    const saved = localStorage.getItem("solena_admin_user");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        const savedPw = localStorage.getItem("solena_admin_pw") || "";
        setAuth(true);
        setPassword(savedPw);
        setUser(u);
      } catch {}
    }
  }, []);

  const handleAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, username }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuth(true);
        setUser(data.user);
        localStorage.setItem("solena_admin_user", JSON.stringify(data.user));
        localStorage.setItem("solena_admin_pw", password);
      } else {
        setAuthError("Credenciales incorrectas");
      }
    } catch {
      setAuthError("Error de conexión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("solena_admin_user");
    localStorage.removeItem("solena_admin_pw");
    setAuth(false);
    setUser(null);
    setPassword("");
    setUsername("");
  };

  if (!auth) return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:C.white, padding:"48px 40px", borderRadius:"16px", boxShadow:"0 8px 40px rgba(26,14,8,0.10)", width:"380px" }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <p style={{ fontSize:"10px", color:C.text, textTransform:"uppercase", letterSpacing:"0.25em", margin:"0 0 8px", fontFamily:"system-ui" }}>SOLENA INMOBILIARIA</p>
          <h2 style={{ fontFamily:"Georgia, serif", fontSize:"22px", fontWeight:400, color:C.sidebar, margin:"0 0 4px" }}>Panel de Administración</h2>
          <div style={{ width:"40px", height:"1px", background:C.gold, margin:"12px auto 0" }}/>
        </div>
        <form onSubmit={e=>{e.preventDefault();handleAuth();}}>
          <label style={{ display:"block", fontSize:"11px", fontWeight:600, color:C.text, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"6px", fontFamily:"system-ui" }}>Usuario</label>
          <input type="text" name="username" autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)}
            style={{ width:"100%", padding:"10px 14px", border:`1px solid ${C.border}`, borderRadius:"8px", fontSize:"14px", fontFamily:"system-ui", outline:"none", boxSizing:"border-box", marginBottom:"16px" }}
            placeholder="Tu usuario"/>
          <label style={{ display:"block", fontSize:"11px", fontWeight:600, color:C.text, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"6px", fontFamily:"system-ui" }}>Contraseña</label>
          <input type="password" name="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}
            style={{ width:"100%", padding:"10px 14px", border:`1px solid ${C.border}`, borderRadius:"8px", fontSize:"14px", fontFamily:"system-ui", outline:"none", boxSizing:"border-box", marginBottom:"24px" }}
            placeholder="••••••••"/>
          <button type="submit" style={{ width:"100%", padding:"12px", background:C.sidebar, color:C.white, border:"none", borderRadius:"8px", fontSize:"14px", fontWeight:600, cursor:"pointer", fontFamily:"system-ui" }}>
            Entrar
          </button>
        </form>
        {authError && <p style={{ color:C.terra, marginTop:"14px", fontSize:"13px", fontFamily:"system-ui", textAlign:"center" }}>{authError}</p>}
      </div>
    </div>
  );

  const NAV: { id: Section; icon: string; label: string }[] = [
    { id:"dashboard",   icon:"📊", label:"Dashboard" },
    { id:"leads",       icon:"👥", label:"Leads" },
    { id:"propiedades", icon:"🏠", label:"Propiedades" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg, fontFamily:"system-ui" }}>
      <div style={{ width:"230px", background:C.sidebar, minHeight:"100vh", display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"28px 20px 20px" }}>
          <p style={{ fontSize:"9px", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.22em", margin:"0 0 10px" }}>SOLENA INMOBILIARIA</p>
          {user && (
            <>
              <p style={{ fontSize:"17px", color:C.white, fontWeight:700, margin:"0 0 2px" }}>{user.name}</p>
              <p style={{ fontSize:"11px", color:C.gold, margin:"0 0 14px", textTransform:"uppercase", letterSpacing:"0.15em" }}>{user.role}</p>
            </>
          )}
        </div>
        <div style={{ height:"1px", background:"rgba(201,168,118,0.2)", margin:"0 20px 16px" }}/>
        <nav style={{ flex:1, padding:"0 12px" }}>
          {NAV.map(item => (
            <button key={item.id} onClick={()=>setSection(item.id)}
              style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"10px 12px",
                background:section===item.id?"rgba(201,168,118,0.15)":"none",
                border:section===item.id?"1px solid rgba(201,168,118,0.3)":"1px solid transparent",
                borderRadius:"8px", color:section===item.id?C.gold:"rgba(255,255,255,0.5)",
                fontSize:"13px", fontWeight:section===item.id?600:400, cursor:"pointer", textAlign:"left",
                transition:"all 0.15s", marginBottom:"4px" }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(201,168,118,0.12)" }}>
          <button onClick={handleLogout} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", fontSize:"12px", cursor:"pointer", padding:0 }}>
            Cerrar sesión →
          </button>
        </div>
      </div>
      <div style={{ flex:1, overflow:"auto" }}>
        {section==="dashboard"   && <Dashboard password={password}/>}
        {section==="leads"       && <Leads password={password}/>}
        {section==="propiedades" && (
          <div style={{ padding:"32px" }}>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:C.sidebar }}>Propiedades</h1>
            <Portfolio />
          </div>
        )}
      </div>
    </div>
  );
}
