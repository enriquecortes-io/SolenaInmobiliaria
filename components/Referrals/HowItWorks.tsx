'use client';
import { memo } from 'react';

const HowItWorks = memo(() => (
  <section id="how-it-works" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-serif font-bold text-solena-900 mb-16 text-center">Cómo Funciona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-solena-50 border border-solena-100 rounded-xl p-8">
          <div className="text-3xl font-bold text-solena-accent mb-4">1</div>
          <h3 className="text-xl font-bold text-solena-900 mb-3">Presenta el contacto</h3>
          <p className="text-solena-600">Comparte el contacto del propietario que desea vender.</p>
        </div>
        <div className="bg-solena-50 border border-solena-100 rounded-xl p-8">
          <div className="text-3xl font-bold text-solena-accent mb-4">2</div>
          <h3 className="text-xl font-bold text-solena-900 mb-3">Solena gestiona</h3>
          <p className="text-solena-600">Nuestro equipo se encarga de valoración y venta.</p>
        </div>
        <div className="bg-solena-50 border border-solena-100 rounded-xl p-8">
          <div className="text-3xl font-bold text-solena-accent mb-4">3</div>
          <h3 className="text-xl font-bold text-solena-900 mb-3">Recibes comisión</h3>
          <p className="text-solena-600">Gana el 20% de nuestra comisión por cada venta.</p>
        </div>
      </div>
    </div>
  </section>
));
HowItWorks.displayName = 'HowItWorks';
export default HowItWorks;
