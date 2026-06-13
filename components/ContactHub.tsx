"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ContactHub() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/admin")) return;
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: "Bienvenido a The Edit Marbella. Soy Harvis, su asesor inmobiliario. ¿En qué puedo ayudarle hoy?" }]);
    }
  }, [chatOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, sessionId }),
      });
      const data = await res.json();
      const reply = data.response || data.message || data.content || "Lo siento, no he podido procesar su consulta.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Por favor, inténtelo de nuevo." }]);
    }
    setLoading(false);
  };

  if (!visible) return null;

  const waMessage = encodeURIComponent("Hola, me interesa conocer más sobre sus propiedades exclusivas en Marbella.");

  return (
    <>
      <style>{`
        @keyframes hubPulse {
          0%  { box-shadow: 0 0 0 0 rgba(201,169,110,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(201,169,110,0); }
          100%{ box-shadow: 0 0 0 0 rgba(201,169,110,0); }
        }
        .hub-btn { animation: hubPulse 2.5s ease-out infinite; }
        .hub-sub { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      {/* Chat panel */}
      {chatOpen && (
        <div style={{
          position: "fixed", bottom: "5.5rem", right: "1.8rem", zIndex: 9998,
          width: "min(380px, calc(100vw - 2rem))", height: "520px",
          background: "#0f0f0f", border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "12px", display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden",
        }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(201,169,110,0.15)", background: "#111" }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", margin: "0 0 4px" }}>The Edit Marbella</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "18px", color: "white", margin: 0, fontWeight: 600 }}>Harvis</p>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.3)", margin: "2px 0 0", letterSpacing: "0.2em", textTransform: "uppercase" }}>Asesor Inmobiliario</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? "#c9a96e" : "rgba(255,255,255,0.06)",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Montserrat',sans-serif", fontSize: "12px", lineHeight: 1.6,
                  color: m.role === "user" ? "#111" : "rgba(255,255,255,0.85)", whiteSpace: "pre-wrap",
                }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: "12px 12px 12px 2px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#c9a96e", fontSize: "16px", letterSpacing: "4px" }}>···</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(201,169,110,0.15)", background: "#111", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Escriba su consulta..."
              style={{
                flex: 1, padding: "10px 14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", color: "white",
                fontFamily: "'Montserrat',sans-serif", fontSize: "12px", outline: "none",
              }}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{
              padding: "10px 16px", background: input.trim() ? "#c9a96e" : "rgba(201,169,110,0.2)",
              border: "none", borderRadius: "8px",
              color: input.trim() ? "#111" : "rgba(201,169,110,0.4)",
              fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 600,
              cursor: input.trim() ? "pointer" : "not-allowed", letterSpacing: "0.1em", transition: "all 0.2s",
            }}>→</button>
          </div>
        </div>
      )}

      {/* Botones secundarios — aparecen al expandir */}
      {expanded && !chatOpen && (
        <>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/34610589716?text=${waMessage}`}
            target="_blank" rel="noopener noreferrer"
            className="hub-sub"
            style={{
              position: "fixed", bottom: "5.5rem", right: "1.8rem", zIndex: 9998,
              width: "3rem", height: "3rem", borderRadius: "50%",
              background: "rgba(250,248,244,0.95)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(45,74,62,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)", textDecoration: "none",
            }}
            aria-label="WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2D4A3E">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Harvis */}
          <button
            onClick={() => { setChatOpen(true); setExpanded(false); }}
            className="hub-sub"
            style={{
              position: "fixed", bottom: "9rem", right: "1.8rem", zIndex: 9998,
              width: "3rem", height: "3rem", borderRadius: "50%",
              background: "#111", border: "1px solid rgba(201,169,110,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)", cursor: "pointer",
            }}
            aria-label="Harvis IA"
          >
            <span style={{ color: "#c9a96e", fontSize: "18px" }}>✦</span>
          </button>
        </>
      )}

      {/* Botón principal */}
      <button
        onClick={() => {
          if (chatOpen) { setChatOpen(false); setExpanded(false); }
          else { setExpanded(p => !p); }
        }}
        className="hub-btn"
        style={{
          position: "fixed", bottom: "1.8rem", right: "1.8rem", zIndex: 9999,
          width: "3rem", height: "3rem", borderRadius: "50%",
          background: "rgba(250,248,244,0.92)", backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(45,74,62,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(26,23,20,0.12)", cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        aria-label="Contacto"
      >
        {(expanded || chatOpen) ? (
          <span style={{ color: "#2D4A3E", fontSize: "16px", fontWeight: 300 }}>✕</span>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#2D4A3E">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </button>
    </>
  );
}
