"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";

const MasonrySection = dynamic(() => import("./MasonrySection"), { ssr: false });
const Captacion      = dynamic(() => import("./Captacion"),      { ssr: false }) as any;

interface Props { locale: string; }

export default function HomeExperience({ locale }: Props) {
  const captacionRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{position:"fixed",inset:0,width:"100%",height:"100vh",overflow:"hidden",background:"#FAFAF7"}}>

      {/* Masonry — directo, sin hero ni manifesto */}
      <div style={{position:"absolute",inset:0,zIndex:25}}>
        <MasonrySection locale={locale} />
      </div>

      {/* Captación */}
      <Captacion ref={captacionRef} locale={locale} />

    </div>
  );
}
