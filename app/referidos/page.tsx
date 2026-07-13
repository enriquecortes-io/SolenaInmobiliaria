'use client';

import { useState, useRef, useEffect, useMemo, FormEvent } from 'react';

export default function ReferidosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [propertyValue, setPropertyValue] = useState(400000);
  const formRef = useRef<HTMLFormElement>(null);

  const earnings = useMemo(() => Math.round(propertyValue * 0.03 * 0.2), [propertyValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.why-label',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.why-label', start: 'top 85%', once: true } }
        );
        gsap.fromTo('.why-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
            scrollTrigger: { trigger: '.why-title', start: 'top 85%', once: true } }
        );
        gsap.fromTo('.why-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
            scrollTrigger: { trigger: '.why-card', start: 'top 80%', once: true } }
        );
        gsap.fromTo('.process-label',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.process-label', start: 'top 85%', once: true } }
        );
        gsap.fromTo('.process-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
            scrollTrigger: { trigger: '.process-title', start: 'top 85%', once: true } }
        );
        document.querySelectorAll('.process-step').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.6,
              scrollTrigger: { trigger: '.process-step', start: 'top 75%', once: true } }
          );
        });

        const counter = document.querySelector('.stat-counter');
        if (counter) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 10000,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => { counter.textContent = Math.round(obj.val).toLocaleString('es-ES'); },
            scrollTrigger: { trigger: counter, start: 'top 80%', once: true },
          });
        }
        gsap.fromTo('.stat-box-content',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2,
            scrollTrigger: { trigger: '.stat-counter', start: 'top 80%', once: true } }
        );
      });
    });
  }, []);

  const toggleFaq = (index: number) => setOpenFaq(prev => (prev === index ? null : index));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('/api/referrals/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { form.reset(); setStatus('success'); }
      else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(245,240,232,.08)', border: 'none',
    borderBottom: '2px solid transparent', padding: '10px 20px 18px',
    fontSize: 15, color: '#F5F0E8', transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase',
    color: 'rgba(245,240,232,.5)', fontWeight: 700,
    padding: '16px 20px 0', background: 'rgba(245,240,232,.08)',
  };

  const whyCards = [
    { number: '01', title: 'Presenta el contacto', text: 'Comparte el contacto de un propietario que quiera vender su casa en la Costa del Sol. Solo necesitamos su nombre, teléfono y la dirección aproximada de la propiedad.', variant: 'dark' },
    { number: '02', title: 'Solena gestiona todo', text: 'Nuestro equipo se encarga de la valoración, el marketing, las visitas y la negociación. Tú no tienes que hacer nada más que presentar el contacto inicial.', variant: 'brown' },
    { number: '03', title: 'Vendemos la propiedad', text: 'Con más de 100 agencias colaboradoras y presencia en 30+ portales, movemos la propiedad rápido. La media de venta con exclusiva es de 60 días.', variant: 'tintLight' },
    { number: '04', title: 'Tú cobras tu comisión', text: 'En cuanto se firma la venta, recibes el 20% de la comisión que cobra Solena. Sin límite de referidos, sin necesidad de licencia inmobiliaria.', variant: 'tintDark' },
  ];

  const whyCardBackground = (variant: string) => {
    switch (variant) {
      case 'dark': return '#2A1A10';
      case 'brown': return '#6B3F2A';
      case 'tintLight': return 'rgba(107,63,42,.07)';
      default: return 'rgba(107,63,42,.04)';
    }
  };
  const whyCardBorder = (variant: string) => {
    if (variant === 'tintLight') return '1px solid rgba(107,63,42,.1)';
    if (variant === 'tintDark') return '1px solid rgba(107,63,42,.08)';
    return undefined;
  };
  const whyTitleColor = (variant: string) => (variant === 'dark' || variant === 'brown') ? '#F5F0E8' : '#2A1A10';
  const whyTextColor = (variant: string) => variant === 'dark' ? 'rgba(245,240,232,.6)' : variant === 'brown' ? 'rgba(245,240,232,.65)' : '#6A4E3E';
  const whyNumberColor = (variant: string) => variant === 'brown' ? 'rgba(245,240,232,.2)' : '#6B3F2A';

  const faqs = [
    { question: '¿Necesito licencia inmobiliaria para referir?', answer: 'No. Cualquier persona puede participar en el programa de referidos sin necesidad de licencia ni experiencia previa en el sector inmobiliario.' },
    { question: '¿Cuánto puedo ganar por cada referido?', answer: 'Recibes el 20% de la comisión que cobra Solena por la venta. Dependiendo del valor de la propiedad, esto puede oscilar entre 1.000€ y 10.000€ o más.' },
    { question: '¿Cuándo recibo el pago?', answer: 'El pago se realiza en cuanto se firma la venta ante notario y Solena recibe su comisión. Normalmente en un plazo de 24-48 horas tras la firma.' },
    { question: '¿Puedo referir tantas propiedades como quiera?', answer: 'Sí, no hay límite. Cuantos más propietarios refieras, más comisiones puedes acumular. Muchos de nuestros embajadores refieren varias propiedades al año.' },
    { question: '¿Qué pasa si el propietario ya habló con otra agencia?', answer: 'Aun así puedes referirlo. Nosotros gestionamos la propuesta de valor de Solena directamente con el propietario, sin ningún compromiso previo.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F5F0E8; font-family: 'Inter', sans-serif; color: #2A1A10; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
        input, select, textarea { font-family: 'Inter', sans-serif; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #6B3F2A !important; }
        input::placeholder, textarea::placeholder { color: #B0998A; }
        input[type=range] { -webkit-appearance: none; height: 6px; border-radius: 3px; background: rgba(107,63,42,.15); outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #6B3F2A; cursor: pointer; border: 3px solid #F5F0E8; box-shadow: 0 2px 6px rgba(0,0,0,.2); }
        input[type=range]::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #6B3F2A; cursor: pointer; border: 3px solid #F5F0E8; box-shadow: 0 2px 6px rgba(0,0,0,.2); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#1A0E08', borderBottom: '1px solid rgba(107,63,42,.3)', padding: '0 clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <span style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", fontWeight: 300, fontSize: 'clamp(0.34rem,0.6vw,0.42rem)', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.45em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Inmobiliaria</span>
            <span style={{ fontFamily: "'Cormorant Garamond','Didot','Bodoni MT',Georgia,serif", fontWeight: 700, fontSize: 'clamp(1.4rem,3vw,2rem)', background: 'linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #B8976E 70%, #C9A96E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.08em', lineHeight: 1, whiteSpace: 'nowrap' }}>SOLENA</span>
            <span style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", fontWeight: 300, fontSize: 'clamp(0.34rem,0.6vw,0.42rem)', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.45em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Costa del Sol</span>
          </div>
          <a href="#form" style={{ background: '#6B3F2A', color: '#F5F0E8', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
            Empezar a referir
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="fade-up" style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 20 }}>
            Programa de Referidos · Costa del Sol
          </div>
          <h1 className="fade-up-2" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.05, letterSpacing: '-1px', marginBottom: 24 }}>
            Tus contactos valen.<br />
            <span style={{ color: '#6B3F2A' }}>Hasta 10.000€<br />por referido.</span>
          </h1>
          <p className="fade-up-3" style={{ fontSize: 17, color: '#6A4E3E', lineHeight: 1.75, maxWidth: 500, marginBottom: 36 }}>
            Refiere un propietario que quiera vender y gana el 20% de nuestra comisión. Sin licencia inmobiliaria, sin límite de referidos.
          </p>
          <div className="fade-up-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#form" style={{ background: '#6B3F2A', color: '#F5F0E8', fontWeight: 700, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '18px 36px', textDecoration: 'none', display: 'inline-block' }}>
              Empezar a referir →
            </a>
            <a href="#proceso" style={{ color: '#6B3F2A', fontWeight: 700, fontSize: 13, letterSpacing: '1px', textDecoration: 'none', borderBottom: '1px solid #6B3F2A', paddingBottom: 2 }}>
              Ver cómo funciona
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#6B3F2A', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 0 }}>
          {[
            { value: '20%', label: 'De la\ncomisión' },
            { value: '0€', label: 'Licencia\nrequerida' },
            { value: '60', label: 'Días media\nde venta' },
            { value: '∞', label: 'Referidos\nsin límite' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 20px', borderRight: i < 3 ? '1px solid rgba(245,240,232,.15)' : undefined }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 44, fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(245,240,232,.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 6, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="proceso" style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div className='why-label' style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>Cómo funciona</div>
            <h2 className='why-title' style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1, maxWidth: 600 }}>
              4 pasos para empezar a ganar.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 2 }}>
            {whyCards.map((card, i) => (
              <div key={i} className='why-card' style={{ background: whyCardBackground(card.variant), padding: '44px 36px', border: whyCardBorder(card.variant) }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 48, fontWeight: 900, color: whyNumberColor(card.variant), lineHeight: 1, marginBottom: 20 }}>{card.number}</div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, color: whyTitleColor(card.variant), marginBottom: 14, lineHeight: 1.2 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: whyTextColor(card.variant), lineHeight: 1.7 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section style={{ background: '#2A1A10', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div className='process-label' style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>Calculadora</div>
            <h2 className='process-title' style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.1 }}>
              ¿Cuánto podrías<br />ganar?
            </h2>
          </div>
          <div className='process-step' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, display: 'block', marginBottom: 16 }}>
                Valor estimado de la propiedad
              </label>
              <input
                type="range"
                min="100000"
                max="3000000"
                step="25000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(parseInt(e.target.value))}
                style={{ width: '100%', marginBottom: 14 }}
              />
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 32, fontWeight: 900, color: '#F5F0E8' }}>
                {propertyValue.toLocaleString('es-ES')} €
              </div>
            </div>
            <div style={{ background: '#6B3F2A', padding: '36px 32px' }}>
              <p style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.6)', fontWeight: 700, marginBottom: 8 }}>Tu ganancia estimada</p>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>
                {earnings.toLocaleString('es-ES')} €
              </div>
              <p style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', marginTop: 10 }}>20% de la comisión sobre una venta al 3%</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 10.000€ */}
      <section style={{ background: '#F5F0E8', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div className='stat-box-content' style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: 15, color: 'rgba(42,26,16,.5)', marginBottom: 8 }}>Hasta</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(60px, 12vw, 100px)', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, letterSpacing: '-3px' }}>
            <span className='stat-counter'>0</span>€
          </div>
          <div className='stat-box-content' style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#2A1A10', marginTop: 8, marginBottom: 28 }}>
            por un solo referido.
          </div>
          <div style={{ width: 40, height: 2, background: '#6B3F2A', margin: '0 auto 20px' }} />
          <div className='stat-box-content' style={{ fontSize: 15, color: '#6A4E3E', lineHeight: 1.75 }}>
            En propiedades de alto valor en <strong style={{ color: '#2A1A10' }}>Marbella y Benahavís</strong>, tu comisión del 20% puede superar los 10.000€ por una sola venta.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>Preguntas frecuentes</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1 }}>
              Lo que nos preguntan<br />los embajadores.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} style={{ borderTop: '1px solid rgba(107,63,42,.15)' }}>
                  <button type="button" onClick={() => toggleFaq(index)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                    <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, fontWeight: 600, color: '#2A1A10' }}>{item.question}</span>
                    <span style={{ fontSize: 22, color: '#6B3F2A', flexShrink: 0, transition: 'transform 0.3s', lineHeight: 1, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                  </button>
                  <div style={{ maxHeight: isOpen ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                    <p style={{ fontSize: 15, color: '#6A4E3E', lineHeight: 1.75, paddingBottom: 24 }}>{item.answer}</p>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid rgba(107,63,42,.15)', borderBottom: '1px solid rgba(107,63,42,.15)' }} />
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="form" style={{ background: '#6B3F2A', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, marginBottom: 14 }}>Registra tu referido</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.05, marginBottom: 16 }}>
              ¿Conoces a alguien<br />que quiera vender?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(245,240,232,.65)', lineHeight: 1.7 }}>
              Cuéntanos sobre el propietario y su propiedad. Nos pondremos en contacto en menos de 24 horas.
            </p>
          </div>
          <form ref={formRef} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: 0 }} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 2, marginBottom: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Nombre del propietario *</label>
                <input required name="ownerName" type="text" placeholder="Nombre completo" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Teléfono del propietario *</label>
                <input required name="ownerPhone" type="tel" placeholder="+34 600 000 000" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
              <label style={labelStyle}>Email del propietario</label>
              <input name="ownerEmail" type="email" placeholder="propietario@email.com" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 2, marginBottom: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Dirección de la propiedad *</label>
                <input required name="propertyAddress" type="text" placeholder="Calle, número" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Localización</label>
                <select name="propertyCity" defaultValue="" style={{ ...inputStyle, color: 'rgba(245,240,232,.7)', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>Selecciona…</option>
                  <option value="Marbella">Marbella</option>
                  <option value="Benahavís">Benahavís</option>
                  <option value="Estepona">Estepona</option>
                  <option value="Fuengirola">Fuengirola</option>
                  <option value="Mijas">Mijas</option>
                  <option value="Benalmádena">Benalmádena</option>
                  <option value="Málaga">Málaga</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 2, marginBottom: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Tu nombre *</label>
                <input required name="referrerName" type="text" placeholder="Tu nombre completo" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Tu email *</label>
                <input required name="referrerEmail" type="email" placeholder="tu@email.com" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {status !== 'success' && (
                <button type="submit" disabled={status === 'sending'} style={{ background: '#F5F0E8', color: '#6B3F2A', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', padding: '20px 44px', border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? 'Enviando…' : status === 'error' ? 'Error — inténtalo de nuevo' : 'Registrar referido →'}
                </button>
              )}
              <p style={{ fontSize: 12, color: 'rgba(245,240,232,.4)', lineHeight: 1.5 }}>Sin compromiso. Respondemos en menos de 24h.</p>
            </div>
            {status === 'success' && (
              <div style={{ display: 'block', marginTop: 24, padding: '20px 24px', background: 'rgba(245,240,232,.1)', borderLeft: '3px solid rgba(245,240,232,.5)' }}>
                <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: '#F5F0E8' }}>¡Gracias! Te contactamos en menos de 24 horas.</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1A0E08', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <span style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", fontWeight: 300, fontSize: 'clamp(0.34rem,0.6vw,0.42rem)', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.45em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Inmobiliaria</span>
            <span style={{ fontFamily: "'Cormorant Garamond','Didot','Bodoni MT',Georgia,serif", fontWeight: 700, fontSize: 'clamp(1.4rem,3vw,2rem)', background: 'linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #B8976E 70%, #C9A96E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.08em', lineHeight: 1, whiteSpace: 'nowrap' }}>SOLENA</span>
            <span style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", fontWeight: 300, fontSize: 'clamp(0.34rem,0.6vw,0.42rem)', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.45em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Costa del Sol</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
            <a href="mailto:Info@solenainmobiliaria.es" style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', textDecoration: 'none' }}>Info@solenainmobiliaria.es</a>
            <a href="tel:+34610589716" style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', textDecoration: 'none' }}>+34 610 589 716</a>
            <div style={{ fontSize: 11, color: 'rgba(245,240,232,.25)', lineHeight: 1.4 }}>Urb. La Alzambra, Centro de Negocios Vasari, Marbella, España</div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 8 }}>
              <a href="/es/legal" style={{ fontSize: 11, color: 'rgba(245,240,232,.3)', textDecoration: 'none' }}>Aviso Legal</a>
              <a href="/es/privacidad" style={{ fontSize: 11, color: 'rgba(245,240,232,.3)', textDecoration: 'none' }}>Política de Privacidad</a>
              <a href="/es/cookies" style={{ fontSize: 11, color: 'rgba(245,240,232,.3)', textDecoration: 'none' }}>Política de Cookies</a>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(245,240,232,.2)', marginTop: 4 }}>© 2025 Solena</div>
          </div>
        </div>
      </footer>
    </>
  );
}
