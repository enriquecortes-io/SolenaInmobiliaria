"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const MasonrySection = dynamic(() => import("./MasonrySection"), { ssr: false });
const Captacion      = dynamic(() => import("./Captacion"),      { ssr: false }) as any;

interface Props { locale: string; }

export default function HomeExperience({ locale }: Props) {
  const [panel, setPanel] = useState<"masonry" | "captacion">("masonry");

  return (
    <div style={{position:"fixed",inset:0,width:"100%",height:"100vh",overflow:"hidden",background:"#FAFAF7"}}>

      {/* Masonry */}
      <div style={{
        position:"absolute", inset:0, zIndex:25,
        opacity: panel === "masonry" ? 1 : 0,
        pointerEvents: panel === "masonry" ? "auto" : "none",
        transition:"opacity 0.5s ease",
      }}>
        <MasonrySection locale={locale} onScrollDown={() => setPanel("captacion")} />
      </div>

      {/* Captación */}
      <div style={{
        position:"absolute", inset:0, zIndex:30,
        opacity: panel === "captacion" ? 1 : 0,
        pointerEvents: panel === "captacion" ? "auto" : "none",
        transition:"opacity 0.5s ease",
        background:"#FAFAF7",
      }}>
        <Captacion locale={locale} onBack={() => setPanel("masonry")} />
      </div>

    </div>
  );
}
