"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AgentChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Bienvenido a The Edit Marbella. Soy Harvis, su asesor inmobiliario. ¿En qué puedo ayudarle hoy?"
      }]);
    }
  }, [open]);

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

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 900,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#111", border: "1px solid rgba(201,169,110,0.4)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          transition: "all 0.2s ease",
        }}
      >
        {open ? (
          <span style={{ color: "#c9a96e", fontSize: "18px" }}>✕</span>
        ) : (
          <span style={{ color: "#c9a96e", fontSize: "20px" }}>✦</span>
        )}
      </button>

      {/* Panel de chat */}
      {open && (
        <div style={{
          position: "fixed", bottom: "5.5rem", right: "2rem", zIndex: 900,
          width: "min(380px, calc(100vw - 2rem))",
          height: "520px",
          background: "#0f0f0f",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "12px",
          display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(201,169,110,0.15)",
            background: "#111",
          }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", margin: "0 0 4px" }}>The Edit Marbella</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "18px", color: "white", margin: 0, fontWeight: 600 }}>Harvis</p>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.3)", margin: "2px 0 0", letterSpacing: "0.2em", textTransform: "uppercase" }}>Asesor Inmobiliario</p>
          </div>

          {/* Mensajes */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? "#c9a96e" : "rgba(255,255,255,0.06)",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: m.role === "user" ? "#111" : "rgba(255,255,255,0.85)",
                  whiteSpace: "pre-wrap",
                }}>
                  {m.content}
                </div>
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

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(201,169,110,0.15)",
            background: "#111",
            display: "flex", gap: "8px",
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Escriba su consulta..."
              style={{
                flex: 1, padding: "10px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "white",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "12px",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 16px",
                background: input.trim() ? "#c9a96e" : "rgba(201,169,110,0.2)",
                border: "none", borderRadius: "8px",
                color: input.trim() ? "#111" : "rgba(201,169,110,0.4)",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "11px", fontWeight: 600,
                cursor: input.trim() ? "pointer" : "not-allowed",
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
