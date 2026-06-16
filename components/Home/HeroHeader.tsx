"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props { locale?: string; }

export default function HeroHeader({ locale = "es" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLSpanElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLButtonElement>(null);
  const rulerTopRef  = useRef<HTMLDivElement>(null);
  const rulerBotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });

      // 1. Línea dorada superior — se dibuja de centro a extremos
      tl.fromTo(rulerTopRef.current,
        { scaleX: 0, transformOrigin: "center center" },
        { scaleX: 1, duration: 1.4, ease: "expo.out" }
      )

      // 2. Eyebrow — emerge con letter-spacing colapsado
      .fromTo(eyebrowRef.current,
        { autoAlpha: 0, y: 10, letterSpacing: "1.2em" },
        { autoAlpha: 1, y: 0,  letterSpacing: "0.45em", duration: 1.1 },
        "-=0.9"
      )

      // 3. Línea 1 del H1 — sube desde abajo (line reveal)
      .fromTo(line1Ref.current,
        { yPercent: 105, autoAlpha: 0 },
        { yPercent: 0,   autoAlpha: 1, duration: 1.0 },
        "-=0.5"
      )

      // 4. Línea 2 del H1 — stagger sutil
      .fromTo(line2Ref.current,
        { yPercent: 105, autoAlpha: 0 },
        { yPercent: 0,   autoAlpha: 1, duration: 1.0 },
        "-=0.78"
      )

      // 5. Subtítulo — fade + leve y
      .fromTo(subtitleRef.current,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        "-=0.5"
      )

      // 6. CTA — pop sutil de escala
      .fromTo(ctaRef.current,
        { autoAlpha: 0, y: 14, scale: 0.95 },
        { autoAlpha: 1, y: 0,  scale: 1, duration: 0.8, ease: "back.out(1.6)" },
        "-=0.5"
      )

      // 7. Línea inferior — se dibuja al final
      .fromTo(rulerBotRef.current,
        { scaleX: 0, transformOrigin: "center center" },
        { scaleX: 1, duration: 1.2, ease: "expo.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToMasonry = () => {
    document.getElementById("masonry-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} style={{
      width: "100%",
      minHeight: "50vh",
      background: "#FAFAF7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,4vw,3rem)",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Línea dorada superior */}
      <div ref={rulerTopRef} style={{
        position: "absolute",
        top: "clamp(3rem,5vw,4rem)",
        left: "10%", right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)",
      }}/>

      <div style={{
        maxWidth: "720px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
      }}>

        <span ref={eyebrowRef} style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "clamp(0.5rem,0.8vw,0.65rem)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "#C9A96E",
          opacity: 0,
        }}>Costa del Sol</span>

        {/* H1 con overflow:hidden por línea para el line-reveal */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(2.8rem,6vw,5rem)",
          fontWeight: 600,
          color: "#1A1714",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.01em",
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
              Tu próxima casa,
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={line2Ref} style={{ display: "block", opacity: 0 }}>
              sin complicaciones
            </span>
          </span>
        </h1>

        <p ref={subtitleRef} style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.1rem,1.8vw,1.5rem)",
          color: "rgba(45,74,62,0.75)",
          lineHeight: 1.6,
          margin: 0,
          fontStyle: "italic",
          opacity: 0,
        }}>
          Propiedades seleccionadas en la Costa del Sol.<br/>
          Te acompañamos desde el primer contacto hasta las llaves en la mano.
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToMasonry}
          style={{
            alignSelf: "center",
            marginTop: "0.5rem",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(0.5rem,0.8vw,0.65rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#FAFAF7",
            background: "#2D4A3E",
            border: "none",
            padding: "1rem 2.5rem",
            cursor: "pointer",
            transition: "opacity 0.2s, transform 0.2s",
            opacity: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity="1";    e.currentTarget.style.transform="translateY(0)"; }}
        >
          Ver propiedades →
        </button>

      </div>

      {/* Línea dorada inferior */}
      <div ref={rulerBotRef} style={{
        position: "absolute",
        bottom: "clamp(3rem,5vw,4rem)",
        left: "10%", right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
      }}/>

    </section>
  );
}
