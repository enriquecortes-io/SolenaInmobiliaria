'use client';

import { useState, useRef, FormEvent } from 'react';

const faqData = [
  {
    question: '¿Cuánto cobra Solena?',
    answer: 'Solo cobramos si vendemos tu casa. Sin honorarios anticipados, sin costes fijos. Nuestro éxito está alineado con el tuyo.',
  },
  {
    question: '¿Cuánto tiempo tarda la venta?',
    answer: 'Con exclusiva, la media en Costa del Sol es de 60 días. Depende del precio y la ubicación, pero los primeros 10 días son los más determinantes.',
  },
  {
    question: '¿Necesito reformar la casa antes?',
    answer: 'No necesariamente. Te asesoramos sobre qué mejoras realmente aumentan el precio de venta y cuáles no compensan la inversión.',
  },
  {
    question: '¿Tengo que estar en las visitas?',
    answer: 'No. Nosotros gestionamos y acompañamos cada visita. Recibirás un informe detallado después de cada una. Tú decides cuándo intervenir.',
  },
  {
    question: '¿Qué es la exclusiva y por qué importa?',
    answer: 'La exclusiva nos permite invertir al máximo en el marketing de tu propiedad. Una casa publicada por varias agencias a la vez genera desconfianza en el comprador y suele tardar mucho más en venderse.',
  },
];

const processSteps = [
  { number: '1', title: 'Valoración gratuita', text: 'Analizamos tu propiedad y te damos un precio basado en el mercado real de tu zona.' },
  { number: '2', title: 'Publicación en 30+ portales', text: 'Fotos profesionales y máxima visibilidad desde el primer día. 8.000 visualizaciones en los primeros 10 días.' },
  { number: '3', title: 'Visitas gestionadas', text: 'Filtramos compradores serios con financiación aprobada. Tú no tienes que estar presente.' },
  { number: '4', title: 'Cierre y firma', text: 'Acompañamiento legal hasta el notario. Cobras y listo.' },
];

const whyCards = [
  { number: '01', title: 'Precio justo desde el día uno', text: 'Valoramos tu propiedad con datos reales del mercado de tu zona. Sin inflar precios que luego no se venden.', variant: 'dark' as const },
  { number: '02', title: 'Marketing profesional incluido', text: 'Fotos de calidad, publicación en más de 30 portales y gestión diaria. Máxima exposición sin esfuerzo por tu parte.', variant: 'tintLight' as const },
  { number: '03', title: 'Compradores pre-aprobados', text: 'Trabajamos con compradores que ya tienen financiación aprobada. Sin operaciones que se caen en el último momento.', variant: 'brown' as const },
  { number: '04', title: 'Tú no gestionas nada', text: 'Nosotros organizamos y acompañamos cada visita. Recibes un informe diario. Sólo tú decides cuándo decir sí.', variant: 'tintDark' as const },
  { number: '05', title: 'Acompañamiento legal completo', text: 'Desde la firma del contrato hasta el notario. Te guiamos en cada paso para que la venta sea segura y sin sorpresas.', variant: 'tintDark' as const },
  { number: '06', title: 'Solo cobramos si vendemos', text: 'Sin costes anticipados. Sin sorpresas. Nuestro éxito depende del tuyo.', variant: 'tintDark' as const },
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
      case 'dark': return '#2A1A10';
      case 'brown': return '#6B3F2A';
      case 'tintLight': return 'rgba(107,63,42,.07)';
      case 'tintDark': default: return 'rgba(107,63,42,.04)';
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F0E8; font-family: 'Lato', sans-serif; color: #2A1A10; }
      `}</style>
      <div style={{ background: '#F5F0E8', padding: '50px' }}>
         <h1 style={{ fontFamily: "'Playfair Display', serif" }}>Landing Page Operativa</h1>
         <p>La arquitectura está aislada correctamente.</p>
      </div>
    </>
  );
}
