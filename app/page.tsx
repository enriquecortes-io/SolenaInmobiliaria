"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  tipo: string;
  zona: string;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ locale = "es" }: { locale?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const LANGS = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ru", label: "RU" },
  ];

  const switchLocale = (newLocale: string) => {
    setOpen(false);
    router.push(`/${newLocale}`);
  };

  return (
    <>
      <style>{`
        @keyframes dropIn {
          0%  { opacity:0; transform:translateY(-8px); }
          100%{ opacity:1; transform:translateY(0); }
        }
        .lang-dropdown { animation: dropIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }
        .lang-opt { transition: all 0.2s ease; }
        .lang-opt:hover { background: rgba(45,74,62,0.08) !important; color: #C9A96E !important; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "4rem",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 2rem",
        zIndex: 1000,
        background: "rgba(250,248,244,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #DDD8D0",
      }}>
        {/* Logo */}
        <a href={`/${locale}`} style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <span style={{
              fontFamily: "'Montserrat','Helvetica Neue',sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.34rem,0.6vw,0.42rem)",
              color: "rgba(45,74,62,0.5)",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>Inmobiliaria</span>
            <span style={{
              fontFamily: "'Cormorant Garamond','Didot','Bodoni MT',Georgia,serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem,3vw,2rem)",
              background: "linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #B8976E 70%, #C9A96E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.08em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}>SOLENA</span>
            <span style={{
              fontFamily: "'Montserrat','Helvetica Neue',sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.34rem,0.6vw,0.42rem)",
              color: "rgba(45,74,62,0.5)",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>Costa del Sol</span>
          </div>
        </a>

        {/* Centro vacío */}
        <div />

        {/* Selector de idioma */}
        <div style={{ position: "relative", justifySelf: "end" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "1px solid #DDD8D0",
              color: "#111111",
              fontFamily: "'Montserrat','Helvetica Neue',sans-serif",
              fontSize: "0.55rem",
              fontWeight: 300,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              padding: "0.5rem 1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              transition: "all 0.2s ease",
            }}
          >
            {locale.toUpperCase()}
            <span style={{
              fontSize: "0.4rem",
              opacity: 0.5,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
              display: "inline-block",
            }}>▼</span>
          </button>

          {open && (
            <div className="lang-dropdown" style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              right: 0,
              background: "rgba(250,248,244,0.97)",
              border: "1px solid #DDD8D0",
              backdropFilter: "blur(12px)",
              minWidth: "6rem",
              zIndex: 100,
            }}>
              {LANGS.filter(l => l.code !== locale).map(l => (
                <button
                  key={l.code}
                  className="lang-opt"
                  onClick={() => switchLocale(l.code)}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "0.55rem",
                    fontWeight: 300,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#111",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

// ─── Hero Header ──────────────────────────────────────────────────────────────

function HeroHeader() {
  const router = useRouter();

  return (
    <section style={{
      width: "100%",
      minHeight: "50vh",
      background: "#FAFAF7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,4vw,3rem)",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Línea decorativa superior */}
      <div style={{
        position: "absolute",
        top: "clamp(3rem,5vw,4rem)",
        left: "10%", right: "10%",
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)",
      }} />

      <div style={{
        maxWidth: 720,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
      }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "clamp(0.5rem,0.8vw,0.65rem)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "#C9A96E",
        }}>Costa del Sol</span>

        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(2.8rem,6vw,5rem)",
          fontWeight: 600,
          color: "#1A1714",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.01em",
        }}>
          Tu próxima casa,<br />sin complicaciones
        </h1>

        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.1rem,1.8vw,1.5rem)",
          color: "rgba(45,74,62,0.75)",
          lineHeight: 1.6,
          margin: 0,
          fontStyle: "italic",
        }}>
          Propiedades seleccionadas en la Costa del Sol.<br />
          Te acompañamos desde el primer contacto hasta las llaves en la mano.
        </p>

        <button
          onClick={() => {
            document.getElementById("masonry-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            alignSelf: "center",
            marginTop: "0.5rem",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(0.5rem,0.8vw,0.65rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#FAFAF7",
            background: "#C9A96E",
            border: "none",
            padding: "1rem 2.5rem",
            cursor: "pointer",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          Ver propiedades →
        </button>
      </div>

      {/* Línea decorativa inferior */}
      <div style={{
        position: "absolute",
        bottom: "clamp(3rem,5vw,4rem)",
        left: "10%", right: "10%",
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
      }} />
    </section>
  );
}

// ─── Masonry Section ──────────────────────────────────────────────────────────

function MasonrySection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then(r => r.json())
      .then(data => {
        setProperties(data?.properties ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div id="masonry-section" style={{
        padding: "4rem 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            height: 380,
            background: "#EDEAE4",
            borderRadius: 2,
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
        ))}
      </div>
    );
  }

  return (
    <div id="masonry-section" style={{ padding: "4rem 2rem", background: "#FAFAF7" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}>
        {properties.map(p => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ property: p }: { property: Property }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/es/propiedades/${p.id}`}
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: "#fff",
        border: "1px solid #DDD8D0",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
        {/* Imagen */}
        <div style={{ position: "relative", height: 240, overflow: "hidden", flexShrink: 0 }}>
          <img
            src={p.image_url}
            alt={p.title}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
          <div style={{
            position: "absolute", top: "0.75rem", left: "0.75rem",
            background: "#C9A96E",
            color: "#FAFAF7",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.4rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            padding: "0.3rem 0.7rem",
          }}>
            {p.tipo}
          </div>
        </div>

        {/* Info — anclada al fondo */}
        <div style={{
          padding: "1.2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flexGrow: 1,
          gap: "0.5rem",
        }}>
          <div>
            <p style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.45rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A96E",
              margin: "0 0 0.3rem",
            }}>{p.zona}</p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#1A1714",
              margin: "0 0 0.5rem",
              lineHeight: 1.2,
            }}>{p.title}</h3>
            <p style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#C9A96E",
              margin: 0,
            }}>
              {p.price.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
            </p>
          </div>

          <div style={{
            display: "flex",
            gap: "1rem",
            borderTop: "1px solid #DDD8D0",
            paddingTop: "0.75rem",
          }}>
            {[
              { label: "HAB", value: p.bedrooms },
              { label: "BAÑOS", value: p.bathrooms },
              { label: "M²", value: p.area },
            ].map(stat => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.38rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(45,74,62,0.5)",
                }}>{stat.label}</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1rem",
                  color: "#1A1714",
                  fontWeight: 600,
                }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Captacion Section ────────────────────────────────────────────────────────

function CaptacionSection() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tipo: "captacion" }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "none",
    border: "none",
    borderBottom: "1px solid #DDD8D0",
    padding: "0.75rem 0",
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "1rem",
    color: "#1A1714",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const services = [
    {
      icon: "🏠",
      title: "Búsqueda personalizada",
      desc: "Te escuchamos y buscamos la propiedad que se adapta a ti, no al revés.",
    },
    {
      icon: "📋",
      title: "Gestión completa",
      desc: "Desde la primera visita hasta la firma. Nos ocupamos de todo el proceso.",
    },
    {
      icon: "⚖️",
      title: "Asesoramiento legal",
      desc: "Contratos, NIE, notaría. Sin letra pequeña, sin sorpresas.",
    },
    {
      icon: "💰",
      title: "Financiación",
      desc: "Te ayudamos a encontrar la mejor hipoteca para tu situación.",
    },
    {
      icon: "🔑",
      title: "Post-venta",
      desc: "Después de la firma también estamos aquí para lo que necesites.",
    },
    {
      icon: "📸",
      title: "Vende tu propiedad",
      desc: "Reportaje profesional, difusión en todos los portales y gestión de visitas.",
    },
  ];

  return (
    <section id="contacto" style={{
      background: "#F5F3EE",
      padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,4vw,3rem)",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#C9A96E",
          }}>Hablemos</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2rem,4vw,3.5rem)",
            fontWeight: 600,
            color: "#1A1714",
            margin: "0.5rem 0 1rem",
          }}>¿Tienes una propiedad o buscas una?</h2>
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(1rem,1.5vw,1.3rem)",
            color: "rgba(45,74,62,0.75)",
            fontStyle: "italic",
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Sin compromisos. Cuéntanos qué necesitas y te respondemos en menos de 24 horas.
          </p>
        </div>

        {/* Formulario primero */}
        <div style={{
          background: "#FAFAF7",
          border: "1px solid #DDD8D0",
          padding: "2.5rem",
          maxWidth: 580,
          margin: "0 auto 4rem",
          boxSizing: "border-box",
        }}>
          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.5rem",
                color: "#C9A96E",
              }}>¡Mensaje recibido! Te contactamos pronto.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { key: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                { key: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
                { key: "telefono", label: "Teléfono", type: "tel", placeholder: "+34 600 000 000" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{
                    display: "block",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "0.42rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(45,74,62,0.6)",
                    marginBottom: "0.3rem",
                  }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  display: "block",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.42rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(45,74,62,0.6)",
                  marginBottom: "0.3rem",
                }}>Mensaje</label>
                <textarea
                  placeholder="¿En qué podemos ayudarte?"
                  rows={4}
                  value={form.mensaje}
                  onChange={e => setForm(prev => ({ ...prev, mensaje: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {status === "error" && (
                <p style={{ color: "#C1694F", fontFamily: "'Montserrat',sans-serif", fontSize: "0.55rem" }}>
                  Algo fue mal. Inténtalo de nuevo.
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                style={{
                  alignSelf: "flex-start",
                  background: "#C9A96E",
                  color: "#FAFAF7",
                  border: "none",
                  padding: "1rem 2.5rem",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          )}
        </div>

        {/* Servicios */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}>
          {services.map(s => (
            <div key={s.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{s.icon}</span>
              <div>
                <h3 style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#1A1714",
                  margin: "0 0 0.4rem",
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1rem",
                  color: "rgba(45,74,62,0.75)",
                  lineHeight: 1.6,
                  margin: 0,
                }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      width: "100%",
      background: "#F5F3EE",
      borderTop: "1px solid rgba(201,169,110,0.2)",
      padding: "clamp(2rem,4vw,3.5rem) clamp(1.5rem,4vw,3rem)",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: 1000,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
      }}>
        {/* Marca */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            background: "linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #C9A96E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.08em",
          }}>SOLENA</span>
          <span style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(45,74,62,0.5)",
          }}>Inmobiliaria Costa del Sol</span>
        </div>

        {/* Contacto */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "0.3rem",
          }}>Contacto</span>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#C9A96E" }}>
            Urb. La Alzambra, Centro de Negocios Vasari, Marbella, España
          </span>
          <a href="mailto:Info@solenainmobiliaria.es" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#C9A96E", textDecoration: "none" }}>
            Info@solenainmobiliaria.es
          </a>
          <a href="tel:+34610589716" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#C9A96E", textDecoration: "none" }}>
            +34 610 589 716
          </a>
        </div>

        {/* Legal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "0.3rem",
          }}>Legal</span>
          {[
            { label: "Aviso Legal", href: "/es/legal" },
            { label: "Política de Privacidad", href: "/es/privacidad" },
            { label: "Política de Cookies", href: "/es/cookies" },
          ].map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1rem",
              color: "#C9A96E",
              textDecoration: "none",
              opacity: 0.8,
            }}>{l.label}</a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        maxWidth: 1000,
        margin: "2rem auto 0",
        borderTop: "1px solid rgba(201,169,110,0.15)",
        paddingTop: "1.2rem",
        textAlign: "center",
      }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "0.42rem",
          letterSpacing: "0.2em",
          color: "rgba(45,74,62,0.5)",
          textTransform: "uppercase",
        }}>
          © {new Date().getFullYear()} Solena Inmobiliaria · Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
}

// ─── WhatsApp Button ──────────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 999 }}>
      <a
        href="https://wa.me/34610589716?text=Hola%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20propiedades%20en%20la%20Costa%20del%20Sol."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          width: "3rem", height: "3rem",
          borderRadius: "50%",
          background: "#C9A96E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(45,74,62,0.4)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          textDecoration: "none",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px rgba(45,74,62,0.5)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(45,74,62,0.4)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

// ─── Page (Home) ──────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ width: "100%", background: "#FAFAF7" }}>
      <Navbar locale="es" />
      <div style={{ paddingTop: "4rem" }}>
        <HeroHeader />
        <MasonrySection />
        <CaptacionSection />
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}