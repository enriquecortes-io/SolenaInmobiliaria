"use client";

interface Props {
  width?: number;
  height?: number;
}

export default function TheEditLogo({ width = 180, height = 56 }: Props) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1px" }}>
      <span style={{
        fontFamily:"'Montserrat', 'Helvetica Neue', sans-serif",
        fontWeight:300,
        fontSize:"clamp(0.34rem,0.6vw,0.42rem)",
        color:"rgba(255,255,255,0.6)",
        letterSpacing:"0.45em",
        textTransform:"uppercase",
        whiteSpace:"nowrap",
      }}>Inmobiliaria</span>
      <span style={{
        fontFamily:"'Cormorant Garamond', 'Didot', 'Bodoni MT', Georgia, serif",
        fontWeight:700,
        fontSize:"clamp(1.4rem,3vw,2rem)",
        background:"linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #B8976E 70%, #C9A96E 100%)",
        WebkitBackgroundClip:"text",
        WebkitTextFillColor:"transparent",
        backgroundClip:"text",
        letterSpacing:"0.08em",
        lineHeight:1,
        whiteSpace:"nowrap",
      }}>SOLENA</span>
      <span style={{
        fontFamily:"'Montserrat', 'Helvetica Neue', sans-serif",
        fontWeight:300,
        fontSize:"clamp(0.34rem,0.6vw,0.42rem)",
        color:"rgba(255,255,255,0.6)",
        letterSpacing:"0.45em",
        textTransform:"uppercase",
        whiteSpace:"nowrap",
      }}>Costa del Sol</span>
    </div>
  );
}
