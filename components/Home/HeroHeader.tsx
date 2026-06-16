"use client";

interface Props { locale?: string; }

export default function HeroHeader({ locale = "es" }: Props) {
 const scrollToMasonry = () => {
   const el = document.getElementById("masonry-section");
   if (el) el.scrollIntoView({ behavior: "smooth" });
 };

 return (
   <section style={{
     width:"100%",
     minHeight:"50vh",
     background:"#FAFAF7",
     display:"flex",
     alignItems:"center",
     justifyContent:"center",
     padding:"clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem)",
     boxSizing:"border-box",
     borderBottom:"1px solid rgba(201,169,110,0.15)",
   }}>
     <div style={{ maxWidth:"700px", textAlign:"center", display:"flex", flexDirection:"column", gap:"1.2rem" }}>

       {/* Eyebrow */}
       <span style={{
         fontFamily:"'Montserrat',sans-serif",
         fontSize:"clamp(0.5rem,0.8vw,0.65rem)",
         letterSpacing:"0.45em",
         textTransform:"uppercase",
         color:"#C9A96E",
       }}>Costa del Sol</span>

       {/* Título */}
       <h1 style={{
         fontFamily:"'Cormorant Garamond',serif",
         fontSize:"clamp(2.8rem,6vw,5rem)",
         fontWeight:600,
         color:"#1A1714",
         lineHeight:1.1,
         margin:0,
         letterSpacing:"-0.01em",
       }}>
         Tu próxima casa,<br />sin complicaciones
       </h1>

       {/* Subtítulo */}
       <p style={{
         fontFamily:"'Cormorant Garamond',serif",
         fontSize:"clamp(1.1rem,1.8vw,1.5rem)",
         color:"rgba(45,74,62,0.75)",
         lineHeight:1.6,
         margin:0,
         fontStyle:"italic",
       }}>
         Propiedades seleccionadas en la Costa del Sol. Te acompañamos desde el primer contacto hasta las llaves en la mano.
       </p>

       {/* CTA */}
       <button onClick={scrollToMasonry} style={{
         alignSelf:"center",
         marginTop:"0.5rem",
         fontFamily:"'Montserrat',sans-serif",
         fontSize:"clamp(0.5rem,0.8vw,0.65rem)",
         letterSpacing:"0.35em",
         textTransform:"uppercase",
         color:"#FAFAF7",
         background:"#2D4A3E",
         border:"none",
         padding:"1rem 2.5rem",
         cursor:"pointer",
         transition:"opacity 0.2s",
       }}
         onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
         onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
       >
         Ver propiedades →
       </button>

     </div>
   </section>
 );
}
