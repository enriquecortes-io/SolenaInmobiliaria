"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";

const MasonrySection = dynamic(() => import("./MasonrySection"), { ssr: false });
const Captacion      = dynamic(() => import("./Captacion"),      { ssr: false }) as any;

interface Props { locale: string; }

export default function HomeExperience({ locale }: Props) {
  const masonryRef   = useRef<HTMLDivElement>(null);
  const captacionRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{position:"fixed",inset:0,width:"100%",height:"100vh",overflow:"hidden",background:"#FAFAF7"}}>

      {/* Masonry */}
      <div ref={masonryRef} style={{position:"absolute",inset:0,zIndex:25}}>
        <MasonrySection locale={locale} onScrollDown={() => {
          if (captacionRef.current) {
            captacionRef.current.style.opacity = "1";
            captacionRef.current.style.pointerEvents = "auto";
            captacionRef.current.style.transform = "translateY(0)";
            masonryRef.current!.style.opacity = "0";
            masonryRef.current!.style.pointerEvents = "none";
          }
        }} />
      </div>

      {/* Captación */}
      <div ref={captacionRef} style={{
        position:"absolute", inset:0, zIndex:30,
        opacity:0, pointerEvents:"none",
        transform:"translateY(100%)",
        transition:"opacity 0.6s ease, transform 0.6s ease",
      }}>
        <Captacion locale={locale} onBack={() => {
          if (captacionRef.current && masonryRef.current) {
            captacionRef.current.style.opacity = "0";
            captacionRef.current.style.pointerEvents = "none";
            captacionRef.current.style.transform = "translateY(100%)";
            masonryRef.current.style.opacity = "1";
            masonryRef.current.style.pointerEvents = "auto";
          }
        }} />
      </div>

    </div>
  );
}
