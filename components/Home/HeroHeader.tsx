"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props { locale?: string; }

export default function HeroHeader({ locale = "es" }: Props) {
 const containerRef = useRef<HTMLDivElement>(null);
 const eyebrowRef   = useRef<HTMLSpanElement>(null);
 const titleRef     = useRef<HTMLHeadingElement>(null);
 const subtitleRef  = useRef<HTMLParagraphElement>(null);
 const ctaRef       = useRef<HTMLButtonElement>(null);
 const lineRef      = useRef<HTMLDivElement>(null);

 useEffect(() => {
   const ctx = gsap.context(() => {
     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

     // Línea dorada se dibuja de izquierda a derecha
     tl.fromTo(lineRef.current,
       { scaleX: 0, transformOrigin: "left center" },
       { scaleX: 1, duration: 1.2 }
     )
     // Eyebrow sube con fade
     .fromTo(eyebrowRef.current,
       { opacity: 0, y: 12, letterSpacing: "0.8em" },
       { opacity: 1, y: 0, letterSpacing: "0.45em", duration: 0.9 },
       "-=0.6"
     )
     // Título entra palabra a palabra
     .fromTo(titleRef.current,
       { opacity: 0, y: 40, skewY: 2 },
       { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
       "-=0.5"
     )
     // Subtítulo
     .fromTo(subtitleRef.current,
       { opacity: 0, y: 20 },
       { opacity: 1, y: 0, duration: 0.9 },
       "-=0.6"
     )
     // CTA aparece con clip
     .fromTo(ctaRef.current,
       { opacity: 0, y: 16, scale: 0.97 },
       { opacity: 1, y: 0, scale: 1, duration: 0.7 },
       "-=0.4"
     );
   }, containerRef);

   return () => ctx.revert();
 }, []);

 const scrollToMasonry = () => {
   const el = document.getElementById("masonry-section");
   if (el) el.scrollIntoView({ behavior: "smooth" });
 };

 return (
   <section ref={containerRef} style={{
     width:"100%",
     minHeight:"50vh",
     background:"#FAFAF7",
     display:"flex",
     alignItems:"center",
     justifyContent:"center",
     padding:"clamp(4rem,8vw,6rem) clamp(1.5rem,4vw,3rem)",
     boxSizing:"border-box",
     position:"relative",
     overflow:"hidden",
   }}>

     {/* Línea dorada decorativa */}
     <div ref={lineRef} style={{
       position:"absolute",
       top:"clamp(3rem,5vw,4rem)",
       left:"10%", right:"10%",
       height:"1px",
       background:"linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)",
     }}/>

     <div style={{ maxWidth:"720px", textAlign:"center", display:"flex", flexDirection:"column", gap:"1.4rem" }}>

       <span ref={eyebrowRef} style={{
         fontFamily:"'Montserrat',sans-serif",
         fontSize:"clamp(0.5rem,0.8vw,0.65rem)",
         letterSpacing:"0.45em",
         textTransform:"uppercase",
         color:"#C9A96E",
         opacity:0,
       }}>Costa del Sol</span>

       <h1 ref={titleRef} style={{
         fontFamily:"'Cormorant Garamond',serif",
         fontSize:"clamp(2.8rem,6vw,5rem)",
         fontWeight:600,
         color:"#1A1714",
         lineHeight:1.1,
         margin:0,
         letterSpacing:"-0.01em",
         opacity:0,
       }}>
         Tu próxima casa,<br />sin complicaciones
       </h1>

       <p ref={subtitleRef} style={{
         fontFamily:"'Cormorant Garamond',serif",
         fontSize:"clamp(1.1rem,1.8vw,1.5rem)",
         color:"rgba(45,74,62,0.75)",
         lineHeight:1.6,
         margin:0,
         fontStyle:"italic",
         opacity:0,
       }}>
         Propiedades seleccionadas en la Costa del Sol.<br/>
         Te acompañamos desde el primer contacto hasta las llaves en la mano.
       </p>

       <button ref={ctaRef} onClick={scrollToMasonry} style={{
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
         transition:"opacity 0.2s, transform 0.2s",
         opacity:0,
       }}
         onMouseEnter={e => { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-2px)"; }}
         onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}
       >
         Ver propiedades →
       </button>

     </div>

     {/* Línea dorada inferior */}
     <div style={{
       position:"absolute",
       bottom:"clamp(3rem,5vw,4rem)",
       left:"10%", right:"10%",
       height:"1px",
       background:"linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
     }}/>

   </section>
 );
}
