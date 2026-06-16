"use client";

const ACCENT = "#C9A96E";
const TEXT = "#2D4A3E";
const MUTED = "rgba(45,74,62,0.5)";

interface Props { locale?: string; }

export default function Footer({ locale = "es" }: Props) {
  return (
    <footer style={{
      width:"100%",
      background:"#F5F3EE",
      borderTop:"1px solid rgba(201,169,110,0.2)",
      padding:"clamp(2rem,4vw,3.5rem) clamp(1.5rem,4vw,3rem)",
      boxSizing:"border-box",
    }}>
      <div style={{
        maxWidth:"1000px", margin:"0 auto",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
        gap:"2rem",
      }}>

        {/* Logo + tagline */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          <span style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"1.6rem", fontWeight:700,
            background:"linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #C9A96E 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            letterSpacing:"0.08em",
          }}>SOLENA</span>
          <span style={{
            fontFamily:"'Montserrat',sans-serif", fontSize:"0.55rem",
            letterSpacing:"0.3em", textTransform:"uppercase", color:MUTED,
          }}>Inmobiliaria Costa del Sol</span>
        </div>

        {/* Contacto */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.5rem", letterSpacing:"0.3em", textTransform:"uppercase", color:ACCENT, marginBottom:"0.3rem" }}>Contacto</span>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:TEXT }}>Marbella, Málaga, España</span>
          <a href="mailto:info@solenainmobiliaria.com" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:TEXT, textDecoration:"none" }}>
            info@solenainmobiliaria.com
          </a>
          <a href="tel:+34600000000" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:TEXT, textDecoration:"none" }}>
            +34 600 000 000
          </a>
        </div>

        {/* Legal */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.5rem", letterSpacing:"0.3em", textTransform:"uppercase", color:ACCENT, marginBottom:"0.3rem" }}>Legal</span>
          {[
            { label:"Aviso Legal", href:`/${locale}/legal` },
            { label:"Política de Privacidad", href:`/${locale}/privacidad` },
            { label:"Política de Cookies", href:`/${locale}/cookies` },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:TEXT, textDecoration:"none", opacity:0.8 }}>
              {l.label}
            </a>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <div style={{
        maxWidth:"1000px", margin:"2rem auto 0",
        borderTop:"1px solid rgba(201,169,110,0.15)",
        paddingTop:"1.2rem",
        textAlign:"center",
      }}>
        <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.42rem", letterSpacing:"0.2em", color:MUTED, textTransform:"uppercase" }}>
          © {new Date().getFullYear()} Solena Inmobiliaria · Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
}
