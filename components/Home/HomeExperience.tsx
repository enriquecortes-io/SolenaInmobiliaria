"use client";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const MasonrySection = dynamic(() => import("./MasonrySection"), { ssr: false });
const Captacion      = dynamic(() => import("./Captacion"),      { ssr: false }) as any;

interface Props { locale: string; }

export default function HomeExperience({ locale }: Props) {
  return (
    <div style={{ width:"100%", background:"#FAFAF7" }}>
      <MasonrySection locale={locale} />
      <Captacion locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
