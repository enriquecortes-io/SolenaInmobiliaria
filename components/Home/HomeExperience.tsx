"use client";
import dynamic from "next/dynamic";

const MasonrySection = dynamic(() => import("./MasonrySection"), { ssr: false });
const Captacion      = dynamic(() => import("./Captacion"),      { ssr: false }) as any;

interface Props { locale: string; }

export default function HomeExperience({ locale }: Props) {
  return (
    <div style={{width:"100%",minHeight:"100vh",overflowY:"auto",background:"#FAFAF7"}}>

      {/* Masonry */}
      <div style={{minHeight:"100vh"}}>
        <MasonrySection locale={locale} />
      </div>

      {/* Captación */}
      <Captacion locale={locale} />

    </div>
  );
}
