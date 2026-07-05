'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

const T = {
  es: {
    nav_cta: 'Valoración gratuita',
    hero_location: 'Marbella · Benahavís · Costa del Sol',
    hero_h1_1: 'Vende tu casa.',
    hero_h1_2: 'Sin esperas.',
    hero_h1_3: 'Sin complicaciones.',
    hero_p: 'Somos locales, conocemos tu mercado y gestionamos todo el proceso. Tú sólo tienes que decir sí.',
    hero_cta: 'Quiero vender mi casa →',
    hero_link: 'Ver cómo funciona',
    stats: [
      { value: '60', label: 'Días media\nde venta' },
      { value: '8K', label: 'Visualizaciones\nprimeros 10 días' },
      { value: '30+', label: 'Portales\ninmobiliarios' },
      { value: '500+', label: 'Expertos\nen red' },
    ],
    why_label: 'Por qué elegirnos',
    why_h2: 'Lo que ganas cuando vendes con Solena.',
    why_cards: [
      { number: '01', title: 'Red de colaboración', text: 'Tu propiedad en venta, en colaboración con más de 100 agencias en toda la Costa del Sol; Marbella, Benahavís, Estepona, Fuengirola, Mijas, Benalmádena, Málaga, Torremolinos, Manilva, Sotogrande y las urbanizaciones intermedias. Toda la red trabaja para encontrar al comprador adecuado. Más agencias buscando. Más compradores llegando. Menos tiempo esperando.' },
      { number: '02', title: 'Financiación', text: 'Colaboramos con Bayteca, especialistas en financiación hipotecaria para clientes nacionales e internacionales en la Costa del Sol. Los compradores que visitan tu propiedad ya tienen la hipoteca aprobada. Eso reduce negociaciones largas y operaciones que caen en el último momento.' },
      { number: '03', title: 'Marketing y tecnología', text: 'Publicamos en los principales portales nacionales e internacionales y gestionamos campañas en Google Ads y Meta dirigidas a compradores en la Costa del Sol. El 30% de nuestra cartera son clientes internacionales. Nuestros sistemas de precalificación seleccionan visitantes con perfil real de compra.' },
      { number: '04', title: 'Expertos en el sector', text: 'Cuando trabajas con Solena, trabajas con un equipo: comerciales especializados en venta residencial, especialistas en marketing digital inmobiliario, expertos en fotografía de propiedad, gestores de financiación y una red de colaboradores en toda la Costa del Sol. Cada pieza tiene un papel. El resultado es tuyo.' },
    ],
    process_label: 'El proceso',
    process_h2_1: '4 pasos para vender',
    process_h2_2: 'tu casa.',
    process_steps: [
      { number: '1', title: 'Valoración gratuita', text: 'Analizamos tu propiedad y te damos un precio basado en el mercado real de tu zona.' },
      { number: '2', title: 'Publicación en 30+ portales', text: 'Fotos profesionales y máxima visibilidad desde el primer día. 8.000 visualizaciones en los primeros 10 días.' },
      { number: '3', title: 'Visitas gestionadas', text: 'Filtramos compradores serios con financiación aprobada. Tú no tienes que estar presente.' },
      { number: '4', title: 'Cierre y firma', text: 'Acompañamiento legal hasta el notario. Cobras y listo.' },
    ],
    compare_label: 'Nuestros servicios',
    compare_h2: 'Elige el servicio que mejor se adapta a ti.',
    compare_std_badge: 'Servicio estándar',
    compare_std_title1: 'Venta',
    compare_std_title2: 'sin exclusiva',
    compare_std_services_label: 'Servicios incluidos',
    compare_std_services: [
      'Valoración de la propiedad',
      'Nota simple',
      'Inversiones estratégicas en marketing',
      'Listados internacionales y nacionales',
      'Apoyo legal y administrativo',
      'Fotografía profesional',
      'Vídeo de alta calidad',
    ],
    compare_std_time_label: 'Tiempo medio de venta',
    compare_std_time: 'Hasta 4 meses',
    compare_exc_badge: 'Recomendado',
    compare_exc_service_badge: 'Servicio premium',
    compare_exc_title1: 'Exclusividad',
    compare_exc_title2: 'con Solena',
    compare_exc_services_label: 'Todo lo del estándar, más:',
    compare_exc_services: [
      'Tour en 3D de Matterport',
      'Planos detallados',
      'Certificación de eficiencia energética',
      'Seguimiento y trazabilidad del mercado',
      'Compradores potenciales cualificados',
    ],
    compare_exc_time_label: 'Tiempo medio de venta',
    compare_exc_time: '60 días',
    compare_footer: 'Solo cobramos si vendemos tu casa. Sin costes anticipados.',
    stat_box_label: 'Media con exclusiva',
    stat_box_days: '60',
    stat_box_sub: 'días para vender.',
    stat_box_text1: 'Frente a más de',
    stat_box_bold: '4 meses',
    stat_box_text2: 'sin agencia de exclusividad. Cada semana cuenta.',
    faq_label: 'Preguntas frecuentes',
    faq_h2_1: 'Lo que nos preguntan',
    faq_h2_2: 'los propietarios.',
    faqs: [
      { question: '¿Cuánto cobra Solena?', answer: 'Solo cobramos si vendemos tu casa. Sin honorarios anticipados, sin costes fijos. Nuestro éxito está alineado con el tuyo.' },
      { question: '¿Cuánto tiempo tarda la venta?', answer: 'Con exclusiva, la media en Costa del Sol es de 60 días. Depende del precio y la ubicación, pero los primeros 10 días son los más determinantes.' },
      { question: '¿Necesito reformar la casa antes?', answer: 'No necesariamente. Te asesoramos sobre qué mejoras realmente aumentan el precio de venta y cuáles no compensan la inversión.' },
      { question: '¿Tengo que estar en las visitas?', answer: 'No. Nosotros gestionamos y acompañamos cada visita. Recibirás un informe detallado después de cada una. Tú decides cuándo intervenir.' },
      { question: '¿Qué es la exclusiva y por qué importa?', answer: 'La exclusiva nos permite invertir al máximo en el marketing de tu propiedad. Una casa publicada por varias agencias a la vez genera desconfianza en el comprador y suele tardar mucho más en venderse.' },
    ],
    form_label: 'Valoración gratuita',
    form_h2_1: '¿Vendemos',
    form_h2_2: 'tu casa?',
    form_p: 'Cuéntanos un poco sobre tu propiedad y te contactamos en menos de 24 horas con una valoración sin compromiso.',
    form_nombre: 'Nombre *', form_nombre_ph: 'Tu nombre completo',
    form_telefono: 'Teléfono *', form_telefono_ph: '+34 600 000 000',
    form_email: 'Email *',
    form_localizacion: 'Localización', form_localizacion_ph: 'Marbella, Benahavís…',
    form_tipo: 'Tipo de propiedad', form_tipo_ph: 'Selecciona…',
    form_tipos: [
      { value: 'piso', label: 'Piso / Apartamento' },
      { value: 'villa', label: 'Villa / Chalet' },
      { value: 'adosado', label: 'Adosado' },
      { value: 'finca', label: 'Finca / Casa de campo' },
      { value: 'local', label: 'Local comercial' },
      { value: 'otro', label: 'Otro' },
    ],
    form_precio: 'Precio estimado', form_precio_ph: 'Selecciona…',
    form_precios: [
      { value: 'menos-200k', label: 'Menos de 200.000 €' },
      { value: '200-350k', label: '200.000 – 350.000 €' },
      { value: '350-600k', label: '350.000 – 600.000 €' },
      { value: '600k-1m', label: '600.000 € – 1M' },
      { value: 'mas-1m', label: 'Más de 1.000.000 €' },
    ],
    form_plazo: 'Plazo deseado', form_plazo_ph: 'Selecciona…',
    form_plazos: [
      { value: 'urgente', label: 'Lo antes posible' },
      { value: '3meses', label: 'En 3 meses' },
      { value: '6meses', label: 'En 6 meses' },
      { value: 'sin-prisa', label: 'Sin prisa, al mejor precio' },
    ],
    form_btn_sending: 'Enviando…',
    form_btn_error: 'Error — inténtalo de nuevo',
    form_btn: 'Quiero mi valoración gratuita →',
    form_disclaimer: 'Sin compromiso. Respondemos en menos de 24h.',
    form_success: '¡Gracias! Te contactamos en menos de 24 horas.',
    footer_legal: 'Aviso Legal',
    footer_privacy: 'Política de Privacidad',
    footer_cookies: 'Política de Cookies',
  },
  en: {
    nav_cta: 'Free Valuation',
    hero_location: 'Marbella · Benahavís · Costa del Sol',
    hero_h1_1: 'Sell your home.',
    hero_h1_2: 'No waiting.',
    hero_h1_3: 'No complications.',
    hero_p: 'We are locals, we know your market and manage the entire process. You just have to say yes.',
    hero_cta: 'I want to sell my home →',
    hero_link: 'See how it works',
    stats: [
      { value: '60', label: 'Average\ndays to sell' },
      { value: '8K', label: 'Views in\nfirst 10 days' },
      { value: '30+', label: 'Real estate\nportals' },
      { value: '500+', label: 'Experts\nin network' },
    ],
    why_label: 'Why choose us',
    why_h2: 'What you gain when you sell with Solena.',
    why_cards: [
      { number: '01', title: 'Collaboration network', text: 'Your property listed with over 100 partner agencies across the Costa del Sol — Marbella, Benahavís, Estepona, Fuengirola and surrounding urbanizations. The entire network works to find the right buyer. More agencies searching. More buyers arriving. Less time waiting.' },
      { number: '02', title: 'Financing', text: 'We work with Bayteca, specialists in mortgage financing for national and international clients on the Costa del Sol. Buyers who visit your property already have their mortgage approved. That reduces long negotiations and deals falling through at the last minute.' },
      { number: '03', title: 'Marketing & technology', text: 'We list on the main portals (Idealista, Fotocasa, Inmuebles24) and run Google Ads and Meta campaigns targeting buyers on the Costa del Sol. 30% of our portfolio are international clients. Our pre-qualification systems select visitors with a genuine buying profile.' },
      { number: '04', title: 'Sector experts', text: 'When you work with Solena, you work with a team: residential sales specialists, digital real estate marketing experts, property photography specialists, financing managers and a network of collaborators across the Costa del Sol. Every piece has a role. The result is yours.' },
    ],
    process_label: 'The process',
    process_h2_1: '4 steps to sell',
    process_h2_2: 'your home.',
    process_steps: [
      { number: '1', title: 'Free valuation', text: 'We analyze your property and give you a price based on the real market in your area.' },
      { number: '2', title: 'Listed on 30+ portals', text: 'Professional photos and maximum visibility from day one. 8,000 views in the first 10 days.' },
      { number: '3', title: 'Managed viewings', text: 'We filter serious buyers with approved financing. You don\'t need to be present.' },
      { number: '4', title: 'Closing & signing', text: 'Legal support up to the notary. You get paid and that\'s it.' },
    ],
    compare_label: 'Our services',
    compare_h2: 'Choose the service that suits you best.',
    compare_std_badge: 'Standard service',
    compare_std_title1: 'Sale',
    compare_std_title2: 'without exclusivity',
    compare_std_services_label: 'Services included',
    compare_std_services: [
      'Property valuation',
      'Simple note',
      'Strategic marketing investments',
      'International and national listings',
      'Legal and administrative support',
      'Professional photography',
      'High quality video',
    ],
    compare_std_time_label: 'Average selling time',
    compare_std_time: 'Up to 4 months',
    compare_exc_badge: 'Recommended',
    compare_exc_service_badge: 'Premium service',
    compare_exc_title1: 'Exclusivity',
    compare_exc_title2: 'with Solena',
    compare_exc_services_label: 'Everything in standard, plus:',
    compare_exc_services: [
      'Matterport 3D tour',
      'Detailed floor plans',
      'Energy efficiency certification',
      'Market performance tracking',
      'Qualified potential buyers',
    ],
    compare_exc_time_label: 'Average selling time',
    compare_exc_time: '60 days',
    compare_footer: 'We only charge if we sell your home. No upfront costs.',
    stat_box_label: 'Average with exclusivity',
    stat_box_days: '60',
    stat_box_sub: 'days to sell.',
    stat_box_text1: 'Compared to more than',
    stat_box_bold: '4 months',
    stat_box_text2: 'without an exclusivity agency. Every week counts.',
    faq_label: 'Frequently asked questions',
    faq_h2_1: 'What property owners',
    faq_h2_2: 'ask us.',
    faqs: [
      { question: 'How much does Solena charge?', answer: 'We only charge if we sell your home. No upfront fees, no fixed costs. Our success is aligned with yours.' },
      { question: 'How long does the sale take?', answer: 'With exclusivity, the average on the Costa del Sol is 60 days. It depends on price and location, but the first 10 days are the most decisive.' },
      { question: 'Do I need to renovate before selling?', answer: 'Not necessarily. We advise you on which improvements really increase the sale price and which are not worth the investment.' },
      { question: 'Do I need to be present at viewings?', answer: 'No. We manage and accompany every visit. You will receive a detailed report after each one. You decide when to get involved.' },
      { question: 'What is exclusivity and why does it matter?', answer: 'Exclusivity allows us to invest fully in marketing your property. A home listed by multiple agencies at once creates distrust in buyers and typically takes much longer to sell.' },
    ],
    form_label: 'Free valuation',
    form_h2_1: 'Shall we sell',
    form_h2_2: 'your home?',
    form_p: 'Tell us a little about your property and we will contact you within 24 hours with a no-obligation valuation.',
    form_nombre: 'Name *', form_nombre_ph: 'Your full name',
    form_telefono: 'Phone *', form_telefono_ph: '+34 600 000 000',
    form_email: 'Email *',
    form_localizacion: 'Location', form_localizacion_ph: 'Marbella, Benahavís…',
    form_tipo: 'Property type', form_tipo_ph: 'Select…',
    form_tipos: [
      { value: 'piso', label: 'Apartment / Flat' },
      { value: 'villa', label: 'Villa / Detached house' },
      { value: 'adosado', label: 'Townhouse' },
      { value: 'finca', label: 'Finca / Country house' },
      { value: 'local', label: 'Commercial property' },
      { value: 'otro', label: 'Other' },
    ],
    form_precio: 'Estimated price', form_precio_ph: 'Select…',
    form_precios: [
      { value: 'menos-200k', label: 'Under €200,000' },
      { value: '200-350k', label: '€200,000 – €350,000' },
      { value: '350-600k', label: '€350,000 – €600,000' },
      { value: '600k-1m', label: '€600,000 – €1M' },
      { value: 'mas-1m', label: 'Over €1,000,000' },
    ],
    form_plazo: 'Desired timeline', form_plazo_ph: 'Select…',
    form_plazos: [
      { value: 'urgente', label: 'As soon as possible' },
      { value: '3meses', label: 'Within 3 months' },
      { value: '6meses', label: 'Within 6 months' },
      { value: 'sin-prisa', label: 'No rush, best price' },
    ],
    form_btn_sending: 'Sending…',
    form_btn_error: 'Error — please try again',
    form_btn: 'Get my free valuation →',
    form_disclaimer: 'No commitment. We respond within 24h.',
    form_success: 'Thank you! We will contact you within 24 hours.',
    footer_legal: 'Legal Notice',
    footer_privacy: 'Privacy Policy',
    footer_cookies: 'Cookie Policy',
  },
};

type Lang = 'es' | 'en';

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
const whyVariants = ['dark', 'brown', 'tintLight', 'tintDark'];

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('es');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const t = T[lang];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Label de sección
        gsap.fromTo('.why-label', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.why-label', start: 'top 85%', once: true }
          }
        );

        // Título de sección
        gsap.fromTo('.why-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
            scrollTrigger: { trigger: '.why-title', start: 'top 85%', once: true }
          }
        );

        // Cards con stagger
        gsap.fromTo('.why-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
            scrollTrigger: { trigger: '.why-card', start: 'top 80%', once: true }
          }
        );

        // Proceso - label y título
        gsap.fromTo('.process-label',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.process-label', start: 'top 85%', once: true }
          }
        );
        gsap.fromTo('.process-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
            scrollTrigger: { trigger: '.process-title', start: 'top 85%', once: true }
          }
        );

        // Proceso - pasos con pausa progresiva
        document.querySelectorAll('.process-step').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.6,
              scrollTrigger: { trigger: '.process-step', start: 'top 75%', once: true }
            }
          );
        });
      });
    });
  }, []);

  const toggleFaq = (index: number) => setOpenFaq(prev => prev === index ? null : index);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
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
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#1A0E08', borderBottom: '1px solid rgba(107,63,42,.3)', padding: '0 clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <span style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", fontWeight: 300, fontSize: 'clamp(0.34rem,0.6vw,0.42rem)', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.45em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Inmobiliaria</span>
            <span style={{ fontFamily: "'Cormorant Garamond','Didot','Bodoni MT',Georgia,serif", fontWeight: 700, fontSize: 'clamp(1.4rem,3vw,2rem)', background: 'linear-gradient(90deg, #C1694F 0%, #C4956A 40%, #B8976E 70%, #C9A96E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.08em', lineHeight: 1, whiteSpace: 'nowrap' }}>SOLENA</span>
            <span style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", fontWeight: 300, fontSize: 'clamp(0.34rem,0.6vw,0.42rem)', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.45em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Costa del Sol</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} style={{ background: 'none', border: '1px solid rgba(245,240,232,.2)', color: '#F5F0E8', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '8px 16px', cursor: 'pointer' }}>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a href="#contacto" style={{ background: '#6B3F2A', color: '#F5F0E8', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
              {t.nav_cta}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — sin bloque 60 días */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="fade-up" style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 20 }}>{t.hero_location}</div>
          <h1 className="fade-up-2" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.05, letterSpacing: '-1px', marginBottom: 24 }}>
            {t.hero_h1_1}<br />
            <span style={{ color: '#6B3F2A' }}>{t.hero_h1_2}<br />{t.hero_h1_3}</span>
          </h1>
          <p className="fade-up-3" style={{ fontSize: 17, color: '#6A4E3E', lineHeight: 1.75, maxWidth: 500, marginBottom: 36 }}>{t.hero_p}</p>
          <div className="fade-up-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contacto" style={{ background: '#6B3F2A', color: '#F5F0E8', fontWeight: 700, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '18px 36px', textDecoration: 'none', display: 'inline-block' }}>{t.hero_cta}</a>
            <a href="#proceso" style={{ color: '#6B3F2A', fontWeight: 700, fontSize: 13, letterSpacing: '1px', textDecoration: 'none', borderBottom: '1px solid #6B3F2A', paddingBottom: 2 }}>{t.hero_link}</a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#6B3F2A', padding: '40px clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 0 }}>
          {t.stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 20px', borderRight: i < t.stats.length - 1 ? '1px solid rgba(245,240,232,.15)' : undefined }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 44, fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(245,240,232,.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 6, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUÉ SOLENA */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div className='why-label' style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>{t.why_label}</div>
            <h2 className='why-title' style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1, maxWidth: 600 }}>{t.why_h2}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 2 }}>
            {t.why_cards.map((card, i) => (
              <div key={i} className='why-card' style={{ background: whyCardBackground(whyVariants[i]), padding: '44px 36px', border: whyCardBorder(whyVariants[i]) }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 48, fontWeight: 900, color: whyNumberColor(whyVariants[i]), lineHeight: 1, marginBottom: 20 }}>{card.number}</div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, color: whyTitleColor(whyVariants[i]), marginBottom: 14, lineHeight: 1.2 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: whyTextColor(whyVariants[i]), lineHeight: 1.7 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" style={{ background: '#2A1A10', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div className='process-label' style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>{t.process_label}</div>
            <h2 className='process-title' style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.1 }}>{t.process_h2_1}<br />{t.process_h2_2}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(24px, 4vw, 40px)' }}>
            {t.process_steps.map((step, i) => (
              <div key={i} className='process-step'>
                <div style={{ width: 56, height: 56, background: '#6B3F2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Libre Baskerville', serif", fontWeight: 900, fontSize: 20, color: '#F5F0E8', marginBottom: 24 }}>{step.number}</div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, fontWeight: 700, color: '#F5F0E8', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(245,240,232,.5)', lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: '#F5F0E8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>{t.compare_label}</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1, maxWidth: 600 }}>{t.compare_h2}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 2, background: 'rgba(107,63,42,.1)' }}>
            {/* Sin exclusiva */}
            <div style={{ background: '#FAF7F2', padding: '2.5rem 2rem' }}>
              <p style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(107,63,42,.5)', fontWeight: 700, marginBottom: 8 }}>{t.compare_std_badge}</p>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, fontWeight: 700, color: '#2A1A10', marginBottom: '1.5rem', lineHeight: 1.1 }}>{t.compare_std_title1}<br /><em>{t.compare_std_title2}</em></h3>
              <div style={{ borderTop: '1px solid rgba(107,63,42,.15)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
                <p style={{ fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(107,63,42,.5)', fontWeight: 600, marginBottom: 12 }}>{t.compare_std_services_label}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.compare_std_services.map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#2A1A10' }}>
                      <span style={{ color: '#6B3F2A', flexShrink: 0, marginTop: 1 }}>✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderTop: '1px solid rgba(107,63,42,.15)', paddingTop: '1.25rem' }}>
                <p style={{ fontSize: 12, color: 'rgba(107,63,42,.5)', marginBottom: 8 }}>{t.compare_std_time_label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 6, background: 'rgba(107,63,42,.15)', borderRadius: 3 }}>
                    <div style={{ width: '100%', height: '100%', background: 'rgba(107,63,42,.3)', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(107,63,42,.6)', whiteSpace: 'nowrap' }}>{t.compare_std_time}</span>
                </div>
              </div>
            </div>
            {/* Con exclusiva */}
            <div style={{ background: '#2A1A10', padding: '2.5rem 2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#6B3F2A', color: '#F5F0E8', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px' }}>{t.compare_exc_badge}</div>
              <p style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)', fontWeight: 700, marginBottom: 8 }}>{t.compare_exc_service_badge}</p>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, fontWeight: 700, color: '#F5F0E8', marginBottom: '1.5rem', lineHeight: 1.1 }}><em>{t.compare_exc_title1}</em><br />{t.compare_exc_title2}</h3>
              <div style={{ borderTop: '1px solid rgba(245,240,232,.15)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
                <p style={{ fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,240,232,.4)', fontWeight: 600, marginBottom: 12 }}>{t.compare_exc_services_label}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.compare_exc_services.map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#F5F0E8' }}>
                      <span style={{ color: '#C9A96E', flexShrink: 0, marginTop: 1 }}>✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderTop: '1px solid rgba(245,240,232,.15)', paddingTop: '1.25rem' }}>
                <p style={{ fontSize: 12, color: 'rgba(245,240,232,.4)', marginBottom: 8 }}>{t.compare_exc_time_label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 6, background: 'rgba(245,240,232,.1)', borderRadius: 3 }}>
                    <div style={{ width: '38%', height: '100%', background: '#C9A96E', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#C9A96E', whiteSpace: 'nowrap' }}>{t.compare_exc_time}</span>
                </div>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(107,63,42,.5)', marginTop: '1rem' }}>{t.compare_footer}</p>
        </div>
      </section>

      {/* BLOQUE 60 DÍAS */}
      <section style={{ background: '#2A1A10', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontSize: 15, color: 'rgba(245,240,232,.5)', marginBottom: 8 }}>{t.stat_box_label}</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(80px, 15vw, 140px)', fontWeight: 900, color: '#6B3F2A', lineHeight: 1, letterSpacing: '-3px' }}>{t.stat_box_days}</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#F5F0E8', marginTop: 8, marginBottom: 28 }}>{t.stat_box_sub}</div>
          <div style={{ width: 40, height: 2, background: '#6B3F2A', margin: '0 auto 20px' }} />
          <div style={{ fontSize: 15, color: 'rgba(245,240,232,.55)', lineHeight: 1.75 }}>
            {t.stat_box_text1} <strong style={{ color: 'rgba(245,240,232,.8)' }}>{t.stat_box_bold}</strong> {t.stat_box_text2}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#6B3F2A', fontWeight: 700, marginBottom: 14 }}>{t.faq_label}</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#2A1A10', lineHeight: 1.1 }}>{t.faq_h2_1}<br />{t.faq_h2_2}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {t.faqs.map((item, index) => {
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
      <section id="contacto" style={{ background: '#6B3F2A', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,240,232,.5)', fontWeight: 700, marginBottom: 14 }}>{t.form_label}</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.05, marginBottom: 16 }}>{t.form_h2_1}<br />{t.form_h2_2}</h2>
            <p style={{ fontSize: 16, color: 'rgba(245,240,232,.65)', lineHeight: 1.7 }}>{t.form_p}</p>
          </div>
          <form ref={formRef} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: 0 }} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 2, marginBottom: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>{t.form_nombre}</label>
                <input required name="nombre" type="text" placeholder={t.form_nombre_ph} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>{t.form_telefono}</label>
                <input required name="telefono" type="tel" placeholder={t.form_telefono_ph} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
              <label style={labelStyle}>{t.form_email}</label>
              <input required name="email" type="email" placeholder="tu@email.com" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 2, marginBottom: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>{t.form_localizacion}</label>
                <input name="localizacion" type="text" placeholder={t.form_localizacion_ph} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>{t.form_tipo}</label>
                <select name="tipo" defaultValue="" style={{ ...inputStyle, color: 'rgba(245,240,232,.7)', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>{t.form_tipo_ph}</option>
                  {t.form_tipos.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 2, marginBottom: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>{t.form_precio}</label>
                <select name="precio" defaultValue="" style={{ ...inputStyle, color: 'rgba(245,240,232,.7)', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>{t.form_precio_ph}</option>
                  {t.form_precios.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>{t.form_plazo}</label>
                <select name="plazo" defaultValue="" style={{ ...inputStyle, color: 'rgba(245,240,232,.7)', WebkitAppearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled>{t.form_plazo_ph}</option>
                  {t.form_plazos.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {status !== 'success' && (
                <button type="submit" disabled={status === 'sending'} style={{ background: '#F5F0E8', color: '#6B3F2A', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', padding: '20px 44px', border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? t.form_btn_sending : status === 'error' ? t.form_btn_error : t.form_btn}
                </button>
              )}
              <p style={{ fontSize: 12, color: 'rgba(245,240,232,.4)', lineHeight: 1.5 }}>{t.form_disclaimer}</p>
            </div>
            {status === 'success' && (
              <div style={{ display: 'block', marginTop: 24, padding: '20px 24px', background: 'rgba(245,240,232,.1)', borderLeft: '3px solid rgba(245,240,232,.5)' }}>
                <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: '#F5F0E8' }}>{t.form_success}</p>
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
              <a href="/es/legal" style={{ fontSize: 11, color: 'rgba(245,240,232,.3)', textDecoration: 'none' }}>{t.footer_legal}</a>
              <a href="/es/privacidad" style={{ fontSize: 11, color: 'rgba(245,240,232,.3)', textDecoration: 'none' }}>{t.footer_privacy}</a>
              <a href="/es/cookies" style={{ fontSize: 11, color: 'rgba(245,240,232,.3)', textDecoration: 'none' }}>{t.footer_cookies}</a>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(245,240,232,.2)', marginTop: 4 }}>© 2025 Solena</div>
          </div>
        </div>
      </footer>
    </>
  );
}
