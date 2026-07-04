// Force rebuild
'use client';

/**
 * NOTA: este archivo es ahora un Client Component ('use client').
 * Next.js no permite exportar `metadata` desde un Client Component.
 * Mueve el bloque `export const metadata = {...}` original a un
 * `layout.tsx` (Server Component) padre o a un `page.tsx` server-side
 * que envuelva a este componente.
 */

import { useState, useRef, FormEvent } from 'react';

const faqData = [
  {
    question: '¿Cuánto cobra Solena?',
    answer:
      'Solo cobramos si vendemos tu casa. Sin honorarios anticipados, sin costes fijos. Nuestro éxito está alineado con el tuyo.',
  },
  {
    question: '¿Cuánto tiempo tarda la venta?',
    answer:
      'Con exclusiva, la media en Costa del Sol es de 60 días. Depende del precio y la ubicación, pero los primeros 10 días son los más determinantes.',
  },
  {
    question: '¿Necesito reformar la casa antes?',
    answer:
      'No necesariamente. Te asesoramos sobre qué mejoras realmente aumentan el precio de venta y cuáles no compensan la inversión.',
  },
  {
    question: '¿Tengo que estar en las visitas?',
    answer:
      'No. Nosotros gestionamos y acompañamos cada visita. Recibirás un informe detallado después de cada una. Tú decides cuándo intervenir.',
  },
  {
    question: '¿Qué es la exclusiva y por qué importa?',
    answer:
      'La exclusiva nos permite invertir al máximo en el marketing de tu propiedad. Una casa publicada por varias agencias a la vez genera desconfianza en el comprador y suele tardar mucho más en venderse.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Valoración gratuita',
    text: 'Analizamos tu propiedad y te damos un precio basado en el mercado real de tu zona.',
  },
  {
    number: '2',
    title: 'Publicación en 30+ portales',
    text: 'Fotos profesionales y máxima visibilidad desde el primer día. 8.000 visualizaciones en los primeros 10 días.',
  },
  {
    number: '3',
    title: 'Visitas gestionadas',
    text: 'Filtramos compradores serios con financiación aprobada. Tú no tienes que estar presente.',
  },
  {
    number: '4',
    title: 'Cierre y firma',
    text: 'Acompañamiento legal hasta el notario. Cobras y listo.',
  },
];

const whyCards = [
  {
    number: '01',
    title: 'Precio justo desde el día uno',
    text: 'Valoramos tu propiedad con datos reales del mercado de tu zona. Sin inflar precios que luego no se venden.',
    variant: 'dark' as const,
  },
  {
    number: '02',
    title: 'Marketing profesional incluido',
    text: 'Fotos de calidad, publicación en más de 30 portales y gestión diaria. Máxima exposición sin esfuerzo por tu parte.',
    variant: 'tintLight' as const,
  },
  {
    number: '03',
    title: 'Compradores pre-aprobados',
    text: 'Trabajamos con compradores que ya tienen financiación aprobada. Sin operaciones que se caen en el último momento.',
    variant: 'brown' as const,
  },
  {
    number: '04',
    title: 'Tú no gestionas nada',
    text: 'Nosotros organizamos y acompañamos cada visita. Recibes un informe diario. Sólo tú decides cuándo decir sí.',
    variant: 'tintDark' as const,
  },
  {
    number: '05',
    title: 'Acompañamiento legal completo',
    text: 'Desde la firma del contrato hasta el notario. Te guiamos en cada paso para que la venta sea segura y sin sorpresas.',
    variant: 'tintDark' as const,
  },
  {
    number: '06',
    title: 'Solo cobramos si vendemos',
    text: 'Sin costes anticipados. Sin sorpresas. Nuestro éxito depende del tuyo.',
    variant: 'tintDark' as const,
  },
];

const stats = [
  { value: '60', label: 'Días media\nde venta' },
  { value: '8K', label: 'Visualizaciones\nprimeros 10 días' },
  { value: '30+', label: 'Portales\ninmobiliarios' },
  { value: '500+', label: 'Expertos\nen red' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const whyCardBackground = (variant: (typeof whyCards)[number]['variant']) => {
    switch (variant) {
      case 'dark':
        return '#2A1A10';
      case 'brown':
        return '#6B3F2A';
      case 'tintLight':
        return 'rgba(107,63,42,.07)';
      case 'tintDark':
      default:
        return 'rgba(107,63,42,.04)';
    }
  };

  const whyCardBorder = (variant: (typeof whyCards)[number]['variant']) => {
    switch (variant) {
      case 'tintLight':
        return '1px solid rgba(107,63,42,.1)';
      case 'tintDark':
        return '1px solid rgba(107,63,42,.08)';
      default:
        return undefined;
    }
  };

  const whyTitleColor = (variant: (typeof whyCards)[number]['variant']) =>
    variant === 'dark' || variant === 'brown' ? '#F5F0E8' : '#2A1A10';

  const whyTextColor = (variant: (typeof whyCards)[number]['variant']) =>
    variant === 'dark'
      ? 'rgba(245,240,232,.6)'
      : variant === 'brown'
      ? 'rgba(245,240,232,.65)'
      : '#6A4E3E';

  const whyNumberColor = (variant: (typeof whyCards)[number]['variant']) =>
    variant === 'brown' ? 'rgba(245,240,232,.2)' : '#6B3F2A';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F5F0E8; font-family: 'Lato', sans-serif; color: #2A1A10; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
        input, select, textarea { font-family: 'Lato', sans-serif; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #6B3F2A !important; }
        input::placeholder, textarea::placeholder { color: #B0998A; }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#F5F0E8',
          borderBottom: '1px solid rgba(107,63,42,.1)',
          padding: '0 clamp(24px, 6vw, 80px)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 68,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: '#6B3F2A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#F5F0E8',
                fontSize: 14,
                letterSpacing: 1,
                flexShrink: 0,
              }}
            >
              SL
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 20,
                color: '#2A1A10',
                letterSpacing: '0.3px',
              }}
            >
              Solena
            </div>
          </div>
          <a
            href="#contacto"
            style={{
              background: '#6B3F2A',
              color: '#F5F0E8',
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '12px 24px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Valoración gratuita
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              className="fade-up"
              style={{
                fontSize: 11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#6B3F2A',
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Marbella · Benahavís · Costa del Sol
            </div>
            <h1
              className="fade-up-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(40px, 5vw, 68px)',
                fontWeight: 900,
                color: '#2A1A10',
                lineHeight: 1.05,
                letterSpacing: '-1px',
                marginBottom: 24,
              }}
            >
              Vende tu casa.
              <br />
              <span style={{ color: '#6B3F2A' }}>
                Sin esperas.
                <br />
                Sin complicaciones.
              </span>
            </h1>
            <p
              className="fade-up-3"
              style={{
                fontSize: 17,
                color: '#6A4E3E',
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 36,
              }}
            >
              Somos locales, conocemos tu mercado y gestionamos todo el proceso. Tú sólo tienes que decir sí.
            </p>
            <div
              className="fade-up-3"
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a
                href="#contacto"
                style={{
                  background: '#6B3F2A',
                  color: '#F5F0E8',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '18px 36px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Quiero vender mi casa →
              </a>
              <a
                href="#proceso"
                style={{
                  color: '#6B3F2A',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '1px',
                  textDecoration: 'none',
                  borderBottom: '1px solid #6B3F2A',
                  paddingBottom: 2,
                }}
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                background: '#2A1A10',
                padding: '48px 44px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  border: '40px solid rgba(107,63,42,.2)',
                }}
              />
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: 'rgba(245,240,232,.5)',
                  marginBottom: 8,
                }}
              >
                Media con exclusiva
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 96,
                  fontWeight: 900,
                  color: '#6B3F2A',
                  lineHeight: 1,
                  letterSpacing: '-3px',
                }}
              >
                60
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#F5F0E8',
                  marginTop: 4,
                  marginBottom: 28,
                }}
              >
                días para vender.
              </div>
              <div style={{ width: 40, height: 2, background: '#6B3F2A', marginBottom: 20 }} />
              <div style={{ fontSize: 13, color: 'rgba(245,240,232,.55)', lineHeight: 1.65 }}>
                Frente a más de{' '}
                <strong style={{ color: 'rgba(245,240,232,.8)' }}>4 meses</strong> sin agencia de
                exclusividad. Cada semana cuenta.
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  right: 24,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: 'rgba(107,63,42,.4)',
                  letterSpacing: '1px',
                }}
              >
                SL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#6B3F2A', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.value + i}
              style={{
                textAlign: 'center',
                padding: '8px 20px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(245,240,232,.15)' : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: '#F5F0E8',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(245,240,232,.6)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginTop: 6,
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUÉ SOLENA */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#6B3F2A',
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Por qué elegirnos
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4vw, 50px)',
                fontWeight: 900,
                color: '#2A1A10',
                lineHeight: 1.1,
                maxWidth: 600,
              }}
            >
              Lo que ganas cuando vendes con Solena.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {whyCards.map((card) => (
              <div
                key={card.number}
                style={{
                  background: whyCardBackground(card.variant),
                  padding: '44px 36px',
                  border: whyCardBorder(card.variant),
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 48,
                    fontWeight: 900,
                    color: whyNumberColor(card.variant),
                    lineHeight: 1,
                    marginBottom: 20,
                  }}
                >
                  {card.number}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: whyTitleColor(card.variant),
                    marginBottom: 14,
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: whyTextColor(card.variant), lineHeight: 1.7 }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section
        id="proceso"
        style={{
          background: '#2A1A10',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#6B3F2A',
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              El proceso
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4vw, 50px)',
                fontWeight: 900,
                color: '#F5F0E8',
                lineHeight: 1.1,
              }}
            >
              4 pasos para vender
              <br />
              tu casa.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 28,
                left: '5%',
                right: '5%',
                height: 1,
                background: 'rgba(107,63,42,.3)',
              }}
            />
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  padding:
                    i === 0
                      ? '0 20px 0 0'
                      : i === processSteps.length - 1
                      ? '0 0 0 20px'
                      : '0 20px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: '#6B3F2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: 20,
                    color: '#F5F0E8',
                    marginBottom: 24,
                    zIndex: 1,
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#F5F0E8',
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', lineHeight: 1.7 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#6B3F2A',
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Preguntas frecuentes
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 900,
                color: '#2A1A10',
                lineHeight: 1.1,
              }}
            >
              Lo que nos preguntan
              <br />
              los propietarios.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {faqData.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question} style={{ borderTop: '1px solid rgba(107,63,42,.15)' }}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '24px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#2A1A10',
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      style={{
                        fontSize: 22,
                        color: '#6B3F2A',
                        flexShrink: 0,
                        transition: 'transform 0.3s',
                        lineHeight: 1,
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <p style={{ fontSize: 15, color: '#6A4E3E', lineHeight: 1.75, paddingBottom: 24 }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid rgba(107,63,42,.15)', borderBottom: '1px solid rgba(107,63,42,.15)' }} />
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        id="contacto"
        style={{ background: '#6B3F2A', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,.5)',
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Valoración gratuita
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 900,
                color: '#F5F0E8',
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              ¿Vendemos
              <br />
              tu casa?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(245,240,232,.65)', lineHeight: 1.7 }}>
              Cuéntanos un poco sobre tu propiedad y te contactamos en menos de 24 horas con una
              valoración sin compromiso.
            </p>
          </div>

          <form
            ref={formRef}
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                marginBottom: 2,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.5)',
                    fontWeight: 700,
                    padding: '16px 20px 0',
                    background: 'rgba(245,240,232,.08)',
                  }}
                >
                  Nombre *
                </label>
                <input
                  required
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  style={{
                    background: 'rgba(245,240,232,.08)',
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    padding: '10px 20px 18px',
                    fontSize: 15,
                    color: '#F5F0E8',
                    transition: 'border-color 0.2s',
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.5)',
                    fontWeight: 700,
                    padding: '16px 20px 0',
                    background: 'rgba(245,240,232,.08)',
                  }}
                >
                  Teléfono *
                </label>
                <input
                  required
                  name="telefono"
                  type="tel"
                  placeholder="+34 600 000 000"
                  style={{
                    background: 'rgba(245,240,232,.08)',
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    padding: '10px 20px 18px',
                    fontSize: 15,
                    color: '#F5F0E8',
                    transition: 'border-color 0.2s',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
              <label
                style={{
                  fontSize: 10,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,.5)',
                  fontWeight: 700,
                  padding: '16px 20px 0',
                  background: 'rgba(245,240,232,.08)',
                }}
              >
                Email *
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="tu@email.com"
                style={{
                  background: 'rgba(245,240,232,.08)',
                  border: 'none',
                  borderBottom: '2px solid transparent',
                  padding: '10px 20px 18px',
                  fontSize: 15,
                  color: '#F5F0E8',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                marginBottom: 2,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.5)',
                    fontWeight: 700,
                    padding: '16px 20px 0',
                    background: 'rgba(245,240,232,.08)',
                  }}
                >
                  Localización
                </label>
                <input
                  name="localizacion"
                  type="text"
                  placeholder="Marbella, Benahavís…"
                  style={{
                    background: 'rgba(245,240,232,.08)',
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    padding: '10px 20px 18px',
                    fontSize: 15,
                    color: '#F5F0E8',
                    transition: 'border-color 0.2s',
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.5)',
                    fontWeight: 700,
                    padding: '16px 20px 0',
                    background: 'rgba(245,240,232,.08)',
                  }}
                >
                  Tipo de propiedad
                </label>
                <select
                  name="tipo"
                  defaultValue=""
                  style={{
                    background: 'rgba(245,240,232,.08)',
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    padding: '10px 20px 18px',
                    fontSize: 15,
                    color: 'rgba(245,240,232,.7)',
                    transition: 'border-color 0.2s',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>
                    Selecciona…
                  </option>
                  <option value="piso">Piso / Apartamento</option>
                  <option value="villa">Villa / Chalet</option>
                  <option value="adosado">Adosado</option>
                  <option value="finca">Finca / Casa de campo</option>
                  <option value="local">Local comercial</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                marginBottom: 2,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.5)',
                    fontWeight: 700,
                    padding: '16px 20px 0',
                    background: 'rgba(245,240,232,.08)',
                  }}
                >
                  Precio estimado
                </label>
                <select
                  name="precio"
                  defaultValue=""
                  style={{
                    background: 'rgba(245,240,232,.08)',
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    padding: '10px 20px 18px',
                    fontSize: 15,
                    color: 'rgba(245,240,232,.7)',
                    transition: 'border-color 0.2s',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>
                    Selecciona…
                  </option>
                  <option value="menos-200k">Menos de 200.000 €</option>
                  <option value="200-350k">200.000 – 350.000 €</option>
                  <option value="350-600k">350.000 – 600.000 €</option>
                  <option value="600k-1m">600.000 € – 1M</option>
                  <option value="mas-1m">Más de 1.000.000 €</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.5)',
                    fontWeight: 700,
                    padding: '16px 20px 0',
                    background: 'rgba(245,240,232,.08)',
                  }}
                >
                  Plazo deseado
                </label>
                <select
                  name="plazo"
                  defaultValue=""
                  style={{
                    background: 'rgba(245,240,232,.08)',
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    padding: '10px 20px 18px',
                    fontSize: 15,
                    color: 'rgba(245,240,232,.7)',
                    transition: 'border-color 0.2s',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>
                    Selecciona…
                  </option>
                  <option value="urgente">Lo antes posible</option>
                  <option value="3meses">En 3 meses</option>
                  <option value="6meses">En 6 meses</option>
                  <option value="sin-prisa">Sin prisa, al mejor precio</option>
                </select>
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap',
              }}
            >
              {status !== 'success' && (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    background: '#F5F0E8',
                    color: '#6B3F2A',
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '20px 44px',
                    border: 'none',
                    cursor: status === 'sending' ? 'default' : 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                >
                  {status === 'sending'
                    ? 'Enviando…'
                    : status === 'error'
                    ? 'Error — inténtalo de nuevo'
                    : 'Quiero mi valoración gratuita →'}
                </button>
              )}
              <p style={{ fontSize: 12, color: 'rgba(245,240,232,.4)', lineHeight: 1.5 }}>
                Sin compromiso. Respondemos en menos de 24h.
              </p>
            </div>

            {status === 'success' && (
              <div
                style={{
                  display: 'block',
                  marginTop: 24,
                  padding: '20px 24px',
                  background: 'rgba(245,240,232,.1)',
                  borderLeft: '3px solid rgba(245,240,232,.5)',
                }}
              >
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#F5F0E8' }}>
                  ¡Gracias! Te contactamos en menos de 24 horas.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1A0E08', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: '#6B3F2A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#F5F0E8',
                fontSize: 12,
                letterSpacing: '1px',
              }}
            >
              SL
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#F5F0E8',
                }}
              >
                Solena
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(245,240,232,.35)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                Inmobiliaria · Costa del Sol
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
            <a
              href="mailto:Info@solenainmobilairia.es"
              style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', textDecoration: 'none' }}
            >
              Info@solenainmobilairia.es
            </a>
            <a
              href="tel:+34610589716"
              style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', textDecoration: 'none' }}
            >
              +34 610 589 716
            </a>
            <div style={{ fontSize: 11, color: 'rgba(245,240,232,.25)', lineHeight: 1.4 }}>
              Urb. Alzambra, Centro de Negocios Vasari, Marbella
            </div>
            <div style={{ fontSize: 11, color: 'rgba(245,240,232,.2)', marginTop: 4 }}>
              © 2025 Solena
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}