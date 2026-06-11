"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/types/property";

interface Props {
  properties: Property[];
  locale: string;
  tp: any;
}

export default function MobileCarousel({ properties, locale, tp }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const n = properties.length;

  const getTitle = (p: Property) =>
    typeof p.titulo === "object" ? (p.titulo as any)[locale] || (p.titulo as any)["es"] || "" : p.titulo;

  const goTo = (next: number) => {
    setActive(Math.max(0, Math.min(n - 1, next)));
    setDragX(0);
    setDragging(false);
  };

  return (
    <div style={{
      position:"fixed",
      top:"4rem", left:0, right:0, bottom:0,
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      overflow:"hidden",
    }}>
      <style>{`
        @keyframes cardSpring {
          0%   { opacity:0; transform: translateX(80px) scale(0.9); }
          100% { opacity:1; transform: translateX(0)    scale(1);   }
        }
      `}</style>

      {/* Stage */}
      <div
        style={{
          position:"relative",
          width:"100%", height:"70vh",
          perspective:"900px",
          perspectiveOrigin:"50% 50%",
        }}
        onTouchStart={e => {
          touchStartX.current = e.touches[0].clientX;
          touchStartY.current = e.touches[0].clientY;
          setDragging(true);
        }}
        onTouchMove={e => {
          if (!dragging) return;
          const dx = e.touches[0].clientX - touchStartX.current;
          const dy = e.touches[0].clientY - touchStartY.current;
          if (Math.abs(dx) > Math.abs(dy)) setDragX(dx);
        }}
        onTouchEnd={e => {
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          const dy = touchStartY.current - e.changedTouches[0].clientY;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            goTo(active + (dx > 0 ? 1 : -1));
          } else {
            setDragX(0);
            setDragging(false);
          }
        }}
      >
        {properties.map((p, i) => {
          const diff = i - active;
          const abs = Math.abs(diff);
          if (abs > 2) return null;

          const dragOffset = i === active ? dragX * 0.25 : 0;
          const tx = diff * 72 + dragOffset;
          const tz = abs === 0 ? 0 : abs === 1 ? -100 : -200;
          const ry = diff * 25 + (i === active ? dragX * 0.015 : 0);
          const scale = abs === 0 ? 1 : abs === 1 ? 0.8 : 0.62;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.3;

          return (
            <div
              key={p.slug}
              onClick={() => abs === 0 ? router.push(`/${locale}/propiedades/${p.slug}`) : goTo(i)}
              style={{
                position:"absolute",
                left:"50%", top:"50%",
                width:"72vw", height:"62vh",
                marginLeft:"-36vw", marginTop:"-31vh",
                transform:`translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                opacity,
                transition: dragging ? "none" : "all 0.5s cubic-bezier(0.34,1.4,0.64,1)",
                transformOrigin:"center center",
                zIndex: 10 - abs,
                borderRadius:"2px",
                overflow:"hidden",
                border:`1px solid rgba(201,169,110,${abs===0?0.5:0.12})`,
                boxShadow: abs===0 ? "0 25px 70px rgba(0,0,0,0.85)" : "0 8px 25px rgba(0,0,0,0.5)",
                cursor:"pointer",
              }}
            >
              {p.galeria_urls?.[0]
                ? <img src={p.galeria_urls[0]} alt={getTitle(p)} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                : <div style={{ width:"100%", height:"100%", background:"#111" }}/>
              }
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 35%, rgba(4,3,2,0.96) 100%)" }}/>
              <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:"1px", background:`linear-gradient(90deg,transparent,rgba(201,169,110,${abs===0?0.8:0.2}),transparent)` }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1rem" }}>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.38rem", color:"rgba(201,169,110,0.8)", letterSpacing:"0.35em", textTransform:"uppercase", margin:"0 0 0.35rem" }}>{p.ubicacion}</p>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1rem,4vw,1.3rem)", color:"white", margin:"0 0 0.5rem", fontWeight:600, lineHeight:1.1 }}>{getTitle(p)}</h3>
                <div style={{ display:"flex", gap:"1rem", alignItems:"baseline" }}>
                  {p.precio && <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", color:"#c9a96e", fontWeight:300 }}>€{(p.precio/1000000 % 1 === 0 ? (p.precio/1000000).toFixed(0) : (p.precio/1000000).toFixed(3).replace(/\.?0+$/, ''))}M</span>}
                  {p.m2_construidos && <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.35rem", color:"rgba(255,255,255,0.5)", letterSpacing:"0.2em" }}>{p.m2_construidos}m²</span>}
                  {p.habitaciones && <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.35rem", color:"rgba(255,255,255,0.5)", letterSpacing:"0.2em" }}>{p.habitaciones} {tp.bed}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots + counter */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.6rem", marginTop:"1rem" }}>
        <div style={{ display:"flex", gap:"0.4rem" }}>
          {properties.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i===active ? "1.2rem" : "0.3rem",
              height:"0.3rem", borderRadius:"2px", border:"none",
              background: i===active ? "#c9a96e" : "rgba(255,255,255,0.2)",
              transition:"all 0.3s", padding:0, cursor:"pointer",
            }}/>
          ))}
        </div>
        <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.35rem", color:"rgba(201,169,110,0.4)", letterSpacing:"0.4em", margin:0 }}>
          {String(active+1).padStart(2,"0")} / {String(n).padStart(2,"0")}
        </p>
      </div>
    </div>
  );
}
