import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Aviso Legal — Solena Inmobiliaria",
  robots: "noindex",
};
const S = { marginBottom:"3rem" } as const;
const H2 = { fontSize:"0.75rem", fontWeight:600 as const, color:"#1A1714", letterSpacing:"0.15em", textTransform:"uppercase" as const, marginBottom:"1rem" };
const P = { lineHeight:1.9, fontSize:"0.9rem", color:"#4A4540", fontWeight:300 as const };
export default function LegalPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF7", padding:"8rem clamp(2rem,10vw,12rem) 4rem", fontFamily:"'Montserrat','Helvetica Neue',sans-serif" }}>
      <div style={{ maxWidth:"800px", margin:"0 auto" }}>
        <p style={{ color:"#C9A96E", fontSize:"0.5rem", letterSpacing:"0.5em", textTransform:"uppercase", marginBottom:"1rem" }}>Solena Inmobiliaria</p>
        <h1 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, color:"#1A1714", marginBottom:"4rem", fontFamily:"'Cormorant Garamond',serif" }}>Aviso Legal</h1>
        <section style={S}>
          <h2 style={H2}>1. Identificación del titular</h2>
          <p style={P}>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa:</p>
          <ul style={{ ...P, paddingLeft:"1.5rem", lineHeight:2.2 }}>
            <li><strong style={{color:"#1A1714"}}>Titular:</strong> Enrique Cortés Gómez</li>
            <li><strong style={{color:"#1A1714"}}>Actividad:</strong> Agente inmobiliario independiente</li>
            <li><strong style={{color:"#1A1714"}}>Domicilio:</strong> Urb. La Alzambra, Centro de Negocios Vasari, Marbella, España</li>
            <li><strong style={{color:"#1A1714"}}>Email:</strong> Info@solenainmobiliaria.es</li>
            <li><strong style={{color:"#1A1714"}}>Web:</strong> solenainmo.es</li>
          </ul>
        </section>
        <section style={S}>
          <h2 style={H2}>2. Objeto y ámbito de aplicación</h2>
          <p style={P}>El presente Aviso Legal regula el acceso y uso del sitio web solenainmo.es, cuya actividad principal es la intermediación inmobiliaria de propiedades residenciales en la Costa del Sol. El acceso y uso de este sitio implica la aceptación plena de las presentes condiciones.</p>
        </section>
        <section style={S}>
          <h2 style={H2}>3. Propiedad intelectual</h2>
          <p style={P}>Todos los contenidos del sitio web, incluyendo textos, fotografías, vídeos, diseño gráfico y código fuente, son propiedad de Enrique Cortés Gómez o de terceros que han autorizado su uso. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
        </section>
        <section style={S}>
          <h2 style={H2}>4. Responsabilidad</h2>
          <p style={P}>La información sobre propiedades publicada en este sitio tiene carácter meramente informativo. Los precios y disponibilidad están sujetos a cambios sin previo aviso. Solena Inmobiliaria no se hace responsable de los errores u omisiones en la información publicada.</p>
        </section>
        <section style={S}>
          <h2 style={H2}>5. Legislación aplicable</h2>
          <p style={P}>Este sitio web se rige por la legislación española. Para cualquier controversia derivada del uso del sitio, las partes se someten a los juzgados y tribunales de Marbella, con renuncia expresa a cualquier otro fuero.</p>
        </section>
        <div style={{ borderTop:"1px solid #DDD8D0", paddingTop:"2rem", marginTop:"4rem" }}>
          <a href="/" style={{ color:"#C9A96E", fontSize:"0.5rem", letterSpacing:"0.4em", textTransform:"uppercase", textDecoration:"none" }}>← Volver</a>
        </div>
      </div>
    </div>
  );
}
