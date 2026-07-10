'use client';
import { memo, useState } from 'react';

const FAQ = memo(() => {
  const [expanded, setExpanded] = useState<number | null>(null);
  
  const items = [
    { q: '¿Qué es Solena?', a: 'Solena es una proptech que transforma cómo se compran y venden casas.' },
    { q: '¿Necesito licencia inmobiliaria?', a: 'No. Cualquier persona puede participar sin experiencia.' },
    { q: '¿Cuánto gano?', a: 'Recibes el 20% de la comisión que cobra Solena por la venta.' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-4xl font-serif font-bold text-solena-900 mb-8 text-center">Preguntas Frecuentes</h2>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="w-full text-left px-6 py-4 bg-solena-50 hover:bg-solena-100 border border-solena-100 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-solena-900">{item.q}</span>
            <span>{expanded === i ? '▼' : '▶'}</span>
          </div>
          {expanded === i && <p className="text-solena-600 mt-3">{item.a}</p>}
        </button>
      ))}
    </div>
  );
});
FAQ.displayName = 'FAQ';
export default FAQ;
