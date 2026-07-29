"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima la página de detalle de propiedad.
 * No renderiza nada: opera sobre el DOM ya servido desde el servidor,
 * así que el contenido sigue siendo indexable y visible sin JS.
 */
export default function PropertyAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const root = document.querySelector("main");
    if (!root) return;

    const ctx = gsap.context(() => {
      // 1. Cabecera — entrada escalonada
      gsap.from("header > *", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });

      // 2. Galería — reveal con leve zoom
      const fotos = gsap.utils.toArray<HTMLElement>("main img");
      fotos.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 1.06, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            delay: i === 0 ? 0.3 : 0,
            scrollTrigger: { trigger: img, start: "top 88%", once: true },
          }
        );
      });

      // 3. Parallax suave en la imagen principal
      const hero = fotos[0];
      if (hero && window.innerWidth > 768) {
        gsap.to(hero, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      // 4. Cifras — contador ascendente
      gsap.utils.toArray<HTMLElement>("main div > p + p").forEach((el) => {
        const raw = el.textContent?.trim() ?? "";
        if (!/^\d+$/.test(raw)) return;
        const final = parseInt(raw, 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: final,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
        });
      });

      // 5. Secciones — fade-up al entrar en viewport
      gsap.utils.toArray<HTMLElement>("main section").forEach((sec) => {
        gsap.from(sec, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 85%", once: true },
        });
      });

      // 6. Etiquetas de características — aparición en cascada
      gsap.utils.toArray<HTMLElement>("main section span").forEach((tag, i) => {
        if (!tag.style.border) return;
        gsap.from(tag, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power2.out",
          delay: (i % 12) * 0.04,
          scrollTrigger: { trigger: tag, start: "top 92%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
