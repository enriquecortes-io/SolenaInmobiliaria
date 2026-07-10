'use client';
import { memo } from 'react';

const Testimonials = memo(() => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-serif font-bold text-solena-900 mb-12 text-center">Lo que dicen nuestros embajadores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-solena-50 border border-solena-100 rounded-xl p-8">
          <div className="text-solena-accent text-lg mb-4">★★★★★</div>
          <p className="text-solena-600 mb-4">"Referí 3 propiedades el año pasado y gané más de 18.000€."</p>
          <p className="font-bold text-solena-900">Juan M.</p>
        </div>
        <div className="bg-solena-50 border border-solena-100 rounded-xl p-8">
          <div className="text-solena-accent text-lg mb-4">★★★★★</div>
          <p className="text-solena-600 mb-4">"Muy fácil y rentable. Recomendado."</p>
          <p className="font-bold text-solena-900">María López</p>
        </div>
        <div className="bg-solena-50 border border-solena-100 rounded-xl p-8">
          <div className="text-solena-accent text-lg mb-4">★★★★★</div>
          <p className="text-solena-600 mb-4">"Mi red de contactos se ha convertido en ingresos."</p>
          <p className="font-bold text-solena-900">Carlos R.</p>
        </div>
      </div>
    </div>
  </section>
));
Testimonials.displayName = 'Testimonials';
export default Testimonials;
