"use client";
import { useRef } from "react";
import PropertyCarousel from "./PropertyCarousel";
import { useHomeScroll } from "./useHomeScroll";
import SkyHeader from "./SkyHeader";
import FilterPanels from "./FilterPanels";

interface Props { locale: string; }

const TOTAL_PANELS = 3;

export default function HomeExperience({ locale }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useHomeScroll({ headerRef, filtersRef, panelRefs, totalPanels: TOTAL_PANELS });

  return (
    <div style={{position:"fixed",inset:0,width:"100%",height:"100vh",overflow:"hidden",background:"transparent"}}>

      {/* Header — contiene hero Y carrusel, el scroll engine lo gestiona */}
      <div ref={headerRef} style={{
        position:"absolute", inset:0, zIndex:20,
        willChange:"opacity,transform",
      }}>
        {/* Hero — ocupa toda la pantalla */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <SkyHeader locale={locale} />
        </div>

        {/* Carrusel — visible cuando el header desaparece */}
        <div style={{
          position:"absolute", inset:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:"0 clamp(1rem,5vw,4rem)",
        }}>
          <PropertyCarousel locale={locale} />
        </div>
      </div>

      {/* Filtros */}
      <div ref={filtersRef} style={{
        position:"absolute", inset:0, zIndex:10,
        opacity:0, pointerEvents:"none",
        perspective:"500px",
      }}>
        <div style={{position:"absolute",inset:0,transformStyle:"preserve-3d"}}>
          <FilterPanels locale={locale} panelRefs={panelRefs} />
        </div>
      </div>

    </div>
  );
}
