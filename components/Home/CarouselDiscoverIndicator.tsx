"use client";

export default function CarouselDiscoverIndicator() {
 return (
   <>
     <style>{`
       @keyframes neonBreathV2 {
         0%   { height: 1.5rem; opacity: 0.3; box-shadow: 0 0 4px 1px rgba(255,255,255,0.3); }
         50%  { height: 3.5rem; opacity: 1;   box-shadow: 0 0 12px 3px rgba(255,255,255,0.9), 0 0 24px 6px rgba(255,255,255,0.3); }
         100% { height: 1.5rem; opacity: 0.3; box-shadow: 0 0 4px 1px rgba(255,255,255,0.3); }
       }
       .neon-line-v2 { animation: neonBreathV2 2.4s ease-in-out infinite; }
     `}</style>
     <div style={{
       display:"flex", flexDirection:"column", alignItems:"center",
       pointerEvents:"none", paddingRight:"0",
     }}>
       <div className="neon-line-v2" style={{ width:"1px", background:"white", borderRadius:"1px" }}/>
     </div>
   </>
 );
}
