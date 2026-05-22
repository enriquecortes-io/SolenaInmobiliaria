"use client";

export default function CarouselDiscoverIndicator() {
  return (
    <>
      <style>{`
        @keyframes neonBreathV {
          0%   { height: 1.5rem; opacity: 0.3; box-shadow: 0 0 4px 1px rgba(255,255,255,0.3); }
          50%  { height: 3.5rem; opacity: 1;   box-shadow: 0 0 12px 3px rgba(255,255,255,0.9), 0 0 24px 6px rgba(255,255,255,0.3); }
          100% { height: 1.5rem; opacity: 0.3; box-shadow: 0 0 4px 1px rgba(255,255,255,0.3); }
        }
        @keyframes textFadeV {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.7; }
        }
        .neon-line-v { animation: neonBreathV 2.4s ease-in-out infinite; }
        .discover-label { animation: textFadeV 2.4s ease-in-out infinite; }
      `}</style>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"flex-start",
        gap:"0.7rem", pointerEvents:"none",
      }}>
        <span className="discover-label" style={{
          color:"white", fontSize:"0.4rem",
          letterSpacing:"0.5em", fontFamily:"'Montserrat',sans-serif",
          textTransform:"uppercase",
        }}>DISCOVER</span>
        <div className="neon-line-v" style={{ width:"1px", background:"white", borderRadius:"1px" }}/>
      </div>
    </>
  );
}
