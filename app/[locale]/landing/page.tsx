'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
  // 1. BLINDAJE DE HIDRATACIÓN
  const [isMounted, setIsMounted] = useState(false);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { q: '¿Cuánto cobra Solena?', a: 'Solo cobramos si vendemos tu casa. Sin honorarios anticipados, sin costes fijos. Nuestro éxito está alineado con el tuyo.' },
    { q: '¿Cuánto tiempo tarda la venta?', a: 'Con exclusiva, la media en Costa del Sol es de 60 días. Depende del precio y la ubicación, pero los primeros 10 días son los más determinantes.' },
    { q: '¿Necesito reformar la casa antes?', a: 'No necesariamente. Te asesoramos sobre qué mejoras realmente aumentan el precio de venta y cuáles no compensan la inversión.' },
    { q: '¿Tengo que estar en las visitas?', a: 'No. Nosotros gestionamos y acompañamos cada visita. Recibirás un informe detallado después de cada una. Tú decides cuándo intervenir.' },
    { q: '¿Qué es la exclusiva y por qué importa?', a: 'La exclusiva nos permite invertir al máximo en el marketing de tu propiedad. Una casa publicada por varias agencias a la vez genera desconfianza en el comprador y suele tardar mucho más en venderse.' },
  ];

  // Si el componente no se ha montado en el cliente, no renderizamos nada para evitar colapsos.
  if (!isMounted) return null;

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh', width: '100%' }}>
      {/* INYECCIÓN SEGURA DEL CSS GLOBAL */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F5F0E8; font-family: 'Lato', sans-serif; color: #2A1A10; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
        input, select, textarea { font-family: 'Lato', sans-serif; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #6B3F2A !important; }
        input::placeholder, textarea::placeholder { color: #B0998A; }
      `}} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#F5F0E8', borderBottom: '1px solid rgba(107,63,42,.1)', padding: '0 clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#6B3F2A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#F5F0E8', fontSize: '14px', letterSpacing: '1px', flexShrink: 0 }}>SL</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '20px', color: '#2A1A10', letterSpacing: '0.3px' }}>Solena</div>
          </div>
          <a href="#contacto" style={{ background: '#6B3F2A', color: '#F5F0E8', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>Valoración gratuita</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div className="fade-up" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: '20px' }}>Marbella · Benahavís · Costa del Sol</div>
            <h1 className="fade-up-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '24px' }}>Vende tu casa.<br /><span style={{ color: '#6B3F2A' }}>Sin esperas.<br />Sin complicaciones.</span></h1>
            <p className="fade-up-3" style={{ fontSize: '17px', color: '#6A4E3E', lineHeight: 1.75, maxWidth: '440px', marginBottom: '36px' }}>Somos locales, conocemos tu mercado y gestionamos todo el proceso. Tú sólo tienes que decir sí.</p>
            <div className="fade-up-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#contacto" style={{ background: '#6B3F2A', color: '#F5F0E8', fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '18px 36px', textDecoration: 'none', display: 'inline-block' }}>Quiero vender mi casa →</a>
              <a href="#proceso" style={{ color: '#6B3F2A', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textDecoration: 'none', borderBottom: '1px solid #6B3F2A', paddingBottom: '2px' }}>Ver cómo funciona</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ background: '#2A1A10', padding: '48px 44px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', border: '40px solid rgba(107,63,42,.2)' }}></div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '15px', color: 'rgba(245,240,232,.5)', marginBottom: '8px' }}>Media con exclusiva</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '96px', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, letterSpacing: '-3px' }}>60</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F5F0E8', marginTop: '4px', marginBottom: '28px' }}>días para vender.</div>
              <div style={{ width: '40px', height: '2px', background: '#6B3F2A', marginBottom: '20px' }}></div>
              <div style={{ fontSize: '13px', color: 'rgba(245,240,232,.55)', lineHeight: 1.65 }}>Frente a más de <strong style={{ color: 'rgba(245,240,232,.8)' }}>4 meses</strong> sin agencia de exclusividad. Cada semana cuenta.</div>
              <div style={{ position: 'absolute', bottom: '24px', right: '24px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '14px', color: 'rgba(107,63,42,.4)', letterSpacing: '1px' }}>SL</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#6B3F2A', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          <div style={{ textAlign: 'center', padding: '8px 20px', borderRight: '1px solid rgba(245,240,232,.15)' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '44px', fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>60</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.4 }}>Días media<br />de venta</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px 20px', borderRight: '1px solid rgba(245,240,232,.15)' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '44px', fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>8K</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.4 }}>Visualizaciones<br />primeros 10 días</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px 20px', borderRight: '1px solid rgba(245,240,232,.15)' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '44px', fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>30+</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.4 }}>Portales<br />inmobiliarios</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px 20px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '44px', fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>500+</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.4 }}>Expertos<br />en red</div>
          </div>
        </div>
      </section>

      {/* POR QUÉ SOLENA */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: '14px' }}>Por qué elegirnos</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1, maxWidth: '600px' }}>Lo que ganas cuando vendes con Solena.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            <div style={{ background: '#2A1A10', padding: '44px 36px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, marginBottom: '20px' }}>01</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F5F0E8', marginBottom: '14px', lineHeight: 1.2 }}>Precio justo desde el día uno</h3>
              <p style={{ fontSize: '14px', color: 'rgba(245,240,232,.6)', lineHeight: 1.7 }}>Valoramos tu propiedad con datos reales del mercado de tu zona. Sin inflar precios que luego no se venden.</p>
            </div>
            <div style={{ background: 'rgba(107,63,42,.07)', padding: '44px 36px', border: '1px solid rgba(107,63,42,.1)' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, marginBottom: '20px' }}>02</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2A1A10', marginBottom: '14px', lineHeight: 1.2 }}>Marketing profesional incluido</h3>
              <p style={{ fontSize: '14px', color: '#6A4E3E', lineHeight: 1.7 }}>Fotos de calidad, publicación en más de 30 portales y gestión diaria. Máxima exposición sin esfuerzo por tu parte.</p>
            </div>
            <div style={{ background: '#6B3F2A', padding: '44px 36px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: 'rgba(245,240,232,.2)', lineHeight: 1, marginBottom: '20px' }}>03</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F5F0E8', marginBottom: '14px', lineHeight: 1.2 }}>Compradores pre-aprobados</h3>
              <p style={{ fontSize: '14px', color: 'rgba(245,240,232,.65)', lineHeight: 1.7 }}>Trabajamos con compradores que ya tienen financiación aprobada. Sin operaciones que se caen en el último momento.</p>
            </div>
            <div style={{ background: 'rgba(107,63,42,.04)', padding: '44px 36px', border: '1px solid rgba(107,63,42,.08)' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, marginBottom: '20px' }}>04</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2A1A10', marginBottom: '14px', lineHeight: 1.2 }}>Tú no gestionas nada</h3>
              <p style={{ fontSize: '14px', color: '#6A4E3E', lineHeight: 1.7 }}>Nosotros organizamos y acompañamos cada visita. Recibes un informe diario. Sólo tú decides cuándo decir sí.</p>
            </div>
            <div style={{ background: 'rgba(107,63,42,.04)', padding: '44px 36px', border: '1px solid rgba(107,63,42,.08)' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, marginBottom: '20px' }}>05</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2A1A10', marginBottom: '14px', lineHeight: 1.2 }}>Acompañamiento legal completo</h3>
              <p style={{ fontSize: '14px', color: '#6A4E3E', lineHeight: 1.7 }}>Desde la firma del contrato hasta el notario. Te guiamos en cada paso para que la venta sea segura y sin sorpresas.</p>
            </div>
            <div style={{ background: 'rgba(107,63,42,.04)', padding: '44px 36px', border: '1px solid rgba(107,63,42,.08)' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, marginBottom: '20px' }}>06</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2A1A10', marginBottom: '14px', lineHeight: 1.2 }}>Solo cobramos si vendemos</h3>
              <p style={{ fontSize: '14px', color: '#6A4E3E', lineHeight: 1.7 }}>Sin costes anticipados. Sin sorpresas. Nuestro éxito depende del tuyo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" style={{ background: '#2A1A10', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: '14px' }}>El proceso</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.1 }}>4 pasos para vender<br />tu casa.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '28px', left: '5%', right: '5%', height: '1px', background: 'rgba(107,63,42,.3)' }}></div>
            <div style={{ padding: '0 20px 0 0', position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', background: '#6B3F2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', color: '#F5F0E8', marginBottom: '24px', position: 'relative', zIndex: 1 }}>1</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#F5F0E8', marginBottom: '12px' }}>Valoración gratuita</h3>
              <p style={{ fontSize: '13px', color: 'rgba(245,240,232,.5)', lineHeight: 1.7 }}>Analizamos tu propiedad y te damos un precio basado en el mercado real de tu zona.</p>
            </div>
            <div style={{ padding: '0 20px', position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', background: '#6B3F2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', color: '#F5F0E8', marginBottom: '24px', position: 'relative', zIndex: 1 }}>2</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#F5F0E8', marginBottom: '12px' }}>Publicación en 30+ portales</h3>
              <p style={{ fontSize: '13px', color: 'rgba(245,240,232,.5)', lineHeight: 1.7 }}>Fotos profesionales y máxima visibilidad desde el primer día. 8.000 visualizaciones en los primeros 10 días.</p>
            </div>
            <div style={{ padding: '0 20px', position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', background: '#6B3F2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', color: '#F5F0E8', marginBottom: '24px', position: 'relative', zIndex: 1 }}>3</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#F5F0E8', marginBottom: '12px' }}>Visitas gestionadas</h3>
              <p style={{ fontSize: '13px', color: 'rgba(245,240,232,.5)', lineHeight: 1.7 }}>Filtramos compradores serios con financiación aprobada. Tú no tienes que estar presente.</p>
            </div>
            <div style={{ padding: '0 0 0 20px', position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', background: '#6B3F2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', color: '#F5F0E8', marginBottom: '24px', position: 'relative', zIndex: 1 }}>4</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#F5F0E8', marginBottom: '12px' }}>Cierre y firma</h3>
              <p style={{ fontSize: '13px', color: 'rgba(245,240,232,.5)', lineHeight: 1.7 }}>Acompañamiento legal hasta el notario. Cobras y listo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ marginBottom: '52px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: '14px' }}>Preguntas frecuentes</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1 }}>Lo que nos preguntan<br />los propietarios.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderTop: '1px solid rgba(107,63,42,.15)' }}>
                <button 
                  onClick={() => toggleFaq(index)} 
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#2A1A10' }}>{faq.q}</span>
                  <span style={{ fontSize: '22px', color: '#6B3F2A', flexShrink: 0, transition: 'transform 0.3s', lineHeight: 1, transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === index ? '500px' : '0px', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                  <p style={{ fontSize: '15px', color: '#6A4E3E', lineHeight: 1.75, paddingBottom: '24px' }}>{faq.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(107,63,42,.15)', borderBottom: '1px solid rgba(107,63,42,.15)' }}></div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="contacto" style={{ background: '#6B3F2A', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ marginBottom: '52px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, marginBottom: '14px' }}>Valoración gratuita</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.05, marginBottom: '16px' }}>¿Vendemos<br />tu casa?</h2>
            <p style={{ fontSize: '16px', color: 'rgba(245,240,232,.65)', lineHeight: 1.7 }}>Cuéntanos un poco sobre tu propiedad y te contactamos en menos de 24 horas con una valoración sin compromiso.</p>
          </div>
          
          <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: 0 }} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Nombre *</label>
                <input required name="nombre" type="text" placeholder="Tu nombre completo" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: '#F5F0E8', transition: 'border-color 0.2s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Teléfono *</label>
                <input required name="telefono" type="tel" placeholder="+34 600 000 000" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: '#F5F0E8', transition: 'border-color 0.2s' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '2px' }}>
              <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Email *</label>
              <input required name="email" type="email" placeholder="tu@email.com" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: '#F5F0E8', transition: 'border-color 0.2s' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Localización</label>
                <input name="localizacion" type="text" placeholder="Marbella, Benahavís…" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: '#F5F0E8', transition: 'border-color 0.2s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Tipo de propiedad</label>
                <select name="tipo" defaultValue="" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: 'rgba(245,240,232,.7)', transition: 'border-color 0.2s', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>Selecciona…</option>
                  <option value="piso">Piso / Apartamento</option>
                  <option value="villa">Villa / Chalet</option>
                  <option value="adosado">Adosado</option>
                  <option value="finca">Finca / Casa de campo</option>
                  <option value="local">Local comercial</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Precio estimado</label>
                <select name="precio" defaultValue="" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: 'rgba(245,240,232,.7)', transition: 'border-color 0.2s', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>Selecciona…</option>
                  <option value="menos-200k">Menos de 200.000 €</option>
                  <option value="200-350k">200.000 – 350.000 €</option>
                  <option value="350-600k">350.000 – 600.000 €</option>
                  <option value="600k-1m">600.000 € – 1M</option>
                  <option value="mas-1m">Más de 1.000.000 €</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, padding: '16px 20px 0', background: 'rgba(245,240,232,.08)' }}>Plazo deseado</label>
                <select name="plazo" defaultValue="" style={{ background: 'rgba(245,240,232,.08)', border: 'none', borderBottom: '2px solid transparent', padding: '10px 20px 18px', fontSize: '15px', color: 'rgba(245,240,232,.7)', transition: 'border-color 0.2s', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>Selecciona…</option>
                  <option value="urgente">Lo antes posible</option>
                  <option value="3meses">En 3 meses</option>
                  <option value="6meses">En 6 meses</option>
                  <option value="sin-prisa">Sin prisa, al mejor precio</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {submitStatus !== 'success' && (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ background: '#F5F0E8', color: submitStatus === 'error' ? 'red' : '#6B3F2A', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '20px 44px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s, color 0.2s', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Enviando...' : submitStatus === 'error' ? 'Error — reintentar' : 'Quiero mi valoración gratuita →'}
                </button>
              )}
              <p style={{ fontSize: '12px', color: 'rgba(245,240,232,.4)', lineHeight: 1.5 }}>Sin compromiso. Respondemos en menos de 24h.</p>
            </div>
            
            {submitStatus === 'success' && (
              <div style={{ marginTop: '24px', padding: '20px 24px', background: 'rgba(245,240,232,.1)', borderLeft: '3px solid rgba(245,240,232,.5)' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#F5F0E8' }}>¡Gracias! Te contactamos en menos de 24 horas.</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1A0E08', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: '#6B3F2A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#F5F0E8', fontSize: '12px', letterSpacing: '1px' }}>SL</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '16px', color: '#F5F0E8' }}>Solena</div>
              <div style={{ fontSize: '10px', color: 'rgba(245,240,232,.35)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>Inmobiliaria · Costa del Sol</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'right' }}>
            <a href="mailto:Info@solenainmobilairia.es" style={{ fontSize: '13px', color: 'rgba(245,240,232,.5)', textDecoration: 'none' }}>Info@solenainmobilairia.es</a>
            <a href="tel:+34610589716" style={{ fontSize: '13px', color: 'rgba(245,240,232,.5)', textDecoration: 'none' }}>+34 610 589 716</a>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,.25)', lineHeight: 1.4 }}>Urb. Alzambra, Centro de Negocios Vasari, Marbella</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,.2)', marginTop: '4px' }}>© 2026 Solena</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
// Inyección de seguridad Vercel
