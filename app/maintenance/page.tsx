export default function MaintenancePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0805",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <p style={{ color: "#c9a96e", fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "32px" }}>
        THE EDIT MARBELLA
      </p>
      <h1 style={{ color: "white", fontSize: "clamp(2rem,5vw,3.5rem)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, margin: "0 0 16px", textAlign: "center" }}>
        Volvemos pronto
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", letterSpacing: "0.2em", textAlign: "center" }}>
        Estamos trabajando para ofrecerte una experiencia excepcional
      </p>
    </div>
  );
}
