"use client";
import { forwardRef } from "react";
import ManifestoFlow from "./ManifestoFlow";

interface Props { locale: string; }

const Manifesto = forwardRef<HTMLDivElement, Props>(({ locale }, ref) => {
  return (
    <div ref={ref} style={{
      position:"absolute", inset:0, zIndex:12,
      opacity:0, pointerEvents:"none",
      willChange:"opacity",
      background:"rgba(4,3,2,0.55)",
      backdropFilter:"blur(20px)",
      WebkitBackdropFilter:"blur(20px)",
    }}>
      <ManifestoFlow locale={locale} />
    </div>
  );
});

Manifesto.displayName = "Manifesto";
export default Manifesto;
